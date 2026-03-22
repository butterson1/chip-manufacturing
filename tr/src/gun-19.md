# Gün 19: Yapay Zekâ Hızlandırıcıları — TPU'lar, NPU'lar ve Neden Matris Çarpması Tek İhtiyacınız

*Yapay zekâdaki her atılım nihayetinde absürt derecede basit tek bir işleme indirgenir: matrisleri çarpmak. Bunu en iyi yapan çipler tüm yarı iletken endüstrisini yeniden şekillendiriyor.*

---

## Çarpma-Toplamanın Akıl Almaz Etkinliği

2012'de Alex Krizhevsky, AlexNet'i iki NVIDIA GTX 580 GPU üzerinde eğitti — tanesi yaklaşık 500$ olan tüketici grafik kartları. Beş gün sürdü ve ImageNet yarışmasını, makine öğrenmesi topluluğunu şok eden bir farkla kazandı. 2024'e hızlı ileri sarın; bir öncü büyük dil modelini eğitmek, 3-4 ay boyunca çalışan 16.000 ila 32.000 NVIDIA H100 GPU ve yalnızca hesaplama için tahminen 100-200 milyon dolar maliyet gerektiriyor. Yapay zekânın hesaplama talepleri 2012'den bu yana kabaca **yılda 4 kat** artıyor — Moore Yasasını ağırdan alan bir tempo.

Dikkat çekici olan şu: modern yapay zekâ modellerinin baş döndürücü karmaşıklığına rağmen — yüz milyarlarca parametreli dönüştürücüler, dikkat mekanizmaları, katman normalizasyonu, aktivasyon fonksiyonları — gerçek hesaplama ezici çoğunlukla tek bir işleme indirgeniyor: **çarpma-toplama (MAC)**. İki sayı al, çarp, çalışan bir toplama ekle. Hepsi bu. GPT-4 sınıfı bir model üzerinden tek bir ileri geçiş kabaca 1,8 trilyon bu işlemi gerçekleştirir. Eğitim, bunu binlerce milyar kez tekrarlamayı, her yinelemede ağırlıkları hafifçe ayarlamayı içerir.

Nedeni doğrusal cebirdir. Bir sinir ağı katmanı temelde bir matris çarpmasıdır: bir girdi vektörü al, bir ağırlık matrisiyle çarp, doğrusal olmayan bir fonksiyon uygula. Dönüştürücülerdeki dikkat mekanizması? Üç matris çarpması (sorgular × anahtarlar, ardından puanlar × değerler) artı bir softmax. Evrişimler? im2col dönüşümü kullanılarak matris çarpımlarına yeniden yapılandırılabilir. Kavramsal karmaşıklığı soyduğunuzda, bir yapay zekâ hızlandırıcısının iş tanımı güzelce basittir: **devasa matrisleri fiziğin izin verdiği kadar hızlı çarp ve veriyi fiziğin izin verdiği kadar verimli taşı**.

Bu farkındalık — yapay zekânın temel işleminin genel amaçlı hesaplamadan temelden farklı olduğu — tamamen yeni bir silikon kategorisi doğurdu. GPU'lar oraya tesadüfen ilk ulaştı, ama amaca yönelik inşa edilmiş **yapay zekâ hızlandırıcıları** artık dünyadaki en kritik çipler.

## Google'ın TPU'su: Özel Silikonun Kazandığını Kanıtlayan Çip

2013'te Google mühendisleri korkutucu bir projeksiyon hesapladı: her Android kullanıcısı günde yalnızca üç dakika sesli arama kullansa, Google'ın konuşma tanıma sinir ağlarını çalıştırmak için **tüm veri merkezi hesaplama kapasitesini ikiye katlaması** gerekecekti. O kadar CPU satın almak ekonomik olarak imkânsızdı. GPU'lar henüz veri merkezlerinde çıkarım için uygun değildi. Bu yüzden Google o dönemde cesurca görünen bir şey yaptı — kendi çipini tasarlamaya karar verdiler.

Sonuç, 2015'te dahili olarak devreye alınan ve 2016'da kamuoyuna duyurulan **Tensör İşleme Birimi (TPU)** oldu. TPU v1 saf bir çıkarım hızlandırıcısıydı ve tasarım felsefesi sadeliğindeki radikallikle dikkat çekiyordu: bir çipin matris çarpması olmayan her şeyini soyun ve tüm kalıbı MAC işlemlerini mümkün olduğunca yoğun yapmaya adayın.

