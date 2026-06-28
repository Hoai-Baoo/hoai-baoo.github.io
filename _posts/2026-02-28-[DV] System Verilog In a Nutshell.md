---
title: System Verilog In a Nutshell
date: 2026-05-29 12:00:00 +0700
categories: [design verification]
tags: [knowledge tree]
---


## Part 1: Language Fundamentals & Data Types

In SystemVerilog, choosing the right data type is crucial for balancing simulation accuracy (modeling hardware behavior) and simulation speed (memory optimization).

### 1. State Types

The fundamental difference lies in how many logic values a single bit can represent.

**4-State Logic Types**

- Values: 0 (Logic Low), 1 (Logic High), X (Unknown/Uninitialized), Z (High-Impedance/Tri-stated).

- Default Value: X.

- Use Case: RTL design, physical chip ports, tri-state buses, or any signal where catching uninitialized tracking (lack of reset) is critical.

```verilog
// 4-state logic (0, 1, X, Z) 
logic       single_bit;   // 1 bit. Replaces Verilog's 'reg' and 'wire' ambiguities.
logic [7:0] byte_data;    // 8-bit packed vector.
logic [31:0] word;        // 32-bit packed vector.

```

**2-State Logic Types**

- Values: 0 and 1 only.
- Default Value: 0.
- Use Case: Testbench verification code, loop counters, mathematical tracking. Because they require only 1 bit of host computer memory per simulated bit (instead of 2 bits for 4-state), they simulate significantly faster.

```verilog
// 2-state types (0, 1 only) - Faster simulation
bit         flag;         // 1-bit unsigned variable (0 or 1)
bit [15:0]  half_word;    // 16-bit unsigned vector

// Signed Integers (Stored internally as 2's Complement)
byte        s8;           // 8-bit signed   (Range: -128 to 127)
shortint    s16;          // 16-bit signed  (Range: -32,768 to 32,767)
int         s32;          // 32-bit signed  (Most popular for loop iterations and counters)
longint     s64;          // 64-bit signed  

// Unsigned Integers (Explicitly declared via the 'unsigned' keyword)
byte unsigned       u8;   // 8-bit unsigned (Range: 0 to 255)
int unsigned        u32;  // 32-bit unsigned (Range: 0 to 2^32 - 1)

// Real Numbers (Floating-Point)
real                voltage;      // Double precision (Equivalent to C's 'double' - 64-bit)
shortreal           current;      // Single precision (Equivalent to C's 'float' - 32-bit)
```

### 2. Enumerations (Enum) 

An enum defines a set of named integer constants, creating strongly-typed symbolic variables that improve code readability and design safety.

Use Case:
- Protocol Commands and Opcodes (Transaction Modeling): When writing a uvm_sequence_item to drive stimulus into a Device Under Test (DUT), you cannot just pass raw, random integers to simulate complex protocols. You need abstract, symbolic command sets that model valid operations.

```verilog
typedef enum logic [3:0] {
    NOP   = 4'b0000,
    READ  = 4'b0001,
    WRITE = 4'b0010,
    FLUSH = 4'b0100,
    RESET = 4'b1000
} cmd_t;

class bus_transaction extends uvm_sequence_item;
    rand cmd_t command; // Randomized command type
    rand bit [31:0] addr;
    rand bit [31:0] data;
    
    // Weight distribution: Prevent the solver from flooding the DUT with NOPs
    constraint c_cmd_dist { 
        command dist {NOP := 10, READ := 45, WRITE := 45}; 
    }
endclass
```

- Testbench and Environment Configuration: Modern testbenches must be dynamic. Instead of hardcoding behaviors, UVM environment configuration objects use enum flags to dynamically change how validation components (Agents) behave at runtime.

```verilog
typedef enum { ACTIVE, PASSIVE } agent_mode_t;
typedef enum { IP_REV_1, IP_REV_2 } ip_version_t;

class env_config extends uvm_object;
    agent_mode_t eth_agent_mode = ACTIVE;  // ACTIVE drives data; PASSIVE only monitors
    ip_version_t target_version = IP_REV_2; // Toggles structural checkers based on RTL version
endclass
```

- Automatic Functional Coverage Binning: When you pass a standard integer to a covergroup, you have to manually define the boundaries (bins) for tracking. If you use an enum, the SystemVerilog coverage engine automatically detects the names and builds dedicated tracking bins for you.

