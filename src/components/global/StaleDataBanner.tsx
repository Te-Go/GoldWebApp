
import { AlertTriangle } from 'lucide-react';
import { useGold } from '../../context/GoldContext';

export const StaleDataBanner = () => {
    const { lastUpdate } = useGold();

    if (!lastUpdate) return null;

    // 2 Hours threshold
    const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
    const isStale = (new Date().getTime() - new Date(lastUpdate).getTime()) > TWO_HOURS_MS;

    if (!isStale) return null;

    return (
        <div className="stale-data-banner" style={{
            background: '#ff4d4d',
            color: 'white',
            padding: '8px 16px',
            textAlign: 'center',
            fontSize: '0.9rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            position: 'sticky',
            top: 0,
            zIndex: 9999
        }}>
            <AlertTriangle size={16} />
            <span>
                Veri akışında gecikme yaşanıyor. Fiyatlar güncel olmayabilir. (Son Güncelleme: {new Date(lastUpdate).toLocaleTimeString()})
            </span>
        </div>
    );
};
