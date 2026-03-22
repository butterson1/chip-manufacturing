# Gün 20: RISC-V — ARM ve x86'ya Meydan Okuyan Açık Kaynak Komut Seti

*UC Berkeley'de bir yüksek lisans öğrencisinin ders projesi, hesaplama tarihindeki en önemli mimari isyana dönüştü. RISC-V sadece başka bir ISA değil — komut setinin hava kadar özgür olması ve açıklığın eninde sonunda onlarca yıllık tescilli bağımlılığı yenmesi üzerine bir bahistir.*

---

## Berkeley İsyanı

2010 yazında Krste Asanović'in bir sorunu vardı. UC Berkeley EECS bölümünde profesör olan Asanović'in, lisansüstü bilgisayar mimarisi dersi için temiz, modern bir komut seti mimarisine ihtiyacı vardı. Öğrencilerin bir dönemde sıfırdan uygulayabilecekleri gerçek, pratik bir ISA — oyuncak değil. Ama mevcut her seçenek sorunluydu.

x86 mi? Intel'in komut seti, dört on yılda biriken 1.500'den fazla komutla geriye dönük uyumluluğun yayılan Gotik katedrali haline gelmişti. Kodlama değişken uzunluklu, düzensiz ve tarihsel tuhaflıklarla doluydu — bazı komutlar yalnızca 1972'deki 8008 ile uyumluluğu korumak için vardı. Hiçbir öğrenci bir dönemde makul bir x86 çekirdeği uygulayamazdı. ARM daha temizdi ama tescilliydi: yalnızca mimari spesifikasyonunun lisansı ("mimari lisansı") peşin 5-15 milyon dolar artı çip başına %1-2 telif hakkı gerektiriyordu. Klasik RISC öğretim mimarisi olan MIPS, Berkeley'in kendi David Patterson'ından gelse de patentler ve kurumsal sahiplikle kuşatılmıştı. SPARC ölmekteydi. PowerPC solmaktaydı. Her ISA ya çok karmaşık, ya çok pahalı ya da kurumsal çıkarlara çok bağlıydı.

Böylece Asanović, lisansüstü öğrencileri Yunsup Lee ve Andrew Waterman ile birlikte, ve efsanevi David Patterson'ın da (RISC'in mucit ortağı ve bilgisayar mimarisi *üzerine* ders kitabının yazarı) katılımıyla yeni bir tane tasarlamaya karar verdiler. Mayıs 2010'da başladılar. Ağustosa kadar çalışan bir spesifikasyonları vardı. Adını RISC-V — "risk-beş" koydular, 1980'lerdeki RISC-I'den RISC-IV'e kadar Berkeley'in RISC mimari soyundaki beşinci nesil.

O yaz yarattıkları şey, 15 yıl içinde yılda **on milyarlarca çipte** kullanılacak ve tüm yarı iletken endüstrisini yeniden şekillendirme tehdidinde bulunacaktı.

---

## Bir ISA Nedir ve Neden Önemlidir?

RISC-V'in tasarımına dalmadan önce, bir komut seti mimarisinin gerçekte ne *olduğunu* anlamaya değer — çünkü bu, tüm hesaplamadaki en etkili soyutlamalardan biridir.

ISA, **donanım ile yazılım arasındaki sözleşmedir**. Bir işlemcinin yürütebileceği komutları (topla, yükle, dallan, çarp), yazılımın kullanabileceği yazmaçları, bellek modelini ve istisna ve kesmelerinin nasıl çalıştığını tanımlar. Kritik olarak, uygulama *değildir*. Aynı ISA, 100 MHz'de çalışan küçücük bir mikrodenetleyici olarak veya 5 GHz'de çalışan süper skalar sıra dışı bir canavar olarak uygulanabilir. ISA, işlemcinin *ne* yaptığını tanımlar; mikromimari *nasıl* yaptığını tanımlar.

