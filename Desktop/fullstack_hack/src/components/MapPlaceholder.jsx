export default function MapPlaceholder({ markers = [], center, radius, height = '300px', className = '' }) {
  const statusColors = { active: '#22c55e', out: '#ef4444', removed: '#9ca3af' };

  return (
    <div
      className={`relative bg-gradient-to-br from-primary-50 via-blue-50 to-sky-100 rounded-2xl border border-primary-100 overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Radius circle */}
      {radius && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary-300 bg-primary-100/30 animate-pulse-soft"
          style={{ width: `${Math.min(radius / 2, 200)}px`, height: `${Math.min(radius / 2, 200)}px` }}
        />
      )}

      {/* Center pin */}
      {center && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <div className="w-4 h-4 bg-primary-500 rounded-full border-2 border-white shadow-lg" />
          <div className="w-0.5 h-3 bg-primary-500" />
        </div>
      )}

      {/* Volunteer markers */}
      {markers.map((marker, i) => {
        const angle = (i * (360 / markers.length)) * (Math.PI / 180);
        const dist = 40 + Math.random() * 60;
        const x = 50 + Math.cos(angle) * dist / 3;
        const y = 50 + Math.sin(angle) * dist / 3;

        return (
          <div key={marker.id || i}
            className="absolute flex flex-col items-center group"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div
              className="w-3 h-3 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-150"
              style={{ backgroundColor: statusColors[marker.status] || '#9ca3af' }}
            />
            <div className="hidden group-hover:block absolute -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
              {marker.name}
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex gap-3 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-xl text-xs">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Active</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Out</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-gray-400" /> Removed</span>
      </div>

      {/* Location text */}
      {center && (
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-medium text-gray-600">
          📍 {center}
        </div>
      )}
    </div>
  );
}
