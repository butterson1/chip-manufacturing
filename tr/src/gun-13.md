# Gün 13: Paketleme
## Çiplet'ler, 3D İstifleme ve Paketin Neden Yeni Darboğaz Olduğu

On iki gündür silikonun *üzerinde* ne olduğuna kafayı taktık — transistörler, kablolama, parlatma, litografi. Bir çipi ham kumdan 300 mm'lik bir plaka üzerinde oturan, milyarlarca transistör ve kilometrelerce bakırdan oluşan bozulmamış bir devre dikdörtgeni olan bitmiş kalıba kadar takip ettik. Ve şimdi yarı iletken endüstrisinin elli yıl boyunca görmezden gelip aniden yeniden icat etmeye çalıştığı kısım geliyor: o kalıbı gerçekten dış dünyayla konuşabilecek bir form faktörüne sokmak.

**Paketleme** — çıplak bir silikon kalıbı kapsülleme, güç ve veriye bağlama ve bir devre kartının sert gerçekliğinde hayatta kalmasını sağlama süreci — çip üretiminin sıkıcı son sözüydü. Kalıbı al, kurşun çerçeveye yapıştır, telleri bağla, siyah epoksi reçineye göm, gönder. On yıllarca paketleme bir maliyet merkeziydi, yenilik sınırı değil. 20 milyar dolarlık bir fab ve 380 milyon dolarlık bir EUV tarayıcı kalıbı üretti; 2 milyon dolarlık bir tel bağlayıcı işi bitirdi.

O dönem bitti. Bugün ileri paketleme, yarı iletken endüstrisindeki en önemli darboğazdır. NVIDIA'nın yeterli yapay zeka GPU'su üretememesinin nedenidir. AMD'nin sunucu çiplerinin Intel'i geçmesinin nedenidir. Apple'ın M serisi dizüstü çiplerini mümkün kılan teknolojidir. Ve tüm alanın en yaratıcı mühendisliklerinden bazıları şu anda burada gerçekleşiyor.

![2.5D paketleme diyagramı: silikon ara katman üzerinde hesaplama kalıbı ve HBM yığınları](assets/day-13-packaging.svg)

---

## Paketin tiranlığı

Paketleme neden bu kadar önemli? Çünkü dünyanın en iyi kalıbı, içine veri ve güç yeterince hızlı sokamazsanız işe yaramaz.

NVIDIA'nın üretken yapay zeka patlamasının ilk dalgasını güçlendiren çip olan H100 GPU'sunu düşünün. Kalıbın kendisi 80 milyar transistör içerir, ama performansı temelde **bellek bant genişliği** ile sınırlıdır — HBM (Yüksek Bant Genişlikli Bellek) yığınlarından hesaplama çekirdeklerine ne kadar hızlı veri aktarabildiği. H100, **saniyede 3,35 terabayt** bellek bant genişliği elde eder. Bu, kabaca her saniye tüm Kongre Kütüphanesi'ni indirmeye eşdeğerdir. Ve hâlâ yeterli değil — hesaplama birimleri önemli ölçüde boşta kalıyor, veriye aç.

O 3,35 TB/s'nin her biri **paketin** — GPU kalıbını altı HBM3 bellek yığınına fiziksel olarak bağlayan alt tabaka ve ara bağlantıların — içinden akar. Paketin içindeki teller çip içi ara bağlantılardan daha geniş ve yavaştır ve bit başına daha fazla enerji tüketir. Sistem düzeyinde, modern bir veri merkezi çipindeki **toplam gücün yaklaşık %30-40'ı** veri taşımaya gider, onunla hesaplama yapmaya değil. Gücün çoğunun yandığı yer pakettir.

İşte temel gerilim: transistörler küçülmeye devam eder (hesaplamayı ucuzlatır), ama çipler arasındaki ve çiplerle bellek arasındaki bağlantılar aynı hızda *küçülmüyor*. Hesaplama kapasitesi ile iletişim kapasitesi arasındaki uçurum her nesilde genişler. Paketleme, bu açığı kapatmaya çalışan alandır.

---

## Paketlerin kısa tarihi

