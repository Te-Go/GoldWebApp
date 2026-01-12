
import { ShieldCheck } from 'lucide-react';

export const TrustBox = () => {
    return (
        <div className="trust-box" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px',
            marginTop: '24px',
            marginBottom: '80px', // Space for bottom nav
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '0.7rem',
            textAlign: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            <ShieldCheck size={14} />
            <span>
                Veri Kaynağı: Borsa İstanbul (BIST) ve Kapalıçarşı Resmi Verileri.
                <br />
                TG Finans Masası tarafından doğrulanmıştır.
            </span>
        </div>
    );
};
