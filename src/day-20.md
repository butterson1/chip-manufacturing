# Day 20: RISC-V — The Open-Source Instruction Set Challenging ARM and x86

*A graduate student's teaching project at UC Berkeley has grown into the most significant architectural insurgency in computing history. RISC-V isn't just another ISA — it's a bet that the instruction set should be as free as the air, and that openness will eventually defeat decades of proprietary lock-in.*

---

## The Berkeley Rebellion

In the summer of 2010, Krste Asanović had a problem. A professor at UC Berkeley's EECS department, he needed a clean, modern instruction set architecture for his graduate-level computer architecture class. Students needed something they could implement from scratch in a semester — a real, practical ISA, not a toy. But every existing option came with baggage.

x86? Intel's instruction set had grown into a sprawling Gothic cathedral of backward compatibility, with over 1,500 instructions accumulated across four decades. Encoding was variable-length, irregular, and riddled with historical oddities — some instructions existed solely to maintain compatibility with the 8008 from 1972. No student could implement a reasonable x86 core in a semester. ARM was cleaner but proprietary: licensing even the architecture specification (an "architecture license") cost $5-15 million upfront plus per-chip royalties of 1-2%. MIPS, the classic RISC teaching architecture from Berkeley's own David Patterson, was encumbered by patents and corporate ownership. SPARC was dying. PowerPC was fading. Every ISA was either too complex, too expensive, or too entangled in corporate interests.

So Asanović, along with graduate students Yunsup Lee and Andrew Waterman, and joined by the legendary David Patterson himself (co-inventor of RISC and author of *the* textbook on computer architecture), decided to design a new one. They started in May 2010. By August, they had a working specification. They called it RISC-V — "risk-five," the fifth generation in Berkeley's RISC architecture lineage, following RISC-I through RISC-IV from the 1980s.

What they created in that summer would, within 15 years, be shipping in **tens of billions of chips** annually and threatening to reshape the entire semiconductor industry.

---

## What Makes an ISA, and Why Does It Matter?

Before diving into RISC-V's design, it's worth understanding what an instruction set architecture actually *is* — because it's one of the most consequential abstractions in all of computing.

An ISA is the **contract between hardware and software**. It defines the set of instructions a processor can execute (add, load, branch, multiply), the registers software can use, the memory model, and how exceptions and interrupts work. It is, crucially, *not* the implementation. The same ISA can be implemented as a tiny microcontroller running at 100 MHz or a superscalar out-of-order beast running at 5 GHz. The ISA defines *what* the processor does; the microarchitecture defines *how* it does it.

This is why ISAs are so sticky. Once an ecosystem builds up around an ISA — compilers, operating systems, application binaries, developer knowledge — switching costs become enormous. x86 has survived since 1978 not because it's a good design (it emphatically isn't, by modern standards) but because the weight of the entire PC software ecosystem sits on top of it. ARM has dominated mobile since the iPhone in 2007 not because it's technically impossible to run x86 on a phone (Intel tried with Atom and failed for business reasons as much as technical ones), but because the ARM ecosystem had already captured the mobile software stack.

This stickiness creates a natural duopoly: x86 for PCs and servers (Intel and AMD), ARM for mobile and increasingly everywhere else (licensed by ARM Holdings, now owned by SoftBank). Between them, these two ISAs account for essentially 100% of the $550+ billion processor market. Everyone else was shut out.

Until RISC-V opened the door.

---

## The Design: Radical Simplicity as a Feature

RISC-V's design philosophy can be summarized in one sentence: **do less, but do it cleanly, and let people add what they need.** The base integer ISA, called RV32I, contains just **47 instructions**. That's it. Forty-seven instructions to define a complete, general-purpose computer. For comparison, ARMv8-A has roughly 400 base instructions, and x86-64 has well over 1,500.

Those 47 instructions cover integer arithmetic (add, subtract, shifts, comparisons), memory access (load and store with a few addressing modes), control flow (branches and jumps), and system operations (environment calls and breakpoints). The encoding is exquisitely regular: all instructions are 32 bits wide, with the opcode always in the same bit positions, source and destination register fields always in the same locations, and immediate values arranged to simplify hardware sign-extension. A hardware engineer implementing a RISC-V decoder can do it in a few hundred lines of Verilog. An x86 decoder requires tens of thousands of lines and often constitutes its own pipeline stage.

