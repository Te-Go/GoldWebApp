
export interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string; // Markdown
    category: 'news' | 'education' | 'market';
    author: string;
    publishDate: string;
    imageUrl: string;
    readTime: number; // minutes
    isFeatured?: boolean;
}

export const newsData: Article[] = [
    {
        id: '1',
        slug: '2025-altin-tahminleri',
        title: '2025 Altın Raporu: Büyük Ralli Başlıyor mu?',
        excerpt: 'JP Morgan ve Goldman Sachs analistlerinden çarpıcı 2025 senaryoları. ONS altın için 3.000$ hedefi masada.',
        content: `
## Dev Bankalardan Çarpıcı Raporlar

Global ekonomi dünyasının gözü 2025 yılına çevrilmiş durumda. **JP Morgan** ve **Goldman Sachs** gibi dev kurumlar, altın fiyatları için iddialı hedefler ortaya koydu.

### Neden Yükselecek?
Analistlere göre ralliyi tetikleyecek 3 ana faktör var:

* Merkez bankalarının rekor seviyedeki altın alımları
* Küresel faiz indirim döngüsünün başlaması
* Artan jeopolitik riskler ve güvenli liman arayışı

## 3.000 Dolar Hedefi Gerçekçi mi?

Ons altın fiyatının 3.000 dolara ulaşması, mevcut seviyelerden yaklaşık %30'luk bir artış anlamına geliyor. **Citi Group** stratejistleri, bu senaryonun "yüksek ihtimal" olduğunu belirtiyor.

Eğer bu tahmin gerçekleşirse, gram altının Türkiye piyasasında rekor tazelemesi kaçınılmaz olacaktır.`,
        category: 'market',
        author: 'Piyasa Analisti',
        publishDate: '20 May 2025',
        readTime: 5,
        imageUrl: 'https://images.unsplash.com/photo-1620324869689-d9229f635489?auto=format&fit=crop&q=80&w=1200',
        isFeatured: true
    },
    {
        id: '2',
        slug: 'altin-yatirimi-rehberi',
        title: 'Fiziki Altın vs. Banka Hesabı: Hangisi Daha Karlı?',
        excerpt: 'Makas aralıkları, saklama maliyetleri ve vergi avantajlarını karşılaştırdık.',
        content: `
## Yatırımcı İçin Kritik Seçim

Altın yatırımı yaparken en sık sorulan soru: **"Kuyumcudan mı almalıyım, yoksa bankadan mı?"**

### 1. Fiziki Altın (Kuyumcu)
Geleneksel yöntemdir. Elinizde tuttuğunuz altındır.
* **Avantaj:** Kriz anında likidite sağlar.
* **Dezavantaj:** Çalınma riski ve yüksek işçilik maliyeti (özellikle ziynet grubu için).

### 2. Banka Altın Hesabı
Dijital ortamda gram altın biriktirmektir.
* **Avantaj:** Güvenlidir, 7/24 işlem yapılabilir (mesai saatlerinde makas düşüktür).
* **Dezavantaj:** Fiziki teslim almak zordur, bankalar fiziki dönüşüm için ekstra ücret talep eder.

## Sonuç
Eğer uzun vadeli saklayacaksanız ve güvenlik endişeniz yoksa **Fiziki**, al-sat yapacaksanız **Banka** hesabı daha mantıklıdır.`,
        category: 'education',
        author: 'Uzman Editör',
        publishDate: '18 May 2025',
        readTime: 7,
        imageUrl: 'https://images.unsplash.com/photo-1610375461490-6d615d3747cb?auto=format&fit=crop&q=80&w=800'
    },
    // ... Other articles kept same or simple placeholdes for brevity in this file update
    {
        id: '3',
        slug: 'gumus-yukselisi',
        title: 'Gümüş: "Fakir Adamın Altını" Parlıyor',
        excerpt: 'Endüstriyel talep artışıyla birlikte Gümüş/Altın rasyosu daralıyor.',
        content: `## Gümüş Rallisi Başladı`,
        category: 'market',
        author: 'Emtia Uzmanı',
        publishDate: '15 May 2025',
        readTime: 4,
        imageUrl: 'https://images.unsplash.com/photo-1624454002302-36b824d7f8d4?auto=format&fit=crop&q=80&w=800'
    }
];
