import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, BookOpen, Globe, Search, GraduationCap,
  FileText, Award, Building, Users, Clock, DollarSign,
  ChevronDown, Bookmark, CheckCircle
} from 'lucide-react';

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  { term: "Fully Funded Scholarship", definition: "A scholarship that covers all major expenses including tuition fees, living costs (stipend), travel, and often health insurance. Recipients typically pay nothing out-of-pocket for their education.", category: "Funding Types" },
  { term: "Partial Scholarship", definition: "A scholarship that covers only a portion of educational expenses, such as tuition only or a partial tuition waiver. Students must fund remaining costs through other means.", category: "Funding Types" },
  { term: "Merit-Based Scholarship", definition: "A scholarship awarded based on academic achievement, test scores, or other accomplishments rather than financial need. Selection criteria focus on the applicant's qualifications and potential.", category: "Funding Types" },
  { term: "Need-Based Scholarship", definition: "A scholarship awarded based on the applicant's demonstrated financial need. Requires documentation of family income and assets to assess eligibility.", category: "Funding Types" },
  { term: "Stipend", definition: "A fixed monthly allowance provided to scholarship recipients to cover living expenses such as accommodation, food, transportation, and personal costs. Amounts vary by country and program, typically ranging from $800-$3,000 monthly.", category: "Financial Terms" },
  { term: "Tuition Waiver", definition: "An exemption from paying tuition fees at the host university. May be partial (percentage reduction) or full (complete exemption). Common in European countries where public universities charge minimal fees.", category: "Financial Terms" },
  { term: "Cost of Living Allowance", definition: "Additional funding provided beyond the base stipend to account for higher expenses in certain cities or regions. Often applied when studying in expensive locations like London, Zurich, or Tokyo.", category: "Financial Terms" },
  { term: "Family Allowance", definition: "Additional monthly stipend provided to scholarship recipients who bring dependent family members (spouse, children). Typically requires documentation and may affect visa arrangements.", category: "Financial Terms" },
  { term: "IELTS", definition: "International English Language Testing System. A standardized English proficiency test accepted by most universities and scholarship programs worldwide. Scored on a 0-9 band scale, with most scholarships requiring 6.5-7.0 minimum.", category: "Tests & Requirements" },
  { term: "TOEFL", definition: "Test of English as a Foreign Language. An American English proficiency test widely accepted for US programs and many international scholarships. Internet-based test (iBT) scored 0-120, with most programs requiring 90-100 minimum.", category: "Tests & Requirements" },
  { term: "GRE", definition: "Graduate Record Examination. A standardized test commonly required for US graduate school admissions. Measures verbal reasoning, quantitative reasoning, and analytical writing. Some international programs also accept or require GRE scores.", category: "Tests & Requirements" },
  { term: "GMAT", definition: "Graduate Management Admission Test. Required for most MBA programs and some master's in management programs. Measures analytical, quantitative, verbal, and reading skills.", category: "Tests & Requirements" },
  { term: "Statement of Purpose", definition: "An essay explaining your academic interests, career goals, and reasons for pursuing a specific program. Should connect your past experiences, current motivations, and future aspirations into a coherent narrative.", category: "Application Components" },
  { term: "Personal Statement", definition: "An essay focusing on your personal journey, values, and character. Often more reflective than a statement of purpose, allowing you to share experiences that shaped who you are.", category: "Application Components" },
  { term: "Research Proposal", definition: "A detailed document required for PhD and research-focused programs outlining your proposed research question, methodology, timeline, and expected contributions to the field.", category: "Application Components" },
  { term: "Letter of Recommendation", definition: "A letter written by someone who knows you well (professor, employer, mentor) attesting to your qualifications, character, and potential. Most programs require 2-4 letters from different referees.", category: "Application Components" },
  { term: "CV / Curriculum Vitae", definition: "A comprehensive document listing your educational background, work experience, publications, awards, skills, and other relevant information. Academic CVs can be longer than business resumes.", category: "Application Components" },
  { term: "Transcript", definition: "Official academic record from an educational institution showing courses taken, grades received, and degrees earned. Often requires official translation if not in English.", category: "Application Components" },
  { term: "Embassy Track", definition: "Application route where candidates apply through their home country's embassy or consulate, which conducts initial screening before forwarding nominations to the awarding body. Common for MEXT, Fulbright, and some country-specific programs.", category: "Application Routes" },
  { term: "University Track", definition: "Application route where candidates apply directly to universities, which then nominate successful candidates for scholarship consideration. Common for MEXT, Eiffel, and many institutional scholarships.", category: "Application Routes" },
  { term: "Nominating Agency", definition: "The organization in your home country responsible for receiving, screening, and forwarding scholarship applications. May be a ministry of education, scholarship board, or embassy.", category: "Application Routes" },
  { term: "Conditional Offer", definition: "A university admission or scholarship offer contingent on meeting certain requirements, such as achieving specific grades, test scores, or English proficiency levels.", category: "Offers & Admissions" },
  { term: "Unconditional Offer", definition: "A firm university admission or scholarship offer with no outstanding requirements. Confirms your place in the program pending acceptance.", category: "Offers & Admissions" },
  { term: "Waitlist", definition: "A status indicating you're qualified but not initially selected. You may receive an offer if selected candidates decline. Some programs notify waitlisted candidates of their ranking.", category: "Offers & Admissions" },
  { term: "Cotutelle", definition: "A joint doctoral program where the student is supervised by advisors at two universities, often in different countries. Results in a joint or double degree from both institutions.", category: "Program Types" },
  { term: "Joint Degree", definition: "A single degree awarded jointly by two or more institutions. Common in Erasmus Mundus programs where students study at multiple universities but receive one diploma.", category: "Program Types" },
  { term: "Double Degree", definition: "Two separate degrees awarded by two institutions. Students complete requirements for both programs and receive two diplomas.", category: "Program Types" },
  { term: "Exchange Program", definition: "A temporary study period (usually one semester to one year) at a partner institution. Students remain enrolled at their home university and typically don't earn a degree from the host institution.", category: "Program Types" },
  { term: "Postdoctoral Fellowship", definition: "Funding for researchers who have completed their PhD to continue research. Typically 1-3 years in duration, often at a different institution than where the PhD was earned.", category: "Program Types" },
  { term: "Return Obligation", definition: "A requirement that scholarship recipients return to their home country for a specified period (often 2 years) after completing their studies. Common in government scholarships like Chevening and Fulbright.", category: "Obligations" },
  { term: "Bond / Service Agreement", definition: "A contractual obligation to work for a specific employer or in a specific sector after graduation. Common in some government-sponsored scholarships, particularly in Asia.", category: "Obligations" },
  { term: "Visa", definition: "Official authorization permitting entry to and stay in a foreign country. Student visas are required for international study and have specific conditions regarding work, duration, and activities.", category: "Practical Matters" },
  { term: "Study Permit", definition: "Term used in Canada for authorization to study as an international student. Similar to a student visa but technically distinct from entry visas.", category: "Practical Matters" },
  { term: "Tier 4 / Student Route", definition: "The UK's student visa category (now called Student Route). Requires a Confirmation of Acceptance for Studies (CAS) from a licensed institution and proof of funds.", category: "Practical Matters" },
  { term: "SEVIS", definition: "Student and Exchange Visitor Information System. The US government database tracking international students. Students must pay the SEVIS fee and maintain valid status throughout their stay.", category: "Practical Matters" }
];

