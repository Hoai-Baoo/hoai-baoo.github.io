---
title: Chip Design Flow
date: 2026-02-19 12:00:00 +0700
categories: [design verification]
tags: [Knowledge]
---

# Chip Design Flow

The **chip design flow** (ASIC / SoC design flow) is the end-to-end process of turning product requirements into manufactured silicon.

## Main Phases

- **<span style="color:#e74c3c">Front-End</span>** — Logic/RTL Design & Verification  
- **Back-End** — Physical Design & Sign-off  
- **Post-Tapeout** — Fabrication → Silicon Validation & Production

## Detailed Stages

1. **System Specification & Requirements**  
   Define functional requirements:  
   - Performance targets  
   - Power budget  
   - Area constraints  
   - Interfaces (PCIe, DDR, USB, CXL, etc.)  

2. **Architecture Design / Microarchitecture**  
   High-level system partitioning:  
   - Hardware blocks and IP partitioning  
   - Interconnect architecture (NoC, bus)  
   - Memory hierarchy & coherency  
   - Pipeline stages  
   - Cache organization  
   - Dedicated accelerator units  
   - Monolithic vs. **chiplet-based** 

3. **RTL Design (Register Transfer Level)**  
   Write synthesizable hardware description:  
   - Primary language: **SystemVerilog** (sometimes VHDL)  
   - This RTL becomes the **golden reference** for the entire flow  

   → Output: RTL code (`.sv` / `.v` files)

4. **Functional Verification**  
   Most time-consuming stage (~50–70% of project effort)  
   Prove RTL matches specification.  

   Modern techniques:  
   - Constrained-random simulation  
   - UVM testbenches  
   - Formal property verification  
   - Hardware emulation / prototyping (Cadence Palladium, Siemens Veloce, Synopsys ZeBu)  
   - AI/ML-assisted coverage closure & debug  

   → Goal: 100% functional coverage + high confidence of bug-free design

5. **Logic Synthesis**  
   Convert RTL → gate-level netlist  
   - Target: specific process node standard cell library (e.g., TSMC 3nm, Samsung 2nm, Intel 18A)  
   - Perform initial PPA (Power, Performance, Area) optimization  

   → Output: Gate-level netlist + preliminary timing/power/area reports

6. **Design for Test (DFT)**  
   Insert test structures to enable high manufacturing test coverage:  
   - Scan chains & test compression  
   - Memory BIST (MBIST)  
   - Boundary scan (JTAG/IEEE 1149.1)  
   - ATPG pattern generation  
   - Logic BIST (LBIST) where applicable  

   → Target: >95–99% test coverage with reasonable test time & cost

7. **Physical Design (Backend / RTL-to-GDSII)**  
   Transform netlist into physical layout — most tool-intensive & complex phase  

   Key steps:  
   - Floorplanning  
   - Power planning (power grid, IR drop / electromigration analysis)  
   - Placement  
   - Clock Tree Synthesis (CTS)  
   - Routing  
   - Timing closure (Static Timing Analysis — STA)  
   - Physical verification:  
     - DRC (Design Rule Check)  
     - LVS (Layout vs. Schematic)  
     - ERC, antenna effect, EM/IR sign-off  
   - Final sign-off (multi-corner multi-mode MMMC analysis, ECO iterations)  

   Modern trends:  
   - Backside power delivery networks  
   - Advanced packaging & chiplet-aware flows  
   - 3D-IC / hybrid bonding planning  

   → Output: Final layout database (**GDSII** or **OASIS** file)

8. **Tape-out**  
   All sign-off criteria met → design database sent to foundry (TSMC, Samsung, Intel, GlobalFoundries, …)  

   **Tape-out** = point of no return  
   → Major functional bugs require very expensive silicon re-spin

9. **Fabrication (Wafer Fab)**  
   - Mask data preparation & mask set creation  
   - Wafer processing (lithography, etch, deposition, CMP, etc. — hundreds of steps)  

   → Typical duration: **2–4 months**

10. **Post-Silicon Validation & Bring-up**  
    - First silicon testing  
    - Functional validation  
    - Performance & power characterization  
    - Yield analysis  
    - Silicon debug (JTAG, logic analyzers, on-chip trace, etc.)  
    - Possible fixes: metal-layer ECOs or full re-spin if critical issues found

11. **Production Ramp & Qualification**  
    - Yield optimization  
    - Reliability qualification (HTOL, burn-in, ESD, etc.)  
    - Packaging & final test program development  
    - Volume manufacturing & shipment
