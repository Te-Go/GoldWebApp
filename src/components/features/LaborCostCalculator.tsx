
import { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Calculator, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useGold } from '../../context/GoldContext';

export const LaborCostCalculator = () => {
    const { payload } = useGold();
    const [grams, setGrams] = useState<number>(10);
    const [type, setType] = useState<'bilezik_22' | '14ayar' | '22ayar'>('bilezik_22');

    // Constants for Purity (Milyem)
    const purity = {
        'bilezik_22': 0.916,
        '22ayar': 0.916,
        '14ayar': 0.585
    };

    // Find prices
    const itemPrice = payload.prices.find(p => p.id === type)?.sell || 0;
    const hasGoldPrice = payload.prices.find(p => p.id === 'gram')?.sell || 0;

    // Calculations
    const totalCost = itemPrice * grams; // Technically API gives price per gram for bracelet usually? 
    // Usually API for bilezik returns price *per gram*. Let's assume per gram.
    // CollectAPI '22 Ayar Bilezik' is price per gram.

    const rawGoldValue = hasGoldPrice * grams * purity[type];
    const laborCostTotal = totalCost - rawGoldValue;

    const laborPercent = (laborCostTotal / rawGoldValue) * 100;

    return (
        <GlassCard className="labor-calculator">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div className="icon-box" style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '8px', borderRadius: '8px' }}>
                    <Calculator size={20} className="text-red-400" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">İşçilik Hesaplama</h3>
                    <p className="text-xs text-muted">Takı alırken ne kadar "Hava Parası" ödüyorsunuz?</p>
                </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="text-xs text-muted mb-1 block">Ürün Tipi</label>
                    <select
                        className="w-full bg-black/40 border border-white/10 rounded p-2 text-sm text-white"
                        value={type}
                        onChange={(e) => setType(e.target.value as any)}
                    >
                        <option value="bilezik_22">22 Ayar Bilezik</option>
                        <option value="22ayar">22 Ayar Altın</option>
                        <option value="14ayar">14 Ayar Altın</option>
                    </select>
                </div>
                <div>
                    <label className="text-xs text-muted mb-1 block">Ağırlık (Gram)</label>
                    <input
                        type="number"
                        value={grams}
                        onChange={(e) => setGrams(Number(e.target.value))}
                        className="w-full bg-black/40 border border-white/10 rounded p-2 text-sm text-white"
                    />
                </div>
            </div>

            {/* Analysis Box */}
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '16px' }}>
                <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">Saf Altın Değeri:</span>
                    <span className="text-sm font-mono font-bold text-gold">₺{rawGoldValue.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between mb-4 pb-4 border-b border-white/5">
                    <span className="text-sm text-gray-400">Satış Fiyatı:</span>
                    <span className="text-sm font-mono font-bold text-white">₺{totalCost.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-xs text-red-400 font-semibold mb-1">İŞÇİLİK MALİYETİ (ZARAR)</div>
                        <div className="text-xl font-bold text-red-500">₺{laborCostTotal.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-muted mb-1">Oransal Fark</div>
                        <div className="text-lg font-bold text-white">%{laborPercent.toFixed(1)}</div>
                    </div>
                </div>
            </div>

            {/* Advice */}
            <div className="mt-4 flex items-start gap-3 p-3 rounded-lg" style={{ background: laborPercent > 15 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)' }}>
                {laborPercent > 15 ? <AlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" /> : <CheckCircle2 size={18} className="text-green-400 shrink-0 mt-0.5" />}
                <p className="text-xs text-white/80 leading-relaxed">
                    {laborPercent > 15
                        ? 'Dikkat: Bu üründe işçilik maliyeti yüksek. Yatırım için uygun değildir, bozdururken zarar edersiniz.'
                        : 'İşçilik makul seviyede. Yine de yatırım için Gram Altın veya Çeyrek tercih edilmelidir.'}
                </p>
            </div>
        </GlassCard>
    );
};