1960'ların en eski entegre devreleri seramik **DIP** (Çift Sıralı Paket) muhafazalarında paketleniyordu — devre kartına takılan iki sıra metal bacaklı dikdörtgen bloklar. Bir DIP-40'ta 40 pin vardı ve 16 bit'lik bir mikroişlemci için yeterli sinyal taşıyabilirdi. Basit, sağlam ve sınırlı.

Çipler daha karmaşık hale geldikçe daha fazla G/Ç bağlantısına ihtiyaç duydular. Endüstri dört tarafında da terminalleri olan **QFP** (Dörtlü Düz Paket) — Intel'in 1989'daki 486'sı 168 pinli PGA (Pin Izgara Dizisi) kullandı — ve sonunda 1990'ların ortalarında **BGA** (Top Izgara Dizisi) kullanmaya geçti. Kenarlardan çıkan pinler yerine BGA'lar paketin alt kısmına bir lehim topu dizisi yerleştirerek tüm alt yüzey alanını kullandı. Modern bir BGA **binlerce** bağlantı barındırabilir: örneğin Apple'ın M2 Ultra'sı paket alt tabakasında yaklaşık 6.700 sinyal ve güç topuna sahiptir.

Ama sadece daha fazla pin yeterli değildi. Önemli olan **bant genişliği yoğunluğu** — belirli bir alandan ne kadar yüksek hızlı sinyal geçirebildiğinizdi. Geleneksel bir BGA'da lehim topları **0,4-1,0 mm adımda** (merkezden merkeze aralık) bulunur. Bu, metal hatların 20-30 nanometre aralıkla dizildiği çip içi kablolama ile karşılaştırıldığında devasa bir mesafedir. Çip içi tel yoğunluğu ile paket düzeyindeki ara bağlantı yoğunluğu arasında kabaca **10.000 katlık bir fark** vardır. Bu farkı kapatmak ileri paketlemenin merkezi zorluğudur.

---

## Flip-chip: tersine çevirmek

İlk büyük paketleme yeniliği, IBM tarafından 1960'larda "C4" (Kontrollü Çökme Çip Bağlantısı) adıyla öncülük edilen **flip-chip**ti. Kalıbın üst yüzeyindeki kontakları paket çerçevesine bağlamak için ince altın teller kullanmak yerine — geleneksel **tel bağlama** yaklaşımı — kalıbı ters çevirip doğrudan paket alt tabakasına küçük lehim tümsekleri dizisiyle lehimlersiniz.

Tel bağlama sınırlıdır. Her bağ sırayla yapılır (bir seferde bir tel), tellerin endüktansı ve direnci vardır ve yalnızca kalıbın **çevresine** bağlayabilirsiniz. Tel bağlı bir pakete sahip büyük bir kalıpta kenarların etrafında 500-800 bağlantı olabilir.

Flip-chip bu kısıtlamaları kaldırır. Lehim tümsekleri kalıbın **tüm yüzeyine** alan dizisi şeklinde yerleştirilebilir ve size binlerce bağlantı sağlar. Tümsekler tel bağlantılarından daha kısadır (50-100 µm yüksekliğe karşı tel halkası için 1-3 mm) ve parazitik endüktansı 10 kat azaltır. Kalıp ayrıca doğrudan alt tabaka üzerindedir ve termal iletimi iyileştirir — transistörlerin ürettiği ısının üstteki ısı dağıtıcıya giden yolu daha kısadır.

Bugün esasen tüm yüksek performanslı işlemciler flip-chip paketleme kullanır. Tümsekler zamanla küçülmüştür: 150 µm adımlı C4 tümseklerinden ileri 2.5D ve 3D istiflemede kullanılan 40-55 µm adımlı **mikro tümseklere**. Mevcut sınır 10 µm'nin altında adımlı **hibrit bağlama**dır — ama ona geleceğiz.

---

## Çiplet devrimi

İşte şaşırtıcı bir gerçek: **tek bir büyük çip yapmak, neredeyse her zaman birkaç küçük çip yapıp bir pakette birbirine bağlamaktan daha kötüdür.**

Bu sezgiye aykırı görünür. Tek bir büyük çip, her şeyin tek bir silikon parçasında olduğu, birbirine yapıştırılmış bir sürü küçük çipten daha hızlı olmaz mı? Cevap, yarı iletken ekonomisindeki en önemli kavramlardan birini içerir: **verim**.

