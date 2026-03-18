import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { SKILLS } from '../data/mockData';
import MultiSelect from '../components/MultiSelect';
import { Shield, ArrowRight, User, Mail, Lock, Phone, MapPin, Calendar, Loader2 } from 'lucide-react';

export default function Signup() {
  const [role, setRole] = useState('admin');
  const [form, setForm] = useState({
    ngoName: '', name: '', email: '', password: '', phone: '', location: '', availability: '', skills: [],
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { signup, addToast, fetchEvents, fetchVolunteers } = useApp();
  const navigate = useNavigate();

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const payload = {
        name: role === 'admin' ? form.ngoName : form.name,
        email: form.email,
        password: form.password,
        role,
        phone: form.phone || '',
        skills: form.skills || [],
        location: { lat: 0, lng: 0 },
      };

      const user = await signup(payload);
      addToast(`Welcome, ${user.name}! Account created.`, 'success');
      await Promise.all([fetchEvents(), fetchVolunteers()]);
      navigate(user.role === 'admin' ? '/admin' : '/volunteer');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Signup failed';
      setError(msg);
      addToast(msg, 'danger');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center p-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">VolunteerAI</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Join the<br />Community
          </h2>
          <p className="text-primary-100 text-lg max-w-md">
            Create an account to start coordinating volunteers or join as a volunteer to make a difference.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">VolunteerAI</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">Create account</h1>
          <p className="text-gray-500 mb-8">Get started with VolunteerAI</p>

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
            {role === 'admin' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">NGO Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" value={form.ngoName} onChange={e => update('ngoName', e.target.value)} placeholder="Your organization name" className="input-field pl-12" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="admin@ngo.org" className="input-field pl-12" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder="••••••••" className="input-field pl-12" required minLength={6} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your full name" className="input-field pl-12" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="your@email.com" className="input-field pl-12" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder="••••••••" className="input-field pl-12" required minLength={6} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 98765 43210" className="input-field pl-12" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <MultiSelect selected={form.skills} onChange={v => update('skills', v)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" value={form.location} onChange={e => update('location', e.target.value)} placeholder="Your city" className="input-field pl-12" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select value={form.availability} onChange={e => update('availability', e.target.value)} className="input-field pl-12 appearance-none" required>
                      <option value="">Select availability</option>
                      <option value="Weekdays">Weekdays</option>
                      <option value="Weekends">Weekends</option>
                      <option value="Anytime">Anytime</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <button type="submit" disabled={submitting} className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-60">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              {submitting ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/" className="text-primary-600 font-semibold hover:text-primary-700">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
