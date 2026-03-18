import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Mail, Lock, Eye, EyeOff, Shield, ArrowRight, Loader2 } from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, addToast, fetchEvents, fetchVolunteers } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await login({ email, password });
      addToast(`Welcome back, ${user.name}!`, 'success');
      // Fetch data after login
      await Promise.all([fetchEvents(), fetchVolunteers()]);
      navigate(user.role === 'admin' ? '/admin' : '/volunteer');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed';
      setError(msg);
      addToast(msg, 'danger');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center p-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">Volunteer</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4">
             <br />Volunteer<br />Coordination System
          </h2>
          <p className="text-primary-100 text-lg max-w-md">
            Streamline volunteer management with intelligent matching, real-time tracking, and automated coordination.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 max-w-sm">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-primary-200 text-sm">Active Volunteers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold">120+</div>
              <div className="text-primary-200 text-sm">Events Managed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">VolunteerAI</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h1>
          <p className="text-gray-500 mb-8">Sign in to your account to continue</p>

          {/* Role toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => setRole('admin')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === 'admin' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500'}`}
            >
              Admin (NGO)
            </button>
            <button
              onClick={() => setRole('volunteer')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === 'volunteer' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500'}`}
            >
              Volunteer
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={role === 'admin' ? 'admin@ngo.org' : 'aarav@volunteer.com'}
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-12 pr-12"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-60">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-xs">
            <strong>Demo credentials:</strong><br />
            Admin: admin@ngo.org / admin123<br />
            Volunteer: aarav@volunteer.com / vol123
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-600 font-semibold hover:text-primary-700">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
