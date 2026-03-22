# Gün 28: Sırada Ne Var — GAA Transistörler, 2D Malzemeler, Optik Ara Bağlantılar ve Silikonun Sonu mu?

*27 gün boyunca silikonun nasıl uygarlığın omurgası hâline geldiğini çalıştık. Bugün rahatsız edici soruyu soruyoruz: silikon yetişemediğinde ne olacak?*

---

## Kapanan Duvarlar

Silikon, herhangi bir malzemenin tarihindeki en olağanüstü performanslardan birini sergiledi. 1958'deki ilk entegre devreden bu yana transistörleri milimetre ölçeğinden, kapı uzunluğunun kabaca **12 nanometre** — yaklaşık 24 silikon atomu genişliğinde — olduğu yapılara küçülttük. Düzinelerce transistörden yüz milyarlarcaya ölçeklendik. Ama artık her ileri adım tek bir duvara değil, aynı anda birkaçına çarpıyor: kuantum tünelleme, basitçe çok ince olan bariyerlerden akım sızdırıyor. Termal yoğunluk çiplerin belirli bölgelerini soğutmayı imkânsız kılıyor. Bakır teller 15 nanometrenin altına daraldığında ara bağlantı direnci tırmanıyor; burada elektron ortalama serbest yol etkileri bakırın avantajlı kütlesel özelliklerini paramparça ediyor. Ve dün öğrendiğimiz gibi, ekonomi her yeni nesli 20+ milyar dolarlık bir kumar hâline getiriyor.

Peki bundan sonra nereye gidiyoruz? Cevap tek bir atılım değil — paralel olarak ilerleyen çaresiz, parlak bahislerin bir portföyü. Bazıları zaten üretimde. Diğerleri on yıl veya daha fazla uzakta. Ve en az biri bilim kurgu gibi görünüyor. Hesaplamanın önümüzdeki yirmi yılını tanımlayacak teknolojileri birlikte inceleyelim.

## Gate-All-Around: Transistör Sarıma Alınıyor

En acil devrim zaten burada ve Samsung'un SF2 (2 nm sınıfı) GAA sürecini sevkiyata başladığı Haziran 2025'te geldi, TSMC'nin N2'sinin 2025 sonlarında artışı onu yakından takip etti. Intel'in 18A süreci de GAA tabanlı olup 2025 başında sınırlı üretime başladı. On yıldan fazla FinFET hâkimiyetinden — Intel'in 2011'de 22 nm'de tanıttığı 3D yüzgeç şeklindeki transistör — sonra endüstri toplu olarak gate-all-around mimarisine geçti.

Konsept zarif şekilde basit. FinFET'te kapı, dikey silikon yüzgecin üç tarafını sarar ve altını açıkta bırakır. Bu alt yüzey bir sorumluluk: kapının elektrik alanının daha zayıf olduğu, kaçak akımın sızdığı ve yüzgeci daha dar ölçeklemeye çalıştıkça elektrostatik kontrolün bozulduğu bir bölge. Yaklaşık 5 nanometrenin altındaki kapı uzunluklarında — bugünün "3 nm" süreçlerinin gerçekte çalıştığı yer — FinFET elektrostatiği giderek daha kırılgan hâle geliyor.

GAA bunu, **yatay nano levhalar** (veya yeterince darlarsa nano teller) istifleyerek ve kapı malzemesini her kanalın dört tarafına da sararak çözer. Yüzgeci alıp dikey olarak istiflenmiş 3–4 ince gözlemeye dilimleyip her gözlemeyi kapı metaliyle çevrelediğinizi hayal edin. TSMC'nin N2'si, her biri yaklaşık 5–6 nanometre kalınlığında ve 25–50 nanometre genişliğinde **dört istiflenmiş nano levha** kullanır. Samsung'un yaklaşımı biraz farklı levha boyutları kullanır ama aynı temel ilke geçerlidir: tam elektrostatik kontrol.

