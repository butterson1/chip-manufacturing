# Gün 16: CPU Mimarisi — Boru Hatları, Önbellekler, Dal Tahmini ve Sıra Dışı Yürütme

*Bir çip, fizik kurallarını zekice defter tutmayla alt ederek saniyede milyarlarca komutu nasıl yürütür.*

---

Dün bir çip tasarımını RTL kodundan GDSII tape-out'a kadar izledik — tasarımcının niyetinden, bir fabrikaya her transistörün nereye yerleştirileceğini söyleyen dosyaya kadar olan yolculuk. Bugün bu transistörlerin inşa edildikten sonra gerçekte ne *yaptığını* inceliyoruz. Özellikle modern bir CPU çekirdeğinin mimarisini anlayacağız: hileleri, illüzyonları ve Apple'ın M4'ü gibi bir işlemcinin saniyede 300 milyarın üzerinde işlem yürütmesine olanak tanırken yazılımınıza komutları 1975'teymiş gibi tek tek, sırayla çalıştırdığını söyleyen nefes kesici karmaşıklığı.

Bu, birbirine kenetlenen dört fikrin — boru hattı, önbellek, dal tahmini ve sıra dışı yürütme — hikâyesidir; hep birlikte belki de tarihteki en büyük mühendislik el çabukluğunu oluştururlar.

## Sıralı Yalan

Her CPU bir kurgu sürdürür. Programınız komutların birbiri ardına yürütüldüğünü düşünür: bir komut getir, çöz, yürüt, sonucu yaz. Tamam. Sonraki komut. Bu *programcının modeli*dir ve güzel bir soyutlamadır. Aynı zamanda birebir alındığında felaket derecesinde yavaştır.

Tek bir komutu düşünün — diyelim ki iki sayının toplanması. 3,5 GHz'de çalışan modern bir işlemcide bir saat döngüsü yaklaşık 286 pikosaniyedir. Işık bu sürede yaklaşık 86 milimetre yol alır. Ama basit bir ADD bile birden fazla adım gerektirir: komutu bellekten okumak, ne anlama geldiğini çözmek, yazmaçlardan operand değerlerini almak, aritmetiği yapmak ve sonucu geri yazmak. Her adım bir döngü sürerse, tek bir komut için beş döngü harcadınız. 3,5 GHz'de bu saniyede 700 milyon komut demektir — modern CPU'ların 5-8 milyar komut sürdürdüğünü düşünene kadar etkileyici görünür.

Saf yaklaşımla gerçeklik arasındaki boşluk, kırk yılık mimari yenilikle doldurulmuştur. Her parçanın nasıl evrimleştiğini izleyelim.

## Boru Hattı: Çipinizin İçindeki Montaj Hattı

İlk büyük kavrayış, doğrudan Henry Ford'dan ödünç alınarak 1980'lerin başında geldi. Bir arabayı yapmak 100 adım gerektiriyorsa, bir arabayı bitirmeyi bekleyip sonrakine başlamazsınız — 100 istasyon kurarsınız ve arabaları bunların arasında ilerletirsiniz. Herhangi bir anda 100 araba çeşitli tamamlanma aşamalarındadır. Her 100 adımda değil, her adımda bir tane banttan çıkar.

CPU boru hattı tamamen aynı şekilde çalışır. Klasik RISC boru hattının beş aşaması vardır:

1. **Getirme** — Sonraki komutu bellekten oku
2. **Çözme** — Hangi işlem olduğunu ve hangi yazmaçlara ihtiyaç duyduğunu anla
3. **Yürütme** — Aritmetik veya mantık işlemini gerçekleştir
4. **Bellek** — Yükleme veya depolama komutuysa veri belleğine eriş
5. **Geri yazma** — Sonucu hedef yazmaça yaz

Beş aşamalı bir boru hattıyla, aynı anda beş komut işlem halindedir. Boru hattı dolduğunda, her döngüde bir komut tamamlanır — saf modele göre 5 kat verim artışı. MIPS R2000 (1986) ve Sun SPARC (1987), bu ilke etrafında inşa edilmiş erken ticari çiplerdi.

Ama gerçek boru hatları çok daha derindir. Intel'in Pentium 4 "Prescott"u (2004) 31 boru hattı aşamasına kadar çıktı — ünlü bir karar. Mantık baştan çıkarıcıydı: daha fazla aşama, aşama başına daha az iş demek, bu da her aşamanın daha hızlı olabileceği anlamına gelir, yani daha yüksek saat hızları. Prescott, rakipler 2,2 GHz'deyken 3,8 GHz'e ulaştı. Ama daha derin boru hatlarının birazdan karşılaşacağımız karanlık bir yüzü var.

