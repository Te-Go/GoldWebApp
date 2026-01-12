
import { useEffect, useState } from 'react';
import { useGold } from '../../context/GoldContext';
import { GlassCard } from '../ui/GlassCard';
import { BrainCircuit } from 'lucide-react';

export const NeuralCurrencyWidget = () => {
    const { payload } = useGold();
    const { macro } = payload;
    const [neuralState, setNeuralState] = useState<{
        usdImpact: 'positive' | 'negative' | 'neutral';
        message: string;
    }>({ usdImpact: 'neutral', message: 'Veri analizi yapılıyor...' });

    useEffect(() => {
        if (macro.usdTry > 30) {
            setNeuralState({
                usdImpact: 'positive',
                message: 'Dolar kuru güçlü seyrediyor, gram altını destekliyor.'
            });
        }
    }, [macro.usdTry]);

    return (
        <div className="neural-widget-wrapper" style={{ marginBottom: '16px' }}>
            <GlassCard className="neural-widget" style={{
                background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.6) 0%, rgba(30, 30, 50, 0.4) 100%)',
                border: '1px solid rgba(255, 215, 0, 0.15)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <BrainCircuit size={16} className="text-gold" />
                    <span className="text-xs font-semibold text-gold tracking-wider uppercase">Piyasa Nöronları</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {/* USD Widget */}
                    <div style={{ padding: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                        <div className="text-xs text-muted">Dolar / TL</div>
                        <div className="text-lg font-bold font-mono text-white">
                            {macro.usdTry > 0 ? `₺${macro.usdTry.toFixed(2)}` : '---'}
                        </div>
                    </div>

                    {/* Euro Widget */}
                    <div style={{ padding: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                        <div className="text-xs text-muted">Euro / TL</div>
                        <div className="text-lg font-bold font-mono text-white">
                            {macro.eurTry > 0 ? `₺${macro.eurTry.toFixed(2)}` : '---'}
                        </div>
                    </div>
                </div>

                {/* Neural Context Message */}
                <div style={{
                    marginTop: '12px',
                    fontSize: '0.75rem',
                    color: '#94a3b8',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }}></div>
                    {neuralState.message}
                </div>
            </GlassCard>
        </div>
    );
};
