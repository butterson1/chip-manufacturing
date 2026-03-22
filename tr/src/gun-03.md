# Gün 3: Fotolitografi 101
## Işıkla Devre Basmak — Atomik Ölçekte Nasıl Resim Yapıyoruz

Dün, pürüzsüz bir silikon plakayla bitirdik — 300mm'lik on-bir-dokuz saflığında kristal, yarım nanometre düzlüğe parlatılmış. Mükemmel boş bir tuval. Bugün, yarı iletken endüstrisinin bu tuvalin üzerine nasıl resim yaptığını öğreniyoruz. Ve fırça, ışığın ta kendisi.

Fotolitografi, çip üretiminin en kritik tek adımıdır. Aynı zamanda en çok tekrarlanan: modern bir işlemci, üretimi boyunca **60 ila 80 ayrı litografi geçişinden** geçer; her biri çipin 3B yapısının farklı bir katmanını basar. Plaka yapımı temelse ve transistör tasarımı plansa, litografi aslında binayı inşa eden — bir seferde imkânsız derecede ince bir kat döşeyen — yapı ekibidir.

Temel kavram neredeyse absürt derecede basit görünür. Plakayı ışığa duyarlı bir kimyasalla kaplayın. Üzerine desenli ışık tutun. Bir fotoğraf banyosu gibi kimyasalı geliştirin. Elde edilen deseni şablon olarak kullanarak malzeme aşındırın ya da biriktirin. Şablonu yıkayın. Tekrarlayın.

Tişört baskısı gibi görünüyor. Ama onu insanoğlunun bugüne kadar üstlendiği en olağanüstü optik mühendislik meydan okuması yapan şey şu: **baskıda kullandığınız ışığın dalga boyundan daha küçük detaylar basıyorsunuz**. Bugünün en ileri fabrikaları, 13,5 nanometre dalga boyundaki ışıkla rutin olarak 3-5 nanometre genişliğinde yapılar basıyor — ki bu ışık, daha önce 7nm detaylar basmak için kullanılan 193 nanometre ışığın yerini aldı. Bu, yakalamanız gereken en ince detaydan beş kat daha geniş bir fırçayla portre çizmek gibi.

Bu nasıl mümkün olabilir? İşte bu ders bunun hakkında.

![Fotolitografi özeti: ışık kaynağı, maske, optik, rezist ve desen aktarımı](assets/day-03-lithography.svg)

---

## Fotorezist: Işığı Hatırlayan Bir Kimyasal

Her litografi adımı aynı şekilde başlar: bir robotik kol plakayı **1.500-4.000 devir/dakika** hızla döndürürken, bir nozül küçük bir **fotorezist** gölcüğü bırakır — belirli ışık dalga boylarına duyarlı, çözücü içinde çözülmüş sıvı bir polimer. Merkezkaç kuvveti rezisti inanılmaz düzgün bir filme yayar — genellikle uygulamaya bağlı olarak **50-500 nanometre** kalınlığında. Düzgünlük hedefi? 300mm plakanın tamamında **1 nanometreden** az kalınlık sapması. Bir futbol sahası boyutunda bir duvar boyayıp boya kalınlığını tek bir molekül genişliğinde tutmayı hayal edin.

Rezist daha sonra çözücüyü uzaklaştırıp filmi kararlı bir katıya sertleştirmek için **90-110°C**'de 60-90 saniye boyunca bir sıcak plaka üzerinde "yumuşak pişirilir".

Fotorezistler iki çeşittir:

- **Pozitif rezist:** Işığın çarptığı yerde polimer zincirleri kırılır ve geliştirici çözeltisinde çözünür hale gelir. Işıklanan bölgeler yıkanır. Karanlıkta kalan kısımları tutarsınız.
- **Negatif rezist:** Işığın çarptığı yerde polimer çapraz bağlanır ve sertleşir. Işıklanmayan bölgeler yıkanır. Işıkta kalan kısımları tutarsınız.

