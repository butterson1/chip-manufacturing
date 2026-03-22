# Gün 5: Mantık Kapılarından İşlemcilere
## Milyarlarca Aptal Anahtar Nasıl Düşünmeyi Öğreniyor

Dün Moore Yasası'nı izledik — çiplere giderek daha fazla transistör sığdıran üstel motor. Ama kimsenin söylemediği bir şey var: tek başına bir transistör son derece aptaldır. Bir anahtar. Açık ya da kapalı. Koridorunuzdaki ışık anahtarı, tek bir transistörle aynı hesaplama gücüne sahiptir. Sıfır.

Sihir onları *bağladığınızda* gerçekleşir. Ve birkaç transistörün nasıl sayı toplayabildiği, şeyleri hatırlayabildiği ve sonunda bunu okuduğunuz yazılımı çalıştırabildiğinin hikâyesi — insanlık tarihinin en güzel entelektüel yapılarından biridir. Ve bir kez gördüğünüzde şaşırtıcı derecede basittir.

## Anahtarlardan Mantığa: Dünyayı Yutan Kapı

Hesaplamanın en önemli devresiyle başlayalım: NAND kapısı.

İki PMOS transistörü güç kaynağı (V_DD) ile çıkış düğümü arasına paralel bağlayın. Sonra iki NMOS transistörü o çıkış düğümü ile toprak arasına *seri* bağlayın. Bir giriş sinyalini bir PMOS-NMOS çiftinin kapılarına, ikinci girişi diğer çifte besleyin. Elde ettiğiniz, çıkışın *yalnızca* her iki giriş de YÜKSEK (mantık 1) olduğunda DÜŞÜK (mantık 0) olduğu bir devredir. Diğer tüm giriş kombinasyonları YÜKSEK çıktı verir.

İşte NAND — "DEĞİL VE." Ve akıl almaz gerçek: **NAND tek başına, şimdiye kadar tasarlanmış veya tasarlanacak herhangi bir dijital hesaplamayı inşa etmek için yeterlidir.** Her CPU, her GPU, her sinir ağı hızlandırıcısı, her dijital kol saati — hepsini yalnızca NAND kapıları kullanarak inşa edebilirsiniz. Matematikçiler bu özelliğe "işlevsel tamlık" der ve Henry Sheffer tarafından 1913'te, herhangi biri elektronik bilgisayar inşa etmeden on yıllar önce kanıtlanmıştır.

Neden NAND ve AND değil? Çünkü CMOS transistörler doğal olarak eviricidir. CMOS'ta NAND kapısı sadece 4 transistör gerektirirken, AND kapısı 6 gerektirir (bir NAND artı bir evirici). Transistörlerin bir zamanlar pahalı olduğu ve hâlâ güç tükettiği bir dünyada, bu %33'lük tasarruf önemlidir.

NOR kapıları NAND'ın ayna ikizidir — *herhangi bir* giriş YÜKSEK ise çıkış DÜŞÜK olur. O da işlevsel olarak eksiksizdir. Pratikte NAND kapıları, NMOS transistörlerin yaklaşık 2-3 kat daha yüksek taşıyıcı hareketliliğine sahip olması nedeniyle çoğu süreç teknolojisinde biraz tercih edilir ve bu NAND kapılarını aynı silikon alanında doğal olarak daha hızlı yapar. Flash belleğin neden "NAND flash" olarak adlandırıldığının nedeni budur — depolama hücreleri NAND konfigürasyonunda bağlıdır.

## İnşa Etmek: Kapılardan Aritmetiğe

Şimdi yararlı bir şey yapalım. İki adet tek bitlik sayıyı toplayalım.

0+0=0. 0+1 veya 1+0=1. 1+1 ise... ikili sistemde 10. Toplam biti 0, elde biti 1. Dikkat edin: toplam biti bir XOR işlemidir (girişler farklı olduğunda çıkış 1), elde biti ise bir AND işlemidir (yalnızca her iki giriş de 1 olduğunda çıkış 1). Bu iki kapılı devreye **yarım toplayıcı** denir ve 5 NAND kapısından inşa edilebilir.

Ama yarım toplayıcılar zincirlenmez. Çok bitli sayılar toplarken her konum, alt konumdan gelen eldeyi hesaba katmalıdır. **Tam toplayıcı** üç giriş (A, B ve elde-giriş) alır ve bir toplam ile elde-çıkış üretir. Yaklaşık 9 NAND kapısı gerektirir. 64 tanesini zincirleyin ve her modern CPU'nun içindeki temel aritmetik birim olan 64 bitlik bir toplayıcınız olur.

