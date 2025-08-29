const Sparkline = ({ data, isPositive }) => {
    if (!data || data.length === 0) return <div className="w-20 h-8 bg-gray-100 rounded animate-pulse" />;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    const height = 32;
    const width = 80;

    const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width={width} height={height} className="overflow-visible">
            <polyline
                points={points}
                fill="none"
                stroke={isPositive ? '#10b981' : '#ef4444'}
                strokeWidth="2"
            />
        </svg>
    )
}

export default Sparkline