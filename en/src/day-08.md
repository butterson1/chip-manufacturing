# Day 8: EUV Lithography
## The Most Complex Machine Humans Have Ever Built

Yesterday we walked through the fab — the $20 billion cleanroom cathedral where chips are born. We ended with a teaser about a $380 million machine that prints features smaller than a virus. Today, we meet that machine: the ASML NXE and EXE series extreme ultraviolet (EUV) lithography scanners. If you come away from this course remembering only one piece of technology, let it be this one. EUV is, by virtually any reasonable measure, the most complex piece of engineering humanity has ever assembled.

That's not hyperbole. A single EUV scanner contains approximately **100,000 individual parts**, sourced from hundreds of specialized suppliers across dozens of countries. It weighs around 180 metric tons — roughly the mass of a Boeing 747 — yet must position its internal optics with a precision of less than 0.1 nanometers, or about the diameter of a single hydrogen atom. It ships in 40 freight containers and takes six months to install and calibrate. And ASML, the Dutch company headquartered in Veldhoven that manufactures them, is the *sole supplier on Earth*. Not one of the leading suppliers — the **only** one.

## Why EUV? The Resolution Problem

To understand why the semiconductor industry spent nearly three decades and an estimated $10-15 billion developing EUV, we need to revisit a fundamental limit from Day 3: the **Rayleigh criterion**. The smallest feature a lithography system can print is roughly proportional to the wavelength of light it uses. The formula: *minimum feature size ≈ k₁ × λ / NA*, where λ is wavelength, NA is the numerical aperture of the lens, and k₁ is a process-dependent factor.

For decades, the industry used deep ultraviolet (DUV) light at **193 nanometers** wavelength, produced by argon fluoride (ArF) excimer lasers. Through heroic engineering — immersion lithography (Day 3), optical proximity correction, multiple patterning — they stretched 193nm DUV far beyond what anyone thought possible. TSMC's 7nm node, which debuted in 2018 and powered the A12 Bionic chip in the iPhone XS, was still manufactured using 193nm DUV with quadruple patterning. That means to print a single layer, the wafer had to go through the lithography-etch cycle **four times**, each pass defining a fraction of the final pattern and each pass adding cost, time, and opportunities for misalignment.

Multi-patterning worked, but it was drowning in complexity. At 5nm, you'd need quintuple or even sextuple patterning for the tightest metal layers — a logistical nightmare that would crater throughput and send costs spiraling. The industry needed a shorter wavelength.

EUV operates at **13.5 nanometers** — about 14 times shorter than DUV's 193nm. With a single EUV exposure, you can print patterns that would require four or more DUV passes. This is the core value proposition: fewer exposures per layer, lower cost per patterning step (eventually), tighter pattern fidelity, and a path to continued scaling. But getting from "13.5nm light would be nice" to "a working machine that prints 200 wafers per day" required solving a cascade of physics problems that almost broke the entire industry.

## Making the Light: Tin Droplets and a Laser Cannon

Here's the first problem: nothing is transparent to 13.5nm light. Not glass. Not quartz. Not air. Not *anything*. At this wavelength, photons are so energetic they're absorbed by essentially every material, including the air itself. You can't use lenses, because the light would never pass through them. You can't let the beam travel through atmosphere, because oxygen and nitrogen absorb it instantly. The entire optical path must operate in a **near-perfect vacuum**.

So how do you even *generate* EUV light? You can't use a gas laser or an LED. The method ASML and its light-source partner **Trumpf** (a German industrial laser company) settled on is gloriously violent: you vaporize molten tin with a preposterously powerful CO₂ laser.

The process works like this. A tin droplet generator — essentially a precisely controlled nozzle — fires tiny droplets of molten tin, each about **25 micrometers in diameter** (roughly the width of a thin human hair), at a rate of **50,000 droplets per second**. These droplets fall through a vacuum chamber at approximately 70 meters per second. As each droplet arrives at the focal point, it's hit by a **pre-pulse** from a lower-power laser that flattens and expands it into a thin pancake shape, maximizing the surface area. Then, roughly a microsecond later, the main CO₂ laser — a **25-kilowatt** beast built by Trumpf, one of the most powerful industrial lasers in existence — strikes the flattened tin target.