ISA'ların bu kadar yapışkan olmasının nedeni budur. Bir ISA etrafında bir ekosistem oluştuğunda — derleyiciler, işletim sistemleri, uygulama ikili dosyaları, geliştirici bilgisi — geçiş maliyetleri devasa hale gelir. x86 1978'den beri hayatta kalmıştır, çünkü iyi bir tasarım olduğundan değil (modern standartlara göre kesinlikle öyle değil) ama tüm PC yazılım ekosisteminin ağırlığı üzerinde oturduğundan. ARM, 2007'de iPhone'dan beri mobilde hâkim olmuştur, x86'yı bir telefonda çalıştırmanın teknik olarak imkânsız olduğundan değil (Intel Atom ile denedi ve teknik nedenler kadar ticari nedenlerle başarısız oldu) ama ARM ekosisteminin mobil yazılım yığınını çoktan ele geçirmiş olmasından.

Bu yapışkanlık doğal bir düopol yaratır: PC'ler ve sunucular için x86 (Intel ve AMD), mobil ve giderek daha fazla her yer için ARM (SoftBank'a ait ARM Holdings tarafından lisanslanır). Bu iki ISA, 550+ milyar dolarlık işlemci pazarının özünde %100'ünü oluşturur. Diğer herkes dışarıda kalmıştı.

RISC-V kapıyı açana kadar.

---

## Tasarım: Özellik Olarak Radikal Sadelik

RISC-V'in tasarım felsefesi tek bir cümlede özetlenebilir: **daha azını yap, ama temiz yap ve insanların ihtiyaç duyduklarını eklemelerine izin ver.** RV32I adlı temel tam sayı ISA'sı yalnızca **47 komut** içerir. Hepsi bu. Kırk yedi komut, eksiksiz, genel amaçlı bir bilgisayar tanımlamak için. Karşılaştırma olarak, ARMv8-A'nın kabaca 400 temel komutu vardır ve x86-64'ün 1.500'den fazlası.

Bu 47 komut tam sayı aritmetiği (toplama, çıkarma, kaydırma, karşılaştırma), bellek erişimi (birkaç adresleme moduyla yükleme ve depolama), kontrol akışı (dallanma ve atlamalar) ve sistem işlemlerini (ortam çağrıları ve kesme noktaları) kapsar. Kodlama son derece düzenlidir: tüm komutlar 32 bit genişliğindedir, işlem kodu her zaman aynı bit konumlarında, kaynak ve hedef yazmaç alanları her zaman aynı konumlarda ve anlık değerler donanım işaret uzantısını basitleştirmek için düzenlenmiştir. RISC-V çözücüsü uygulayan bir donanım mühendisi bunu birkaç yüz satır Verilog'la yapabilir. Bir x86 çözücüsü on binlerce satır gerektirir ve genellikle kendi boru hattı aşamasını oluşturur.

Ama işin zekice kısmı şu: RISC-V ilk günden **modüler** bir ISA olarak tasarlandı. Temel RV32I (veya 64-bit kardeşi RV64I) temeldir ve diğer her şey her biri tek bir harfle tanımlanan standart uzantılar olarak gelir:

- **M** — Tam sayı çarpma/bölme (8 komut)
- **A** — Çok çekirdekli için atomik bellek işlemleri (11 komut)
- **F** — Tek duyarlıklı kayan nokta (26 komut)
- **D** — Çift duyarlıklı kayan nokta (26 komut)
- **C** — Sıkıştırılmış komutlar (kod yoğunluğu için 16-bit kodlama)
- **V** — Vektör işlemleri (RISC-V'in SIMD'ye yanıtı)

