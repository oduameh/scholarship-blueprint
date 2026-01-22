
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

        {/* Why Scholarship Blueprint Section - Unique Content for AdSense */}
        <section className="mt-24 bg-white rounded-[3rem] border border-gray-100 p-12 md:p-16 shadow-xl">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-4 block">Why Choose Us</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
                The Scholarship Blueprint Difference
              </h2>
              <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
                Understanding why thousands of students trust our scholarship guides over generic advice.
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-slate-600">
              <p className="text-lg leading-relaxed">
                Every year, billions of dollars in scholarship funding go unclaimed—not because students lack qualifications, but because they lack access to accurate, strategic information. At Scholarship Blueprint, we bridge this critical gap by providing comprehensive, expert-verified guides to the world's most prestigious fully-funded scholarships.
              </p>

              <p className="text-lg leading-relaxed">
                Unlike generic scholarship databases that simply list opportunities, our blueprints decode the application architecture of each program. We analyze what selection committees actually look for, dissect successful application strategies, and provide the granular guidance that transforms promising candidates into successful scholars.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12 not-prose">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={28} />
                  </div>
                  <h3 className="font-black text-slate-900 text-lg mb-2">Expert Research</h3>
                  <p className="text-slate-500 text-sm">Every guide is researched from official sources, scholarship alumni interviews, and selection committee insights.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap size={28} />
                  </div>
                  <h3 className="font-black text-slate-900 text-lg mb-2">Strategic Focus</h3>
                  <p className="text-slate-500 text-sm">We go beyond eligibility lists to explain what actually distinguishes winning applications from rejections.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp size={28} />
                  </div>
                  <h3 className="font-black text-slate-900 text-lg mb-2">Current & Accurate</h3>
                  <p className="text-slate-500 text-sm">All information is verified against official scholarship portals and updated for the current application cycle.</p>
                </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4">Our Editorial Methodology</h3>
              <p className="text-lg leading-relaxed">
                Each scholarship guide on Scholarship Blueprint follows a rigorous research and verification process. We begin by analyzing official program documentation, including eligibility requirements, selection criteria, and historical acceptance data. We then supplement this with insights from program alumni, information session transcripts, and publicly available selection committee guidance.
              </p>

              <p className="text-lg leading-relaxed">
                Our editorial team includes professionals with direct experience in international education, scholarship advising, and academic admissions. We understand that applying for a prestigious scholarship is more than filling out forms—it's about strategically presenting your story, achievements, and potential in ways that resonate with selection committees.
              </p>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4">What Our Guides Cover</h3>
              <p className="text-lg leading-relaxed">
                Every Scholarship Blueprint guide provides comprehensive coverage of key areas that determine application success:
              </p>

              <ul className="space-y-3 my-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                  <span><strong>Eligibility Requirements:</strong> Detailed breakdown of who qualifies, including citizenship, age limits, academic thresholds, and work experience requirements.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                  <span><strong>Financial Package:</strong> Complete coverage details including tuition, stipend amounts, travel allowances, family support, and hidden costs to consider.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                  <span><strong>Application Process:</strong> Step-by-step guidance through each stage, from initial research to final submission and interview preparation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                  <span><strong>Strategic Recommendations:</strong> Insider tips on what selection committees value, common mistakes to avoid, and how to position your application competitively.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                  <span><strong>Timeline Planning:</strong> Detailed calendars showing when to start, key deadlines, and optimal preparation schedules.</span>
                </li>
              </ul>

              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 my-12 not-prose">
                <h4 className="font-black text-slate-900 text-xl mb-4">Important Disclaimer</h4>
                <p className="text-slate-600 leading-relaxed">
                  Scholarship Blueprint is an independent educational resource providing research-based guidance for scholarship applicants. We are not affiliated with any scholarship program, university, or government agency. While we strive for accuracy by verifying all information against official sources, scholarship details including eligibility requirements, deadlines, and funding amounts are subject to change by awarding organizations. Always verify current requirements on official scholarship websites before applying.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-12">
              <Link to="/how-to-apply" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                How to Apply Guide
              </Link>
              <Link to="/faq" className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                Read FAQs
              </Link>
              <Link to="/resources" className="bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                Scholarship Glossary
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
