# Gün 27: Ekonomi — Neden Sadece Üç Şirket En İleriyi Karşılayabiliyor

*Yarı iletken endüstrisinin kirli sırrı fizik değil — paradır. Atomik ölçekte transistörler inşa etmek şaşırtıcı. Bunun bedelini ödemek neredeyse imkânsız.*

---

## 20 Milyar Dolarlık Giriş Ücreti

İşte sizi yerinde durdurması gereken bir rakam: **28 milyar dolar.** TSMC'nin tek bir fabrikaya — Tayvan güneyindeki Fab 20'ye — N2 (2 nm sınıfı) düğümünde çip üretmek için harcadığı miktar. Intel'in Arizona'daki Fab 52'si? Yaklaşık 20 milyar dolar. Samsung'un Pyeongtaek'teki planlı genişlemesi? Aynı büyüklükte. Bunlar tekil fabrikalar. TSMC'nin yalnızca 2024 için toplam sermaye harcaması yaklaşık **30–32 milyar dolardı** — İzlanda'nın tüm GSYİH'sinden fazla.

Bu kademeli büyüme değil. 2000'de en ileri bir fabrika yaklaşık 1–2 milyar dolara mal oluyordu. 2010'da 4–5 milyar. 2020'de 15–18 milyar. Gidişat amansızca üstel, kabaca **her dört ila beş yılda ikiye katlanan.** Endüstrinin bu fenomen için Moore Yasası'nın iğneleyici bir sonucu bile var: bazıları buna "Moore'un İkinci Yasası" veya "Rock Yasası" (risk sermayecisi Arthur Rock'tan) diyor ve fabrika tesislerinin maliyetinin yaklaşık her dört yılda ikiye katlandığını gözlemliyor. Bu hızla, 2030'ların başında tek bir en ileri fabrika 40 milyar doları geçebilir.

Neden giderek pahalılaşmaya devam ediyor? Cevap bu kursta çalıştığımız her şeye dokunuyor: tanesi 380 milyon dolar olan EUV tarayıcılar (ve en ileri bir fabrika bunlardan **15–20'ye** ihtiyaç duyar, yani sadece litografi araçlarında 6–8 milyar dolar), özel biriktirme ve aşındırma odaları gerektiren giderek daha egzotik malzemeler, daha sofistike temiz oda altyapısı talep eden daha sıkı kirlenme kontrolleri ve artık wafer başına üç aydan fazla sürede 1.000'den fazla bireysel adımı aşan süreç akışlarının salt karmaşıklığı.

## Wafer Maliyet Buzdağı

Tek bir 300 mm wafer'ın ekonomisini en ileri bir süreç boyunca izleyelim.

**Ham wafer maliyeti:** Shin-Etsu veya SUMCO'dan birinci sınıf 300 mm silikon wafer kabaca **100–150 dolara** mal olur. Ucuz kısım bu. Bir tablonun sadece birkaç dolara mal olduğunu söylemek gibi çünkü tuvalin maliyeti o kadar.

**İşleme maliyeti:** Bu wafer'ı TSMC'de N3 sınıfı (3 nm) süreçten geçirmek, wafer başına yaklaşık **16.000–20.000 dolar** toplam üretim maliyeti ekler. EUV ile N2'nin en ileri ucunda tahminler **20.000–25.000+ dolara** çıkıyor. Bu şunları içerir:

- **Litografi:** Açık ara en büyük katkı, toplam wafer maliyetinin %30–40'ını tüketir. Her EUV pozlama adımı wafer başına yaklaşık 100–150 dolara mal olur ve en ileri bir süreçte 20–25 EUV katmanı artı ek DUV katmanları olabilir. Sadece litografide 2.000–3.750 dolar.
- **Biriktirme ve aşındırma:** Bir %25–30 daha. Yüzlerce ayrı film biriktirme ve aşındırma adımı, her biri egzotik öncü gazlar çalıştıran hassas kontrollü vakum odaları gerektiriyor.
- **Metroloji ve muayene:** %10–15. Ölçemediğinizi iyileştiremezsiniz ve bu boyutlarda ölçümün kendisi olağanüstü pahalı. KLA'nın e-ışın muayene araçları tanesi 50–80 milyon dolara mal olur.
- **CMP, implantasyon, temizleme ve diğer adımlar:** Kalan %15–25.

**Amortisman büyük önem taşır.** Bu 380 milyon dolarlık EUV araçları kabaca 5–7 yılda amortismana tabi tutulur. 7/24 %85+ çalışma süresiyle çalışan tek bir EUV tarayıcı, saatte yaklaşık 120–150 wafer işleyebilir (tüm ek yüklerden sonra). EUV katmanı başına ~100 dolar wafer maliyetiyle, ASML'in araçları sadece amortismanlarını karşılamak için *günde* yaklaşık 200.000–300.000 dolar kazanmalıdır. Kapasite kullanım oranlarının fabrikalar için varoluşsal olmasının nedeni budur — boşta duran bir araç korkutucu bir hızda nakit yakar.

**Verim her şeyi büyütür.** Veriminiz %80 ise, bir wafer'ın kullanılabilir kalıplarının %80'i için efektif olarak 20.000 dolar ödüyorsunuz — yani her çalışan kalıp, mükemmel verimin önerdiğinden %25 daha pahalıya mal oluyor. Yeni bir düğümde, verimlerin artış sırasında %30–50 ile başlayabileceği yerlerde, iyi kalıp başına efektif maliyet olgunluktakinin **2–3 katı** olabilir. TSMC'nin efsanevi verim mühendisliğinin sadece güzel bir ek olmamasının nedeni budur; ekonomik hendeğinin çekirdeğidir. 20.000 dolarlık bir wafer'da her yüzdelik verim iyileştirmesi, bir üretim serisinde milyonlarca dolara dönüşür.

## Wafer'dan Ne Çıkıyor

Çip ekonomisinin neden bu kadar sezgiye aykırı olduğunu aydınlatan bazı zarfa arkası hesapları yapalım.

TSMC'nin N3B sürecinde üretilen Apple A17 Pro'yu ele alalım. Kalıp boyutu yaklaşık **103 mm²**. 300 mm wafer'ın kullanılabilir alanı yaklaşık 70.685 mm²'dir. Kenar kayıpları hesaba katıldıktan sonra (dairesel wafer'dan dikdörtgen kalıplar çıkarmak çevrede atık bırakır), bir wafer'a yaklaşık **580–620 brüt kalıp** sığdırabilirsiniz.

Olgun N3 wafer maliyeti ~17.000–20.000 dolar ve verim belki %75–80 ile, yaklaşık **440–500 iyi kalıp** elde edersiniz. Bu, **kalıp başına üretim maliyetini yaklaşık 35–45 dolara** koyar. Apple, iPhone 15 Pro'yu 999–1.199 dolara satıyor. Cihazdaki en sofistike silikon parçası — virüsten küçük boyutlarda üretilmiş 19 milyar transistör içeren — mütevazı bir restoran yemeğinden daha az tutarına mal oluyor.

Şimdi bunu TSMC'nin N4 sürecini kullanan NVIDIA H100 ile karşılaştırın. Kalıp devasa bir **814 mm²** — tek bir retikülün pratik maksimumuna yaklaşıyor (litografi aracının tek seferde pozlayabildiği alan, kabaca 858 mm² veya 26mm × 33mm). 300 mm wafer'dan yalnızca yaklaşık **60–70 brüt kalıp** elde edersiniz. Wafer maliyeti ~16.000–18.000 dolar ve büyük kalıpların acımasızca affetmez kıldığı verimle (bu boyutta belki %50–65), wafer başına belki **35–45 iyi kalıp** elde edersiniz. Bu, paketleme, test, HBM istiflemesi ve CoWoS ara katmanı (faturaya 500–1.000+ dolar daha ekleyen) öncesinde kalıp başına yaklaşık **350–500 dolar** üretim maliyeti demek.

NVIDIA, H100 modüllerini tanesi 25.000–40.000 dolara satıyor. Brüt marjlar şaşırtıcı — **%70'in** üzerinde — ama her çipe amorti edilen muazzam Ar-Ge yatırımını yansıtıyor, sadece üretim maliyetlerini değil.

**Temel içgörü:** kalıp boyutu ve verim *çarpımsal* olarak etkileşir. Kalıp alanınızı ikiye katlamak sadece wafer başına kalıp sayısını yarılamaz — ayrıca tipik olarak verimi *düşürür* çünkü daha büyük kalıpta rastgele kusurları yakalayacak daha fazla alan vardır. AMD'nin chiplet stratejisinin (Gün 13'te ele alınan) ekonomik olarak bu kadar parlak olmasının tam nedeni budur. EPYC'yi birden fazla küçük chiplet'e bölerek AMD her kalıbı yüksek verimi koruyacak kadar küçük tutarken devasa çok kalıplı bir ürün monte edebildi. %70 verimle monolitik 600 mm²'lik kalıp, wafer başına ~70 iyi kalıp verir. Her biri %90 verimle sekiz 75 mm²'lik chiplet, paketleme maliyetleri hesaba katılsa bile wafer başına çok daha fazla çalışan silikon verir.

## Tasarım Maliyeti Felaketi

Fabrika maliyetleri korkutucu ise, tasarım maliyetleri varoluşsaldır.

IBS'ye (International Business Strategies) göre, **3 nm'de** bir çip tasarlamanın toplam maliyeti yaklaşık **590–800 milyon dolar**. 5 nm'de kabaca 416–540 milyon dolar. 7 nm'de yaklaşık 297–350 milyon dolar. Bunu, tam çip tasarımının 50–80 milyon dolara mal olabileceği 28 nm ile karşılaştırın — hâlâ devasa ama çok daha fazla şirketin erişebileceği düzeyde.

Bu para nereye gidiyor?

**Mühendislik kadrosu** en büyük bileşen. En ileri SoC tasarım ekibi 3–4 yıl boyunca çalışan **1.000–2.000+ mühendisten** oluşabilir. Mühendis başına yıllık tam yüklü maliyetler 250.000–400.000 dolar (Silikon Vadisi'nde; diğer bölgelerde biraz daha az) ile, tam program boyunca sadece işçilikte 750 milyon–3,2 milyar dolar. Ancak IBS'nin 590 milyon dolarlık rakamı, belirli düğüme atfedilebilir *artımlı* tasarım maliyetini — bu sürece özgü yeni IP blokları, fiziksel tasarım zorlukları ve doğrulama çabasını — yakalar.

**Doğrulama ve geçerleme**, Gün 15'te araştırdığımız gibi, toplam tasarım çabasının %60–70'ini tüketir. İleri düğümlerde potansiyel arıza modlarının sayısı patlar. Zamanlama köşeleri çoğalır (28 nm'de 20–30'a karşı 3 nm'de 50–100+ PVT köşesinde doğrulamanız gerekebilir). Yeni fiziksel etkiler — FinFET'lerdeki kendinden ısınma, dar bakır tellerdeki karmaşık elektromigrasyon ve yerleşime bağlı etkiler gibi — daha büyük düğümlerde var olmayan doğrulama senaryoları yaratır.

**EDA araç lisansları** başka bir önemli kalem. İleri EDA pazarının %80+'ını kontrol eden düopol olan Synopsys ve Cadence — tam yığınlarını kullanan büyük bir tasarım ekibi için yıllık **50–100 milyon dolar** tutabilen yıllık lisanslar talep eder. Bu araçlar isteğe bağlı değil: onlar olmadan kelimenin tam anlamıyla 3 nm çip tasarlayamıyorsunuz.

**IP lisanslama** daha fazla ekler. ARM çekirdek lisansları, arayüz IP'si (PCIe, DDR, USB), analog bloklar, standart hücre kütüphaneleri, bellek derleyicileri — önceden tasarlanmış ve doğrulanmış bloklar satın almak geliştirme süresinden tasarruf sağlar ama on milyonlara mal olur.

**Maske setleri** özel olarak belirtilmeyi hak ediyor. En ileri bir çipi üretmek için gereken fotomaske seti artık 3 nm'de **10–20 milyon dolara** mal oluyor (28 nm'de 1–2 milyon dolardan yükselmiş). Bunlar litografide kullanılan fiziksel şablonlar — wafer ölçeğinin 4 katında özelliklere sahip devasa kuvars plakalar. Her maske katmanı esasen mükemmel olmalı; tek bir kusurlu maske tüm seti hurdaya çıkarmak demek. Tasarımınızda maske yenileme gerektiren bir hata varsa (fiziksel yerleşimi yeniden yapmak ve yeni maskeler üretmek), bu 10–20 milyon dolar daha ve 2–3 ay gecikme. Silikon öncesi doğrulamanın bu kadar takıntılı şekilde kapsamlı olmasının nedeni budur.

## Sınırda Oligopol

Bu ekonomiler, en ileri dökümhane işinin neden esasen **üç şirketten** oluşan bir oligopole daraldığını açıklıyor: TSMC, Samsung Foundry ve Intel Foundry Services (ki hâlâ bu sohbete ait olduğunu kanıtlamaya çalışıyor).

Matematiği düşünün. En ileri bir fabrika inşa etmek (20–28 milyar $), araçlarla doldurmak, verimi artırmak ve çalışır durumda tutmak için bir şirketin yatırımı haklı çıkaracak yeterli gelir üretmesi gerekir. TSMC'nin 30+ milyar dolarlık yıllık sermaye harcaması, yaklaşık **87–90 milyar dolar** (2024) gelirle finanse ediliyor. Şirket bunu karşılayabiliyor çünkü neredeyse her büyük fabrikasız çip şirketine — Apple, NVIDIA, AMD, Qualcomm, Broadcom, MediaTek — hizmet veriyor ve bu astronomik sabit maliyeti devasa wafer hacimleri üzerinden yayabiliyor.

Samsung, dökümhane yatırımını kısmen haklı çıkarabiliyor çünkü devasa bellek işi (dünyanın en büyüğü) bazı altyapı, malzeme uzmanlığı ve mühendislik yeteneğini paylaşıyor. Yine de Samsung Foundry verimler ve müşteri kazanımlarıyla zorlanmış, ileri düğümlerde TSMC'ye zemin kaybettiği bildiriliyor.

Intel, Pat Gelsinger'ın IDM 2.0 stratejisi (ve şimdi haleflerinin yönetimi) altında beş yıl içinde 100+ milyar dolara dünya standartlarında dökümhane kapasitesi inşa etmeye bahis oynadı. Ama şirket defalarca süreç teknolojisi kilometre taşlarında gecikti ve TSMC'ye güvenen harici dökümhane müşterilerini çekmekte zorlandı. Intel 18A (arka taraf güç iletimi ve gate-all-around transistörlerle 1,8 nm sınıfı süreci) yap-ya-da-öl anını temsil ediyor.

**Başka kimse bu oyunu oynayamaz.** Bir zamanlar AMD'nin üretim kolu olan GlobalFoundries — 2018'de en ileri geliştirmeyi bıraktı, 12nm/14nm'de dondu. Çin'in şampiyonu SMIC (Gün 25), kahramanca DUV çoklu desenlemeyle 7 nm sınıfı süreç elde etti ama ticari olarak zor verimler ve maliyetlerle çalışıyor ve ihracat kontrolleri EUV erişimini engelliyor. SMIC'in Tayvanlı rakibi UMC olgun düğümlere odaklanıyor. Alan daralmış; bunun nedeni başkalarının rekabet etmek istememesi değil, sermaye gereksinimleri ve teknik karmaşıklığın fiilen aşılamaz bariyerler yaratması.

Bu yoğunlaşma derin ekonomik çıkarımlar taşıyor. **TSMC'nin fiyatlandırma gücü muazzam.** Şirketin eşdeğer süreç düğümleri için Samsung'a göre %20–30 prim talep ettiği bildiriliyor ve müşteriler bunu isteyerek ödüyor çünkü TSMC'nin verim avantajı, daha yüksek wafer fiyatlarında bile daha düşük efektif kalıp maliyetlerine dönüşüyor. TSMC 2023'te fiyatları %6–9 artırdığında (2022'deki daha büyük bir artıştan sonra), endüstrinin bunu absorbe etmekten başka seçeneği yoktu. Başka nereye gideceksiniz?

## Fabrikasız Devrimi ve Hoşnutsuzlukları

Çip üretiminin aşırı ekonomisi, artık endüstriyi tanımlayan **fabrikasız-dökümhane ayrımını** tetikledi. 1980'lerde çoğu çip şirketi kendi çiplerini tasarlayan ve üreten IDM'lerdi (Tümleşik Cihaz Üreticileri): Intel, Motorola, TI, IBM. Morris Chang'ın 1987'de TSMC'yi kurması radikal bir alternatif sağladı: şirketler fabrikaya sahip olmadan çip tasarlayabilirdi.

Bugün fabrikasız model ileri mantıkta baskın. NVIDIA (2025 başı itibarıyla 2,7 trilyon dolar piyasa değeri) sıfır fabrikaya sahip. Apple tarihin ticari olarak en başarılı çiplerini tasarlıyor ve sıfır fabrikaya sahip. Qualcomm, Broadcom, AMD, MediaTek — hepsi fabrikasız. En büyük on fabrikasız çip şirketi toplu olarak **5 trilyon doların üzerinde** piyasa değeri temsil ediyor, ama fiziksel üretim ayak izleri sıfır.

Bu ekonomik olarak verimli ama stratejik olarak tehlikeli. Bu şirketlerin her biri en kritik ürünleri için TSMC'ye bağımlı. COVID dönemindeki 2020–2022 yarı iletken kıtlığında fabrikasız şirketler, hiç üretim tesisine sahip olmamanın dezavantajını keşfetti: talep artınca dökümhanenizin tahsis kararlarının insafındasınız. TSMC'nin en büyük müşterisi (~gelirin %25'i) Apple öncelik alır. Diğer herkes sıraya girer.

Tasarım maliyeti krizi de en ileri düğümlerde *tasarım* yapabilecek şirketleri yeniden şekillendiriyor. 2000'de yüzlerce şirket en ileri düğümde (o zamanlar 180 nm) çip tasarlıyordu. 2010'da 28 nm'de belki 50–100 şirket maliyeti haklı çıkarabiliyordu. Bugün 3 nm'de tam özel SoC tasarımı yapan şirketlerin listesi tartışmalı olarak küresel olarak **15–20'den az**. Birçok çip şirketi tasarım maliyetlerinin yönetilebilir olduğu ve ekonominin uygulamaları için anlamlı olduğu olgun düğümlerde (28 nm, 40 nm, 65 nm) tasarım yapmaya devam ediyor.

## Olgun Düğümlerin Gizli Ekonomisi

İşte en ileri yarışa takıntılı insanları şaşırtan bir gerçek: **olgun düğümler altın madeni.**

Texas Instruments 130nm ila 45nm süreçler çalıştıran fabrikalar işletiyor — 10–20 yıllık teknoloji. Şirketin brüt marjı? Şaşırtıcı **%58–62**. Nasıl mı? Bu fabrikalar **tamamen amortismana tabi tutulmuş**. Ekipman yıllardır ödenmiş. Zaten ödenmiş araçlarda üretilmesi 3.000–5.000 dolara mal olan bir wafer, ortaya çıkan çipler yüz veya binlerce dolar değerinde toplam gelir ürettiğinde muazzam marj sağlar.

Analog Devices, NXP, Infineon, STMicroelectronics — hepsi olgun süreçlerde son derece kârlı işler yürütüyor. Otomotiv endüstrisi, endüstriyel otomasyon, IoT, güç yönetimi ve RF iletişim, hepsi 28 nm ve üstünde üretilen çiplerle çalışır. Bu çipler manşetlere çıkmaz ama hacim bazında tüm çiplerin yaklaşık **%70–80'ini** ve gelir bazında yaklaşık **%50–60'ını** oluşturur.

Olgun düğümlerdeki ekonomi, en ileriden temelden farklıdır. 65 nm'de tasarım maliyetleri 20–30 milyon dolar olabilir — orta ölçekli şirketler veya iyi finanse edilmiş girişimler için bile ulaşılabilir. Wafer maliyetleri 2.000–4.000 dolar. Amortismana tabi tutulmuş fabrikaların işletme maliyetleri en ileri tesislerin bir kesiri. Karşılık daha düşük transistör yoğunluğu ve performanstır ki bu, hızlı olmaktan çok ucuz, güvenilir ve enerji verimli olması gereken çipler için tamamen sorun değil.

Bu, Çin'in olgun düğümlerdeki stratejisini açıklıyor (Gün 25): çamaşır makinelerinden otomobillere kadar her şeyi çalıştıran "yeterince iyi" çipler pazarını hedefleyen, 28 nm ve üstü çalıştıran sübvansiyonlu fabrikalar. Çin 3 nm'de rekabet edemez ama çip pazarının büyük çoğunluğu için buna ihtiyacı da yok.

## Maliyet Hastalığı İkilemi

Yarı iletken endüstrisi, ekonomistlerin **Baumol'un maliyet hastalığının** bir varyantı olarak tanıyabileceği ama tersine çevrilmiş bir durumla karşı karşıya. Baumol'un orijinal formülasyonunda, eğitim ve sağlık gibi sektörler emeği kolayca otomatikleştiremediği için artan maliyetler görür. Yarı iletkenlerde sorun, her yeni nesil otomasyonun (EUV araçları, ileri biriktirme sistemleri, yapay zekâ destekli hesaplamalı litografi) öncekinden dramatik şekilde daha pahalıya mal olmasıdır.

Bu bir paradoks yaratır: Moore Yasası transistörleri birim bazında esasen bedava kıldı (transistör başına maliyet 1970'ten bu yana kabaca **8 büyüklük sırası** düştü), ama her yeni "bedava transistör" neslinin sabit erişim maliyeti, Dünya üzerinde sadece bir avuç varlığın karşılayabileceği seviyelere yükseldi. Sanki su galon başına neredeyse bedava ama yeni arıtma tesisi 30 milyar dolara mal oluyormuş gibi.

Endüstrinin yanıtı üç yönlü oldu:

1. **Konsolidasyon:** En ileri üretici sayısı düzinelerden üçe (veya tartışmalı olarak iki buçuğa) daraldı.
2. **Uzmanlaşma:** Şirketler şeritlerini seçiyor — en ileri mantık, olgun analog, bellek — her şeyi yapmaya çalışmak yerine.
3. **Devlet sübvansiyonu:** CHIPS Yasası ve eşdeğerleri (Gün 24) hükümetlerin ekonominin en azından stratejik nedenlerle özel piyasalar için çok acımasız olduğuna karar vermesini temsil ediyor.

## Her Şeyin Varacağı Yer

Yarı iletken üretiminin ekonomisi nihayetinde bu endüstriye benzersiz karakterini veren şeydir. Ürünün her nesilde daha iyi ve daha ucuz hâle geldiği ama üretim araçlarının daha pahalı ve daha dışlayıcı hâle geldiği bir iş. Neredeyse hiçbir endüstri gibi ölçeği ödüllendiriyor: ayda 10.000 wafer üretmek ile 100.000 wafer üretmek arasındaki fark 10 kat maliyet değil — belki 3–4 kat, çünkü masrafın büyük kısmı sabit altyapıda. Bu yüzden %80 üzeri fabrika kapasite kullanım oranları kâr ile felaket niteliğinde zarar arasındaki farktır.

Hayatta kalan ve gelişen şirketler koşu bandını sürdürebilenlerdir: gelecek yıl 35 milyar dolar yatırım yapacak kadar gelir kazanmak için bu yıl 30 milyar dolar yatırım yapın, tüm bunları yaparken verimi yeterince yükseltip müşterilerin prim fiyatlar ödemeye devam edecek kadar çekici çipler tasarlayın. Kazananlar için erdemli döngü, diğer herkes için ölüm sarmalı.

Yarın bu kursu en heyecan verici soruyla kapatıyoruz: **Sırada ne var?** Gate-all-around transistörler zaten üretimde. Molibden disülfür gibi iki boyutlu malzemeler, ölçeklemeyi silikonun sınırlarının ötesine taşımayı vaat ediyor. Optik ara bağlantılar bant genişliği darboğazını kırabilir. Ve bazı araştırmacılar fısıltıyla, silikonun kendisinin — bilgi çağını inşa eden malzemenin — nihayet olağanüstü 60 yıllık koşusunun sonuna yaklaşıyor olabileceğini söylüyor. Bugünün endüstrisini şekillendiren ekonomi, yarının fiziğiyle ya gücü daha da yoğunlaştıracak ya da tamamen açacak şekillerde çarpışacak.

---

<div class="quiz-placeholder" data-quiz="quizzes/gun-27.toml"></div>
