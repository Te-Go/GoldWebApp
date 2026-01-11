import { useState, useEffect } from 'react';
import { useGoldPrice, useMacro } from '../../context/GoldContext';
import { GlassCard } from '../ui/GlassCard';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import './GoldSafe.css';

interface GoldAsset {
    id: string;
    type: string;
    grams: number;
    purchasePrice: number;
    purchaseDate: string;
}

const STORAGE_KEY = 'altin_masasi_safe';

export const GoldSafe = () => {
    const [assets, setAssets] = useState<GoldAsset[]>([]);
    const [isPrivate, setIsPrivate] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newAsset, setNewAsset] = useState({ type: 'gram', grams: 1, price: 0 });

    const gramPrice = useGoldPrice('gram');
    const macro = useMacro();

    // Load from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setAssets(JSON.parse(saved));
            }
        } catch (e) {
            console.error('Failed to load saved assets:', e);
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
        } catch (e) {
            console.error('Failed to save assets:', e);
        }
    }, [assets]);

    const addAsset = () => {
        const asset: GoldAsset = {
            id: Date.now().toString(),
            type: newAsset.type,
            grams: newAsset.grams,
            purchasePrice: newAsset.price,
            purchaseDate: new Date().toISOString().split('T')[0],
        };
        setAssets([...assets, asset]);
        setShowAddForm(false);
        setNewAsset({ type: 'gram', grams: 1, price: 0 });
    };

    const removeAsset = (id: string) => {
        setAssets(assets.filter(a => a.id !== id));
    };

    // Calculate totals
    const currentPrice = gramPrice?.sell || 0;
    const totalGrams = assets.reduce((sum, a) => sum + a.grams, 0);
    const totalCost = assets.reduce((sum, a) => sum + (a.grams * a.purchasePrice), 0);
    const currentValue = totalGrams * currentPrice;
    const profitTL = currentValue - totalCost;
    const profitUSD = profitTL / macro.usdTry;

    return (
        <section className="gold-safe">
            <GlassCard className="safe-card">
                <div className="safe-header">
                    <h3 className="safe-title">🔐 Kasam</h3>
                    <div className="safe-actions">
                        <button
                            className="btn btn-ghost"
                            onClick={() => setIsPrivate(!isPrivate)}
                            title={isPrivate ? 'Göster' : 'Gizle'}
                        >
                            {isPrivate ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowAddForm(true)}
                        >
                            <Plus size={18} />
                            Ekle
                        </button>
                    </div>
                </div>

                {/* Summary */}
                <div className={`safe-summary ${isPrivate ? 'privacy-blur' : ''}`}>
                    <div className="summary-item">
                        <span className="summary-label">Toplam Değer</span>
                        <span className="summary-value tabular-nums">
                            ₺{currentValue.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Kâr/Zarar (TL)</span>
                        <span className={`summary-value tabular-nums ${profitTL >= 0 ? 'text-up' : 'text-down'}`}>
                            {profitTL >= 0 ? '+' : ''}₺{profitTL.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Kâr/Zarar (USD)</span>
                        <span className={`summary-value tabular-nums ${profitUSD >= 0 ? 'text-up' : 'text-down'}`}>
                            {profitUSD >= 0 ? '+' : ''}${profitUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>

                {/* Asset List */}
                <div className={`asset-list ${isPrivate ? 'privacy-blur' : ''}`}>
                    {assets.length === 0 ? (
                        <div className="asset-empty">Henüz altın eklenmedi</div>
                    ) : (
                        assets.map((asset) => (
                            <div key={asset.id} className="asset-row">
                                <div className="asset-info">
                                    <span className="asset-amount">{asset.grams}g</span>
                                    <span className="asset-meta">@ ₺{asset.purchasePrice.toLocaleString('tr-TR')}</span>
                                    <span className="asset-date">{asset.purchaseDate}</span>
                                </div>
                                <button
                                    className="btn btn-ghost asset-delete"
                                    onClick={() => removeAsset(asset.id)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Add Form Modal */}
                {showAddForm && (
                    <div className="add-form-overlay" onClick={() => setShowAddForm(false)}>
                        <div className="add-form" onClick={e => e.stopPropagation()}>
                            <h4>Altın Ekle</h4>
                            <div className="form-group">
                                <label>Gram:</label>
                                <input
                                    type="number"
                                    className="input tabular-nums"
                                    value={newAsset.grams}
                                    onChange={e => setNewAsset({ ...newAsset, grams: parseFloat(e.target.value) || 0 })}
                                    min={0}
                                    step={0.1}
                                />
                            </div>
                            <div className="form-group">
                                <label>Alış Fiyatı (₺/g):</label>
                                <input
                                    type="number"
                                    className="input tabular-nums"
                                    value={newAsset.price}
                                    onChange={e => setNewAsset({ ...newAsset, price: parseFloat(e.target.value) || 0 })}
                                    min={0}
                                    placeholder={currentPrice.toString()}
                                />
                            </div>
                            <div className="form-actions">
                                <button className="btn btn-ghost" onClick={() => setShowAddForm(false)}>
                                    İptal
                                </button>
                                <button className="btn btn-primary" onClick={addAsset}>
                                    Kaydet
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <p className="safe-note">
                    🔒 Verileriniz yalnızca bu cihazda saklanır.
                </p>
            </GlassCard>
        </section>
    );
};