TPU v1'in kalbi bir **sistolik dizi** — 256 × 256'lık bir çarpma-toplama birimi ızgarasıydı. "Sistolik" ismi kalpten gelir: veri, tıpkı damarlardan akan kan gibi diziden ritmik olarak geçer. Sistolik bir dizide her işlem elemanı komşularından veri alır, bir MAC işlemi yapar ve sonuçları iletir. Hiçbir elemanın merkezi bir bellekten veri getirmesi gerekmez; veri yapı boyunca akar. Bu, genel amaçlı işlemcileri köstekleyen bellek erişim giderini ortadan kaldırır ve olağanüstü hesaplama yoğunluğu sağlar.

Bu 256 × 256 dizi her saat döngüsünde 65.536 MAC işlemi gerçekleştiriyordu. 700 MHz'de TPU v1, 8-bit tam sayı matematiği için **92 TOPS** (saniyede trilyon işlem) sunuyordu — yalnızca 40 watt tüketerek. Karşılaştırma olarak, çağdaş bir Intel Haswell CPU benzer güçte kabaca 2,6 TOPS elde ediyordu. TPU, sinir ağı çıkarımı için watt başına 35 kat daha performanslıydı.

Temel mimari kavrayış **düşürülmüş hassasiyetti**. Sinir ağları, bilimsel hesaplamanın aksine, sayısal belirsizliğe dikkat çekici derecede toleranslıdır. TPU v1, CPU'nun 32-bit veya 64-bit kayan nokta dayattığı yerde 8-bit tam sayılarla çalışıyordu. Çarpıcı alan ve güç kabaca bit genişliğinin **karesi** ile ölçeklendiğinden, 8-bit bir çarpıcı 32-bit olandan yaklaşık 16 kat daha küçük ve verimlidir. Google özünde sinir ağlarının ihtiyaç duymadığı hassasiyeti, umutsuzca ihtiyaç duydukları verimle takas ediyordu.

### TPU Evrimi

Her TPU nesli sistolik dizi konseptini ölçeklendirirken yetenekler eklemiştir:

- **TPU v2** (2017): Yalnızca çıkarım değil, eğitim için de kayan nokta desteği (bfloat16) ekledi. Çip başına iki 128 × 128 sistolik dizi, 45 TFLOPS, 16 GB HBM. 17,5 TB/s bölme bant genişliği sunan özel 2D torus ara bağlantısıyla 64 çiplik "bölmelerde" ilk kez konuşlandırıldı.
- **TPU v3** (2018): 123 TFLOPS, sıvı soğutmalı (Google'ın ilk sıvı soğutmalı veri merkezi donanımı), 32 GB HBM2. Bölmeler 1.024 çipe ölçeklendi.
- **TPU v4** (2022): 275 TFLOPS bfloat16, 32 GB HBM2e. Süper bilgisayar tasarımından ödünç alınmış bir topoloji olan **3D torus** optik ara bağlantısıyla bağlanan 4.096 çiplik bölmeler. Tek bir v4 bölmesi 1,1 exaflops'un üzerinde sunar.
- **TPU v5e** (2023): Çıkarım verimliliği için optimize edilmiş, 393 TOPS INT8, LLM sunumundaki patlamaya yönelik tasarlanmış.
- **TPU v6e (Trillium)** (2024): v5e'ye göre 4,7× çıkarım iyileştirmesi, %67 enerji verimliliği kazanımı.

Google'ın yaklaşımını mimari olarak önemli kılan sadece ham sayılar değil — **donanım ve ara bağlantının birlikte tasarımıdır**. Tek bir TPU hızlıdır; herhangi bir çipin sınırlı sayıda atlamada diğeriyle iletişim kurabildiği 3D torus'ta bağlanan 4.096 TPU temelden farklı bir canavardır. Büyük modelleri eğitmek, onları yüzlerce veya binlerce çipe bölmeyi (model paralelliği, veri paralelliği, boru hattı paralelliği) gerektirir ve ara bağlantı, zamanın ne kadarının hesaplamaya karşı diğer çipleri beklemeye harcandığını belirler. Google'ın özel ICI'si (Çipler Arası Ara Bağlantı) v5p'de çip başına ~4.800 Gbps sunar, InfiniBand'in GPU sunucuları arasında sunduğunu cüceleştirir.

## NVIDIA'nın Hakimiyeti: CUDA Hendeği Derinleşiyor

Google dahili kullanım için TPU'lar inşa ederken, NVIDIA bir oyun şirketinden dünyanın en değerli yarı iletken firmasına dönüştü — **GPU'ların zaten yapay zekâ hızlandırıcıları olduğunu** fark ederek — sadece birkaç hedefli eklemeye ihtiyaçları vardı.

Dönüm noktası olan donanım yeniliği, 2017'de Volta mimarisiyle (V100) tanıtılan **tensör çekirdeğiydi**. Standart bir CUDA çekirdeği döngü başına bir kayan nokta çarpma-toplama gerçekleştirir. Bir tensör çekirdeği tek bir döngüde tam bir **4×4×4 matris çarpma-toplama** — aynı anda 64 MAC işlemi — gerçekleştirir. H100 (Hopper mimarisi, 2022) **16×16×16** MMA işlemleri yürütebilen 528 tensör çekirdeği içerir, FP16 için 990 TFLOPS ve FP8 için neredeyse 2.000 TFLOPS sunar. İki kalıplı tasarımında 208 milyar transistör barındıran B200 (Blackwell, 2024) 2.250 TFLOPS FP16 ve 4.500 TFLOPS FP8'e çıkar.

Ama NVIDIA'nın gerçek avantajı silikon değil — yazılımdır. 2006'daki lansmanından bu yana 18 yıl boyunca inşa edilen **CUDA ekosistemi**, optimize edilmiş kütüphaneler, çerçeveler ve kurumsal bilgi birikiminin milyonlarca kişi-saatini temsil eder. cuBLAS (doğrusal cebir), cuDNN (sinir ağı temel öğeleri), NCCL (çoklu GPU iletişimi) ve TensorRT (çıkarım optimizasyonu) gibi kütüphaneler, bir yapay zekâ araştırmacısının standart PyTorch kodu yazıp donanım kullanımının %80-90'ına ulaşabilmesi anlamına gelir. Herhangi bir rakip platformda aynı düzeye ulaşmak aylarca uzmanlaşmış optimizasyon gerektirir.

Bu "CUDA hendeği"dir — ve herhangi bir mimari avantajdan daha geniştir. AMD'nin MI300X'i rekabetçi ham spesifikasyonlar sunar (192 GB HBM3, 5,3 TB/s bant genişliği), ama AMD'nin ROCm yazılım yığını olgunluk, operatör kapsamı ve hata ayıklama araçlarında hâlâ CUDA'nın gerisindedir. Intel'in Gaudi hızlandırıcıları benzer nedenlerle çekiş kazanmakta zorlandı. Ders açıktır: yapay zekâ donanımında **yazılım silikonu yutar**.

### Dönüştürücü Motoru: Donanım-Yazılım Ortak Tasarımı

H100, modern yapay zekâ hızlandırıcılarının donanım ve algoritmaları ne kadar sıkı birlikte tasarladığını gösteren **Dönüştürücü Motorunu** tanıttı. Dönüştürücü Motoru, eğitim sırasında **katman bazında, tensör bazında** FP8 ve FP16 hassasiyeti arasında dinamik olarak geçiş yapar. Tensör değerlerinin istatistiksel dağılımını gerçek zamanlı olarak izler ve doğruluğu koruyan en düşük hassasiyeti seçerek, FP8'i tolere edebilen katmanlar için verimi ikiye katlarken dikkat puanı hesaplama gibi hassas işlemler için FP16'yı korur.

Bu işe yarar çünkü sinir ağının farklı kısımlarının farklı sayısal gereksinimleri vardır. Doğrusal katmanlardaki ağırlık matrisleri genellikle FP8'e (yalnızca 4-5 bit mantis) rahatça sığan dar değer dağılımlarına sahiptir. Ama softmax çıktıları ve artık akış değerleri FP16 gerektiren geniş dinamik aralıklara sahip olabilir. Dönüştürücü Motoru bu kararı donanımda, otomatik olarak, programcı müdahalesi olmadan verir. Hızlandırıcı felsefesinin mükemmel bir örneğidir: iş yükünün matematiksel özelliklerini anlayın, sonra bunları kullanan silikon inşa edin.

## NPU'lar: Cebinizdeki Yapay Zekâ

TPU'lar ve GPU'lar veri merkezinde savaşırken, bugün satılan her akıllı telefon, dizüstü bilgisayar ve tablette daha sessiz bir devrim yaşanıyor: **Sinir Ağı İşleme Birimi (NPU)**.

Apple'ın A11 Bionic'i (2017), özel bir sinir motoru içeren ilk akıllı telefon SoC'siydi — saniyede 600 milyar işlem kapasiteli 2 çekirdekli bir birim. A17 Pro'ya (2023) gelindiğinde bu, 35 TOPS sunan 16 çekirdekli bir sinir motoruna büyüdü. 2024 iPad Pro'daki M4 çipi 38 TOPS'luk 16 çekirdekli bir NPU barındırıyor. Qualcomm'un Snapdragon 8 Elite'i (2024) Hexagon NPU'sundan 75 TOPS'a ulaşıyor. Intel'in Lunar Lake dizüstü işlemcileri 48 TOPS değerinde bir NPU içeriyor — Microsoft'un "Copilot+" sertifikasını almaya yetecek kadar.

NPU'lar veri merkezi hızlandırıcılarından mimari olarak daha basittir ama aynı temel ilkeyi paylaşır: düşük hassasiyetli veriler (INT8 veya INT4) üzerinde çalışan MAC birimi dizileri ve harici bellek erişimini en aza indirmek için tasarlanmış özelleşmiş çip üstü SRAM tamponları. Apple'ın sinir motoru, örneğin, her çekirdeğin özel matris çarpma donanımı, aktivasyon fonksiyonu birimleri ve havuzlama motoru içerdiği **16 çekirdekli bir tasarım** kullanır — evrişim ve dönüştürücü çıkarımı için gereken tam işlemler, başka hiçbir şey olmadan.

NPU'lar üzerindeki güç kısıtlamaları şiddetlidir. Bir veri merkezi GPU'su 700 watt yakabilir (B200'ün TDP'si). Bir akıllı telefon NPU'su kabaca **1-5 watt** bütçe alır — ve bunu CPU, GPU, ekran ve hücresel modemle paylaşmak zorundadır. Miliwatt ölçeğinde anlamlı yapay zekâ çıkarımı elde etmek agresif niceleme (birçok telefon modeli 4-bit hassasiyette çalışır), agresif bellek sıkıştırma ve **seyreklik kullanımı** — bir operandın sıfır olduğu çarpmaları atlama, sinir ağlarında şaşırtıcı derecede yaygın (ReLU tabanlı ağlarda aktivasyonların %30-90'ı sıfırdır) — gerektirir.

