# Gün 17: GPU Mimarisi — Neden Binlerce Zayıf Çekirdek Birkaç Güçlü Çekirdeği Yener

*Pikseller için inşa edilen çip, tesadüfen yapay zekânın motoru oldu.*

---

Dün CPU'yu inceledik — geleceği tahmin eden dal tahmin edicileri, yüzlerce uçuştaki komutu idare eden yeniden sıralama tamponları ve bellek duvarını örtbas eden önbellekleriyle seri yürütmenin bir harikası. Modern bir CPU çekirdeği, belki de şimdiye kadar inşa edilmiş en gelişmiş sıralı muhakeme makinesidir. Üzerine ne atarsanız atın, hızlıca halledebilir.

Ama mesele şu: evren her zaman muhakemeye ihtiyaç duymaz. Bazen kaba kuvvet gerekir. Saniyede 60 kez 8,3 milyon pikseli gölgelendirirken veya bir sinir ağını eğitmek için iki 16.384×16.384 matrisi çarparken, her işlem üzerinde derinlemesine düşünen bir dahi çekirdeğe ihtiyacınız yoktur. Bir ordulara ihtiyacınız vardır. Küçük, basit, itaatkâr çekirdeklerden oluşan bir ordu — binlercesi — hepsi farklı veriler üzerinde aynı şeyi yapan, adım adım.

Bu bir GPU'dur. Ve ekrana üçgenler çizmeyi amaçlayan bir çipin dünyadaki stratejik olarak en önemli silikon parçası haline gelmesinin hikâyesi, teknoloji tarihinin en büyük tesadüflerinden biridir.

## Her Şeyi Başlatan Piksel Problemi

1990'ların başında 3D grafikler PC'lere geliyordu ve matematik acımasızdı. *Quake*'in (1996) tek bir karesini oluşturmak için CPU'nun yapması gerekenler: 3D tepe koordinatlarını matrislerle dönüştürmek, çokgenleri görünüm kesik konisine göre kırpmak, üçgenleri piksellere dönüştürmek, her pikselde aydınlatma hesaplamak, doku örneklemek, sonuçları karıştırmak ve çerçeve tamponuna yazmak. 640×480 çözünürlükte 30 fps için bu, her biri 10-50 kayan nokta işlemi gerektiren saniyede yaklaşık 9,2 milyon piksel demekti. Pentium Pro iyi bir günde belki 200 MFLOPS yapabiliyordu. Matematik tutmuyordu.

Çözüm, geriye dönüp bakıldığında açıktı: yalnızca bu matematiği yapan, yoğun paralellikte özelleşmiş donanım inşa edin. 1999'da NVIDIA, dünyanın ilk "GPU"su — *grafik işleme birimi* — olarak cesurca pazarladıkları GeForce 256'yı çıkardı. Saniyede 15 milyon tepe noktasını dönüştürüp aydınlatabilir ve saniyede 480 milyon pikseli doldurabiliyordu; CPU'yu oyun mantığıyla ilgilenmeye serbest bırakırken GPU geometri ve pikselleri çiğniyordu.

Ama GeForce 256 sabit işlevliydi. Transistörleri belirli grafik işlemleri için kalıcı olarak bağlanmıştı. Bir ekmek kızartma makinasından kahve yapmasını isteyemeyeceğiniz gibi, ondan genel amaçlı matematik yapmasını da isteyemezdiniz. Devrim, GPU'lar *programlanabilir* hale geldiğinde geldi.

## Sabit Borulardan Programlanabilir Gölgelendiricilere

Dönüm noktası 2001'di. NVIDIA'nın GeForce 3'ü, programlanabilir tepe noktası ve piksel gölgelendiricilerini tanıttı — her tepe noktası veya piksel üzerinde çalışan küçük programlar. Başlangıçta bu programlar gülünç derecede sınırlıydı: DirectX 8'de piksel gölgelendiricileri için en fazla 12 komut. Ama oyun geliştiricileri aralıksız optimize edicilerdir ve daha fazlası için baskı yaptılar. 2004'e gelindiğinde gölgelendirici programları yüzlerce komut uzunluğunda olabiliyor, dallanma ve döngüler içeriyordu.

