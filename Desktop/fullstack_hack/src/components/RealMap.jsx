import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icons (Leaflet + bundler issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom colored markers
const createColorIcon = (color) => new L.Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

const icons = {
  blue: createColorIcon('blue'),
  green: createColorIcon('green'),
  red: createColorIcon('red'),
  grey: createColorIcon('grey'),
  gold: createColorIcon('gold'),
};

// Component to fly to a location
function FlyToLocation({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 15, { duration: 1.5 });
  }, [center, map]);
  return null;
}

// Component to handle click-to-place-pin
function ClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      onClick && onClick(e.latlng);
    },
  });
  return null;
}

// Component to get user's current location
function CurrentLocationMarker({ onLocationFound }) {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: false, maxZoom: 16 });
    map.on('locationfound', (e) => {
      setPosition(e.latlng);
      onLocationFound && onLocationFound(e.latlng);
    });
  }, [map, onLocationFound]);

  return position ? (
    <Marker position={position} icon={icons.gold}>
      <Popup>
        <div className="text-center">
          <p className="font-semibold text-sm">📍 Your Location</p>
          <p className="text-xs text-gray-500">{position.lat.toFixed(5)}, {position.lng.toFixed(5)}</p>
        </div>
      </Popup>
    </Marker>
  ) : null;
}

/**
 * RealMap component
 * @param {Object} props
 * @param {[number,number]} props.center - [lat, lng]
 * @param {number} props.zoom - zoom level
 * @param {number} props.radius - circle radius in meters
 * @param {Array} props.markers - [{id, name, lat, lng, status}]
 * @param {boolean} props.clickable - enable click to place pin
 * @param {Function} props.onPinPlace - callback when pin is placed ([lat, lng])
 * @param {[number,number]} props.pinPosition - controlled pin position [lat, lng]
 * @param {boolean} props.showCurrentLocation - show user's current location
 * @param {string} props.height - CSS height
 * @param {string} props.className
 */
export default function RealMap({
  center = [19.076, 72.8777],
  zoom = 13,
  radius,
  markers = [],
  clickable = false,
  onPinPlace,
  pinPosition,
  showCurrentLocation = false,
  height = '350px',
  className = '',
}) {
  const [currentLoc, setCurrentLoc] = useState(null);
  const [flyTo, setFlyTo] = useState(null);

  const statusIcon = (status) => {
    if (status === 'active') return icons.green;
    if (status === 'out') return icons.red;
    if (status === 'removed') return icons.grey;
    return icons.blue;
  };

  const handleLocationFound = (latlng) => {
    setCurrentLoc(latlng);
    if (!pinPosition && !center) {
      setFlyTo([latlng.lat, latlng.lng]);
    }
  };

  const effectiveCenter = pinPosition || center || (currentLoc ? [currentLoc.lat, currentLoc.lng] : [20.5937, 78.9629]);

  return (
    <div className={`rounded-2xl overflow-hidden border border-gray-200 shadow-sm ${className}`} style={{ height }}>
      <MapContainer
        center={effectiveCenter}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {flyTo && <FlyToLocation center={flyTo} />}
        {pinPosition && <FlyToLocation center={pinPosition} />}

        {clickable && <ClickHandler onClick={(latlng) => onPinPlace && onPinPlace([latlng.lat, latlng.lng])} />}

        {showCurrentLocation && <CurrentLocationMarker onLocationFound={handleLocationFound} />}

        {/* Pin marker */}
        {pinPosition && (
          <Marker position={pinPosition} icon={icons.blue}>
            <Popup><span className="font-semibold text-sm">📌 Event Location</span></Popup>
          </Marker>
        )}

        {/* Radius circle */}
        {pinPosition && radius && (
          <Circle center={pinPosition} radius={radius} pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.1, weight: 2 }} />
        )}

        {/* Center circle (for view-only maps) */}
        {!pinPosition && center && radius && (
          <>
            <Marker position={center} icon={icons.blue}>
              <Popup><span className="font-semibold text-sm">📌 Event Center</span></Popup>
            </Marker>
            <Circle center={center} radius={radius} pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.1, weight: 2 }} />
          </>
        )}

        {/* Volunteer markers */}
        {markers.map(m => (
          <Marker key={m.id} position={[m.lat, m.lng]} icon={statusIcon(m.status)}>
            <Popup>
              <div className="text-center">
                <p className="font-semibold text-sm">{m.name}</p>
                <p className="text-xs text-gray-500 capitalize">{m.status}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      {markers.length > 0 && (
        <div className="absolute bottom-3 left-3 z-[1000] flex gap-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl text-xs shadow-md">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Active</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Out</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-gray-400" /> Removed</span>
        </div>
      )}
    </div>
  );
}
