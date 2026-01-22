
import { useParams, Link } from 'react-router-dom';
import { useGoldPrice, useGold } from '../context/GoldContext';
import { InflationChart } from '../components/features/InflationChart';
import { WeddingCalculator } from '../components/features/WeddingCalculator';
import { LaborCostCalculator } from '../components/features/LaborCostCalculator';
import { GlassCard } from '../components/ui/GlassCard';
import { ArrowLeft, TrendingUp, AlertCircle, ShoppingBag } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// Template Types
// 1. Investment: Gram, Ons, Külçe -> Charts & Spread Focus
// 2. Coins: Ceyrek, Yarim, Tam, Cumhuriyet -> Wedding/Gift Focus
// 3. Jewelry: Bilezik, 14/22 Ayar -> Labor Cost Focus
// 4. Industrial/Other: Silver, Platinum, Palladium, Copper -> Generic Investment

const getTemplateType = (id: string) => {
    if (['gram', 'ons', 'kulce', 'has_altin'].includes(id)) return 'investment';
    if (['gumus', 'gumus_ons', 'platin', 'platin_ons', 'paladyum', 'paladyum_ons', 'rodyum', 'bakir', 'bronz'].includes(id)) return 'investment'; // Treat as investment for now
    if (['bilezik_22', 'bilezik_14', '14ayar', '22ayar', 'ziynet'].includes(id)) return 'jewelry';
    return 'coin'; // Default (Ceyrek, etc.)
};

export const ProductDetailPage = () => {
    const { goldType } = useParams<{ goldType: string }>();
    const price = useGoldPrice(goldType || 'gram');
    const { payload } = useGold();

    if (!price) {
        return <div className="p-8 text-center text-white">Ürün bulunamadı.</div>;
    }

    const template = getTemplateType(price.id);
    const { macro } = payload;

    // SEO Data
    const title = `${price.nameTr} Fiyatı ve Analizi | Altın-Fiyatları.tr`;
    const description = `${price.nameTr} güncel satış fiyatı ₺${price.sell}. ${template === 'investment' ? 'Yatırım tavsiyeleri ve grafikler.' : 'Düğün ve hediye hesaplamaları.'}`;

    // Neural Context Analysis
    const getNeuralAnalysis = () => {
        // Specific checks for industrial metals
        if (['gumus', 'gumus_ons'].includes(price.id)) {
            return `${price.nameTr} sanayi talebi ile hareketleniyor. Altın/Gümüş rasyosu takip edilmeli.`;
        }
        if (['platin', 'platin_ons', 'paladyum', 'paladyum_ons'].includes(price.id)) {
            return `${price.nameTr}, otomotiv endüstrisindeki talep değişimlerine duyarlıdır. Volatilite yüksek olabilir.`;
        }
        if (['rodyum', 'bakir', 'bronz'].includes(price.id)) {
            return `${price.nameTr}, küresel sanayi üretimi ve enerji maliyetlerine göre fiyatlanmaktadır.`;
        }

        if (template === 'investment') {
            if (price.changePercent > 0.5) return `${price.nameTr} bugün güçlü duruyor. Enflasyona karşı koruma aracı olarak talep görüyor.`;
            return `${price.nameTr} alım fırsatı veriyor olabilir. Banka makas aralıklarına dikkat edin.`;
        }
        if (template === 'jewelry') {
            return `${price.nameTr} alırken işçilik maliyetine dikkat! Yatırım değil, kullanım amaçlıdır.`;
        }
        return `${price.nameTr}, düğün sezonunun vazgeçilmezi. Eski/Yeni tarih farkına dikkat edin.`;
    };

    return (
        <div className="product-page pb-24">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`https://altin-fiyatlari.tr/altin/${price.id}`} />
            </Helmet>

            {/* Header */}
            <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10 p-4">
                <div className="max-w-md mx-auto flex items-center gap-4">
                    <Link to="/" className="p-2 -ml-2 text-white/60 hover:text-white">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-lg font-bold text-white leading-tight">{price.nameTr}</h1>
                        <div className="text-xs text-gold flex items-center gap-2">
                            <span className="tabular-nums">₺{price.sell.toLocaleString('tr-TR')}</span>
                            <span className={price.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}>
                                {price.changePercent > 0 ? '+' : ''}%{price.changePercent}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-md mx-auto p-4 space-y-6">

                {/* 1. Neural Analysis Card (Common but content differs) */}
                <GlassCard className="neural-card p-4 border border-gold/20 bg-gradient-to-br from-gold/5 to-transparent">
                    <div className="flex gap-3">
                        <div className="shrink-0 pt-1">
                            <AlertCircle size={20} className="text-gold" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gold mb-1">Yapay Zeka Analizi</h3>
                            <p className="text-sm text-white/90 leading-relaxed">
                                {getNeuralAnalysis()}
                            </p>
                        </div>
                    </div>
                </GlassCard>

                {/* 2. Template Specific Content */}

                {/* INVESTMENT LAYOUT */}
                {template === 'investment' && (
                    <>
                        <InflationChart goldType={price.id === 'ceyrek' ? 'ceyrek' : 'gram'} />
                        <GlassCard>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <TrendingUp size={18} className="text-green-400" />
                                Yatırımcı Notları
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li className="flex gap-2">
                                    <span className="text-gold">•</span>
                                    <span>Bankalarda makas aralığı şu an <strong>~{payload.spreadData.spread} TL</strong> civarındadır.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-gold">•</span>
                                    <span>Dolar kurundaki {macro.usdTry > 30 ? 'yükseliş' : 'hareket'}, {price.nameTr} fiyatını destekliyor.</span>
                                </li>
                            </ul>
                        </GlassCard>
                    </>
                )}

                {/* COIN/GIFT LAYOUT */}
                {template === 'coin' && (
                    <>
                        <WeddingCalculator />
                        <GlassCard>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <ShoppingBag size={18} className="text-purple-400" />
                                Alım Tavsiyeleri
                            </h3>
                            <div className="text-sm text-gray-300 space-y-3">
                                <p>Kuyumcuda bozdururken "Eski Tarihli" ve "Yeni Tarihli" ayrımına dikkat edin. Satarken genellikle aynı fiyattan alınır.</p>
                                <div className="p-3 bg-white/5 rounded">
                                    <div className="text-xs text-muted mb-1">Mevcut Spread (Al-Sat Farkı)</div>
                                    <div className="text-xl font-mono text-red-400">
                                        ₺{(price.sell - price.buy).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </>
                )}

                {/* JEWELRY LAYOUT */}
                {template === 'jewelry' && (
                    <>
                        <LaborCostCalculator />
                        <GlassCard>
                            <h3 className="section-title">Neden Fark Var?</h3>
                            <p className="text-sm text-gray-300 mb-4">
                                {price.nameTr} takı grubunda olduğu için fiyatın içinde "İşçilik Maliyeti" (usta emeği, dükkan kirası) bulunur. Bozdururken bu maliyet düşülür.
                            </p>
                            <div className="text-xs text-center text-muted italic">
                                * Uzun vadeli yatırım için önerilmez.
                            </div>
                        </GlassCard>
                    </>
                )}

            </main>
        </div>
    );
};
