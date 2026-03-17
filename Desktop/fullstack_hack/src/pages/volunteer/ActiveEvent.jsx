import { useState, useEffect, useRef } from 'react';
import { useApp } from '../../contexts/AppContext';
import RealMap from '../../components/RealMap';
import { Play, Square, MapPin, Clock, AlertTriangle, CheckCircle, Timer } from 'lucide-react';

export default function ActiveEvent() {
  const { addToast } = useApp();
  const [isWorking, setIsWorking] = useState(false);
  const [geoStatus, setGeoStatus] = useState('inside'); // inside | outside
  const [elapsed, setElapsed] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const timerRef = useRef(null);

  const startWork = () => {
    setIsWorking(true);
    setStartTime(new Date());
    addToast('Work session started! 🟢', 'success');
  };

  const endWork = () => {
    setIsWorking(false);
    if (timerRef.current) clearInterval(timerRef.current);
    addToast(`Work session ended. Total: ${formatTime(elapsed)}`, 'info');
  };

  const toggleGeo = () => {
    const newStatus = geoStatus === 'inside' ? 'outside' : 'inside';
    setGeoStatus(newStatus);
    if (newStatus === 'outside') {
      addToast('⚠️ You have left the event boundary!', 'warning');
    } else {
      addToast('✅ Back inside the event area', 'success');
    }
  };

  useEffect(() => {
    if (isWorking) {
      timerRef.current = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isWorking]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Active Event</h1>
        <p className="text-gray-500 text-sm mt-1">Flood Relief Camp — Mumbai Central</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Geo-fencing Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`card border-2 transition-colors ${geoStatus === 'inside' ? 'border-emerald-200 bg-emerald-50/30' : 'border-red-200 bg-red-50/30'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-500" /> Geo-Fencing Status
              </h3>
              <button
                onClick={toggleGeo}
                className="text-xs text-gray-500 hover:text-gray-700 underline"
              >
                Simulate {geoStatus === 'inside' ? 'leaving' : 'entering'} boundary
              </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              {geoStatus === 'inside' ? (
                <div className="flex items-center gap-3 text-emerald-700">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Inside Area</p>
                    <p className="text-sm text-emerald-600">Active ✅ — You are within the event boundary</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-red-700">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center animate-pulse-soft">
                    <AlertTriangle className="w-7 h-7 text-red-500" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Out of Boundary</p>
                    <p className="text-sm text-red-600">⚠️ Return to the event area to avoid auto-removal</p>
                  </div>
                </div>
              )}
            </div>

            <RealMap
              center={[19.076, 72.8777]}
              radius={300}
              markers={[{ id: 1, name: 'You', status: geoStatus === 'inside' ? 'active' : 'out', lat: 19.076, lng: 72.8777 }]}
              showCurrentLocation={true}
              height="260px"
              zoom={15}
            />
          </div>

          {/* Work Controls */}
          <div className="card">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary-500" /> Work Session
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button
                onClick={isWorking ? endWork : startWork}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 py-4 px-8 rounded-2xl font-bold text-lg transition-all shadow-md ${
                  isWorking
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                }`}
              >
                {isWorking ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isWorking ? 'End Work' : 'Start Work'}
              </button>

              <div className="text-center sm:text-left">
                <div className="text-4xl font-mono font-bold text-gray-800">
                  {formatTime(elapsed)}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {isWorking ? 'Session in progress...' : 'Ready to start'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hours Tracking */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <Timer className="w-5 h-5 text-primary-500" /> Today's Hours
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Start Time</p>
                <p className="font-semibold text-gray-800">
                  {startTime ? startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—'}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">End Time</p>
                <p className="font-semibold text-gray-800">
                  {!isWorking && elapsed > 0 ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—'}
                </p>
              </div>
              <div className="p-4 bg-primary-50 rounded-xl border border-primary-100">
                <p className="text-xs text-primary-600 mb-1">Total Hours</p>
                <p className="font-bold text-xl text-primary-700">{formatTime(elapsed)}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-3">Event Details</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-500">Event: <span className="text-gray-800 font-medium">Flood Relief Camp</span></p>
              <p className="text-gray-500">Location: <span className="text-gray-800 font-medium">Mumbai Central</span></p>
              <p className="text-gray-500">Date: <span className="text-gray-800 font-medium">March 20, 2026</span></p>
              <p className="text-gray-500">Radius: <span className="text-gray-800 font-medium">300m</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
