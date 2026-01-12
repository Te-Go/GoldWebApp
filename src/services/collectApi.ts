// CollectAPI Service for fetching real-time gold prices
// API Documentation: https://docs.collectapi.com/

const COLLECT_API_BASE = 'https://api.collectapi.com';
const COLLECT_API_KEY = import.meta.env.VITE_COLLECT_API_KEY;

export interface CollectApiGoldItem {
    name: string;
    buy?: string | number;
    sell?: string | number;
    buying?: string | number;
    selling?: string | number;
    price?: string | number;
    uschange?: string | number;
}

export interface CollectApiGoldResponse {
    success: boolean;
    result: CollectApiGoldItem[];
}

// Map CollectAPI names to our internal IDs
const NAME_TO_ID_MAP: Record<string, string> = {
    'ONS': 'ons', 'ONS Altın': 'ons', 'Ons Altın': 'ons',
    'Gram Altın': 'gram', 'Has Altın': 'gram', '24 Ayar Altın': 'gram', 'Külçe Altın': 'kulce',
    'Çeyrek Altın': 'ceyrek', 'Yeni Çeyrek Altın': 'ceyrek', 'Eski Çeyrek Altın': 'eski_ceyrek',
    'Yarım Altın': 'yarim', 'Yeni Yarım Altın': 'yarim', 'Eski Yarım Altın': 'eski_yarim',
    'Tam Altın': 'tam', 'Yeni Tam Altın': 'tam', 'Eski Tam Altın': 'eski_tam',
    'Cumhuriyet Altını': 'cumhuriyet', 'Ata Altın': 'ata', 'Reşat Altın': 'resat', 'Hamit Altın': 'hamit',
    '14 Ayar Altın': '14ayar', '18 Ayar Altın': '18ayar', '22 Ayar Altın': '22ayar',
    '22 Ayar Bilezik': 'bilezik_22', '14 Ayar Bilezik': 'bilezik_14', 'Bilezik': 'bilezik_22',
    'Ziynet Altın': 'ziynet', 'İşçilikli Ziynet': 'ziynet',
    'Gremse Altın': 'gremse', 'Beşli Gremse': 'gremse_besli', 'Gremse Beşli': 'gremse_besli',
    'Ata Beşli': 'ata_besli', 'Teklik': 'teklik', 'Ikili Altın': 'ikili',
    'Gümüş': 'gumus', 'Gümüş ONS': 'gumus_ons',
};

const ID_TO_NAME_TR: Record<string, string> = {
    'ons': 'ONS Altın', 'gram': 'Gram Altın', 'kulce': 'Külçe Altın',
    'ceyrek': 'Çeyrek Altın', 'eskiceyrek': 'Eski Çeyrek',
    'yarim': 'Yarım Altın', 'eski_yarim': 'Eski Yarım',
    'tam': 'Tam Altın', 'eski_tam': 'Eski Tam',
    'cumhuriyet': 'Cumhuriyet Altını', 'ata': 'Ata Altın', 'resat': 'Reşat Altın', 'hamit': 'Hamit Altın',
    '14ayar': '14 Ayar Altın', '18ayar': '18 Ayar Altın', '22ayar': '22 Ayar Altın',
    'bilezik_22': '22 Ayar Bilezik', 'bilezik_14': '14 Ayar Bilezik',
    'ziynet': 'Ziynet Altın', 'gremse': 'Gremse Altın', 'gremse_besli': 'Gremse Beşli',
    'ata_besli': 'Ata Beşli', 'teklik': 'Teklik Altın', 'ikili': 'İkili Altın',
    'gumus': 'Gümüş', 'gumus_ons': 'Gümüş ONS',
};

const ID_TO_ICON: Record<string, string> = {
    'ons': '📊', 'gram': '🪙', 'kulce': '🧱',
    'ceyrek': '🥇', 'eski_ceyrek': '🥇',
    'yarim': '🥈', 'eski_yarim': '🥈',
    'tam': '🏅', 'eski_tam': '🏅',
    'cumhuriyet': '🏛️', 'ata': '👤', 'resat': '👑', 'hamit': '👑',
    '14ayar': '💍', '18ayar': '💍', '22ayar': '💍',
    'bilezik_22': '📿', 'bilezik_14': '📿',
    'ziynet': '✨', 'gremse': '🥞', 'gremse_besli': '📦', 'ata_besli': '🎖️',
    'teklik': '🔘', 'ikili': '🔗', 'gumus': '🥈', 'gumus_ons': '🥈',
};

