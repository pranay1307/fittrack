import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { workoutAPI, goalAPI } from '../api';
import DashboardLayout from '../components/DashboardLayout';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsRes, goalsRes] = await Promise.all([
        workoutAPI.getStats(),
        goalAPI.getAll({ status: 'active' }),
      ]);
      setStats(statsRes.data.data);
      setGoals(goalsRes.data.data);
    } catch (err) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Workouts', value: stats?.totalWorkouts || 0, icon: '🏋️', change: '+12%', color: 'from-primary to-blue-600' },
    { label: 'Calories Burned', value: stats?.weeklyCalories || 0, icon: '🔥', change: '+8%', color: 'from-orange-500 to-red-500' },
    { label: 'Active Minutes', value: stats?.weeklyDuration || 0, icon: '⏱️', change: '+15%', color: 'from-green-500 to-emerald-500' },
    { label: 'Goals Completed', value: goals.filter(g => g.status === 'completed').length, icon: '🎯', change: '+5%', color: 'from-purple-500 to-pink-500' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-700 border border-white/10 rounded-xl px-4 py-3 shadow-glass">
          <p className="text-sm font-medium text-white mb-1">{label}</p>
          {payload.map((entry, i) => (
            <p key={i} className="text-xs text-gray-400">
              {entry.name}: <span className="text-white font-medium">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <svg className="w-12 h-12 animate-spin text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard" subtitle={`Welcome back, ${user?.name || 'User'}!`}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => (
          <div key={i} className="glass-card p-5 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex items-start justify-between mb-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-lg`}>
                {card.icon}
              </div>
              <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-lg">{card.change}</span>
            </div>
            <p className="text-2xl font-bold text-white">{typeof card.value === 'number' ? card.value.toLocaleString() : card.value}</p>
            <p className="text-sm text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Activity Chart */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Weekly Activity</h3>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" /> Workouts</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400" /> Calories</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats?.weeklyChartData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: '#8E8E93', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8E8E93', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="workouts" name="Workouts" fill="#007AFF" radius={[6, 6, 0, 0]} barSize={20} />
              <Bar dataKey="calories" name="Calories" fill="#5AC8FA" radius={[6, 6, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Duration Trend */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Duration Trend</h3>
            <span className="text-xs text-gray-500">Last 7 days</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={stats?.weeklyChartData || []}>
              <defs>
                <linearGradient id="durationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: '#8E8E93', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8E8E93', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="duration" name="Minutes" stroke="#007AFF" strokeWidth={2} fillOpacity={1} fill="url(#durationGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Goals */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Active Goals</h3>
            <span className="text-xs text-primary cursor-pointer hover:text-primary-300">{goals.length} active</span>
          </div>
          {goals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-3">🎯</p>
              <p className="text-sm text-gray-500">No active goals yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {goals.slice(0, 4).map((goal) => (
                <div key={goal._id} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium truncate flex-1 mr-2">{goal.title}</p>
                    <span className="text-xs text-primary font-medium">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary to-cyan-400 h-2 rounded-full transition-all duration-500" style={{ width: `${goal.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Workouts */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Recent Workouts</h3>
            <span className="text-xs text-primary cursor-pointer hover:text-primary-300">View all</span>
          </div>
          {!stats?.recentWorkouts?.length ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-3">💪</p>
              <p className="text-sm text-gray-500">No workouts logged yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.recentWorkouts.map((w) => (
                <div key={w._id} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/5 transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                    w.type === 'strength' ? 'bg-primary/20' :
                    w.type === 'cardio' ? 'bg-success/20' :
                    w.type === 'hiit' ? 'bg-danger/20' :
                    w.type === 'yoga' ? 'bg-purple-500/20' : 'bg-white/10'
                  }`}>
                    {w.type === 'strength' ? '🏋️' : w.type === 'cardio' ? '🏃' : w.type === 'hiit' ? '⚡' : w.type === 'yoga' ? '🧘' : '💪'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{w.title}</p>
                    <p className="text-xs text-gray-500">{new Date(w.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{w.duration || 0} min</p>
                    <p className="text-xs text-gray-500">{w.caloriesBurned || 0} cal</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