Ama acımasız bir sorun var: eldenin **yayılması** gerekir. 63. bit konumundaki tam toplayıcı, 62. konumun eldesini alana kadar çıktısını üretemez; 62 de 61'i bekler, ta ki 0. konuma kadar. Bu gecikme, bit genişliğiyle doğrusal olarak artar ve modern saat hızlarında kabul edilemez.

Çözüm, 1960'larda icat edilen **elde-öngörülü toplayıcıdır**. Eldelerin yayılmasını beklemek yerine, "üret" ve "yay" sinyalleri kullanarak paralel olarak önceden hesaplar. 64 bitlik bir elde-öngörülü toplayıcı, 128 yerine yaklaşık 12 kapı gecikmesinde sonuçlanır. Modern CPU'lar — Intel Alder Lake çekirdekleri 5+ GHz'de tek saat döngüsünde 64 bitlik toplama tamamlar, yani elde hesaplaması yaklaşık **200 pikosaniye** — ışığın 6 santimetre yol aldığı süre — içinde biter.

## Çıkarma, Çarpma ve İkiye Tümleyen Hilesi

İşte donanım tasarımcılarının erken keşfettiği zarif bir kısayol: ayrı bir çıkarıcı devreye ihtiyacınız yok. **İkiye tümleyen** gösteriminde B'yi A'dan çıkarmak için B'nin tüm bitlerini ters çevirir, 1 ekler ve sonucu A'ya toplarsınız. Bu "çevir ve 1 ekle" işlemi donanımda önemsiz derecede ucuzdur. Yani bir toplayıcı devre, tek bir mod bitine bağlı olarak hem toplama hem çıkarma yapar.

Çarpma daha zordur. Özünde ikili çarpma, kaydırma ve toplamadır — ilkokulda ondalık çarpma için öğrendiğiniz aynı algoritma, ama her basamak ya 0 ya 1 olduğundan daha basit. Modern çarpıcılar **Wallace ağaçları** veya **Dadda ağaçları** — kısmi çarpımları paralel olarak sıkıştıran dikkatle yapılandırılmış toplayıcı ağaçları — kullanır.

## Mantıktan Bellek: Flip-Flop Devrimi

Aritmetik yararlıdır ama durumsuz — girişleri verin, çıktı alın, bitti. Gerçek hesaplama için **bellek** gerekir: bir sonucu saklama ve daha sonra kullanma yeteneği.

İki NAND kapısı alın. Birincinin çıkışını ikincinin bir girişine, ikincinin çıkışını birincinin bir girişine bağlayın. Bu çapraz bağlı çift, **iki kararlı devre** oluşturur — iki kararlı duruma sahiptir ve itildiği durumda kalır. Bu **SR mandal** (Set-Reset), dijital belleğin atomudur. Bir bit hatırlar.

**D flip-flop** kapılama mantığı ve kenar tetikleme ekleyerek bunu geliştirir. Bir D flip-flop, saat sinyali düşükten yükseğe geçtiği kesin anda girişindeki (D) değeri yakalar ve bir sonraki saat kenarına kadar sabit tutar. Her modern CPU'daki her yazmaç, her boru hattı aşama sınırı, her geçici depolama parçası — hepsi D flip-flop'lardır.

Bir Apple M3 CPU çekirdeğinde yaklaşık **10-15 milyon flip-flop** vardır. Bir çipin 4 GHz'de çalıştığını duyduğunuzda, fiziksel olarak bunun anlamı saniyede 4 milyar kez, bu milyonlarca flip-flop'un her birinin eş zamanlı olarak girişini örneklemesi ve kilitlemesidir.

## Yazmaçlar, Sayıcılar ve Durum Makineleri

64 flip-flop'u gruplayın ve bir **64 bitlik yazmaç** elde edin — bir sayı saklayan küçük, yüksek hızlı bir çalışma alanı. Modern bir x86 CPU'da programcıya görünür 16 genel amaçlı yazmaç vardır (RAX'tan R15'e), ama gerçek fiziksel yazmaç dosyası çok daha büyüktür: Intel'in Golden Cove çekirdeğinde yaklaşık **280 fiziksel tamsayı yazmacı** ve **332 kayan nokta/vektör yazmacı** bulunur.

Flip-flop'ları geri beslemeyle seri bağlayın ve bir **sayıcı** elde edin — her saat kenarında değerini 1 artıran devre. CPU'nuzdaki program sayıcı tam olarak budur: bellek adresleri boyunca sayarak birbiri ardına komut getiren bir yazmaç.

Flip-flop'ları birleşimsel mantıkla (kapılar) birleştirin ve **sonlu durum makinesi** (FSM) inşa edebilirsiniz. Trafik ışığı denetleyicileri, asansör mantığı, USB protokol işleyicileri — bunların hepsi FSM'dir.

## Büyük Sıçrama: Programlanabilirlik

