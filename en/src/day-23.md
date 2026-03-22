# Day 23: The Semiconductor Supply Chain — A $600 Billion Global Machine

*No nation on Earth can build a cutting-edge chip alone. The United States designs the most advanced processors and writes the software that makes them possible. The Netherlands builds the only machines that can print them. Japan monopolizes the chemicals that go on the wafer. Taiwan and South Korea do the actual manufacturing. Germany and Japan grind the lenses. A handful of companies in three countries supply all the memory. The semiconductor supply chain is the most geographically dispersed, interdependent, and fragile industrial system humans have ever constructed — and in 2025, it shipped $791.7 billion worth of chips.*

---

## Anatomy of a Chain That Spans the Planet

A single leading-edge chip touches more than 25 countries on its journey from raw material to finished product. Not metaphorically — literally. The xenon and krypton gases used in some lithography processes come from Ukraine, Russia, and China. The 300mm silicon wafers are pulled from crystal in Japan. The photoresist is synthesized in Shizuoka Prefecture. The EUV scanner that patterns the wafer was assembled in Veldhoven, Netherlands, with optics from Oberkochen, Germany, and a laser source from San Diego, California. The chip is manufactured in Hsinchu, Taiwan. It is tested in Penang, Malaysia. It is packaged in a substrate built by Ibiden in Gifu, Japan. And then it ships to Shenzhen, China, where it is soldered onto a circuit board and placed inside a phone, server, or car that ends up in your hands.

If any single link in that chain breaks — a factory fire, an earthquake, a geopolitical spat, a pandemic shutting down a port — the entire system feels it. We learned this the hard way in 2020-2022, when the global chip shortage cost the auto industry alone an estimated **$210 billion** in lost revenue.

The semiconductor supply chain is not just complex. It is *concentrated*. And concentration is the source of both its extraordinary efficiency and its terrifying fragility.

## Layer 1: Raw Materials — Where Silicon Meets Geopolitics

Every chip starts with silicon, and not just any silicon. Semiconductor-grade polysilicon must be refined to **eleven nines** of purity — 99.999999999% — making it the purest bulk material humans produce. The global silicon wafer market was valued at roughly **$14.5 billion in 2024**, and it is dominated by a startling oligopoly: **Shin-Etsu Chemical** and **SUMCO**, both Japanese, together control approximately **55-60%** of the world's 300mm wafer supply. Add **GlobalWafers** (Taiwan), **SK Siltron** (South Korea), and **Siltronic** (Germany), and five companies account for over **90%** of the market.

This is already a chokepoint, but it gets narrower. After Japan restricted exports of three key semiconductor materials to South Korea in 2019 — hydrogen fluoride, fluorinated polyimide, and photoresist — the industry was reminded that chemistry matters as much as physics. Japanese firms control approximately **90% of the global photoresist market** (JSR, Tokyo Ohka Kogyo, Shin-Etsu Chemical, Fujifilm, and Sumitomo Chemical), and for the most critical type — **EUV photoresist** — that figure climbs above **95%**. These are not simple chemicals. EUV photoresists are molecular machines: chemically amplified polymers with photoacid generators tuned to respond to 13.5nm extreme ultraviolet light, requiring defect densities measured in parts per trillion. Synthesizing them requires decades of accumulated process knowledge that cannot be replicated by throwing money at the problem.

Then there are the specialty gases. Semiconductor fabrication consumes vast quantities of ultra-high-purity neon (used in DUV excimer lasers), helium (for cooling and leak detection), nitrogen trifluoride (for chamber cleaning), and dozens of others. Before Russia's invasion of Ukraine in 2022, **Ukraine supplied roughly 50%** of the world's semiconductor-grade neon, which is produced as a byproduct of steel manufacturing. Prices spiked 10× virtually overnight. The industry has since diversified — South Korean and Chinese neon producers have ramped capacity — but the episode illustrated how a material nobody thinks about can suddenly become a strategic vulnerability.