"RV64GC" kombinasyonu (G, IMAFD'nin kısaltması) Linux çalıştıran bir uygulama işlemcisinde bulacağınız şeydir — kabaca ARM Cortex-A çekirdeklerinin sunduğuna eşdeğer. Ama küçücük bir gömülü denetleyici yalnızca RV32I veya RV32IMC uygulayarak binlerce mantık kapısı tasarruf edebilir. Alana özgü bir yapay zekâ hızlandırıcısı, matris işlemleri için özel uzantılarla birlikte RV32IM uygulayabilir. Bu modülerlik, aynı ISA'nın 0,03$'lık bir mikrodenetleyiciden veri merkezi CPU'suna kadar ölçeklenmesi anlamına gelir.

Ve sonra **özel uzantı alanı** var. RISC-V, kodlama alanının cömert bir kısmını — her biri milyarlarca olası komut kodlamasını kapsayan dört işlem kodu — kullanıcı tanımlı uzantılar için ayırır. Herhangi bir şirket, standartla veya başkasının uzantılarıyla çakışmadan kendi özel kullanım durumu için (kriptografi, sinyal işleme, makine öğrenmesi) tescilli komutlar ekleyebilir. Bu mimari olarak benzersizdir. Bir çip tasarımcısının standart, iyi desteklenen bir ISA'nın avantajları *ve* özel komutların performans avantajlarına sahip olabileceği anlamına gelir — 5-15 milyon dolarlık ARM mimari lisansı olmadan ve sıfırdan tam bir ISA tasarlamadan.

---

## Ekosistem Patlaması

Teknik olarak zarif bir ISA, yazılım olmadan değersizdir. Birçok ISA rakibinin öldüğü yer burasıdır — Itanium'un arkasında milyarlarca dolar vardı ve yine de kısmen yazılım ekosistemi hiçbir zaman olgunlaşmadığı için başarısız oldu. RISC-V'in avantajı baştan açık olmasıydı, bu da tescilli bir ISA için imkânsız olacak bir ekosistem çarkını tetikledi.

**RISC-V International** vakfı (ilk adıyla RISC-V Foundation, 2020'de jeopolitik tarafsızlığı sağlamak için İsviçre'ye yeniden yapılandırılıp taşındı) artık 70'ten fazla ülkede **3.600'den fazla üye kuruluşa** sahiptir; neredeyse her büyük yarı iletken şirketi dahil: NVIDIA, Google, Qualcomm, Samsung, Intel (evet, Intel), Huawei, Alibaba ve yüzlercesi daha. ISA spesifikasyonunun kendisi Creative Commons lisansı altında yayınlanmıştır — herkes okuyabilir, uygulayabilir ve buna dayalı çipler satabilir, **sıfır lisans ücreti ve sıfır telif hakkıyla**.

Yazılım yığını kritik kütleye ulaştı. **GCC** ve **LLVM/Clang**'ın her ikisinin de olgun RISC-V arka uçları var. **Linux**, çekirdek 5.17'den (2022) beri RISC-V'i birinci sınıf bir mimari olarak destekliyor. **Android** RISC-V desteği Google tarafından 2023'te duyuruldu ve aktif olarak geliştiriliyor. **Debian**, **Fedora**, **Ubuntu** ve **FreeBSD** hepsinin RISC-V portları var. Hatta **Chrome/Chromium** bile RISC-V üzerinde çalışıyor. Önceki ISA rakiplerini öldüren araç zinciri açığı büyük ölçüde kapatıldı.

Donanım tarafında yayılma şaşırtıcı. 2026 başı itibarıyla, RISC-V çekirdekleri yılda tahmini **16+ milyar çipte** kullanılıyor, ağırlıklı olarak gömülü ve IoT uygulamalarında. En büyük hacim sürücüsü? **Çin**. ABD'nin ileri çip ihracatına yönelik teknoloji kısıtlamaları, RISC-V'i Çinli şirketler için stratejik olarak vazgeçilmez kıldı. Tek bir kuruluş RISC-V'i kontrol etmediğinden (ARM'ın aksine, burada ARM Holdings hükümetler tarafından lisansları iptal etmesi için baskı altına alınabilir), tasarım gereği yaptırımlara dayanıklıdır. **Alibaba'nın T-Head**'i (2023'te açık kaynaklı hale getirilen yüksek performanslı RISC-V çekirdeği Xuantie C910'u tasarlayan), **StarFive** (JH7110 SoC'si RISC-V tek kart bilgisayarlarını güçlendiren) gibi şirketler ve onlarca diğeri RISC-V üzerinde tam ürün hatları inşa ediyor.

---

## Performans Sorusu: RISC-V Zirvede Rekabet Edebilir mi?

İşte işlerin ilginçleştiği yer — ve yanlış anlamaların bol olduğu yer. Eleştirmenler sıklıkla RISC-V'in yüksek performanslı hesaplamada x86 veya ARM ile boy ölçüşemeyeceğini savunur. Bu, bir ISA'nın ne olduğunu temelden yanlış anlamaktır.

**Bir ISA performansı belirlemez.** Mikromimari belirler. Aynı RISC-V ISA, sıralı, tek dağıtımlı bir boru hattı olarak uygulanırsa yavaş olur. Geniş, sıra dışı, spekülatif, çok GHz'lik, devasa önbellekli ve gelişmiş dal tahmin edicili bir makine olarak uygulanırsa her şeyle rekabet edebilir. ISA komut setini tanımlar; mühendislik ekibi ve transistör bütçesi hızı belirler.

Tarihsel emsal düşünün: 2000'lerin başında ARM çekirdekleri özellikli telefonlar ve mikrodenetleyiciler için basit, yavaş, güç verimli çiplerdi. Kimse onları x86 sunucu işlemcileriyle ciddi rakipler olarak görmüyordu. Sonra Apple mikromimari geliştirmeye milyarlarca dolar döktü ve 2020'de M1 çipi, hem performans hem verimlilik açısından Intel'in dizüstü işlemcilerini ezdi — ARM ISA üzerinde. ISA değişmedi. Uygulama mühendisliği değişti.

RISC-V aynı yörüngede, sadece daha erken aşamada. **SiFive'ın P870**'i (2024'te duyuruldu) TSMC N5'te 3+ GHz hedefleyen 4 genişlikli sıra dışı süper skalar bir çekirdek olup ARM Cortex-A720 ile rekabetçi performans projeksiyonlarına sahip. **Ventana Micro'nun Veyron V2**'si sunucu iş yükleri için tasarlanmış, tutarlı çok soketli destekli veri merkezi sınıfı RISC-V çekirdeği olup SPECint performansının AMD EPYC'in menzilinde olduğu iddia ediliyor. Efsanevi CPU mimarı Jim Keller (AMD K8, Apple A serisi ve AMD Zen'in arkasındaki isim) tarafından kurulan **Tenstorrent**, RISC-V tabanlı yapay zekâ işlemcileri ve genel amaçlı çekirdekler inşa ediyor; Ascalon çekirdekleri yüksek performanslı hesaplamayı hedefliyor.

En iddialı çaba **Avrupa İşlemci Girişimi (EPI)** olabilir — Avrupa süper bilgisayarları için RISC-V tabanlı işlemciler geliştiriyor. EPAC (Avrupa İşlemci Hızlandırıcı) test çipleri GlobalFoundries 22nm FDX'te tape-out edildi ve ileri düğümlere geçiş planları var. Hedef: kıtanın Amerikan ve Asya çip mimarilerine bağımlılığını azaltan Avrupa tasarımı, açık ISA'lı işlemciler.

Ama belki de en şaşırtıcı performans verileri beklenmedik bir yönden geliyor. **Esperanto Technologies**, **1.000'den fazla RISC-V çekirdeği** içeren ET-SoC-1 adlı bir çip inşa etti — değiştirilmiş RV64GCV (vektör uzantılarıyla) tabanlı küçük, verimli ET-Minion çekirdekleri artı dört güçlü ET-Maxion yönetim çekirdeği. TSMC 7nm'de üretilen çip, yoğun paralelliğin tek iş parçacığı hızından daha önemli olduğu makine öğrenmesi çıkarımı iş yüklerini hedefledi. RISC-V'in mimari güçlerini kullanarak iş yüküne özgü performansta rekabetçi olabileceğini gösterdi.

---

## Özel Uzantı Süper Gücü

RISC-V'in gerçek yıkıcı yönü ücretsiz olması değildir (bu çok yardımcı olsa da). **Genişletilebilir** olmasıdır. Ve mimari, lisans maliyetinin önemsiz olduğu senaryolarda bile ARM'ı nihayetinde geçebileceği yer burasıdır.

5G baz bandı işleme için çip inşa eden bir şirket düşünün. ARM ile ARM ISA'sını alırsınız — ya alın ya bırakın. ARM çekirdeğinin *yanına* özel hızlandırıcılar inşa edebilir ve bellek eşlemeli G/Ç aracılığıyla iletişim kurabilirsiniz, ama çekirdeğin kendisi standart ARM komutları çalıştırır. RISC-V ile FFT'ler, LDPC çözme veya ışın şekillendirme için özel komutları doğrudan işlemci boru hattına ekleyebilirsiniz. Veri, ayrı bir hızlandırıcıya aktarma ve geri alma gideri olmadan yazmaç dosyası üzerinden akar. Bu, alana özgü iş yükleri için standart ISA'lı harici hızlandırıcılara kıyasla **2-10 kat performans iyileştirmesi** sağlayabilir.

**Qualcomm**'un modem DSP'leri için özel uzantılı RISC-V'i araştırdığı bildiriliyor. **Western Digital** 2019'da tüm gömülü çekirdeklerini — yılda **iki milyardan fazla çekirdek** — kısmen özel uzantıların depolama denetleyici iş yükleri için optimizasyona olanak tanıması nedeniyle tescilli mimarilerden RISC-V'e geçirdiğini duyurdu. **NVIDIA**, GPU tasarımlarında mikrodenetleyici olarak RISC-V çekirdekleri kullanıyor (GeForce GPU'lardaki falcon mikrodenetleyici 2020 civarından itibaren RISC-V çekirdekleriyle değiştirildi). **Google**, Titan güvenlik çiplerinde RISC-V kullanıyor.