Performans kazanımları anlamlı ama devrimci değil — en iyi FinFET düğümlerine kıyasla kabaca **%10–15 hız iyileştirmesi** veya aynı performansta **%25–30 güç azalması**. Asıl değer GAA'nın *ölçeklendirme yol haritasını* belki 3–4 ek nesil uzatmasıdır. FinFET'lerin azalan getirilere ulaştığı yerde, GAA nano levhalar levha genişliğini ayarlayarak — aynı süreçte yüksek performanslı çekirdekler için daha geniş levhalar, düşük güç için daha dar levhalar — sürücü akımını ayarlama yeteneğini geri kazandırır. Bu "değişken genişlik" hilesi FinFET'lerin asla zarif şekilde yapamadığı bir şey.

Ama GAA bedava değil. Süreç karmaşıklığı şaşırtıcı. Nano levha transistörü üretmek, mükemmel şekilde dönüşümlü silikon ve silikon-germanyum (SiGe) epitaksiyel katmanlardan oluşan bir yığın büyütmeyi — 4 nano levha için tipik olarak **toplam 8 katman** — sonra silikon levhalara zarar vermeden tüm SiGe'yi seçici olarak aşındırarak silikon levhaları serbest bırakmayı gerektirir. Bu "iç ara parça" aşındırması, birbirinden sadece 8–12 nanometre uzaklıktaki levhalar arasındaki malzemeyi nanometre-altı hassasiyetle çıkarmalıdır. Bir TSMC süreç mühendisi bunu bana "gözleri bağlı posta kutusu aralığında ameliyat yapmak" olarak tanımladı. EUV katmanlarının sayısı N3'teki yaklaşık 20–25'ten N2'de 25–30+'ya çıkarak hem maliyeti hem çevrim süresini artırıyor.

Temel GAA'nın ötesindeki bir sonraki adım **CFET** — Tamamlayıcı FET — NMOS ve PMOS transistörlerini yan yana yerleştirmek yerine **dikey olarak üst üste istiflersiniz.** Bir NMOS nano levha cihazı, PMOS karşılığının doğrudan altında (veya üstünde) oturur ve küçük dahili dikey bağlantı hatlarıyla bağlanır. Intel, CFET yapılarını araştırmada gösterdi ve 2027–2028 civarında "14A" düğümünde üretime girmesini öngörüyor. CFET, standart hücre yüksekliğini **%30–40** daha küçültebilir ve büyük bir yoğunluk sıçraması açabilir. Ama bağımsız iki transistörü dikey bir yığında — her biri farklı kanal malzemesi, farklı katkılama, farklı iş fonksiyonu metalleri gerektiren — hizalarken her ikisine de paylaşılan metal katmanlardan bağlantı sürdürmek, endüstrinin şimdiye kadar giriştiği tartışmalı olarak en karmaşık entegrasyon zorluğudur.

## Arka Taraf Güç İletimi: Senaryoyu Tersine Çevirme

Gün 11'de (Ara Bağlantılar) ve Gün 21'de (Güç ve Termal) tartıştığımız bir soruna şaşırtıcı derecede zarif bir çözüm var: kablolama tıkanıklığı krizi. 1960'lardan bu yana üretilen her çipte hem sinyal kabloları hem güç iletim kabloları transistörlerin aynı tarafını — ön tarafı — paylaşır. Güç rayları ve sinyal yolları aynı yönlendirme izleri için rekabet eder, alan boşa harcanır ve en fazla akım taşıması gereken tellere direnç eklenir.