Sorun, GPU'ların tepe noktası gölgelendiricileri ve piksel gölgelendiricileri için ayrı donanıma sahip olmasıydı. Geometri ağırlıklı bir sahne tepe noktası birimlerini doyururken piksel birimleri boşta kalıyor, tam tersi de olabiliyordu. Bu israftı.

2006'da NVIDIA her şeyi değiştiren bir bahse girdi. GeForce 8800 GTX (kod adı G80) ve Tesla mimarisiyle ayrılmış tepe noktası ve piksel birimleri yerine 128 özdeş "akış işlemcisi" (SP) koydular — herhangi bir tür gölgelendirici programını çalıştırabilen. Bu, modern GPU mimarisinin doğumuydu — ve temelde bugün bir NVIDIA H100'ün içindeki aynı fikrin devasa ölçeğe taşınmış hali.

## SIMT Yürütme Modeli: Bir Komut, Otuz İki İş Parçacığı

GPU'ların neden böyle göründüğünü anlamak için temel yürütme modellerini anlamanız gerekir: **Tek Komut, Çoklu İş Parçacığı (SIMT)**.

Bir CPU çekirdeği MIMD'dir — Çoklu Komut, Çoklu Veri. Her çekirdek kendi komut akışını çalıştırır, her döngüde bağımsız kararlar verir. Bu azami esnektir ama azami pahalıdır. Her çekirdeğin kendi getirme birimi, çözücüsü, dal tahmin edicisi, yeniden sıralama tamponu ve zamanlayıcısı gerekir. Apple'ın M4'ünde tek bir performans çekirdeği, *tek bir* komut akışı için kabaca 3-4 milyar transistörlük kontrol mantığı içerir.

GPU tam tersi yaklaşımı benimser. İş parçacıklarını demetler halinde gruplar — NVIDIA bunlara **warp** (32 iş parçacığı), AMD **dalga cephesi** (32 veya 64 iş parçacığı) der. Bir warp'taki her iş parçacığı *aynı anda aynı komutu* yürütür, sadece farklı veriler üzerinde. Bir getirme birimi. Bir çözücü. Bir program sayacı. Gerçek hesabı yapan otuz iki veri yolu.

Şöyle düşünün: bir CPU çekirdeği, tek başına karmaşık bir kanıtlama üzerinde çalışan parlak bir profesördür. Bir GPU warp'ı, 32 askere "yere yatıp yirmi şınav çekin" diyen bir çavuştur — hepsi aynı anda, tartışma yok. Çavuşun gideri minimumdur. Tek bir emir seti 32 yürütücüye hizmet eder.

Bu, GPU'ların bir kalıba bu kadar çok çekirdek sığdırabilmesinin nedenidir. NVIDIA'nın H100'ü 16.896 CUDA çekirdeği içerir, ama bunlar 132 Akış Çoklu İşlemcisi (SM) üzerinde çalışan 528 warp halinde düzenlenmiştir. Kontrol gideri aynı anda 32 iş parçacığı arasında paylaşılır, bu nedenle transistör bütçesi ezici çoğunlukla yürütme birimlerine ve yazmaç dosyalarına gider, tahmin, spekülasyon ve yeniden sıralamaya değil.

Ödünleşim acımasızdır: **bir warp içindeki iş parçacıklarının farklı şeyler yapması gerekiyorsa performans çöker.** Bir warp `if/else` ifadesine geldiğinde ve 16 iş parçacığı sola, 16'sı sağa gittiğinde, GPU her iki yolu da sıralı olarak yürütmek zorundadır; her dalda katılmaması gereken iş parçacıklarını maskeler. Bu **warp sapması**dır ve verimi yarıya veya daha kötüsüne düşürebilir. GPU'lar dallanma yoğun koda kötü değildir — mimari olarak alerjileridir.

## Bir Akış Çoklu İşlemcisinin Anatomisi

NVIDIA'nın Ada Lovelace mimarisinin (RTX 4090) bir SM'sine yakınlaşalım. Her SM şunları içerir:

- **128 CUDA çekirdeği** (FP32) — temel kayan nokta matematik birimleri
- **4 tensör çekirdeği** — özelleşmiş matris çarpma birimleri (bunlara birazdan değineceğiz)
- **1 RT çekirdeği** — ışın-üçgen kesişim donanımı
- **4 warp zamanlayıcısı** — her biri 32 iş parçacıklık bir warp'ı yöneten
- **65.536 × 32-bit yazmaç** — SM başına 256 KB yazmaç dosyası
- **128 KB paylaşılan bellek / L1 önbellek** — ikisi arasında yapılandırılabilir bölüşüm

O yazmaç dosyası sayısı gözünüze çarpmalı. Tek bir SM'de *256 KB yazmaç* var — bu, çoğu CPU'nun L1 önbelleğinden daha fazla yazmaç deposudur. Tam AD102 kalıbı boyunca (RTX 4090'ın içindeki çip) toplam yazmaç dosyası 32 MB'ı aşar. Neden bu kadar çok?

Cevap **gecikme gizlemedir**. CPU, bellek gecikmesini önbellekler ve sıra dışı yürütmeyle gizler — sofistike, transistör aç hileler. GPU, gecikmesini radikal derecede daha basit bir yaklaşımla gizler: **bir warp belleği bekliyorken, başka bir warp'a geç.** Her SM'de aynı anda 48 warp'a kadar ikamet edebilir (1.536 iş parçacığı). Yazmaç durumları *zaten yazmaç dosyasında* — kaydetme/geri yükleme gerekmez. Warp #7 geri dönmesi 400 döngü sürecek bir bellek yüklemesi verdiğinde, zamanlayıcı anında warp #8'e, sonra #9'a geçer ve böyle devam eder. Uçuşta yeterli warp'ınız varsa, bellek gecikmesini sıfır maliyetli bağlam değiştirmeyle tamamen gizleyebilirsiniz.

GPU programlarının iyi çalışması için **yoğun paralelliğe** ihtiyaç duymasının nedeni budur. Yalnızca 32 iş parçacığınız varsa, bir SM'de bir warp doldurursunuz ve GPU zamanının çoğunu boşta geçirir. Tüm SM'leri meşgul tutmak ve tüm warp'ları zamanlayıcılarda döngüye sokmak için on binlerce iş parçacığına ihtiyacınız var.

## Bellek Sistemi: Gecikme Yerine Bant Genişliği

CPU'nun bellek sistemi *gecikme* için optimize edilmiştir — tek bir veri parçasını mümkün olduğunca hızlı almak. Bu yüzden CPU'ların devasa, çok seviyeli önbellek hiyerarşileri vardır. AMD Ryzen 9 9950X'in 80 MB L3 önbelleği (X3D varyantında artı 64 MB 3D V-Cache) tam da ~10ns'de önbellek isabetlerinin ~70ns'deki DRAM erişimlerini yenmesi içindir.

GPU'nun bellek sistemi *bant genişliği* için optimize edilmiştir — bireysel her erişim yavaş olsa bile saniyede mümkün olduğunca çok veri taşımak. RTX 4090'ın pin başına 21 Gbps hızda GDDR6X çalıştıran 384-bit bellek veri yolu, **1.008 GB/s** bellek bant genişliği sunar. NVIDIA'nın H100 SXM'si bunu HBM3 (Yüksek Bant Genişlikli Bellek) ile **3,35 TB/s'ye** taşır — 13. Günde ele aldığımız gibi, binlerce silikon geçiş delikleriyle GPU'ya bir silikon ara yüzey üzerinden bağlanan altı DRAM kalıbı yığını.

Karşılaştırma olarak, üst düzey bir masaüstü CPU çift kanallı DDR5'ten yaklaşık 50-90 GB/s alır. H100, bir Ryzen'dan kabaca **50 kat daha fazla bellek bant genişliğine** sahiptir. Bu küçük bir üstünlük değildir — temelden farklı bir rejimdir.

Bant genişliği neden bu kadar önemli? Çünkü 16.896 çekirdeğin hepsi aynı anda yürütme yaparken, hepsinin veriyle beslenmesi gerekir. Aritmetik yoğunluk — hesaplama işlemlerinin bellek işlemlerine oranı — iş yükünüzün "hesaplama sınırlı" mı yoksa "bellek sınırlı" mı olduğunu belirler. Sinir ağı eğitimi hesaplama sınırlı olma eğilimindedir (yüksek veri tekrar kullanımıyla çok sayıda matris çarpımı) — GPU'lar için mükemmel. Ama çıkarım, özellikle büyük dil modelleri için genellikle bellek sınırlıdır — üretilen her belirteç için milyarlarca ağırlık parametresini okuyorsunuz, bu nedenle HBM bant genişliği doğrudan saniyedeki belirteç sayısına dönüşür.

## Tensör Çekirdekleri: Matris Çarpma Hızlandırıcısı

2017'de NVIDIA, Volta mimarisiyle **tensör çekirdeklerini** tanıttı ve bu tek ekleme, NVIDIA'nın 3 trilyon dolarlık bir şirket haline gelmesinin tartışmasız nedenidir.

Bir tensör çekirdeği tek bir belirli işlem gerçekleştirir: küçük matrisler üzerinde **matris çarpma-toplama**. Hopper'da (H100) her tensör çekirdeği tek bir saat döngüsünde 16×16×16 FP16 matris çarpımı hesaplar. Bu, tensör çekirdeği başına döngü başına 4.096 birleştirilmiş çarpma-toplama işlemi — 8.192 FLOPS — demektir. H100'de 528 tensör çekirdeği vardır ve 1,98 GHz boost saatinde bu kabaca **990 TFLOPS FP16** verim sağlar (seyreklikle birlikte 1.979 TFLOPS olarak duyurulur).

Perspektife koymak gerekirse: aynı H100'deki CUDA çekirdekleri yaklaşık 67 TFLOPS FP32 sunar. Tensör çekirdekleri, yapay zekâ için önemli olan işlemde — matris çarpma — **30 kat daha hızlıdır**. Ve 19. Günde keşfedeceğimiz gibi, derin öğrenmenin temelde her şeyi matris çarpmasına indirgenir.

Tensör çekirdekleri ayrıca doğruluğu hız için takas eden daha düşük hassasiyetli biçimleri destekler: FP8, INT8, hatta Blackwell'de FP4. H100'ün halefi B200, tek bir çipten **2,25 PFLOPS** FP4'e ulaşır — saniyede iki katrilyonun üzerinde işlem. Bu hassasiyet esnekliği, aynı GPU mimarisinin modelleri FP16/BF16'da eğitip ardından çıkarımı INT8 veya FP4'te çalıştırarak aynı donanımdan 2-4 kat daha fazla verim sıkıştırmasının nedenidir.

## GPU Yazılım Yığını: CUDA'nın Aşılmaz Hendeği

Ham donanım gerekli ama yeterli değildir. NVIDIA'nın en güçlü silahı silikon değil — 2007'de G80 ile birlikte piyasaya sürdükleri paralel hesaplama platformu **CUDA**'dır.

CUDA, programcıların GPU kodunu C++'a yakın bir dilde yazmasına olanak tanır. GPU üzerinde yürütülecek bir fonksiyon olan bir **çekirdek** yazarsınız ve **iş parçacığı bloklarından** oluşan bir **ızgarada** kaç iş parçacığı başlatılacağını belirlersiniz. Çalışma zamanı iş parçacığı bloklarını SM'lere eşler. İşte kritik hiyerarşi:

- **İş parçacığı**: bir yürütme birimi, özel yazmaçları ve yerel belleği var
- **Warp**: adım adım yürütülen 32 iş parçacığı (donanım zamanlama birimi)
- **İş parçacığı bloğu**: hızlı çip üstü paylaşılan belleği paylaşabilen ve birbirleriyle senkronize olabilen en fazla 1.024 iş parçacığı
- **Izgara**: bir çekirdek başlatması için tüm iş parçacığı blokları

Bu hiyerarşi doğrudan donanıma eşlenir. İş parçacığı bloğu içindeki paylaşılan bellek, SM'nin paylaşılan belleğine eşlenir (Ada Lovelace'te 128 KB). Blok içi senkronizasyon hızlıdır (donanım engeli, ~20 döngü). Bloklar arası senkronizasyon pahalıdır ve genellikle kaçınılır.