```verilog
covergroup bus_coverage_cg;
    // Automatically creates explicit bins for NOP, READ, WRITE, FLUSH, and RESET
    cp_command: coverpoint current_trans.command; 
    cp_error:   coverpoint current_trans.inject_err;
    
    // Cross Coverage: Proves every single command type encountered every single error type
    cross_cmd_x_err: cross cp_command, cp_error; 
endgroup
```

- FSM Looping (Using Built-in Methods): SystemVerilog enum variables include built-in methods like .next(), .prev(), and .first(), testbenches can easily automate sequential testing across complex, variable loops without manual indexing.

```verilog
// Loop through every single available state in the enum automatically
state_t state = state.first();
do begin
    `uvm_info("STATE_LOOP", $sformatf("Testing behavior for state: %s", state.name()), UVM_LOW)
    state = state.next();
end while (state != state.first());

```
> Strict Type Safety: You cannot directly assign an arbitrary integer to an enum variable (e.g., current_state = 2; will throw a compile-time error). You must explicitly use static casting: current_state = state_t'(2);.

> Furthermore, when debugging waveforms in tools like Synopsys Verdi, Verdi automatically decodes the enum values, printing FETCH or EXEC right on the trace bus instead of 3'b001 or 3'b011.

### 3. Struct and Union

#### 3.1. Packed Struct

```verilog
    // Packed struct (treated as an unbroken 69-bit vector)
    typedef struct packed {
        logic [31:0] addr;
        logic [31:0] data;
        logic [3:0]  id;
        logic        valid;
    } packet_t;
```

A packed struct is treated by the compiler as a single, continuous bit-vector (a single hardware wire bus).

- Memory Layout: The fields are packed tightly next to each other from left to right with no memory gaps. The first field defined (addr) occupies the Most Significant Bits (MSBs), and the last field (valid) occupies the Least Significant Bit (LSB).

- Characteristics: Because it is fundamentally just a giant slice of bits, you can perform bitwise operations on the entire struct, assign it directly to a raw vector, or pass it natively across hardware module ports.

- Bit Size Calculation: The total bit size of your packet_t is exactly: 

| Field Name | Type | Bit Width | Contribution |
| :--- | :--- | :--- | :--- |
| **`addr`** | `logic [31:0]` | 32 bits | 32 |
| **`data`** | `logic [31:0]` | 32 bits | + 32 |
| **`id`** | `logic [3:0]` | 4 bits | + 4 |
| **`valid`** | `logic` | 1 bit | + 1 |
| **Total Size** | `packet_t` | **69 bits** | **= 69 bits** |


Use case:
- Network Packet Header Modeling: Perfect for representing standard network headers (like Ethernet, IPv4, or PCIe TLP headers). The layout mirrors the physical bits coming off the wire exactly, bit-for-bit.

#### 3.2. Unpacked Struct

```verilog
typedef struct {
        int          length;
        packet_t     pkt;
        string       name;
    } transaction_t;
```

An unpacked struct acts like a standard structure in traditional software languages like C or C++.

- Memory Layout: The fields are stored in independent, scattered memory locations allocated by the simulator. The simulator may introduce memory padding between fields to optimize host CPU execution speed.

- Characteristics: It can contain dynamic software data types, such as objects (classes), dynamic arrays, queues, and strings. You cannot perform bitwise logic operations on the entire unpacked struct as a whole.

Use Case
- Testbench Transaction Metadata: Used in verification components to bundle a hardware packet together with simulation-only software metadata. As shown in your transaction_t example, you can attach the hardware pkt alongside a software length parameter and a descriptive name string for clean logging and debugging.

- Configuration Tables: Bundling testbench environmental switches, threshold parameters, or system settings that don't represent literal physical wires.

#### 3.3. Union

```verilog
    // Union (shares a single 32-bit physical memory footprint)
    typedef union packed {
        logic [31:0]  word;
        byte [3:0]    bytes; // 4-byte array overlaying the same 32-bit space
    } data_union;

     data_union my_union;

     my_union.word = 32'hAABB_CCDD; 
     my_union.bytes[2] = 8'hFF; 