**Arka taraf güç iletim ağları** (BSPDN'ler) gücü wafer'ın *arkasına* çevirir. Fikir: ön taraf işlemesi tamamlandıktan sonra wafer'ı çevirin, silikon substratı orijinal 775 µm'den yaklaşık **0,5–1 µm'ye** inceleyin ve arkada ayrı bir kalın, düşük dirençli güç rayları seti inşa edin. Sinyaller önde kalır. Güç arkadan gelir. Her alan bağımsız olarak optimize edilir.

Intel'in PowerVia'sı, test çiplerinde gösterilmiş ve 18A düğümü için planlanmış, **IR düşüşünde %30 azalma** (güç ağı üzerindeki voltaj kaybı) ve aynı güçte **%6 frekans iyileştirmesi** gösterdi. Bu mütevazı gelebilir ama olgun bir düğümde %6 frekans, normalde tamamen yeni bir süreç nesli gerektiren türden bir kazanımdır. TSMC kendi versiyonuna "Arka Taraf Güç Rayı" diyor ve A14 (1,4 nm sınıfı) düğümünde 2028 civarında tanıtmayı planlıyor.

Sezgiye aykırı kısım? 300 mm wafer'ı 0,5 µm'ye — insan kırmızı kan hücresinin genişliğinden daha ince — inceltip sonra açığa çıkan arka yüzeyi litografi ve metalizasyonla işlemek *gerçekten yapılabilir.* Endüstri yıllardır 3D paketleme (TSV'ler, hibrit bağlama) için wafer'ları inceltiyor. Arka taraf güç iletimi bu kapasiteyi transistör seviyesine uzatıyor. Wafer arka taraf işlemesi sırasında geçici olarak yüzü aşağı bir taşıyıcı wafer'a bağlanır, tamamlandıktan sonra ayrılır. Gereken mekanik hassasiyet — ön taraf özellikleri ile arka taraf güç rayları arasında çevirdikten sonra 100 nm altı hizalama sürdürmek — dikkat çekici ama işe yarıyor.

## 2D Malzemeler: Silikonun Sınırlarının Ötesinde

Şimdi gerçekten spekülatif bölgeye giriyoruz — araştırma makalelerinde parlak şekilde çalışan ama yüksek hacimli üretimin acımasız gerçeğinde henüz ayakta kalamamış teknolojiler.

Silikonun aşırı ölçeklendirmede temel bir sorunu var: kanalları inceldikçe **elektron hareketliliği bozuluyor.** 5 nm kalınlığındaki silikon nano levha, kütlesel silikona göre önemli ölçüde daha kötü taşıyıcı taşınıma sahip. 3 nm kalınlığının altına indiğinizde performans çöküşü şiddetli — yüzey pürüzlülüğü saçılması baskın hâle geliyor ve kanal malzemeden çok kusur oluyor. Silikon, bir düzeyde, gerçek anlamda atomik ölçekli cihazlar için *çok üç boyutlu*.

İşte burada **iki boyutlu malzemeler** devreye giriyor — tek atom kalınlığında tabakalar hâlinde kararlı olan kristaller. En ünlüsü, altıgen kafes içinde düzenlenmiş tek katmanlı karbon atomlarından oluşan grafen, olağanüstü elektron hareketliliğine sahip (200.000 cm²/V·s — silikonun kabaca 100 katı). Ama grafenin dijital mantık için ölümcül bir kusuru var: **bant aralığı yok.** Grafen transistör asla gerçekten kapanmaz. Akış hızını değiştirebilen ama asla tam kapanamayan bir valf gibi.

Asıl yıldız, doğal olarak sadece **0,65 nanometre kalınlığında** — üç atom: kükürt-molibden-kükürt — kararlı tek katmanlar oluşturan geçiş metali dikalkojenür (TMD) olan **molibden disülfürdür (MoS₂)**. Kritik olarak, tek katmanlı MoS₂'nin **1,8 eV** bant aralığı var (silikonun 1,1 eV'sinden bile büyük), yani gerçekten kapanan mükemmel anahtarlar yapıyor. Ve doğası gereği 2D olduğu için, onu tek katmana inceltmek silikonun inceltilmesi gibi özelliklerini bozmaz. *Malzemenin tamamı yüzey olduğunda* yüzey pürüzlülüğü sorunu olmaz.

2022'de MIT'den Jiadi Zhu liderliğindeki ekip, kapı elektrodu olarak tek bir karbon nanotüp kullanan **1 nanometre kapı uzunluğunda MoS₂ transistörleri** gösterdi. Transistör çalıştı. Anahtarlama yaptı. Eşikaltı salınımı teorik ideal olan 60 mV/dekat'a yakındı. 1 nm kapı uzunluğunda silikon transistör kuantum mekaniği felaketi olurdu; elektronlar kapı yokmuş gibi kanaldan doğrudan tünellerdi. MoS₂ bununla başa çıktı çünkü ince gövdesi (0,65 nm) bu akıl almaz boyutlarda bile kapıya olağanüstü elektrostatik kontrol sağladı.

Ama — ve bu devasa bir "ama" — yüksek kaliteli MoS₂'yi 300 mm wafer'lar üzerinde üretimin talep ettiği tekdüzelik, kusur yoğunluğu ve verimle büyük ölçekte büyütmek çözümsüz kalıyor. En iyi araştırma sonuçları **mekanik soyma** (kelimenin tam anlamıyla bantla kristalden pul soyma, grafeni keşfetmek için kullanılan aynı teknik) veya küçük alanlı CVD büyütmeden geliyor. TSMC, Samsung ve imec wafer'lar üzerinde TMD büyüten aktif programlara sahip ve TSMC 2023'te makul tekdüzelikle wafer ölçekli MoS₂ büyütme sonuçları yayınladı — ama araştırma bağlamında "makul" hâlâ silikonun elde ettiği kusur yoğunluklarından büyüklük sıraları daha kötü. Temelden yeni bir malzeme için "laboratuvarda çalışır"dan "fabrikada çalışır"a geçiş tipik olarak **15–20 yıl** alır. Nefesinizi tutmayın ama görmezden de gelmeyin.

## Optik Ara Bağlantılar: Bakır Darboğazına Son

İşte şaşırtıcı bir gerçek: modern bir yapay zekâ veri merkezinde toplam enerji tüketiminin kabaca **%40–60'ı** hesaplamaya değil **veri taşımaya** gider — çipler arasında, kartlar arasında, raflar arasında ve binalar arasında. Her şeyi bağlayan bakır ve elektriksel sinyalleme altyapısı baskın darboğaz hâline geliyor, işlemcilerin kendisi değil.

Sorun her ölçekte kötüleşiyor. Bakır izlerdeki elektrik sinyalleri **frekansa bağlı kayıptan** muzdarip: PCIe 7.0 ve 800G Ethernet'in talep ettiği hat başına 112 Gbps hızlarında, bir metrelik bakır kablo üzerinden bile sinyal bütünlüğü, kendileri önemli güç tüketen sofistike eşitleme devreleri gerektirir. Elektrik sinyallemenin enerji maliyeti kabaca mesafeyle doğrusal ölçeklenir — iyi tasarlanmış bir sistemde bir bit'i bir metre göndermek yaklaşık **10–20 picojoule** tutar. Raflar arası mesafelerde (10–100 metre) daha kötü.

Işığın bu sorunu yok. Optik fiberdeki fotonlar, veri merkezi mesafelerinde esasen **sıfır frekansa bağlı kayıpla** ışık hızının üçte ikisinde ilerler. Elektrik ve optik alanlar arasında dönüştürme enerjisi (modülatörler ve fotodedektörler kullanarak) istikrarlı bir şekilde düşüyor ve şimdi kısa menzil optikler için yaklaşık **1–5 picojoule/bit** seviyesinde — ve bu rakam birkaç yüz metrenin altındaki mesafelerde büyük ölçüde *mesafeden bağımsız*.

Şu anda yaşanan devrim **silikon fotonik** — optik bileşenleri (dalga kılavuzları, modülatörler, fotodedektörler) mevcut CMOS fab altyapısını kullanarak doğrudan silikon wafer'lar üzerinde inşa etmek. **Ayar Labs**, **Lightmatter** ve **Celestial AI** gibi şirketler, elektrik sinyallerini çip sınırında ışığa dönüştüren, doğrudan işlemci kalıplarının yanında veya üstünde oturan birlikte paketlenmiş optik (CPO) inşa ediyor. TSMC ve GlobalFoundries'ın her ikisi de silikon fotonik süreç platformları sunuyor.

Ayar Labs'ın **TeraPHY** chiplet'i örneğin, bir işlemci veya anahtar ASIC'in yanında çok çipli pakette oturmak üzere tasarlanmış silikon fotonik I/O kalıbıdır. Dalga boyu bölmeli çoklama (WDM) — tek bir fiber üzerinden aynı anda birden fazla renk ışık gönderme — kullanarak **4 Tbps'ye kadar** elektrik sinyalini optiğe ve geri dönüştürür. Her "renk" (dalga boyu) bağımsız bir veri kanalı taşır. Mevcut sistemler fiber başına 8–16 dalga boyu kullanır; yeni nesil tasarımlar 32 veya daha fazlasını hedefler.

Ama en cesur vizyon **çip üstü optik ara bağlantılar** — çekirdekler arasındaki veya paket içindeki chiplet'ler arasındaki bakır telleri silikona kazınmış fotonik dalga kılavuzlarıyla değiştirmek. Lightmatter'ın **Passage** teknolojisi, tek bir pakette yüzlerce chiplet'i bakırın fiziksel olarak başaramayacağı bant genişliği yoğunlukları ve enerji verimliliğiyle bağlayabilecek fotonik ara bağlantı yapısı oluşturmayı hedefliyor. Gösterimleri, aynı kalıp üzerindeki noktalar arasında **bit başına 1 picojoule'den az** veri taşıyan wafer ölçekli fotonik ağları gösterdi.

Fizik çalışıyor. Zor olan kısım mühendislik. Fotonik bileşenleri transistörlerin yanına entegre etmek yeni zorluklar getiriyor: lazer kaynakları (tipik olarak indiyum fosfür gibi III-V malzemeler) silikon üzerinde iyi büyümez ve harici olarak bağlanmalı veya bağlaştırılmalı. Dalga kılavuzu boyutları (~200–500 nm) transistör özelliklerinden çok daha büyük olup değerli kalıp alanı tüketir. Ve tüm fiber optik ekosistemi — konektörler, paketleme, hizalama — karmaşıklık ve maliyet ekler. Yine de gidişat açık: 2030'a kadar optik I/O yüksek performanslı yapay zekâ ve ağ çipleri için standart olacak ve 2035'e kadar kart ve hatta paket seviyesine nüfuz edebilir.

## Egzotik Ufuk: Karbon Nanotüpler, Spintronik ve Süper İletken Mantık

Bu on yılda üretime ulaşması muhtemel teknolojilerin ötesinde, hesaplamayı tamamen yeniden şekillendirebilecek — veya sonsuza dek laboratuvarda kalabilecek — daha vahşi bir araştırma sınırı var.

**Karbon nanotüp (CNT) transistörler** 1990'lardan beri baştan çıkarıcı bir olasılık. Tek bir karbon nanotüp — sadece 1–2 nm çapında silindir şeklinde sarılmış grafen tabakası — neredeyse mükemmel transistör kanalı: olağanüstü taşıyıcı hareketliliği, doğal 1D hapsetme, tüpün kiralitesine (tabakanın sarılma açısı) bağlı olarak ayarlanabilir bant aralığı. 2019'da MIT'den Max Shulaker liderliğindeki ekip, tamamen karbon nanotüp transistörlerden inşa edilmiş tam bir 16 bit RISC-V mikroişlemci olan **RV16X-NANO**'yu gösterdi — 150 mm wafer üzerinde üretilmiş 14.702 CNT FET. Programlar çalıştırdı. İşe yaradı.

Sorun? Nanotüp büyümesi hâlâ **kiralite kontrolü** (büyütülen tüplerin yaklaşık üçte biri metalik olarak yarı iletken yerine kısa devre yaratır), **yerleştirme hassasiyeti** (tüplerin ~5 nm aralıkla paralel diziler hâlinde hizalanması gerekir) ve **temas direnci** (nanotüp ile metal elektrot arasındaki bağlantı inatla yüksek kalır) sorunlarıyla boğuşuyor. Laboratuvarda çözümler var — metalik tüplerin seçici aşındırması, DLSA (Boyut Sınırlı Kendi Kendine Hizalama) teknikleri — ama milyar transistörlü çipler için gereken kusur yoğunluklarına ulaşmak hâlâ uzak.

**Spintronik** tamamen farklı bir yaklaşım benimser, bilgiyi elektrik yükünün varlığı veya yokluğuyla değil elektronların **spin'iyle** (manyetik yönelimi) kodlar. MRAM (Manyetodirençli RAM) zaten ticari bir spintronik teknoloji olup Samsung, TSMC (mantık süreçlerine gömülü) ve diğerlerinden milyonlarca birimle sevk ediliyor. Ama spintronik *mantık* — manyetik tünel bağlantılarından hesaplama kapıları inşa etmek — **sıfır bekleme gücü** tüketen (spin'ler yük tabanlı transistörlerin aksine güç olmadan durumlarını korur) ve aşırı düşük voltajlarda çalışan devreler mümkün kılabilir. Intel'in araştırma bölümü, manyetoelektrik ve spin-yörünge bağlaşım etkilerini birleştiren **MESO** (MagnetoElektrik Spin-Yörünge) mantık cihazları üzerine yayınlar yaptı; bunlar silikonun minimum voltajının beşte biri olan 100 mV'de 10–30 kat daha düşük anahtarlama enerjisiyle çalışır.

