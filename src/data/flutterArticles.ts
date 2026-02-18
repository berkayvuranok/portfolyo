export type ContentBlock =
  | { type: "h2"; content: string }
  | { type: "h3"; content: string }
  | { type: "p"; content: string }
  | { type: "code"; content: string; language?: string };

export interface FlutterArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  emoji: string;
  content: ContentBlock[];
}

export const flutterArticles: FlutterArticle[] = [
  {
    id: "flutter-nedir",
    title: "Flutter Nedir? Neden Tercih Edilir?",
    excerpt: "Flutter'ın ne olduğu, tek kod tabanıyla nasıl mobil ve masaüstü uygulama geliştirdiğinizi öğrenin.",
    category: "Temel",
    emoji: "📱",
    content: [
      { type: "h2", content: "Flutter Nedir?" },
      {
        type: "p",
        content:
          "Flutter, Google'ın geliştirdiği açık kaynaklı bir UI (kullanıcı arayüzü) araç setidir. Tek bir kod tabanıyla iOS, Android, web ve masaüstü uygulamaları yazabilirsiniz. Yani bir kez kod yazarsınız, aynı projeyi telefon, tablet ve bilgisayarda çalıştırırsınız.",
      },
      { type: "h3", content: "Neden Flutter?" },
      {
        type: "p",
        content:
          "React Native veya Xamarin gibi alternatiflerde ekranlar büyük oranda native bileşenlerle çizilir. Flutter ise kendi çizim motorunu (Skia) kullanır. Bu sayede her platformda birebir aynı görünümü elde edersiniz; tasarım tutarlılığı ve hızlı render performansı sağlar.",
      },
      { type: "h3", content: "İlk Flutter Uygulaması" },
      {
        type: "p",
        content: "Yeni bir proje oluşturup çalıştırmak için terminalde:",
      },
      {
        type: "code",
        content: "flutter create benim_uygulamam\ncd benim_uygulamam\nflutter run",
        language: "bash",
      },
      {
        type: "p",
        content:
          "flutter run dediğinizde bağlı cihaz veya emülatörde uygulama açılır. Özetle: Flutter = tek dil (Dart) + tek kod tabanı + her platform.",
      },
    ],
  },
  {
    id: "dart-giris",
    title: "Dart Diline Giriş",
    excerpt: "Dart'ın sözdizimi, değişkenler, fonksiyonlar ve sınıflar — Flutter için gerekli temeller.",
    category: "Temel",
    emoji: "🎯",
    content: [
      { type: "h2", content: "Dart Nedir?" },
      {
        type: "p",
        content:
          "Dart, Flutter'ın kullandığı programlama dilidir. C# veya Java'ya benzer; sınıf tabanlı, tip güvenli ve hem derlenip (AOT) hem de yorumlanabilir (JIT). Flutter ile uygulama yazarken tüm iş mantığınızı Dart ile yazarsınız.",
      },
      { type: "h3", content: "Değişkenler ve Tipler" },
      {
        type: "p",
        content:
          "Dart'ta tip yazabilir veya tipi var anahtar sözcüğüyle derleyiciye bırakabilirsiniz. final ve const ile değişmeyen değerler tanımlanır:",
      },
      {
        type: "code",
        content: `// Tip açık
String isim = "Berkay";
int yas = 25;

// Tip çıkarımı (var)
var mesaj = "Merhaba";

// Değişmeyen değerler
final String sabitIsim = "Flutter";
const int maxSayi = 100;`,
        language: "dart",
      },
      { type: "h3", content: "Fonksiyonlar" },
      {
        type: "p",
        content: "Fonksiyonlar tanımlanırken parametre ve dönüş tipi isteğe bağlıdır:",
      },
      {
        type: "code",
        content: `// Klasik fonksiyon
int topla(int a, int b) {
  return a + b;
}

// Kısa (arrow) fonksiyon
int carp(int a, int b) => a * b;

// İsteğe bağlı parametreler
void selamla(String isim, [String unvan = "Değerli"]) {
  print("\$unvan \$isim");
}
selamla("Berkay");        // "Değerli Berkay"
selamla("Berkay", "Mr."); // "Mr. Berkay"`,
        language: "dart",
      },
      { type: "h3", content: "Sınıflar (Classes)" },
      {
        type: "p",
        content: "Flutter'da her şey widget; widget'lar da sınıflardan türer. Basit bir sınıf örneği:",
      },
      {
        type: "code",
        content: `class Kullanici {
  final String ad;
  final int yas;
  
  Kullanici({required this.ad, required this.yas});
  
  void tanit() => print("Ben \$ad, \$yas yaşındayım.");
}

var k = Kullanici(ad: "Berkay", yas: 25);
k.tanit();`,
        language: "dart",
      },
    ],
  },
  {
    id: "widget-agaci",
    title: "Widget'lar ve Widget Ağacı",
    excerpt: "Her şey widget'tır: Container, Column, Row ve widget ağacı kavramı.",
    category: "UI",
    emoji: "🌳",
    content: [
      { type: "h2", content: "Widget Nedir?" },
      {
        type: "p",
        content:
          "Flutter'da ekranda gördüğünüz her şey bir widget'tır: buton, metin, resim, liste, sayfa... Widget'lar birbirinin içine yerleştirilerek ağaç yapısı oluşturur. Bu yapıya \"widget tree\" denir.",
      },
      { type: "h3", content: "Temel Yerleşim Widget'ları" },
      {
        type: "p",
        content:
          "Column dikey, Row yatay sıralar. Container ise padding, margin, renk gibi özellikler vermek için kullanılır:",
      },
      {
        type: "code",
        content: `Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    Text("Başlık", style: TextStyle(fontSize: 24)),
    SizedBox(height: 16),
    Row(
      children: [
        ElevatedButton(onPressed: () {}, child: Text("Evet")),
        SizedBox(width: 8),
        OutlinedButton(onPressed: () {}, child: Text("Hayır")),
      ],
    ),
  ],
)`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "SizedBox boşluk eklemek için idealdir. mainAxisAlignment ve crossAxisAlignment ile elemanların hizasını ayarlarsınız.",
      },
      { type: "h3", content: "StatelessWidget vs StatefulWidget" },
      {
        type: "p",
        content:
          "StatelessWidget: içinde değişen veri yok (örn. sabit metin, statik liste). StatefulWidget: kullanıcı etkileşimi veya veri değişince ekranın güncellenmesi gerekir (örn. sayaç, form). State, değişen veriyi tutar ve setState ile güncelleme tetiklenir.",
      },
    ],
  },
  {
    id: "state-yonetimi",
    title: "State Yönetimi: setState, Provider, Riverpod",
    excerpt: "Uygulama durumunu nasıl yönetiriz? setState'ten state management kütüphanelerine.",
    category: "State",
    emoji: "🔄",
    content: [
      { type: "h2", content: "State (Durum) Nedir?" },
      {
        type: "p",
        content:
          "State, uygulamanın o anki \"durumu\"dur: kullanıcı adı, sepet sayısı, tema (açık/koyu) gibi. Bu veri değiştiğinde ilgili widget'ların yeniden çizilmesi gerekir.",
      },
      { type: "h3", content: "setState ile Yerel State" },
      {
        type: "p",
        content:
          "Sadece tek bir ekranda kullanılan, basit veri için StatefulWidget içinde setState yeterlidir:",
      },
      {
        type: "code",
        content: `class SayaçSayfasi extends StatefulWidget {
  @override
  State<SayaçSayfasi> createState() => _SayaçSayfasiState();
}

class _SayaçSayfasiState extends State<SayaçSayfasi> {
  int sayac = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text("Tıklanma: \$sayac"),
        ElevatedButton(
          onPressed: () {
            setState(() => sayac++);
          },
          child: Text("Artır"),
        ),
      ],
    );
  }
}`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "setState içinde state değişince Flutter build metodunu tekrar çalıştırır ve ekran güncellenir.",
      },
      { type: "h3", content: "Provider ile Global State" },
      {
        type: "p",
        content:
          "Birden fazla sayfada veya widget'ta kullanılacak veriyi (örn. giriş yapmış kullanıcı) Provider ile üst seviyede tutar, aşağıdaki widget'lar Provider.of veya context.watch ile dinler:",
      },
      {
        type: "code",
        content: `// Örnek: basit bir CounterProvider
class CounterProvider extends ChangeNotifier {
  int _sayac = 0;
  int get sayac => _sayac;
  void artir() {
    _sayac++;
    notifyListeners();
  }
}

// Üst seviyede sağlama
MaterialApp(
  home: ChangeNotifierProvider(
    create: (_) => CounterProvider(),
    child: AnaSayfa(),
  ),
);

// Kullanım
context.watch<CounterProvider>().sayac;
context.read<CounterProvider>().artir();`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "Riverpod, Provider'ın daha güçlü ve test edilebilir versiyonudur; dependency injection ve compile-time güvenlik sunar. Büyük projelerde Riverpod tercih edilebilir.",
      },
    ],
  },
  {
    id: "layout-responsive",
    title: "Layout ve Responsive Tasarım",
    excerpt: "Farklı ekran boyutlarına uyum: LayoutBuilder, MediaQuery ve breakpoint kullanımı.",
    category: "UI",
    emoji: "📐",
    content: [
      { type: "h2", content: "Neden Responsive?" },
      {
        type: "p",
        content:
          "Uygulama hem küçük telefonlarda hem tabletlerde hem de masaüstünde açılabiliyor. Aynı sayfada bazen tek sütun, bazen iki sütun veya farklı padding değerleri isteriz. Bunu Flutter'da MediaQuery ve LayoutBuilder ile yaparız.",
      },
      { type: "h3", content: "MediaQuery ile Ekran Bilgisi" },
      {
        type: "code",
        content: `// Ekran genişliği ve yüksekliği
final genislik = MediaQuery.of(context).size.width;
final yukseklik = MediaQuery.of(context).size.height;

// Kısa yol
final ekranGenis = MediaQuery.sizeOf(context).width;

// Tablet mi telefon mu?
final tabletMi = ekranGenis > 600;`,
        language: "dart",
      },
      { type: "h3", content: "LayoutBuilder ile Koşullu Yerleşim" },
      {
        type: "p",
        content:
          "LayoutBuilder, üst widget'ın verdiği kısıtlamalara (constraints) göre farklı widget döndürmenizi sağlar:",
      },
      {
        type: "code",
        content: `LayoutBuilder(
  builder: (context, constraints) {
    if (constraints.maxWidth > 600) {
      return Row(
        children: [
          Expanded(child: SolPanel()),
          Expanded(child: SagIcerik()),
        ],
      );
    }
    return Column(
      children: [
        SolPanel(),
        SagIcerik(),
      ],
    );
  },
)`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "Böylece dar ekranda tek sütun, geniş ekranda iki sütun gösterebilirsiniz. Breakpoint değerlerini (örn. 600, 900) projenize göre sabitler veya bir constants dosyasında toplarsınız.",
      },
    ],
  },
  {
    id: "navigasyon",
    title: "Navigasyon: Sayfalar Arası Geçiş",
    excerpt: "Navigator.push, pop, named routes ve sonuç döndürme.",
    category: "UI",
    emoji: "🧭",
    content: [
      { type: "h2", content: "Temel Navigasyon" },
      {
        type: "p",
        content:
          "Flutter'da sayfa geçişleri Navigator sınıfıyla yapılır. push ile yeni sayfa açılır, pop ile geri dönülür. Stack yapısı sayesinde her sayfa üst üste eklenir.",
      },
      { type: "h3", content: "Push ve Pop" },
      {
        type: "code",
        content: `// Yeni sayfaya git
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => DetaySayfasi()),
);

// Geri dön (bir önceki sayfaya)
Navigator.pop(context);

// Sonuç ile geri dön
Navigator.pop(context, "Kaydedildi");

// Açan sayfada sonucu almak
final sonuc = await Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => SecimSayfasi()),
);
if (sonuc != null) print("Seçilen: \$sonuc");`,
        language: "dart",
      },
      { type: "h3", content: "Named Routes (İsimli Rotalar)" },
      {
        type: "p",
        content:
          "Route isimleri tanımlayıp routes map'i MaterialApp'e verirseniz, Navigator.pushNamed(context, '/detay') gibi kullanabilirsiniz. Argüman geçmek için settings.arguments veya GoRouter / AutoRoute gibi paketler kullanılır.",
      },
    ],
  },
  {
    id: "api-veri",
    title: "API'den Veri Çekme ve Gösterme",
    excerpt: "http paketi, Future, async/await ve loading/hata durumları.",
    category: "Veri",
    emoji: "🌐",
    content: [
      { type: "h2", content: "HTTP İstekleri" },
      {
        type: "p",
        content:
          "Uygulama dışındaki veriyi (API, REST) almak için genelde http veya dio paketi kullanılır. İstekler asenkron olduğu için Future ve async/await kavramlarına ihtiyaç vardır.",
      },
      { type: "h3", content: "Basit GET İsteği" },
      {
        type: "code",
        content: `import 'package:http/http.dart' as http;
import 'dart:convert';

Future<List<Map>> kullanicilariGetir() async {
  final uri = Uri.parse('https://api.ornek.com/users');
  final response = await http.get(uri);
  
  if (response.statusCode == 200) {
    final liste = jsonDecode(response.body) as List;
    return liste.map((e) => e as Map).toList();
  }
  throw Exception('Veri alınamadı');
}`,
        language: "dart",
      },
      { type: "h3", content: "Ekranda Gösterme: FutureBuilder" },
      {
        type: "p",
        content:
          "Veri gelecekte hazır olacağı için FutureBuilder kullanırız. ConnectionState.waiting, .done ve hata durumunu ayrı ayrı ele alırız:",
      },
      {
        type: "code",
        content: `FutureBuilder<List<Map>>(
  future: kullanicilariGetir(),
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return Center(child: CircularProgressIndicator());
    }
    if (snapshot.hasError) {
      return Text("Hata: \${snapshot.error}");
    }
    final liste = snapshot.data ?? [];
    return ListView.builder(
      itemCount: liste.length,
      itemBuilder: (context, i) => ListTile(
        title: Text(liste[i]["name"]?.toString() ?? ""),
      ),
    );
  },
)`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "Gerçek projelerde state management (Provider/Riverpod) veya veri katmanı (Repository) ile bu Future'ı tek yerde yönetip widget'ı sadece dinleyici yapmak daha temiz olur.",
      },
    ],
  },
  {
    id: "form-validasyon",
    title: "Formlar ve Validasyon",
    excerpt: "TextFormField, Form, validator ve kullanıcı girdisini doğrulama.",
    category: "UI",
    emoji: "📝",
    content: [
      { type: "h2", content: "Form ve GlobalKey" },
      {
        type: "p",
        content:
          "Birden fazla alanı tek seferde doğrulamak ve kaydetmek için Form widget'ı kullanılır. Form'un state'ine erişmek için GlobalKey<FormState> verilir; save veya validate bu key üzerinden çağrılır.",
      },
      { type: "h3", content: "Örnek: Giriş Formu" },
      {
        type: "code",
        content: `final _formKey = GlobalKey<FormState>();

Form(
  key: _formKey,
  child: Column(
    children: [
      TextFormField(
        decoration: InputDecoration(labelText: "E-posta"),
        validator: (value) {
          if (value == null || value.isEmpty) return "Boş bırakılamaz.";
          if (!value.contains("@")) return "Geçerli e-posta girin.";
          return null;
        },
        onSaved: (value) => _email = value,
      ),
      TextFormField(
        decoration: InputDecoration(labelText: "Şifre"),
        obscureText: true,
        validator: (value) {
          if (value == null || value.length < 6) return "En az 6 karakter.";
          return null;
        },
        onSaved: (value) => _sifre = value,
      ),
      ElevatedButton(
        onPressed: () {
          if (_formKey.currentState?.validate() ?? false) {
            _formKey.currentState!.save();
            // _email ve _sifre ile giriş yap
          }
        },
        child: Text("Giriş"),
      ),
    ],
  ),
)`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "validator null döndürürse alan geçerli sayılır; string döndürürse o mesaj hata olarak gösterilir. save(), tüm onSaved callback'lerini tetikler.",
      },
    ],
  },
  {
    id: "animasyonlar",
    title: "Animasyonlar",
    excerpt: "AnimationController, Tween ve basit animasyon örnekleri.",
    category: "UI",
    emoji: "✨",
    content: [
      { type: "h2", content: "Flutter'da Animasyon" },
      {
        type: "p",
        content:
          "Animasyonlar sayesinde geçişler ve etkileşimler daha akıcı hissettirir. Flutter'da AnimationController zamanı yönetir, Tween başlangıç-bitiş değerlerini tanımlar. Genelde StatefulWidget + TickerProviderStateMixin kullanılır.",
      },
      { type: "h3", content: "Basit Fade/Slide Örneği" },
      {
        type: "code",
        content: `class AnimasyonluKutu extends StatefulWidget {
  @override
  State<AnimasyonluKutu> createState() => _AnimasyonluKutuState();
}

class _AnimasyonluKutuState extends State<AnimasyonluKutu>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _opacity;
  late Animation<Offset> _slide;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 500),
    );
    _opacity = Tween<double>(begin: 0, end: 1).animate(_controller);
    _slide = Tween<Offset>(
      begin: Offset(0, 0.2),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOut));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _opacity,
      child: SlideTransition(
        position: _slide,
        child: Container(
          width: 100,
          height: 100,
          color: Colors.blue,
        ),
      ),
    );
  }
}
// Başlatmak için: _controller.forward();`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "Implicit animasyonlar (AnimatedContainer, AnimatedOpacity) basit durum değişimleri için kod yazmadan kullanılabilir. Daha karmaşık senaryolarda explicit AnimationController tercih edilir.",
      },
    ],
  },
  {
    id: "paketler-pub",
    title: "Paketler ve pub.dev",
    excerpt: "pubspec.yaml, paket ekleme ve yaygın paketler.",
    category: "Temel",
    emoji: "📦",
    content: [
      { type: "h2", content: "Paket Sistemi" },
      {
        type: "p",
        content:
          "Flutter ve Dart ekosisteminde hazır kütüphaneler pub.dev üzerinden yayınlanır. Projede kullanmak için pubspec.yaml dosyasına dependency eklenir, sonra flutter pub get çalıştırılır.",
      },
      { type: "h3", content: "pubspec.yaml Örneği" },
      {
        type: "code",
        content: `name: benim_uygulamam
description: Örnek Flutter uygulaması.
publish_to: 'none'
version: 1.0.0+1

dependencies:
  flutter:
    sdk: flutter
  http: ^1.1.0
  provider: ^6.1.1
  shared_preferences: ^2.2.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0`,
        language: "yaml",
      },
      { type: "h3", content: "Yaygın Paketler" },
      {
        type: "p",
        content:
          "http / dio: API istekleri. provider / riverpod: state management. shared_preferences: basit yerel ayar. hive / sqflite: yerel veritabanı. cached_network_image: resim önbellekleme. go_router: gelişmiş routing. Bu paketleri pub.dev'de arayıp projenize ekleyebilirsiniz.",
      },
    ],
  },
];