Modern en ileri litografi ezici çoğunlukla **pozitif rezist** kullanır çünkü daha keskin kenarlar üretir. Özellikle 1990'ların ortasından beri endüstri standardı, 1982'de IBM'de Hiroshi Ito, C. Grant Willson ve Jean Fréchet tarafından icat edilen **kimyasal olarak yükseltilmiş rezistler (CAR)**dir. Akıllı numara: ışık polimeri doğrudan kırmaz. Bunun yerine bir asit molekülü üretir. **100-130°C**'deki pozlama sonrası pişirme sırasında her asit molekülü, yakınlardaki düzinelerce polimer molekülünü korumadan çıkaran bir zincirleme reaksiyonu katalize eder ve onları çözünür hale getirir. Bir fotonun ürettiği asit, birçok fotonun işini yapar. Bu kimyasal yükseltme, daha az ışık kullanarak bile güçlü bir desen elde etmeyi mümkün kıldı — endüstri, foton kaynakların daha soluk olduğu daha kısa dalga boylarına geçerken kritik öneme sahip.

EUV litografisi için (8. Günde derinlemesine ele alacağız) hikâye daha da egzotikleşir. 13,5nm'deki EUV fotonları her biri **92 elektron volt** enerji taşır — atomlardan elektron koparacak kadar. Asıl rezist kimyasını çoğunlukla fotonlar değil, bu ikincil elektronlar yapar. Rezist, iyonizasyon olaylarının kaotik bir çağlayanına dönüşür ve bu kaosu 3nm çözünürlükte temiz, keskin desenler üretecek şekilde kontrol etmek, malzeme biliminin en zor çözülmemiş problemlerinden biridir.

---

## Maske: 10 Milyon Dolarlık Bir Şablon

Işık plakaya ulaşmadan önce bir **fotomaske** (veya retikl) içinden geçer — yaklaşık 152mm × 152mm × 6,35mm boyutlarında, yüzeyindeki ultra ince bir krom katmanına devre deseninin kazındığı erimiş silika plaka. Bunu, inanılmaz karmaşık bir şablon içeren bir cam slayt olarak düşünün.

İşte gözlerinizi kırpmanıza neden olacak bir sayı: tek bir en ileri EUV fotomaskenin üretim maliyeti **300.000 ila 1.000.000 dolar** arasıdır. Modern bir çip için komple bir maske seti — litografi katmanı başına bir maske, 60-80 katman — **10-15 milyon dolara** ulaşır. Daha tek bir çip üretmeden önce, çoğu şirketin tüm bir ürün gamına harcadığından fazlasını maskelere harcamışsınızdır. En ileri çip tasarımının neden milyarderler kulübü olduğunun temel nedenlerinden biridir bu.

Maskeler, uzman şirketler tarafından üretilir — **Photronics** (ABD) ve **Toppan** (Japonya) ticari pazarda baskındır; TSMC, Samsung ve Intel ise en gelişmiş maskelerini kendi bünyelerinde üretir. Süreç **elektron demeti litografisi** kullanır — ışık söz konusu değildir. Son derece odaklanmış bir elektron demeti, krom kaplı kuvars plakanın üzerinden tarayarak deseni nokta nokta yazar. Tek bir gelişmiş maske, desen o kadar yoğun ve karmaşık olduğundan **20-40 saat** kesintisiz e-demeti yazma süresi alabilir.

Ama işte sezgilere aykırı kısım: maskedeki desen, bastığı devreye benzemiyor. Hiç benzemiyor.

---

## Optik Yakınlık Düzeltmesi: Işığa Yalan Söylemek

İstediğiniz devre desenini basitçe bir maskeye koyup plaka üzerine yansıtsanız, sonuç bulanık bir karmaşa olurdu. Işık kırınıma uğrar — kenarların etrafından bükülür, karanlık alanlara sızar ve kendisiyle girişir. Maskede mükemmel kare köşeli bir desen, plakada hüzünlü, yuvarlak şekiller olarak basılırdı. Dar çizgiler amaçlanandan daha ince basılır veya tamamen kaybolurdu. Yoğun çizgi dizileri, aynı genişlikteki yalıtılmış çizgilerden farklı basılırdı.