**Süper iletken mantık**, belirli malzemelerin kritik sıcaklıklarının altına soğutulduğunda (tipik olarak 4–10 Kelvin veya yaklaşık -269°C ile -263°C) **sıfır elektrik direnciyle** akım taşıdığı gerçeğinden yararlanır. RSFQ (Hızlı Tek Akı Kuantumu) devreleri, bitleri Josephson bağlantıları — ince yalıtkan bariyerlerle kesintiye uğrayan süper iletken döngüler — ile yapılmış devreler aracılığıyla yayılan küçük manyetik akı kuantumları (2,07 × 10⁻¹⁵ weber) olarak kodlar. Bu devreler anahtarlama olayı başına neredeyse hiç güç dağıtmadan **yüzlerce gigahertz'de** saat hızı yapabilir. Dezavantaj açık: kriyojenik soğutucu gerekir. Ama güce milyarlarca harcayan hiper ölçekli veri merkezleri için toplam sahip olma maliyeti aslında denk gelebilir — üretim zorlukları çözülebilirse. IARPA'nın SuperTools programı ve SeeQC gibi şirketler aktif olarak süper iletken çip tasarım araçları ve süreçleri geliştiriyor.

## Chiplet'ler ve Heterojen Entegrasyon: Gerçek Yakın Vadeli Yol

