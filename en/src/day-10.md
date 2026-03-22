# Day 10: Doping & Ion Implantation
## Giving Silicon Its Electrical Personality

Yesterday we carved trenches and deposited films — sculpting the physical architecture of a chip with plasma and atomic-layer precision. But a perfectly carved block of pure silicon does exactly nothing useful. It just sits there, a crystalline lump with the electrical charisma of a piece of glass. To make it *compute*, you have to fundamentally alter its electronic character — not by changing its shape, but by corrupting its atomic soul.

This is **doping**: the deliberate introduction of impurity atoms into a silicon crystal to control whether and how easily electrical current flows. It is the single most important trick in semiconductor physics, the reason a $0.01 piece of silicon can become a $300 processor. And the way modern fabs do it — firing beams of ionized atoms at wafers with energies comparable to a particle physics experiment — is one of the most precisely controlled processes in all of manufacturing.

## Why pure silicon is useless (and beautiful)

Silicon sits in Group 14 of the periodic table. Each atom has four valence electrons, and in a perfect crystal, every atom bonds covalently with four neighbors in a diamond cubic lattice. All electrons are spoken for. There are no free carriers to carry current at absolute zero. Silicon is, at its purest, an **intrinsic semiconductor** — and at room temperature its intrinsic carrier concentration is only about **1.5 × 10¹⁰ carriers per cubic centimeter**. That sounds like a lot until you realize a cubic centimeter of silicon contains about **5 × 10²² atoms**. The ratio of free carriers to atoms is roughly one in a trillion.

This makes pure silicon a terrible conductor. Its resistivity at room temperature is about **2,300 ohm-centimeters** — millions of times more resistive than copper (1.7 × 10⁻⁶ Ω·cm) but far more conductive than glass (10¹⁰ Ω·cm). It is stuck in an electrical no-man's-land, which is precisely why it is useful. A material that already conducts well cannot be easily switched. A material that never conducts is useless. Silicon sits at the Goldilocks point where a relatively small nudge can push it from insulator to conductor.

That nudge is doping.

## The periodic table as a palette

The idea is simple: replace some silicon atoms (four valence electrons) with atoms that have either **five** or **three** valence electrons. This creates either an excess electron or a missing electron — a "hole" — that can move through the lattice and carry current.

**N-type doping** uses Group 15 elements, most commonly **phosphorus** (P) or **arsenic** (As). A phosphorus atom slots into the silicon lattice and bonds with four neighbors, just like silicon. But phosphorus has five valence electrons, so one is left over, loosely bound. At room temperature, thermal energy is enough to liberate it. That extra electron becomes a free carrier. If you replace just one in every million silicon atoms with phosphorus — a concentration of about **5 × 10¹⁶ atoms/cm³** — you increase the free carrier count by a factor of roughly **three million** compared to intrinsic silicon. The resistivity plummets from 2,300 Ω·cm to around **0.1 Ω·cm**.

**P-type doping** uses Group 13 elements, most commonly **boron** (B). Boron has only three valence electrons, so when it occupies a silicon site, one bond is unsatisfied. This creates a hole — a positively charged vacancy that neighboring electrons can hop into. Holes move through the crystal as effective positive charges, and p-type silicon conducts just as well as n-type at equivalent doping levels.

Here is where things get interesting: a single piece of silicon can be n-type in one region and p-type in another. The boundary between them — the **p-n junction** — is where transistor magic happens. Carriers diffuse across the boundary, creating a built-in electric field and a depletion region. Apply a voltage, and you can widen or collapse that region, turning current flow on and off. Every MOSFET, every diode, every solar cell depends on this trick.

The challenge, as always, is control. A modern FinFET transistor might have a channel region **5 nanometers** wide where the doping concentration must be precisely **10¹⁸ atoms/cm³** at the surface and fall off to **10¹⁵ atoms/cm³** just 50 nanometers deeper. The source and drain regions right next to it might need **10²¹ atoms/cm³** — a thousand times higher — to minimize contact resistance. Getting these profiles right, in three dimensions, across billions of transistors on a 300 mm wafer, is the job of **ion implantation**.

## Ion implantation: a particle accelerator for manufacturing

In the early days of semiconductor manufacturing (1950s–60s), doping was done by **thermal diffusion**: place wafers in a furnace at 900–1100°C alongside a gas containing the dopant (like phosphine or diborane), and let atoms diffuse into the surface. This works, but it is imprecise. Diffusion follows complementary error function profiles that depend on temperature, time, and crystal orientation. You cannot easily control the depth independently of the dose. And at the high temperatures required, dopants already in the wafer move around — a phenomenon called **dopant redistribution** that wreaks havoc on previously established junctions.

