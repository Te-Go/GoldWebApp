import { useGold, useMacro } from '../../context/GoldContext';
import './LiveTicker.css';

export const LiveTicker = () => {
    const { payload, isConnected } = useGold();
    const macro = useMacro();

    const tickerItems = [
        { label: 'USD/TL', value: macro.usdTry.toFixed(2), prefix: '₺' },
        { label: 'GRAM', value: payload.prices.find(p => p.id === 'gram')?.sell.toFixed(2) || '0', prefix: '₺' },
        { label: 'ONS', value: payload.prices.find(p => p.id === 'ons')?.sell.toFixed(2) || '0', prefix: '$' },
        { label: 'BTC', value: (macro.btcUsd / 1000).toFixed(1) + 'K', prefix: '$' },
        { label: 'EUR/TL', value: macro.eurTry.toFixed(2), prefix: '₺' },
    ];

    // Double the items for seamless loop
    const doubledItems = [...tickerItems, ...tickerItems];

    return (
        <header className="live-ticker">
            <div className="ticker-brand">
                <span className={`vitality-dot ${isConnected ? 'connected' : 'disconnected'}`} />
                <span className="market-status">
                    {macro.marketOpen ? 'PİYASA AÇIK' : 'KAPALI'}
                </span>
            </div>

            <div className="ticker-track">
                <div className="ticker-content animate-marquee">
                    {doubledItems.map((item, idx) => (
                        <div key={idx} className="ticker-item">
                            <span className="ticker-label">{item.label}</span>
                            <span className="ticker-value tabular-nums">
                                {item.prefix}{item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );
};