Egzotik malzemeler manşetleri kaparken, tartışmalı olarak en etkili "sırada ne" teknolojisi en pragmatik olanı: **her şeyi tek bir silikon parçasına koymaya çalışmayı bırakmak.**

Chiplet'leri Gün 13'te ele aldık ama stratejik önemleri bu son derste vurgulanmayı hak ediyor. Yarı iletken performans ölçeklendirmesinin geleceği sadece transistörleri küçültmek değil — tek bir pakette farklı teknolojileri **karıştırmak ve eşleştirmektir.** 2028'deki bir yapay zekâ hızlandırıcısı şunları birleştirebilir:

- Hesaplama motorları için 2 nm GAA'da **mantık chiplet'leri**
- 1 µm altı aralıklı hibrit bağlamayla **HBM4** bellek yığınları
- Paket dışı iletişim için olgun silikon fotonik düğümünde (45 nm SOI) **optik I/O chiplet'leri**
- 28 nm'de **güç yönetimi chiplet'leri** — çünkü analog en ileri ölçeklemeden faydalanmaz
- Her şeyi kısa, geniş, düşük güçlü bağlantılarla birbirine bağlayan **silikon veya organik ara katman**

Bu heterojen yaklaşım, Moore Yasası'nın monolitik ölçekleme yoluyla çözmeye çalıştığı temel sorunu devre dışı bırakır: artık *her* bileşenin en son düğümde olmasına gerek yok. Her işlev ekonomik ve teknik olarak anlamlı olan düğümde olabilir. AMD bunu EPYC ile ölçekte kanıtladı — chiplet tabanlı sunucu CPU'ları Intel'in monolitik tasarımlarını kısmen chiplet verim ekonomisinin büyük toplam kalıp alanı ürünleri için çok daha elverişli olması nedeniyle geride bıraktı.