Here's the counterintuitive fact about the raw materials layer: **the materials themselves are cheap**. A 300mm silicon wafer costs roughly **$100-150**. The photoresist on it costs maybe **$50-80 per wafer** for EUV layers. The total bill of materials for all chemicals, gases, and substrates on a single wafer is perhaps **$500-1,500** — a fraction of the $15,000-20,000 that wafer will be worth after processing at a leading-edge node. The value isn't in the atoms. It's in the perfection. Getting hydrogen fluoride to 99.999% purity versus 99.99% is the difference between working chips and scrap.

## Layer 2: Equipment — The $110 Billion Bottleneck

If materials are the bloodstream of chipmaking, equipment is the skeleton and the muscles. The semiconductor equipment market reached approximately **$110 billion in 2024** and is projected to hit **$155 billion by 2029**. It is dominated by five companies that collectively control the vast majority of spending:

- **Applied Materials** (Santa Clara, CA) — ~$27B revenue. The broadest portfolio: deposition, etch, CMP, ion implantation, inspection. Touches nearly every process step.
- **ASML** (Veldhoven, Netherlands) — ~$30B revenue. The monopoly we covered on Day 8: the sole supplier of EUV lithography systems, and dominant in DUV immersion scanners.
- **Tokyo Electron (TEL)** (Tokyo, Japan) — ~$16B revenue. Coater/developers, etch, deposition, cleaning. The workhorse of the fab.
- **Lam Research** (Fremont, CA) — ~$17B revenue. The etch and deposition specialist; their machines carve the patterns that ASML prints.
- **KLA Corporation** (Milpitas, CA) — ~$11B revenue. The inspector: optical and e-beam metrology, defect review, process control.

Together, these five account for roughly **70-75% of all semiconductor equipment spending**. In specific sub-segments, concentration is even more extreme. ASML is a monopoly in EUV (100% share) and holds ~80% of DUV immersion lithography. KLA has **55-60% of wafer inspection and metrology**. In ALD (atomic layer deposition) for advanced gate stacks, **ASM International** (Netherlands) holds a commanding position.

What makes the equipment layer so potent as a chokepoint is the **lead time**. An EUV scanner takes **18-24 months** from order to delivery, and ASML can only produce about **50-60 per year** — that's roughly one a week for the entire planet. A new fab needs 15-20 EUV tools. Do the math: even with $40 billion and a perfect construction schedule, you cannot fill a leading-edge fab unless you secured your ASML delivery slots **two years** in advance.

The machinery is also extraordinarily difficult to maintain. ASML stations roughly **350 field service engineers** at TSMC alone. Each EUV scanner needs daily attention: the tin droplet source degrades, mirrors accumulate contamination, lasers need alignment. A tool going down costs a fab roughly **$100,000 per hour** in lost production. This creates a sticky, recurring revenue stream for equipment companies — after selling a $380 million scanner, ASML collects **$3-5 million per year per tool** in service contracts. With an installed base of several hundred EUV systems, the annuity is worth billions.

## Layer 3: EDA Software — The Invisible Chokepoint

Before a single photon hits a wafer, the chip must be designed, and design requires electronic design automation software. As we covered on Day 15, **Synopsys** and **Cadence** form a duopoly controlling roughly **60-74%** of the global EDA market, with **Siemens EDA** (formerly Mentor Graphics) holding most of the remainder. Together, these three cover virtually **100%** of the market for the tools needed to design a chip at 7nm and below.

The EDA market is small by semiconductor standards — roughly **$16-18 billion** in annual revenue — but its leverage is enormous. Without EDA tools, you literally cannot design a modern chip. There is no open-source equivalent that works at leading-edge nodes. The tools embody decades of algorithmic innovation in synthesis, place-and-route, timing analysis, parasitic extraction, and physical verification. They are deeply intertwined with specific foundry process design kits (PDKs): a Synopsys flow validated for TSMC N3 is not trivially replaceable by anything else.

This is why EDA was one of the first targets of U.S. technology export controls against China. In August 2022, the Bureau of Industry and Security added certain EDA tools for **gate-all-around (GAA) transistor design** to the restricted list. It was a precision strike: China can design chips at older nodes with existing tools, but designing next-generation chips at 3nm and below became significantly harder without access to the latest Synopsys and Cadence releases.

## Layer 4: Foundry Manufacturing — Taiwan's 65% Problem