interface OfficialResource {
  name: string;
  url: string;
  description: string;
  country: string;
}

const OFFICIAL_RESOURCES: OfficialResource[] = [
  { name: "Chevening Scholarships", url: "https://www.chevening.org", description: "Official portal for UK government's global scholarship program", country: "UK" },
  { name: "Gates Cambridge", url: "https://www.gatescambridge.org", description: "Bill & Melinda Gates Foundation scholarship at Cambridge University", country: "UK" },
  { name: "Rhodes Trust", url: "https://www.rhodeshouse.ox.ac.uk", description: "World's oldest international scholarship at Oxford University", country: "UK" },
  { name: "Commonwealth Scholarships", url: "https://cscuk.fcdo.gov.uk", description: "UK government scholarships for Commonwealth country citizens", country: "UK" },
  { name: "Marshall Scholarships", url: "https://www.marshallscholarship.org", description: "UK government scholarships for American citizens", country: "UK" },
  { name: "Fulbright Program", url: "https://foreign.fulbrightonline.org", description: "US government's flagship international exchange program", country: "USA" },
  { name: "DAAD", url: "https://www.daad.de/en/", description: "German Academic Exchange Service - Germany's largest scholarship organization", country: "Germany" },
  { name: "Deutschlandstipendium", url: "https://www.deutschlandstipendium.de/en/", description: "Germany's national scholarship program", country: "Germany" },
  { name: "Campus France", url: "https://www.campusfrance.org/en", description: "French government agency for international students including Eiffel program", country: "France" },
  { name: "Vanier CGS", url: "https://vanier.gc.ca", description: "Canada's prestigious doctoral scholarship program", country: "Canada" },
  { name: "Trudeau Foundation", url: "https://www.trudeaufoundation.ca", description: "Leadership scholarships for PhD students in Canada", country: "Canada" },
  { name: "Erasmus Mundus", url: "https://erasmus-plus.ec.europa.eu", description: "EU-funded joint master's degree scholarships", country: "Europe" },
  { name: "MEXT Scholarship", url: "https://www.mext.go.jp/en/", description: "Japanese government scholarship program", country: "Japan" },
  { name: "JASSO", url: "https://www.jasso.go.jp/en/", description: "Japan Student Services Organization scholarships", country: "Japan" },
  { name: "Australia Awards", url: "https://www.dfat.gov.au/people-to-people/australia-awards", description: "Australian government scholarships for development", country: "Australia" },
  { name: "New Zealand Scholarships", url: "https://www.mfat.govt.nz/en/aid-and-development/new-zealand-scholarships/", description: "New Zealand government scholarships (Manaaki)", country: "New Zealand" },
  { name: "Korean Government Scholarship", url: "https://www.studyinkorea.go.kr", description: "KGSP/GKS scholarship program for Korea", country: "South Korea" },
  { name: "CSC Scholarships", url: "https://www.csc.edu.cn/laihua", description: "China Scholarship Council for study in China", country: "China" },
  { name: "Schwarzman Scholars", url: "https://www.schwarzmanscholars.org", description: "Leadership program at Tsinghua University, Beijing", country: "China" },
  { name: "Swedish Institute", url: "https://si.se/en/apply/scholarships/", description: "Swedish government scholarships for global professionals", country: "Sweden" },
  { name: "Nuffic", url: "https://www.nuffic.nl/en", description: "Netherlands scholarship programs (OKP, Holland Scholarship)", country: "Netherlands" },
  { name: "Swiss Government Excellence", url: "https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html", description: "Swiss government research scholarships", country: "Switzerland" }
];

