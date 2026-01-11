// Mock payload matching the WordPress GoldPayload structure
export interface GoldPrice {
    id: string;
    name: string;
    nameTr: string;
    buy: number;
    sell: number;
    change: number;
    changePercent: number;
    icon?: string;
}

export interface SpreadData {
    bankAvgBuy: number;
    bankAvgSell: number;
    bazaarBuy: number;
    bazaarSell: number;
    spread: number;
}

export interface MacroData {
    breadPrice: number;
    fuelPrice: number;
    iphonePrice: number;
    inflationTuik: number;
    inflationEnag: number;
    usdTry: number;
    eurTry: number;
    btcUsd: number;
    marketOpen: boolean;
    bazaarSpreadOverride: number;
}

export interface SentimentExpert {
    name: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    score: number; // -100 to 100
}

export interface SentimentData {
    overall: number; // -100 to 100
    label: 'POZİTİF' | 'NÖTR' | 'NEGATİF';
    experts: SentimentExpert[];
}

export interface HistoricalPrice {
    date: string;
    price: number;
    priceEnag?: number;
}

export interface GoldPayload {
    prices: GoldPrice[];
    spreadData: SpreadData;
    macro: MacroData;
    sentiment: SentimentData;
    historical: {
        gram: HistoricalPrice[];
        ceyrek: HistoricalPrice[];
    };
    lastUpdate: string;
}

// Historical comparison data
const gramHistorical2020 = {
    breadCount: 210,
    fuelLiters: 48,
};

export const mockPayload: GoldPayload = {
    prices: [
        {
            id: 'gram',
            name: 'Gram Gold',
            nameTr: 'Gram Altın',
            buy: 3245.50,
            sell: 3268.75,
            change: 42.30,
            changePercent: 1.32,
            icon: '🪙'
        },
        {
            id: 'ceyrek',
            name: 'Quarter Gold',
            nameTr: 'Çeyrek Altın',
            buy: 5312.00,
            sell: 5398.00,
            change: 68.50,
            changePercent: 1.29,
            icon: '🥇'
        },
        {
            id: 'yarim',
            name: 'Half Gold',
            nameTr: 'Yarım Altın',
            buy: 10624.00,
            sell: 10796.00,
            change: 137.00,
            changePercent: 1.29,
            icon: '🥇'
        },
        {
            id: 'tam',
            name: 'Full Gold',
            nameTr: 'Tam Altın',
            buy: 21168.00,
            sell: 21472.00,
            change: 270.00,
            changePercent: 1.28,
            icon: '🥇'
        },
        {
            id: 'cumhuriyet',
            name: 'Republic Gold',
            nameTr: 'Cumhuriyet Altını',
            buy: 21948.00,
            sell: 22356.00,
            change: 285.00,
            changePercent: 1.31,
            icon: '🏛️'
        },
        {
            id: 'ata',
            name: 'Ata Gold',
            nameTr: 'Ata Altın',
            buy: 21948.00,
            sell: 22356.00,
            change: 285.00,
            changePercent: 1.31,
            icon: '👤'
        },
        {
            id: 'resat',
            name: 'Resat Gold',
            nameTr: 'Reşat Altın',
            buy: 23580.00,
            sell: 24120.00,
            change: 312.00,
            changePercent: 1.34,
            icon: '👑'
        },
        {
            id: 'hamit',
            name: 'Hamit Gold',
            nameTr: 'Hamit Altın',
            buy: 23580.00,
            sell: 24120.00,
            change: 312.00,
            changePercent: 1.34,
            icon: '👑'
        },
        {
            id: 'gremse',
            name: 'Gremse Gold (5-Stack)',
            nameTr: 'Gremse Altın',
            buy: 101538.24,
            sell: 104316.69,
            change: 1248.00,
            changePercent: 1.21,
            icon: '🥞'
        },
        {
            id: 'gremse_besli',
            name: 'Gremse Bundle (5x5)',
            nameTr: 'Gremse Beşli',
            buy: 202281.69,
            sell: 213394.16,
            change: 2540.00,
            changePercent: 1.20,
            icon: '📦'
        },
        {
            id: 'ata_besli',
            name: 'Ata Bundle (5x)',
            nameTr: 'Ata Beşli',
            buy: 208163.33,
            sell: 214407.92,
            change: 2680.00,
            changePercent: 1.27,
            icon: '🎖️'
        },
        {
            id: 'teklik',
            name: 'Single Full (Teklik)',
            nameTr: 'Teklik Altın',
            buy: 40541.93,
            sell: 41841.59,
            change: 520.00,
            changePercent: 1.26,
            icon: '🔘'
        },
        {
            id: 'ons',
            name: 'Ounce Gold',
            nameTr: 'ONS Altın',
            buy: 2648.50,
            sell: 2652.30,
            change: 18.20,
            changePercent: 0.69,
            icon: '📊'
        }
    ],
    spreadData: {
        bankAvgBuy: 3180.00,
        bankAvgSell: 3340.00,
        bazaarBuy: 3245.50,
        bazaarSell: 3268.75,
        spread: 94.50 // Bank spread is larger
    },
    macro: {
        breadPrice: 13.50, // TL per loaf
        fuelPrice: 47.85, // TL per liter
        iphonePrice: 89999, // iPhone 16 Pro TL
        inflationTuik: 0.58, // 58% official
        inflationEnag: 1.12, // 112% ENAG
        usdTry: 35.42,
        eurTry: 38.15,
        btcUsd: 98450,
        marketOpen: true,
        bazaarSpreadOverride: 0
    },
    sentiment: {
        overall: 65,
        label: 'POZİTİF',
        experts: [
            { name: 'İslam Memiş', sentiment: 'positive', score: 80 },
            { name: 'Tunç Şatıroğlu', sentiment: 'positive', score: 70 },
            { name: 'Şant Manukyan', sentiment: 'neutral', score: 45 }
        ]
    },
    historical: {
        gram: [
            { date: '2025-01', price: 2450, priceEnag: 2180 },
            { date: '2025-02', price: 2520, priceEnag: 2210 },
            { date: '2025-03', price: 2610, priceEnag: 2250 },
            { date: '2025-04', price: 2580, priceEnag: 2190 },
            { date: '2025-05', price: 2720, priceEnag: 2280 },
            { date: '2025-06', price: 2850, priceEnag: 2350 },
            { date: '2025-07', price: 2920, priceEnag: 2380 },
            { date: '2025-08', price: 2980, priceEnag: 2400 },
            { date: '2025-09', price: 3050, priceEnag: 2420 },
            { date: '2025-10', price: 3120, priceEnag: 2450 },
            { date: '2025-11', price: 3180, priceEnag: 2480 },
            { date: '2025-12', price: 3245, priceEnag: 2510 },
        ],
        ceyrek: [
            { date: '2025-01', price: 4012, priceEnag: 3570 },
            { date: '2025-02', price: 4130, priceEnag: 3620 },
            { date: '2025-03', price: 4275, priceEnag: 3690 },
            { date: '2025-04', price: 4225, priceEnag: 3590 },
            { date: '2025-05', price: 4455, priceEnag: 3730 },
            { date: '2025-06', price: 4670, priceEnag: 3850 },
            { date: '2025-07', price: 4782, priceEnag: 3900 },
            { date: '2025-08', price: 4880, priceEnag: 3930 },
            { date: '2025-09', price: 4995, priceEnag: 3960 },
            { date: '2025-10', price: 5108, priceEnag: 4010 },
            { date: '2025-11', price: 5210, priceEnag: 4060 },
            { date: '2025-12', price: 5312, priceEnag: 4110 },
        ]
    },
    lastUpdate: new Date().toISOString()
};