The energy is so intense that the tin is heated to approximately **500,000°C** — about 40 times hotter than the surface of the Sun — creating a **plasma** that radiates photons at a broad spectrum of wavelengths. The 13.5nm EUV photons are just a fraction of the total output: the **conversion efficiency** from laser power to usable EUV light is only about **5-6%**. Most of the energy becomes heat, debris, and out-of-band radiation that must be captured and managed.

This means the 25kW CO₂ laser ultimately produces only about 250-400 watts of usable EUV light at the intermediate focus point — and after losses through the optical system, roughly **200-250 watts** reaches the wafer. For comparison, a couple of bright desk lamps. That seemingly tiny number represents three decades of optimization; early prototypes in the 2000s produced barely 10 watts. Every doubling of source power was a multi-year engineering struggle.

The tin debris, meanwhile, is a nightmare. Vaporized tin atoms and ions spray everywhere inside the source chamber, threatening to coat and damage the delicate collector mirror. ASML uses a combination of hydrogen gas flow (which reacts with tin to form volatile stannane, SnH₄, that can be pumped away), magnetic debris mitigation fields, and periodic in-situ cleaning to keep the collector functional. The collector mirror itself has a designed lifetime of approximately 30,000-40,000 hours of operation, after which it must be replaced — a major maintenance event.

## The Optics: Mirrors Smooth to the Atomic Level

Since lenses are useless at 13.5nm, EUV systems use **reflective optics** — mirrors. But not ordinary mirrors. At this wavelength, even a polished silver mirror would absorb most of the light. Instead, EUV mirrors use **multilayer coatings**: alternating layers of molybdenum and silicon, each pair just 6.9 nanometers thick, stacked approximately **40-50 bilayers** deep. This structure acts as a Bragg reflector — each interface reflects a tiny amount of EUV light, and when the layers are spaced to match the wavelength, the reflections constructively interfere to produce a usable reflected beam.

Even with this trick, each mirror reflects only about **67-70%** of the incoming EUV light. An EUV scanner's optical column contains **six mirrors** between the mask and the wafer (the "projection optics box"), plus additional mirrors for illumination. If each mirror reflects 67%, six mirrors in series pass through only 0.67⁶ ≈ **9%** of the light. Add the illumination optics and the mask itself (also reflective, with its own losses), and total optical transmission from source to wafer is roughly **2-4%**. This is why source power matters so desperately — you're losing 96-98% of your light just getting it where it needs to go.

These mirrors are manufactured by **Carl Zeiss SMT** in Oberkochen, Germany — ASML's exclusive optics partner. The surface quality required is almost incomprehensible. The root-mean-square (RMS) surface roughness must be less than **0.05 nanometers** — that's about **a quarter of the diameter of a silicon atom**. Zeiss has described it as follows: if you scaled one of their mirrors up to the size of Germany (about 900 km across), the largest bump on the surface would be less than **0.1 millimeters** tall. A human hair laid on a football pitch would be a mountain range by comparison.

Achieving this flatness requires proprietary ion-beam figuring techniques where individual atoms are sputtered off the mirror surface to correct imperfections, guided by interferometric measurements with sub-angstrom precision. Each mirror in the projection optics set takes months to manufacture and test, and a complete set of six mirrors is rumored to cost in the range of **$50-100 million** — for optics alone.

## The Mask (Reticle): No More Transparent Templates

In DUV lithography, the mask (or reticle) is a transparent quartz plate with a chrome pattern — light shines through the transparent areas and is blocked by the chrome. Simple conceptually. But since nothing transmits 13.5nm light, EUV masks must also be **reflective**. An EUV mask is built on a special ultra-low thermal expansion substrate (typically glass-ceramic with near-zero coefficient of thermal expansion), coated with the same type of Mo/Si multilayer Bragg reflector used in the optics. The circuit pattern is formed by an **absorber layer** — typically tantalum-based compounds — deposited on top of the reflective coating. Where the absorber is present, EUV light is absorbed; where it's been etched away, the light reflects toward the wafer.

