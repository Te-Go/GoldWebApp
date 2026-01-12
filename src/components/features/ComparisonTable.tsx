
import { GlassCard } from '../ui/GlassCard';

export const ComparisonTable = () => {
    return (
        <div style={{ marginTop: '24px' }}>
            <GlassCard className="comparison-table-card">
                <h3 className="section-title">Piyasa Sıkışıklığı (Spread)</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <th style={{ textAlign: 'left', padding: '8px', color: '#94a3b8' }}>Piyasa</th>
                                <th style={{ textAlign: 'right', padding: '8px', color: '#94a3b8' }}>Alış/Satış Farkı</th>
                                <th style={{ textAlign: 'right', padding: '8px', color: '#94a3b8' }}>Makas %</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '12px 8px', fontWeight: 500 }}>Kapalıçarşı (Fiziki)</td>
                                <td style={{ textAlign: 'right', padding: '12px 8px', color: '#ef4444' }}>~50 TL</td>
                                <td style={{ textAlign: 'right', padding: '12px 8px' }}>%1.5</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '12px 8px', fontWeight: 500 }}>Bankalar (Dijital)</td>
                                <td style={{ textAlign: 'right', padding: '12px 8px', color: '#ef4444' }}>~120 TL</td>
                                <td style={{ textAlign: 'right', padding: '12px 8px' }}>%4.2</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '12px 8px', fontWeight: 500 }}>Uluslararası (Spot)</td>
                                <td style={{ textAlign: 'right', padding: '12px 8px', color: '#22c55e' }}>~2 TL</td>
                                <td style={{ textAlign: 'right', padding: '12px 8px' }}>%0.1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{ marginTop: '12px', fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic' }}>
                    * Banka makas aralıkları mesai saatleri dışında (18:00 - 09:00) artış gösterebilir.
                </div>
            </GlassCard>
        </div>
    );
};