But here's the clever part: RISC-V was designed from day one as a **modular** ISA. The base RV32I (or its 64-bit sibling RV64I) is the foundation, and everything else comes as standard extensions, each identified by a single letter:

- **M** — Integer multiply/divide (8 instructions)
- **A** — Atomic memory operations for multi-core (11 instructions)
- **F** — Single-precision floating point (26 instructions)
- **D** — Double-precision floating point (26 instructions)
- **C** — Compressed instructions (16-bit encoding for code density)
- **V** — Vector operations (RISC-V's answer to SIMD)

The combination "RV64GC" (G being shorthand for IMAFD) is what you'd find in an application processor running Linux — roughly equivalent to what ARM Cortex-A cores provide. But a tiny embedded controller might implement only RV32I or RV32IMC, saving thousands of logic gates. A domain-specific AI accelerator might implement RV32IM plus custom extensions for matrix operations. This modularity means the same ISA scales from a $0.03 microcontroller to a data center CPU.

And then there's the **custom extension space**. RISC-V reserves a generous portion of the encoding space — four opcodes, each covering billions of possible instruction encodings — for user-defined extensions. Any company can add proprietary instructions for their specific use case (cryptography, signal processing, machine learning) without conflicting with the standard or anyone else's extensions. This is architecturally unprecedented. It means a chip designer can have the benefits of a standard, well-supported ISA *and* the performance advantages of custom instructions, without the $5-15 million ARM architecture license and without designing an entire ISA from scratch.

---

## The Ecosystem Eruption

A technically elegant ISA is worthless without software. This is where many ISA challengers have died — Itanium had billions of dollars behind it and still failed partly because the software ecosystem never materialized. RISC-V's advantage was being open from the start, which triggered an ecosystem flywheel that would have been impossible for a proprietary ISA.

The **RISC-V International** foundation (originally the RISC-V Foundation, reorganized and moved to Switzerland in 2020 to ensure geopolitical neutrality) now has over **3,600 member organizations** across 70+ countries, including virtually every major semiconductor company: NVIDIA, Google, Qualcomm, Samsung, Intel (yes, Intel), Huawei, Alibaba, and hundreds more. The ISA specification itself is published under a Creative Commons license — anyone can read it, implement it, and sell chips based on it, with **zero licensing fees and zero royalties**.

The software stack has reached critical mass. **GCC** and **LLVM/Clang** both have mature RISC-V backends. **Linux** has supported RISC-V as a first-class architecture since kernel 5.17 (2022). **Android** RISC-V support was announced by Google in 2023 and is actively being developed. **Debian**, **Fedora**, **Ubuntu**, and **FreeBSD** all ship RISC-V ports. Even **Chrome/Chromium** runs on RISC-V. The toolchain gap that killed previous ISA challengers has been largely closed.

On the hardware side, the proliferation is staggering. As of early 2026, RISC-V cores are shipping in an estimated **16+ billion chips per year**, predominantly in embedded and IoT applications. The biggest volume driver? **China**. The U.S. technology restrictions on advanced chip exports to China have made RISC-V strategically essential for Chinese companies. Since no single entity controls RISC-V (unlike ARM, where ARM Holdings can be pressured by governments to revoke licenses), it's sanction-resistant by design. Companies like **Alibaba's T-Head** (which designed the Xuantie C910, a high-performance RISC-V core open-sourced in 2023), **StarFive** (whose JH7110 SoC powers RISC-V single-board computers), and dozens of others are building entire product lines on RISC-V.

---

## The Performance Question: Can RISC-V Compete at the Top?

Here's where things get interesting — and where misconceptions abound. Critics often argue that RISC-V can't match x86 or ARM in high-performance computing. This fundamentally misunderstands what an ISA is.

**An ISA does not determine performance.** Microarchitecture does. The same RISC-V ISA implemented as an in-order, single-issue pipeline will be slow. Implemented as a wide, out-of-order, speculative, multi-GHz machine with massive caches and sophisticated branch predictors, it can compete with anything. The ISA defines the instruction set; the engineering team and the transistor budget determine the speed.

Consider the historical precedent: in the early 2000s, ARM cores were simple, slow, power-efficient chips for feature phones and microcontrollers. Nobody took them seriously as competitors to x86 server processors. Then Apple poured billions into microarchitecture development, and in 2020 the M1 chip demolished Intel's laptop processors in both performance and efficiency — on the ARM ISA. The ISA didn't change. The implementation engineering did.

RISC-V is on the same trajectory, just earlier. **SiFive's P870** (announced 2024) is a 4-wide out-of-order superscalar core targeting 3+ GHz on TSMC N5, with performance projections competitive with ARM Cortex-A720. **Ventana Micro's Veyron V2** is a data center-class RISC-V core designed for server workloads, with coherent multi-socket support and claimed SPECint performance within striking distance of AMD EPYC. **Tenstorrent**, founded by Jim Keller (the legendary CPU architect behind AMD K8, Apple A-series, and AMD Zen), is building RISC-V-based AI processors and general-purpose cores, with their Ascalon core targeting high-performance computing.

The most ambitious effort may be the **European Processor Initiative (EPI)**, which is developing RISC-V-based processors for European supercomputers. Their EPAC (European Processor Accelerator) test chips have been taped out on GlobalFoundries 22nm FDX, with plans to move to advanced nodes. The goal: European-designed, open-ISA processors that reduce the continent's dependence on American and Asian chip architectures.

But perhaps the most surprising performance data comes from an unexpected direction. **Esperanto Technologies** built a chip called ET-SoC-1 with over **1,000 RISC-V cores** — small, efficient ET-Minion cores based on a modified RV64GCV (with vector extensions) plus four beefy ET-Maxion management cores. Built on TSMC 7nm, the chip targeted machine learning inference workloads where massive parallelism matters more than single-thread speed. It demonstrated that RISC-V could be competitive in workload-specific performance by playing to its architectural strengths.

---

## The Custom Extension Superpower

The truly disruptive aspect of RISC-V isn't that it's free (though that helps enormously). It's that it's **extensible**. And this is where the architecture may ultimately outcompete ARM even in scenarios where the licensing cost is irrelevant.

Consider a company building a chip for 5G baseband processing. With ARM, you get the ARM ISA — take it or leave it. You can build custom accelerators *next to* the ARM core and communicate via memory-mapped I/O, but the core itself runs standard ARM instructions. With RISC-V, you can add custom instructions for FFTs, LDPC decoding, or beamforming directly into the processor pipeline. Data flows through the register file without the overhead of transferring to and from a separate accelerator. This can yield **2-10× performance improvements** for domain-specific workloads compared to a standard ISA with external accelerators.

**Qualcomm** has reportedly been exploring RISC-V with custom extensions for its modem DSPs. **Western Digital** announced in 2019 that it was transitioning all of its embedded cores — over **two billion cores per year** — from proprietary architectures to RISC-V, partly because custom extensions let them optimize for storage controller workloads. **NVIDIA** uses RISC-V cores as microcontrollers within its GPU designs (the falcon microcontroller in GeForce GPUs was replaced with RISC-V cores starting around 2020). **Google** uses RISC-V in its Titan security chips.

The custom extension model creates a fascinating tension: standardization versus specialization. A RISC-V core with Google's custom AI extensions isn't binary-compatible with one running Qualcomm's 5G extensions. But the *base* ISA is standard, so the OS, compilers, and standard libraries all work everywhere. Custom extensions are called through specific opcodes that trap and can be emulated (slowly) on cores that don't support them. It's a pragmatic middle ground that gives chip designers the customization they crave while preserving the ecosystem benefits of standardization.

---

## The Surprising Counterintuitive Truth: The ISA Barely Matters (And That's Why RISC-V Wins)

Here's the paradox at the heart of the RISC-V story: decades of computer architecture research have shown that **the ISA has minimal impact on processor performance and efficiency**. Studies comparing equivalent-class implementations across ISAs show performance differences of typically 5-15% — well within the noise of microarchitectural choices, memory subsystem design, and compiler optimization quality. Apple's ARM chips don't beat Intel's x86 chips because ARM is a better ISA; they beat them because Apple's microarchitecture team is extraordinary and Apple controls the full stack from silicon to software.

If the ISA barely matters for performance, what *does* it matter for? **Cost, freedom, and flexibility.** And on all three dimensions, RISC-V is structurally advantaged.

**Cost:** ARM architecture licenses cost $5-15 million, plus 1-2% per-chip royalties. For a company shipping 100 million chips at $10 ASP, that's $10-20 million per year in royalties alone — money that could fund an entire design team. RISC-V: $0. This matters enormously at the low end, where a $0.50 microcontroller can't absorb meaningful per-unit royalties, and at the high end, where royalties on expensive data center chips add up to hundreds of millions.

**Freedom:** With ARM, you're dependent on a single company (ARM Holdings, owned by SoftBank) for your core technology. If they change licensing terms, get acquired by a competitor (NVIDIA tried in 2020-2022 before regulators killed the deal), or face geopolitical restrictions, your entire product line is at risk. RISC-V's governance through a Swiss-based foundation with thousands of members makes it essentially impossible to restrict.

**Flexibility:** The custom extension model lets every company optimize for their specific workload without designing an entire ISA. This is increasingly important as the "one-size-fits-all" general-purpose CPU gives way to domain-specific architectures.

---

## Where RISC-V Stands Today — And Where It's Going

As of early 2026, RISC-V's market position looks roughly like where ARM was in 2005: dominant in embedded, gaining ground in mid-range application processors, and mounting serious efforts at the high end. The parallels are instructive.

The **embedded/microcontroller** market is already won. RISC-V cores from companies like SiFive (E-series), Andes Technology (N-series), and countless Chinese suppliers have displaced ARM Cortex-M in billions of IoT devices, smart cards, sensors, and consumer electronics. At the bottom end — the truly tiny cores in $0.10 chips — RISC-V's zero-royalty model makes it the obvious choice.

**Application processors** (phones, laptops, single-board computers) are the active battleground. The **SiFive HiFive Unmatched** and **StarFive VisionFive 2** boards run full Linux but with performance roughly comparable to ARM Cortex-A55 class — adequate for development and niche applications but not mainstream consumer devices. The next generation of cores (SiFive P870, Ventana V2) aim for Cortex-A720+ performance, which would make RISC-V genuinely competitive for Android smartphones and Chromebooks. Google's investment in Android RISC-V support signals that they're planning for this future.

**Data center and HPC** remain the frontier. No RISC-V chip has yet demonstrated competitive performance against the latest AMD EPYC or Intel Xeon at scale, but the investments are accelerating. Tenstorrent's roadmap, the European Processor Initiative, and multiple Chinese state-backed efforts all target server-class RISC-V within the next 2-3 years.

The most intriguing possibility is that RISC-V may succeed not by replacing ARM and x86 head-on, but by **enabling entirely new categories of chips** that couldn't exist under the old licensing model. When the ISA is free and extensible, the barrier to creating a custom processor drops from tens of millions of dollars to the cost of an engineering team and some EDA licenses. Startups that could never afford an ARM architecture license can tape out a RISC-V chip. Universities can design and fabricate real processors for research. Countries seeking semiconductor sovereignty can build domestic chip ecosystems without depending on a British-Japanese corporation's permission.

The revolution isn't that RISC-V is better. It's that RISC-V is *free* — and in technology, free eventually wins.

---

## What's Next

Tomorrow, we'll confront the **power wall** — the fundamental thermodynamic reason why we can't just crank up clock speeds anymore. **Power & Thermal: Why We Can't Just Clock Higher** explores Dennard scaling's death, the physics of leakage current, dark silicon, and the creative engineering tricks (from voltage-frequency scaling to chiplet architectures) that keep performance growing despite the iron laws of thermodynamics.

---

<div class="quiz-placeholder" data-quiz-path="quizzes/day-20.toml" data-quiz-day="20"></div>
