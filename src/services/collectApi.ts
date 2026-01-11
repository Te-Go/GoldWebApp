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
    // Some APIs return priceStr
    price?: string | number;
    uschange?: string | number; // For ONS sometimes
}

export interface CollectApiGoldResponse {
    success: boolean;
    result: CollectApiGoldItem[];
}

// Map CollectAPI names to our internal IDs
const NAME_TO_ID_MAP: Record<string, string> = {
    // === GOLD BULLION / EXTERNAL ===
    'ONS': 'ons',
    'ONS Altın': 'ons',
    'Ons Altın': 'ons',

    // === GRAM GOLD (24K) ===
    'Gram Altın': 'gram',
    'Has Altın': 'gram',
    '24 Ayar Altın': 'gram',
    'Külçe Altın': 'kulce',

    // === COINS - ÇEYREK FAMILY ===
    'Çeyrek Altın': 'ceyrek',
    'Yeni Çeyrek Altın': 'ceyrek',
    'Eski Çeyrek Altın': 'eski_ceyrek',

    // === COINS - YARIM / TAM ===
    'Yarım Altın': 'yarim',
    'Yeni Yarım Altın': 'yarim',
    'Eski Yarım Altın': 'eski_yarim',
    'Tam Altın': 'tam',
    'Yeni Tam Altın': 'tam',
    'Eski Tam Altın': 'eski_tam',

    // === COMMEMORATIVE COINS ===
    'Cumhuriyet Altını': 'cumhuriyet',
    'Ata Altın': 'ata',
    'Reşat Altın': 'resat',
    'Hamit Altın': 'hamit',

    // === JEWELRY GOLD (KARAT) ===
    '14 Ayar Altın': '14ayar',
    '18 Ayar Altın': '18ayar',
    '22 Ayar Altın': '22ayar',

    // === BILEZIK (BRACELET) ===
    '22 Ayar Bilezik': 'bilezik_22',
    '14 Ayar Bilezik': 'bilezik_14',
    'Bilezik': 'bilezik_22',

    // === ZIYNET (ORNAMENTAL) ===
    'Ziynet Altın': 'ziynet',
    'İşçilikli Ziynet': 'ziynet',

    // === BUNDLES / GREMSE ===
    'Gremse Altın': 'gremse',
    'Beşli Gremse': 'gremse_besli',
    'Gremse Beşli': 'gremse_besli',
    'Ata Beşli': 'ata_besli',
    'Teklik': 'teklik',
    'Ikili Altın': 'ikili',

    // === GUMUS (SILVER) ===
    'Gümüş': 'gumus',
    'Gümüş ONS': 'gumus_ons',
};

// Turkish names for display
const ID_TO_NAME_TR: Record<string, string> = {
    'ons': 'ONS Altın',
    'gram': 'Gram Altın',
    'kulce': 'Külçe Altın',
    'ceyrek': 'Çeyrek Altın',
    'eski_ceyrek': 'Eski Çeyrek',
    'yarim': 'Yarım Altın',
    'eski_yarim': 'Eski Yarım',
    'tam': 'Tam Altın',
    'eski_tam': 'Eski Tam',
    'cumhuriyet': 'Cumhuriyet Altını',
    'ata': 'Ata Altın',
    'resat': 'Reşat Altın',
    'hamit': 'Hamit Altın',
    '14ayar': '14 Ayar Altın',
    '18ayar': '18 Ayar Altın',
    '22ayar': '22 Ayar Altın',
    'bilezik_22': '22 Ayar Bilezik',
    'bilezik_14': '14 Ayar Bilezik',
    'ziynet': 'Ziynet Altın',
    'gremse': 'Gremse Altın',
    'gremse_besli': 'Gremse Beşli',
    'ata_besli': 'Ata Beşli',
    'teklik': 'Teklik Altın',
    'ikili': 'İkili Altın',
    'gumus': 'Gümüş',
    'gumus_ons': 'Gümüş ONS',
};

