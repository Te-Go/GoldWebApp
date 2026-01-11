import { GlassCard } from '../ui/GlassCard';
import { Factory } from 'lucide-react';
import './DarphaneIscilik.css';

interface WorkmanshipPrice {
    type: string;
    typeTr: string;
    yeniAlis: number;
    yeniSatis: number;
    eskiAlis: number;
    eskiSatis: number;
}

// Darphane İşçilik (Mint Workmanship) prices
// Shows the workmanship difference between new mint and old/used coins
const workmanshipData: WorkmanshipPrice[] = [
    { type: 'ceyrek', typeTr: 'Çeyrek', yeniAlis: 1.6300, yeniSatis: 1.6350, eskiAlis: 1.6050, eskiSatis: 1.6100 },
    { type: 'yarim', typeTr: 'Yarım', yeniAlis: 3.2600, yeniSatis: 3.2700, eskiAlis: 3.2000, eskiSatis: 3.2070 },
    { type: 'tek', typeTr: 'Tek (Tam)', yeniAlis: 6.5000, yeniSatis: 6.5150, eskiAlis: 6.4200, eskiSatis: 6.4300 },
    { type: 'ata', typeTr: 'Ata', yeniAlis: 6.6750, yeniSatis: 6.7000, eskiAlis: 6.6750, eskiSatis: 6.6950 },
];

export const DarphaneIscilik = () => {
    const formatMultiplier = (value: number) => {
        return value.toFixed(4);
    };

    return (
        <section className="darphane-iscilik">
            <GlassCard className="iscilik-card">
                <div className="iscilik-header">
                    <div className="header-title">
                        <Factory size={20} className="header-icon" />
                        <h3>Darphane İşçilik Fiyatları</h3>
                    </div>
                    <span className="header-badge">Has Altın Çarpanı</span>
                </div>

                <p className="iscilik-desc">
                    Has altın (gram) fiyatına çarpılarak ziynet altını fiyatı hesaplanır.
                </p>

                <div className="iscilik-table">
                    <div className="table-header-row">
                        <span className="th-type">Tür</span>
                        <span className="th-yeni">Yeni Alış</span>
                        <span className="th-yeni">Yeni Satış</span>
                        <span className="th-eski">Eski Alış</span>
                        <span className="th-eski">Eski Satış</span>
                    </div>

                    <div className="table-body">
                        {workmanshipData.map((item) => (
                            <div key={item.type} className="table-row">
                                <div className="td-type">
                                    <span className="type-name">{item.typeTr}</span>
                                </div>
                                <div className="td-price yeni">
                                    <span className="tabular-nums">{formatMultiplier(item.yeniAlis)}</span>
                                </div>
                                <div className="td-price yeni">
                                    <span className="tabular-nums">{formatMultiplier(item.yeniSatis)}</span>
                                </div>
                                <div className="td-price eski">
                                    <span className="tabular-nums">{formatMultiplier(item.eskiAlis)}</span>
                                </div>
                                <div className="td-price eski">
                                    <span className="tabular-nums">{formatMultiplier(item.eskiSatis)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="iscilik-footer">
                    <div className="footer-info">
                        <span className="info-label">🏭 Yeni:</span>
                        <span className="info-value">Darphane basımı, tam işçilik</span>
                    </div>
                    <div className="footer-info">
                        <span className="info-label">📦 Eski:</span>
                        <span className="info-value">İkinci el, düşük işçilik</span>
                    </div>
                </div>
            </GlassCard>
        </section>
    );
};
