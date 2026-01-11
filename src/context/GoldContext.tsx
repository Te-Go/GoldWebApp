import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import type { GoldPayload, GoldPrice } from '../data/mockPayload';
import { mockPayload } from '../data/mockPayload';
import { getGoldPrices } from '../services/collectApi';

interface GoldContextType {
    payload: GoldPayload;
    isConnected: boolean;
    lastUpdate: Date | null;
    isLoading: boolean;
    error: string | null;
    refreshData: () => Promise<void>;
}

const GoldContext = createContext<GoldContextType | undefined>(undefined);

// Check if window.GoldPayload exists (WordPress injection)
declare global {
    interface Window {
        GoldPayload?: GoldPayload;
    }
}

interface GoldProviderProps {
    children: ReactNode;
}

export const GoldProvider = ({ children }: GoldProviderProps) => {
    // Initialize with window.GoldPayload if available, otherwise use mock
    const [payload, setPayload] = useState<GoldPayload>(() => {
        if (typeof window !== 'undefined' && window.GoldPayload) {
            return window.GoldPayload;
        }
        return mockPayload;
    });

    const [isConnected, setIsConnected] = useState(true);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Track previous prices for change calculation
    const previousPricesRef = useRef<Map<string, { buy: number; sell: number }>>(new Map());

    // Fetch live data from CollectAPI
    const refreshData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Fetch from CollectAPI
            const apiPrices = await getGoldPrices(previousPricesRef.current);

            // Update previous prices for next comparison
            const newPricesMap = new Map<string, { buy: number; sell: number }>();
            apiPrices.forEach(p => {
                newPricesMap.set(p.id, { buy: p.buy, sell: p.sell });
            });
            previousPricesRef.current = newPricesMap;

            // Merge with existing prices (keep items not in API response)
            setPayload(prev => {
                const updatedPrices: GoldPrice[] = prev.prices.map(existingPrice => {
                    const apiPrice = apiPrices.find(p => p.id === existingPrice.id);
                    if (apiPrice) {
                        return {
                            ...existingPrice,
                            buy: apiPrice.buy,
                            sell: apiPrice.sell,
                            change: apiPrice.change,
                            changePercent: apiPrice.changePercent,
                        };
                    }
                    return existingPrice;
                });

                // Add any new prices from API that aren't in our existing list
                apiPrices.forEach(apiPrice => {
                    if (!updatedPrices.find(p => p.id === apiPrice.id)) {
                        updatedPrices.push(apiPrice);
                    }
                });

                return {
                    ...prev,
                    prices: updatedPrices,
                    lastUpdate: new Date().toISOString()
                };
            });

            setIsConnected(true);
            setLastUpdate(new Date());
            console.log('✅ CollectAPI: Fiyatlar güncellendi', apiPrices.length, 'öğe');
        } catch (err) {
            console.error('❌ CollectAPI güncelleme hatası:', err);
            setError(err instanceof Error ? err.message : 'Bağlantı hatası');
            setIsConnected(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Fetch data on mount and poll for updates every 60 seconds
    useEffect(() => {
        // Fetch immediately on mount
        refreshData();

        // Then poll every 60 seconds
        const interval = setInterval(() => {
            refreshData();
        }, 60000);

        return () => clearInterval(interval);
    }, [refreshData]);

    // Update market status based on time
    useEffect(() => {
        const checkMarketStatus = () => {
            const now = new Date();
            const hours = now.getHours();
            const day = now.getDay();

            // Turkish market hours: Mon-Sat 09:00-18:00 (approximate)
            const isWeekday = day >= 1 && day <= 6;
            const isMarketHours = hours >= 9 && hours < 18;
            const isOpen = isWeekday && isMarketHours;

            setPayload(prev => ({
                ...prev,
                macro: {
                    ...prev.macro,
                    marketOpen: isOpen
                }
            }));
        };

        checkMarketStatus();
        const interval = setInterval(checkMarketStatus, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <GoldContext.Provider value={{
            payload,
            isConnected,
            lastUpdate,
            isLoading,
            error,
            refreshData
        }}>
            {children}
        </GoldContext.Provider>
    );
};

export const useGold = (): GoldContextType => {
    const context = useContext(GoldContext);
    if (context === undefined) {
        throw new Error('useGold must be used within a GoldProvider');
    }
    return context;
};

// Helper hooks for specific data
export const useGoldPrices = () => {
    const { payload } = useGold();
    return payload.prices;
};

export const useGoldPrice = (id: string) => {
    const { payload } = useGold();
    return payload.prices.find(p => p.id === id);
};

export const useMacro = () => {
    const { payload } = useGold();
    return payload.macro;
};

export const useSentiment = () => {
    const { payload } = useGold();
    return payload.sentiment;
};

export const useSpread = () => {
    const { payload } = useGold();
    return payload.spreadData;
};
