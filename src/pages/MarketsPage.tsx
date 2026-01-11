import { PriceTable } from '../components/features/PriceTable';
import { DarphaneIscilik } from '../components/features/DarphaneIscilik';
import { BulkPricing } from '../components/features/BulkPricing';
import { InflationChart } from '../components/features/InflationChart';
import { GoldFAQ } from '../components/features/GoldFAQ';
import './MarketsPage.css';

export const MarketsPage = () => {
    return (
        <div className="markets-page">
            <header className="page-header">
                <h1 className="page-title">Piyasalar</h1>
                <p className="page-subtitle">Anlık altın ve döviz fiyatları</p>
            </header>

            <PriceTable />
            <DarphaneIscilik />
            <BulkPricing />
            <InflationChart />
            <GoldFAQ />
        </div>
    );
};
