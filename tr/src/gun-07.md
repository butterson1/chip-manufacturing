# Gün 7: Üretim Tesisi (Fab)
## 20 Milyar Dolarlık Temiz Oda Fabrikasının İçinde

Dün, "3nm" gibi süreç düğümü adlarının fiziksel gerçeklikten pazarlamaya nasıl savrulduğunu keşfettik. Ama bu pazarlama etiketlerinin ortak bir noktası var: bu adları taşıyan her çip bir *fab* — fabrikasyon tesisi — içinde doğdu. İnsanoğlunun inşa ettiği en aşırı üretim ortamı. Bugün içeri adım atıyoruz.

En ileri bir yarı iletken fabrikası inşa etmek 15 ila 25 milyar dolar arasına mal olur ve temel atmadan ilk üretim plakasına üç ila dört yıl sürer. TSMC'nin Tainan, Tayvan'daki Fab 18 kompleksi — dünyanın gelişmiş 3nm ve 5nm çiplerinin çoğunun üretildiği yer — aşamaları genelinde yaklaşık 19,5 milyar dolar kümülatif yatırımı temsil eder. Bunlar sadece pahalı binalar değil. Muhtemelen gezegen üzerindeki en sofistike yapılar.

Neden bu kadar para? Çünkü kritik detayları 20-50 atom genişliğinde transistörler yapmak, *her şeyi* — havayı, titreşimleri, sıcaklığı, suyu, kimyasalları ve hatta elektromanyetik alanları — obsesif sınırında kontrol etmeyi gerektirir.

## Temiz Oda: Uzaydan Daha Temiz

Herhangi bir fabın kalbi temiz odasıdır — gerçek plaka işlemenin gerçekleştiği kapalı, iklim kontrollü ortam. Ama buna "oda" demek yetersiz kalır. TSMC'nin Fab 18 temiz odası yaklaşık 160.000 metrekare — 28 Amerikan futbol sahası. Tam vücut "tavşan kıyafetleri" içindeki çalışanlar, bir uzay istasyonundaki astronotlar gibi hareket eder ve bir bakıma karşılaştırma yerindedir: içerideki hava, Uluslararası Uzay İstasyonu'ndaki havadan daha temizdir.

Temiz oda temizliği, belirli bir boyut eşiğinde metreküp başına havadaki parçacık sayısını sayan ISO sınıflarıyla ölçülür. Tipik bir hastane ameliyathanesi ISO Sınıf 7'dir — metreküp başına 0,5 mikrometre ve üzeri 352.000'den az parçacık. Tipik bir şehir caddesindeki hava kabaca ISO Sınıf 9'dur — metreküp başına yaklaşık 35 milyon parçacık.

En ileri bir fabın plaka işleme alanı ISO Sınıf 1 ila Sınıf 3'te çalışır. ISO Sınıf 1, 0,1 mikrometre (100nm) boyutunda metreküp başına en fazla **10 parçacık** demektir. Bir insan saçı yaklaşık 70 mikrometre çapındadır — avlanan parçacıklardan 700 kat daha büyük. Bir deri pulu, bir tüy taneciği, bir makyaj tozu zerresi — bunların herhangi biri, 20 nanometre genişliğinde çizgiler bastığınız bir plaka üzerinde felaket boyutunda bir kaya olurdu.

Bunu nasıl başarırsınız? Neredeyse komik derecede aşırı mühendislik uygulanmış bir hava taşıma sistemiyle. Temiz oda tavanı esasen dev bir HEPA ve ULPA filtre bankasıdır. Hava, saniyede 0,3-0,5 metre hızla laminer (türbülanssız) akış halinde aşağı doğru akar, plakalar ve çalışanların yanından geçer, delikli yükseltilmiş döşemeden alttaki dönüş plenumuna süzülür, tekrar filtrelenir ve resirkülasyon yapılır. Temiz odadaki tüm hava hacmi saatte **300 ila 600 kez** değiştirilir. Karşılaştırma için tipik bir ofis binası saatte yaklaşık 4-6 kez hava değiştirir. Bu hava taşıma sistemi tek başına bir fabın elektrik tüketiminin %30-40'ını oluşturabilir.

