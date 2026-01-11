import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const [isSwitching, setIsSwitching] = useState(false);

    const handleToggle = () => {
        setIsSwitching(true);
        toggleTheme();

        // Reset animation state
        setTimeout(() => setIsSwitching(false), 400);
    };

    return (
        <div className="theme-toggle-wrapper">
            <button
                className={`theme-toggle ${isSwitching ? 'switching' : ''}`}
                onClick={handleToggle}
                data-theme={theme}
                aria-label={theme === 'dark' ? 'Açık moda geç' : 'Koyu moda geç'}
                title={theme === 'dark' ? 'Açık Mod' : 'Koyu Mod'}
            >
                <span className="theme-icon">
                    {theme === 'dark' ? (
                        <Sun size={20} strokeWidth={2} />
                    ) : (
                        <Moon size={20} strokeWidth={2} />
                    )}
                </span>
            </button>
            <span className="theme-toggle-tooltip">
                {theme === 'dark' ? 'Açık Mod' : 'Koyu Mod'}
            </span>
        </div>
    );
};
