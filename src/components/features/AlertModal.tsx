import { useState } from 'react';
import { X, Bell, TrendingUp, TrendingDown } from 'lucide-react';
import { useAlerts } from '../../context/AlertsContext';
import './AlertModal.css';

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    goldId: string;
    goldName: string;
    currentPrice: number;
}

export const AlertModal = ({ isOpen, onClose, goldId, goldName, currentPrice }: AlertModalProps) => {
    const { addAlert, hasPermission, requestPermission } = useAlerts();
    const [targetPrice, setTargetPrice] = useState(currentPrice.toString());
    const [direction, setDirection] = useState<'above' | 'below'>('above');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Request permission if not granted
        if (!hasPermission) {
            await requestPermission();
        }

        const price = parseFloat(targetPrice.replace(/[.,]/g, '').replace(',', '.'));
        if (isNaN(price) || price <= 0) return;

        addAlert(goldId, goldName, price, direction);
        onClose();
    };

    const formatInputPrice = (value: string) => {
        // Allow only numbers and format
        const cleaned = value.replace(/[^\d]/g, '');
        if (!cleaned) return '';
        return parseInt(cleaned).toLocaleString('tr-TR');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="alert-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-title">
                        <Bell size={20} />
                        <span>Fiyat Alarmı Kur</span>
                    </div>
                    <button className="modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="gold-info">
                        <span className="gold-label">{goldName}</span>
                        <span className="current-price">
                            Şu an: ₺{currentPrice.toLocaleString('tr-TR')}
                        </span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Hedef Fiyat (₺)</label>
                            <input
                                type="text"
                                value={targetPrice}
                                onChange={(e) => setTargetPrice(formatInputPrice(e.target.value))}
                                placeholder="Örn: 3500"
                                className="price-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Bildirim Yönü</label>
                            <div className="direction-buttons">
                                <button
                                    type="button"
                                    className={`direction-btn ${direction === 'above' ? 'active up' : ''}`}
                                    onClick={() => setDirection('above')}
                                >
                                    <TrendingUp size={16} />
                                    <span>Üstüne Çıkınca</span>
                                </button>
                                <button
                                    type="button"
                                    className={`direction-btn ${direction === 'below' ? 'active down' : ''}`}
                                    onClick={() => setDirection('below')}
                                >
                                    <TrendingDown size={16} />
                                    <span>Altına Düşünce</span>
                                </button>
                            </div>
                        </div>

                        {!hasPermission && (
                            <div className="permission-notice">
                                ⚠️ Bildirim izni gerekiyor. Alarm kurduğunuzda izin isteyeceğiz.
                            </div>
                        )}

                        <button type="submit" className="submit-btn">
                            <Bell size={16} />
                            Alarmı Kaydet
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
