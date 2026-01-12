import { useState, useMemo } from 'react';
import { useGold } from '../../context/GoldContext';
import { GlassCard } from '../ui/GlassCard';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceLine } from 'recharts';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import './InflationChart.css';

type TimeRange = '1W' | '1M' | '3M' | '6M' | '1Y';
type GoldType = 'gram' | 'ceyrek';

interface InflationChartProps {
    goldType?: GoldType;
}

export const InflationChart = ({ goldType: initialGoldType = 'gram' }: InflationChartProps) => {
    const [timeRange, setTimeRange] = useState<TimeRange>('1M');
    const [goldType, setGoldType] = useState<GoldType>(initialGoldType);
    const [showEnag, setShowEnag] = useState(false);
    const { payload } = useGold();

    const timeRanges: { id: TimeRange; label: string; days: number }[] = [
        { id: '1W', label: '1H', days: 7 },
        { id: '1M', label: '1A', days: 30 },
        { id: '3M', label: '3A', days: 90 },
        { id: '6M', label: '6A', days: 180 },
        { id: '1Y', label: '1Y', days: 365 },
    ];

    // Get historical data based on gold type
    const historicalData = goldType === 'gram' ? payload.historical.gram : payload.historical.ceyrek;

    // Filter data based on time range
    const chartData = useMemo(() => {
        const range = timeRanges.find(r => r.id === timeRange);
        const daysToShow = range?.days || 30;
        const pointsNeeded = Math.min(daysToShow / 3, historicalData.length); // Show ~1 point per 3 days
        const sliceStart = Math.max(0, historicalData.length - Math.ceil(pointsNeeded));

        return historicalData.slice(sliceStart).map(item => ({
            date: item.date,
            price: item.price,
            priceEnag: item.priceEnag || item.price,
            label: item.date.split('-')[1] + '/' + item.date.split('-')[0].slice(2)
        }));
    }, [historicalData, timeRange]);

    // Calculate stats
    const stats = useMemo(() => {
        const dataKey = showEnag ? 'priceEnag' : 'price';
        const current = chartData[chartData.length - 1]?.[dataKey] || 0;
        const start = chartData[0]?.[dataKey] || 0;
        const change = current - start;
        const changePercent = start > 0 ? ((change / start) * 100) : 0;
        const high = Math.max(...chartData.map(d => d[dataKey]));
        const low = Math.min(...chartData.map(d => d[dataKey]));

        return { current, start, change, changePercent, high, low };
    }, [chartData, showEnag]);

    const dataKey = showEnag ? 'priceEnag' : 'price';

    const formatPrice = (value: number) => {
        return `₺${value.toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    };

    return (
        <section className="inflation-chart enhanced">
            <GlassCard className="chart-card">
                {/* Header with Controls */}
                <div className="chart-header-enhanced">
                    <div className="chart-type-selector">
                        <button
                            className={`type-btn ${goldType === 'gram' ? 'active' : ''}`}
                            onClick={() => setGoldType('gram')}
                        >
                            🪙 Gram
                        </button>
                        <button
                            className={`type-btn ${goldType === 'ceyrek' ? 'active' : ''}`}
                            onClick={() => setGoldType('ceyrek')}
                        >
                            🥇 Çeyrek
                        </button>
                    </div>

                    <div className="time-range-selector">
                        {timeRanges.map(range => (
                            <button
                                key={range.id}
                                className={`range-btn ${timeRange === range.id ? 'active' : ''}`}
                                onClick={() => setTimeRange(range.id)}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats Row */}
                <div className="chart-stats-row">
                    <div className="stat-item primary">
                        <span className="stat-label">Güncel</span>
                        <span className="stat-value tabular-nums">{formatPrice(stats.current)}</span>
                    </div>
                    <div className={`stat-item ${stats.changePercent >= 0 ? 'positive' : 'negative'}`}>
                        <span className="stat-label">Değişim</span>
                        <span className="stat-value tabular-nums">
                            {stats.changePercent >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            {stats.changePercent >= 0 ? '+' : ''}{stats.changePercent.toFixed(2)}%
                        </span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">En Yüksek</span>
                        <span className="stat-value tabular-nums text-up">{formatPrice(stats.high)}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">En Düşük</span>
                        <span className="stat-value tabular-nums text-down">{formatPrice(stats.low)}</span>
                    </div>
                </div>

                {/* Chart */}
                <div className="chart-container enhanced">
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="goldGradientEnhanced" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={stats.changePercent >= 0 ? '#22c55e' : '#ef4444'} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={stats.changePercent >= 0 ? '#22c55e' : '#ef4444'} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="label"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 10 }}
                                interval="preserveStartEnd"
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 10 }}
                                domain={['dataMin - 50', 'dataMax + 50']}
                                tickFormatter={(val) => `₺${(val / 1000).toFixed(1)}K`}
                                width={52}
                            />
                            <ReferenceLine y={stats.start} stroke="#64748b" strokeDasharray="3 3" />
                            <Tooltip
                                contentStyle={{
                                    background: 'rgba(13, 36, 64, 0.95)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    color: '#e7f0fa'
                                }}
                                formatter={(value) => [formatPrice(value as number), showEnag ? 'Gerçek Değer' : 'Fiyat']}
                                labelFormatter={(label) => `📅 ${label}`}
                            />
                            <Area
                                type="monotone"
                                dataKey={dataKey}
                                stroke={stats.changePercent >= 0 ? '#22c55e' : '#ef4444'}
                                strokeWidth={2}
                                fill="url(#goldGradientEnhanced)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Toggle and Footer */}
                <div className="chart-footer">
                    <div className="enag-toggle">
                        <button
                            className={`toggle-btn ${!showEnag ? 'active' : ''}`}
                            onClick={() => setShowEnag(false)}
                        >
                            Resmi (TÜİK)
                        </button>
                        <button
                            className={`toggle-btn ${showEnag ? 'active' : ''}`}
                            onClick={() => setShowEnag(true)}
                        >
                            Gerçek (ENAG)
                        </button>
                    </div>

                    <div className="chart-meta">
                        <Calendar size={12} />
                        <span>Son güncelleme: {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>
            </GlassCard>
        </section>
    );
};
