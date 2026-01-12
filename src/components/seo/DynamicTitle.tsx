
import { Helmet } from 'react-helmet-async';
import { useGold } from '../../context/GoldContext';

export const DynamicTitle = () => {
    const { significantMove } = useGold();

    if (significantMove && significantMove.hasMove) {
        const { asset, direction, percent } = significantMove;
        const action = direction === 'up' ? 'Yükselişte' : 'Düşüşte';
        const hook = direction === 'down' ? ': Alım Fırsatı Mı?' : ': Rekor Kırıyor mu?';

        // Example: "Gram Altın %1.2 Yükselişte: Rekor Kırıyor mu? | Canlı Piyasalar"
        const title = `${asset} %${percent?.toFixed(2)} ${action}${hook} | Altın-Fiyatları.tr`;

        // Safety check for length (approx < 65 chars for Google)
        const safeTitle = title.length > 60
            ? `${asset} %${percent?.toFixed(1)} ${action} | Altın-Fiyatları.tr`
            : title;

        return (
            <Helmet>
                <title>{safeTitle}</title>
            </Helmet>
        );
    }

    // Default Title (if no big moves)
    return (
        <Helmet>
            <title>Altın Fiyatları | Canlı Gram, Çeyrek, Tam Altın - Altın-Fiyatları.tr</title>
        </Helmet>
    );
};
