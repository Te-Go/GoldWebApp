import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineProps {
    data: number[];
    color?: string;
    height?: number;
    showTrend?: boolean;
}

/**
 * Simple sparkline chart for showing price trends
 */
export const Sparkline = ({
    data,
    color = 'var(--gold-primary)',
    height = 40,
    showTrend = true
}: SparklineProps) => {
    if (!data || data.length < 2) {
        return <div style={{ height, opacity: 0.3, fontSize: '0.7rem' }}>Trend yok</div>;
    }

    // Determine trend for gradient color
    // Using actual hex colors because recharts doesn't resolve CSS variables
    const isUp = data[data.length - 1] > data[0];
    const trendColor = showTrend
        ? (isUp ? '#22c55e' : '#ef4444')  // green / red hex colors
        : '#ffd700';  // gold default

    // Transform to recharts format
    const chartData = data.map((value, index) => ({ index, value }));

    return (
        <div style={{ width: '100%', height }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={trendColor}
                        strokeWidth={1.5}
                        dot={false}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

// Generate mock historical data for demo
export const generateMockHistory = (currentPrice: number, days: number = 7): number[] => {
    const history: number[] = [];
    let price = currentPrice * (0.95 + Math.random() * 0.1); // Start around current

    for (let i = 0; i < days * 4; i++) { // 4 data points per day
        const change = (Math.random() - 0.48) * (currentPrice * 0.005); // Slight upward bias
        price = Math.max(price + change, currentPrice * 0.8);
        history.push(Math.round(price * 100) / 100);
    }

    // Ensure last point is close to current
    history[history.length - 1] = currentPrice;

    return history;
};