### Cihaz Üstü Yapay Zekâ Anı

Neden telefonlara yapay zekâ donanımı koyuyoruz? Üç neden: **gecikme, gizlilik ve maliyet**.

Tek bir LLM sorgusu için bulut çıkarımı 0,01-0,10$ maliyetlidir ve ağ üzerinden gidiş-dönüş (50-200 ms) gerektirir. Cihaz üstü çıkarım sorgu başına ücretsizdir ve tek haneli milisaniyelerde gerçekleşir. Yüz algılama (her kamera karesi), ses etkinlik algılama (sürekli mikrofon izleme) veya gerçek zamanlı dil çevirisi gibi her zaman açık özellikler için veriyi buluta göndermek ya çok yavaş, ya çok pahalı ya da gizlilik açısından çok istilacıdır.

Apple'ın cihaz üstü yapay zekâ stratejisi mimari olarak aydınlatıcıdır: Face ID boru hattının tamamı (yüz algılama, derinlik haritası işleme, sinir ağı eşleştirme) yalnızca sinir motoru ve güvenli yerleşim alanında çalışır, biyometrik veriler **cihazdan asla ayrılmaz**. Google'ın Pixel telefonları konuşma tanıma, arama tarama ve canlı çeviriyi tamamen cihaz üstünde, Google'ın tasarladığı TPU türevi yapay zekâ çekirdeği içeren özel Tensor SoC'u (Samsung ile tasarlanmış) kullanarak çalıştırır. Samsung'un Galaxy AI özellikleri cihaz üstü INT4 modelleri ve bulut tabanlı daha büyük modellerin bir karışımını çalıştırır; telefonun NPU'su en gecikmeye duyarlı görevleri üstlenir.