```

A union allows multiple different data types to share the exact same physical memory footprint.

- Memory Layout: The total size of the union is equal to the size of its largest member field.

- Characteristics: When you write data into one field, you can immediately read it from another field to view that exact same data under a completely different layout or data format, without needing manual shifting or parsing logic.

Use Case: 

- Instant Type Conversion & Byte Parsing (DV Testbenches): In your data_union example, you have a 32-bit word. In verification, you often need to check or corrupt individual bytes (e.g., verifying a parity bit on Byte 2). 
Instead of typing messy wire masking logic like `word = (word & 32'hFF00_FFFF) | (8'hFF << 16)`, you target the slice directly with `my_union.bytes[2] = 8'hFF`.


- Shared/Multi-Purpose Register Modeling: In many hardware controllers (like USB or PCIe), a single hardware configuration register changes its functional layout depending on whether the chip is in Read Mode or Write Mode. A union lets you model this single storage cell accurately under different operational masks.

**Example:** USB Controller Control Register

Imagine a single 32-bit register at address 0x40.

- When CPU Writes (Configuration): Bits [31:16] set the timeout_limit, and bit [0] enables high_power_mode.
- When CPU Reads (Status Monitoring): Bits [31:24] track error_count, and bit [1] tracks the bus_busy flag.

```verilog
    // Layout when the CPU writes configuration data
    typedef struct packed {
        logic [15:0] timeout_limit;  // Bits [31:16]
        logic [14:0] reserved;       // Bits [15:1]
        logic        high_power_en;  // Bit  [0]
    } usb_write_layout_t;

    // Layout when the CPU reads status data
    typedef struct packed {
        logic [7:0]  error_count;    // Bits [31:24]
        logic [22:0] reserved;       // Bits [23:1]
        logic        bus_busy;       // Bit  [0]
    } usb_read_layout_t;

    // The Union overlays both operational masks onto one physical cell
    typedef union packed {
        logic [31:0]        raw_reg;    // Raw 32-bit hardware bus value
        usb_write_layout_t  write_mode; // Configuration view
        usb_read_layout_t   read_mode;  // Status view
    } usb_ctrl_reg_t;
```

Instead of writing clumsy masking logic like `errors = (raw_reg >> 24) & 8'hFF`, you type `my_reg.read_mode.error_count`. It delivers cleaner testbench code and perfectly mimics how physical registers overwrite and transform data fields dynamically.

### 4. Arrays

An array in SystemVerilog is a collection of variables of the same data type stored at contiguous memory locations. SystemVerilog extends Verilog arrays by introducing dynamic allocation and advanced manipulation features.

#### 4.1. . Fixed-Size Arrays

- Static memory allocation: Size is determined at compile time and cannot change.

- Packed Arrays: Continuous blocks of bits, treated as a single vector. 

    - Syntax: `logic [3:0][7:0] packed_array; (4 8-bit bytes).`

- Unpacked Arrays: Collections of independent elements, like traditional C-style arrays. 

    - Syntax: `int unpacked_array [0:9]; (Array of 10 integers).`

#### 4.2. Dynamic Arrays

- Runtime sizing: Memory space is allocated or resized during simulation execution.

- Flexible footprint: Helpful when data size depends on runtime parameters.

    - Syntax: `int dynamic_arr [];`
    - Allocation: `dynamic_arr = new[100];`

#### 4.3. Associative Arrays

- Sparse storage: Memory is allocated only when an element is written.

- Non-integer indexing: Can use strings, objects, or sparse integers as keys.
    - Syntax: `int lookup_table [string];`

#### 4.4. Queues

- Variable length: Automatically grows and shrinks as items are added or removed.

- Built-in methods: Supports push/pop operations from both front and back.
    - Syntax: `int msg_queue [$];`

---
## Part 2: Object-Oriented Programming (OOP)

### 1. Core OOP Concepts

### 2. Advanced OOP

## Part 3: Randomization & Constraints

### 1. Randomization Basics

### 2. Constraint Blocks

## Part 4: Interface & Inter-Process Communication (IPC)

### 1. Interfaces

### 2. Threads & Concurrency

### .3. Inter-Process Communication

## Part 5: Functional Coverage

### 1. Covergroups & Coverpoints

### 2. Coverage Options & Management

## Part 6: SystemVerilog Assertions (SVA)
