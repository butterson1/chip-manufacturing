# Gün 18: Bellek Hiyerarşisi — SRAM, DRAM, HBM ve Bant Genişliği Duvarı

*Gelmiş geçmiş en hızlı işlemci, veriyi yeterince hızlı alamıyorsa işe yaramaz. Modern hesaplamanın gerçek darboğazına hoş geldiniz.*

---

## Hesaplamanın Kirli Sırrı

İşte sizi rahatsız etmesi gereken bir gerçek: modern bir CPU saniyede kabaca 200 milyar işlem yürütebilir. Ama ana bellek saniyede yalnızca yaklaşık 50 milyar bayt sunabilir. Hesabı yapın ve sorunu göreceksiniz — işlemci, belleğin onu *besleyebildiğinden* yaklaşık dört kat daha hızlı *düşünebilir*. **Bellek duvarı** adı verilen bu uyumsuzluk, otuz yılı aşkın süredir bilgisayar mimarisindeki baskın kısıtlama olmuştur ve her yıl daha da kötüleşiyor.

1980'de işlemci döngü süreleri ve DRAM erişim süreleri kabaca eşleşiyordu — ikisi de 100 nanosaniye civarında. 2025'te işlemciler nanosaniyenin altında döngü süreleriyle çalışırken DRAM tek bir rastgele erişim için hâlâ 50-70 nanosaniyeye ihtiyaç duyuyor. Bu, mühendislikteki en zarif hilelerden biriyle — **bellek hiyerarşisi** — örtbas edilen kabaca 200:1'lik bir boşluk.

Bu hiyerarşiyi anlamak akademik değildir. M4 MacBook'unuzun çevik hissettirmesinin nedeni budur. NVIDIA'nın H100'ünün 30.000$ olmasının ve çipin *üstüne yığılmış* 80 GB belleğe sahip olmasının nedeni budur. AMD'nin oyun işlemcilerine yalnızca önbellekten oluşan ikinci bir kalıp eklemesinin nedeni budur. Modern hesaplamadaki her büyük mimari karar — veri merkezi GPU'larından akıllı telefon SoC'lerine — temelde bellek duvarıyla bir müzakeredir.

## SRAM: Karşılayamayacağınız Altın Standart

Hiyerarşinin tepesinde **Statik Rastgele Erişimli Bellek (SRAM)** bulunur ve tahtını ham hızla kazanır. Bir SRAM hücresi 1 nanosaniyenin altında okunabilir — ışığın 30 santimetre yol aldığı süre. Güç uygulandığı sürece verisini tutar, yenilemeye ihtiyacı yoktur. İşlemci hızında çalışan belleğe sahip olabileceğimiz en yakın şeydir.

Peki bedeli ne? Bir SRAM hücresi **altı transistör** gerektirir (klasik 6T hücresi). Bunu, yalnızca bir transistör ve bir kapasitör gerektiren DRAM hücresiyle karşılaştırın. Bu, SRAM'in bit başına DRAM'den yaklaşık 50 kat daha fazla silikon alanı tükettiği anlamına gelir. TSMC'nin N3 sürecinde bir SRAM bit hücresi yaklaşık 0,0199 µm² ölçer — mutlak anlamda olağanüstü küçük, ama DRAM'in başardığına göre devasa. Makul bir maliyetle gigabaytlarca SRAM inşa edemezsiniz.

Bu nedenle SRAM, *işlemci kalıbının kendisinde* önbellek belleği olarak yaşar ve katmanlar halinde düzenlenir:

- **L1 önbellek**: Çekirdek başına 32-80 KB, 3-5 saat döngüsünde (~1-2 ns) erişilir. Komut önbelleği (L1i) ve veri önbelleği (L1d) olarak ikiye ayrılır. İşlemcinin karalama defteri — inanılmaz hızlı ama küçücük.
- **L2 önbellek**: Çekirdek başına 256 KB - 2 MB, 10-15 döngüde (~4-7 ns) erişilir. Çoğu iç döngünün çalışma kümesini tutacak kadar büyük bir geçiş alanı.
- **L3 önbellek**: Tüm çekirdekler arasında paylaşılan 16-96 MB, 30-50 döngüde (~10-20 ns) erişilir. Çip dışında DRAM'e gitmeden önceki son savunma hattı.