Özel uzantı modeli büyüleyici bir gerilim yaratır: standardizasyon karşısında uzmanlaşma. Google'ın özel yapay zekâ uzantılarına sahip bir RISC-V çekirdeği, Qualcomm'un 5G uzantılarını çalıştıranla ikili uyumlu değildir. Ama *temel* ISA standarttır, bu nedenle işletim sistemi, derleyiciler ve standart kütüphaneler her yerde çalışır. Özel uzantılar, bunları desteklemeyen çekirdeklerde yakalanan ve (yavaşça) emüle edilebilen belirli işlem kodları aracılığıyla çağrılır. Çip tasarımcılarına istedikleri özelleştirmeyi verirken standardizasyonun ekosistem avantajlarını koruyan pragmatik bir orta yoldur.

---

## Şaşırtıcı Sezgiye Aykırı Gerçek: ISA Neredeyse Önemsiz (Ve RISC-V'in Kazanma Nedeni Budur)

İşte RISC-V hikâyesinin kalbindeki paradoks: on yıllar süren bilgisayar mimarisi araştırması, **ISA'nın işlemci performansı ve verimliliği üzerinde minimum etkiye sahip olduğunu** göstermiştir. Eşdeğer sınıf uygulamalarını ISA'lar arasında karşılaştıran çalışmalar, tipik olarak %5-15'lik performans farkları gösterir — mikromimari seçimleri, bellek alt sistemi tasarımı ve derleyici optimizasyon kalitesinin gürültüsü dahilinde. Apple'ın ARM çipleri Intel'in x86 çiplerini ARM daha iyi bir ISA olduğu için yenmez; Apple'ın mikromimari ekibi olağanüstü olduğu ve Apple silikondan yazılıma tam yığını kontrol ettiği için yener.