// Gold-to-goods calculations
export const calculateGoldToGoods = (gramPrice: number, macro: MacroData) => ({
    bread: {
        count: Math.floor(gramPrice / macro.breadPrice),
        comparison2020: gramHistorical2020.breadCount,
        trend: Math.floor(gramPrice / macro.breadPrice) > gramHistorical2020.breadCount ? 'up' : 'down'
    },
    fuel: {
        liters: Math.floor((gramPrice / macro.fuelPrice) * 10) / 10,
        comparison2020: gramHistorical2020.fuelLiters,
        trend: Math.floor(gramPrice / macro.fuelPrice) > gramHistorical2020.fuelLiters ? 'up' : 'down'
    },
    iphone: {
        ratio: Math.round((macro.iphonePrice / gramPrice) * 10) / 10,
        cumhuriyetRatio: 1.5 // Approximation
    }
});

// Wedding calculator logic
export const calculateWeddingBasket = (budget: number, prices: GoldPrice[]) => {
    const ceyrek = prices.find(p => p.id === 'ceyrek');
    const gram = prices.find(p => p.id === 'gram');

    if (!ceyrek || !gram) return { coins: [], remaining: budget };

    const ceyrekPrice = ceyrek.sell;
    const gramPrice = gram.sell;

    // Maximize çeyrek first, then gram
    const maxCeyrek = Math.floor(budget / ceyrekPrice);
    let remaining = budget - (maxCeyrek * ceyrekPrice);
    const gramCount = Math.floor(remaining / gramPrice);
    remaining = remaining - (gramCount * gramPrice);

    const coins: { type: string; count: number; price: number }[] = [];
    if (maxCeyrek > 0) coins.push({ type: 'ceyrek', count: maxCeyrek, price: ceyrekPrice });
    if (gramCount > 0) coins.push({ type: 'gram', count: gramCount, price: gramPrice });

    return { coins, remaining: Math.round(remaining * 100) / 100 };
};
