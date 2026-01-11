import { useSentiment } from '../../context/GoldContext';
import { GlassCard } from '../ui/GlassCard';
import './SentimentMeter.css';

export const SentimentMeter = () => {
    const sentiment = useSentiment();

    // Convert sentiment score (-100 to 100) to angle (-90 to 90 degrees)
    const needleAngle = (sentiment.overall / 100) * 90;

    // Determine zone color based on score
    const getZoneClass = () => {
        if (sentiment.overall > 30) return 'zone-buy';
        if (sentiment.overall < -30) return 'zone-sell';
        return 'zone-hold';
    };

    return (
        <section className="sentiment-meter">
            <GlassCard className="sentiment-card">
                <h3 className="sentiment-title">Uzman Görüşü</h3>

                <div className="gauge-container">
                    <svg viewBox="0 0 200 120" className="gauge-svg">
                        {/* Background arc */}
                        <path
                            d="M 20 100 A 80 80 0 0 1 180 100"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="12"
                            strokeLinecap="round"
                        />

                        {/* Sell zone (red) */}
                        <path
                            d="M 20 100 A 80 80 0 0 1 60 35"
                            fill="none"
                            stroke="var(--color-down)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            opacity="0.6"
                        />

                        {/* Hold zone (grey) */}
                        <path
                            d="M 65 30 A 80 80 0 0 1 135 30"
                            fill="none"
                            stroke="var(--text-muted)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            opacity="0.6"
                        />

                        {/* Buy zone (green) */}
                        <path
                            d="M 140 35 A 80 80 0 0 1 180 100"
                            fill="none"
                            stroke="var(--color-up)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            opacity="0.6"
                        />

                        {/* Needle */}
                        <g transform={`rotate(${needleAngle}, 100, 100)`}>
                            <line
                                x1="100"
                                y1="100"
                                x2="100"
                                y2="30"
                                stroke="var(--accent-gold)"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            <circle
                                cx="100"
                                cy="100"
                                r="8"
                                fill="var(--accent-gold)"
                            />
                        </g>

                        {/* Labels */}
                        <text x="20" y="115" className="gauge-label" textAnchor="start">SAT</text>
                        <text x="100" y="25" className="gauge-label" textAnchor="middle">TUT</text>
                        <text x="180" y="115" className="gauge-label" textAnchor="end">AL</text>
                    </svg>
                </div>

                <div className={`sentiment-result ${getZoneClass()}`}>
                    {sentiment.label}
                </div>

                <div className="expert-list">
                    {sentiment.experts.map((expert, idx) => (
                        <div key={idx} className="expert-row">
                            <span className="expert-name">{expert.name}</span>
                            <span className={`expert-sentiment ${expert.sentiment}`}>
                                {expert.sentiment === 'positive' ? '📈' : expert.sentiment === 'negative' ? '📉' : '➖'}
                            </span>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </section>
    );
};
