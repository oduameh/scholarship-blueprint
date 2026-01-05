
import React from 'react';
import { Shield, Target, Users, BookOpen, Award, CheckCircle, Globe, Clock, FileText, GraduationCap } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="pb-20">
      <section className="bg-indigo-950 py-32 text-white text-center bg-dot-pattern relative">
        <div className="absolute inset-0 bg-indigo-950/80"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 px-4 py-2 rounded-full text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-8 border border-indigo-500/30">
            <Award size={14} /> 2025/2026 Academic Funding Authority
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">The Scholarship <span className="text-indigo-400">Blueprint.</span></h1>
          <p className="text-slate-300 text-xl leading-relaxed font-medium">
            Bridging the gap between global talent and world-class education through transparent, expert-led funding guides.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 text-center">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-black mb-4">Our Mission</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              To provide the most accurate, up-to-date blueprints for fully-funded scholarships in the UK, Canada, Germany, and France.
            </p>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 text-center">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-black mb-4">Integrity First</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              We cross-reference every grant with official university portals to ensure our readers never miss a valid deadline.
            </p>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 text-center">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-black mb-4">Expert Network</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Our contributors include former scholarship committee members and international education consultants.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-12 md:p-20 border border-gray-100 shadow-2xl shadow-gray-200/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
          <div className="max-w-3xl mx-auto space-y-10 relative z-10">
            <h2 className="text-4xl font-black text-slate-900 leading-tight">Empowering the next generation of global leaders.</h2>
            <div className="prose prose-indigo prose-lg text-slate-600 font-medium leading-relaxed">
              <p>
                Scholarship Blueprint was founded by a collective of education analysts who recognized that the greatest barrier to international education wasn't talent, but <strong>access to information</strong>.
              </p>
              <p>
                Every year, billions in scholarship funding go unspent because students are unaware of the eligibility nuances. We specialize in dismantling these barriers by providing granular, step-by-step application blueprints.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 not-prose">
                {[
                  "Verified University Grants",
                  "Government Funding Guides",
                  "Step-by-Step Essay Blueprints",
                  "Visa Requirement Checklists",
                  "MBA & PhD Specialization",
                  "Fully Funded Lists"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-900 font-bold">
                    <CheckCircle className="text-indigo-600 shrink-0" size={18} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Credibility Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-12 text-white relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <Globe className="mb-6 opacity-80" size={40} />
              <h3 className="text-2xl font-black mb-4">Global Coverage</h3>
              <p className="text-indigo-100 leading-relaxed mb-6">
                Our scholarship database covers funding opportunities across 50+ countries, including major destinations like the UK, USA, Canada, Germany, France, Australia, and emerging scholarship hubs in Asia.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-3xl font-black">20+</div>
                  <div className="text-indigo-200 text-xs font-bold uppercase tracking-wider">Scholarship Guides</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-3xl font-black">11</div>
                  <div className="text-indigo-200 text-xs font-bold uppercase tracking-wider">Funding Categories</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-12 border border-gray-100 shadow-xl">
            <Clock className="text-indigo-600 mb-6" size={40} />
            <h3 className="text-2xl font-black text-slate-900 mb-4">Updated for 2025/2026</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              All scholarship information is reviewed and updated for the current application cycle. We verify deadlines, eligibility requirements, and funding amounts directly with official sources.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="text-green-500" size={16} />
                <span className="text-slate-700 font-medium">Verified against official scholarship portals</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="text-green-500" size={16} />
                <span className="text-slate-700 font-medium">Regular updates as deadlines change</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="text-green-500" size={16} />
                <span className="text-slate-700 font-medium">Clear disclaimers on all time-sensitive information</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Standards */}
        <div className="mt-24 bg-gray-50 rounded-[2.5rem] p-12 border border-gray-100">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <FileText className="text-indigo-600 mx-auto mb-6" size={40} />
            <h2 className="text-3xl font-black text-slate-900 mb-4">Our Editorial Standards</h2>
            <p className="text-slate-600 leading-relaxed">
              Every scholarship guide on Scholarship Blueprint follows strict editorial guidelines to ensure accuracy, usefulness, and transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-black">1</span>
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Original Research</h4>
              <p className="text-slate-500 text-sm">All content is originally researched and written by our editorial team, not copied or AI-generated without review.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-black">2</span>
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Source Verification</h4>
              <p className="text-slate-500 text-sm">We cross-reference all scholarship details with official university and government sources before publication.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-black">3</span>
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Regular Updates</h4>
              <p className="text-slate-500 text-sm">Content is reviewed regularly and updated when scholarship details, deadlines, or requirements change.</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-24 bg-amber-50 border border-amber-100 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-200 text-amber-700 rounded-lg flex items-center justify-center shrink-0">
              <GraduationCap size={20} />
            </div>
            <div>
              <h4 className="font-bold text-amber-900 mb-2">Important Disclaimer</h4>
              <p className="text-amber-800 text-sm leading-relaxed">
                Scholarship Blueprint is an independent educational resource. We are not affiliated with any scholarship provider, university, or government agency. While we strive for accuracy, always verify information directly with official scholarship sources before applying. Scholarship details, deadlines, and eligibility requirements are subject to change by the awarding bodies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
