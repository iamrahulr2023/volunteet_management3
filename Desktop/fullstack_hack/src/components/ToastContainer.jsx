import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const typeConfig = {
  success: { icon: CheckCircle, bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-800', iconColor: 'text-emerald-500' },
  danger: { icon: AlertCircle, bg: 'bg-red-50 border-red-200', text: 'text-red-800', iconColor: 'text-red-500' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800', iconColor: 'text-amber-500' },
  info: { icon: Info, bg: 'bg-primary-50 border-primary-200', text: 'text-primary-800', iconColor: 'text-primary-500' },
};

export default function ToastContainer() {
  const { toasts, setToasts } = useApp();

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  if (!toasts.length) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-md">
      {toasts.map(toast => {
        const config = typeConfig[toast.type] || typeConfig.info;
        const Icon = config.icon;
        return (
          <div key={toast.id} className={`toast-enter flex items-start gap-3 p-4 rounded-xl border shadow-lg ${config.bg}`}>
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconColor}`} />
            <p className={`text-sm font-medium flex-1 ${config.text}`}>{toast.message}</p>
            <button onClick={() => removeToast(toast.id)} className="shrink-0 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