ISA performans için neredeyse önemsizse, ne için *önemlidir*? **Maliyet, özgürlük ve esneklik.** Ve her üç boyutta da RISC-V yapısal olarak avantajlıdır.

**Maliyet:** ARM mimari lisansları 5-15 milyon dolar, artı çip başına %1-2 telif hakkı maliyetlidir. 10$ ortalama satış fiyatıyla 100 milyon çip gönderen bir şirket için bu, yalnızca telif haklarında yılda 10-20 milyon dolar demektir — tam bir tasarım ekibini finanse edebilecek para. RISC-V: 0$. Bu, 0,50$'lık bir mikrodenetleyicinin anlamlı birim başı telif hakları kaldıramayacağı alt uçta ve pahalı veri merkezi çiplerindeki telif haklarının yüz milyonları bulduğu üst uçta muazzam önem taşır.

**Özgürlük:** ARM ile çekirdek teknolojiniz için tek bir şirkete (SoftBank'a ait ARM Holdings) bağımlısınız. Lisans koşullarını değiştirirlerse, bir rakip tarafından satın alınırlarsa (NVIDIA 2020-2022'de denedi, düzenleyiciler engelledi) veya jeopolitik kısıtlamalarla karşılaşırlarsa, tüm ürün hattınız risk altındadır. RISC-V'in binlerce üyeli İsviçre merkezli bir vakıf aracılığıyla yönetişimi, kısıtlamayı esasen imkânsız kılar.