This reflective mask geometry means the illumination light must arrive at an **angle** (about 6° off-normal), which introduces subtle but nasty optical effects. **Shadowing** from the absorber edges creates asymmetric pattern profiles that shift slightly depending on the feature's orientation on the mask. Correcting these effects requires sophisticated computational lithography models and, increasingly, new absorber materials with higher absorption per unit thickness. Companies like **Shin-Etsu Chemical** and **Hoya** supply the mask blanks, and a single EUV mask blank can cost **$50,000 to $100,000** before any pattern is written on it — compared to about $5,000-10,000 for a DUV mask blank.

Here's the counterintuitive surprise: despite being "defect-free," every EUV mask blank has defects — tiny pits and bumps in the multilayer coating, typically 1-3 per blank at the critical inspection level. The trick is to map these defects and then design the chip layout so that no critical feature lands on a known defect location. At tens of thousands of dollars per blank, you don't throw them away — you engineer around them.

## The Scanner: Orchestrating Chaos at 90 mph

With the light source, optics, and mask ready, the actual scanning exposure works like this: The mask and the wafer move in **opposite directions** through the exposure slit, synchronized by a dual-stage positioning system. The mask moves at approximately **2 meters per second**, while the wafer stage moves at roughly **0.6 m/s** (since the optics have a 4× reduction ratio, every movement on the mask translates to one-quarter the movement on the wafer).

The **wafer stage** is a marvel of mechatronics. It must accelerate and decelerate the 300mm silicon wafer (plus its chuck and surrounding hardware) with nanometer-level positioning accuracy at high speed, all while operating in vacuum. ASML's latest stages use **magnetic levitation** — the wafer chuck floats on magnetic bearings with zero mechanical contact, eliminating friction-induced vibrations. Stage overlay accuracy — how well each new layer aligns to the previous one — is currently below **1.5 nanometers** in ASML's NXE:3800E system. That's roughly five silicon atoms. The system achieves this by using multiple laser interferometers and alignment sensors that track fiducial marks on the wafer surface in real time, feeding corrections to the stage actuators thousands of times per second.

**Throughput** is the other critical metric. Semiconductor manufacturing is a high-volume business: TSMC processes over 2 million 300mm wafers per month across all its fabs. A single EUV scanner must keep up. ASML's current flagship, the **NXE:3800E**, achieves a throughput of approximately **220 wafers per hour** (WPH) at standard dose conditions — meaning each 300mm wafer, with its 100+ die, is fully exposed in about 16 seconds. The next-generation **EXE:5000** series, which uses a larger **High-NA** (0.55 vs. 0.33 NA) optical design, initially targets 185 WPH but is expected to reach 200+ as the platform matures.

## The Price Tag and the Monopoly

An NXE:3800E EUV scanner costs approximately **€350-380 million** (about $380-410 million USD). The next-generation High-NA EXE:5200, which ASML began shipping in 2024, costs roughly **€350 million** per unit — though that's likely to rise as the platform matures. A leading-edge fab requires **15-20 EUV scanners**, meaning the lithography tools alone represent $6-8 billion of the fab's total investment.

ASML's monopoly isn't merely commercial — it's an artifact of physics and supply chain complexity. The CO₂ laser comes from **Trumpf** in Germany. The mirrors come from **Zeiss** in Germany. The mask inspection tools come from **Lasertec** in Japan. The photoresists come from **JSR**, **Tokyo Ohka Kogyo**, and **Shin-Etsu** in Japan. No single country could replicate the full stack alone, which is why EUV has become a geopolitical chokepoint: when the Dutch government, under US pressure, restricted ASML's ability to export EUV systems to China in 2023, it effectively capped China's ability to manufacture chips beyond approximately the 7nm node.