Yörünge nettir: her bilgisayar aygıtı özel yapay zekâ silikonuna sahip olacak. Küresel NPU pazarının 2028'e kadar %20'nin üzerinde CAGR ile büyüyerek 40 milyar doları aşacağı öngörülüyor. Yalnızca CPU hesaplamasından CPU+GPU'ya geçiş kadar temel bir dönüşümün erken dönemindeyiz.

## Hassasiyet Devrimi: Ne Kadar Düşebilirsiniz?

Yapay zekâ donanımının en sezgiye aykırı yönlerinden biri, **daha düşük sayısal hassasiyete** yönelik aralıksız baskıdır. Geleneksel hesaplamada daha fazla hassasiyet her zaman daha iyidir — gönüllü olarak daha az ondalık basamakla hesaplama yapmazsınız. Yapay zekâda daha düşük hassasiyet genellikle aynı derecede iyi çalışır ve muazzam verimlilik kazanımları sağlar.

Yapay zekâ hesaplamasındaki hassasiyet hiyerarşisi şöyle görünür:

| Biçim | Bit | Mantis Bitleri | Aralık | Tipik Kullanım |
|--------|------|---------------|-------|-------------|
| FP32 | 32 | 23 | ±3,4×10³⁸ | Bilimsel hesaplama, referans eğitim |
| TF32 | 19 | 10 | ±3,4×10³⁸ | Eğitim (NVIDIA A100+, FP32 yerine doğrudan) |
| BF16 | 16 | 7 | ±3,4×10³⁸ | Standart eğitim hassasiyeti |
| FP16 | 16 | 10 | ±65.504 | Eğitim ve çıkarım |
| FP8 (E4M3) | 8 | 3 | ±448 | Eğitim ileri geçişi |
| FP8 (E5M2) | 8 | 2 | ±57.344 | Eğitim geri geçişi (gradyanlar aralık gerektirir) |
| INT8 | 8 | — | -128 ila 127 | Çıkarım niceleme |
| INT4 | 4 | — | -8 ila 7 | Uç/mobil çıkarım |

Dikkat çekici bir şeye dikkat edin: Google Brain tarafından özellikle yapay zekâ eğitimi için icat edilen **bfloat16** (BF16), FP32'nin üs aralığını (8 bit üs) korur ama mantisi 7 bite düşürür. Bu, IEEE 754'ün FP16'sının yaptığının (5 bit üs, 10 bit mantis) tam tersidir. Google'ın kavrayışı, sinir ağlarının **hassasiyetten** (tam ondalık gösterim) çok **dinamik aralığa** (taşma veya alt taşma olmaması) önem vermesiydi. Bu tek tasarım kararı, karma hassasiyetli eğitimi pratik hale getirdi ve artık endüstri genelinde varsayılan eğitim biçimidir.

Bugünkü en aşırı üretim niceleme **GPTQ/AWQ 4-bit** — bir modelin ağırlıklarını minimal kalite kaybıyla 16 bitten 4 bite sıkıştırma. Bu, 4 GB kullanılabilir belleğe sahip bir akıllı telefonda 7 milyar parametreli bir dil modelini çalıştırmayı mümkün kılar. Hesap basittir: 7 milyar parametre × 2 bayt (FP16) = 14 GB; 7 milyar parametre × 0,5 bayt (INT4) = 3,5 GB. Niceleme, imkânsızı kelimenin tam anlamıyla uç cihazlarda mümkün kılar.

Donanım bu biçimleri doğal olarak desteklemeye yarışıyor. NVIDIA'nın Blackwell mimarisi tensör çekirdeklerinde FP4'ü (4-bit kayan nokta) destekleyerek çıkarım için FP8'e göre 2 kat verim vaat ediyor. Qualcomm'un NPU'ları karma INT4/INT8 yürütmeyi destekliyor. Eğilim tartışmasız: **hassasiyetin her yarılanması kabaca verimi ikiye katlar ve bellek bant genişliği** gereksinimlerini yarıya indirir, ve yapay zekâ algoritma topluluğu daha düşük hassasiyetin işe yaramasını sağlamanın yollarını bulmaya devam ediyor.

## Bellek Bant Genişliği Krizi

Dünkü bellek hiyerarşisi dersini içselleştirdiyseniz, yapay zekâ hızlandırıcıları için temel sorunu zaten görüyorsunuz: **aritmetik ucuz; veri taşımak pahalı**.