Ion implantation changed everything. Invented in its modern form in the 1960s and commercialized by companies including **Varian Semiconductor** (now part of **Applied Materials**) and **Axcelis Technologies**, ion implantation works like this:

1. **Ion source**: A gas containing the desired dopant — BF₃ for boron, PH₃ for phosphorus, AsH₃ for arsenic — is fed into an arc chamber. An electric discharge ionizes the gas, creating a plasma of various ion species.

2. **Mass analysis**: The ion beam passes through an **analyzing magnet** — essentially a mass spectrometer. Different ion species curve at different radii because of their different mass-to-charge ratios. A resolving slit selects only the desired species. If you want boron-11 (mass 11), the magnet bends ¹¹B⁺ ions right through the slit while BF₂⁺ (mass 49) and ¹⁰B⁺ (mass 10) get intercepted. The mass resolution is typically better than **1 atomic mass unit**, ensuring isotopic purity.

3. **Acceleration**: The selected ions are accelerated through an electric potential. The energy is typically **0.2 keV to 3 MeV**, depending on how deep you need the ions to go. Low energies (a few hundred eV to a few keV) produce ultra-shallow junctions near the surface — critical for modern source/drain extensions. High energies (hundreds of keV to MeV) bury dopants deep in the substrate for retrograde well structures.

4. **Beam scanning**: The energized beam is scanned across the wafer (or the wafer is mechanically scanned through the beam) to achieve uniform coverage. Modern tools achieve dose uniformity of **±0.5%** across a 300 mm wafer — meaning the number of implanted atoms per square centimeter varies by less than half a percent from center to edge.

5. **Dose control**: The total dose is measured by integrating the beam current over time. A Faraday cup or dose measurement system tracks every ion hitting the wafer. Typical doses range from **10¹¹ ions/cm²** (threshold voltage adjustment — just a whisper of dopant) to **10¹⁶ ions/cm²** (heavily doped source/drain — a saturating flood). That is a dynamic range of **100,000×**, all from the same tool.

The beauty of ion implantation is that energy and dose are **independently controllable**. Turn the acceleration voltage up, and ions go deeper. Turn the beam current up (or implant longer), and more ions accumulate. You get a knob for depth and a separate knob for concentration. Diffusion gives you no such luxury.

## What happens when ions hit silicon

An arsenic ion accelerated to 100 keV slams into the silicon lattice at roughly **600,000 meters per second** — about 0.2% the speed of light. It does not gently nestle into a lattice site. It crashes through the crystal like a cannonball through a china shop.

Each incoming ion undergoes two types of energy loss as it plows through the lattice:

- **Nuclear stopping**: The ion collides with silicon nuclei, transferring kinetic energy in billiard-ball-like collisions. These events displace silicon atoms from their lattice sites, creating **Frenkel pairs** (a vacancy plus a displaced interstitial atom). A single 100 keV arsenic ion can displace roughly **2,000 silicon atoms** along its path.

- **Electronic stopping**: The ion interacts with the electron cloud, losing energy gradually — like friction. This dominates at higher energies and causes less structural damage.

The ion eventually comes to rest at some depth, called the **projected range** (Rp). For 100 keV arsenic in silicon, Rp is about **70 nanometers**. For 10 keV boron, it is about **35 nanometers**. For 500 eV boron — used in ultra-shallow junction implants at leading-edge nodes — it is only **2 to 3 nanometers**. The distribution is roughly Gaussian, with a standard deviation called the **straggle** (ΔRp), typically 20–40% of the projected range.

But here is the counterintuitive part: **after implantation, almost none of the dopant atoms are electrically active.** They are sitting in random interstitial positions, surrounded by a blasted-out damage zone. The crystal lattice around each ion track looks like a war zone — vacancies, displaced atoms, amorphous pockets. If you measured the resistivity at this point, it would be *higher* than before implantation, not lower.

This is why every implant must be followed by **annealing**.

## Annealing: healing the crystal and waking up the dopants

Annealing is the application of heat to repair implantation damage and coax dopant atoms into **substitutional lattice sites** — the positions where they replace a silicon atom and contribute their extra electron (or hole) to conduction. It is the difference between having foreign atoms sitting uselessly between lattice sites and having them integrated into the crystal as electrically active donors or acceptors.

The challenge is ferocious: you need enough thermal energy to repair the crystal and activate dopants, but not so much that the dopants **diffuse** away from where you put them. This is a genuine physical dilemma. At 1000°C, silicon self-diffusion and dopant diffusion are both significant. Boron is particularly troublesome — it diffuses readily even at moderate temperatures, and a phenomenon called **transient enhanced diffusion (TED)** makes it even worse. TED occurs because the excess interstitial silicon atoms created during implantation act as "vehicles" that kick boron atoms from site to site far faster than thermal diffusion alone would predict. A boron profile that was carefully implanted to extend only 10 nm deep can balloon to 30 nm after a conventional anneal.