7. Gün'den hatırlayın: plaka boyunca rastgele dağılmış kusurlar üzerlerine düştükleri kalıpları öldürür. Küçük bir kalıp yapıyorsanız — diyelim 50 mm² — ve plakada cm² başına 0,1 kusur varsa, veriminiz yaklaşık %95'tir. Ama dört kat daha büyük bir kalıp (200 mm²) yaparsanız, verim %80'e düşmez — Poisson dağılımı nedeniyle yaklaşık **%82'ye** düşer (ve pratikte kümeleme nedeniyle genellikle daha kötü). 600 mm²'de, yaklaşık 858 mm²'lik **reticle sınırına** (tek bir EUV pozlamanın yazdırabileceği maksimum alan, 26 × 33 mm'lik reticle alanıyla belirlenen) yaklaşırken, olgun bir süreçte bile verim yaklaşık **%55-60'a** düşer. Çiplerin neredeyse yarısı kusurlu.

AMD bunu anladı ve geri dönüşlerinin temel taşı haline getirdi. 2019'da EPYC "Rome" sunucu işlemcileri 64 CPU çekirdeğini tek bir devasa kalıba sıkıştırmaya çalışmadı. Bunun yerine, her biri 8 çekirdek içeren **sekiz özdeş 74 mm²'lik "çiplet"** (CCD — Çekirdek Kompleks Kalıpları adı verilen) inşa etti ve bunları tek bir paketteki merkezi bir **G/Ç kalıbı** üzerinden bağladı. Her CCD, TSMC'nin 7 nm düğümünde üretilirken — öncü transistörlere ihtiyaç duymayan — G/Ç kalıbı daha ucuz 14 nm GlobalFoundries sürecinde inşa edildi.

Avantajlar muazzamdı:

- **Verim:** Küçük 74 mm²'lik çiplet'ler, tek bir varsayımsal ~500 mm²'lik monolit kalıptan çok daha iyi verim verir
- **Maliyet:** G/Ç kalıbı daha ucuz bir düğüm kullanarak o silikon üzerinde ~%50 tasarruf sağlar
- **Esneklik:** Aynı CCD çiplet'i 8 çekirdekli tüketici çiplerinde (1 çiplet), 16 çekirdekli iş istasyonu çiplerinde (2 çiplet) veya 64 çekirdekli sunucu çiplerinde (8 çiplet) kullanılabilir. Tek tasarım, birden fazla ürün.
- **Seçme:** Bir çiplet'teki bir çekirdek kusurluysa, onu devre dışı bırakıp 6 çekirdekli parça olarak satın. Monolit bir 64 çekirdekli kalıpta tek bir kötü çekirdek tüm çipi çöpe atabilir.

Intel sonunda Meteor Lake (2023) ile kendi çiplet yaklaşımını izledi ve Apple'ın M1 Ultra'sı kelimenin tam anlamıyla **silikon ara yüzey üzerinden bağlanmış iki M1 Max kalıbıdır**. Çiplet modeli kazandı.

Ama çiplet'ler yeni bir sorun yaratır: onları yeterince hızlı nasıl bağlarsınız?

---

## 2.5D paketleme: silikon ara yüzey

En yerleşik çözüm, **silikon ara yüzey** kullanan **2.5D paketleme**dir — çiplet'ler ile organik paket alt tabakası arasında oturan ek ince bir silikon katmanı. Ara yüzey transistör içermez; sadece bir kablolama katmanıdır ve organik bir alt tabakanın başarabileceğinden çok daha ince ara bağlantı adımları elde etmek için standart yarı iletken litografisi kullanılarak üretilir.

TSMC'nin **CoWoS** (Chip-on-Wafer-on-Substrate) modeli kanonik örnektir ve neredeyse her büyük yapay zeka hızlandırıcısının arkasındaki teknolojidir: NVIDIA'nın A100, H100, H200 ve B200'ü; AMD'nin MI300X'i; Google'ın TPU v5'i. CoWoS'ta GPU kalıbı ve HBM yığınları silikon bir ara yüzey üzerinde yan yana yerleştirilir, 40-55 µm adımlı **mikro tümsekler** ve 0,4-0,8 µm çizgi genişliğindeki ara yüzey kablolamasıyla bağlanır.

Rakamlar etkileyicidir. Bir H100 CoWoS paketi yaklaşık **2.400 mm²**'lik bir ara yüzey alanına sahiptir — GPU kalıbının neredeyse üç katı büyüklüğünde. Ara yüzey, organik bir alt tabakanın başarabileceğinden büyüklük mertebeleri daha yoğun olan **mm² başına yaklaşık 100.000 ara bağlantıya** sahip çoklu yeniden dağıtım katmanları (RDL) içerir. Bu yoğunluk, 3,35 TB/s'yi sağlayan 6.144 bit genişliğindeki bellek veri yolunu mümkün kılan şeydir.

Ama CoWoS'un kritik bir sınırlaması var: **maliyet ve kapasite**. Silikon ara yüzeyin kendisi bir yarı iletken fabında üretilmeli ve aksi takdirde gerçek çipler için kullanılabilecek plaka üretimini tüketmelidir. Büyük bir ara yüzey (reticle sınırını aştığı için) birbirine dikişlenmiş birden fazla litografi pozlaması gerektirir ve kırılgandır — taşıma sırasında kırılabilen büyük, ince bir silikon parçası. 2025 itibarıyla CoWoS kapasitesi, GPU plakalarının kendisinden daha fazla, NVIDIA'nın GPU arzındaki en büyük kısıtlama olmuştur. TSMC, 2023'teki kabaca **ayda 15.000 plakadan** 2025 sonuna kadar tahmini **ayda 40.000'den fazla plakaya** genişletmek için milyarlar yatırarak çılgınca CoWoS kapasitesi inşa ediyor.

Silikon ara yüzeylere bir alternatif TSMC'nin **InFO** (Tümleşik Fan-Out) teknolojisidir; silikon yerine polimer bazlı bir yeniden dağıtım katmanı kullanır. InFO daha ucuzdur ve ilk olarak 2016'da Apple'ın A10 çipinde kullanılmıştır. Ancak ara bağlantı yoğunluğu CoWoS'tan düşüktür ve bu da onu HBM donanımlı yapay zeka çiplerinin aşırı bant genişliği taleplerine uygun hale getirmez. Maliyetin ham bant genişliğinden daha önemli olduğu mobil işlemciler için idealdir.

---

## 3D istifleme: dikeye çıkmak

2.5D çiplet'leri bir ara yüzey üzerinde yan yana koyuyorsa, **3D istifleme** daha ileri giderek kalıpları doğrudan birbirinin üstüne yerleştirir. Bu basit görünür ama son derece zorludur — iki aktif silikon yüzeyini birbirine bağlıyor ve silikonun kendisinden geçerek bağlantı kuruyorsunuz.

Anahtar teknoloji **TSV** (Silikon İçi Via) — silikon kalıptan tamamen geçen dikey bir elektrik bağlantısıdır. TSV yapmak, silikon boyunca derin, dar bir delik açmayı (tipik olarak 5-10 µm çap, 50-100 µm derinlik — 10:1 veya daha fazla en-boy oranı), yalıtkanla kaplamayı ve bakırla doldurmayı içerir. Tek bir kalıp binlerce TSV içerebilir.

**HBM** (Yüksek Bant Genişlikli Bellek), ticari olarak en başarılı 3D istiflenmiş üründür. Bir HBM3E yığını, bir taban lojik kalıbının üstüne istiflenmiş **8 veya 12 DRAM kalıbından** oluşur ve kalıp başına **5.000'den fazla TSV** ile bağlanır. Her yığın yaklaşık **720 µm yüksekliğindedir** — bir milimetreden az — ve 1.024 bit genişliğinde bir arayüz üzerinden 819 GB/s bant genişliği sağlar. Karşılaştırma olarak, standart DDR5 bellek 64 bit genişliğinde bir arayüz kullanır. HBM, dikeye giderek 16 kat veri yolu genişliği elde eder.

SK Hynix, yaklaşık **%50 pazar payıyla** HBM üretimine hakimdir, ardından Samsung (**~%40**) ve Micron (**~%10**) gelir. HBM3E önemli bir fiyat primi taşır — standart DDR5 için 2-3 $/GB'a kıyasla yaklaşık **GB başına 15-20 dolar** — ve yapay zeka eğitiminden gelen talep kronik kıtlıklar yaratmıştır. Bildirildiğine göre SK Hynix'in 2025 boyunca tüm HBM3E üretimi NVIDIA'ya satılmıştır.

---

## Hibrit bağlama: bir sonraki sınır

TSV bazlı 3D istifleme, istiflenmiş kalıpları bağlamak için mikro tümsekler (lehim topları) kullanır ve bu tümsekler artık darboğazdır. 40 µm adımda mm² başına yaklaşık 625 bağlantı sığdırabilirsiniz. Bu iyi, ama çip içi tel yoğunluğuna yakın bile değil.

**Hibrit bağlama** lehim tümseklerini tamamen ortadan kaldırır. Bunun yerine iki kalıbın bakır pedleri doğrudan birbirine bağlanır — bakırdan bakıra ve oksitden okside — oda sıcaklığında tek bir adımda, ardından bakır bağlantıları güçlendirmek için 200-300°C'de tavlama yapılır. Sonuç, lehim olmadan, alt dolgu olmadan ve dramatik biçimde daha dar adımlı kesintisiz metalden metale bağlantıdır.

TSMC'nin **SoIC** (Tümleşik Çipler Üzerinde Sistem) teknolojisi üretimde **9 µm** kadar dar adımlarda hibrit bağlama elde eder ve yakın gelecekte **3-5 µm** adımları hedefliyor. 9 µm adımda bağlantı yoğunluğu yaklaşık **mm² başına 12.000** — mikro tümsek bağlantılarından yaklaşık **20 kat daha yoğun**. 3 µm adımda **mm² başına 110.000** olur ve çip içi metal katmanlarının yoğunluğuna yaklaşır.

Bu devrim niteliğindedir. Hibrit bağlama, iki istiflenmiş kalıp arasındaki sınırı elektriksel açıdan neredeyse görünmez kılar. AMD bunu **3D V-Cache** teknolojisinde kullandı: Ryzen 7 5800X3D (2022), TSMC'nin SoIC'ini kullanarak 64 MB SRAM önbellek çiplet'ini doğrudan CPU CCD'sinin üstüne istifleyerek toplam L3 önbelleği üçe katlar. İstiflenmiş önbellek, CPU'ya o kadar yoğun ve düşük gecikmeli hibrit bağlantılarla bağlanır ki CPU onu kendi önbelleğinin kesintisiz bir uzantısı olarak görür — yazılım çip üstü ve istiflenmiş önbellek arasındaki farkı anlayamaz.

Sorun mu? Hibrit bağlama **olağanüstü yüzey hazırlığı** gerektirir. Bakır pedler ve çevreleyen oksit nanometre altı pürüzlülüğe parlatılmalıdır (dünkü CMP tartışmamızı hatırlayın — burada kritik hale geliyor) ve plakalar **±200 nm** doğruluk dahilinde hizalanmalıdır. Bağlama yüzeyleri arasında sıkışan birkaç yüz nanometreden büyük herhangi bir parçacık, bağlantıları öldüren bir boşluk oluşturur. Bu, yüzey biliminin mutlak sınırıdır.

---

## Alt tabaka krizi

Herkes egzotik silikon ara yüzeylere ve hibrit bağlamaya odaklanırken, paketin en mütevazı kısmında daha sessiz bir kriz var: **organik alt tabaka**.

Her gelişmiş paket nihayetinde bir organik alt tabakaya oturur — bir PCB'ye benzer cam elyaf takviyeli reçine katmanları ve bakır izler, ama çok daha dar toleranslarla üretilmiş. Bir yapay zeka GPU paketi için bu alt tabaka **100 × 100 mm** olabilir, **8-15 µm** çizgi genişliğinde ve **25-50 µm** via çapında **20'den fazla** yönlendirme katmanıyla.

Üç Japon şirketi — **Ibiden**, **Shinko Electric** (Fujitsu yan kuruluşu) ve **AT&S** (Avusturyalı, ama Japonya ve Güneydoğu Asya'da üretimi olan) — %70'i aşan birleşik payıyla gelişmiş alt tabaka pazarına hakimdir. Bunlar yarı iletken fabları değildir; kademeli olarak yarı iletken benzeri hassasiyete itilmiş PCB üreticileridir. Alt tabaka inşa etmek **60-90 işlem adımı** ve **60-80 gün** sürer, verimler tarihsel olarak yarı iletken standartlarının oldukça altında kalmıştır.

Yapay zeka çipleri büyüdükçe alt tabaka da büyümelidir — ve daha büyük alt tabakalar eğilir, delaminasyon yapar ve daha düşük verime sahiptir. NVIDIA'nın B200 paketi o kadar büyüktür ki bildirildiğine göre alt tabaka teknolojisini sınırlarına zorlamıştır ve 260°C lehim reflow işlemi sırasında **çarpılma yönetimi** kritik bir mühendislik sorununa dönüşmüştür. Alt tabaka ısınıp soğudukça esner ve **100-150 µm**'den fazla çarpılırsa karta olan lehim bağlantıları kopar.

Alt tabaka arzı, zirve talep dönemlerinde teslim süreleri **40-50 haftaya** uzanan kalıcı bir darboğaz olmuştur. Çarpıcı bir ironi: belki **50-100 dolar**'a mal olan bir paket alt tabakası, **30.000-40.000 dolar**'a satılan bir GPU'nun teslimatını kısıtlayabilir.

---

## Termal yönetim: üçüncü boyutun vergisi

Kalıpları 3D olarak istiflemek kaçınılmaz bir fizik sorunu yaratır: **ısının çıkması gerekir**. Tek bir işlemci kalıbı 200-400 watt harcayabilir. İki veya üç aktif kalıbı istifleyin ve termal yoğunluk kabusu yaşarsınız — alt kalıbın ürettiği ısı, soğutucuya ulaşmak için üst kalıptan geçmek zorundadır.

Silikonun termal iletkenliği fena sayılmaz (~150 W/m·K), ama mucizevi bir iletken değil. İstiflenmiş kalıplar arasındaki bağlama arayüzleri termal direnç ekler — her arayüz, bağlama kalitesine bağlı olarak yaklaşık **0,1-0,5 K·cm²/W** katkı sağlar. Yüksek güçte çalışan bir 3D yığın için alt kalıp, üst kalıptan **10-15°C daha sıcak** olabilir ve bağlantıları zorlayan diferansiyel genleşmeye neden olan bir termal gradyan yaratır.

Bu yüzden şu ana kadar 3D istifleme en çok **bellek** (HBM) ve **önbellek** (V-Cache) — nispeten düşük güç yoğunluklu devreler — ile başarılı olmuştur. İki yüksek güçlü lojik kalıbını (iki CPU veya iki GPU gibi) istiflemek mevcut teknolojiyle termal açıdan zorludur. Intel'in **Foveros** teknolojisi Lakefield'da (2020) lojik-üstü-lojik 3D istifleme gösterdi, ama istiflenmiş kalıp yüksek performanslı bir hesaplama kalıbı değil, düşük güçlü bir Atom çekirdeğiydi.

Geliştirme aşamasındaki çözümler arasında **mikro akışkan soğutma** — istiflenmiş kalıplar arasında doğrudan silikona küçük kanallar açmak ve içinden soğutucu akıtmak — bulunur. **Georgia Tech** ve **IMEC**, **300+ W/cm²** ısı kaldırma kapasitesine sahip entegre mikro akışkan kanallı prototip 3D yığınlar göstermiştir, ama bu üretim karmaşıklığı ekler ve güvenilirlik endişeleri yaratır (sıvı + elektronik uzun bir gözyaşı geçmişine sahiptir).

---

## Paketleme ekosistemi: kim ne yapıyor

İleri paketleme tamamen yeni bir rekabet ortamı yaratmıştır:

- **TSMC**, CoWoS, InFO ve SoIC ile hakim durumdadır. Paketleme gelirleri döküm gelirlerinden daha hızlı büyüyor — 2025'te tahmini **10+ milyar dolar**.
- **ASE Group** (Tayvan), yıllık ~18 milyar dolar gelirle dünyanın en büyük OSAT (Dış Kaynak Yarı İletken Montaj ve Test) şirketidir; akıllı telefon çiplerinden otomotiv sensörlerine kadar yüksek hacimli paketleme yapar.
- **Amkor Technology** (ABD merkezli, Kore, Japonya ve Güneydoğu Asya'da fabrikalar) OSAT'ta yakın ikinci sıradır.
- **Intel**, özellikle **EMIB** (Gömülü Çoklu Kalıp Ara Bağlantı Köprüsü) — organik alt tabakaya gömülü, tam bir ara yüzeyden daha ucuz yerel bir silikon köprü — ve 3D istifleme için **Foveros** olmak üzere kendi paketleme yeteneklerine büyük yatırım yapmıştır. Intel'in Ponte Vecchio GPU'su hem EMIB hem de Foveros'u aynı anda kullanarak **47 parçayı** tek bir pakette entegre etti.
- **Samsung**, TSMC ile yapay zeka çip paketleme siparişleri için rekabet eden kendi 2.5D (I-Cube) ve 3D (X-Cube) paketleme teknolojilerini sunar.

Toplam ileri paketleme pazarının **2028'e kadar 65-70 milyar dolara** ulaşması öngörülüyor ve yıllık yaklaşık %10-12 büyüme gösteriyor — genel yarı iletken pazarından önemli ölçüde hızlı.

---

## Büyük resim: paketin neden yeni darboğaz olduğu

İşte modern yarı iletkenlerin sezgiye aykırı gerçekliği: **transistörleri, birbirine bağlayabildiğimizden daha hızlı küçültebiliyoruz.**

EUV litografisi 8 nm yarım adımlı özellikler basabilir. Ama paket ara bağlantıları hâlâ nanometre değil mikrometre ile ölçülür. Çip içi ve paket kablolama arasındaki 10.000 katlık yoğunluk farkı, paketin sistem performansında belirleyici faktör haline gelmesinin nedenidir.

Bunun endüstri için derin etkileri var. Eski model — fabsız şirketler çip tasarlar, TSMC üretir, OSAT'lar paketler — çöküyor. Paketleme artık çip tasarımına o kadar sıkı bağlı ki TSMC ileri paketleme işinin büyük bölümünü üstlendi. Bir yapay zeka hızlandırıcı tasarlarken aynı anda paketini de tasarlamanız gerekir çünkü paket mimarisi bellek bant genişliğini belirler ve o da kullanılabilir hesaplama verimini belirler.

Gelecek **heterojen entegrasyon**dur — farklı süreç düğümlerinde farklı fablar tarafından üretilmiş özelleşmiş çiplet'lerden oluşan, tek bir pakette montajlanan ve monolit bir çip gibi görünüp davranan sistemler. AMD'nin MI300X'i zaten tek bir pakette TSMC'nin CoWoS'u kullanarak **13 çiplet'i** (6 hesaplama kalıbı + 4 G/Ç kalıbı + 3 ek kalıp) entegre eder. NVIDIA'nın Blackwell B200'ü devasa bir CoWoS ara yüzeyi üzerinde 10 TB/s çipten çipe bağlantıyla bağlanmış **iki GPU kalıbı** içerir.

Yarı iletken yeniliğinde ağırlık merkezinin "transistörü ne kadar küçültebiliriz"den "kalıpları ne kadar akıllıca bağlayabiliriz"e kaymasına tanık oluyoruz. Paket, bir zamanlar düşünceye bile değmezdi, artık ana etkinliktir.

---

## Yarın

Ters gidebilecek şeylerden bahsetmişken: bu son derece karmaşık çok çiplet'li, 3D istiflenmiş paketi inşa ettik — ama kaç tanesi gerçekten *çalışıyor*? Yarın **verim ve kusurları** ele alıyoruz — yarı iletken üretiminin kalbindeki istatistiksel savaş. Tek bir görünmez parçacık neden milyar dolarlık bir çip serisini mahveder? Fablar 100 milyar arasında ölü bir transistörü nasıl bulur? Ve "altı sigma" marjlarınız atomlarla ölçüldüğünde gerçekten ne anlama gelir?

---

<div class="quiz-placeholder" data-quiz-path="quizzes/gun-13.toml" data-quiz-id="gun-13"></div>