// Cache configuration
const CACHE_KEY = 'gold_prices_cache';
const CURRENCY_CACHE_KEY = 'currency_prices_cache';
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 Hours

interface CachedData<T> {
    timestamp: number;
    data: T;
}

/**
 * Generic Cache Wrapper
 */
async function getCachedData<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
    const cached = localStorage.getItem(key);
    if (cached) {
        try {
            const parsed: CachedData<T> = JSON.parse(cached);
            const age = Date.now() - parsed.timestamp;
            if (age < CACHE_DURATION_MS) {
                console.log(`Using cached data for ${key} (${Math.round(age / 1000 / 60)} mins old)`);
                return parsed.data;
            }
        } catch (e) {
            console.warn(`Failed to parse cache for ${key}`, e);
        }
    }

    console.log(`Fetching fresh data for ${key}...`);
    const data = await fetchFn();
    localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
    return data;
}

/**
 * Fetch gold prices from CollectAPI
 */
export async function fetchGoldPrices(): Promise<CollectApiGoldResponse> {
    const response = await fetch(`${COLLECT_API_BASE}/economy/goldPrice`, {
        method: 'GET',
        headers: { 'Authorization': COLLECT_API_KEY, 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error(`CollectAPI request failed: ${response.status}`);
    const data: CollectApiGoldResponse = await response.json();
    if (!data.success) throw new Error('CollectAPI returned unsuccessful response');
    return data;
}

/**
 * Fetch currency prices (USD, EUR, BTC)
 */
export async function fetchCurrencyPrices(): Promise<CollectApiGoldResponse> {
    const response = await fetch(`${COLLECT_API_BASE}/economy/allCurrency`, {
        method: 'GET',
        headers: { 'Authorization': COLLECT_API_KEY, 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error(`CollectAPI Currency request failed: ${response.status}`);
    const data: CollectApiGoldResponse = await response.json();
    if (!data.success) throw new Error('CollectAPI returned unsuccessful response');
    return data;
}

function parsePrice(priceInput?: string | number): number {
    if (priceInput === undefined || priceInput === null || priceInput === '-') return 0;
    if (typeof priceInput === 'number') return priceInput;
    const priceStr = String(priceInput);
    if (!priceStr.includes(',') && priceStr.includes('.')) return parseFloat(priceStr);
    const cleanStr = priceStr.replace(/\./g, '').replace(',', '.');
    return parseFloat(cleanStr) || 0;
}

export function transformToGoldPrices(apiResponse: CollectApiGoldResponse, previousPrices?: Map<string, { buy: number; sell: number }>) {
    return apiResponse.result
        .map(item => {
            const id = NAME_TO_ID_MAP[item.name.trim()];
            if (!id) return null;

            const buyStr = item.buy || item.buying || item.price;
            const sellStr = item.sell || item.selling;
            const buy = parsePrice(buyStr);
            const sell = parsePrice(sellStr) || buy;

            let change = 0;
            let changePercent = 0;
            if (previousPrices?.has(id)) {
                const prevPrice = previousPrices.get(id)!;
                change = buy - prevPrice.buy;
                changePercent = prevPrice.buy > 0 ? (change / prevPrice.buy) * 100 : 0;
            }

            return {
                id,
                name: item.name,
                nameTr: ID_TO_NAME_TR[id] || item.name,
                buy,
                sell,
                change: Math.round(change * 100) / 100,
                changePercent: Math.round(changePercent * 100) / 100,
                icon: ID_TO_ICON[id] || '🪙',
            };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);
}

export async function getGoldPrices(previousPrices?: Map<string, { buy: number; sell: number }>) {
    const data = await getCachedData(CACHE_KEY, fetchGoldPrices);
    return transformToGoldPrices(data, previousPrices);
}

export async function getCurrencyData() {
    const data = await getCachedData(CURRENCY_CACHE_KEY, fetchCurrencyPrices);
    // Transform specifically for MacroData
    // CollectAPI allCurrency returns items like: { name: 'Amerikan Doları', buying: 30.12, selling: 30.15 }

    const findPrice = (name: string, code: string) => {
        const item = data.result.find(i => i.name === name || i.name === code);
        if (!item) return 0;
        return parsePrice(item.selling || item.sell || item.buying || item.buy);
    };

    return {
        usd: findPrice('Amerikan Doları', 'USD'),
        eur: findPrice('Euro', 'EUR'),
        btc: findPrice('Bitcoin', 'BTC')
    };
}
