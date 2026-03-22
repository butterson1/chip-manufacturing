# Day 9: Etching & Deposition
## Carving and Layering at the Atomic Scale

Yesterday, light did the delicate part. An EUV scanner spent hundreds of millions of dollars and several miracles of physics to project a pattern onto photoresist. But a pattern in resist is just a temporary stencil — like chalk lines on a construction site. The real work begins when chipmakers must turn that faint latent image into hard matter: trenches in silicon, gates wrapped in hafnium oxide, tungsten plugs filling contacts only a few tens of nanometers wide.

This is the part of chipmaking where the industry stops behaving like printing and starts behaving like controlled vandalism. Some steps **remove** atoms with plasma so directional it can dig a shaft 5 micrometers deep and 100 nanometers wide — an aspect ratio of 50:1. Other steps **add** atoms with such discipline that the film thickness can be controlled to a few tenths of an angstrom per cycle. The modern fab alternates between these opposites — carve, coat, carve, coat — hundreds of times.

If lithography is the pen, etching and deposition are the chisel and mortar.

## The basic trick: pattern transfer

After lithography, the wafer surface is covered by photoresist whose exposed areas are either dissolved away or left behind, depending on whether the resist is positive or negative. But photoresist is flimsy. A modern chemically amplified EUV resist might be only **20 to 40 nanometers** thick. It cannot survive the whole process flow, and it definitely cannot serve as the final structure in a chip. So manufacturers use it as a temporary mask to transfer the pattern into something more durable.

That “something” might be a layer of silicon dioxide, silicon nitride, polysilicon, cobalt, tungsten, copper barrier metal, or one of the increasingly exotic materials used in modern logic nodes. A leading-edge transistor stack might include **silicon, silicon germanium, hafnium oxide, titanium nitride, tungsten, ruthenium, cobalt, low-k dielectrics, and various hard masks**. Each material responds differently to chemistry and plasma. That is why process integration engineers obsess over three words: **selectivity, anisotropy, and uniformity**.

- **Selectivity** means attacking one material much faster than another. If you want to etch silicon nitride while barely touching the silicon dioxide beneath it, you need high selectivity.
- **Anisotropy** means etching straight down rather than sideways. Without it, features widen, lines collapse, and transistor dimensions wander out of spec.
- **Uniformity** means doing the same thing at the center of a **300 mm** wafer as at the edge, and doing it again on the next wafer, and again a week later after the chamber has seen thousands of plasma strikes.

Those are not academic niceties. If one SRAM bitcell line is 2 nm narrower than intended, it may switch slower. If a contact hole etches 3 nm deeper than target, it may punch through into the wrong layer. At modern nodes, process windows are measured in single-digit nanometers and fractions of a second.

## Etching: controlled lightning in a vacuum chamber

The word “etching” sounds quaint, like a printmaker using acid. In semiconductor fabs, etching usually means **plasma etching** or **reactive ion etching (RIE)**. Imagine a vacuum chamber roughly the size of a washing machine drum, but built from aluminum, ceramics, quartz, and meticulously engineered electrodes. Inside, engineers feed gases such as **CF4, CHF3, SF6, NF3, Cl2, BCl3, HBr, O2, Ar, and C4F8** at pressures often around **5 to 100 millitorr** — hundreds to thousands of times lower than atmospheric pressure.

Then they strike a plasma with radio-frequency power, often **13.56 MHz**, though modern high-density systems also use separate RF sources in the **2 MHz** range or even microwave excitation. The chamber glows violet or blue. Electrons, being much lighter than ions, gain energy easily from the oscillating field and can reach effective temperatures of **1 to 10 electron-volts** — roughly **11,600 to 116,000 kelvin** if translated into thermal language. Yet the bulk gas can remain near room temperature.

That is the first wonderfully counterintuitive fact: **the plasma’s electrons can be “hotter” than the surface of the Sun while the wafer itself sits near 20°C to 80°C.** Semiconductor manufacturing depends on precisely this imbalance. Energetic electrons create radicals and ions; the wafer should not melt.

The equipment leaders here are companies such as **Lam Research**, **Applied Materials**, **Tokyo Electron (TEL)**, and **Hitachi High-Tech**. Lam in particular became a giant because etch turned into one of the hardest problems in logic and 3D NAND. Its Kiyo and Sense.i platforms are highly tuned plasma ecosystems with endpoint sensors, electrostatic chucks, backside helium cooling, and source/bias power control precise enough to decide whether a sidewall is vertical or tapered.

### Why plasma at all?

Purely wet chemical etching — dipping wafers into acid or base — was common in earlier eras and is still used for some cleaning and isotropic steps. But wet etching attacks in all directions. Plasma lets engineers combine **chemistry** and **directional ion bombardment**.

