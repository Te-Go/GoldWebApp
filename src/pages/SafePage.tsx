import { GoldSafe } from '../components/features/GoldSafe';
import './SafePage.css';

export const SafePage = () => {
    return (
        <div className="safe-page">
            <header className="page-header">
                <h1 className="page-title">Kasam</h1>
                <p className="page-subtitle">Altın portföyünüzü takip edin</p>
            </header>

            <GoldSafe />

            <div className="safe-info">
                <h3>Gizlilik Garantisi</h3>
                <p>
                    Tüm verileriniz yalnızca bu cihazda saklanır.
                    Sunucularımıza hiçbir kişisel bilgi gönderilmez.
                </p>
            </div>
        </div>
    );
};