The industry's solution: **make the anneal brutally short.**

**Rapid thermal annealing (RTA)** heats the wafer to 900–1100°C in **1 to 10 seconds** using banks of halogen lamps, then cools it rapidly. This activates perhaps **90–95%** of the dopant while limiting diffusion to a few nanometers.

But for the most advanced nodes, even RTA allows too much diffusion. Enter **millisecond annealing (MSA)** and **laser spike annealing (LSA)**. In these techniques, a high-power laser — often a CO₂ laser at 10.6 μm wavelength or a diode laser array — sweeps across the wafer surface. The surface heats to **1200–1350°C** for roughly **0.1 to 3 milliseconds** — long enough to activate dopants but so brief that thermal diffusion is limited to less than **1 nanometer**. Companies like **Mattson Technology** (now part of **Beijing E-Town Semiconductor**), **Veeco** (which acquired Ultratech), and **Applied Materials** (through its Varian acquisition) have all developed advanced annealing platforms.

The temperature precision required is remarkable. A 10°C difference in peak anneal temperature can change dopant activation by 20% and shift junction depth by 1–2 nm. At nodes where the entire transistor channel is 5 nm long, that is the difference between a working chip and scrap.

## The dopant zoo: choosing the right atom

Not all dopants are created equal. The choice depends on the job:

**Boron (B)** — The workhorse p-type dopant. Atomic mass 11, the lightest common dopant. Light mass means boron penetrates deep for a given energy, which is both useful (for deep wells) and problematic (for shallow junctions). Boron also exhibits the worst TED. At the most advanced nodes, fabs use **pre-amorphization implants** — blasting the surface with germanium or silicon ions first to destroy the lattice and suppress channeling — before implanting boron.

**Phosphorus (P)** — The traditional n-type dopant. Mass 31, moderate diffusivity. Used for deep wells, threshold voltage adjustment, and lightly doped drain extensions. Activates well at relatively modest temperatures.

**Arsenic (As)** — The heavy n-type dopant. Mass 75 — more than twice as heavy as phosphorus. This heft is an advantage: arsenic stays put. Its diffusion coefficient in silicon is about **10× lower** than phosphorus at the same temperature. This makes arsenic the go-to species for shallow, heavily doped source/drain regions in NMOS transistors. The downside: arsenic is also one of the most toxic substances handled in semiconductor manufacturing, requiring stringent safety protocols for the arsine (AsH₃) source gas, which is lethal at concentrations above about **10 ppm**.

**Antimony (Sb)** — Even heavier (mass 122), with extremely low diffusion. Occasionally used for buried layers in bipolar and BiCMOS processes, but less common in modern CMOS.

**Indium (In)** — A p-type alternative to boron at mass 115. Used for retrograde channel doping in some processes because its heavy mass allows precise depth control, but low solid solubility limits its maximum concentration.

**Germanium (Ge) and Silicon (Si)** — Not dopants in the electrical sense, but routinely implanted for **pre-amorphization** (as mentioned above) and for creating **strained silicon** structures. Germanium implants are also used in SiGe source/drain formation in PMOS FinFETs and gate-all-around transistors.

## Channeling: the crystal fights back

Silicon is not a featureless block — it is a crystal with a precise atomic arrangement. When the ion beam happens to align with a major crystal axis (like the <110> or <100> direction), incoming ions can travel down the open **channels** between rows of atoms, penetrating far deeper than the random stopping theory predicts. This is **channeling**, and it can extend the dopant profile by 50% or more beyond the intended depth.

The effect is dramatic and deeply annoying. A 15 keV boron implant aimed at a projected range of about 50 nm can produce a channeling tail extending past 200 nm if the beam is aligned with the <110> axis. In a transistor where junction depth tolerances are ±2 nm, this is catastrophic.

Fabs fight channeling in multiple ways:

- **Tilting the wafer** by 7° off the beam axis (the standard tilt) and rotating it (typically 22° or 45°) to avoid all major channels simultaneously.
- **Pre-amorphization implants (PAI)**: Bombarding the surface with heavy ions (germanium, silicon, or carbon) to destroy the crystal structure before the dopant implant. Amorphous silicon has no channels.
- **Screen oxides**: Growing a thin oxide (2–5 nm) on the surface to randomize the trajectory of incoming ions before they enter the crystal.

Even with these countermeasures, channeling models must be calibrated using **secondary ion mass spectrometry (SIMS)** measurements — the gold standard for measuring dopant depth profiles. SIMS works by sputtering the surface with a primary ion beam (usually Cs⁺ or O₂⁺) and analyzing the ejected secondary ions with a mass spectrometer. It can detect concentrations as low as **10¹⁴ atoms/cm³** — roughly one dopant atom per ten billion silicon atoms — with depth resolution of about **1 nanometer**.

