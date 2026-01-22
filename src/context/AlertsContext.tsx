import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
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

// =============================================================================
// NOTIFICATION THROTTLING CONFIGURATION
// =============================================================================
const NOTIFICATION_COOLDOWN_MS = 30000; // 30 seconds between notifications per asset

interface AlertsProviderProps {
    children: ReactNode;
}

/**
 * Safely write to localStorage with error handling
 */
function safeStorageSet(key: string, value: string): void {
    try {
        localStorage.setItem(key, value);
    } catch {
        console.warn(`localStorage unavailable for ${key}`);
    }
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

    // Track last notification time per goldId to prevent notification floods
    const lastNotificationTimeRef = useRef<Map<string, number>>(new Map());

    // Check notification permission on mount
    useEffect(() => {
        if ('Notification' in window) {
            setHasPermission(Notification.permission === 'granted');
        }
    }, []);

    // Persist to localStorage whenever alerts change (with error handling)
    useEffect(() => {
        safeStorageSet(STORAGE_KEY, JSON.stringify(alerts));
    }, [alerts]);

    // Check alerts against current prices with throttling
    useEffect(() => {
        if (!hasPermission || alerts.length === 0) return;

        const untriggeredAlerts = alerts.filter(a => !a.triggered);
        if (untriggeredAlerts.length === 0) return;

        const now = Date.now();
        const alertsToTrigger: PriceAlert[] = [];

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
                // Check throttle: only notify if cooldown has passed for this asset
                const lastNotifTime = lastNotificationTimeRef.current.get(alert.goldId) || 0;
                const timeSinceLastNotif = now - lastNotifTime;

                if (timeSinceLastNotif >= NOTIFICATION_COOLDOWN_MS) {
                    alertsToTrigger.push(alert);
                } else {
                    console.log(
                        `⏳ Throttling notification for ${alert.goldName}`,
                        `(${Math.round((NOTIFICATION_COOLDOWN_MS - timeSinceLastNotif) / 1000)}s remaining)`
                    );
                }
            }
        });

        // Fire notifications in batch (deduplicated by goldId)
        const notifiedGoldIds = new Set<string>();

        alertsToTrigger.forEach(alert => {
            // Only one notification per goldId per cycle
            if (notifiedGoldIds.has(alert.goldId)) return;
            notifiedGoldIds.add(alert.goldId);

            const price = payload.prices.find(p => p.id === alert.goldId);
            if (!price) return;

            const currentPrice = price.sell;

            // Show notification
            new Notification('💰 Altın Fiyat Alarmı!', {
                body: `${alert.goldName} fiyatı ₺${currentPrice.toLocaleString('tr-TR')} oldu! (Hedef: ₺${alert.targetPrice.toLocaleString('tr-TR')})`,
                icon: '🪙',
                tag: alert.goldId, // Use goldId as tag to replace previous notifications for same asset
            });

            // Update throttle timestamp
            lastNotificationTimeRef.current.set(alert.goldId, now);
            console.log(`🔔 Notification sent for ${alert.goldName}`);
        });

        // Mark all triggered alerts
        if (alertsToTrigger.length > 0) {
            const triggeredIds = new Set(alertsToTrigger.map(a => a.id));
            setAlerts(prev => prev.map(a =>
                triggeredIds.has(a.id) ? { ...a, triggered: true } : a
            ));
        }
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