TSMC manufactures roughly **65% of the world's semiconductors by revenue** and an even higher share of the leading edge: **over 90% of chips at 7nm and below** come from TSMC fabs. Samsung foundry and Intel Foundry Services split most of the rest, but neither matches TSMC's yield, process maturity, or customer trust.

We covered TSMC in depth yesterday, so let's zoom out to the foundry market as a whole. Global foundry revenue was approximately **$130-140 billion in 2024**. Behind TSMC and Samsung, the landscape includes:

- **GlobalFoundries** (Malta, NY) — Abandoned leading-edge in 2018. Focuses on 12nm and above, specializing in RF, embedded memory, and automotive. ~$8B revenue.
- **UMC** (Taiwan) — Mature-node powerhouse, 22nm and above. ~$7B revenue.
- **SMIC** (Shanghai) — China's most advanced foundry. Officially at 7nm (N+2 process), though under heavy U.S. equipment restrictions. ~$8B revenue.
- **Intel Foundry Services** — Intel's attempt to become a major foundry. Has TSMC-competitive technology on paper (Intel 18A ≈ 2nm), but still needs to prove yield and attract major external customers.

The geographic concentration is staggering. More than **75% of advanced chip manufacturing capacity** sits within a few hundred kilometers of the Taiwan Strait. A natural disaster, a military conflict, or even a sustained power grid failure in Taiwan would cause economic disruption measured in **trillions of dollars** — dwarfing the 2020-2022 shortage.

## Layer 5: Assembly, Testing & Packaging — The Unsung Heroes

After a wafer is processed in the fab, it must be diced into individual dies, tested, and packaged. This **OSAT** (outsourced semiconductor assembly and test) layer is the least glamorous part of the supply chain but accounts for roughly **$45-50 billion** in annual revenue.

The major OSATs include **ASE Technology** (Taiwan), **Amkor** (U.S., with most operations in Asia), **JCET** (China), and **Tongfu Microelectronics** (China). Taiwan and China together host the majority of the world's assembly and test capacity.

But as we learned on Day 13, packaging is rapidly evolving from commodity work to a critical technology differentiator. TSMC's **CoWoS** (Chip-on-Wafer-on-Substrate) advanced packaging — essential for NVIDIA's H100/B200 and AMD's MI300X — has become a major bottleneck. In 2024, CoWoS capacity allocation was a hotter topic in chip industry boardrooms than even EUV scanner availability. TSMC invested roughly **$5-6 billion** to more than double its CoWoS capacity from 2023 to 2025.

The packaging layer introduces yet another chokepoint: **ABF substrates** (Ajinomoto Build-up Film). These organic substrates, essential for high-performance chip packages, are manufactured primarily by three Japanese companies — **Ibiden**, **Shinko Electric** (a Fujitsu subsidiary), and **AT&S** (Austria). During the 2021-2022 shortage, ABF substrates had lead times stretching to **50-70 weeks**, and substrate costs for a single advanced package reached **$50-100** — sometimes rivaling the cost of the silicon die itself.

## The Hidden Interdependencies: Why No One Can Go It Alone

Here's what makes the semiconductor supply chain fundamentally different from, say, the automotive or apparel supply chain: **the knowledge barriers at each layer are so high that vertical integration across the entire stack is essentially impossible.**

Consider what a country would need to build a chip entirely domestically:

