---
title: Digital Design In a Nutshell
date: 2026-02-28 12:00:00 +0700
categories: [Chip, Digital , Design]
tags: [Knowledge]
---

# Digital Design In A Nutshell

Digital design (also known as **digital logic design** or **digital circuit design**) is the foundation of all modern electronics — from CPUs and GPUs to memory, FPGAs, ASICs, microcontrollers, and IoT devices. It deals with systems that operate using binary signals (0 and 1).

## 1. The Binary World

- Everything is **0** or **1** (low/high voltage)
- Number systems used:
  - Binary (base-2)
  - Hexadecimal (base-16) — most compact for humans
  - Octal (base-8) — less common today
  - BCD (Binary-Coded Decimal)
  - Gray code (only one bit changes between adjacent values)
  - One-hot encoding (very common in state machines)

## 2. Boolean Algebra & Logic Gates (The Building Blocks)

All digital logic is built from these basic gates:

| Gate   | Symbol     | Function                              | A | B | Out | Universal? |
|--------|------------|---------------------------------------|---|---|-----|------------|
| AND    | A • B      | 1 only if both inputs are 1           | 0 | 0 |  0  | No         |
|        |            |                                       | 0 | 1 |  0  |            |
|        |            |                                       | 1 | 0 |  0  |            |
|        |            |                                       | 1 | 1 |  1  |            |
| OR     | A + B      | 1 if at least one input is 1          | 0 | 0 |  0  | No         |
|        |            |                                       | 0 | 1 |  1  |            |
|        |            |                                       | 1 | 0 |  1  |            |
|        |            |                                       | 1 | 1 |  1  |            |
| NOT    | ¬A         | Inverts the input                     | 0 | — |  1  | No         |
|        |            |                                       | 1 | — |  0  |            |
| NAND   | ¬(A•B)     | AND followed by NOT                   | 0 | 0 |  1  | **Yes**    |
|        |            |                                       | 0 | 1 |  1  |            |
|        |            |                                       | 1 | 0 |  1  |            |
|        |            |                                       | 1 | 1 |  0  |            |
| NOR    | ¬(A+B)     | OR followed by NOT                    | 0 | 0 |  1  | **Yes**    |
|        |            |                                       | 0 | 1 |  0  |            |
|        |            |                                       | 1 | 0 |  0  |            |
|        |            |                                       | 1 | 1 |  0  |            |
| XOR    | A ⊕ B      | 1 if inputs are different             | 0 | 0 |  0  | No         |
|        |            |                                       | 0 | 1 |  1  |            |
|        |            |                                       | 1 | 0 |  1  |            |
|        |            |                                       | 1 | 1 |  0  |            |
| XNOR   | ¬(A⊕B)     | 1 if inputs are the same              | 0 | 0 |  1  | No         |
|        |            |                                       | 0 | 1 |  0  |            |
|        |            |                                       | 1 | 0 |  0  |            |
|        |            |                                       | 1 | 1 |  1  |            |


**Key fact**: NAND (or NOR) gates alone are **universal** — you can build any logic function using only NANDs.

## 3. Two Major Circuit Families

### A. Combinational Logic
- Output depends **only** on current inputs (no memory)
- Examples: adders, multiplexers, decoders, ALUs, comparators
- Design steps:
  1. Specification
  2. Truth table / minterms
  3. Boolean equation
  4. Simplification (Karnaugh map / Quine-McCluskey)
  5. Gate-level implementation

Common blocks:
- Half Adder / Full Adder → Ripple-carry → Carry-lookahead → Carry-select
- 2:1 MUX → can implement **any** 2-input function
- 4-to-16 Decoder → generates one-hot outputs

### B. Sequential Logic
- Output depends on current inputs **and** previous state (has memory)
- Core element: **Flip-flops** (most common today: **D flip-flop** edge-triggered)
- Clock → synchronizes the system
- Main types:
  - Finite State Machines (FSMs): **Mealy** vs **Moore**
  - Registers, counters (ripple vs synchronous), shift registers
  - Memory modeling (RAM, ROM, register files)

## 4. Synchronous vs Asynchronous

| Aspect              | Synchronous                          | Asynchronous                        |
|---------------------|--------------------------------------|-------------------------------------|
| Clock               | Yes – central heartbeat              | No clock                            |
| Timing              | Predictable, easier to analyze       | Faster in theory, hard to verify    |
| Design complexity   | Easier (most modern designs)         | Very hard (rare today)              |
| Power               | Clock consumes power                 | Potentially lower (no clock)        |
| Usage in 2025–2026  | 99% of commercial designs           | Specialized (e.g., low-power sensors, async FIFOs) |

## 5. Timing & Real-World VLSI Constraints

Critical concepts every VLSI engineer must master:

- **Setup time** / **Hold time** violations
- **Clock skew** & **clock jitter**
- **Critical path** → determines maximum clock frequency
- **Metastability** (flip-flop enters unstable state)
- **Clock Domain Crossing (CDC)** → biggest source of subtle bugs
- Power: dynamic (switching) + static (leakage)


## Quick Reference – Most Common Building Blocks

| Block              | Main Purpose                         | Typical Applications                     |
|--------------------|--------------------------------------|------------------------------------------|
| D Flip-Flop        | 1-bit storage                        | Pipeline registers, state elements       |
| 2:1 MUX            | Data selection                       | Implementing logic, barrel shifters      |
| Full Adder         | 1-bit binary addition                | ALUs, multipliers                        |
| Synchronous Counter| Counts clock cycles                  | Timers, address generators               |
| FSM                | Control logic                        | Protocol handlers, datapath controllers  |
| Shift Register     | Serial ↔ parallel conversion         | Data serialization, delay lines          |