Buraya kadar her şey **sabit işlevli donanım** olmuştur. Bir toplayıcı her zaman toplar. Bir sayıcı her zaman sayar. Elektronik devreleri *bilgisayarlara* dönüştüren kavrayış, 1945'te John von Neumann'dan (Alan Turing ve ENIAC ekibinin çalışmalarına dayanarak) geldi: **komutları verilerle aynı bellekte saklayın ve onları okuyup çalıştıran genel bir devre kurun.**

Bu **saklı program kavramıdır** ve bir hesap makinesi ile bilgisayar arasındaki sınır çizgisidir. Saklı bir programı çalıştırmak için gereken donanım şaşırtıcı derecede mütevazıdır:

1. **Program sayıcı (PC):** Sonraki komutun bellek adresini tutan yazmaç.
2. **Komut yazmacı (IR):** Çalıştırılmakta olan komutu tutan yazmaç.
3. **Kod çözücü:** Komut bitlerini okuyan ve hangi işlemin yapılacağını belirleyen birleşimsel mantık.
4. **ALU (Aritmetik Mantık Birimi):** Hesaplama çekirdeği — toplayıcılar, kaydırıcılar, karşılaştırıcılar ve mantık işlemleri.
5. **Yazmaç dosyası:** İşlenenler ve sonuçlar için küçük bir hızlı depolama bankası.
6. **Kontrol birimi:** Her şeyi düzenleyen FSM.

Orijinal Intel 4004 (1971), 12mm²'lik bir kalıpta 2.300 transistörle *tam olarak* bu bileşenlere sahipti ve saniyede yaklaşık 92.000 komut çalıştırabiliyordu. Elli beş yıl sonra, bir Apple M4 performans çekirdeği — hâlâ temelde aynı mimari kalıp — çekirdek başına saniyede yaklaşık **6 milyar komut** çalıştırır. Aynı kavram, 400 milyon kat daha hızlı.

## Döngü Başına Bir Komuttan Birçoğuna: Boru Hattı

En basit CPU tasarımı bir seferde bir komut çalıştırır: getir, çöz, yürüt, yaz-geri. Her adım bir saat döngüsü alır, yani bir komut 4 döngü sürer. Bu israftır — N komutunu yürütürken getirme birimi boşta oturur.

Çözüm **boru hattıdır** — fabrika montaj hatlarından ödünç alınmıştır. N komutu yürütme aşamasındayken N+1 çözülüyor, N+2 ise getiriliyor. Bir araba fabrikası gibi — bir araba boyahanedeyken diğeri montajda — hiçbir istasyon asla boşta değildir.

Modern yüksek performans CPU'lar boru hattını aşırıya taşır. Intel'in Golden Cove mikro mimarisi yaklaşık **20 aşama derinliğinde** bir boru hattına sahiptir ve eş zamanlı olarak saat döngüsü başına **6 komut** gönderebilir. Bu makineler sadece boru hattı kullanmaz — **komut düzeyinde paralellik** bulur ve kullanır, bağımsız komutları sıra dışı yürütür, tahmin edilen dal yollarını spekülatif olarak yürütür ve yaygın komut çiftlerini tek işlemlere kaynaştırır.

## Şaşırtıcı Ölçek

İşte sizi durduracak kısım. Modern bir CPU alın — diyelim AMD EPYC 9004 "Genoa" sunucu işlemcisi. 96 çekirdeği var, her biri yüz milyonlarca kapı içeriyor. Çipin tamamı **90 milyarın üzerinde transistör** barındırıyor. Bu transistörlerin her biri 1. Günde öğrendiğimiz MOSFET türündedir. Her mantık kapısı NAND, NOR ve evirici yapılarından inşa edilmiştir. Her flip-flop çapraz bağlı bir kapı çiftidir. Her toplayıcı tam toplayıcılardan oluşan bir ağaçtır.

Sihirli bir orta katman yoktur. "Transistör bir anahtardır" ile "bu çip Linux çalıştırıyor" arasındaki boşluk tamamen *bileşimle* doldurulur — basit şeylerin biraz daha az basit şeyler yapmak için bağlanması, düzinelerce soyutlama katmanı boyunca tekrarlanarak bir CPU'ya ulaşılması.

Sonuna kadar kaplumbağalar. Ama hepsi NAND-kapısı kaplumbağaları.

## İleriye Bakış

Transistörlerden anahtarlara, mantık kapılarına, aritmetiğe, belleğe ve programlanabilir CPU'lara geldik. Yarın, yarı iletken hikâyesinin bir sonraki katmanıyla yüzleşeceğiz: **üretim düğümleri**. TSMC "3nm" ve Samsung "3nm" dediğinde bu rakamlar gerçekte ne anlama geliyor? (Spoiler: düşündüğünüz şeyi ifade etmiyorlar.)

---

{{#quiz quizzes/gun-05.toml}}