1. **Silicon crystal growth** — requires 50+ years of metallurgical process knowledge (Japan's lead)
2. **Photoresist synthesis** — molecular-level chemistry at defect densities of parts per trillion (Japan)
3. **EUV lithography** — the most complex optical system ever built, with components from the Netherlands, Germany, and the U.S.
4. **EDA software** — decades of algorithmic IP concentrated in two U.S. companies
5. **Process technology** — 40+ years of yield learning, proprietary to each foundry
6. **Advanced packaging** — substrate materials, hybrid bonding, TSV expertise spread across Taiwan, Japan, and Korea
7. **DRAM and HBM** — Samsung, SK Hynix, and Micron collectively hold **95%+** of the memory market

No country controls all these layers. The United States dominates EDA, equipment, and chip design but has minimal wafer capacity (currently ~12% of global manufacturing, almost none at leading edge). Japan dominates materials and some equipment but exited leading-edge logic manufacturing decades ago. Taiwan has the foundries but imports almost all equipment and materials. South Korea has memory manufacturing but depends on Japanese materials and Dutch/American equipment. China is trying to build everything domestically but faces technology gaps at nearly every layer, compounded by export controls.

The BCG/SIA estimated in a landmark 2021 study that building a fully self-sufficient semiconductor supply chain in any single region would require **$1 trillion in upfront investment** and would raise chip prices by **35-65%**. That number is almost certainly higher today.

## The $792 Billion Pyramid

When the Semiconductor Industry Association reported **$791.7 billion** in global chip sales for 2025 — up 25.6% from the prior year, driven overwhelmingly by AI demand — that headline number only captures the final revenue from chip companies selling to their customers. The actual economic machine beneath it is vastly larger:

- **Equipment**: ~$110B
- **Materials & chemicals**: ~$70B
- **EDA & IP**: ~$18B
- **OSAT (assembly & test)**: ~$45-50B
- **Foundry manufacturing**: ~$130-140B
- **End-chip sales**: ~$792B

Add the downstream systems — the phones, servers, cars, data centers, and industrial equipment that these chips go into — and semiconductors underpin an estimated **$3+ trillion** in annual end-product value. The industry is fond of saying that chips are to the modern economy what oil was to the 20th century. The analogy is imperfect — chips don't burn when you use them — but the dependency is comparable.

And unlike oil, where dozens of countries can pump crude, leading-edge chipmaking is concentrated in what analyst Chris Miller calls a series of **"chokepoints"**: individual companies or small groups of companies without which the entire system stops. ASML in lithography. TSMC in manufacturing. Synopsys and Cadence in design tools. Shin-Etsu and SUMCO in wafers. JSR and TOK in photoresist. Samsung and SK Hynix in HBM. Each of these is a potential single point of failure for the global economy.

## Resilience: Can the Chain Be Unchoked?

The post-2020 era has seen unprecedented efforts to diversify the supply chain. The U.S. CHIPS Act committed **$52.7 billion** in subsidies. The EU Chips Act pledged **€43 billion**. Japan committed **¥3.9 trillion** (~$26 billion). Even India announced a **$10 billion** semiconductor incentive scheme. TSMC is building fabs in Arizona, Japan (Kumamoto), and Germany (Dresden). Samsung is building in Taylor, Texas. Intel is expanding in Ohio, Arizona, Germany, and Poland.

But diversification faces brutal physics. A fab in Arizona uses the same ASML scanners, the same TEL coater/developers, the same Shin-Etsu wafers, and the same JSR photoresist as a fab in Taiwan. Moving the manufacturing step to a different country does not eliminate the underlying material and equipment dependencies. It shifts one chokepoint while leaving the others intact.

Moreover, new fabs take **3-5 years** from groundbreaking to high-volume production. TSMC's Arizona Fab 21 — announced in 2020 — is not expected to reach full N4 production until 2025, and its N3/N2 phases stretch into 2028. Building a fab is easy compared to achieving yield parity with the mother fab in Taiwan, where decades of tacit knowledge live in the heads of thousands of process engineers.

The deeper question is whether geographic diversification is even the right frame. The semiconductor supply chain evolved toward concentration not by accident but because **concentration is efficient**. Having 90% of photoresist made in Japan means Japan's chemical companies can invest deeply in R&D, achieve massive economies of scale, and deliver the sub-ppb purity levels that fabs demand. Distributing that production across ten countries would raise costs, dilute expertise, and potentially lower quality. The supply chain is fragile precisely because it is optimized.

This tension — efficiency versus resilience — is the central dilemma of semiconductor industrial policy in the 2020s. And it has no clean answer. More on that tomorrow.

---

*Tomorrow we move from the supply chain as a system to the supply chain as a weapon. Day 24 covers the CHIPS Act and semiconductor nationalism — how the U.S., EU, China, and Japan are each trying to reshape the chain in their favor, and why the resulting subsidy race may be the most expensive industrial policy experiment in human history.*

---

<div class="quiz-placeholder" data-quiz-path="quizzes/day-23.toml" data-quiz-day="23"></div>
