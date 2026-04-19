import React, { useState, useEffect } from 'react';
import { workoutAPI } from '../api';
import DashboardLayout from '../components/DashboardLayout';

const WORKOUT_TYPES = ['strength', 'cardio', 'hiit', 'yoga', 'flexibility', 'sports', 'custom'];
const TYPE_EMOJIS = { strength: '🏋️', cardio: '🏃', hiit: '⚡', yoga: '🧘', flexibility: '🤸', sports: '⚽', custom: '💪' };
const TYPE_COLORS = { strength: 'bg-primary/20 text-primary', cardio: 'bg-success/20 text-success', hiit: 'bg-danger/20 text-danger', yoga: 'bg-purple-500/20 text-purple-400', flexibility: 'bg-info/20 text-info', sports: 'bg-warning/20 text-warning', custom: 'bg-white/10 text-gray-300' };

const WorkoutsPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [filterType, setFilterType] = useState('');
  const [form, setForm] = useState({
    title: '', type: 'strength', duration: '', caloriesBurned: '', difficulty: 'intermediate', notes: '',
    exercises: [{ name: '', sets: '', reps: '', weight: '' }],
  });

  useEffect(() => { loadWorkouts(); }, [filterType]);

  const loadWorkouts = async () => {
    try {
      const params = {};
      if (filterType) params.type = filterType;
      const res = await workoutAPI.getAll(params);
      setWorkouts(res.data.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const resetForm = () => {
    setForm({ title: '', type: 'strength', duration: '', caloriesBurned: '', difficulty: 'intermediate', notes: '', exercises: [{ name: '', sets: '', reps: '', weight: '' }] });
    setEditingWorkout(null);
  };

  const openModal = (workout = null) => {
    if (workout) {
      setEditingWorkout(workout);
      setForm({
        title: workout.title, type: workout.type, duration: workout.duration || '', caloriesBurned: workout.caloriesBurned || '',
        difficulty: workout.difficulty, notes: workout.notes || '',
        exercises: workout.exercises?.length ? workout.exercises.map(e => ({ name: e.name, sets: e.sets, reps: e.reps, weight: e.weight || '' })) : [{ name: '', sets: '', reps: '', weight: '' }],
      });
    } else { resetForm(); }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form, duration: Number(form.duration) || 0, caloriesBurned: Number(form.caloriesBurned) || 0,
        exercises: form.exercises.filter(ex => ex.name).map(ex => ({ ...ex, sets: Number(ex.sets) || 1, reps: Number(ex.reps) || 1, weight: Number(ex.weight) || 0 }))
      };
      if (editingWorkout) { await workoutAPI.update(editingWorkout._id, data); }
      else { await workoutAPI.create(data); }
      setShowModal(false);
      resetForm();
      loadWorkouts();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this workout?')) return;
    try { await workoutAPI.delete(id); loadWorkouts(); } catch (err) { console.error(err); }
  };

  const addExercise = () => setForm({ ...form, exercises: [...form.exercises, { name: '', sets: '', reps: '', weight: '' }] });
  const removeExercise = (index) => setForm({ ...form, exercises: form.exercises.filter((_, i) => i !== index) });
  const updateExercise = (index, field, value) => {
    const updated = [...form.exercises];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, exercises: updated });
  };

  return (
    <DashboardLayout title="Workouts" subtitle="Track and manage your workout sessions">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setFilterType('')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${!filterType ? 'bg-primary text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>All</button>
          {WORKOUT_TYPES.map(t => (
            <button key={t} onClick={() => setFilterType(t)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${filterType === t ? 'bg-primary text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
              {TYPE_EMOJIS[t]} {t}
            </button>
          ))}
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2 text-sm !py-2.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Workout
        </button>
      </div>

      {/* Workouts Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <svg className="w-10 h-10 animate-spin text-primary" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
        </div>
      ) : workouts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🏋️</p>
          <h3 className="text-xl font-semibold mb-2">No workouts yet</h3>
          <p className="text-gray-500 mb-6">Start logging your first workout to track progress</p>
          <button onClick={() => openModal()} className="btn-primary">Log Your First Workout</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {workouts.map((w, i) => (
            <div key={w._id} className="glass-card-hover p-5 group animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-start justify-between mb-4">
                <div className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${TYPE_COLORS[w.type] || TYPE_COLORS.custom}`}>
                  {TYPE_EMOJIS[w.type] || '💪'} {w.type}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openModal(w)} className="p-1.5 rounded-lg hover:bg-white/10"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                  <button onClick={() => handleDelete(w._id)} className="p-1.5 rounded-lg hover:bg-danger/10"><svg className="w-4 h-4 text-gray-400 hover:text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              </div>
              <h3 className="text-base font-semibold mb-2 truncate">{w.title}</h3>
              <p className="text-xs text-gray-500 mb-4">{new Date(w.createdAt).toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-sm font-semibold">{w.duration || 0}m</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">Calories</p>
                  <p className="text-sm font-semibold">{w.caloriesBurned || 0}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">Exercises</p>
                  <p className="text-sm font-semibold">{w.exercises?.length || 0}</p>
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
          <div className="relative bg-dark-800 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-dark-800 border-b border-white/5 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editingWorkout ? 'Edit Workout' : 'New Workout'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-white/5"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Title *</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input-field" placeholder="e.g. Morning Push Day" required /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Type</label><select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="input-field capitalize">{WORKOUT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Duration (min)</label><input type="number" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} className="input-field" placeholder="45" /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Calories</label><input type="number" value={form.caloriesBurned} onChange={e => setForm({...form, caloriesBurned: e.target.value})} className="input-field" placeholder="350" /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label><select value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})} className="input-field"><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></div>
              </div>

              {/* Exercises */}
              <div>
                <div className="flex items-center justify-between mb-3"><label className="text-sm font-medium text-gray-300">Exercises</label><button type="button" onClick={addExercise} className="text-xs text-primary hover:text-primary-300 font-medium">+ Add Exercise</button></div>
                <div className="space-y-3">
                  {form.exercises.map((ex, i) => (
                    <div key={i} className="flex items-start gap-2 bg-white/[0.02] p-3 rounded-xl">
                      <div className="grid grid-cols-4 gap-2 flex-1">
                        <input value={ex.name} onChange={e => updateExercise(i, 'name', e.target.value)} className="input-field text-sm !py-2" placeholder="Exercise" />
                        <input type="number" value={ex.sets} onChange={e => updateExercise(i, 'sets', e.target.value)} className="input-field text-sm !py-2" placeholder="Sets" />
                        <input type="number" value={ex.reps} onChange={e => updateExercise(i, 'reps', e.target.value)} className="input-field text-sm !py-2" placeholder="Reps" />
                        <input type="number" value={ex.weight} onChange={e => updateExercise(i, 'weight', e.target.value)} className="input-field text-sm !py-2" placeholder="Weight" />
                      </div>
                      {form.exercises.length > 1 && <button type="button" onClick={() => removeExercise(i)} className="p-2 text-gray-500 hover:text-danger mt-0.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>}
                    </div>
                  ))}
                </div>
              </div>

              <div><label className="block text-sm font-medium text-gray-300 mb-2">Notes</label><textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="input-field" rows={3} placeholder="How did you feel?" /></div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1">{editingWorkout ? 'Update' : 'Save'} Workout</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default WorkoutsPage;