ASML's revenue tells the story of this monopoly's value: in 2024, the company reported **€28.3 billion** in revenue with a net income of approximately €7.6 billion — a 27% net margin that would make most companies weep with envy. Their backlog stretches years into the future, and customers (TSMC, Samsung, Intel, SK Hynix) must commit to orders long before delivery.

## High-NA: The Next Chapter

The current NXE systems use a numerical aperture (NA) of **0.33**. This limits the minimum printable half-pitch to roughly 13nm (using k₁ ≈ 0.31). For context, TSMC's N3 (3nm) node uses minimum metal pitches around 21-24nm, and N2 (2nm) pushes toward 20nm — still within single-exposure 0.33 NA capability for most layers.

But for future nodes — A16 (1.6nm class), A14, and beyond — some critical layers will need tighter resolution. ASML's answer is **High-NA EUV**, the EXE series, which increases the numerical aperture to **0.55**. This sounds like a modest bump (0.33 → 0.55), but it's a massive engineering overhaul. The projection optics must be completely redesigned — Zeiss spent over a decade developing the new anamorphic (different magnification in X and Y: 4× in one axis, 8× in the other) optical column. The mirrors are larger, requiring even more extreme surface quality. The scanner is physically bigger, heavier, and more expensive.

High-NA EUV can print features down to approximately **8nm half-pitch** with single exposure — buying the industry at least two to three more node generations of scaling runway. Intel has been the most vocal champion, installing the first EXE:5000 ("Twinscan EXE") at its Hillsboro, Oregon R&D fab in late 2023 for development of the Intel 14A node (expected ~2026-2027). TSMC and Samsung are expected to adopt High-NA for their 1.4nm-class and sub-1.4nm nodes, likely entering production in the 2027-2028 timeframe.

## The Numbers That Boggle

Let's step back and appreciate the absurdity of what's happening inside an EUV scanner 24 hours a day, seven days a week, inside every leading-edge fab on Earth:

- **50,000** tin droplets per second are fired, hit by a prepulse, then vaporized by a 25kW CO₂ laser, creating a 500,000°C plasma
- That plasma emits **13.5nm photons** that bounce off 6+ mirrors polished to sub-atomic smoothness
- The photons pass through a **vacuum chamber** (since air absorbs EUV) and reflect off a mask that costs $300,000-$500,000 to produce
- The pattern is projected onto a wafer moving at 0.6 m/s, positioned to within **1.5 nanometers** by magnetically levitating stages
- This happens **220 times per hour**, each 300mm wafer receiving perhaps 100 billion transistors' worth of patterning
- The whole machine draws approximately **1.2 megawatts** of power — enough for about 1,000 homes
- And the machine costs **$380 million**, roughly the price of a Boeing 787 Dreamliner

If the 20th century's iconic machine was the Saturn V rocket, the 21st century's is arguably the EUV scanner. Both push physics to absolute limits. Both are products of vast international supply chains. But while we built 13 Saturn Vs and retired them, ASML ships roughly **50-60 EUV scanners per year**, and each one operates continuously for over a decade. The cumulative engineering hours embedded in the global EUV fleet dwarf any single project in human history.

## What Comes After?

EUV at 13.5nm isn't the end of the road. Researchers at ASML, TSMC, and various national labs are already investigating **BEUV (Beyond EUV)** at even shorter wavelengths — possibly 6.x nm, using gadolinium or other exotic plasma sources. But that's likely decades away. The more immediate path is squeezing every last drop of resolution from High-NA EUV, potentially combined with EUV double patterning for the tightest layers.

Tomorrow, we'll explore what happens *after* the light hits the wafer — the brutal, precise art of **etching and deposition**, where plasma carves trenches just nanometers wide into silicon and atomic-layer deposition builds up materials one atom at a time. If EUV is the pen that draws the blueprint, etching and deposition are the chisel and mortar that build the actual structure.

---

<div style="text-align: center; margin: 2em 0;">

**Ready to test your knowledge?**

</div>

{{#quiz quizzes/day-08.toml}}