**Esneklik:** Özel uzantı modeli, her şirketin ISA'nın tamamını tasarlamadan kendi iş yüküne göre optimize etmesini sağlar. "Herkese uyan tek beden" genel amaçlı CPU'nun yerini alana özgü mimarilere bırakmasıyla bu giderek daha önemli hale geliyor.

---

## RISC-V Bugün Nerede — Ve Nereye Gidiyor

2026 başı itibarıyla RISC-V'in pazar konumu kabaca ARM'ın 2005'teki konumuna benziyor: gömülüde baskın, orta menzil uygulama işlemcilerinde zemin kazanıyor ve üst uçta ciddi çabalar sergiliyor. Benzerlikler öğreticidir.

**Gömülü/mikrodenetleyici** pazarı zaten kazanılmıştır. SiFive (E serisi), Andes Technology (N serisi) gibi şirketlerden ve sayısız Çinli tedarikçiden gelen RISC-V çekirdekleri, milyarlarca IoT cihazında, akıllı kartta, sensörde ve tüketici elektroniğinde ARM Cortex-M'in yerini almıştır. En alt uçta — 0,10$'lık çiplerdeki gerçekten küçük çekirdekler — RISC-V'in sıfır telif modeli bariz tercih yapar.

**Uygulama işlemcileri** (telefonlar, dizüstü bilgisayarlar, tek kart bilgisayarlar) aktif savaş alanıdır. **SiFive HiFive Unmatched** ve **StarFive VisionFive 2** kartları tam Linux çalıştırır ama performansı kabaca ARM Cortex-A55 sınıfıyla karşılaştırılabilir düzeydedir — geliştirme ve niş uygulamalar için yeterli ama ana akım tüketici cihazları için değil. Yeni nesil çekirdekler (SiFive P870, Ventana V2) Cortex-A720+ performansını hedefliyor, bu da RISC-V'i Android akıllı telefonlar ve Chromebook'lar için gerçekten rekabetçi kılacaktır. Google'ın Android RISC-V desteğine yatırımı bu geleceği planladıklarının sinyalidir.

**Veri merkezi ve yüksek performanslı hesaplama** sınır bölgesi olarak kalmaya devam ediyor. Henüz hiçbir RISC-V çipi, ölçekte en son AMD EPYC veya Intel Xeon ile rekabetçi performans göstermemiştir, ancak yatırımlar hızlanıyor. Tenstorrent'ın yol haritası, Avrupa İşlemci Girişimi ve birden fazla Çin devlet destekli çaba, hepsi önümüzdeki 2-3 yıl içinde sunucu sınıfı RISC-V'i hedefliyor.

En ilgi çekici olasılık, RISC-V'in ARM ve x86'yı doğrudan ikame ederek değil, eski lisans modeli altında var olamayacak **tamamen yeni çip kategorilerini mümkün kılarak** başarılı olmasıdır. ISA ücretsiz ve genişletilebilir olduğunda, özel bir işlemci yaratmanın önündeki engel on milyonlarca dolardan bir mühendislik ekibi ve birkaç EDA lisansının maliyetine düşer. ARM mimari lisansını karşılayamayacak girişimler RISC-V çipi tape-out edebilir. Üniversiteler araştırma için gerçek işlemciler tasarlayıp üretebilir. Yarı iletken egemenliği arayan ülkeler, bir İngiliz-Japon şirketin iznine bağlı kalmadan yerli çip ekosistemleri inşa edebilir.

Devrim, RISC-V'in daha iyi olması değildir. RISC-V'in *bedava* olmasıdır — ve teknolojide bedava eninde sonunda kazanır.

---

## Sırada Ne Var

Yarın **güç duvarıyla** yüzleşeceğiz — saat hızlarını artık öylece kısamayacağımızın temel termodinamik nedeni. **Güç ve Termal: Neden Saati Artıramıyoruz**, Dennard ölçeklemenin ölümünü, kaçak akımın fiziğini, karanlık silikonu ve termodinamiğin demir kurallarına rağmen performansı artırmaya devam eden yaratıcı mühendislik hilelerini (gerilim-frekans ölçeklemeden yongacık mimarilerine kadar) keşfediyor.

---

<div class="quiz-placeholder" data-quiz-path="quizzes/gun-20.toml" data-quiz-day="20"></div>
