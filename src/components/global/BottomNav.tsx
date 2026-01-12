
import { Home, TrendingUp, Calculator, Shield } from 'lucide-react';
import './BottomNav.css';

interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

interface BottomNavProps {
    activePage: string;
    onNavigate: (page: string) => void;
}

const navItems: NavItem[] = [
    { id: 'home', label: 'Ana Sayfa', icon: <Home size={22} /> },
    { id: 'markets', label: 'Piyasalar', icon: <TrendingUp size={22} /> },
    { id: 'calculator', label: 'Hesapla', icon: <Calculator size={22} /> },
    { id: 'safe', label: 'Kasam', icon: <Shield size={22} /> },
];

export const BottomNav = ({ activePage, onNavigate }: BottomNavProps) => {
    return (
        <nav className="bottom-nav">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                    onClick={() => onNavigate(item.id)}
                    aria-label={item.label}
                >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                </button>
            ))}
        </nav>
    );
};
