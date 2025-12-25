
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, Share2, Twitter, Linkedin, Bookmark, 
  MessageCircle, MoreHorizontal, CheckCircle2,
  HandMetal, Flag, Share
} from 'lucide-react';
import { Post } from '../types';
import { MOCK_POSTS } from '../constants';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const userPosts = JSON.parse(localStorage.getItem('user_posts') || '[]');
    const allPosts = [...userPosts, ...MOCK_POSTS];
    const found = allPosts.find(p => p.id === id);
    if (found) {
      setPost(found);
    }
    window.scrollTo(0, 0);
  }, [id]);

  // Inject JSON-LD BlogPosting schema for SEO
  useEffect(() => {
    if (!post) return;
    
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'blog-posting-schema';
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.image,
      "author": {
        "@type": "Person",
        "name": post.author,
        "url": "https://scholarshipblueprint.com/about"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Scholarship Blueprint",
        "logo": {
          "@type": "ImageObject",
          "url": "https://scholarshipblueprint.com/logo.png"
        }
      },
      "datePublished": post.date,
      "dateModified": post.date,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://scholarshipblueprint.com/#/post/${post.id}`
      },
      "keywords": ["scholarship", "fully funded", "2025", "international students", post.category],
      "articleSection": post.category,
      "wordCount": post.content.split(' ').length
    });

    // Remove any existing schema first
    const existingSchema = document.getElementById('blog-posting-schema');
    if (existingSchema) {
      existingSchema.remove();
    }
    
    document.head.appendChild(schemaScript);
    
    // Update document title for SEO
    document.title = `${post.title} | Scholarship Blueprint`;

    return () => {
      const schema = document.getElementById('blog-posting-schema');
      if (schema) {
        schema.remove();
      }
      document.title = 'Scholarship Blueprint | Fully Funded Global Grants 2025';
    };
  }, [post]);

  if (!post) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-400">Loading Blueprint...</div>;

  const renderContent = (content: string) => {
    return content.split('\n\n').map((para, i) => {
      // Headers
      if (para.startsWith('###')) {
        return (
          <h2 key={i} className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 tracking-tight font-sans">
            {para.replace('### ', '')}
          </h2>
        );
      }
      // Lists
      if (para.includes(' - ') || para.startsWith('- ')) {
        return (
          <ul key={i} className="my-10 space-y-6">
            {para.split('\n').filter(li => li.trim()).map((li, j) => (
              <li key={j} className="flex items-start gap-5 font-serif-medium text-[21px] text-[#292929] leading-relaxed">
                <div className="mt-3 w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                <span dangerouslySetInnerHTML={{ 
                  __html: li.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<span class="text-slate-900 font-semibold">$1</span>') 
                }} />
              </li>
            ))}
          </ul>
        );
      }
      // Standard Paragraph
      return (
        <p key={i} className="font-serif-medium text-[21px] text-[#292929] leading-[1.6] mb-10 tracking-[-0.003em]" dangerouslySetInnerHTML={{
          __html: para.replace(/\*\*(.*?)\*\*/g, '<span class="text-slate-900 font-semibold">$1</span>')
        }} />
      );
    });
  };

  return (
    <div className="bg-white min-h-screen selection:bg-indigo-50 selection:text-indigo-900">
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none bg-slate-100">
        <div 
          className="h-full bg-indigo-600 transition-all duration-100" 
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <article className="max-w-screen-md mx-auto px-5 md:px-0 pt-20 pb-40">
        {/* Author Header */}
        <header className="mb-14">
          <h1 className="text-[32px] md:text-[48px] font-extrabold text-slate-900 leading-[1.15] mb-8 tracking-tight font-sans">
            {post.title}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/about" className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200 block">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.author}&backgroundColor=f1f5f9`} alt={post.author} />
              </Link>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold text-slate-900">{post.author}</span>
                  <span className="text-slate-400">·</span>
                  <button className="text-[15px] font-semibold text-indigo-600 hover:text-indigo-700">Follow</button>
                </div>
                <div className="flex items-center gap-2 text-[14px] text-slate-500">
                  <span>{post.readTime} read</span>
                  <span className="text-slate-300">·</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-5 text-slate-400">
              <button className="hover:text-slate-900 transition-colors"><Twitter size={20} /></button>
              <button className="hover:text-slate-900 transition-colors"><Linkedin size={20} /></button>
              <button className="hover:text-slate-900 transition-colors"><Share size={20} /></button>
            </div>
          </div>
        </header>

        {/* Action Bar 1 */}
        <div className="flex items-center justify-between py-4 border-y border-slate-100 mb-12 text-slate-500">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setHasLiked(!hasLiked)}
              className={`flex items-center gap-2 text-sm font-medium hover:text-slate-900 transition-colors ${hasLiked ? 'text-indigo-600' : ''}`}
            >
              <HandMetal size={20} className={hasLiked ? 'fill-current' : ''} /> 1.2K
            </button>
            <button className="flex items-center gap-2 text-sm font-medium hover:text-slate-900 transition-colors">
              <MessageCircle size={20} /> 48
            </button>
          </div>
          <div className="flex items-center gap-5">
            <button className="hover:text-slate-900 transition-colors"><Bookmark size={22} /></button>
            <button className="hover:text-slate-900 transition-colors"><Share size={22} /></button>
            <button className="hover:text-slate-900 transition-colors"><MoreHorizontal size={22} /></button>
          </div>
        </div>

        {/* Hero Image */}
        <figure className="mb-16">
          <div className="aspect-[16/9] bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
          <figcaption className="text-center mt-4 text-[14px] text-slate-500 font-normal italic">
            Official portal preview for the 2025/2026 intake cycle.
          </figcaption>
        </figure>

        {/* Article Body */}
        <div className="article-body">
          {/* Status Box */}
          <div className="bg-[#FAFAFA] border border-[#F2F2F2] rounded-2xl p-8 mb-16 flex flex-wrap gap-8 justify-center">
             <div className="text-center">
                <p className="text-[11px] font-bold text-[#A8A8A8] uppercase tracking-[0.1em] mb-1 font-sans">Blueprint Status</p>
                <p className="text-[15px] font-bold text-slate-900 flex items-center gap-1.5 justify-center font-sans">
                  <CheckCircle2 size={16} className="text-[#242424]" /> 2025 Verified
                </p>
             </div>
             <div className="text-center">
                <p className="text-[11px] font-bold text-[#A8A8A8] uppercase tracking-[0.1em] mb-1 font-sans">Regional Scope</p>
                <p className="text-[15px] font-bold text-slate-900 font-sans">{post.stats?.location || 'International'}</p>
             </div>
             <div className="text-center">
                <p className="text-[11px] font-bold text-[#A8A8A8] uppercase tracking-[0.1em] mb-1 font-sans">Estimated Value</p>
                <p className="text-[15px] font-bold text-[#1A8917] font-sans">{post.stats?.funding || 'Full Ride'}</p>
             </div>
             <div className="text-center">
                <p className="text-[11px] font-bold text-[#A8A8A8] uppercase tracking-[0.1em] mb-1 font-sans">Deadline</p>
                <p className="text-[15px] font-bold text-[#C4320A] font-sans">{post.stats?.deadline || 'Rolling'}</p>
             </div>
          </div>

          <AdPlaceholder type="content" className="mb-16" />

          <section className="article-content">
            {renderContent(post.content)}
          </section>

          <AdPlaceholder type="content" className="my-20" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2.5 mt-20 mb-16">
          {['Scholarship', 'Education Funding', 'Study Abroad', '2025 Grants', 'PhD Blueprints'].map(tag => (
            <span key={tag} className="bg-[#F2F2F2] text-[#242424] px-4 py-1.5 rounded-full text-sm font-normal hover:bg-[#E5E5E5] transition-colors cursor-pointer">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Bar Bottom */}
        <div className="flex items-center justify-between py-6 border-t border-slate-100 text-slate-500">
           <div className="flex items-center gap-6">
              <button className={`flex items-center gap-2 text-sm font-medium hover:text-slate-900 transition-colors ${hasLiked ? 'text-indigo-600' : ''}`}>
                <HandMetal size={22} className={hasLiked ? 'fill-current' : ''} /> 1.2K
              </button>
              <button className="flex items-center gap-2 text-sm font-medium hover:text-slate-900 transition-colors">
                <MessageCircle size={22} /> 48
              </button>
            </div>
            <div className="flex items-center gap-5">
              <button className="hover:text-slate-900 transition-colors"><Bookmark size={22} /></button>
              <button className="hover:text-slate-900 transition-colors"><Share size={22} /></button>
              <button className="hover:text-slate-900 transition-colors"><MoreHorizontal size={22} /></button>
            </div>
        </div>

        {/* Footer Author Profile */}
        <div className="mt-20 pt-16 border-t border-slate-100">
           <div className="flex flex-col md:flex-row gap-8 items-start">
             <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 bg-slate-50">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.author}&backgroundColor=f8fafc`} alt={post.author} />
             </div>
             <div className="flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xl font-bold text-[#242424]">Written by {post.author}</h4>
                  <button className="bg-[#242424] text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-black transition-all">
                    Follow
                  </button>
                </div>
                <p className="text-[16px] text-[#6B6B6B] leading-relaxed mb-6">
                  Principal analyst at Scholarship Blueprint. Specialized in international academic grants, VISA policy, and PhD research funding across Europe and North America.
                </p>
                <div className="flex gap-4">
                   <button className="text-slate-400 hover:text-slate-900"><Twitter size={18} /></button>
                   <button className="text-slate-400 hover:text-slate-900"><Linkedin size={18} /></button>
                </div>
             </div>
           </div>
        </div>

        {/* Recommendations */}
        <section className="mt-32 border-t border-slate-100 pt-16">
          <h3 className="text-2xl font-bold mb-10 font-sans tracking-tight">More from Scholarship Blueprint</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {MOCK_POSTS.filter(p => p.id !== id).slice(0, 4).map(p => (
              <Link key={p.id} to={`/post/${p.id}`} className="group block">
                <div className="aspect-[16/9] rounded-lg overflow-hidden mb-5 bg-slate-50 border border-slate-100">
                  <img src={p.image} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
                </div>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-500 mb-2 font-sans uppercase tracking-tight">
                  <span className="text-indigo-600">{p.category}</span>
                  <span>·</span>
                  <span>{p.readTime}</span>
                </div>
                <h4 className="text-[20px] font-bold text-[#242424] leading-[1.3] group-hover:text-indigo-600 transition-colors">
                  {p.title}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      </article>

      {/* Floating Action Header (Subtle) */}
      <div className={`fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 z-50 transition-all duration-300 transform ${readingProgress > 15 ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
         <div className="max-w-screen-md mx-auto h-[64px] px-5 md:px-0 flex items-center justify-between">
            <div className="flex items-center gap-3 truncate max-w-[70%]">
               <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white shrink-0">SB</div>
               <span className="text-sm font-bold truncate text-slate-900">{post.title}</span>
            </div>
            <div className="flex items-center gap-4">
               <button className="text-slate-500 hover:text-slate-900"><Share2 size={18} /></button>
               <button className="text-slate-500 hover:text-slate-900"><Bookmark size={18} /></button>
               <button className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-indigo-700 transition-all">Sign in</button>
            </div>
         </div>
      </div>
    </div>
  );
};