Take silicon etching with fluorine chemistry. Fluorine radicals react with silicon to form volatile **SiF4**, which leaves the surface as a gas. But radicals alone etch somewhat isotropically. Add ion bombardment, and ions accelerated toward the wafer preferentially activate the bottom of a trench. In effect, chemistry provides the willingness to react; ion directionality provides the shape.

For oxide etching, fluorocarbon plasmas such as **C4F8/CO/Ar/O2** can deposit polymer on sidewalls while ions keep the bottom open. For conductor etch — say tungsten, titanium nitride, or polysilicon — chlorine- or bromine-based chemistries are common because their reaction products have better volatility or manageable surface behavior for those materials.

This is why an etch recipe is more like a cocktail than a single ingredient. Gas ratios, pressure, RF bias, wafer temperature, chuck material, chamber wall condition, and even the pattern density on the wafer all matter. Two wafers with different local pattern density can etch at different rates because radicals are consumed differently — a phenomenon called **loading**.

## Deep trenches and atomic brutality

The poster child for extreme etch is probably **DRIE — deep reactive ion etching** — used heavily in MEMS and some power devices. The classic **Bosch process**, developed at Robert Bosch GmbH in the 1990s, alternates between an etch step using **SF6** and a passivation step using **C4F8**. The passivation coats everything with a fluoropolymer; the next ion bombardment preferentially clears the bottom; the cycle repeats, ratcheting the trench downward. That is how you make silicon trenches **100 micrometers** deep with nearly vertical sidewalls.

Logic chips do not usually need such cartoonishly deep trenches, but the same principle — alternating attack and protection — appears everywhere. In FinFET manufacturing, etch must define fins only a few tens of nanometers wide while preserving line-edge roughness. In **Gate-All-Around nanosheet** devices, etch must later selectively remove sacrificial **silicon-germanium** layers while leaving silicon channels intact, creating suspended sheets. The chemistry must know the difference.

That selectivity is one reason materials choices in transistor design are never purely electrical. If you choose a channel or sacrificial material that cannot later be etched cleanly with enough selectivity, your beautiful device concept may die in process integration.

### Why sidewalls matter so much

A trench is not just a hole; it is an electrical future. Rough sidewalls scatter carriers. Bowed profiles change effective linewidth. “Footing” near the bottom can ruin contact resistance. “Microtrenching” — faster etch at trench corners — can create localized weak spots. Profile control becomes destiny.

The astonishing thing is that these shapes are monitored in production not by peering into each trench with a human microscope operator, but by a web of **metrology** and statistical control. Fabs rely on **CD-SEM** tools from companies like **KLA** and **Hitachi**, optical scatterometry, ellipsometry, endpoint optical emission spectroscopy, and occasional destructive cross-sections via TEM. Engineers then tune recipes so the process behaves as if it were a stable industrial operation rather than a temperamental plasma storm.

## Deposition: building films one atom layer at a time

If etching is subtraction, deposition is addition. Chipmakers need to grow or deposit film after film, each with specific thickness, density, stoichiometry, stress, resistivity, and conformality. The word **conformality** matters because some structures are no longer flat. Modern devices contain narrow holes, sidewalls, buried channels, and 3D memory stacks with aspect ratios that would make a civil engineer nervous.

There are several main deposition families:

### Physical Vapor Deposition (PVD)

PVD is the closest thing semiconductor manufacturing has to spray painting, though the “spray” is made of atoms blasted off a target in vacuum. In **sputtering**, argon ions strike a metal target — say titanium, tantalum, cobalt, or copper seed — ejecting atoms that travel through the chamber and land on the wafer.

PVD is fast and relatively straightforward, but it is line-of-sight. That makes it less ideal for coating deep, narrow features. It remains crucial for many metal films and barrier layers, particularly where high throughput matters. Applied Materials and TEL have long dominated major segments here.

### Chemical Vapor Deposition (CVD)

CVD works by flowing precursor gases over the wafer so they decompose or react at the surface, leaving behind a solid film. Unlike PVD, this can coat complex shapes more uniformly because reactive species diffuse into recesses.

There are flavors:

- **LPCVD** at low pressure, often **550°C to 800°C**, used historically for high-quality polysilicon and silicon nitride.
- **PECVD**, where plasma helps drive chemistry at lower temperatures, often **250°C to 400°C**, essential when thermal budget is limited.
- **SACVD, HDP-CVD, sub-atmospheric CVD**, and many other specialized variants for different films.

The “thermal budget” point is crucial. A front-end wafer early in the process may tolerate **900°C+** anneals. A partially finished logic wafer with delicate junctions and metal stacks cannot. Every high-temperature step risks dopant diffusion, film stress changes, or damage to earlier layers. That is why so much of advanced manufacturing became a race toward lower-temperature processes.

### Atomic Layer Deposition (ALD)

