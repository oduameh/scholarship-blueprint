
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, Twitter, Linkedin, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { CookieConsent } from './CookieConsent';
import { NewsletterModal } from './NewsletterModal';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tighter">
                <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <GraduationCap size={24} />
                </div>
                <span>Scholarship <span className="text-indigo-600">Blueprint</span></span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              <Link to="/" className="hover:text-indigo-600 transition-colors">Scholarships</Link>
              <Link to="/how-to-apply" className="hover:text-indigo-600 transition-colors">How to Apply</Link>
              <Link to="/resources" className="hover:text-indigo-600 transition-colors">Resources</Link>
              <Link to="/faq" className="hover:text-indigo-600 transition-colors">FAQ</Link>
              <Link to="/about" className="hover:text-indigo-600 transition-colors">About</Link>
              <div className="h-4 w-[1px] bg-gray-200"></div>
              <Link to="/admin" className="hover:text-indigo-600 text-gray-300">Portal</Link>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <button 
                onClick={() => setIsNewsletterOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl shadow-indigo-200 flex items-center gap-2"
              >
                <Sparkles size={14} /> Join Network
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-100 py-8 px-6 space-y-6 shadow-2xl animate-in fade-in slide-in-from-top-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-slate-900 font-black text-xl">Scholarships</Link>
            <Link to="/how-to-apply" onClick={() => setIsMenuOpen(false)} className="block text-slate-900 font-black text-xl">How to Apply</Link>
            <Link to="/resources" onClick={() => setIsMenuOpen(false)} className="block text-slate-900 font-black text-xl">Resources</Link>
            <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="block text-slate-900 font-black text-xl">FAQ</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block text-slate-900 font-black text-xl">About</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block text-slate-900 font-black text-xl">Contact</Link>
            <hr className="border-gray-100" />
            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block text-gray-400 font-bold text-sm uppercase tracking-widest">Admin Portal</Link>
            <button 
              onClick={() => { setIsMenuOpen(false); setIsNewsletterOpen(true); }}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
            >
              <Sparkles size={18} /> Join the Network
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <GraduationCap size={22} />
                </div>
                Scholarship Blueprint
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium">
                The world's premier authority on high-value academic funding for global students. Expert-verified blueprints for international academic success.
              </p>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-600 transition-all cursor-pointer">
                  <Twitter size={20} />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-600 transition-all cursor-pointer">
                  <Linkedin size={20} />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-black text-slate-900 mb-8 uppercase tracking-[0.3em] text-[10px] text-indigo-600">Resources</h3>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><Link to="/how-to-apply" className="hover:text-indigo-600 transition-colors">How to Apply</Link></li>
                <li><Link to="/faq" className="hover:text-indigo-600 transition-colors">FAQ</Link></li>
                <li><Link to="/resources" className="hover:text-indigo-600 transition-colors">Glossary & Tools</Link></li>
                <li><Link to="/about" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-black text-slate-900 mb-8 uppercase tracking-[0.3em] text-[10px] text-indigo-600">Legal</h3>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
                <li><Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="bg-slate-50 p-8 rounded-[2rem] border border-gray-100">
              <h3 className="font-black text-slate-900 mb-4 uppercase tracking-[0.2em] text-[10px]">Contact Editorial</h3>
              <div className="space-y-4">
                <p className="text-xs text-slate-500 font-medium">For inquiries regarding scholarship data or partnership opportunities:</p>
                <p className="text-indigo-600 font-black text-sm break-all">odulolaa@gmail.com</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">© 2025 Scholarship Blueprint. Academic Insights Network.</p>
            <div className="flex gap-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-indigo-600">Sitemap</Link>
              <Link to="/privacy" className="hover:text-indigo-600">CCPA Transparency</Link>
              <Link to="/contact" className="hover:text-indigo-600">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer>
      <CookieConsent />
      <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
    </div>
  );
};