H100 GPU'yu düşünün: 990 TFLOPS FP16 hesaplama, 3,35 TB/s HBM3 bant genişliği. Tüm bu tensör çekirdeklerini meşgul tutmak için, HBM'den alınan her bayt verinin bir sonraki bayt gelmeden önce kabaca 300 kayan nokta işleminde kullanılması gerekir. Bu oran — **hesaplama yoğunluğunun** **bellek bant genişliğine** bölünmesi, bayt başına FLOP olarak ölçülür — **aritmetik yoğunluk** olarak adlandırılır ve bir iş yükünün *hesaplama sınırlı* (işleme hızıyla sınırlı) mı yoksa *bellek sınırlı* (veri teslimatıyla sınırlı) mı olduğunu belirler.

Büyük matris çarpımları hesaplama sınırlıdır: iki 4096 × 4096 matrisi çarpmak 137 milyar MAC gerektirir ama yalnızca 134 MB veri — bayt başına ~1.000 FLOP'luk aritmetik yoğunluk. Tensör çekirdekleri beslenmiş ve mutludur.

Ama birçok yapay zekâ işlemi felaket derecesinde bellek sınırlıdır. Uzun diziler için **dönüştürücülerde dikkat**, **eleman bazında işlemler** (aktivasyon fonksiyonları, katman normalizasyonu) ve **otoregresif çözümleme** (her seferinde bir belirteç üretme, belirteç başına tam bir model ileri geçişi gerektiren) düşük aritmetik yoğunluğa sahiptir. LLM çıkarımı sırasında her belirteç üretmek, modelin tüm ağırlık matrisinin — potansiyel olarak yüzlerce gigabayt — okunmasını gerektirir. 175 milyar parametreli FP16 bir model için bu, belirteç başına 350 GB ağırlık okunması demektir. 3,35 TB/s'de saniyede kabaca 9,5 belirteç elde edersiniz. Tensör çekirdekleri zamanın %95'inde boşta oturur, veri bekler.

Bu nedenle **HBM kapasitesi ve bant genişliği**, yapay zekâ çiplerinin birincil satış noktası haline geldi, TFLOPS'tan bile önemli. NVIDIA'nın hisse senedi fiyatının SK Hynix ve Samsung'dan HBM bulunabilirliğini takip etmesinin nedeni budur. B200'ün 8 TB/s HBM3E bant genişliğinin, 4.500 TFLOPS hesaplama gücünden tartışmasız daha önemli olmasının nedeni budur. Ve **Flash Attention** (Tri Dao tarafından Stanford/Princeton'da geliştirilen) gibi zekice algoritmik optimizasyonların — dikkat hesaplamasını HBM'e dokunmadan önce SRAM'deki veri tekrar kullanımını en üst düzeye çıkaracak şekilde yeniden yapılandıran — herhangi bir donanım değişikliği olmadan 2-4 kat hızlanma sağlamasının nedeni budur.

## Rekabet Ortamı: NVIDIA'nın Ötesinde

NVIDIA'nın hakimiyeti (2024'te yapay zekâ eğitim hızlandırıcıları için tahminen %80-95 pazar payı) benzeri görülmemiş bir rekabet dalgasını tetikledi:

**AMD**, NVIDIA'nın en güvenilir rakibidir. MI300X (2023) yongacık mimarisi kullanır — tek bir pakette 12 aktif kalıp (8 HBM3 yığını + 4 hesaplama kalıbı), 192 GB HBM3 ve 5,3 TB/s bant genişliği. Bellek kapasitesinin önemli olduğu büyük model çıkarımı için rekabetçidir. AMD'nin Xilinx'i satın alması (2022, 49 milyar $) ve büyüyen ROCm ekosistemi yatırımı ciddi kararlılığın sinyalini verir.

