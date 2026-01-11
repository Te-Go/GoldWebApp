import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface WatchlistContextType {
    favorites: string[];
    isFavorite: (id: string) => boolean;
    toggleFavorite: (id: string) => void;
    clearFavorites: () => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

const STORAGE_KEY = 'gold_watchlist';

interface WatchlistProviderProps {
    children: ReactNode;
}

export const WatchlistProvider = ({ children }: WatchlistProviderProps) => {
    const [favorites, setFavorites] = useState<string[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    // Persist to localStorage whenever favorites change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const isFavorite = useCallback((id: string) => {
        return favorites.includes(id);
    }, [favorites]);

    const toggleFavorite = useCallback((id: string) => {
        setFavorites(prev => {
            if (prev.includes(id)) {
                return prev.filter(f => f !== id);
            } else {
                return [...prev, id];
            }
        });
    }, []);

    const clearFavorites = useCallback(() => {
        setFavorites([]);
    }, []);

    return (
        <WatchlistContext.Provider value={{
            favorites,
            isFavorite,
            toggleFavorite,
            clearFavorites
        }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = (): WatchlistContextType => {
    const context = useContext(WatchlistContext);
    if (context === undefined) {
        throw new Error('useWatchlist must be used within a WatchlistProvider');
    }
    return context;
};