## The modern implant challenge: ultra-low energy and high dose

At leading-edge nodes (3 nm and below), the demands on ion implantation have reached extraordinary extremes. Source/drain extensions must be only **3–5 nm deep**. This requires implant energies below **1 keV** — sometimes as low as **200 eV**. At these energies, extracting a high-current ion beam becomes difficult because space-charge effects cause the beam to blow apart. The ions repel each other, and without enough energy, focusing becomes a nightmare.

**Axcelis Technologies** and **Applied Materials** have developed solutions including **deceleration mode** (accelerate the beam at higher energy for transport, then decelerate it just before hitting the wafer), **molecular ion implantation** (implant BF₂⁺ instead of B⁺ — the molecule delivers boron at 1/5 the total energy since only 11/49 of the kinetic energy goes to boron), and **plasma doping (PLAD)** where the wafer is immersed in a dopant-containing plasma and a pulsed negative bias directly attracts ions to the surface. PLAD can achieve effective energies below 100 eV, producing junction depths under 3 nm.

The high-dose end presents its own challenges. For heavily doped source/drain regions needing **5 × 10¹⁵ ions/cm²**, even a high-current beam of 20 milliamps means implanting each wafer for **40 seconds** or more. With modern fabs processing over 100,000 wafers per month, implanter throughput is critical. High-current implanters from Applied Materials (the VIISta platform) and Axcelis (the Purion platform) can deliver **200+ wafers per hour** at standard production doses.

## Beyond implantation: in-situ doping and epitaxy

Ion implantation dominates, but it is not the only way to dope silicon. For some structures — particularly at the most advanced nodes — **in-situ doped epitaxy** has become essential.

In this approach, a thin crystalline layer is grown on top of the existing silicon surface using chemical vapor deposition (CVD), and dopant gas is introduced during growth. The dopant atoms incorporate directly into the growing crystal at substitutional sites, so no implant damage occurs and no anneal is needed to activate them.

This is how modern **raised source/drain** structures are built. For PMOS FinFETs and gate-all-around nanosheet transistors, the source/drain regions are typically **epitaxially grown silicon germanium (SiGe)** doped in-situ with boron to concentrations exceeding **2 × 10²¹ atoms/cm³**. For NMOS, epitaxial **silicon phosphide (Si:P)** with phosphorus concentrations above **3 × 10²¹ atoms/cm³** is used. These concentrations exceed the equilibrium solid solubility — they are **metastable** and can only be achieved because the rapid, low-temperature epitaxial growth freezes the dopants in place before they can cluster or precipitate.

The tools for this work — **epitaxial reactors** from companies like **Applied Materials (Centura and Producer platforms)**, **ASM International (Epsilon and Intrepid series)**, and **Lam Research** — are among the most demanding in the fab. Chamber cleanliness must be extraordinary: even **10 parts per trillion** of oxygen contamination can disrupt the epitaxial growth and destroy the crystalline perfection needed for high carrier mobility.

## Why doping is getting harder (and weirder)

As transistors shrink, doping faces an existential challenge: **statistical fluctuation**. Consider a gate-all-around nanosheet transistor at the 2 nm node. The channel might be a sheet of silicon 5 nm thick, 25 nm wide, and 10 nm long. Its volume is about **1,250 cubic nanometers**, or **1.25 × 10⁻¹⁸ cm³**. At a channel doping concentration of 10¹⁸ atoms/cm³, the expected number of dopant atoms in that channel is... **1.25**.

One or two atoms. The difference between one and two is not a rounding error — it is an **80% change** in threshold voltage. Random dopant fluctuation (RDF) has become one of the dominant sources of transistor variability at advanced nodes. This is why the industry has moved toward **undoped channels** in FinFETs and nanosheet FETs, using work function metals in the gate stack to set the threshold voltage instead of relying on channel doping.

But doping has not gone away — it has just moved to different parts of the transistor. Wells, halos, source/drain contacts, and substrate engineering all still require precisely controlled doping profiles. The tools keep evolving, the species keep diversifying, and the accuracy demands keep tightening.

---

*Tomorrow, we'll follow the current after it exits the transistor — traveling through the **copper interconnect** network that wires billions of transistors together. If doping gave each transistor its personality, interconnects give the chip its nervous system. And building reliable copper wires only 20 nanometers wide, stacked 15 layers high, turns out to be one of the hardest engineering challenges in the entire process.*

---

<div class="quiz-section">

**Ready to test your knowledge?**

</div>

{{#quiz quizzes/day-10.toml}}