Etkinleştirici teknoloji **ileri paketlemedir** ve savaş alanı chiplet'ler arası ara bağlantı yoğunluğudur. Bugünün en ileri 2.5D paketlemesi (TSMC CoWoS-S) kabaca **40–50 µm tümcek aralığı** elde eder. Hibrit bağlama — lehim tümceksiz doğrudan bakır-bakır bağlama — bunu üretimde **3–9 µm aralığa**, araştırma gösterimlerinde **1 µm'nin altına** iter. 1 µm aralıkta, iki chiplet arasındaki bant genişliği yoğunluğu çip *içindeki* kalıp üstü ara bağlantıdan elde ettiğinize yaklaşır — "tek çip" ile "çok çip" arasındaki sınırı fiilen siler.

## Silikonun Sonu mu? Yoksa Dönüşümü mü?

Peki silikon "bitecek" mi? Neredeyse kesinlikle hayır — en azından yaşamlarımız boyunca değil. Bitecek olan, endüstriyi 1965'ten yaklaşık 2025'e kadar tanımlayan *monolitik küçültme paradigmasıdır.* Sonraki dönem bireysel transistörleri daha küçük yapmakla ilgili olmayacak (GAA ve CFET birkaç nesil daha zorlayacak olsa da). Şununla ilgili olacak:

