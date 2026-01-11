// Extended market data for comprehensive price display
// Inspired by Hakan Altın's multi-section layout

export interface ForexRate {
    pair: string;
    pairTr: string;
    buy: number;
    sell: number;
    change: number;
}

export interface GramWeight {
    grams: number;
    label: string;
    buy: number;
    sell: number;
}

export interface JewelryKarat {
    karat: number;
    label: string;
    labelTr: string;
    buy: number;
    sell: number;
}

export interface BankPrice {
    bankId: string;
    bankName: string;
    shortName: string;
    gramBuy: number;
    gramSell: number;
    ceyrekBuy: number;
    ceyrekSell: number;
    lastUpdate: string;
}

// Forex rates (Döviz)
export const forexRates: ForexRate[] = [
    { pair: 'USD/TRY', pairTr: 'Amerikan Doları', buy: 35.42, sell: 35.48, change: 0.21 },
    { pair: 'EUR/TRY', pairTr: 'Euro', buy: 38.15, sell: 38.24, change: 0.18 },
    { pair: 'GBP/TRY', pairTr: 'İngiliz Sterlini', buy: 44.85, sell: 44.98, change: 0.32 },
    { pair: 'CHF/TRY', pairTr: 'İsviçre Frangı', buy: 39.42, sell: 39.56, change: 0.15 },
    { pair: 'XAU/USD', pairTr: 'ONS (USD)', buy: 2648.50, sell: 2652.30, change: 0.69 },
    { pair: 'XAU/TRY', pairTr: 'ONS (TL)', buy: 93820, sell: 93960, change: 0.85 },
];

// Gram weight options (like Hakan Altın)
export const gramWeights: GramWeight[] = [
    { grams: 1, label: '1 GR', buy: 3245.50, sell: 3268.75 },
    { grams: 2.5, label: '2.5 GR', buy: 8113.75, sell: 8171.88 },
    { grams: 5, label: '5 GR', buy: 16227.50, sell: 16343.75 },
    { grams: 10, label: '10 GR', buy: 32455.00, sell: 32687.50 },
    { grams: 20, label: '20 GR', buy: 64910.00, sell: 65375.00 },
    { grams: 50, label: '50 GR', buy: 162275.00, sell: 163437.50 },
    { grams: 100, label: '100 GR', buy: 324550.00, sell: 326875.00 },
];

// Jewelry karat options (Ziynet & Sarrafiye)
export const jewelryKarats: JewelryKarat[] = [
    { karat: 8, label: '8K', labelTr: '8 Ayar Altın', buy: 1083.00, sell: 1108.00 },
    { karat: 14, label: '14K', labelTr: '14 Ayar Altın', buy: 1894.00, sell: 1937.00 },
    { karat: 18, label: '18K', labelTr: '18 Ayar Altın', buy: 2434.00, sell: 2489.00 },
    { karat: 22, label: '22K', labelTr: '22 Ayar Altın', buy: 2975.00, sell: 3043.00 },
    { karat: 24, label: '24K', labelTr: '24 Ayar (Has)', buy: 3245.50, sell: 3268.75 },
];

// Major Turkish banks with gold prices
export const bankPrices: BankPrice[] = [
    { bankId: 'isbank', bankName: 'Türkiye İş Bankası', shortName: 'İş Bankası', gramBuy: 3180.00, gramSell: 3340.00, ceyrekBuy: 5200.00, ceyrekSell: 5460.00, lastUpdate: '12:45' },
    { bankId: 'akbank', bankName: 'Akbank', shortName: 'Akbank', gramBuy: 3175.00, gramSell: 3345.00, ceyrekBuy: 5195.00, ceyrekSell: 5465.00, lastUpdate: '12:44' },
    { bankId: 'garanti', bankName: 'Garanti BBVA', shortName: 'Garanti', gramBuy: 3182.00, gramSell: 3338.00, ceyrekBuy: 5205.00, ceyrekSell: 5455.00, lastUpdate: '12:46' },
    { bankId: 'ziraat', bankName: 'Ziraat Bankası', shortName: 'Ziraat', gramBuy: 3170.00, gramSell: 3350.00, ceyrekBuy: 5185.00, ceyrekSell: 5470.00, lastUpdate: '12:43' },
    { bankId: 'yapikredi', bankName: 'Yapı Kredi', shortName: 'Yapı Kredi', gramBuy: 3178.00, gramSell: 3342.00, ceyrekBuy: 5198.00, ceyrekSell: 5462.00, lastUpdate: '12:45' },
    { bankId: 'vakifbank', bankName: 'Vakıfbank', shortName: 'Vakıfbank', gramBuy: 3172.00, gramSell: 3348.00, ceyrekBuy: 5190.00, ceyrekSell: 5468.00, lastUpdate: '12:44' },
    { bankId: 'halkbank', bankName: 'Halkbank', shortName: 'Halkbank', gramBuy: 3168.00, gramSell: 3352.00, ceyrekBuy: 5182.00, ceyrekSell: 5472.00, lastUpdate: '12:42' },
    { bankId: 'qnb', bankName: 'QNB Finansbank', shortName: 'QNB', gramBuy: 3176.00, gramSell: 3344.00, ceyrekBuy: 5196.00, ceyrekSell: 5464.00, lastUpdate: '12:45' },
    { bankId: 'teb', bankName: 'TEB', shortName: 'TEB', gramBuy: 3174.00, gramSell: 3346.00, ceyrekBuy: 5194.00, ceyrekSell: 5466.00, lastUpdate: '12:43' },
    { bankId: 'denizbank', bankName: 'Denizbank', shortName: 'Denizbank', gramBuy: 3173.00, gramSell: 3347.00, ceyrekBuy: 5193.00, ceyrekSell: 5467.00, lastUpdate: '12:44' },
    { bankId: 'ing', bankName: 'ING Bank', shortName: 'ING', gramBuy: 3171.00, gramSell: 3349.00, ceyrekBuy: 5191.00, ceyrekSell: 5469.00, lastUpdate: '12:41' },
    { bankId: 'hsbc', bankName: 'HSBC', shortName: 'HSBC', gramBuy: 3179.00, gramSell: 3341.00, ceyrekBuy: 5199.00, ceyrekSell: 5461.00, lastUpdate: '12:46' },
];

// Kapalı Çarşı (Grand Bazaar) prices - the reference for jewelry trade
export const kapaliCarsiPrices = {
    lastUpdate: new Date().toISOString(),
    source: 'Kapalı Çarşı Kuyumcular',
    gram: { buy: 3245.50, sell: 3268.75 },
    ceyrek: { buy: 5312.00, sell: 5398.00 },
    yarim: { buy: 10624.00, sell: 10796.00 },
    tam: { buy: 21168.00, sell: 21472.00 },
    cumhuriyet: { buy: 21948.00, sell: 22356.00 },
    ata: { buy: 21948.00, sell: 22356.00 },
    resat: { buy: 23580.00, sell: 24120.00 },
};

// Helper to find best bank prices
export const getBestBankPrices = () => {
    const bestBuy = bankPrices.reduce((best, bank) =>
        bank.gramBuy > best.gramBuy ? bank : best, bankPrices[0]);
    const bestSell = bankPrices.reduce((best, bank) =>
        bank.gramSell < best.gramSell ? bank : best, bankPrices[0]);
    return { bestBuy, bestSell };
};
