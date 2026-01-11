import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useGold } from './GoldContext';

export interface PriceAlert {
    id: string;
    goldId: string;
    goldName: string;
    targetPrice: number;
    direction: 'above' | 'below';
    triggered: boolean;
    createdAt: number;
}

interface AlertsContextType {
    alerts: PriceAlert[];
    addAlert: (goldId: string, goldName: string, targetPrice: number, direction: 'above' | 'below') => void;
    removeAlert: (alertId: string) => void;
    clearTriggeredAlerts: () => void;
    hasPermission: boolean;
    requestPermission: () => Promise<void>;
}

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

const STORAGE_KEY = 'gold_price_alerts';

interface AlertsProviderProps {
    children: ReactNode;
}

export const AlertsProvider = ({ children }: AlertsProviderProps) => {
    const { payload } = useGold();
    const [alerts, setAlerts] = useState<PriceAlert[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });
    const [hasPermission, setHasPermission] = useState(false);

    // Check notification permission on mount
    useEffect(() => {
        if ('Notification' in window) {
            setHasPermission(Notification.permission === 'granted');
        }
    }, []);

    // Persist to localStorage whenever alerts change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
    }, [alerts]);

    // Check alerts against current prices
    useEffect(() => {
        if (!hasPermission || alerts.length === 0) return;

        const untriggeredAlerts = alerts.filter(a => !a.triggered);
        if (untriggeredAlerts.length === 0) return;

        untriggeredAlerts.forEach(alert => {
            const price = payload.prices.find(p => p.id === alert.goldId);
            if (!price) return;

            const currentPrice = price.sell; // Use sell price for alerts
            let shouldTrigger = false;

            if (alert.direction === 'above' && currentPrice >= alert.targetPrice) {
                shouldTrigger = true;
            } else if (alert.direction === 'below' && currentPrice <= alert.targetPrice) {
                shouldTrigger = true;
            }

            if (shouldTrigger) {
                // Show notification
                new Notification('💰 Altın Fiyat Alarmı!', {
                    body: `${alert.goldName} fiyatı ₺${currentPrice.toLocaleString('tr-TR')} oldu! (Hedef: ₺${alert.targetPrice.toLocaleString('tr-TR')})`,
                    icon: '🪙',
                    tag: alert.id,
                });

                // Mark as triggered
                setAlerts(prev => prev.map(a =>
                    a.id === alert.id ? { ...a, triggered: true } : a
                ));
            }
        });
    }, [payload.prices, alerts, hasPermission]);

    const requestPermission = useCallback(async () => {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            setHasPermission(permission === 'granted');
        }
    }, []);

    const addAlert = useCallback((goldId: string, goldName: string, targetPrice: number, direction: 'above' | 'below') => {
        const newAlert: PriceAlert = {
            id: `alert_${Date.now()}`,
            goldId,
            goldName,
            targetPrice,
            direction,
            triggered: false,
            createdAt: Date.now(),
        };
        setAlerts(prev => [...prev, newAlert]);
    }, []);

    const removeAlert = useCallback((alertId: string) => {
        setAlerts(prev => prev.filter(a => a.id !== alertId));
    }, []);

    const clearTriggeredAlerts = useCallback(() => {
        setAlerts(prev => prev.filter(a => !a.triggered));
    }, []);

    return (
        <AlertsContext.Provider value={{
            alerts,
            addAlert,
            removeAlert,
            clearTriggeredAlerts,
            hasPermission,
            requestPermission
        }}>
            {children}
        </AlertsContext.Provider>
    );
};

export const useAlerts = (): AlertsContextType => {
    const context = useContext(AlertsContext);
    if (context === undefined) {
        throw new Error('useAlerts must be used within an AlertsProvider');
    }
    return context;
};
