---
title:  "Knowledge Tree for Design Verification"
date:   2026-02-05 10:00:00 +0700
categories: chip verification
tags: [design verification, knowledge tree]
---

![Knowledge Tree Design Verification](/assets/img/Design Verification Roadmap.drawio.png)

---
## **Stage 1: Digital Design Fundamentals**

### 1. Number Systems & Boolean Algebra

#### 1.1. Number Systems:
*   Binary (Base-2) 
*   Hexadecimal (Base-16) & Octal (Base-8)
*   2's Complement
*   Signed vs. Unsigned 
*   Overflow & Underflow Roll-over
*   Gray Code
*   BCD (Binary Coded Decimal)
*   Floating-Point Representation

#### 1.2. Boolean Algebra and Logic Optimization

*   Primitive Gates: Truth tables and hardware structures of AND, OR, and NOT gates.
*   Universal Gates (NAND/NOR): Why silicon foundries preferentially build everything out of NAND/NOR structures due to physical transistor properties.
*   Exclusive Gates (XOR/XNOR): Core applications in parity checking, ECC (Error Correction Code), and hardware Adders.
*   Fundamental Laws: Identity, Null, Commutative, Associative, and Distributive properties.
*   De Morgan's Laws: Expanding and breaking down inverted complex logic blocks.SVA (SystemVerilog Assertions) 
*   Canonical Forms: Sum-of-Products (SOP) and Product-of-Sums (POS) structures, including Minterms and Maxterms.
*   Karnaugh Maps (K-Maps): Visual minimization of logic functions (up to 4-6 variables) and managing Don't Care (X) conditions.


### 2. Combinational Logic
#### 2.1. Building blocks
* Arithmetic Circuits 
    * Half Adder & Full Adder
    * Ripple Carry Adder (RCA)
    * Carry Lookahead Adder (CLA)
    * Subtractor & Multiplier
* Data Routing Circuits
    * Multiplexer (MUX)
    * Demultiplexer (DEMUX)
* Code Converters
    * Decoder 
    * Encoder & Priority Encoder
* Hazards
    * Static Hazards
    * Dynamic Hazards
    *  X-Propagation 

### 3. Sequential Logic
#### 3.1. Storage Elements & Timing Hazards
* Latches - Inadvertent Latch
* Flip-flops
* Timing constraints
* Metastability
* Clock Domain Crossing

#### 3.2. Finite State Machine
* Mealy Machine
* Moore Machine
* State Encoding 
    * Binary Encoding
    * One-Hot Encoding
    * Gray Encoding

#### 3.3. Registers and Counters
* Shift Register
* Linear Feedback Shift Register
* Johnson Counter & Ring Counter
* Asynchronous Reset
* Synchronous Reset
* Reset Synchronizer

### 4. Computer Architecture
#### 4.1. Instruction Set Architecture - ISA
* CISC vs. RISC
* Addressing Modes
* Registers

#### 4.2. Microarchitecture
* Datapath & Control Unit
* Pipelining 
* Hazards 

#### 4.3. Memory Hierarchy
* Cache Memory
* Cache Locality
* Virtual Memory 

#### 4.3. Parallelism
* ILP (Instruction-Level Parallelism)
* Flynn
* Amdahl's Law

---
## **Stage 2: SystemVerilog for Verification**

### 1. Language Fundamentals & Data Types

#### 1.1. Data Types
*   Logic vs. Reg/Wire
*   2-state (`bit`, `int`) vs. 4-state (`logic`, `integer`)
*   Signed vs. Unsigned types
*   Casting (Static, Dynamic `$cast`)

#### 1.2. Arrays & Structures
*   Static Arrays vs. Dynamic Arrays
*   Associative Arrays (Sparse memory modeling)
*   Queues (FIFO modeling)
*   Array Methods (Sort, Find, Reverse)
*   Structs & Packed/Unpacked Arrays

#### 1.3. Procedural Blocks & Control Flow
*   `always_comb`, `always_ff`, `always_latch`
*   `final` blocks
*   Unique/Priority `if`/`case`
*   Loops (`foreach`, `repeat`, `forever`)

### 2. Object-Oriented Programming (OOP)

#### 2.1. Core OOP Concepts
*   Classes, Objects, and Handles
*   Properties, Methods, and Constructors (`new()`)
*   Encapsulation (`public`, `local`, `protected`)
*   Inheritance & Polymorphism
*   Virtual Methods & Abstract Classes