Çözüm, alanın en entelektüel olarak cesur fikirlerinden biridir: **Optik Yakınlık Düzeltmesi (OPC)**. Maskeye "gerçek" deseni koymak yerine, tüm projeksiyon optik bozulmalarından sonra plakada *aslında istediğiniz* şekli üretecek *kasıtlı olarak çarpıtılmış* bir desen koyarsınız.

Mükemmel bir kare basmanız gerektiğini düşünün. Optik sistemin köşeleri yuvarlayacağını biliyorsunuz. Bu yüzden maske deseninin her köşesine küçük "serifler" — agresif çıkıntılar — eklersiniz; bunlar kırınım tarafından düzleştirildiğinde dik açıya daha yakın bir şey elde edersiniz. Daha geniş bir boşluğun yanına dar bir çizgi mi basmanız gerekiyor? Optiğin onu inceltmesini telafi etmek için maskede çizgiyi biraz genişletirsiniz.

OPC, devasa simülasyonlarla hesaplanır. **Synopsys**, **Cadence** ve **Siemens EDA** (eski Mentor Graphics) gibi şirketler, ışık yayılımının optik sistem boyunca tam fiziğini, rezist kimyasını ve aşındırma davranışını modelleyen yazılımlar satar. Tek bir maske katmanı için tek bir OPC çalışması **on binlerce CPU-saati** tüketebilir ve bir küme üzerinde günler sürebilir. Elde edilen maske desenleri devrelere hiç benzemez — çekiç başlı serifler, alt çözünürlük yardımcı detaylar (basılamayacak kadar küçük ama yapıcı girişim yoluyla yakın detayların desen sadakatini iyileştiren küçük şekiller) ve yalnızca ışığı doğru şeyi yapması için kandırmak amacıyla var olan tuhaf fraktal benzeri süslemelerle çılgın soyut sanata benzerler.

Bu çarpıcı bir tersine çevirmedir: maskeyi ışığa ne istediğimizi gösterecek şekilde tasarlamıyoruz. Maskeyi ışığa tam olarak doğru şekilde *yalan söyleyecek* biçimde tasarlıyoruz ki ışığın kendi bozulmaları gerçeği üretsin.

---

## Tarayıcı: Tersine Çalışan 350 Milyon Dolarlık Bir Kamera

