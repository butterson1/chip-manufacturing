# Day 28: What's Next — GAA Transistors, 2D Materials, Optical Interconnects, and the End of Silicon?

*For 27 days, we've studied how silicon became the backbone of civilization. Today, we ask the uncomfortable question: what happens when silicon can't keep up?*

---

## The Walls Closing In

Silicon has had one of the most extraordinary runs in the history of any material. Since the first integrated circuit in 1958, we've shrunk transistors from millimeter-scale to structures where the gate length is roughly **12 nanometers** — about 24 silicon atoms wide. We've scaled from dozens of transistors to hundreds of billions. But every step forward now bumps against not one wall but several, simultaneously: quantum tunneling leaks current through barriers that are simply too thin. Thermal density makes certain regions of chips impossible to cool. Interconnect resistance climbs as copper wires narrow below 15 nanometers, where electron mean free path effects shatter copper's favorable bulk properties. And the economics, as we learned yesterday, make each new generation a $20-billion-plus gamble.

So where do we go from here? The answer isn't a single breakthrough — it's a portfolio of desperate, brilliant bets running in parallel. Some are already in production. Others are a decade or more away. And at least one of them sounds like science fiction. Let's walk through the technologies that will define the next twenty years of computing.

## Gate-All-Around: The Transistor Gets Wrapped

The most immediate revolution is already here, and it arrived in June 2025 when Samsung began shipping its SF2 (2nm-class) GAA process, followed closely by TSMC's N2 ramping in late 2025. Intel's 18A process, also GAA-based, started limited production in early 2025. After over a decade of FinFET dominance — the 3D fin-shaped transistor introduced by Intel at 22nm in 2011 — the industry has collectively moved to gate-all-around architecture.

The concept is elegantly simple. In a FinFET, the gate wraps around three sides of a vertical fin of silicon, leaving the bottom exposed. That bottom surface is a liability: it's a region where the gate's electric field is weaker, leakage current sneaks through, and electrostatic control degrades as you try to scale the fin narrower. At gate lengths below about 5 nanometers — which is where today's "3nm" processes actually operate — FinFET electrostatics become increasingly tenuous.

