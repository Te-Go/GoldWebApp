import { GoldConverter } from '../components/features/GoldConverter';
import { WeddingCalculator } from '../components/features/WeddingCalculator';
import { ZakatCalculator } from '../components/features/ZakatCalculator';
import './CalculatorPage.css';

export const CalculatorPage = () => {
    return (
        <div className="calculator-page">
            <header className="page-header">
                <h1 className="page-title">Hesaplama Araçları</h1>
                <p className="page-subtitle">Altın yatırımlarınızı planlayın</p>
            </header>

            <GoldConverter />
            <WeddingCalculator />
            <ZakatCalculator />
        </div>
    );
};