Modern tasarımlar bir orta noktaya oturmuştur. Apple'ın Firestorm çekirdekleri (M1/M2/M3/M4) yaklaşık 12-14 boru hattı aşaması kullanır. AMD'nin Zen 5'i yaklaşık 19 kullanır. Intel'in son P-çekirdekleri yaklaşık 20-22'dir. Bu sayılar, en uygun noktanın nerede olduğuna dair zorlu deneyimlerle kazanılmış mühendislik bilgeliğini temsil eder.

Boru hattının sorunu, komutların bağımsız olmamasıdır. 2. komut 1. komutun sonucuna ihtiyaç duyuyorsa, 1. komut geri yazma aşamasını bitirene kadar Yürütme aşamasından geçemez. Bu bir **veri tehlikesidir** ve boru hattını durdurur — tıpkı bir yakıt hattındaki hava kabarcıkları gibi boş baloncuklar makine boyunca yayılır.

İlk çözümler basitti: **iletme** (bypass olarak da bilinir), sonuçları bir aşamanın çıkışından doğrudan başka bir aşamanın girişine yönlendirir, yazmaç dosyasını tamamen atlar. Bu birçok durmayı ortadan kaldırır ama hepsini değil. Geri kalanlar için CPU'nun daha ağır silahlara ihtiyacı var.

## Önbellekler: Bellek Duvarını Gizlemek

İşte sizi şaşırtacak bir sayı: 5 GHz'de modern bir CPU çekirdeği her 200 pikosaniyede bir döngü yürütür. Ana belleğe (DDR5 DRAM) erişmek yaklaşık 60-80 nanosaniye sürer. Bu kabaca **300'e 1** oranıdır. İşlemci her komut getirme veya veri yüklemesinde ana belleği beklemek zorunda olsaydı, zamanının %99,7'sini boşta geçirirdi. Boru hattı güzelce tasarlanmış bir hayalet şehir olurdu.

Bu **bellek duvarıdır**, Wm. Wulf ve Sally McKee tarafından 1995'te ortaya atılan bir terim, ve o zamandan beri yalnızca kötüleşti. CPU hızları 1980'den bu yana ~10.000× iyileşti. DRAM gecikmesi belki 10× iyileşti. Aradaki fark bir uçurumdur.

Önbellekler bu uçuruma köprü kurar. Önbellek, SRAM'den (5. Günde ele aldığımız aynı altı transistörlü hücreler) yapılmış, işlemci ile ana bellek arasında duran, yakın zamanda erişilen verileri "yakında tekrar lazım olacak" diye depolayan küçük ve hızlı bir bellektir. Bu bahis, gerçek programların iki özelliği sayesinde şaşırtıcı derecede iyi sonuç verir:

- **Zamansal yerellik**: X adresine eriştiyseniz, muhtemelen yakında tekrar erişeceksiniz (döngü değişkenlerini düşünün)
- **Mekânsal yerellik**: X'e eriştiyseniz, muhtemelen yakında X+1, X+2'ye erişeceksiniz (dizileri düşünün)

Modern CPU'lar, her seviyesi daha büyük ve daha yavaş olan bir **önbellek hiyerarşisi** kullanır:

| Seviye | Tipik Boyut | Gecikme (döngü) | Teknoloji |
|--------|-------------|-------------------|------------|
| L1 Komut | Çekirdek başına 32-64 KB | 3-5 | SRAM, çekirdekle aynı saat |
| L1 Veri | Çekirdek başına 32-64 KB | 3-5 | SRAM, çekirdekle aynı saat |
| L2 | Çekirdek başına 256 KB - 2 MB | 10-15 | SRAM, biraz daha yavaş |
| L3 | Paylaşılan 16-256 MB | 30-50 | SRAM, halka/ağ ara bağlantısı |
| Ana Bellek | 16-128 GB | 150-300+ | DRAM, çip dışı |

Apple'ın M4'ü performans çekirdeği başına 192 KB L1 (128 KB komut + 64 KB veri) ayırır — herhangi bir ticari CPU'daki en büyük L1 komut önbelleği. Bu bilinçli bir tasarım ödünleşimidir: daha büyük L1, daha az önbellek ıskalama demektir ki bu daha az boru hattı durması demektir; ama aynı zamanda önbelleğin daha fazla alan ve güç kaplaması anlamına gelir ve erişim süresi 3 döngüden 4 veya 5'e çıkabilir.