Fab çalışanlarının giydiği tavşan kıyafetleri ikinci savunma hattıdır. Sıkı dokunmuş polyesterden yapılır, statik dağıtıcı lif içerir ve açıktaki her santimetrekare deriyi kaplar. Girmeden önce çalışanlar hava duşundan — tüm yönlerden filtrelenmiş hava püskürten bir odadan — 15-30 saniye geçer. Kozmetik yok. Parfüm yok. Dışarıdan kağıt veya karton yok. Kalemler bile yasak (grafit parçacıkları); yalnızca temiz oda onaylı kalemler kullanılabilir.

İşte sezgilere aykırı kısım: **modern bir fabda insanlar temiz odadaki en kirli şeylerdir.** Her dakika bir kişi 0,3 mikrometreden büyük yaklaşık 100.000 parçacık saçar. Bu nedenle endüstri insanları süreçten istikrarlı biçimde çıkarıyor. TSMC'nin en gelişmiş tesislerinde plakalar, tavan üzerindeki otomatik malzeme taşıma sistemlerinde (AMHS) — tavandaki robotik monoraylar — kapalı FOUP (Front Opening Unified Pod) kaplarında araçlar arasında hareket eder. Bir plaka, 2-3 aylık işlenmesi boyunca fabda toplam kilometrelerce mesafe kat edebilir ve hiçbir zaman insan eli tarafından dokunulmayabilir.

## Alt Fab: Gizli Makine Dairesi

Temiz oda döşemesinin altına inin ve *alt fab*a girersiniz — üstteki pırıl pırıl beyaz odaya hiç benzemeyen devasa bir endüstriyel alan. Çip üretiminin acımasız gerçekliği burada yaşar. Dev pompalar, kimyasal dağıtım sistemleri, atık azaltma üniteleri, egzoz yıkayıcıları ve elektrik dağıtım panoları, genellikle temiz odanın kendisi kadar büyük bir alanı doldurur.

Kimyasal dağıtım sistemleri başlı başına mühendislik harikalarıdır. Modern bir fab 500'den fazla farklı kimyasal ve gaz kullanır, birçoğu olağanüstü tehlikelidir. İyon implantasyonunda kullanılan arsin (AsH₃), 6 ppm'de öldürücüdür. Silan (SiH₄) pirofotiktir — havayla temas ettiğinde kendiliğinden tutuşur. Hidroflorik asit (HF) deriye nüfuz edebilir ve kemiği çözebilir. Güvenlik altyapısı tek başına — gaz dedektörleri, yangın söndürme, kimyasal yıkayıcılar, sismik destekleme — fabın inşaat maliyetinin %15-20'sini oluşturabilir.

## Su: Yarı İletken Endüstrisinin Gizli Bağımlılığı

Çoğu insanı şaşırtan bir gerçek: **en ileri bir fab günde 30.000 ila 50.000 metreküp ultra saf su (UPW) kullanır.** Kabaca 8-13 milyon galon — 50.000-60.000 kişilik bir şehre yetecek kadar. TSMC tek başına 2022'de tüm tesisleri genelinde yaklaşık 88 milyon metrik ton su tüketti — kuraklığa eğilimli Tayvan'da gerçek siyasi gerginlik yaratan bir rakam.

Neden bu kadar çok su? Çünkü su yarı iletken üretiminin neredeyse her adımında kullanılır. Fabrikalar, şebeke suyunu alıp bir dizi arıtmadan geçiren devasa su arıtma tesisleri işletir: çoklu ortam filtrasyonu, aktif karbon adsorpsiyonu, ters osmoz, iyon değişim yatakları, UV oksidasyonu ve son ultrafiltrasyon. Sonuç, 18,2 megaohm-santimetre dirençte ultra saf su — saf H₂O için teorik maksimum. Musluk suyu genellikle 0,01-0,05 megaohm-cm'dir, 400-1.800 kat daha az saf.

## Güç: Canavarı Beslemek

En ileri bir fab sürekli olarak **100 ila 150 megavat** elektrik gücü tüketir — küçük bir doğalgaz santralinin çıktısı veya 80.000-120.000 eve yetecek kadar. TSMC'nin 2022'deki toplam elektrik tüketimi yaklaşık 22,7 teravat-saat — Tayvan'ın toplam elektrik üretiminin yaklaşık %7,5'i. Tek bir şirket. Çip yapıyor.