17 yıl boyunca NVIDIA, CUDA etrafında inanılmaz derecede derin bir yazılım ekosistemi inşa etmiştir: sinir ağı temel öğeleri için cuDNN, doğrusal cebir için cuBLAS, çoklu GPU iletişimi için NCCL, çıkarım optimizasyonu için TensorRT, derleyici düzeyinde çekirdek üretimi için Triton. Her büyük makine öğrenmesi çerçevesi — PyTorch, TensorFlow, JAX — CUDA'yı birincil arka ucu olarak kullanır. Araştırmacılar NVIDIA GPU'larını sadece hızlı oldukları için kullanmazlar; tüm yazılım altyapısı CUDA varsaydığı için kullanırlar.

AMD'nin ROCm'u ve Intel'in oneAPI'si teknik olarak yetkin alternatiflerdir. AMD'nin MI300X'i kâğıt üzerinde rekabetçi özelliklere sahiptir — 153 milyar transistör, 192 GB HBM3, 5,3 TB/s bant genişliği. Ama yazılım açığı hâlâ muazzamdır. Bir CUDA kod tabanını ROCm'a taşımak sadece yeniden derleme değildir; bellek modelleri, senkronizasyon davranışı ve kütüphane desteğindeki ince farklılıkları aylarca hata ayıklamaktır. Bu yazılım hendeği, tartışmasız donanım üstünlüğünden daha değerlidir.