AMD'nin Zen 4'ü (Ryzen 7000 serisi) **3D V-Cache** teknolojisini tanıttı: TSMC'nin SoIC teknolojisini kullanarak doğrudan CCD'nin üzerine bağlanan ekstra 64 MB SRAM yongası. Bu, L3 önbelleğine CCD başına toplam 96 MB verir. Önbellek isabet oranlarının kritik olduğu oyun iş yüklerinde, V-Cache'li Ryzen 7 5800X3D, çok daha yüksek saatli 5800X'i %15-20 geride bıraktı. Daha fazla frekans değil, daha fazla önbellek kazandırdı.

Önbellek **ilişkilendiricilik** esnekliği belirler. Doğrudan eşlemeli bir önbellek (1 yollu) hızlı ama kırılgandır: aynı yuvaya eşlenen iki adres birbirini sürekli çıkarır (bir **çakışma ıskalama**). Tam ilişkili bir önbellek her yuvayı kontrol eder ama pahalı karşılaştırma mantığı gerektirir. Modern L1 önbellekleri genellikle 8 veya 12 yollu küme ilişkili olarak tasarlanır — tek döngülük erişimi korurken isabet oranlarını %95'in üzerinde tutan bir uzlaşma.

Değiştirme politikası — önbellek dolduğunda hangi satırın çıkarılacağı — düşündüğünüzden daha önemlidir. Çoğu önbellek **LRU** (En Az Kullanılan) yaklaşımına yaklaşır, ancak 8 yollu bir önbellek için gerçek LRU, 8! = 40.320 sıralamayı izlemeyi gerektirir. Gerçek uygulamalar sözde-LRU (ağaç tabanlı yaklaşımlar) veya **RRIP** (Yeniden Referans Aralığı Tahmini) kullanır; AMD ve Intel bunu, araştırma makaleleri birçok iş yükünde LRU'yu %5-10 geride bıraktığını gösterdikten sonra benimsemiştir.

İşte sezgiye aykırı gerçek: **daha büyük bir önbellek bazen genel olarak daha yavaş olabilir.** L1 veri önbelleğini 32 KB'den 64 KB'ye ikiye katlamak erişim gecikmesini 4'ten 5 döngüye çıkarırsa ve iş yükünüzün zaten %97 isabet oranı varsa, erişimlerin %97'sindeki ek döngüler, iyileşmiş isabet oranından elde ettiğiniz tasarruftan daha pahalıya mal olur. Önbellek tasarımı, her parametrenin diğerleriyle etkileşime girdiği bıçak sırtı bir optimizasyon oyunudur.

## Dal Tahmini: Geleceğe Bahis Oynamak

Şimdi boru hattının en derin sorunuyla yüzleşiyoruz. Şu kodu düşünün:

```
if (x > 0) {
    y = x + 1;
} else {
    y = x - 1;
}
```

Bu, koşullu bir dal komutuna derlenir. İşlemci bu dalı getirdiğinde boru hattının 1. aşamasındadır. `x > 0` olup olmadığını 3. veya 4. aşamaya (Yürütme) kadar bilemez. Ama boru hattının sonraki döngü için *bir şey* getirmesi gerekir. Ne?

Yanlış tahmin ederseniz, daldan sonra getirdiğiniz her komut çöptür. Boru hattını boşaltıp baştan başlarsınız. 20 aşamalı bir boru hattında bu 20 boşa geçen döngü demektir. Yaklaşık **tüm komutların %20'sinin dal** olduğu göz önüne alınırsa (iş yükleri arasında şaşırtıcı derecede kararlı bir istatistik), %5'lik bir yanlış tahmin oranı bile her 100 komutta bir boru hattını boşalttığınız anlamına gelir — performans için yıkıcı.

Bu yüzden Prescott'un 31 aşamalı boru hattı bir felaketti. Yanlış tahmin cezası o kadar ağırdı ki daha yüksek saat hızları bunu telafi edemedi. Intel bu dersi acı bir şekilde öğrendi ve bir daha asla o kadar derine inmedi.

Modern dal tahmin edicileri, örüntü tanımanın harikaları — esasen donanımdaki küçük sinir ağları. Nasıl evrildiklerini görelim:

**Bimodal tahmin ediciler** (1990'ların başı) dal adresine göre endekslenmiş 2-bit doygunluk sayaçlarından oluşan bir tablo kullanırdı. Her sayaç şunları izler: kesinlikle alınmadı, zayıf alınmadı, zayıf alındı, kesinlikle alındı. Basit, ama ~%85-90 doğru.

**İki seviyeli uyarlamalı tahmin ediciler** (1991, Yale Patt ve Tse-Yu Yeh), dalların *diğer dalların geçmişiyle* korelasyon gösterdiğini gözlemledi. Son üç dal alındı-alındı-alınmadı olmuşsa, bu desen bu dalın ne yapacağını tahmin eder. Doğruluk ~%95'e sıçradı.

**TAGE (TAgged GEometric history length) tahmin edicileri** (2006, INRIA'dan André Seznec), günümüzün en ileri tekniğidir ve neredeyse tüm yüksek performanslı CPU'larda kullanılır. TAGE, farklı geçmiş uzunluklarına göre endekslenmiş birden fazla tahmin tablosu tutar — 4 dal geriye, 8 geriye, 16 geriye, 64 geriye, 512 geriye — geometrik olarak aralıklı. Tahmin edici tüm tablolara danışır ve en uzun eşleşen geçmişe sahip olanı kullanır. Bu, hem kısa hem de uzun desenleri zarif bir şekilde yakalar.

Apple'ın Firestorm ve daha yeni çekirdekleri, tahmini **%99,5-99,8** dal tahmini doğruluğuna ulaşır — yani her binde kabaca 2-5 dalı yanlış tahmin eder. AMD'nin Zen 4 ve Intel'in Raptor Lake'i **%99,0-99,5** aralığındadır. Yarım puanlık fark küçük görünür, ama gerçek iş yüklerinde ölçülebilir IPC (Döngü Başına Komut) avantajlarına dönüşür.

Tahmin ayrıca **dolaylı dalları** (hedef adresin kendisinin değişken olduğu durumlar — sanal fonksiyon çağrılarında ve switch ifadelerinde yaygın) ve **dönüş adreslerini** (donanımsal **Dönüş Adresi Yığını** veya RAS ile tahmin edilen, genellikle 16-64 giriş derinliğinde) ele almalıdır. Bunlardan herhangi birinin yanlış tahmini aynı maliyetli boşaltmayı tetikler.

Dal tahmininin karanlık bir sonucu: **Spectre** (Ocak 2018'de açıklandı). Araştırmacılar Jann Horn (Google Project Zero) ve Paul Kocher bağımsız olarak spekülatif yürütmenin — CPU'nun yanlış tahminden sonra bunu fark etmeden önce komutları yürütmesi — önbellekte gözlemlenebilir izler bıraktığını keşfetti. Bir saldırgan dal tahmin edicisini yanlış tahmin yapması için eğitebilir, CPU'nun spekülatif olarak gizli veriyi okumasına neden olur, bu önbellek durumunu değiştirir ve saldırgan bunu ölçebilir. Düzeltme, yazılım yamaları, mikrokod güncellemeleri ve yeni donanım engelleri gerektirdi; iş yüküne bağlı olarak toplam %2-8 performans kaybı oldu. Spectre, performans optimizasyonlarının güvenlik sonuçları olduğunu kanıtladı — endüstrinin hâlâ sindirdiği bir ders.

## Sıra Dışı Yürütme: Kontrollü Kaos

Son parça en hırslı olanıdır. Üç komutu düşünün:

```
A: r1 = load [adres1]    // önbellek ıskalamasında 300 döngü sürebilir
B: r2 = r1 + 5            // A'ya bağlı
C: r3 = r4 * r6           // A ve B'den bağımsız
```

Sıralı bir işlemci A'yı yürütür, ardından 300 döngü bekler, sonra B'yi, sonra C'yi yürütür. **Sıra dışı (OoO)** bir işlemci der ki: "A belleği bekliyor. C, A'ya bağlı değil. A'nın yüklemesi devam ederken C'yi *şimdi* yürüteyim." A'nın verisi geldiğinde B yürütülür. Toplam süre: ~302 yerine ~300 döngü. Bunu milyarlarca komut boyunca ölçeklendirin ve kazanımlar muazzamdır.

Çığır açan mimari, 1967'de IBM'de Robert Tomasulo'nun System/360 Model 91 için icat ettiği algoritmadır. Modern uygulamalar çok daha karmaşıktır, ancak temel fikirler aynı kalır:

**Yazmaç yeniden adlandırma.** CPU'nun komut seti 16 veya 32 mimari yazmaç belirtebilir, ama fiziksel yazmaç dosyası çok daha fazlasına sahiptir — Apple'ın M4 performans çekirdeklerinin tahminen **300+ fiziksel yazmacı** vardır. İşlemci, mimari yazmaçları fiziksel olanlara *yeniden adlandırır* ve sahte bağımlılıkları ortadan kaldırır. X komutu r1 yazmacına yazıyorsa ve daha sonra Y komutu da r1'e yazıyorsa, aslında çakışmazlar — X fiziksel yazmaç p47'ye, Y p112'ye yazar. Artık paralel yürütülebilirler.

**Yeniden Sıralama Tamponu (ROB).** Komutlar ROB'a program sırasında girer ve sıra dışı yürütülebilir, ama sıralı olarak **emekli olur** (sonuçlarını kesinleştirir). Bu, sıralı yürütme illüzyonunu korur. Yanlış tahmin edilmiş bir dal tespit edilirse, ROB'daki ondan sonraki her şey basitçe atılır. Intel'in Golden Cove'u (Alder Lake P-çekirdekleri) 512 girişli bir ROB'a sahiptir. Apple'ın Firestorm'u yaklaşık 630'dur. AMD'nin Zen 4'ü 320'dir.

**Rezervasyon istasyonları / Zamanlama.** Komutlar, operandları hazır olana kadar zamanlama kuyruklarında bekler. Veri geldiğinde (iletme yoluyla), zamanlayıcı onları yürütme birimlerine gönderir. Modern bir çekirdekte 6-10 yürütme portu olabilir: iki tam sayı ALU, iki kayan nokta/SIMD birimi, iki yükleme portu, bir depolama portu, bir dal birimi. Zamanlayıcının görevi bunların hepsini aynı anda meşgul tutmaktır.

Makinenin genişliği — döngü başına kaç komut işleyebildiği — kritik bir metriktir. Modern yüksek performanslı çekirdekler çözme aşamasında **6 genişlikli** (AMD Zen 4, Intel Golden Cove) veya **8 genişlikli** (Apple Firestorm) olup, her döngüde 6-8 komutu açar ve OoO motoruna gönderir. Apple'ın M4 performans çekirdeklerinin **10 genişlikli çözmeye** ulaştığı bildirilmektedir — herhangi bir ticari CPU'daki en geniş. Bu genişliği sürdürmek devasa tamponlar, geniş yazmaç dosyaları ve boru hattını dolu tutacak kadar doğru bir dal tahmin edicisi gerektirir.

Toplam "uçuş halindeki" komut penceresi — CPU'nun aynı anda idare ettiği komutlar — Apple'ın tasarımlarında **600-700 komuta** ulaşabilir. 700 topu havada tutan, her birinin belirli diğerlerine bağlı olduğu bir hokkabaz düşünün ve kontrol mantığının 3+ GHz'de ne yaptığını takdir etmeye başlarsınız.

## Her Şey Nasıl Bir Araya Geliyor

Kodunuz çalıştığında gerçekte neler olduğunu izleyelim:

1. **Dal tahmin edicisi** sonraki 20-30 komutluk kontrol akışını tahmin eder
2. **Getirme birimi** bu komutları **L1 komut önbelleğinden** okur (umarız isabet eder)
3. **Çözücü** döngü başına 6-10 komutu mikro-işlemlere (µop) çözer
4. **Yazmaç yeniden adlandırıcısı** fiziksel yazmaçlara eşleme yaparak sahte bağımlılıkları ortadan kaldırır
5. **Yeniden sıralama tamponu** her µop'a program sırasında bir yuva atar
6. **Rezervasyon istasyonları** µop'ları operandları hazır olana kadar tutar
7. **Zamanlayıcı** hazır µop'ları yürütme birimlerine gönderir — sıra dışı olarak
8. Sonuçlar fiziksel yazmaçlara yazılır ve bekleyen µop'lara iletilir
9. **ROB** tamamlanan µop'ları sıralı olarak emekli eder, mimari durumu günceller
10. Dal yanlış tahmini tespit edilirse, sonrasındaki her şey boşaltılır ve 1. adımdan yeniden başlanır

Tüm bunlar saniyede **milyarlarca kez** olur, kendisi yüz milyonlarca transistörden oluşan kontrol mantığı tarafından orkestra edilir. Gerçek aritmetiği yapan yürütme birimleri, modern bir çekirdeğin transistör bütçesinin küçük bir kısmıdır — belki %5-10. Geri kalanı tahmin, zamanlama, tamponlama ve defter tutmadır. CPU bir hesap makinesi olmaktan çok, arada sırada matematik yapan ayrıntılı bir lojistik operasyonudur.

## Genişlik - Frekans Ödünleşimi

Bu bizi temel bir mimari gerilime getirir. Daha fazla performans elde edebilirsiniz:

1. **Saati yükselterek** — saniyede daha fazla döngü (ama güç, dinamik güç nedeniyle frekansın küpüyle ölçeklenir ve daha derin boru hatları yanlış tahmin cezalarını artırır)
2. **Daha geniş giderek** — döngü başına daha fazla komut (ama karmaşıklık genişlikle kabaca karesel olarak ölçeklenir, çünkü her yeni komut uçuştaki diğer tüm komutlara karşı bağımlılıkları kontrol etmelidir)

Intel tarihsel olarak frekansı tercih etti (Pentium 4 2004'te 3,8 GHz'e ulaştı). Apple genişliği tercih eder (Firestorm 8-10 genişlikli ama "sadece" 3,5-4,5 GHz'de çalışır). AMD'nin Zen'i farkı paylaştırır. Her yaklaşımın iş yüküne ve güç bütçesine bağlı avantajları vardır.

Apple'ın avantajı kısmen üretimdendir: TSMC'nin 3nm'deki N3E süreci, dev önbellekler ve devasa tamponlarla birlikte aşırı geniş çekirdekler inşa etmek için transistör bütçesi verir. Telefonunuz termal olarak kısıtlanmadığında (kısa patlamalar), bu genişlik çarpıcı tek iş parçacığı performansı sunar. Apple'ın M4'ü, gücün çok az bir kısmını tüketirken birçok kıyaslamada masaüstü x86 çekirdeklerini yakalıyor veya geçiyor — tam da genişliğin marjda frekanstan daha güç verimli olması nedeniyle.

## Önemli Sayılar

Modern bir amiral gemisi çekirdeğine somut sayılar koyalım — AMD'nin Zen 5'i (Ryzen 9000 serisi, 2024):

- **Çözme genişliği:** Döngü başına 6 µop (birleştirilmiş 2 boru hattından 4'er)
- **ROB boyutu:** 448 giriş
- **Fiziksel yazmaçlar:** ~224 tam sayı, ~192 FP/vektör
- **L1I önbellek:** 32 KB, 8 yollu
- **L1D önbellek:** 48 KB, 12 yollu
- **L2 önbellek:** Çekirdek başına 1 MB, 16 yollu
- **L3 önbellek:** CCD başına 32 MB (8 çekirdek)
- **Dal tahmini:** TAGE tabanlı, %96+ doğruluk (Zen 5'te iyileştirilmiş)
- **Yürütme portları:** 6 (2 ALU + 2 AGU + 2 FP/SIMD, basitleştirilmiş)
- **Saat hızı:** Boost'ta 5,7 GHz'e kadar
- **Zen 4'e göre IPC iyileştirmesi:** ~%16

Bu %16'lık IPC kazancı tek bir değişiklikten değil, düzinelerce küçük iyileştirmeden gelir: daha geniş pencereler, daha iyi tahmin, daha hızlı önbellek erişimi, geliştirilmiş ön-getirme. Modern CPU mimarisi, azalan getiriler sanatıdır — her nesil %10-20 için savaşır çünkü kolay kazanımlar onlarca yıl önce yakalanmıştır.

## İleriye Bakış

Yarın sıralı işleme dünyasını tamamen terk edip soruyoruz: ya tek bir çekirdeği gerçekten hızlı yapmak yerine *binlerce* daha basit çekirdek yapsaydınız? Bu, GPU mimarisi hikâyesidir — NVIDIA'nın H100'ünün neden 16.896 CUDA çekirdeği olduğu, neden bunların her birinin bir CPU çekirdeğinden çok daha zayıf olduğu ve belirli iş yükleri (grafik, yapay zekâ, bilimsel hesaplama) için bu yoğun paralel yaklaşımın neden yalnızca daha hızlı değil *temelden daha verimli* olduğu. Cevap, gecikme odaklı ve verim odaklı tasarım arasındaki farkta yatar — ve hesaplama hakkındaki düşüncelerinizi değiştirecek.

---

<div style="margin-top: 2em; padding: 1.5em; border: 2px solid #4a9eff; border-radius: 8px; background: #f0f7ff;">

## 📝 Sınav Zamanı

Bugünkü sınavla CPU mimarisi hakkındaki bilginizi test edin:

<a href="quizzes/gun-16.toml" class="quiz-embed">Sınava Başla</a>

</div>
