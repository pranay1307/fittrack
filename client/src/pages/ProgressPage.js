import React, { useState, useEffect } from 'react';
import { progressAPI } from '../api';
import DashboardLayout from '../components/DashboardLayout';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressPage = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ weight: '', bodyFat: '', caloriesBurned: '', caloriesConsumed: '', proteinIntake: '', steps: '', workoutDuration: '', notes: '' });

  useEffect(() => { loadProgress(); }, []);

  const loadProgress = async () => {
    try { const res = await progressAPI.getAll({ limit: 30 }); setProgress(res.data.data.reverse()); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {};
      Object.entries(form).forEach(([k, v]) => { if (v !== '') data[k] = k === 'notes' ? v : Number(v); });
      await progressAPI.create(data);
      setShowModal(false);
      setForm({ weight: '', bodyFat: '', caloriesBurned: '', caloriesConsumed: '', proteinIntake: '', steps: '', workoutDuration: '', notes: '' });
      loadProgress();
    } catch (err) { console.error(err); }
  };

  const latestEntry = progress.length > 0 ? progress[progress.length - 1] : null;
  const chartData = progress.map(p => ({
    date: new Date(p.date).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
    weight: p.weight || null,
    bodyFat: p.bodyFat || null,
    calories: p.caloriesBurned || 0,
    steps: p.steps || 0,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-700 border border-white/10 rounded-xl px-4 py-3 shadow-glass">
          <p className="text-sm font-medium mb-1">{label}</p>
          {payload.map((e, i) => e.value != null && <p key={i} className="text-xs text-gray-400">{e.name}: <span className="text-white font-medium">{e.value}</span></p>)}
        </div>
      );
    }
    return null;
  };

  const quickStats = [
    { label: 'Current Weight', value: latestEntry?.weight ? `${latestEntry.weight} kg` : '--', color: 'text-primary', icon: '⚖️' },
    { label: 'Body Fat', value: latestEntry?.bodyFat ? `${latestEntry.bodyFat}%` : '--', color: 'text-warning', icon: '📊' },
    { label: 'Today Steps', value: latestEntry?.steps ? latestEntry.steps.toLocaleString() : '--', color: 'text-success', icon: '👟' },
    { label: 'Calories Burned', value: latestEntry?.caloriesBurned ? `${latestEntry.caloriesBurned}` : '--', color: 'text-danger', icon: '🔥' },
  ];

  return (
    <DashboardLayout title="Progress" subtitle="Track your body metrics and fitness progress">
      <div className="flex items-center justify-between mb-6">
        <div />
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 text-sm !py-2.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Log Progress
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickStats.map((s, i) => (
          <div key={i} className="glass-card p-5 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="text-2xl mb-2">{s.icon}</div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      {chartData.length > 1 ? (
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-6">Weight Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tick={{ fill: '#8E8E93', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8E8E93', fontSize: 11 }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="weight" name="Weight (kg)" stroke="#007AFF" strokeWidth={2.5} dot={{ fill: '#007AFF', r: 4 }} activeDot={{ r: 6 }} connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-6">Steps & Calories</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="stepsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34C759" stopOpacity={0.3} /><stop offset="95%" stopColor="#34C759" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tick={{ fill: '#8E8E93', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8E8E93', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="steps" name="Steps" stroke="#34C759" strokeWidth={2} fillOpacity={1} fill="url(#stepsGrad)" />
                <Line type="monotone" dataKey="calories" name="Calories" stroke="#FF9500" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="glass-card p-12 text-center mb-8">
          <p className="text-4xl mb-3">📈</p>
          <p className="text-gray-400">Log at least 2 entries to see your progress charts</p>
        </div>
      )}

      {/* History */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">History</h3>
        {progress.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No progress entries yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/5">
                {['Date', 'Weight', 'Body Fat', 'Calories', 'Steps', 'Duration'].map(h => <th key={h} className="text-left py-3 px-3 text-gray-500 font-medium">{h}</th>)}
              </tr></thead>
              <tbody>
                {[...progress].reverse().map((p) => (
                  <tr key={p._id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3">{new Date(p.date).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="py-3 px-3">{p.weight ? `${p.weight} kg` : '--'}</td>
                    <td className="py-3 px-3">{p.bodyFat ? `${p.bodyFat}%` : '--'}</td>
                    <td className="py-3 px-3">{p.caloriesBurned || '--'}</td>
                    <td className="py-3 px-3">{p.steps?.toLocaleString() || '--'}</td>
                    <td className="py-3 px-3">{p.workoutDuration ? `${p.workoutDuration}m` : '--'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-dark-800 border border-white/10 rounded-2xl w-full max-w-lg animate-slide-up">
            <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Log Today's Progress</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-white/5"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm text-gray-300 mb-1">Weight (kg)</label><input type="number" step="0.1" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} className="input-field" placeholder="75.5" /></div>
                <div><label className="block text-sm text-gray-300 mb-1">Body Fat (%)</label><input type="number" step="0.1" value={form.bodyFat} onChange={e => setForm({...form, bodyFat: e.target.value})} className="input-field" placeholder="18" /></div>
                <div><label className="block text-sm text-gray-300 mb-1">Calories Burned</label><input type="number" value={form.caloriesBurned} onChange={e => setForm({...form, caloriesBurned: e.target.value})} className="input-field" placeholder="500" /></div>
                <div><label className="block text-sm text-gray-300 mb-1">Steps</label><input type="number" value={form.steps} onChange={e => setForm({...form, steps: e.target.value})} className="input-field" placeholder="10000" /></div>
                <div><label className="block text-sm text-gray-300 mb-1">Protein (g)</label><input type="number" value={form.proteinIntake} onChange={e => setForm({...form, proteinIntake: e.target.value})} className="input-field" placeholder="120" /></div>
                <div><label className="block text-sm text-gray-300 mb-1">Workout (min)</label><input type="number" value={form.workoutDuration} onChange={e => setForm({...form, workoutDuration: e.target.value})} className="input-field" placeholder="60" /></div>
              </div>
              <div><label className="block text-sm text-gray-300 mb-1">Notes</label><textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="input-field" rows={2} placeholder="How do you feel?" /></div>
              <div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button><button type="submit" className="btn-primary flex-1">Save Entry</button></div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProgressPage;