const GLOSSARY_CATEGORIES = [...new Set(GLOSSARY_TERMS.map(t => t.category))];

export const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedTerms, setExpandedTerms] = useState<string[]>([]);

  useEffect(() => {
    document.title = 'Scholarship Resources & Glossary | Scholarship Blueprint';
    return () => {
      document.title = 'Scholarship Blueprint | Fully Funded Global Grants 2025';
    };
  }, []);

  const filteredTerms = GLOSSARY_TERMS.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || term.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleTerm = (term: string) => {
    setExpandedTerms(prev => 
      prev.includes(term) ? prev.filter(t => t !== term) : [...prev, term]
    );
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 px-4 py-2 rounded-full text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-8 border border-indigo-500/30">
            <Bookmark size={14} /> Resource Library
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            Scholarship <span className="text-indigo-400">Resources</span>
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed font-medium max-w-2xl mx-auto">
            Essential terminology, official portals, and trusted resources for your international scholarship journey.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Official Scholarship Portals */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center">
              <Globe size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900">Official Scholarship Portals</h2>
              <p className="text-slate-500 font-medium">Direct links to verified scholarship program websites</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-8">
            <p className="text-amber-800 font-medium">
              <strong>Important:</strong> Always verify scholarship information on official websites. Deadlines, eligibility requirements, and funding details can change. The links below connect directly to official program portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {OFFICIAL_RESOURCES.map((resource, i) => (
              <a
                key={i}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-indigo-100 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-1 rounded">
                    {resource.country}
                  </span>
                  <ExternalLink size={16} className="text-gray-300 group-hover:text-indigo-600 transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {resource.name}
                </h3>
                <p className="text-slate-500 text-sm">
                  {resource.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Glossary */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-purple-600 text-white rounded-2xl flex items-center justify-center">
              <BookOpen size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900">Scholarship Glossary</h2>
              <p className="text-slate-500 font-medium">{GLOSSARY_TERMS.length} essential terms explained</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory('All')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeCategory === 'All' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  All
                </button>
                {GLOSSARY_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Terms List */}
          <div className="space-y-3">
            {filteredTerms.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleTerm(item.term)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-2 py-1 rounded whitespace-nowrap">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-slate-900">{item.term}</h3>
                  </div>
                  <ChevronDown 
                    size={18} 
                    className={`text-gray-400 transition-transform ${expandedTerms.includes(item.term) ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedTerms.includes(item.term) && (
                  <div className="px-6 pb-5 pt-2 border-t border-gray-50">
                    <p className="text-slate-600 leading-relaxed pl-4 border-l-2 border-purple-200">
                      {item.definition}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No terms found matching your search.
            </div>
          )}
        </section>

        {/* Helpful Tools */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center">
              <CheckCircle size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900">Recommended Tools</h2>
              <p className="text-slate-500 font-medium">Third-party resources to support your application</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <h3 className="font-bold text-slate-900 text-xl mb-4">English Language Tests</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://www.ielts.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:underline font-medium">
                    <ExternalLink size={14} /> IELTS Official Registration
                  </a>
                </li>
                <li>
                  <a href="https://www.ets.org/toefl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:underline font-medium">
                    <ExternalLink size={14} /> TOEFL iBT Registration
                  </a>
                </li>
                <li>
                  <a href="https://www.duolingo.com/english-test" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:underline font-medium">
                    <ExternalLink size={14} /> Duolingo English Test
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <h3 className="font-bold text-slate-900 text-xl mb-4">Standardized Tests</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://www.ets.org/gre" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:underline font-medium">
                    <ExternalLink size={14} /> GRE Registration
                  </a>
                </li>
                <li>
                  <a href="https://www.mba.com/exams/gmat-exam" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:underline font-medium">
                    <ExternalLink size={14} /> GMAT Registration
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <h3 className="font-bold text-slate-900 text-xl mb-4">Document Preparation</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://europass.cedefop.europa.eu/editors/en/cv/compose" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:underline font-medium">
                    <ExternalLink size={14} /> Europass CV Builder
                  </a>
                </li>
                <li>
                  <a href="https://www.wes.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:underline font-medium">
                    <ExternalLink size={14} /> WES Credential Evaluation
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <h3 className="font-bold text-slate-900 text-xl mb-4">University Rankings</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://www.timeshighereducation.com/world-university-rankings" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:underline font-medium">
                    <ExternalLink size={14} /> Times Higher Education Rankings
                  </a>
                </li>
                <li>
                  <a href="https://www.topuniversities.com/qs-world-university-rankings" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:underline font-medium">
                    <ExternalLink size={14} /> QS World University Rankings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-white text-center">
          <GraduationCap size={48} className="mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-black mb-4">Ready to Start Applying?</h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto text-lg">
            Explore our comprehensive guides for detailed information on specific scholarship programs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/"
              className="bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
            >
              Browse Scholarships
            </Link>
            <Link
              to="/how-to-apply"
              className="bg-indigo-500/30 text-white border border-white/20 px-10 py-4 rounded-xl font-bold hover:bg-indigo-500/50 transition-colors"
            >
              How to Apply Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
