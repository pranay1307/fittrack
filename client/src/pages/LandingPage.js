import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const features = [
    { icon: '⚡', title: 'Track Workouts', desc: 'Log every rep, set, and exercise with our intuitive workout tracker. Monitor your progress in real-time.' },
    { icon: '📊', title: 'Analytics & Insights', desc: 'Visualize your fitness journey with detailed charts and analytics. Understand your patterns and optimize.' },
    { icon: '🎯', title: 'Set Goals', desc: 'Define your fitness goals and track your progress. Stay motivated with milestone celebrations.' },
    { icon: '📱', title: 'Responsive Design', desc: 'Access your fitness data anywhere. Our platform works seamlessly on desktop, tablet, and mobile.' },
    { icon: '🔒', title: 'Secure & Private', desc: 'Your data is encrypted and secure. We never share your personal information with third parties.' },
    { icon: '🏋️', title: 'Exercise Library', desc: 'Access hundreds of exercises with proper form guides. Build custom workout routines effortlessly.' },
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Fitness Enthusiast', text: 'FitTrack transformed my fitness journey. The analytics helped me understand my progress like never before.', avatar: 'S' },
    { name: 'Mike Chen', role: 'Personal Trainer', text: 'I recommend FitTrack to all my clients. The workout tracking is intuitive and the goal system keeps them motivated.', avatar: 'M' },
    { name: 'Emily Davis', role: 'Marathon Runner', text: 'The progress charts are incredible. I can see exactly how my endurance has improved over the past months.', avatar: 'E' },
  ];

  const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '2M+', label: 'Workouts Logged' },
    { value: '500K+', label: 'Goals Achieved' },
    { value: '4.9', label: 'App Rating' },
  ];

  return (
    <div className="min-h-screen bg-dark-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[128px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold gradient-text">FitTrack</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Features</a>
              <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Testimonials</a>
              <a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Pricing</a>
              <Link to="/login" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Login</Link>
              <Link to="/register" className="btn-primary text-sm !py-2.5 !px-5">Get Started</Link>
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 rounded-lg hover:bg-white/5">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileMenu && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/5 pt-4 space-y-3 animate-fade-in">
              <a href="#features" className="block px-4 py-2 text-gray-400 hover:text-white">Features</a>
              <a href="#testimonials" className="block px-4 py-2 text-gray-400 hover:text-white">Testimonials</a>
              <a href="#pricing" className="block px-4 py-2 text-gray-400 hover:text-white">Pricing</a>
              <Link to="/login" className="block px-4 py-2 text-gray-400 hover:text-white">Login</Link>
              <Link to="/register" className="btn-primary block text-center text-sm mt-2">Get Started</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm text-primary font-medium">Now available — Start tracking for free</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-slide-up">
              Transform Your
              <span className="gradient-text block">Fitness Journey</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Track workouts, monitor progress, and achieve your fitness goals with our powerful, beautiful platform designed for athletes of all levels.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/register" className="btn-primary text-lg !py-4 !px-8 w-full sm:w-auto shadow-glow">
                Start Free Trial
              </Link>
              <a href="#features" className="btn-secondary text-lg !py-4 !px-8 w-full sm:w-auto flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Watch Demo
              </a>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 max-w-5xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="glass-card p-2 shadow-glass">
              <div className="bg-dark-700 rounded-xl p-6 md:p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Workouts', value: '24', change: '+12%', color: 'text-primary' },
                    { label: 'Calories', value: '12,480', change: '+8%', color: 'text-success' },
                    { label: 'Duration', value: '18.5h', change: '+15%', color: 'text-warning' },
                    { label: 'Goals', value: '85%', change: '+5%', color: 'text-info' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-xs text-success mt-1">{stat.change}</p>
                    </div>
                  ))}
                </div>
                <div className="h-48 bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                  <div className="flex items-end gap-3 h-32">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <div key={i} className="w-8 md:w-12 bg-gradient-to-t from-primary to-cyan-400 rounded-t-lg transition-all duration-500" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold gradient-text">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Powerful features designed to help you track, analyze, and improve your fitness performance.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="glass-card-hover p-8 group">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-24 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">Athletes</span>
            </h2>
            <p className="text-gray-400">Here's what our users are saying about FitTrack.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-sm font-bold">{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-gray-400">Start free, upgrade when you need more. No hidden fees.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free */}
            <div className="glass-card p-8 flex flex-col">
              <h3 className="text-lg font-semibold mb-2">Starter</h3>
              <div className="mb-6"><span className="text-4xl font-extrabold">$0</span><span className="text-gray-500">/month</span></div>
              <ul className="space-y-3 mb-8 flex-1">
                {['5 workouts/week', 'Basic analytics', 'Goal tracking', 'Mobile access'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-secondary text-center w-full">Get Started</Link>
            </div>
            {/* Pro */}
            <div className="glass-card p-8 flex flex-col border-primary/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-cyan-400" />
              <div className="inline-flex items-center gap-1 bg-primary/20 text-primary text-xs font-semibold rounded-full px-3 py-1 mb-4 w-fit">Popular</div>
              <h3 className="text-lg font-semibold mb-2">Pro</h3>
              <div className="mb-6"><span className="text-4xl font-extrabold">$9</span><span className="text-gray-500">/month</span></div>
              <ul className="space-y-3 mb-8 flex-1">
                {['Unlimited workouts', 'Advanced analytics', 'Custom goals', 'Progress photos', 'Priority support', 'Export data'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-primary text-center w-full">Start Pro Trial</Link>
            </div>
            {/* Enterprise */}
            <div className="glass-card p-8 flex flex-col">
              <h3 className="text-lg font-semibold mb-2">Enterprise</h3>
              <div className="mb-6"><span className="text-4xl font-extrabold">$29</span><span className="text-gray-500">/month</span></div>
              <ul className="space-y-3 mb-8 flex-1">
                {['Everything in Pro', 'Team management', 'API access', 'Custom branding', 'Dedicated support', 'SLA guarantee'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-secondary text-center w-full">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-card p-12 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-cyan-500/5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Fitness?</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">Join thousands of athletes who are already tracking their progress and achieving their goals with FitTrack.</p>
              <Link to="/register" className="btn-primary text-lg !py-4 !px-10 shadow-glow-lg">Get Started Free</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <span className="text-lg font-bold">FitTrack</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">Your ultimate fitness companion. Track, analyze, and improve your performance.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'API', 'Integrations'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}><a href="/" className="text-sm text-gray-500 hover:text-white transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-8 text-center text-sm text-gray-600">
            © {new Date().getFullYear()} FitTrack. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