#### 2.2. Advanced OOP
*   Shallow Copy vs. Deep Copy
*   Parameterized Classes
*   Static Properties & Methods
*   Scope Resolution Operator (`::`)

### 3. Randomization & Constraints

#### 3.1. Randomization Basics
*   `rand` vs. `randc` variables
*   `randomize()` method
*   `pre_randomize()` and `post_randomize()` hooks

#### 3.2. Constraint Blocks
*   Relational & Logical Constraints
*   `dist` (Distribution) constraints
*   Implication (`->`) & `if-else` constraints
*   `foreach` constraints for arrays
*   Inline constraints (`randomize() with`)
*   Soft constraints (`soft`)
*   Constraint disabling (`constraint_mode`)

### 4. Interface & Inter-Process Communication (IPC)

#### 4.1. Interfaces
*   Virtual Interfaces
*   Modports (Input/Output directions)
*   Clocking Blocks (Input/Output skews, race condition prevention)

#### 4.2. Threads & Concurrency
*   `fork-join`, `fork-join_any`, `fork-join_none`
*   Thread control (`disable fork`, `wait fork`)

#### 4.3. Inter-Process Communication
*   Mailboxes (Bounded vs. Unbounded)
*   Semaphores (Resource sharing)
*   Events (`->`, `->>`, `@`, `triggered`)

### 5. Functional Coverage

#### 5.1. Covergroups & Coverpoints
*   `covergroup` definition and instantiation
*   `coverpoint` & Variables
*   Bins (Explicit, Implicit, Transition, Default)
*   Cross Coverage (`cross`)

#### 5.2. Coverage Options & Management
*   `per_instance` options
*   Illegal vs. Ignore bins
*   Sampling triggers (Block event vs. `sample()` method)

### 6. SystemVerilog Assertions (SVA)

#### 6.1. Assertion Types
*   Immediate Assertions
*   Concurrent Assertions

#### 6.2. SVA Syntax & Operators
*   Sequences & Properties
*   Implication operators (Overlapping `|=`, Non-overlapping `|=>`)
*   Repetition operators (`[*n]`, `[->n]`, `[=n]`)
*   Sequence methods (`$rose`, `$fell`, `$stable`, `$past`)
*   Advanced operators (`and`, `or`, `intersect`, `within`, `throughout`)

---
## **Stage 3: Universal Verification Methodology (UVM)**

### 1. UVM Base Classes & Core Concepts

#### 1.1. Library Foundation
*   `uvm_object` vs. `uvm_component`
*   UVM Factory (Registration, Creation, Overriding)
*   UVM Phases (Build, Connect, Run, Check, Report)
*   Phase Objections (`raise_objection`, `drop_objection`)

#### 1.2. Configuration & Reporting
*   UVM Configuration Database (`uvm_config_db`)
*   UVM Resource Database (`uvm_resource_db`)
*   UVM Reporting/Logging Mechanisms (`uvm_info`, `uvm_error`, `uvm_fatal`)
*   Report Catchers & Verbosity Levels

### 2. UVM Testbench Architecture (The Components)

#### 2.1. Data Item (Transaction)
*   `uvm_sequence_item`
*   Field Macros (`uvm_field_int`, `uvm_field_object`)
*   Transaction recording & Printing

#### 2.2. Verification Environment Components
*   `uvm_driver` (Pin-level driving)
*   `uvm_monitor` (Pin-level monitoring)
*   `uvm_sequencer` (Transaction routing)
*   `uvm_agent` (Active vs. Passive)
*   `uvm_scoreboard` (Data checking & Validation)
*   `uvm_env` (Structural encapsulation)
*   `uvm_test` (Test case definition & Configuration)

### 3. UVM TLM (Transaction Level Modeling)

#### 3.1. TLM 1.0 Communication
*   TLM Ports, Exports, and Imps
*   `put`, `get`, and `peek` interfaces
*   Analysis Ports & Analysis FIFOs (Broadcasting data)

#### 3.2. TLM 2.0 Basics
*   Blocking vs. Non-blocking transport
*   Sockets (Initiator vs. Target)

### 4. Stimulus Generation (Sequences)

#### 4.1. Sequence Basics
*   `uvm_sequence` creation
*   `body()` method
*   Starting sequences (`seq.start(sequencer)`)
*   Macros (`uvm_do`, `uvm_do_with`)

#### 4.2. Advanced Sequences
*   Virtual Sequences & Virtual Sequencers
*   Sequence Arbitration & Priorities
*   Nested Sequences
*   Response handling (`get_response`)