// Icons for each gold type
const ID_TO_ICON: Record<string, string> = {
    'ons': '📊',
    'gram': '🪙',
    'kulce': '🧱',
    'ceyrek': '🥇',
    'eski_ceyrek': '🥇',
    'yarim': '🥈',
    'eski_yarim': '🥈',
    'tam': '🏅',
    'eski_tam': '🏅',
    'cumhuriyet': '🏛️',
    'ata': '👤',
    'resat': '👑',
    'hamit': '👑',
    '14ayar': '💍',
    '18ayar': '💍',
    '22ayar': '💍',
    'bilezik_22': '📿',
    'bilezik_14': '📿',
    'ziynet': '✨',
    'gremse': '🥞',
    'gremse_besli': '📦',
    'ata_besli': '🎖️',
    'teklik': '🔘',
    'ikili': '🔗',
    'gumus': '🥈',
    'gumus_ons': '🥈',
};

/**
 * Fetch gold prices from CollectAPI
 */
export async function fetchGoldPrices(): Promise<CollectApiGoldResponse> {
    const response = await fetch(`${COLLECT_API_BASE}/economy/goldPrice`, {
        method: 'GET',
        headers: {
            'Authorization': COLLECT_API_KEY,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`CollectAPI request failed: ${response.status} ${response.statusText}`);
    }

    const data: CollectApiGoldResponse = await response.json();

    if (!data.success) {
        throw new Error('CollectAPI returned unsuccessful response');
    }

    return data;
}

/**
 * Parse a price string or number to number
 */
function parsePrice(priceInput?: string | number): number {
    if (priceInput === undefined || priceInput === null || priceInput === '-') return 0;

    // If it's already a number, return it
    if (typeof priceInput === 'number') {
        return priceInput;
    }

    // Convert to string just in case
    const priceStr = String(priceInput);

    // Check if it's already a number string like "1234.56"
    if (!priceStr.includes(',') && priceStr.includes('.')) {
        return parseFloat(priceStr);
    }

    // Turkish format: "3.245,50" -> 3245.50
    // Remove dots
    const cleanStr = priceStr.replace(/\./g, '').replace(',', '.');
    return parseFloat(cleanStr) || 0;
}

/**
 * Transform CollectAPI response to our GoldPrice format
 */
export function transformToGoldPrices(apiResponse: CollectApiGoldResponse, previousPrices?: Map<string, { buy: number; sell: number }>) {
    return apiResponse.result
        .map(item => {
            const id = NAME_TO_ID_MAP[item.name.trim()]; // Trim whitespace just in case
            if (!id) {
                // Unknown gold type, skip but log
                console.warn(`Unknown gold type from API: '${item.name}'`);
                return null;
            }

            // API can return 'buy'/'sell' OR 'buying'/'selling'
            const buyStr = item.buy || item.buying || item.price;
            const sellStr = item.sell || item.selling;

            const buy = parsePrice(buyStr);
            const sell = parsePrice(sellStr) || buy; // Use buy price if sell is missing

            // Calculate change from previous prices if available
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

// Cache configuration
const CACHE_KEY = 'gold_prices_cache';
const CACHE_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours (approx 3 calls/day = 90 calls/month)

interface CachedData {
    timestamp: number;
    data: CollectApiGoldResponse;
}

/**
 * Fetch and transform gold prices in one call, with caching
 */
export async function getGoldPrices(previousPrices?: Map<string, { buy: number; sell: number }>) {
    // 1. Check Cache
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        try {
            const parsed: CachedData = JSON.parse(cached);
            const age = Date.now() - parsed.timestamp;

            if (age < CACHE_DURATION_MS) {
                console.log(`Using cached gold prices (${Math.round(age / 1000 / 60)} mins old)`);
                return transformToGoldPrices(parsed.data, previousPrices);
            }
        } catch (e) {
            console.warn('Failed to parse cached gold data', e);
        }
    }

    // 2. Fetch Fresh Data
    console.log('Cache expired or missing, fetching fresh gold prices...');
    const apiResponse = await fetchGoldPrices();

    // 3. Save to Cache
    const cacheData: CachedData = {
        timestamp: Date.now(),
        data: apiResponse
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

    return transformToGoldPrices(apiResponse, previousPrices);
}
