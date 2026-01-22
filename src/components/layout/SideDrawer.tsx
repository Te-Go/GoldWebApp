
import { X, Home, BookOpen, Newspaper, Shield, Settings, Info, TrendingUp, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SideDrawer.css';

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SideDrawer = ({ isOpen, onClose }: SideDrawerProps) => {
    const navigate = useNavigate();

    const handleNav = (path: string) => {
        navigate(path);
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`drawer-backdrop ${isOpen ? 'open' : ''}`}
                onClick={onClose}
            />

            {/* Drawer Panel */}
            <div className={`drawer-panel ${isOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <h2 className="drawer-title">Menü</h2>
                    <button className="icon-btn close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="drawer-content">
                    <div className="drawer-section">
                        <p className="section-label">UYGULAMA</p>
                        <button className="drawer-item" onClick={() => handleNav('/')}>
                            <Home size={20} /> <span>Ana Sayfa</span>
                        </button>
                        <button className="drawer-item" onClick={() => handleNav('/markets')}>
                            <TrendingUp size={20} /> <span>Piyasalar</span>
                        </button>
                        <button className="drawer-item" onClick={() => handleNav('/calculator')}>
                            <Calculator size={20} /> <span>Hesaplayıcı</span>
                        </button>
                        <button className="drawer-item" onClick={() => handleNav('/safe')}>
                            <Shield size={20} /> <span>Sanal Kasam</span>
                        </button>
                    </div>

                    <div className="drawer-section">
                        <p className="section-label">BİLGİ & HABER</p>
                        <button className="drawer-item" onClick={() => handleNav('/news')}>
                            <Newspaper size={20} /> <span>Haberler & Analiz</span>
                        </button>
                        <button className="drawer-item" onClick={() => handleNav('/news?cat=education')}>
                            <BookOpen size={20} /> <span>Eğitim Rehberi</span>
                        </button>
                    </div>

                    <div className="drawer-section">
                        <p className="section-label">DİĞER</p>
                        <button className="drawer-item">
                            <Settings size={20} /> <span>Ayarlar</span>
                        </button>
                        <button className="drawer-item">
                            <Info size={20} /> <span>Hakkında</span>
                        </button>
                    </div>
                </div>

                <div className="drawer-footer">
                    <p>v1.2.0 • GoldWebApp</p>
                </div>
            </div>
        </>
    );
};
