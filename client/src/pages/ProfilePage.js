import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { userAPI } from '../api';
import DashboardLayout from '../components/DashboardLayout';

const ProfilePage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', bio: '', height: '', weight: '', age: '', gender: '', fitnessLevel: '' });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '', phone: user.phone || '', bio: user.bio || '',
        height: user.height || '', weight: user.weight || '', age: user.age || '',
        gender: user.gender || '', fitnessLevel: user.fitnessLevel || 'beginner',
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      const data = { ...form };
      if (data.height) data.height = Number(data.height);
      if (data.weight) data.weight = Number(data.weight);
      if (data.age) data.age = Number(data.age);
      const res = await userAPI.updateProfile(data);
      updateUser(res.data.data);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) { setError(err.response?.data?.message || 'Update failed'); }
    finally { setLoading(false); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) { setError('Passwords do not match'); return; }
    setLoading(true); setError(''); setSuccess('');
    try {
      await userAPI.changePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccess('Password changed successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) { setError(err.response?.data?.message || 'Password change failed'); }
    finally { setLoading(false); }
  };

  return (
    <DashboardLayout title="Profile" subtitle="Manage your personal information and settings">
      {/* Alerts */}
      {success && <div className="bg-success/10 border border-success/20 text-success rounded-xl px-4 py-3 mb-6 text-sm animate-fade-in">{success}</div>}
      {error && <div className="bg-danger/10 border border-danger/20 text-danger rounded-xl px-4 py-3 mb-6 text-sm animate-fade-in">{error}</div>}

      {/* Profile Header */}
      <div className="glass-card p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary via-blue-500 to-cyan-400 flex items-center justify-center text-3xl font-bold shadow-glow">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{user?.name || 'User'}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <div className="flex items-center gap-3 mt-2 justify-center sm:justify-start">
              <span className="bg-primary/20 text-primary text-xs font-medium px-3 py-1 rounded-lg capitalize">{user?.fitnessLevel || 'Beginner'}</span>
              <span className="text-xs text-gray-500">Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en', { month: 'long', year: 'numeric' }) : '—'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['profile', 'security'].map(tab => (
          <button key={tab} onClick={() => { setActiveTab(tab); setError(''); setSuccess(''); }}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all capitalize ${activeTab === tab ? 'bg-primary text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>{tab === 'security' ? '🔒 Security' : '👤 Profile'}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileUpdate} className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-6">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div><label className="block text-sm text-gray-300 mb-2">Full Name</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" /></div>
            <div><label className="block text-sm text-gray-300 mb-2">Phone</label><input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="input-field" placeholder="+1 234 567 890" /></div>
            <div className="md:col-span-2"><label className="block text-sm text-gray-300 mb-2">Bio</label><textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} className="input-field" rows={3} placeholder="Tell us about yourself..." /></div>
          </div>

          <h3 className="text-lg font-semibold mt-8 mb-6">Body Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div><label className="block text-sm text-gray-300 mb-2">Height (cm)</label><input type="number" value={form.height} onChange={e => setForm({...form, height: e.target.value})} className="input-field" placeholder="175" /></div>
            <div><label className="block text-sm text-gray-300 mb-2">Weight (kg)</label><input type="number" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} className="input-field" placeholder="75" /></div>
            <div><label className="block text-sm text-gray-300 mb-2">Age</label><input type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} className="input-field" placeholder="25" /></div>
            <div><label className="block text-sm text-gray-300 mb-2">Gender</label><select value={form.gender} onChange={e => setForm({...form, gender: e.target.value})} className="input-field"><option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div>
          </div>

          <div className="mt-6">
            <label className="block text-sm text-gray-300 mb-2">Fitness Level</label>
            <div className="flex gap-3">
              {['beginner', 'intermediate', 'advanced'].map(level => (
                <button key={level} type="button" onClick={() => setForm({...form, fitnessLevel: level})}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium capitalize transition-all ${form.fitnessLevel === level ? 'bg-primary text-white shadow-glow' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}>{level}</button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-end"><button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 disabled:opacity-50">
            {loading && <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
            Save Changes
          </button></div>
        </form>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <form onSubmit={handlePasswordChange} className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-6">Change Password</h3>
          <div className="max-w-md space-y-4">
            <div><label className="block text-sm text-gray-300 mb-2">Current Password</label><input type="password" value={pwForm.currentPassword} onChange={e => setPwForm({...pwForm, currentPassword: e.target.value})} className="input-field" required /></div>
            <div><label className="block text-sm text-gray-300 mb-2">New Password</label><input type="password" value={pwForm.newPassword} onChange={e => setPwForm({...pwForm, newPassword: e.target.value})} className="input-field" placeholder="Min. 6 characters" required /></div>
            <div><label className="block text-sm text-gray-300 mb-2">Confirm New Password</label><input type="password" value={pwForm.confirmPassword} onChange={e => setPwForm({...pwForm, confirmPassword: e.target.value})} className="input-field" required /></div>
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 disabled:opacity-50 mt-2">
              {loading && <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
              Update Password
            </button>
          </div>
        </form>
      )}
    </DashboardLayout>
  );
};

export default ProfilePage;
