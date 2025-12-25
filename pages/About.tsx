
import React from 'react';
import { Shield, Target, Users, BookOpen, Award, CheckCircle } from 'lucide-react';

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
      </div>
    </div>
  );
};