## Bir GPU'yu Tanımlayan Sayılar

Bir NVIDIA RTX 4090'ı (tüketici GPU'su), bir H100'ü (veri merkezi GPU'su) ve bir Apple M4 GPU'sunu yan yana koyarak yelpazanin nasıl bölündüğünü görelim:

| Metrik | RTX 4090 | H100 SXM | M4 (10 çekirdekli GPU) |
|--------|----------|----------|-------------------|
| CUDA/gölgelendirici çekirdekleri | 16.384 | 16.896 | 1.280 |
| Tensör/matris çekirdekleri | 512 | 528 | 10 (AMX birimleri) |
| Transistörler | 76,3 milyar | 80 milyar | ~28 milyar (tam SoC) |
| TDP | 450W | 700W | ~10W (GPU kısmı) |
| Bellek bant genişliği | 1.008 GB/s | 3.350 GB/s | 120 GB/s |
| FP16 tensör TFLOPS | 661 | 990 | ~4,6 |
| Kalıp boyutu | 609 mm² | 814 mm² | ~75 mm² (GPU) |
| Fiyat | 1.599$ | ~30.000$ | 1.199$'lık SoC'un parçası |

H100, benzer çekirdek sayılarına rağmen RTX 4090'dan 20 kat daha pahalıdır çünkü şunlara sahiptir: 3,3 kat bellek bant genişliği (HBM3'e karşı GDDR6X), birden fazla GPU'yu her biri 900 GB/s'de bağlayan NVLink 4.0, 24 GB GDDR6X'e karşı 80 GB HBM3 ve ECC, MIG bölümleme ve veri merkezi güvenilirliği için yazılım/sürücü desteği. Donanım primi aslında bir *sistem* primidir.

## AMD, Intel ve GPU Rekabet Ortamı

NVIDIA, 2025 itibarıyla veri merkezi GPU pazarının yaklaşık %80-90'ına hâkimdir, ancak rekabet kızışıyor.

**AMD**, CDNA 3 (MI300X) ile anlamlı bir geri dönüş yaptı. Yongacık teknolojisini kullanarak — AMD'nin CPU'larda Intel'i alt etmek için kullandığı aynı hile — sekiz 5nm hesaplama kalıbını dört HBM3 yığınının üzerine istifliyor ve 153 milyar transistörlü (piyasaya sürüldüğü sırada en büyük) bir canavar yaratıyor. MI300X, ağırlıkları H100'ün 80 GB'ına sığmayan büyük dil modellerini çalıştırmak için kritik olan 192 GB HBM3 sunuyor. Microsoft, Meta ve Oracle, MI300X kümeleri konuşlandırdı.

**Intel**, Arc (tüketici) ve Gaudi (veri merkezi) ile girdi, ancak hiçbiri önemli bir çekiş elde edemedi. Ponte Vecchio GPU'su 47 yongacıkla 100 milyar transistör barındırdı ama geç kaldı, güç aç oldu ve ılık bir benimsenmeyle karşılaştı. Intel'in Gaudi 3'ü, geleneksel bir GPU'dan çok bir ASIC olarak özellikle yapay zekâ eğitimini hedefliyor ama yazılım ekosistemi derinliğinden yoksun.