### 5. UVM Register Layer (UVM REG / RAL)

#### 5.1. RAL Architecture
*   `uvm_reg_block`, `uvm_reg`, `uvm_reg_field`
*   Address Maps (`uvm_reg_map`)
*   RAL Adapters (`uvm_reg_adapter`)
*   Predictors (`uvm_reg_predictor`)

#### 5.2. Register Access Methods
*   Frontdoor vs. Backdoor access
*   `read()` / `write()` vs. `peek()` / `poke()`
*   Mirror vs. Desired vs. Reset values
*   Built-in RAL sequences (Register bit bash, Reset test)

### 6. Advanced UVM Techniques

#### 6.1. Reusability & VIP
*   Verification Intellectual Property (VIP) integration
*   Block-to-Top verification reuse
*   Multi-interface coordination

#### 6.2. Callbacks & Factory Overrides
*   `uvm_callback` class for dynamic behavior modification
*   Type overrides vs. Instance overrides

---
## **Stage 4: High-Demand Industry Protocols**

### 4.1. On-Chip Interconnect Protocols
*   **AMBA AXI (AXI3, AXI4, AXI5)**: The industry-standard high-performance bus. Supports 5 independent channels, out-of-order transactions, and burst transfers. A mandatory skill for almost all DV positions.
*   **AMBA AHB / APB**: Used for medium to low-bandwidth system peripherals (e.g., UART, SPI, GPIO). Essential for understanding basic SoC bus architecture.
*   **AMBA ACE / CHI (Coherent Hub Interface)**: Advanced protocols for system-level Cache Coherency in multi-core CPU/GPU systems. Critical for AI Accelerators, HPC, and Server SoCs.
*   **TileLink / OCP (Open Core Protocol)**: Alternative interconnect architectures, highly popular in the RISC-V ecosystem and open-source hardware designs.

### 4.2. Memory Interface Protocols
*   **DDR (DDR4 / DDR5 / DDR6)**: High-capacity, high-bandwidth memory interface standard for PCs, Servers, and Data Centers.
*   **LPDDR (LPDDR4 / LPDDR5 / LPDDR6)**: Low-power variant of DDR optimized for Mobile Devices, Automotive SoCs, and Edge AI devices.
*   **DFI (DDR PHY Interface)**: The standard interface protocol connecting the digital Memory Controller (MC) to the analog PHY.
*   **HBM (HBM3 / HBM4 - High Bandwidth Memory)**: Ultra-high bandwidth 3D-stacked memory architecture, extremely dominant in generative AI chips and high-end data center hardware.

### 4.3. Peripheral & High-Speed Connectivity
*   **PCIe (PCI Express Gen 5 / Gen 6 / Gen 7)**: The de facto standard for high-speed chip-to-chip, GPU, and NVMe SSD connections. DV engineers with PCIe expertise are always in critical demand.
*   **CXL (Compute Express Link)**: Built on top of the PCIe physical layer. Enables high-speed, low-latency cache-coherent memory sharing between CPUs and workload accelerators (GPUs, FPGAs).
*   **Ethernet (100G / 400G / 800G / 1.6T)**: High-speed networking protocol standard. Requires complex packet-based verification architectures, prominent in Networking Switch and Router IPs.
*   **USB (USB4 / USB5)**: Standard protocol for general peripheral connectivity and data transfer.

### 4.4. Storage Protocols
*   **NVMe (Non-Volatile Memory Express)**: High-performance, scalable host controller interface optimized for PCIe-based SSDs.
*   **UFS (Universal Flash Storage)**: High-speed flash storage specification tailored for mobile applications, replacing older eMMC standards.

### 4.5. Mobile & Display Protocols
*   **MIPI CSI (Camera Serial Interface)**: High-speed serial interface standard connecting camera sensors to the host processor.
*   **MIPI DSI (Display Serial Interface)**: Standardized interface targeting display panels in smartphones, tablets, and automotive infotainment systems.

### 4.6. Low-Speed Peripheral Protocols (Foundations)
*   **I2C / I3C**: Two-wire serial interfaces used for low-speed sensors. I3C provides an upgrade path with higher data rates and lower power consumption.
*   **SPI / Quad-SPI**: Serial Peripheral Interface, highly used for reading serial Flash/Boot ROMs during the system boot sequence.
*   **UART**: Basic asynchronous serial communication protocol mainly utilized for low-level system debugging.