1. **Sistem düzeyinde inovasyon**: Chiplet'ler, 3D istifleme, optik ara bağlantılar — sadece transistörü değil *sistemi* ölçeklendirmek.
2. **Özelleştirilmiş mimariler**: Farklı iş yükleri için farklı silikon (CPU'lar, GPU'lar, TPU'lar, NPU'larla zaten buradayız — bunun hızlanmasını bekleyin).
3. **Silikon üzerine katmanlanan yeni malzemeler**: Silikon substratlar üzerinde MoS₂ kanallar. Silikon ara katmanlara bağlanan fotonik için III-V bileşenler. Silikon wafer'lar üzerinde büyütülen karbon nanotüpler. Silikon gitmez — diğer malzemelerin entegre edildiği *platform* hâline gelir.
4. **Temelden yeni hesaplama paradigmaları**: Kuantum hesaplama (süper iletken kübitler veya spin kübitleri için substrat olarak silikon kullanan), nöromorfik çipler (Intel'in Loihi 2'si beyin sinapslarını taklit etmek için standart CMOS kullanır) ve olasılıksal hesaplama.

Yarı iletken endüstrisi kendini en az dört kez yeniden icat etti — germanyumdan silikona, bipolardan CMOS'a, düzlemseldan FinFET'e, tek kalıptan chiplet'e. Her seferinde gözlemciler ölçeklendirmenin sonunu öngördü. Her seferinde mühendisler bir yol buldu — düz bir çizgide devam ederek değil, yeniliğin yeni bir boyutuna **köşeyi dönerek**.

Bu kursun en önemli dersi belki de şu olabilir: yarı iletkenlerin tarihi fizik, malzeme veya litografi hakkında bir hikâye değil. **İnsan yaratıcılığının zorlu sınırlarla karşılaşıp onları kabul etmeyi reddetmesinin** hikâyesi. Sınır asla son değil. Bir sonraki bölümün başlangıcı.

---

*Bu, yarı iletken dünyasındaki 28 günlük yolculuğumuzun son dersi. Bell Laboratuvarları'ndaki ilk transistörden bugün üretim hatlarından çıkan GAA nano levhalara, on bir dokuz saflığa arıtılan kumdan üç atom kalınlığındaki molibden disülfür tek katmanlara — artık uygarlığın en karmaşık teknolojisinin nasıl çalıştığına dair gerçek, teknik bir anlayışa sahipsiniz. Aşağıdaki test bugünkü materyalle ilgili bilginizi ölçecek. Bu kursu aldığınız için teşekkür ederiz.*

---

<div class="quiz-placeholder" data-quiz="quizzes/gun-28.toml"></div>
