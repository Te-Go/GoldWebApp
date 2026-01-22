
import { ArrowLeft, Menu, Search, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LiveTicker } from '../global/LiveTicker'; // Repurposing existing ticker
import { SideDrawer } from './SideDrawer'; // Circular dependency risk? No, importing SideDrawer here is fine if SideDrawer is simple.
import './TopAppBar.css';

export const TopAppBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isdrawerOpen, setIsDrawerOpen] = useState(false);

    // Logic to determine if we show Back or Menu
    const isRootPage = ['/', '/markets', '/calculator', '/safe', '/news'].includes(location.pathname);
    const showBackButton = !isRootPage;

    const handleLeftClick = () => {
        if (showBackButton) {
            navigate(-1); // Go back in history
        } else {
            setIsDrawerOpen(true);
        }
    };

    return (
        <>
            <header className="top-app-bar-container">
                <div className="top-bar-main">
                    <button
                        className="icon-btn left-action"
                        onClick={handleLeftClick}
                        aria-label={showBackButton ? "Geri Dön" : "Menü"}
                    >
                        {showBackButton ? <ArrowLeft size={24} /> : <Menu size={24} />}
                    </button>

                    <div className="app-branding" onClick={() => navigate('/')}>
                        <h1 className="brand-title">Altın<span className="brand-dot">.</span>tr</h1>
                    </div>

                    <button className="icon-btn right-action" aria-label="Ara">
                        <Search size={22} />
                    </button>
                </div>

                {/* Live Ticker sits below the main bar */}
                <LiveTicker />
            </header>

            {/* Side Drawer Component */}
            <SideDrawer
                isOpen={isdrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </>
    );
};
