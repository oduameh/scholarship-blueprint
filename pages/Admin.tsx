
import React, { useState, useEffect } from 'react';
import { LogIn, Plus, Trash2, Edit, Save, Sparkles, LayoutDashboard, LogOut, AlertCircle, Clock, MapPin, DollarSign, Shield, Eye, AlertTriangle, RefreshCw, Megaphone, CheckCircle, XCircle, ExternalLink, Mail, Users, MessageSquare, Download, Check } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { generateBlogTopic, generateFullPost, isGeminiError } from '../services/geminiService';
import { getAdSlotStatus } from '../components/AdPlaceholder';
import { getEmailStats, getNewsletterSubscribers, getContactSubmissions, deleteSubscriber, deleteContactSubmission, markContactAsRead, markContactAsReplied, exportSubscribersCSV, NewsletterSubscriber, ContactSubmission } from '../services/emailService';
import { Post } from '../types';

interface SuspiciousLog {
  timestamp: string;
  reason: string;
  metrics: {
    suspicionScore: number;
    referrer: string;
    pageViews: number;
    timeOnPage: number;
  };
  userAgent: string;
}

export const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [posts, setPosts] = useState<Post[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'traffic' | 'adsense' | 'emails'>('posts');
  const [suspiciousLogs, setSuspiciousLogs] = useState<SuspiciousLog[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [emailStats, setEmailStats] = useState({ totalSubscribers: 0, activeSubscribers: 0, totalContacts: 0, unreadContacts: 0, subscribersThisWeek: 0 });

  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: '',
    category: CATEGORIES[0],
    excerpt: '',
    content: '',
    author: 'Editorial Desk',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    stats: {
      funding: 'Fully Funded',
      level: 'Masters',
      deadline: '',
      location: ''
    }
  });

  useEffect(() => {
    const savedPosts = localStorage.getItem('user_posts');
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    
    const adminSession = localStorage.getItem('admin_session');
    if (adminSession === 'true') setIsLoggedIn(true);

    // Load suspicious traffic logs
    loadTrafficLogs();
    
    // Load email data
    loadEmailData();
  }, []);

  const loadEmailData = () => {
    setSubscribers(getNewsletterSubscribers());
    setContacts(getContactSubmissions());
    setEmailStats(getEmailStats());
  };

  const handleDeleteSubscriber = (id: string) => {
    if (window.confirm('Delete this subscriber?')) {
      deleteSubscriber(id);
      loadEmailData();
    }
  };

  const handleDeleteContact = (id: string) => {
    if (window.confirm('Delete this message?')) {
      deleteContactSubmission(id);
      loadEmailData();
    }
  };

  const handleMarkAsRead = (id: string) => {
    markContactAsRead(id);
    loadEmailData();
  };

  const handleMarkAsReplied = (id: string) => {
    markContactAsReplied(id);
    loadEmailData();
  };

  const handleExportSubscribers = () => {
    const csv = exportSubscribersCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadTrafficLogs = () => {
    try {
      const logs = localStorage.getItem('tg_suspicious_logs');
      if (logs) {
        setSuspiciousLogs(JSON.parse(logs));
      }
    } catch (e) {
      console.error('Failed to load traffic logs');
    }
  };

  const clearTrafficLogs = () => {
    localStorage.removeItem('tg_suspicious_logs');
    setSuspiciousLogs([]);
  };

  const getTrafficStats = () => {
    const facebookReferrals = suspiciousLogs.filter(log => 
      log.metrics.referrer.toLowerCase().includes('facebook') || 
      log.metrics.referrer.toLowerCase().includes('fb.com')
    ).length;
    
    const highRiskCount = suspiciousLogs.filter(log => 
      log.metrics.suspicionScore >= 50
    ).length;

    const blockedAds = suspiciousLogs.filter(log => 
      log.reason.includes('Ad blocked')
    ).length;

    return { facebookReferrals, highRiskCount, blockedAds, total: suspiciousLogs.length };
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '08081834353') {
      setIsLoggedIn(true);
      localStorage.setItem('admin_session', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Please check your username and password.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_session');
  };

  const handleSavePost = () => {
    if (!newPost.title || !newPost.content) return;
    const postToSave: Post = {
      ...newPost as Post,
      id: Date.now().toString(),
      readTime: Math.ceil(newPost.content!.split(' ').length / 200) + ' min',
      stats: newPost.stats || { funding: 'Fully Funded', level: 'Masters', deadline: 'Rolling', location: 'International' }
    };
    const updated = [postToSave, ...posts];
    setPosts(updated);
    localStorage.setItem('user_posts', JSON.stringify(updated));
    setIsCreating(false);
    setNewPost({ 
      title: '', 
      category: CATEGORIES[0], 
      excerpt: '', 
      content: '', 
      author: 'Editorial Desk', 
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80', 
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      stats: { funding: 'Fully Funded', level: 'Masters', deadline: '', location: '' }
    });
  };

  const handleDeletePost = (id: string) => {
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    localStorage.setItem('user_posts', JSON.stringify(updated));
  };

  const handleAISuggest = async () => {
    if (!newPost.category) return;
    setIsGenerating(true);
    setAiError(null);
    
    const result = await generateBlogTopic(newPost.category);
    
    if (isGeminiError(result)) {
      setAiError(result.message);
    } else if (result && typeof result === 'object' && 'title' in result) {
      setNewPost(prev => ({ ...prev, title: result.title, excerpt: result.excerpt }));
    }
    setIsGenerating(false);
  };

  const handleAIFullDraft = async () => {
    if (!newPost.title) return;
    setIsGenerating(true);
    setAiError(null);
    
    const result = await generateFullPost(newPost.title, newPost.category || 'Scholarships');
    
    if (isGeminiError(result)) {
      setAiError(result.message);
    } else if (result && typeof result === 'string') {
      setNewPost(prev => ({ ...prev, content: result }));
    }
    setIsGenerating(false);
  };
  
  const clearAiError = () => setAiError(null);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
              <LogIn size={32} />
            </div>
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-gray-400 text-sm">Access your immigration blog dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="admin" required />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="••••••••" required />
            </div>
            {loginError && <p className="text-red-500 text-xs font-medium">{loginError}</p>}
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all">Enter Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <LayoutDashboard className="text-indigo-600" /> Admin Panel
            </h1>
            <p className="text-gray-500 text-sm">Managing immigration articles and scholarships</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setIsCreating(true)} className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all">
              <Plus size={18} /> New Post
            </button>
            <button onClick={handleLogout} className="bg-white border border-gray-200 text-gray-500 px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-all">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${activeTab === 'posts' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
          >
            <Edit size={16} /> Content
          </button>
          <button 
            onClick={() => { setActiveTab('traffic'); loadTrafficLogs(); }}
            className={`px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${activeTab === 'traffic' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
          >
            <Shield size={16} /> Traffic Guard
            {suspiciousLogs.length > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{suspiciousLogs.length}</span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('adsense')}
            className={`px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${activeTab === 'adsense' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
          >
            <Megaphone size={16} /> AdSense
          </button>
          <button 
            onClick={() => { setActiveTab('emails'); loadEmailData(); }}
            className={`px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${activeTab === 'emails' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
          >
            <Mail size={16} /> Emails
            {emailStats.unreadContacts > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{emailStats.unreadContacts}</span>
            )}
          </button>
        </div>

        {/* AdSense Configuration Panel */}
        {activeTab === 'adsense' && !isCreating && (
          <div className="space-y-6">
            {/* Status Overview */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Megaphone className="text-indigo-600" size={20} />
                AdSense Configuration Status
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Publisher ID */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2">Publisher ID</p>
                  <p className="font-mono text-sm text-gray-900 break-all">{getAdSlotStatus().publisherId}</p>
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <CheckCircle size={12} /> Configured in index.html
                  </p>
                </div>

                {/* ads.txt Status */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2">ads.txt File</p>
                  <p className="text-sm text-gray-900">google.com, pub-9012240625310684, DIRECT</p>
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <CheckCircle size={12} /> Properly configured
                  </p>
                </div>
              </div>
            </div>

            {/* Ad Slot Configuration */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg mb-2">Ad Slot Configuration</h3>
              <p className="text-sm text-gray-500 mb-6">
                Create ad units in your AdSense dashboard and add the slot IDs to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">components/AdPlaceholder.tsx</code>
              </p>

              <div className="space-y-4">
                {(['leaderboard', 'sidebar', 'content', 'multiplex', 'infeed'] as const).map((slotType) => {
                  const status = getAdSlotStatus();
                  const isConfigured = status[slotType as keyof typeof status];
                  return (
                    <div key={slotType} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-bold text-gray-900 capitalize">{slotType} Ad</p>
                        <p className="text-xs text-gray-500">
                          {slotType === 'leaderboard' && 'Horizontal banner at top of page'}
                          {slotType === 'sidebar' && 'Vertical ad in sidebar area'}
                          {slotType === 'content' && 'In-article ad between content'}
                          {slotType === 'multiplex' && 'Native "recommended content" style'}
                          {slotType === 'infeed' && 'Blends with article listings'}
                        </p>
                      </div>
                      {isConfigured ? (
                        <span className="flex items-center gap-1.5 text-green-600 text-sm font-bold">
                          <CheckCircle size={16} /> Configured
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-amber-600 text-sm font-bold">
                          <XCircle size={16} /> Not Set
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Setup Instructions */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <h3 className="font-bold text-lg mb-4 text-amber-900 flex items-center gap-2">
                <AlertCircle size={20} /> Setup Instructions
              </h3>
              <ol className="space-y-3 text-sm text-amber-800">
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center font-bold text-amber-800 shrink-0">1</span>
                  <span>Go to <a href="https://www.google.com/adsense" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-bold">Google AdSense Dashboard</a></span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center font-bold text-amber-800 shrink-0">2</span>
                  <span>Navigate to <strong>Ads → By ad unit → Display ads</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center font-bold text-amber-800 shrink-0">3</span>
                  <span>Create ad units for each placement type (leaderboard, sidebar, content)</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center font-bold text-amber-800 shrink-0">4</span>
                  <span>Copy the <code className="bg-amber-200 px-1 rounded">data-ad-slot</code> value from each unit</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center font-bold text-amber-800 shrink-0">5</span>
                  <span>Paste into <code className="bg-amber-200 px-1 rounded">AD_SLOTS</code> in <code className="bg-amber-200 px-1 rounded">components/AdPlaceholder.tsx</code></span>
                </li>
              </ol>
            </div>

            {/* Compliance Checklist */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={20} />
                AdSense Compliance Checklist
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { item: 'Privacy Policy', status: true },
                  { item: 'Terms of Service', status: true },
                  { item: 'Cookie Consent Banner', status: true },
                  { item: 'ads.txt File', status: true },
                  { item: '"Advertisement" Labels', status: true },
                  { item: 'Original Content', status: true },
                  { item: 'Bot Traffic Protection', status: true },
                  { item: 'Mobile Responsive', status: true },
                ].map(({ item, status }) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    {status ? (
                      <CheckCircle className="text-green-500" size={16} />
                    ) : (
                      <XCircle className="text-red-500" size={16} />
                    )}
                    <span className={status ? 'text-gray-700' : 'text-red-600 font-bold'}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gray-900 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="https://www.google.com/adsense" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center gap-2 text-indigo-300 hover:text-white transition-colors">
                  <ExternalLink size={14} /> AdSense Dashboard
                </a>
                <a href="https://support.google.com/adsense/answer/48182" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-indigo-300 hover:text-white transition-colors">
                  <ExternalLink size={14} /> AdSense Policies
                </a>
                <a href="https://www.google.com/adsense/new/u/0/pub-9012240625310684/payments" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-indigo-300 hover:text-white transition-colors">
                  <ExternalLink size={14} /> Payment Settings
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Emails Dashboard */}
        {activeTab === 'emails' && !isCreating && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                    <Users size={20} />
                  </div>
                  <span className="text-gray-500 font-medium">Total Subscribers</span>
                </div>
                <div className="text-3xl font-black text-gray-900">{emailStats.totalSubscribers}</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                    <Check size={20} />
                  </div>
                  <span className="text-gray-500 font-medium">Active</span>
                </div>
                <div className="text-3xl font-black text-green-600">{emailStats.activeSubscribers}</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                    <MessageSquare size={20} />
                  </div>
                  <span className="text-gray-500 font-medium">Contact Messages</span>
                </div>
                <div className="text-3xl font-black text-gray-900">{emailStats.totalContacts}</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                  <span className="text-gray-500 font-medium">New This Week</span>
                </div>
                <div className="text-3xl font-black text-amber-600">{emailStats.subscribersThisWeek}</div>
              </div>
            </div>

            {/* Newsletter Subscribers */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Mail className="text-indigo-600" size={20} /> Newsletter Subscribers ({subscribers.length})
                </h3>
                <button
                  onClick={handleExportSubscribers}
                  disabled={subscribers.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download size={16} /> Export CSV
                </button>
              </div>
              
              {subscribers.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Mail size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="font-medium">No subscribers yet</p>
                  <p className="text-sm">Subscribers will appear here when they sign up via the newsletter form.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-3 font-bold text-gray-600">Email</th>
                        <th className="text-left px-4 py-3 font-bold text-gray-600">Subscribed At</th>
                        <th className="text-left px-4 py-3 font-bold text-gray-600">Source</th>
                        <th className="text-left px-4 py-3 font-bold text-gray-600">Status</th>
                        <th className="text-right px-4 py-3 font-bold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {subscribers.map((sub) => (
                        <tr key={sub.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-900">{sub.email}</td>
                          <td className="px-4 py-3 text-gray-500">{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold">{sub.source}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-lg text-xs font-bold ${sub.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                              {sub.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => handleDeleteSubscriber(sub.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Contact Form Submissions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <MessageSquare className="text-purple-600" size={20} /> Contact Messages ({contacts.length})
                {emailStats.unreadContacts > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{emailStats.unreadContacts} new</span>
                )}
              </h3>
              
              {contacts.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="font-medium">No messages yet</p>
                  <p className="text-sm">Contact form submissions will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className={`p-4 rounded-xl border ${contact.status === 'new' ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-100'}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-gray-900">{contact.name}</span>
                            <span className="text-gray-400">|</span>
                            <a href={`mailto:${contact.email}`} className="text-indigo-600 font-medium hover:underline">{contact.email}</a>
                            <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${
                              contact.status === 'new' ? 'bg-amber-200 text-amber-800' : 
                              contact.status === 'read' ? 'bg-blue-100 text-blue-700' : 
                              'bg-green-100 text-green-700'
                            }`}>
                              {contact.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 mb-2">
                            <strong>Type:</strong> {contact.inquiryType} • <strong>Received:</strong> {new Date(contact.submittedAt).toLocaleString()}
                          </div>
                          <p className="text-gray-700 text-sm whitespace-pre-wrap">{contact.message}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {contact.status === 'new' && (
                            <button
                              onClick={() => handleMarkAsRead(contact.id)}
                              className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-200"
                            >
                              Mark Read
                            </button>
                          )}
                          {contact.status !== 'replied' && (
                            <button
                              onClick={() => handleMarkAsReplied(contact.id)}
                              className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-bold hover:bg-green-200"
                            >
                              Mark Replied
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteContact(contact.id)}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Email Integration Note */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
              <h3 className="font-bold text-lg mb-3 text-indigo-900">📧 Email Integration</h3>
              <p className="text-indigo-700 text-sm mb-4">
                Emails are currently stored locally in your browser. For production, integrate with:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <a href="https://mailchimp.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold">
                  <ExternalLink size={14} /> Mailchimp
                </a>
                <a href="https://convertkit.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold">
                  <ExternalLink size={14} /> ConvertKit
                </a>
                <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold">
                  <ExternalLink size={14} /> Formspree
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Traffic Guard Dashboard */}
        {activeTab === 'traffic' && !isCreating && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <Eye size={20} />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase">Total Flagged</span>
                </div>
                <p className="text-3xl font-black text-slate-900">{getTrafficStats().total}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-lg font-black">f</span>
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase">Facebook Traffic</span>
                </div>
                <p className="text-3xl font-black text-slate-900">{getTrafficStats().facebookReferrals}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                    <AlertTriangle size={20} />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase">High Risk</span>
                </div>
                <p className="text-3xl font-black text-red-600">{getTrafficStats().highRiskCount}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                    <Shield size={20} />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase">Ads Blocked</span>
                </div>
                <p className="text-3xl font-black text-green-600">{getTrafficStats().blockedAds}</p>
              </div>
            </div>

            {/* Info Banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-start gap-4">
                <Shield size={32} className="shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">AdSense Protection Active</h3>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Traffic Guard is monitoring all visitors for bot behavior. Ads are automatically hidden from suspicious traffic sources including Facebook bots, headless browsers, and rapid clickers. This protects your AdSense account from invalid traffic violations.
                  </p>
                </div>
              </div>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Suspicious Activity Log</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={loadTrafficLogs}
                    className="text-gray-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <RefreshCw size={16} />
                  </button>
                  <button 
                    onClick={clearTrafficLogs}
                    className="text-xs font-bold text-red-500 hover:text-red-600 px-3 py-1 rounded-lg hover:bg-red-50"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              {suspiciousLogs.length > 0 ? (
                <div className="max-h-[400px] overflow-y-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                        <th className="px-6 py-3">Time</th>
                        <th className="px-6 py-3">Risk</th>
                        <th className="px-6 py-3">Reason</th>
                        <th className="px-6 py-3">Referrer</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {suspiciousLogs.slice().reverse().map((log, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 text-sm">
                          <td className="px-6 py-3 text-gray-500 text-xs">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className="px-6 py-3">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                              log.metrics.suspicionScore >= 70 ? 'bg-red-100 text-red-600' :
                              log.metrics.suspicionScore >= 40 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {log.metrics.suspicionScore}%
                            </span>
                          </td>
                          <td className="px-6 py-3 text-gray-700 text-xs max-w-[300px] truncate">
                            {log.reason}
                          </td>
                          <td className="px-6 py-3 text-gray-500 text-xs max-w-[200px] truncate">
                            {log.metrics.referrer || 'direct'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="px-6 py-12 text-center text-gray-400 text-sm">
                  <Shield size={32} className="mx-auto mb-3 opacity-30" />
                  No suspicious activity detected yet. Traffic Guard is monitoring all visitors.
                </div>
              )}
            </div>
          </div>
        )}

        {isCreating ? (
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Scholarship Blueprint</h2>
              <button onClick={() => { setIsCreating(false); setAiError(null); }} className="text-gray-400 hover:text-gray-600">Cancel</button>
            </div>

            {/* AI Error Alert */}
            {aiError && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                <div className="flex-grow">
                  <p className="text-red-700 text-sm font-medium">{aiError}</p>
                </div>
                <button onClick={clearAiError} className="text-red-400 hover:text-red-600 text-sm font-bold">Dismiss</button>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Category Focus</label>
                  <select 
                    value={newPost.category} 
                    onChange={e => setNewPost({...newPost, category: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Article Title</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newPost.title} 
                      onChange={e => setNewPost({...newPost, title: e.target.value})}
                      className="flex-grow bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g. DAAD Scholarship 2025/2026 Blueprint"
                    />
                    <button 
                      onClick={handleAISuggest}
                      disabled={isGenerating}
                      className="bg-indigo-50 text-indigo-600 p-3 rounded-xl hover:bg-indigo-100 transition-all flex items-center gap-2 font-bold text-xs disabled:opacity-50"
                    >
                      <Sparkles size={16} /> {isGenerating ? '...' : 'AI Title'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                 <div>
                  <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Short Excerpt (SEO Meta)</label>
                  <textarea 
                    value={newPost.excerpt} 
                    onChange={e => setNewPost({...newPost, excerpt: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 h-28"
                    placeholder="Brief summary for Google search results..."
                  />
                </div>
              </div>
            </div>

            {/* Stats Fields for Status Box */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                <DollarSign size={16} className="text-indigo-600" /> Blueprint Status Box Fields
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Estimated Value</label>
                  <select 
                    value={newPost.stats?.funding || 'Fully Funded'} 
                    onChange={e => setNewPost({...newPost, stats: {...newPost.stats!, funding: e.target.value}})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  >
                    <option value="Fully Funded">Fully Funded</option>
                    <option value="Full Ride">Full Ride</option>
                    <option value="Full Stipend">Full Stipend</option>
                    <option value="$50,000/yr">$50,000/yr</option>
                    <option value="$30,000/yr">$30,000/yr</option>
                    <option value="100% Covered">100% Covered</option>
                    <option value="Full + Travel">Full + Travel</option>
                    <option value="Partial">Partial</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase block mb-2">
                    <Clock size={12} className="inline mr-1" />Deadline
                  </label>
                  <input 
                    type="text" 
                    value={newPost.stats?.deadline || ''} 
                    onChange={e => setNewPost({...newPost, stats: {...newPost.stats!, deadline: e.target.value}})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="e.g. Nov 2025"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase block mb-2">
                    <MapPin size={12} className="inline mr-1" />Location
                  </label>
                  <input 
                    type="text" 
                    value={newPost.stats?.location || ''} 
                    onChange={e => setNewPost({...newPost, stats: {...newPost.stats!, location: e.target.value}})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="e.g. United Kingdom"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Study Level</label>
                  <select 
                    value={newPost.stats?.level || 'Masters'} 
                    onChange={e => setNewPost({...newPost, stats: {...newPost.stats!, level: e.target.value}})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  >
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                    <option value="Postgrad">Postgrad</option>
                    <option value="Masters/PhD">Masters/PhD</option>
                    <option value="MBA">MBA</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-xs font-bold text-gray-400 uppercase">Article Content</label>
                <button 
                  onClick={handleAIFullDraft}
                  disabled={isGenerating || !newPost.title}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2 font-bold text-xs shadow-lg shadow-purple-100 disabled:opacity-50"
                >
                  <Sparkles size={14} /> {isGenerating ? 'Writing Draft...' : 'Generate AI Blueprint (1,200 Words)'}
                </button>
              </div>
              <textarea 
                value={newPost.content} 
                onChange={e => setNewPost({...newPost, content: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 h-96 font-serif"
                placeholder="Write your article here..."
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button onClick={handleSavePost} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-xl shadow-indigo-100">
                <Save size={18} /> Publish to Live Blog
              </button>
            </div>
          </div>
        ) : activeTab === 'posts' ? (
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Article</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map(post => (
                  <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-sm">{post.title}</td>
                    <td className="px-6 py-4">
                      <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase">{post.category}</span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">{post.date}</td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-indigo-600"><Edit size={16} /></button>
                      <button onClick={() => handleDeletePost(post.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400 text-sm">No user posts found. Create your first scholarship blueprint!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
};
