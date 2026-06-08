import React, { useState, useEffect } from 'react';
import { goalAPI } from '../api';
import DashboardLayout from '../components/DashboardLayout';

const GOAL_TYPES = ['weight_loss', 'muscle_gain', 'endurance', 'flexibility', 'weekly_workouts', 'custom'];
const TYPE_LABELS = { weight_loss: '🏃 Weight Loss', muscle_gain: '💪 Muscle Gain', endurance: '🫀 Endurance', flexibility: '🤸 Flexibility', weekly_workouts: '📅 Weekly Workouts', custom: '🎯 Custom' };

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({ title: '', type: 'custom', targetValue: '', currentValue: '', unit: '', deadline: '' });

  useEffect(() => { loadGoals(); }, []);

  const loadGoals = async () => {
    try { const res = await goalAPI.getAll(); setGoals(res.data.data); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const filtered = filter === 'all' ? goals : goals.filter(g => g.status === filter);

  const openModal = (goal = null) => {
    if (goal) {
      setEditingGoal(goal);
      setForm({ title: goal.title, type: goal.type, targetValue: goal.targetValue, currentValue: goal.currentValue || '', unit: goal.unit || '', deadline: goal.deadline ? goal.deadline.split('T')[0] : '' });
    } else { setEditingGoal(null); setForm({ title: '', type: 'custom', targetValue: '', currentValue: '', unit: '', deadline: '' }); }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form, targetValue: Number(form.targetValue), currentValue: Number(form.currentValue) || 0 };
      if (editingGoal) { await goalAPI.update(editingGoal._id, data); }
      else { await goalAPI.create(data); }
      setShowModal(false);
      loadGoals();
    } catch (err) { console.error(err); }
  };

 const updateProgress = async (goal, newValue) => {
  try {
    let status = 'active';

    if (goal.type === 'weight_loss') {
      status =
        newValue <= goal.targetValue
          ? 'completed'
          : 'active';
    } else {
      status =
        newValue >= goal.targetValue
          ? 'completed'
          : 'active';
    }

    await goalAPI.update(goal._id, {
      currentValue: newValue,
      status,
    });

    loadGoals();
  } catch (err) {
    console.error(err);
  }
};

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this goal?')) return;
    try { await goalAPI.delete(id); loadGoals(); } catch (err) { console.error(err); }
  };

  const activeCount = goals.filter(g => g.status === 'active').length;
  const completedCount = goals.filter(g => g.status === 'completed').length;

  return (
    <DashboardLayout title="Goals" subtitle="Set targets and track your achievement">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-5 text-center"><p className="text-3xl font-bold text-primary">{goals.length}</p><p className="text-sm text-gray-500 mt-1">Total Goals</p></div>
        <div className="glass-card p-5 text-center"><p className="text-3xl font-bold text-warning">{activeCount}</p><p className="text-sm text-gray-500 mt-1">In Progress</p></div>
        <div className="glass-card p-5 text-center"><p className="text-3xl font-bold text-success">{completedCount}</p><p className="text-sm text-gray-500 mt-1">Completed</p></div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          {['all', 'active', 'completed', 'paused'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter === f ? 'bg-primary text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>{f}</button>
          ))}
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2 text-sm !py-2.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Goal
        </button>
      </div>

      {/* Goals List */}
      {loading ? (
        <div className="flex justify-center py-20"><svg className="w-10 h-10 animate-spin text-primary" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20"><p className="text-5xl mb-4">🎯</p><h3 className="text-xl font-semibold mb-2">No goals found</h3><p className="text-gray-500 mb-6">Create your first fitness goal to get started</p><button onClick={() => openModal()} className="btn-primary">Create Goal</button></div>
      ) : (
        <div className="space-y-4">
          {filtered.map((goal, i) => (
            <div key={goal._id} className="glass-card p-5 animate-slide-up group" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${goal.status === 'completed' ? 'bg-success/20 text-success' : goal.status === 'paused' ? 'bg-gray-500/20 text-gray-400' : 'bg-primary/20 text-primary'}`}>
                      {goal.status === 'completed' ? '✓ Completed' : goal.status === 'paused' ? '⏸ Paused' : '● Active'}
                    </span>
                    <span className="text-xs text-gray-500">{TYPE_LABELS[goal.type] || goal.type}</span>
                  </div>
                  <h3 className="text-base font-semibold mb-3">{goal.title}</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 bg-white/5 rounded-full h-3">
                      <div className={`h-3 rounded-full transition-all duration-700 ${goal.progress >= 100 ? 'bg-success' : 'bg-gradient-to-r from-primary to-cyan-400'}`} style={{ width: `${Math.min(goal.progress, 100)}%` }} />
                    </div>
                    <span className="text-sm font-semibold text-white min-w-[48px] text-right">{goal.progress}%</span>
                  </div>
                  <p className="text-xs text-gray-500">{goal.currentValue} / {goal.targetValue} {goal.unit}{goal.deadline ? ` · Due ${new Date(goal.deadline).toLocaleDateString('en', { month: 'short', day: 'numeric' })}` : ''}</p>
                </div>
                <div className="flex items-center gap-2 sm:flex-col">
                  {goal.status === 'active' && (
                    <button onClick={() => { const val = prompt('Update current value:', goal.currentValue); if (val !== null) updateProgress(goal, Number(val)); }} className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-primary transition-colors" title="Update Progress">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </button>
                  )}
                  <button onClick={() => openModal(goal)} className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                  <button onClick={() => handleDelete(goal._id)} className="p-2 rounded-xl hover:bg-danger/10 text-gray-400 hover:text-danger transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-dark-800 border border-white/10 rounded-2xl w-full max-w-lg animate-slide-up">
            <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editingGoal ? 'Edit Goal' : 'New Goal'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-white/5"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div><label className="block text-sm text-gray-300 mb-1">Goal Title *</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input-field" placeholder="e.g. Lose 5kg by summer" required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm text-gray-300 mb-1">Type</label><select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="input-field">{GOAL_TYPES.map(t => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}</select></div>
                <div><label className="block text-sm text-gray-300 mb-1">Unit</label><input value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} className="input-field" placeholder="kg, reps, min" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm text-gray-300 mb-1">Target *</label><input type="number" value={form.targetValue} onChange={e => setForm({...form, targetValue: e.target.value})} className="input-field" placeholder="100" required /></div>
                <div><label className="block text-sm text-gray-300 mb-1">Current</label><input type="number" value={form.currentValue} onChange={e => setForm({...form, currentValue: e.target.value})} className="input-field" placeholder="0" /></div>
              </div>
              <div><label className="block text-sm text-gray-300 mb-1">Deadline</label><input type="date" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} className="input-field" /></div>
              <div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button><button type="submit" className="btn-primary flex-1">{editingGoal ? 'Update' : 'Create'} Goal</button></div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default GoalsPage;