ALD is the jewel of deposition science. Invented in the 1970s by Finnish physicist **Tuomo Suntola**, ALD feeds precursors one at a time so each half-reaction is **self-limiting**. One precursor chemisorbs onto available surface sites and stops. The chamber is purged. A second precursor reacts with that monolayer and stops. Purge again. Repeat.

Instead of trying to dump a film onto the wafer, ALD politely asks the surface for permission one molecular handshake at a time.

Growth rates are slow — often around **0.8 to 1.2 angstroms per cycle** for many oxides, meaning **100 cycles** might deposit only **8 to 12 nanometers**. But the payoff is breathtaking control and conformality, even inside brutally narrow features. This became indispensable when Intel introduced **high-k metal gate** technology at the **45 nm** node in 2007, replacing silicon dioxide gate dielectric with **hafnium-based** films. A gate dielectric only a couple nanometers thick must be uniform everywhere. ALD was built for that job.

Today ALD is used for **HfO2, Al2O3, TiN, TaN, tungsten nucleation layers, cobalt liners**, and many other films. **ASM International** is one of the field’s pioneers; Applied Materials, TEL, Lam, and others all have major ALD portfolios.

Here is the second counterintuitive fact: **sometimes the best way to make manufacturing more precise is to make it slower.** ALD wins not by speed but by refusing to overreact. In the nanometer regime, restraint is throughput of a different kind — throughput of yield.

## Gap fill, voids, and why geometry becomes a tyrant

As structures became 3D, deposition stopped being just “put a film on top.” It became “coat the sidewalls, fill the void, don’t pinch off the opening, don’t trap seams, don’t create keyholes, and don’t exceed the thermal budget.”

Consider contact holes or through-silicon vias. If a film grows too fast near the opening, it can close the top before the cavity fills, leaving a buried void. That void may increase resistance, trap contamination, or create an electromigration weak point years later in the field.

This is why chipmakers stack techniques: maybe a thin ALD nucleation layer for perfect conformality, followed by CVD tungsten for fill, then CMP later to remove the overburden. Modern fabrication is a relay race of complementary imperfections.

In **3D NAND**, deposition and etch become almost absurd. Devices from Samsung, SK hynix, Micron, and Kioxia/Western Digital stack more than **200 layers** of alternating films. Building them involves repeated deposition of oxide/nitride stacks and etching channels through the full tower with aspect ratios so aggressive that process engineers talk about “high aspect ratio” as if it were a separate branch of fluid dynamics. The difficulty is not just making one vertical hole. It is making billions of them identically, at production speed, with commercially tolerable defectivity.

## The tyranny of contamination

Etch and deposition chambers are not static. Their walls absorb chemistry, accumulate films, and evolve with use. A chamber that processed fluorocarbon oxide etch all day is chemically different from a freshly cleaned chamber. This is why fabs talk about **seasoning** — deliberately coating chamber walls to reach a stable operating condition before critical wafers are run.

These systems are more like cast-iron skillets than stainless-steel pots. Chamber history matters.

Particles are a constant enemy. Flakes from chamber deposits can land on a wafer and kill dozens of dies. Metallic contamination at **parts per billion** can wreck minority carrier lifetime or shift device behavior. Oxygen or moisture traces in the wrong deposition module can poison an interface that was supposed to be atomically abrupt.

So the fab fights with cleans. Chamber cleans. Wafer cleans. Remote plasma cleans with **NF3**. Wet cleans using **SC-1, SC-2, dilute HF, ozonated water**. Every process step creates the need for another process step.

## Why this stage decides whether Moore’s Law is real

When people imagine semiconductor progress, they often picture lithography because ASML’s machines are theatrical and expensive. But for many engineers, the true difficulty of advanced nodes lives here. A beautiful EUV pattern is worthless if etch turns vertical walls into jagged caves or if deposition leaves an interface one angstrom rougher than expected.

This is also where economic power shifted. Over the last two decades, **Lam Research, Applied Materials, and Tokyo Electron** became central not because they made the flashiest tools, but because every shrink increased reliance on exquisitely controlled plasma and film engineering. At leading edge, patterning is only half the story; **pattern transfer** is the half that touches atoms directly.

And the why behind all this is simple enough to fit in one sentence: **transistors only work if matter ends up exactly where the design assumes it is.** Etching decides where matter is removed. Deposition decides where matter is added. Together they turn a design database into physical topology.

Tomorrow we move into one of the deepest acts of material persuasion in the entire fab: **doping and ion implantation**. Up to now we have mostly shaped material. Next, we will change its electrical personality — firing boron, phosphorus, and arsenic ions into silicon at tens to hundreds of kiloelectron-volts so that a crystal that normally resists current suddenly becomes eager to carry it in exactly the right places.

---

<div style="text-align: center; margin: 2em 0;">

**Ready to test your knowledge?**

</div>

{{#quiz quizzes/day-09.toml}}