En büyük tüketiciler: **HVAC ve hava taşıma (%30-40)**, **süreç araçları (%30-35)** — tek bir ASML EUV litografi sistemi sadece kendisi için yaklaşık 1,2 megavat çeker — **su arıtma ve kimyasal sistemler (%10-15)** ve **AMHS ve tesis sistemleri (%10-15)**.

## Titreşim: Çok, Çok Hareketsiz Durmak

20 nanometre hassasiyetinde detay basarken, hiç fark etmeyeceğiniz titreşimler deprem olur. Beton zeminde yürüyen bir kişi kabaca 10-50 mikrometre titreşim üretir. 100 metre öteden geçen bir kamyon: 1-5 mikrometre. EUV litografi bindirme baskı toleransı: **1 nanometreden az**.

Fablar bunu devasa, izole temeller ile çözer. Litografi bölmeleri, binyanın geri kalanından hava boşlukları veya titreşim sönümleme malzemeleriyle ayrılmış, binlerce ton ağırlığında bağımsız beton kaideler üzerinde oturur. Bazı fablar çelik kazıkları ana kayaya 30 metre veya daha derine çakar.

TSMC'nin sadece Arizona fabındaki temel mühendisliğine 1 milyar doların üzerinde harcadığı bildiriliyor — çölün Tayvan'a kıyasla farklı jeolojik koşullarını ele almak için.

## Araç Seti: 5 Milyar Dolar Değerinde Makineler

Tamamen donanımlı bir en ileri fab, toplam yaklaşık 4-6 milyar dolar değerinde kabaca 1.000 ila 1.500 büyük süreç aracı içerir:

- **Litografi (ASML):** ~380 milyon dolar/adet 10-15 EUV tarayıcı, artı ~60 milyon dolar/adet 50+ DUV daldırma tarayıcı. ASML, yeryüzündeki tek EUV araç tedarikçisidir.
- **Aşındırma (Lam Research, Tokyo Electron):** 100+ plazma aşındırıcı. 3-8 milyon dolar/adet.
- **Biriktirme (Applied Materials, Lam, TEL, ASM):** CVD, PVD, ALD sistemleri. 100+ araç, 2-10 milyon dolar/adet.
- **İyon İmplantasyonu (Applied Materials, Axcelis):** 20+ implantör, 3-5 milyon dolar/adet.
- **CMP (Applied Materials):** 30+ parlatma aracı, 3-6 milyon dolar/adet.
- **Metroloji & denetim (KLA, Applied Materials):** 100+ araç. Çip üretmezler — sadece bakarlar. Ama verim için vazgeçilmezdir.

TSMC'nin Fab 18'i, tam kapasitede 300mm plakalarda aylık yaklaşık 100.000-120.000 plaka başlangıcı çalıştırır. %80 verim ve büyük bir çip için plaka başına ~100 iyi kalıpla, bu aylık yaklaşık 8-10 milyon işlevsel çip demektir — küresel talebi yine de karşılayamayan inanılmaz bir rakam.

## İnsan Unsuru: 7/24/365

Büyük bir fab, yılın her günü saat başı çalışan üç ila dört vardiyayla 3.000 ila 8.000 kişi istihdam eder. Bir fabı kapatmak son derece pahalıdır — kayıp üretim bir yana, süreç araçlarının birçoğu yeniden başlatıldığında dikkatle rampa inip yeniden kalifikasyon edilmelidir; bu süreç binlerce plakayı israf edebilir ve haftalarca sürebilir.

Süreç mühendisleri ve tarifleri, TSMC gibi bir dökümhanenin gerçek rekabet hendeğidir. Aynı satıcılardan aynı ekipmana sahip iki fab, tariflerin ne kadar iyi ayarlandığına bağlı olarak çılgınca farklı verimler üretir. Intel'in aynı ASML tarayıcıları satın alarak TSMC'nin başarısını basitçe kopyalayamamasının nedeni budur — sihir, yılların üretim öğrenmesiyle birikmiş binlerce ince ayarlı tarife parametresindedir.

## Plakanın Yolculuğu

Apple'ın M4'ü gibi bir çip için en ileri bir fabrikaya giren bir plaka, **60 ila 100 gün** boyunca yaklaşık **800 ila 1.200 ayrı süreç adımından** geçecektir. Litografiden belki 80-100 kez geçecektir. AMHS tavan rayında toplam kat edilen mesafe genellikle 15-30 kilometredir.

---

{{#quiz quizzes/gun-07.toml}}