**Apple**, birleşik bellek mimarisiyle temelden farklı bir yaklaşım benimsiyor. M4 Ultra'nın GPU'su 192 GB belleğini CPU ile paylaşıyor — PCIe veri yolu darboğazı yok, ayrı bellek havuzu yok. Apple Silicon'ın belleğine sığan iş yükleri için bant genişliği verimliliği şaşırtıcı olabilir: M4 Max, 30W güç zarfından 546 GB/s sunar. Bellek bant genişliği sınırlı olan yerel LLM çıkarımı için Apple Silicon'ın watt başına performansı ayrık GPU'larla rekabetçidir.

## GPU'lar Yapay Zekâyı Neden Fethetti

İşte sezgiye aykırı kısım: GPU'lar yapay zekâ için *tasarlanmadı*. Pikselleri gölgelendirmede onları iyi yapan mimari özellikler — yoğun paralellik, yüksek bellek bant genişliği, gecikme toleransı, adım adım yürütme — sinir ağı eğitiminin hesaplama talepleriyle neredeyse mükemmel şekilde örtüşüyor.

Bir sinir ağını eğitmek, özünde milyarlarca kez tekrarlanan üç işlemdir: **ileri geçiş** (matris çarpmaları), **kayıp hesaplama** (eleman bazında işlemler) ve **geri geçiş** (daha fazla matris çarpması, transpoze edilmiş). Her işlem aynı hesaplamayı milyonlarca bağımsız veri elemanına uygular. Bu tam olarak SIMT'in inşa edilme amacıdır.

Alex Krizhevsky 2012'de AlexNet'i iki GTX 580 üzerinde eğitip ImageNet yarışmasını ezici bir farkla kazandığında, bunun nedeni temelden daha iyi bir algoritması olması değildi. Evrişimli sinir ağları 1980'lerden beri vardı. Nedeni, GPU'ların nihayet bunları *uygulanabilir* kılmasıydı — CPU'larda haftalar sürecek olan, GPU'larda günler sürdü. O an derin öğrenme devriminin kapılarını açtı.

Bugün GPT-4 veya Gemini gibi bir öncü modeli eğitmek, aylar boyunca çalışan 10.000-25.000 H100 GPU kümesi, megawattlarca güç tüketimi ve eğitim başına 100-500 milyon dolar maliyet gerektiriyor. NVIDIA'nın bu iş yükü üzerindeki tekeli — donanım, yazılım, ara bağlantı (NVLink + NVSwitch) — kısa süreliğine dünyanın en değerli şirketi olmalarının nedenidir.

## Tuhaf Gelecek: Uzmanlaşma mı Genellik mi

GPU, büyüleyici bir evrimsel dönemde. NVIDIA'nın Blackwell nesli (B200), kalıp alanının giderek büyüyen bir kısmını tensör çekirdeklerine, dönüştürücü motorlarına ve ara bağlantıya ayırıyor — yapay zekâya hizmet eden ve grafiğe neredeyse hiç dokunmayan özellikler. AMD'nin MI300X'inin ekran çıkışı bile *yok*; yalnızca adıyla GPU. Google'ın TPU'ları ve Amazon'un Trainium'u hiçbir grafik geçmişi olmayan saf yapay zekâ hızlandırıcılarıdır.

GPU'nun grafik çipinden tamamen başka bir şeye dönüşümüne mi tanıklık ediyoruz? Genellik (CUDA her şeyi çalıştırır) ile uzmanlaşma (tek bir işlem için tensör çekirdekleri) arasındaki gerilim, çip mimarisinin önümüzdeki on yılını belirleyecek. Yarın **bellek hiyerarşisini** — SRAM, DRAM, HBM ve bant genişliği duvarını — keşfettiğimizde göreceğimiz gibi, sınırlayıcı etken artık hesaplama gücü değil. Canavara veriyi yeterince hızlı beslemektir.

---

<div class="quiz-placeholder" data-quiz-path="quizzes/gun-17.toml"></div>