Önbelleğin gerçek dahiliği, **zamansal yerelliği** (yakın zamanda erişilen veriye büyük olasılıkla tekrar erişilecek) ve **mekânsal yerelliği** (yakın zamanda erişilen veriye yakın veriye büyük olasılıkla ihtiyaç duyulacak) kullanmasıdır. Bunlar varsayım değil — insanların yazdığı neredeyse her programın ampirik olarak ölçülmüş özellikleridir. Önbellek bir **64-bayt önbellek satırı** (x86'da standart birim) getirdiğinde, komşu baytları da isteyeceğinize bahse girer. Bu bahis zamanın %90'ından fazlasında kazanır.

### V-Cache Devrimi

AMD, **3D V-Cache** teknolojisiyle cesur bir hamle yaptı. 2022'deki Ryzen 7 5800X3D ile başlayarak, 13. Gün'ün paketleme dersinde ele aldığımız **hibrit bağlama** — aynı bakır-bakır doğrudan bağlama tekniğini — kullanarak mevcut CCD'nin (Çekirdek Kompleks Kalıbı) *üzerine* ek bir 64 MB SRAM kalıbı yapıştırdılar. Sonuç: CCD başına toplam 96 MB L3 önbellek, orijinal miktarın üç katı.

Performans etkisi sarsıcıydı. Oyun iş yükleri — oyun motorlarının karmaşık sahne grafikleri boyunca işaretçileri takip ettiği için önbelleğe notoriously duyarlı iş yükleri — için 5800X3D, daha az çekirdek ve daha düşük saat hızlarına rağmen Intel'in i9-12900KS'ini yakaladı veya geçti. AMD, birçok iş yükü için **daha fazla önbelleğin daha fazla frekansı yendiğini** kanıtladı.

En son Ryzen 9 9950X3D bunu CCD başına 144 MB L3'e çıkarıyor. Intel, sunucu parçalarında kendi versiyonu olan "Adamantine" L4 önbelleğiyle yanıt verdi. Önbellek silahlanma yarışı gerçek ve tamamen bellek duvarı tarafından yönlendiriliyor.

Ama 144 MB bile bir uygulamanın ihtiyaç duyduğu gigabaytların yanında yuvarlama hatası. Eninde sonunda çipten ayrılmanız gerekir.

## DRAM: Uçsuz Bucaksız, Yavaş Depo

SRAM en çok kullandığınız aletleri tuttuğunuz bir tezgâhsa, DRAM şehrin öbür ucundaki depodur. **Dinamik Rastgele Erişimli Bellek**, her biti küçücük bir kapasitör üzerindeki yük olarak depolar — modern süreçlerde yaklaşık 20-30 femtofarad. Bu, yüklendiğinde yaklaşık 125.000 elektron demektir. Bu minimalizm (bit başına bir transistör, bir kapasitör), DRAM'in kalıp başına 8-16 Gb yoğunluklara ulaşmasının, SRAM'in çok ötesine geçmesinin nedenidir.

İsimdeki "dinamik" kısmı sorunun ta kendisidir: kapasitörler kaçak yapar. Yüklenmiş bir DRAM hücresi, eklem kaçağı ve eşik altı akımlar yoluyla yeterli elektron kaybeder ve yaklaşık **64 milisaniye** içinde okunamaz hale gelir. Her DRAM hücresi bu tutma penceresi içinde en az bir kez okunup yeniden yazılmalıdır — **yenilenmeli**. Tipik bir DDR5 modülü her bankın tüm 8.192 satırını her 32-64 ms'de yeniler, bu da banka başına saniyede yaklaşık 8.000-16.000 yenileme işlemi gerektirir. Bu yenileme vergisi kullanılabilir bant genişliğinin yaklaşık %5-10'unu çalar ve öngörülemeyen şekilde gecikme ekler.

### DDR5: Günümüzün En İleri Teknolojisi

2025 masaüstü bilgisayarlarının standardı olan modern DDR5-5600 bellek, kanal başına yaklaşık **44,8 GB/s** sunar (5.600 MT/s × transfer başına 8 bayt). Çift kanallı bir masaüstü sistemi ~90 GB/s alır. DDR5-4800'lü dört kanallı bir sunucu ~153 GB/s'ye ulaşır. Bunlar, 60 çekirdekli bir Intel Xeon'un bellek yoğun iş yükleri çalıştırırken saniyede yüzlerce gigabayt talep edebileceğini düşünene kadar büyük sayılar gibi görünür.

DDR5, DDR4'e göre birkaç akıllı yenilik getirdi:

- Bir 64-bit kanal yerine **iki bağımsız 32-bit alt kanal**, veri yolu kullanımını artırır
- **Çip üstü ECC** (Hata Düzeltme Kodu), veri bellek denetleyicisine bile ulaşmadan her DRAM çipi içindeki tek-bit hataları düzeltir
- Diğer bankaların yenileme döngüleri sırasında çalışmaya devam etmesini sağlayan **aynı banka yenilemesi**
- Daha yüksek veri hızlarında sinyal bütünlüğünü temizlemek için G/Ç üzerinde **Karar Geri Beslemeli Dengeleme (DFE)**

Ama temel sorun devam eder: DDR5'in yaklaşık 13-14 ns'lik **Sütun Erişim Darbesi (CAS) gecikmesi**, artı bir satırı etkinleştirme süresi (~13 ns), soğuk rastgele erişimin kabaca 50-70 ns sürmesi anlamına gelir. 5 GHz'lik bir işlemci için bu 250-350 boşa geçen döngü demektir — sıra dışı yürütme motoru (16. Gün) yapacak başka bir şey bulamazsa çekirdeğin mecazi parmaklarını döndürdüğü döngüler.

### DRAM Üretim Tekeli

İşte jeopolitik stratejistleri tedirgin etmesi gereken bir gerçek: dünyanın DRAM'inin özünde **tamamını** üç şirket üretiyor. Samsung (%40 pazar payı), SK Hynix (%34) ve Micron (%25). Hepsi bu. Üç şirket, iki ülke (Güney Kore ve Amerika Birleşik Devletleri), her telefona, her sunucuya, her arabaya, her akıllı ekmek kızartma makinasına giden bir bileşeni tedarik ediyor.

DRAM üretimi, yaklaşık 12-15 nm süreçler kullanır (ancak olağanüstü aşındırma yetenekleri gerektiren yüksek en-boy oranlı kapasitör yapılarıyla — kapasitör en-boy oranları mevcut tasarımlarda **60:1'i** aşar). Her şirket devasa ölçekte üretim yapar: Samsung'un yalnızca Pyeongtaek kampüsü birden fazla fabrikada yılda milyonlarca wafer üretir.

Toplam DRAM pazarı 2024'te yaklaşık **90 milyar dolar** değerindeydi ve var olan en acımasızca döngüsel endüstrilerden biridir. Fiyatlar arz-talep dinamiklerine bağlı olarak tek bir yılda %50 salınım gösterebilir.

## HBM: Bellek Dikeye Çıkıyor

Bant genişliği her şeyden önemliyse — ve yapay zekâ çağında öyledir — temelden farklı bir yaklaşıma ihtiyacınız var. Karşınızda **Yüksek Bant Genişlikli Bellek (HBM)**, belki de 2020'lerin en önemli bellek teknolojisi.

HBM'in arkasındaki temel kavrayış aldatıcı derecede basittir: ana kart üzerindeki DIMM'lere dar, yüksek hızlı bir veri yolu üzerinden veri göndermek yerine, **DRAM kalıplarını dikey olarak istifleyin ve binlerce kısa, yavaş kabloyla bağlayın**. Kısa kablolar daha az enerji kullanır. Binlercesi devasa toplam bant genişliği sunar. Bu, tek bir itfaiye hortumunu on bin pipet ile değiştirmenin bellek eşdeğeridir — sezgiye aykırı, ama matematik tutuyor.

Bir HBM yığını, her biri yaklaşık **40-50 µm'ye** (insan saçı kalınlığının yaklaşık yarısı) inceltilmiş, **Silikon İçi Geçişler (TSV'ler)** — silikona delilmiş bakır doldurulmuş küçük delikler — ile dikey olarak bağlanan 8-12 DRAM kalıbından oluşur. Her yığının **1.024 bit genişliğinde** bir arayüzü vardır. Bunu DDR5'in 32-bit alt kanalıyla karşılaştırın ve bant genişliğinin neden patladığını görmeye başlarsınız.

Güncel nesil, **HBM3E** (başta SK Hynix ve Samsung tarafından üretilen), şunları sunar:

- Yığın başına **1,18 TB/s** bant genişliği (8 yükseklik, kalıp başına 36 Gb, yığın başına 36 GB'a kadar)
- Pin başına yalnızca **6,4 Gbps** hızda çalışır — DDR5'in 5.600-8.400 Mbps'inden çok daha yavaş — ama 32 yerine 1.024 pin ile
- Aynı aktarılan veri için DDR5'ten yaklaşık 3-5 kat daha enerji verimli, kabaca **20 pJ/bit** güç tüketimi

NVIDIA'nın H100 GPU'su beş HBM3 yığını kullanır, toplam **80 GB, 3,35 TB/s**. H200 bunu altı HBM3E yığınına çıkararak **141 GB, 4,8 TB/s** sunar. Gelecek B200, HBM3E ile **192 GB, 8 TB/s'ye** ulaşır. Bağlam olarak, tek bir GPU'nun bellek bant genişliği bir *raf dolusu* geleneksel sunucudan fazladır.

### Pahalı Kısım

HBM'in olağanüstü performansı olağanüstü maliyetle gelir. Bir HBM3E yığını kabaca **100-120$** maliyetlidir; eşdeğer kapasitede bir DDR5 çipinin 3-5$ olduğu düşünüldüğünde. Bir H100'ün 80 GB HBM3'ü yalnızca bellek maliyeti olarak yaklaşık **500-600$** temsil eder — ve bu NVIDIA'nın toptan fiyatıdır. Maliyet birden fazla faktörden kaynaklanır: TSV delme süreci, kalıp inceltme (çatlama riski taşır ve verimi düşürür), hassas istifleme ve bağlama ve sınırlı üretici sayısı.

SK Hynix şu anda yaklaşık **%50-55 pazar payıyla** HBM üretimine hâkimdir, ardından Samsung **%40** ve Micron **%5-10** ile gelir. Toplam HBM pazarı 2024'te yaklaşık **20 milyar dolardı** ve neredeyse tamamen yapay zekâ hızlandırıcı talebinin yönlendirmesiyle 2028'de **100 milyar doları** aşacağı öngörülüyor. SK Hynix'in Icheon fabrikasının bildirildiğine göre HBM'i yeterince hızlı üretemiyor — 2025 üretimlerinin tamamı NVIDIA ve AMD'ye zaten tahsis edilmiş durumda.

## Bant Genişliği Duvarı: Tüm Bunlar Neden Önemli

Bellek hiyerarşisi temel bir fiziksel kısıtlama nedeniyle var: **veri taşımak, mesafeyle orantılı enerji tüketir**. 1 mm uzaktaki bir SRAM hücresinden bir bit okumak yaklaşık **0,05 pJ** maliyetlidir. DDR5 arayüzü üzerinden 20 mm uzaktaki DRAM'den almak kabaca **15-20 pJ** — 300-400 kat artış. Ethernet üzerinden farklı bir sunucuya ulaşmak bit başına **1.000-10.000 pJ** tüketir.

Bu enerji-mesafe ilişkisi, mimarların **bant genişliği duvarı** dediği şeyi yaratır: her zaman daha fazla hesaplama inşa edebilirsiniz (transistörler küçülmeye devam ediyor), ama bu hesaplamayı veriyle beslemenin enerji maliyeti aynı şekilde ölçeklenmiyor. Modern bir veri merkezi toplam enerjisinin yaklaşık **%40-60'ını** yalnızca *veri taşımaya* harcar — hesaplamaya değil, yalnızca baytları olduğu yerden ihtiyaç duyulan yere taşımaya.

Bu nedenle 2020'lerin her büyük mimari trendi aslında kılık değiştirmiş bir bellek hikâyesidir:

- **Yongacıklar ve 2,5D paketleme** (13. Gün): Hesaplama ve belleği bir silikon ara yüzey üzerinde birbirine yaklaştırmak veri taşıma enerjisini 5-10× azaltır
- **Bellek içi hesaplama**: Mythic, Syntiant gibi şirketler ve IBM'deki araştırma laboratuvarları, belirli iş yükleri için veri taşımayı tamamen ortadan kaldırarak bellek dizisinin *içinde* hesaplama yapmayı araştırıyor
- **Bellekte İşleme (PIM)**: Samsung'un HBM-PIM'i ve SK Hynix'in AiM'i, HBM yığınındaki her DRAM kalıbına hesaplama birimleri ekliyor
- **CXL (Compute Express Link)**: Birden fazla cihaz arasında birleşik bir bellek havuzu oluşturarak bellek ayrıştırmasına olanak tanıyan yeni bir ara bağlantı standardı

### Bellek Erişiminin Şaşırtıcı Matematiği

İşte modern hesaplamayı tanımlayan sezgiye aykırı gerçek: modern bir işlemcide DRAM'e tek bir **önbellek ıskalaması**, kabaca **200-500 basit aritmetik işlemi** yürütmeye yetecek kadar enerji ve zaman harcar. Bu, birçok gerçek dünya iş yükü için — veritabanları, grafik analizi, seyrek sinir ağları — *algoritmanın bellek erişim deseninin* hesaplama karmaşıklığından daha önemli olduğu anlamına gelir.

Belleğe önbellek dostu sırayla erişen mükemmel optimize edilmiş bir matris çarpması, önbelleği döven naif bir uygulamadan **10-100 kat daha hızlı** çalışabilir — her ikisi de tam olarak aynı sayıda aritmetik işlem gerçekleştirmesine rağmen. Bu yüzden yüksek performanslı hesaplama uzmanları **veri yerleşimi** (yapı dizisi vs. dizi yapısı), **döngü bölümleme** (veriyi önbellek boyutlu bloklarda işleme) ve **ön getirme** (işlemciye 100+ döngü sonra ihtiyaç duyacağınız veriyi yüklemeye başlamasını söyleme) konularına takıntılıdır.

NVIDIA bunu herkesten önce anladı. Tüm CUDA programlama modeli (17. Gün) temelde GPU'nun bellek hiyerarşisini yönetmekle ilgilidir — genel bellek erişimlerini birleştirmek, paylaşılan bellek tekrar kullanımını en üst düzeye çıkarmak, yazmaç baskısını yönetilebilir tutmak. En yüksek performansı elde eden GPU programcıları, en zekice aritmetiği yazanlar değil — makineyi en verimli şekilde besleyenlerdir.

## SRAM vs. DRAM vs. HBM: Bir Bakışta Sayılar

Bunu 2025 dönemi sayılarıyla somutlaştıralım:

| | SRAM (L1) | SRAM (L3) | DDR5-5600 | HBM3E |
|---|---|---|---|---|
| **Gecikme** | ~1 ns | ~10-15 ns | ~50-70 ns | ~80-120 ns |
| **Bant genişliği (birim başına)** | ~1-3 TB/s (çip üstü) | ~0,5-1 TB/s | ~45 GB/s (kanal başına) | ~1,2 TB/s (yığın başına) |
| **Kapasite (tipik)** | 32-80 KB | 16-144 MB | 16-64 GB (DIMM başına) | 24-36 GB (yığın başına) |
| **GB başına maliyet** | ~10.000-50.000$ | ~100-500$ | ~2-4$ | ~10-15$ |
| **Bit başına enerji** | ~0,05 pJ | ~1-5 pJ | ~15-20 pJ | ~5-7 pJ |
| **Bit başına transistör** | 6 | 6 | 1 + 1C | 1 + 1C |

Desene dikkat edin: hiyerarşinin her basamağında kabaca **10 kat gecikme karşılığında 100-1.000 kat kapasite** değiş tokuş edilir. Bu tesadüf değildir — hız (yakınlık ve daha fazla transistör gerektirir) ile yoğunluk (bit başına minimum alan gerektirir) arasındaki temel ödünleşimin yansımasıdır.

## Gelecek: DRAM Kapasitöründen Sonra Ne Gelecek?

DRAM ölçeklenmesi temel sınırlara yaklaşıyor. Kapasitör en-boy oranı sorunu aşırılaşıyor — genişliğinden 60-70 kat daha uzun, atomik hassasiyetle silikona oyulmuş bir tüp hayal edin. Kapasitör dielektriği, yapı küçüldükçe kapasitansı korumak için her biri daha yüksek geçirgenlik sunan silikon oksitinden hafnyum oksite, oradan zirkonyum oksit alaşımlarına evrildi.

Birkaç aday, geleneksel DRAM'i tamamlamak veya değiştirmek için yarışıyor:

- **MRAM (Manyetik Dirençli RAM)**: Manyetik tünel eklemi kullanır. Uçucu olmayan, hızlı (~10 ns), ama sınırlı yoğunluk. Bazı SoC'lerde gömülü bellek olarak zaten kullanılıyor.
- **RRAM/ReRAM (Dirençli RAM)**: İletken filamanlar oluşturarak/çözerek direnci değiştirir. İyi yoğunluk, ama dayanıklılık (yazma döngüsü sayısı) hâlâ DRAM'in 10-100× altında.
- **IGZO tabanlı DRAM**: Dramatik olarak düşük kaçak akımlı indiyum-galyum-çinko-oksit transistörleri kullanır, potansiyel olarak yenileme sorununu ortadan kaldırır. Samsung bunu araştırma düzeyinde gösterdi.

Bunların hiçbiri büyük ölçekte DRAM'in yerini almaya yakın değil. Mevcut teknolojinin üretim altyapısındaki avantajı devasa — dünya, 1T-1C hücresi için optimize edilmiş DRAM fabrikalarına yüz milyarlarca dolar yatırmış durumda. Herhangi bir alternatifin, bu altyapıyı yeniden inşa etmeyi haklı kılmak için kademeli olarak değil, dramatik olarak daha iyi olması gerekiyor.

## Yarının Ön İzlemesi

İşlemciyi belleğin nasıl beslediğini ve bant genişliğinin her şeyi nasıl kısıtladığını gördük. Ama bant genişliği duvarını varoluşsal bir tasarım kısıtlamasına dönüştüren yeni bir çip sınıfı var: **yapay zekâ hızlandırıcıları**. Yarın **TPU'lar, NPU'lar ve neden matris çarpması tek ihtiyacınız** konusunu keşfedeceğiz — Google, Apple ve bir dalga halinde girişimlerin, modern yapay zekâya hâkim olan tek işlem için özel olarak tasarlanmış çipleri nasıl tasarladığını ve az önce öğrendiğimiz bellek hiyerarşisinin tasarımlarındaki en önemli faktör olmasının nedenini.

---

<div style="text-align: center; margin: 2em 0;">

<div class="quiz-placeholder" data-quiz-path="quizzes/gun-18.toml"></div>

</div>