**Intel'in** Gaudi 3'ü (2024) fiyat-performansı hedefler, genellikle eşdeğer NVIDIA parçalarının maliyetinin %60-70'inde sunulur. Intel'in stratejisi açık Ethernet tabanlı ara bağlantısına (NVIDIA'nın tescilli NVLink kilitlenmesinden kaçınarak) ve Habana Labs'ın derleyici yığınına dayanır. Pazar benimsenmesi mütevazı olmuştur.

**Hiper ölçekleyicilerden özel silikon** yapısal bir değişimi temsil eder. Google'ın TPU'larının ötesinde, Amazon'un **Trainium 2**'si (2024) Trainium 1'in 2 katı hesaplama gücü ve 64 çipi bağlayan UltraServer konfigürasyonlarıyla AWS yapay zekâ hizmetlerini güçlendirir. Microsoft ilk özel yapay zekâ çipi **Maia 100**'ü geliştiriyor, TSMC'nin N5'inde üretiliyor. Meta'nın geliştirme aşamasında özel çıkarım çipleri olduğu bildiriliyor. Bu hiper ölçekleyiciler toplu olarak tüm yapay zekâ çip alımlarının %50-60'ını oluşturuyor; kendi ürettikleri her çip, NVIDIA'dan satın almadıkları bir çiptir.

**Girişimler** sermaye yoğunluğuna rağmen milyarlarca dolar çekmeye devam ediyor. Cerebras dünyanın en büyük çipini inşa etti — WSE-3 (2024), 46.225 mm²'lik wafer ölçeğinde tam bir kalıp, 4 trilyon transistör, 900.000 yapay zekâ için optimize edilmiş çekirdek ve 44 GB çip üstü SRAM (HBM darboğazını tamamen ortadan kaldıran). Groq'un LPU'su (Dil İşleme Birimi) hiç HBM olmadan deterministik veri akışı mimarisi kullanarak orta boy modeller için olağanüstü çıkarım verimi elde eder. SambaNova, Graphcore (SoftBank tarafından satın alındı) ve Tenstorrent (efsanevi CPU mimarı Jim Keller liderliğinde) farklı mimari bahisleri temsil eder.

## Şaşırtıcı Bir Gerçek: Yazılım Donanımdan Daha Önemli

İşte bu alanın tamamını tanımlayan sezgiye aykırı gerçek: **çoğu yapay zekâ iş yükü donanımın en yüksek kullanımının %30-50'sinde çalışır**. Bir spesifikasyon sayfasındaki teorik TFLOPS ile üretimde gerçekte elde edilen TFLOPS arasındaki boşluk muazzamdır — ve neredeyse tamamen bir yazılım problemidir.

Tek bir GPU'da bir matris çarpmasını en yüksek performansın %85-90'ında çalıştırmak çözülmüş bir problemdir (cuBLAS yapar). Ama gerçek eğitim, toplu iletişim (all-reduce, all-gather), boru hattı baloncuk gideri, bellek parçalanması ve yük dengesizliğinin potansiyel hesaplamanın %50-70'ini boşa harcamak için komplo kurduğu binlerce GPU içerir. Meta, Llama 3 405B'yi 16.384 H100 GPU'da eğitirken kabaca %38-43 model FLOP kullanımı (MFU) elde ettiğini bildirdi. Google'ın PaLM eğitimi 6.144 TPU v4'te %46-57 MFU elde etti; ara bağlantı avantajları daha yüksek sayıyı kısmen açıklıyor.

Bu, yazılım verimliliğinizi ikiye katlamanın — daha iyi paralellik stratejileri, daha akıllı iletişim zamanlaması veya derleyici optimizasyonları yoluyla — donanımınızı ikiye katlamaktan daha değerli olabileceği anlamına gelir. NVIDIA'nın derleyici ekibinin ve CUDA kütüphanelerinin tartışmasız donanım tasarım ekibinden daha değerli olmasının ve her ciddi yapay zekâ laboratuvarının artık tek işi mevcut silikondan daha fazla yararlı iş çıkarmak olan "sistem" araştırmacı ekipleri istihdam etmesinin nedeni budur.

---

## Sırada Ne Var

Yarın **RISC-V**'i keşfedeceğiz — ARM ve x86'nın on yıllardır süren duopolüne meydan okuyan açık kaynaklı komut seti mimarisi. UC Berkeley'de bir öğretim projesi olarak doğan RISC-V, ARM'ın mobil dünyaya geçişinden bu yana hesaplamadaki en önemli mimari hareket haline geldi. Ücretsiz, genişletilebilir bir ISA'nın mikrodenetleyicilerden yapay zekâ hızlandırıcılarına kadar her şeyi nasıl yeniden şekillendirdiğini — ve yerleşiklerin neden tedirgin olduğunu — göreceğiz.

---

<div class="quiz-placeholder" data-quiz-path="quizzes/gun-19.toml" data-quiz-day="19"></div>