GAA solves this by stacking **horizontal nanosheets** (or nanowires, if they're narrow enough) and wrapping the gate material around all four sides of each channel. Imagine taking the fin, slicing it into 3–4 thin pancakes stacked vertically, and surrounding each pancake with gate metal. TSMC's N2 uses **four stacked nanosheets**, each roughly 5–6 nanometers thick and 25–50 nanometers wide. Samsung's approach uses slightly different sheet dimensions but the same core principle: complete electrostatic control.

The performance gains are meaningful but not revolutionary — roughly **10–15% speed improvement** or **25–30% power reduction** at the same performance versus the best FinFET nodes. The real value is that GAA *extends the scaling roadmap* by perhaps 3–4 additional generations. Where FinFETs were hitting diminishing returns, GAA nanosheets restore the ability to tune drive current by adjusting sheet width — wider sheets for high-performance cores, narrower sheets for low-power — within the same process. This "variable width" trick is something FinFETs could never do gracefully.

But GAA isn't free. The process complexity is staggering. Manufacturing a nanosheet transistor requires growing a perfectly alternating stack of silicon and silicon-germanium (SiGe) epitaxial layers — typically **8 layers total** for 4 nanosheets — then selectively etching away all the SiGe to release the silicon sheets without damaging them. This "inner spacer" etch must remove material between sheets that are only 8–12 nanometers apart with sub-nanometer precision. One TSMC process engineer described it to me as "performing surgery inside a mailbox slot while blindfolded." The number of EUV layers increases from roughly 20–25 at N3 to 25–30+ at N2, driving up both cost and cycle time.

The next step beyond basic GAA is **CFET** — Complementary FET — where instead of placing NMOS and PMOS transistors side by side, you stack them **vertically on top of each other**. An NMOS nanosheet device sits directly beneath (or above) its PMOS counterpart, connected by tiny internal vias. Intel has demonstrated CFET structures in research and projects they'll appear in production around 2027–2028 at the "14A" node. CFET could shrink standard cell height by another **30–40%**, unlocking a major density jump. But aligning two independent transistors in a vertical stack — each requiring different channel materials, different doping, different work function metals — while maintaining contact to both from a shared set of metal layers is arguably the most complex integration challenge the industry has ever attempted.

## Backside Power: Flipping the Script

There's a surprisingly elegant solution to a problem we discussed on Day 11 (Interconnects) and Day 21 (Power & Thermal): the wiring congestion crisis. In every chip built since the 1960s, both signal wires and power delivery wires share the same side of the transistors — the front side. Power rails and signal routes compete for the same routing tracks, creating congestion that wastes area and adds resistance to the very wires that need to carry the most current.

**Backside power delivery networks** (BSPDNs) flip power to the *back* of the wafer. The idea: after front-side processing is complete, flip the wafer over, thin the silicon substrate from its original 775 µm down to roughly **0.5–1 µm**, and build a separate set of thick, low-resistance power rails on the back. Signals stay on the front. Power comes from behind. Each domain gets optimized independently.

Intel's PowerVia, demonstrated on test chips and planned for the 18A node, showed a **30% reduction in IR drop** (the voltage loss across the power network) and a **6% frequency improvement** at the same power. That may sound modest, but 6% frequency at a mature node is the kind of gain that normally requires an entirely new process generation. TSMC calls their version "Backside Power Rail" and plans to introduce it at their A14 (1.4nm-class) node around 2028.

The counterintuitive part? Thinning a 300mm wafer to 0.5 µm — less than the width of a human red blood cell — and then processing the exposed back surface with lithography and metallization is *actually feasible*. The industry has been thinning wafers for 3D packaging (TSVs, hybrid bonding) for years. Backside power extends this capability to the transistor level. The wafer is temporarily bonded face-down to a carrier wafer during backside processing, then debonded after completion. The mechanical precision required — maintaining sub-100nm alignment between front-side features and backside power rails after flipping — is remarkable, but it works.

## 2D Materials: Beyond Silicon's Limits

Now we enter territory that's genuinely speculative — technologies that work brilliantly in research papers but haven't yet survived the brutal reality of high-volume manufacturing.

Silicon has a fundamental problem at extreme scaling: its **electron mobility degrades** as you make channels thinner. A silicon nanosheet that's 5 nm thick has significantly worse carrier transport than bulk silicon. Go below 3 nm thickness and the performance collapse is severe — surface roughness scattering dominates, and the channel becomes more defect than material. Silicon is, at some level, *too three-dimensional* for truly atomic-scale devices.

Enter **two-dimensional materials** — crystals that are stable as single-atom-thick sheets. The most famous is graphene, a single layer of carbon atoms arranged in a hexagonal lattice, which has extraordinary electron mobility (200,000 cm²/V·s — roughly 100× silicon's). But graphene has a fatal flaw for digital logic: it has **no bandgap**. A graphene transistor can never truly turn off. It's like a valve that can change flow rate but can never fully close.

The real star is **molybdenum disulfide (MoS₂)**, a transition metal dichalcogenide (TMD) that naturally forms stable monolayers just **0.65 nanometers thick** — three atoms: sulfur-molybdenum-sulfur. Crucially, monolayer MoS₂ has a bandgap of **1.8 eV** (even larger than silicon's 1.1 eV), meaning it makes excellent switches that truly turn off. And because it's inherently 2D, thinning it to a monolayer doesn't degrade its properties the way thinning silicon does. There's no surface roughness problem when *the entire material is a surface*.

In 2022, a team at MIT led by Jiadi Zhu demonstrated **MoS₂ transistors with gate lengths of 1 nanometer** — achieved using a single carbon nanotube as the gate electrode. The transistor worked. It switched. The subthreshold swing was near the theoretical ideal of 60 mV/decade. At 1 nm gate length, a silicon transistor would be a quantum-mechanical disaster, with electrons tunneling straight through the channel as if the gate weren't there. MoS₂ handled it because its thin body (0.65 nm) gives the gate extraordinary electrostatic control even at these insane dimensions.

But — and this is a massive "but" — growing high-quality MoS₂ at scale on 300mm wafers with the uniformity, defect density, and throughput that manufacturing demands remains unsolved. The best research results come from **mechanical exfoliation** (literally peeling flakes off a crystal with tape, the same technique used to discover graphene) or small-area CVD growth. TSMC, Samsung, and imec have active programs growing TMDs on wafers, and TSMC published results in 2023 showing wafer-scale MoS₂ growth with reasonable uniformity — but "reasonable" in a research context is still orders of magnitude worse than the defect densities silicon achieves. The transition from "works in a lab" to "works in a fab" typically takes **15–20 years** for a fundamentally new material. Don't hold your breath, but don't write it off either.

## Optical Interconnects: Ending the Copper Bottleneck

Here's a surprising fact: in a modern AI data center, roughly **40–60% of total energy consumption** goes not to computation but to **moving data** — between chips, between boards, between racks, and between buildings. The copper and electrical signaling infrastructure connecting everything is becoming the dominant bottleneck, not the processors themselves.

The problem gets worse at every scale. Electrical signals in copper traces suffer from **frequency-dependent loss**: at the 112 Gbps per lane rates that PCIe 7.0 and 800G Ethernet demand, signal integrity over even a one-meter copper cable requires sophisticated equalization circuits that themselves consume significant power. The energy cost of electrical signaling scales roughly linearly with distance — sending a bit one meter costs about **10–20 picojoules** in a well-designed system. At rack-to-rack distances (10–100 meters), it's worse.

Light doesn't have this problem. Photons in an optical fiber travel at two-thirds the speed of light with essentially **zero frequency-dependent loss** over datacenter distances. The energy to convert between electrical and optical domains (using modulators and photodetectors) has been dropping steadily and now sits at roughly **1–5 picojoules per bit** for short-reach optics — and that number is largely *independent of distance* for runs under a few hundred meters.

The revolution happening right now is **silicon photonics** — building optical components (waveguides, modulators, photodetectors) directly on silicon wafers using existing CMOS fab infrastructure. Companies like **Ayar Labs**, **Lightmatter**, and **Celestial AI** are building co-packaged optics (CPO) that sit directly next to or on top of processor dies, converting electrical signals to light at the chip boundary. TSMC and GlobalFoundries both offer silicon photonics process platforms.

Ayar Labs' **TeraPHY** chiplet, for example, is a silicon photonic I/O die designed to sit in a multi-chip package alongside a processor or switch ASIC. It converts up to **4 Tbps** of electrical signals to optical and back, using wavelength-division multiplexing (WDM) — sending multiple colors of light down a single fiber simultaneously. Each "color" (wavelength) carries an independent data channel. Current systems use 8–16 wavelengths per fiber; next-generation designs target 32 or more.

But the most audacious vision is **optical interconnects on-chip** — replacing the copper wires between cores or between chiplets within a package with photonic waveguides etched into silicon. Lightmatter's **Passage** technology aims to create a photonic interconnect fabric that could connect hundreds of chiplets in a single package with bandwidth densities and energy efficiency that copper physically cannot achieve. Their demonstrations have shown wafer-scale photonic networks carrying data at **less than 1 picojoule per bit** between points on the same die.

The physics works. The engineering is the hard part. Integrating photonic components alongside transistors introduces new challenges: laser sources (typically III-V materials like indium phosphide) don't grow well on silicon and must be bonded or coupled externally. Waveguide dimensions (~200–500 nm) are much larger than transistor features, consuming precious die area. And the entire fiber-optic ecosystem — connectors, packaging, alignment — adds complexity and cost. Still, the trajectory is clear: by 2030, optical I/O will be standard for high-performance AI and networking chips, and by 2035, it may penetrate to the board and even package level.

## The Exotic Horizon: Carbon Nanotubes, Spintronics, and Superconducting Logic

Beyond the technologies likely to reach production in this decade, there's a wilder frontier of research that could reshape computing entirely — or might remain forever in the lab.

**Carbon nanotube (CNT) transistors** have been a tantalizing prospect since the 1990s. A single carbon nanotube — a graphene sheet rolled into a cylinder just 1–2 nm in diameter — is an almost perfect transistor channel: extraordinary carrier mobility, natural 1D confinement, a tunable bandgap depending on the tube's chirality (the angle at which the sheet is rolled). In 2019, a team at MIT led by Max Shulaker demonstrated **RV16X-NANO**, a complete 16-bit RISC-V microprocessor built entirely from carbon nanotube transistors — 14,702 CNT FETs fabricated on a 150mm wafer. It ran programs. It worked.

The catch? Nanotube growth is still plagued by **chirality control** (roughly one-third of as-grown tubes are metallic rather than semiconducting, creating shorts), **placement precision** (tubes need to be aligned in parallel arrays with ~5 nm pitch), and **contact resistance** (the junction between a nanotube and metal electrode remains stubbornly high). Solutions exist in the lab — selective etching of metallic tubes, DLSA (Dimension-Limited Self-Alignment) techniques — but achieving the defect densities required for billion-transistor chips is still far off.

**Spintronics** takes a completely different approach, encoding information not in the presence or absence of electric charge but in the **spin** (magnetic orientation) of electrons. MRAM (Magnetoresistive RAM) is already a commercial spintronic technology, shipping in millions of units from Samsung, TSMC (embedded in their logic processes), and others. But spintronic *logic* — building computational gates from magnetic tunnel junctions — could enable circuits that consume **zero standby power** (spins retain their state without power, unlike charge-based transistors) and operate at extremely low voltages. Intel's research division has published on **MESO** (MagnetoElectric Spin-Orbit) logic devices that combine magnetoelectric and spin-orbit coupling effects to switch at 100 mV — one-fifth of silicon's minimum voltage — with 10–30× lower switching energy.

**Superconducting logic** exploits the fact that certain materials, when cooled below their critical temperature (typically 4–10 Kelvin, or about -269°C to -263°C), carry current with **zero electrical resistance**. RSFQ (Rapid Single Flux Quantum) circuits encode bits as tiny magnetic flux quanta (2.07 × 10⁻¹⁵ webers) that propagate through circuits made of Josephson junctions — superconducting loops interrupted by thin insulating barriers. These circuits can clock at **hundreds of gigahertz** while dissipating almost no power per switching event. The catch is obvious: you need a cryogenic refrigerator. But for hyperscale data centers already spending billions on power, the total cost of ownership might actually work out — if the fabrication challenges can be solved. IARPA's SuperTools program and companies like SeeQC are actively developing superconducting chip design tools and processes.

## Chiplets and Heterogeneous Integration: The Real Near-Term Path

While exotic materials make headlines, the most impactful "next" technology is arguably the most pragmatic: **stop trying to put everything on one piece of silicon**.

We covered chiplets on Day 13, but their strategic importance deserves emphasis in this final lesson. The future of semiconductor performance scaling isn't just shrinking transistors — it's **mixing and matching** different technologies in a single package. An AI accelerator in 2028 might combine:

- **Logic chiplets** at 2nm GAA for the compute engines
- **HBM4** memory stacks using hybrid bonding at sub-1µm pitch
- **Optical I/O chiplets** at a mature silicon photonics node (45nm SOI) for off-package communication
- **Power management chiplets** at 28nm — because analog doesn't benefit from bleeding-edge scaling
- **A silicon or organic interposer** connecting everything with short, wide, low-power links

This heterogeneous approach sidesteps the fundamental problem that Moore's Law tried to solve through monolithic scaling: you no longer need *every* component to be at the latest node. Each function can be at whatever node makes economic and technical sense. AMD proved this at scale with EPYC — their chiplet-based server CPUs outsold Intel's monolithic designs partly because chiplet yield economics are vastly more favorable for large total-die-area products.

The enabling technology is **advanced packaging**, and the battleground is interconnect density between chiplets. Today's leading-edge 2.5D packaging (TSMC CoWoS-S) achieves roughly **40–50 µm bump pitch**. Hybrid bonding — direct copper-to-copper bonding without solder bumps — pushes this to **3–9 µm pitch** in production, with research demonstrations below **1 µm**. At 1 µm pitch, the bandwidth density between two chiplets approaches what you get *within* a chip's on-die interconnect — effectively erasing the boundary between "one chip" and "multiple chips."

## The End of Silicon? Or Its Transformation?

So will silicon "end"? Almost certainly not — at least not in our lifetimes. What will end is the *monolithic shrinking paradigm* that defined the industry from 1965 to roughly 2025. The next era won't be about making individual transistors smaller (though GAA and CFET will push a few more generations). It will be about:

1. **System-level innovation**: Chiplets, 3D stacking, optical interconnects — scaling the *system*, not just the transistor.
2. **Specialized architectures**: Different silicon for different workloads (we're already here with CPUs, GPUs, TPUs, NPUs — expect this to accelerate).
3. **New materials layered onto silicon**: MoS₂ channels on silicon substrates. III-V compounds for photonics bonded to silicon interposers. Carbon nanotubes grown on silicon wafers. Silicon doesn't go away — it becomes the *platform* on which other materials are integrated.
4. **Fundamentally new computing paradigms**: Quantum computing (which uses silicon as a substrate for superconducting qubits or spin qubits), neuromorphic chips (Intel's Loihi 2 uses standard CMOS to mimic brain synapses), and probabilistic computing.

The semiconductor industry has reinvented itself at least four times — from germanium to silicon, from bipolar to CMOS, from planar to FinFET, from single-die to chiplet. Each time, observers predicted the end of scaling. Each time, engineers found a way through — not by continuing in a straight line but by **turning a corner** into a new dimension of innovation.

The most important lesson from this entire course might be this: the history of semiconductors is not a story about physics or materials or lithography. It's a story about **human ingenuity meeting hard limits and refusing to accept them**. The limit is never the end. It's the beginning of the next chapter.

---

*This is the final lesson of our 28-day journey through the semiconductor world. From the first transistor at Bell Labs to the GAA nanosheets rolling off production lines today, from sand purified to eleven-nines purity to molybdenum disulfide monolayers three atoms thick — you now have a real, technical understanding of how civilization's most complex technology works. The quiz below will test your knowledge of today's material. Thank you for taking this course.*

---

<div class="quiz-placeholder" data-quiz="quizzes/day-28.toml"></div>