Şimdi her şeyi bir araya getiren makineye gelelim: **litografi tarayıcısı** — dünyada neredeyse tek bir şirket tarafından üretilen: Hollanda, Veldhoven merkezli **ASML**. (ASML'nin EUV makinelerine 8. Günde derinlemesine gireceğiz. Bugün temel optiği anlayalım.)

Bir litografi tarayıcısı, özünde tersine çalışan bir projeksiyon kamerasıdır. Bir görüntü kaydetmek için dünyadan ışık yakalamak yerine, bir görüntü *oluşturmak* için ışığı bir maskenin *içinden* plakaya *yansıtır*. Ama bu "kameranın" her parametresi fiziğin sınırlarına kadar zorlanmıştır.

**Işık kaynağı.** Endüstrinin tarihinin büyük bölümünde (1990'lardan ~2019'a kadar), ana dalga boyu **193 nanometre** olmuştur — bir **argon florür (ArF) ekzimer lazer** tarafından üretilen derin morötesi (DUV) ışık. Bu lazerler, argon ve flor gazları karışımını elektriksel olarak uyararak çalışır; bu gazlar kısa ömürlü ArF molekülleri oluşturur ve dağıldıklarında UV ışık yayarlar. Modern bir ArF lazer saniyede **6.000 darbe** ateşler, her darbe yaklaşık **20 nanosaniye** sürer ve ortalama yaklaşık **90 vat** UV güç sağlar.

En son düğümler için **EUV litografisi** 13,5nm ışık kullanır — morötesi bile değil, yumuşak X-ışınları. Tam EUV hikâyesini 8. Güne erteliyoruz ama şunu bilin: 13,5nm ışık yayan doğal bir lazer yoktur. Bunu, bir CO₂ lazeriyle saniyede **50.000 küçük erimiş kalay damlacığını** (her biri 25 mikrometre genişliğinde) ateşleyerek, yaklaşık **500.000°C**'de bir plazma oluşturarak üretmeniz gerekir. Absürt, ve işe yarıyor.

**Optik.** Kaynaktan gelen ışık, maske desenini plakaya çarpmadan önce **4× veya 5×** küçülten bir dizi hassas mercek (DUV) veya aynadan (EUV) geçer/yansır. Bir DUV tarayıcısı, her biri nanometre-altı hassasiyetle parlatılmış ultra saf erimiş silika ve kalsiyum florürden yapılmış **30-40 ayrı mercek elemanı** içerir. Toplam optik kolon birkaç ton ağırlığındadır. Bu mercekler öncelikli olarak Almanya, Oberkochen'deki **Carl Zeiss SMT** tarafından üretilir — dünyada gerekli kalitede üretebilenler tek bu şirkettir.

4× küçültme kritik bir tasarım tercihidir. Maske deseninin plakaya basılandan dört kat daha büyük olması anlamına gelir ki bu da maske üretimindeki toleransları gevşetir. Plakadaki 20nm'lik bir detayın maskede sadece 80nm olması gerekir — hâlâ zor ama e-demeti yazma ile yönetilebilir.

**Platform.** Plaka, **700 mm/s**'ye kadar hızlarda **nanometre-altı hassasiyetle** hareket eden bir platform üzerinde durur. Pozlama sırasında maske ve plaka eş zamanlı olarak ters yönlerde hareket eder (maske, küçültme oranına uyarak plaka hızının 4 katında). Bu tarama hareketi, aracın neden eski "stepper"lar (tüm alanı taramadan tek seferde pozlayan makineler) yerine "tarayıcı" (scanner) olarak adlandırılmasının nedenidir. Platform, titreşimi ortadan kaldırmak için manyetik kaldırma kullanır — plaka tutucu kelimenin tam anlamıyla manyetik alanlar üzerinde süzülür. Konum, nanometrenin kesirleri düzeyinde ölçüm yapan **lazer interferometreleri** ile izlenir. Makinenin tamamı yaklaşık **180 ton** ağırlığındadır ve fabrika koridorunda yürüyen birinin yarattığı kadar ince bozulmaları telafi edebilen aktif titreşim yalıtım sistemleri üzerinde durur.

---

## Daldırma Litografisi: Su, Işığı Daha Fazla Büker

2000'lerin başında endüstri bir krizle karşı karşıyaydı. Işıkla basılabilecek minimum detay boyutu **Rayleigh kriteri** tarafından belirlenir:

> **Çözünürlük = k₁ × λ / NA**

Burada **λ** dalga boyu, **NA** merceğin sayısal açıklığı (ne kadar ışık topladığı) ve **k₁** yaklaşık 0,25'in altına inemeyen bir süreç faktörüdür. 193nm ışık ve yaklaşık 0,85 sayısal açıklıkla (ışığı hava içinde ne kadar keskin bükebildiğinizle sınırlı) basılabilecek en ince yarım adım yaklaşık 65nm'ydi. Moore Yasası 45nm, ardından 32nm talep ediyordu. Endüstrinin yeni bir numaraya ihtiyacı vardı.

2002'de TSMC'den **Burn Lin**, akademik çevrelerde tartışılmış ama pratik bulunmamış bir çözüm önerdi: son mercek elemanı ile plaka arasındaki boşluğu hava yerine **ultra saf suyla** doldurmak.

Kavrayış zarifti. Suyun 193nm'de kırılma indisi yaklaşık **1,44**'tür (havada 1,0'a kıyasla). Sayısal açıklık *n* × sin(θ) olduğundan — *n* ortamın kırılma indisi — havanın yerine su koymak maksimum NA'yı ~0,93'ten yaklaşık **1,35**'e anında çıkardı. Çözünürlükte %45'lik bir iyileşme — bir anlamda bedavaya, sadece su ekleyerek.

Ama nanometre hassasiyetinde çalışan, 700 mm/s hızla hareket eden bir sisteme "sadece su eklemek" — bir mühendislik kabusudur. Kabarcıkları nasıl uzak tutarsınız? (Su filmindeki tek bir 50 mikronluk hava kabarcığı pozlamayı mahveder.) Suyun plaka boyunca sızmasını nasıl önlersiniz? (Yanıt: yüzey gerilimi ve dikkatle kontrol edilen bir "duş başlığı" nozül sistemiyle yerinde tutulan hassas biçimde tasarlanmış bir menisküs.) Suyu nasıl temiz tutarsınız? (Çılgınca standartlarda filtreler ve sürekli akış.)

ASML'nin ilk daldırma tarayıcısı **TWINSCAN XT:1700i**, 2006'da gönderildi. 2008'e kadar daldırma litografisi ana akıma girdi. Güncel DUV ana gücü, ASML'nin **TWINSCAN NXT:2050**'si, 1,35 NA'ya ulaşır ve yaklaşık **38nm yarım adıma** kadar detay basabilir. Bu makinelerin her biri yaklaşık **100 milyon dolara** mal olur ve saatte **275 plaka** pozlayabilir — her 13 saniyede bir plaka, her biri milyarlarca transistör içeren yüzlerce çip barındıran.

---

## Çoklu Desenleme: Tek Pozlama Yetmediğinde

1,35 NA'da daldırma DUV bile detayları ancak yaklaşık 38nm yarım adıma kadar doğrudan basabilir. Ama EUV gelmeden önce en ileri çipler **14nm hatta 7nm** detaylara ihtiyaç duyuyordu. Nasıl?

Yanıt **çoklu desenleme** — aynı katmanı farklı maskelerle birden fazla kez basmak; her maske detayların yalnızca bir alt kümesini içerir, böylece hiçbir tek pozlamanın birbirine çok yakın detayları çözümlemesi gerekmez.

En basit versiyonu, **LELE (Litho-Etch-Litho-Etch)**, detayların yarısını basar, onları aşındırır, sonra diğer yarısını araya basar. Daha gelişmiş şemalar olan **SADP (Öz Hizalamalı Çift Desenleme)** ve **SAQP (Öz Hizalamalı Dörtlü Desenleme)**, orijinal litografik desenin yarı veya çeyrek adımında otomatik olarak detaylar oluşturmak için ince film biriktirmenin fiziğini kullanır.

SAQP en çılgın olanıdır: bir çizgi basarsınız, etrafına ince bir "ara parça" filmi konformal olarak biriktirirsiniz, orijinal çizgiyi aşındırarak kaldırırsınız, kalan iki ara parça yan duvarını gerçek detaylarınız olarak kullanırsınız. İşlemi tekrarlayın ve desen yoğunluğunu dörde katlamış olursunuz. Samsung ve TSMC, DUV litografisiyle 7nm ve 5nm düğümlerde SAQP'yi yoğun olarak kullandı.

Maliyet? Çoklu desenleme, pahalı litografi adımlarının sayısını ikiye veya dörde katlar. Eskiden tek pozlama gerektiren bir katman artık dördüne ihtiyaç duyabilir — her birinin kendi maskesi, kendi rezist kaplaması, kendi aşındırma adımı. EUV'nin neden bu kadar çaresizce ihtiyaç duyulduğunun önemli nedenlerinden biridir — tek bir EUV pozlaması **3-5 DUV çoklu desenleme adımının** yerini alabilir, maliyeti ve — kritik olarak — birden fazla deseni üst üste yığdığınızda biriken bindirme hatalarını azaltır.

---

## Bindirme: Hizalama Meydan Okuması

Desenleri üst üste koymaktan bahsetmişken — ilkinden sonraki her litografi pozlaması, plakadaki mevcut katmanlarla mükemmel biçimde hizalanmalıdır. **Bindirme** (overlay) adı verilen bu hizalama, güncel düğümlerde yaklaşık **1,5 nanometre** hassasiyetinde olmalıdır. Bu kabaca **7 silikon atomu**.

Bunun ne anlama geldiğini düşünün. Elinizde, oda sıcaklığından 1.000°C'nin üzerine kadar sıcaklıkları içeren düzinelerce işleme adımından geçmiş 300mm'lik bir plaka var. Plaka genleşmiş, büzüşmüş, film gerilmesinden hafifçe bükülmüş ve düzinelerce robot kolu tarafından taşınmış. Ve şimdi bir sonraki katmanın desenini önceki katmana göre 1,5nm içinde — 300mm'lik tüm yüzey boyunca — yerleştirmeniz gerekiyor.

Tarayıcı bunu, daha önceki işleme adımlarında plakanın yüzeyine kazınmış **hizalama işaretlerini** — küçük hedef desenleri — okuyarak başarır. Plaka boyunca dağıtılmış birden fazla hizalama işareti, tarayıcının sensörleri tarafından kırınım tabanlı ölçümle nanometre-altı hassasiyetle konumlandırılır. Tarayıcının yazılımı daha sonra plakanın nasıl deforme olduğunun matematiksel bir modelini (öteleme, dönme, genişleme ve yüksek mertebe eğilme terimleri) hesaplar ve pozlama sırasında platform konumunu ve optik alan düzeltmesini gerçek zamanlı ayarlar.

ASML'nin en son tarayıcıları plaka başına **40'a kadar hizalama işareti** ölçer ve sistematik deformasyon kalıplarını tahmin edip düzeltmek için makine öğrenimi destekli modeller kullanır. Tüm bunlara rağmen, bindirme **tüm fabrikadaki en sıkı spesifikasyon** ve gelişmiş çipler için ilk üç verim sınırlayıcısından biridir.

---

## Geliştirme ve Sonrası: Deseni Tamamlamak

Pozlamadan sonra plaka **pozlama sonrası pişirme (PEB)** sürecinden geçer — kimyasal olarak yükseltilmiş rezistler için kritik, çünkü asit katalizli deproteksiyon reaksiyonu aslında bu sırada gerçekleşir. PEB sırasında sıcaklık düzgünlüğü **±0,1°C** dahilinde kontrol edilmelidir çünkü reaksiyon hızı sıcaklığa üstel olarak duyarlıdır. Sadece 1°C'lik bir sapma, detay boyutlarını %10 kaydırabilir.

Sonra **geliştirme** gelir: plaka, hafif bir baz çözeltisine — genellikle **%2,38 konsantrasyonda tetrametilamonyum hidroksit (TMAH)**, 1980'lerden beri aynı olan bir reçete — daldırılır (ya da daha doğrusu, gölet geliştirme yapılır). Pozlanmış pozitif rezist çözülür. Geriye, alt yüzeyin — silikon, metal veya oksit — bir sonraki işleme adımından — aşındırmadan — korunmasını istediğiniz bölgeleri tam olarak kaplayan, genellikle 50-200nm yüksekliğinde sertleşmiş polimer deseni kalır.

Ve yarınki ders buradan devam ediyor. **4. Günde** **Moore Yasası**nı keşfedeceğiz — bir çipteki transistör sayısının kabaca her iki yılda bir ikiye katlanacağına dair 60 yıllık cesur öngörü ve bu amansız yürüyüşün neden tamamen litografinin fiziksel olarak imkânsız görünen şeyleri yapmasına bağlı olduğu. Numaraları zaten gördük: daldırma, çoklu desenleme, OPC. Ama endüstrinin *neden* ilerlemeye devam ettiğinin hikâyesi — ekonomi, rekabet ve ölçekleme partisini sona erdirmekle tehdit eden duvarlar — fizikten bile daha büyüleyici.

Şimdilik şuna hayret edin: küresel yarı iletken endüstrisi yılda yaklaşık **2 trilyon santimetrekare** desenli silikon üretir; her santimetrekare, Hubble Uzay Teleskobu'ndan daha hassas optikler aracılığıyla itilen ışıkla pozlanır, birkaç atom genişliğine hizalanır ve makine başına her 13 saniyede bir plaka hızında. Bunu yapan makineler Boeing 787 Dreamliner'dan daha pahalıdır. Maskeler bir evden pahalıdır. Kimyasallar trilyonda bir parça düzeyinde kontrol edilir. Ve her şey, 19. yüzyıl karanlık odasındaki aynı temel fikirle başladı: bir kimyasala ışık tutun ve neyin geliştiğini izleyin.

---

{{#quiz quizzes/gun-03.toml}}
