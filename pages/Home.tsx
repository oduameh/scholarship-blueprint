
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ChevronRight, TrendingUp, Zap, GraduationCap, Award, BookOpen, CheckCircle, Loader2 } from 'lucide-react';
import { MOCK_POSTS, CATEGORIES } from '../constants';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { Post } from '../types';
import { subscribeToNewsletter } from '../services/emailService';

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterStatus('loading');
    
    // Simulate network delay for better UX
    setTimeout(() => {
      const result = subscribeToNewsletter(newsletterEmail, 'homepage');
      if (result.success) {
        setNewsletterStatus('success');
        setNewsletterMessage(result.message);
        setNewsletterEmail('');
      } else {
        setNewsletterStatus('error');
        setNewsletterMessage(result.message);
      }

      // Reset after 5 seconds
      setTimeout(() => {
        setNewsletterStatus('idle');
        setNewsletterMessage('');
      }, 5000);
    }, 500);
  };

  useEffect(() => {
    const userPostsJson = localStorage.getItem('user_posts');
    const userPosts = userPostsJson ? JSON.parse(userPostsJson) : [];
    setPosts([...userPosts, ...MOCK_POSTS]);
  }, []);

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center overflow-hidden bg-indigo-950 bg-dot-pattern">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 backdrop-blur-md text-indigo-300 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-lg mb-8 border border-indigo-500/30">
              <Award size={14} /> 2025/2026 Academic Funding
            </div>
            <h1 className="text-6xl md:text-8xl text-white font-black leading-[1.1] mb-8 tracking-tight">
              Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Future.</span>
            </h1>
            <p className="text-slate-300 text-xl md:text-2xl mb-12 leading-relaxed font-medium max-w-2xl">
              Professional blueprints for the world's most prestigious fully-funded scholarships. UK, Canada, Germany, and France.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#feed" className="bg-white text-indigo-950 px-10 py-4 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-2xl shadow-white/10">
                Explore Blueprints
              </a>
              <Link to="/about" className="bg-slate-800/50 backdrop-blur-xl text-white border border-slate-700 px-10 py-4 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all">
                Our Mission
              </Link>
            </div>
          </div>
        </div>
        {/* Floating Stats - Dynamic and accurate for AdSense compliance */}
        <div className="absolute bottom-12 right-12 hidden lg:flex gap-12 bg-white/5 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10">
          <div className="text-center">
            <p className="text-indigo-400 text-4xl font-black mb-1">{posts.length}</p>
            <p className="text-white text-[10px] font-bold uppercase tracking-widest">Scholarship Guides</p>
          </div>
          <div className="text-center">
            <p className="text-cyan-400 text-4xl font-black mb-1">{CATEGORIES.length}</p>
            <p className="text-white text-[10px] font-bold uppercase tracking-widest">Funding Regions</p>
          </div>
        </div>
      </section>

      <div id="feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder type="leaderboard" className="mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-16">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-4xl font-black tracking-tight">Latest Blueprints</h2>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => setSelectedCategory('All')}
                  className={`px-6 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all border ${selectedCategory === 'All' ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl' : 'bg-white text-gray-400 border-gray-100 hover:border-indigo-200 hover:text-indigo-600'}`}
                >
                  All Sources
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all border ${selectedCategory === cat ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl' : 'bg-white text-gray-400 border-gray-100 hover:border-indigo-200 hover:text-indigo-600'}`}
                  >
                    {cat.replace(' Scholarships', '')}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {filteredPosts.map((post, idx) => (
                <article key={post.id} className="group flex flex-col bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden transition-all hover:shadow-[0_30px_60px_-15px_rgba(79,70,229,0.15)] hover:border-indigo-100">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={post.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={post.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-xl">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">
                      <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                      <span className="flex items-center gap-1.5"><GraduationCap size={12} /> Fully Funded</span>
                    </div>
                    <h3 className="text-2xl font-black mb-6 leading-tight group-hover:text-indigo-600 transition-colors">
                      <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto">
                      <Link to={`/post/${post.id}`} className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                        View Blueprint <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <AdPlaceholder type="content" className="mt-12" />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="sticky top-28 space-y-12">
              <AdPlaceholder type="sidebar" />

              <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
                <div className="absolute -right-4 -top-4 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <GraduationCap size={40} className="mb-6 opacity-80" />
                  <h3 className="text-3xl font-black mb-4 leading-tight">Join the Scholar List</h3>
                  <p className="text-indigo-100 text-sm mb-8 leading-relaxed font-medium">Get real-time alerts when portals open for Chevening, DAAD, and more.</p>
                  
                  {newsletterStatus === 'success' ? (
                    <div className="bg-white/20 rounded-2xl p-6 text-center">
                      <CheckCircle className="mx-auto mb-3" size={32} />
                      <p className="font-bold">{newsletterMessage}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                      <input 
                        type="email" 
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Your best email" 
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-sm placeholder:text-indigo-200 outline-none focus:ring-2 focus:ring-white/50" 
                      />
                      {newsletterStatus === 'error' && (
                        <p className="text-red-200 text-xs font-medium">{newsletterMessage}</p>
                      )}
                      <button 
                        type="submit"
                        disabled={newsletterStatus === 'loading'}
                        className="w-full bg-white text-indigo-600 font-black py-4 rounded-2xl shadow-xl hover:bg-indigo-50 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                      >
                        {newsletterStatus === 'loading' ? (
                          <>
                            <Loader2 className="animate-spin" size={18} />
                            Subscribing...
                          </>
                        ) : (
                          'Subscribe for Free'
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-black mb-8 flex items-center gap-2">
                  <TrendingUp size={20} className="text-indigo-600" /> Hot Awards
                </h3>
                <div className="space-y-8">
                  {MOCK_POSTS.slice(0, 4).map((post, i) => (
                    <Link key={post.id} to={`/post/${post.id}`} className="group flex gap-4 items-start">
                      <span className="text-4xl font-black text-gray-50 group-hover:text-indigo-100 transition-colors">0{i+1}</span>
                      <div>
                        <h4 className="font-bold text-sm leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-2">{post.category.split(' ')[0]}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <AdPlaceholder type="sidebar" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
