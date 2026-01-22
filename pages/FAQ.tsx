import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, BookOpen, GraduationCap, Clock, FileText, Globe, DollarSign, Users, AlertCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    category: "Eligibility",
    question: "What are the general eligibility requirements for fully-funded scholarships?",
    answer: "Fully-funded scholarships typically require: (1) A completed undergraduate degree for graduate programs, or high school diploma for undergraduate scholarships; (2) Strong academic record, usually a minimum GPA of 3.0/4.0 or equivalent; (3) English language proficiency demonstrated through IELTS (typically 6.5+) or TOEFL (typically 90+); (4) Relevant work or volunteer experience, especially for programs like Chevening or Commonwealth which require 2+ years of professional experience; (5) Citizenship of an eligible country as specified by each scholarship program. Requirements vary significantly between scholarships, so always verify with the official scholarship website before applying."
  },
  {
    category: "Eligibility",
    question: "Can I apply for scholarships if I already have a master's degree?",
    answer: "Yes, you can apply for doctoral (PhD) scholarships if you already hold a master's degree. Programs like Vanier CGS in Canada, DAAD in Germany, and Gates Cambridge in the UK actively welcome applicants with master's degrees for their doctoral programs. Some master's-level scholarships may have restrictions—for example, the Eiffel Excellence Scholarship requires you to be applying to a French institution for the first time. For undergraduate scholarships, having prior degrees typically disqualifies you. Always check specific eligibility requirements, as some programs specifically seek candidates with advanced degrees while others prioritize those earlier in their academic careers."
  },
  {
    category: "Eligibility",
    question: "Is there an age limit for international scholarships?",
    answer: "Age limits vary significantly by scholarship program. The Eiffel Excellence Scholarship requires master's candidates to be under 30 and PhD candidates under 35. The Schwarzman Scholars program accepts applicants aged 18-29 (or up to 34 for military members). The Rhodes Scholarship typically requires candidates to be 18-24, though some constituencies extend to 28. Many scholarships like Chevening, Commonwealth, and Fulbright do not have strict age limits but expect applicants to have sufficient remaining career span to generate impact. Development-focused scholarships like Australia Awards may accept candidates up to their mid-40s. Always verify age requirements on official scholarship portals as they can change annually."
  },
  {
    category: "Application Process",
    question: "How far in advance should I start preparing my scholarship application?",
    answer: "We recommend starting your scholarship preparation 12-18 months before the application deadline. This timeline allows adequate time for: (1) Researching programs and understanding eligibility requirements (3-4 months); (2) Preparing for and taking standardized tests like IELTS, TOEFL, or GRE (2-3 months); (3) Drafting and refining personal statements and essays with multiple revisions (2-3 months); (4) Securing strong recommendation letters from referees who know you well (1-2 months notice to referees); (5) Gathering and authenticating academic documents (1-2 months); (6) Completing applications with buffer time for technical issues (1 month before deadline). For highly competitive scholarships like Rhodes or Marshall, many successful applicants begin building their profiles years in advance."
  },
  {
    category: "Application Process",
    question: "How many scholarships should I apply for simultaneously?",
    answer: "We recommend applying to 5-10 scholarships that genuinely match your profile and goals. Quality matters more than quantity—a well-crafted application to 5 suitable scholarships will outperform generic applications to 20. Consider applying to: (1) 2-3 'reach' scholarships that are highly competitive but align with your strengths; (2) 3-4 'match' scholarships where your profile fits the typical successful candidate; (3) 2-3 'safety' options with less competition or broader eligibility. Important: Some scholarships like Erasmus Mundus limit you to applying to 3 programs per cycle. Others like Fulbright may conflict with simultaneous applications to other government scholarships. Always check if scholarships can be held concurrently and manage your timeline to avoid conflicts."
  },
  {
    category: "Application Process",
    question: "What documents are typically required for scholarship applications?",
    answer: "Most fully-funded scholarships require: (1) Academic transcripts from all post-secondary institutions, often requiring official translations if not in English; (2) Degree certificates or proof of expected graduation; (3) Standardized test scores (IELTS/TOEFL for English, GRE/GMAT for some US programs); (4) Letters of recommendation (typically 2-4, from academic and/or professional referees); (5) Personal statement or statement of purpose explaining your motivations and goals; (6) CV/Resume in the format specified by the program; (7) Research proposal for PhD programs; (8) Passport copy; (9) Passport-size photographs meeting specific requirements; (10) Proof of citizenship or residency. Some scholarships require additional documents like employer endorsement letters (DAAD), medical certificates (MEXT), or leadership essays (Chevening). Allow 2-3 months to gather all documents."
  },
  {
    category: "Funding",
    question: "What expenses do fully-funded scholarships typically cover?",
    answer: "Fully-funded scholarships generally cover: (1) Full tuition fees at the host university; (2) Monthly living stipend for accommodation, food, and daily expenses (ranging from $800-$2,500/month depending on country and program); (3) Health insurance coverage; (4) Round-trip international airfare. Many scholarships also include: (5) Arrival/settling-in allowance ($500-$2,000 one-time); (6) Book and study materials allowance; (7) Research or thesis grant for graduate students; (8) Conference travel funding; (9) Family allowance if accompanied by dependents; (10) Visa fee reimbursement. Note that 'fully funded' definitions vary—some programs provide partial funding expecting university fee waivers or personal contribution. Always verify exact coverage on official scholarship websites and calculate if the stipend adequately covers living costs in your destination city."
  },
  {
    category: "Funding",
    question: "Can I work while on a scholarship?",
    answer: "Work permissions vary by scholarship and host country. Many scholarships like Chevening allow limited part-time work (typically 10-20 hours/week) during term time and full-time during holidays. PhD scholarships often permit teaching assistantships as part of the academic experience. However, some scholarships restrict or prohibit external employment—Fulbright grantees may have restrictions on taking paid employment. Visa conditions also apply: student visas in countries like the UK (20 hours/week), Australia (48 hours/fortnight), and Canada (20 hours/week during term) regulate work hours. Some scholarships like Vanier CGS explicitly state that the generous stipend is provided so scholars can focus entirely on research without needing additional employment. We recommend clarifying work permissions with your scholarship provider before accepting employment."
  },
  {
    category: "Selection",
    question: "What are scholarship committees really looking for in candidates?",
    answer: "Beyond academic excellence, scholarship committees evaluate: (1) Leadership potential demonstrated through concrete examples of initiative, influence, and impact—not just positions held; (2) Clear career vision with specific, achievable goals that connect your past experience, proposed study, and future aspirations; (3) Commitment to giving back, whether to your home country, community, or field; (4) Fit with program values—Chevening seeks future influencers, Gates Cambridge looks for those improving others' lives, DAAD prioritizes development impact; (5) Authentic motivation that goes beyond prestige—why this specific program at this specific institution; (6) Communication skills evident in well-written essays and articulate interview responses; (7) Resilience and adaptability demonstrated through overcoming challenges; (8) Cultural awareness and ability to serve as an ambassador. Successful candidates present a coherent narrative connecting who they are, what they want to achieve, and how the scholarship enables that journey."
  },
  {
    category: "Selection",
    question: "How competitive are fully-funded scholarships?",
    answer: "Competition varies significantly by scholarship and applicant pool. Acceptance rates for the most prestigious scholarships: Rhodes Scholarship accepts approximately 100 scholars from 6,000+ applicants globally (under 2%); Gates Cambridge selects 80 from 6,000+ applications (around 1.5%); Chevening varies by country but typically selects 5-15% of qualified applicants; Fulbright acceptance rates range from 10-30% depending on country and field; Erasmus Mundus programs typically accept 10-50 applicants per program from 200-1,000 applications (5-15%). However, many excellent scholarships are less competitive: DAAD EPOS, Australia Awards, and Commonwealth Shared Scholarships may have acceptance rates of 15-30% for qualified applicants. Success depends heavily on how well your profile matches the scholarship's priorities. A candidate perfectly aligned with program values may have better odds than statistics suggest."
  },
  {
    category: "Selection",
    question: "How should I prepare for scholarship interviews?",
    answer: "Scholarship interview preparation should include: (1) Reviewing your application materials thoroughly—interviewers will probe claims in your essays; (2) Preparing 2-3 specific examples for each major theme in your application that you did not include in written materials; (3) Researching current events in your field and your target country—Rhodes and Marshall interviews often include questions on global affairs; (4) Practicing with mock interviews, ideally with professors, alumni, or professional coaches; (5) Preparing thoughtful questions to ask the panel; (6) Understanding the scholarship's values and being ready to demonstrate alignment; (7) Anticipating challenging questions like 'What would your critics say about you?' or 'Describe a failure and what you learned'; (8) Preparing for rapid-fire questions that test your thinking under pressure; (9) Planning appropriate professional attire; (10) Ensuring reliable technology for virtual interviews. Most interviews last 20-30 minutes with panels of 3-10 interviewers."
  },
  {
    category: "Specific Programs",
    question: "What is the difference between Chevening, Commonwealth, and Fulbright scholarships?",
    answer: "These three major government scholarships differ in key ways: Chevening (UK Government) funds one-year master's degrees at any UK university, requires 2+ years work experience, emphasizes leadership and networking, and mandates return to home country for 2 years post-study. Commonwealth Scholarships (UK-funded) support master's and PhD study specifically for citizens of Commonwealth developing countries, emphasize development impact, and require candidates to demonstrate how they'll apply education to their country's development. Fulbright (US Government) offers various grant types including graduate study, research, and teaching, emphasizes cultural exchange and mutual understanding between the US and other nations, and has country-specific requirements and selection processes. The key distinctions: Chevening focuses on future leaders and influencers; Commonwealth prioritizes development professionals returning to contribute; Fulbright emphasizes cultural ambassadorship and international understanding."
  },
  {
    category: "Specific Programs",
    question: "Which European countries offer the best scholarship opportunities?",
    answer: "Several European countries offer excellent fully-funded scholarship opportunities: Germany through DAAD provides over 1,200 scholarships annually with programs like EPOS for development professionals, plus the advantage of tuition-free public universities; France offers the Eiffel Excellence Scholarship (400 awards) and Emile Boutmy scholarships; The Netherlands provides Orange Knowledge Programme and Holland Scholarship; Sweden offers Swedish Institute scholarships (350 awards) with strong sustainability focus; Switzerland provides Swiss Government Excellence Scholarships for research; Belgium offers ARES scholarships for French-speaking programs. Additionally, EU-wide Erasmus Mundus Joint Master Degrees provide 3,500+ scholarships annually for studying at multiple European universities. For PhD specifically, many European countries offer funded positions as employment contracts with salaries rather than traditional scholarships. Germany, Netherlands, and Nordic countries are particularly strong for doctoral opportunities."
  },
  {
    category: "Specific Programs",
    question: "Are there fully-funded scholarships for undergraduate students?",
    answer: "Yes, several prestigious undergraduate scholarships exist: The Lester B. Pearson Scholarship at University of Toronto covers four years of study valued at approximately $320,000 CAD; MasterCard Foundation Scholars Program supports students from Africa at partner universities worldwide; United World Colleges offer two-year pre-university programs with needs-based funding; Many US universities offer full-ride merit scholarships to international students including Stanford, Harvard, Yale, MIT, and others (though highly competitive); The MEXT Scholarship from Japan includes undergraduate study with one year of Japanese language preparation; Korea's KGSP/GKS program funds 4-5 year undergraduate degrees. Undergraduate scholarships are generally more competitive than graduate options because: fewer programs exist, more applicants compete, and assessing potential is harder than evaluating track records. School-based nominations are often required, making counselor relationships crucial."
  },
  {
    category: "After Selection",
    question: "What happens after I receive a scholarship offer?",
    answer: "After receiving a scholarship offer, expect these steps: (1) Formal acceptance—sign and return acceptance documents by the specified deadline; (2) University admission confirmation—secure unconditional admission if you had conditional offers; (3) Visa application—begin immediately as processing can take weeks to months; (4) Medical examinations—some scholarships require health clearances; (5) Pre-departure orientation—many programs offer virtual or in-person sessions; (6) Travel arrangements—book flights (often the scholarship reimburses rather than books); (7) Accommodation planning—arrange housing, often with scholarship support; (8) Banking setup—prepare for opening accounts in your destination country; (9) Documentation gathering—carry original certificates, scholarship letters, and multiple copies; (10) Connect with current scholars—most programs have active social media groups. Timeline typically spans 3-6 months between offer and departure. Don't delay visa applications—this is where most scholars face challenges."
  },
  {
    category: "After Selection",
    question: "What are the obligations after completing a scholarship?",
    answer: "Post-scholarship obligations vary by program but commonly include: (1) Return-to-home-country requirements—Chevening requires 2 years residence in home country after graduation; Fulbright has similar requirements; (2) Loan repayment—Aga Khan Foundation scholarships include 50% loan component to be repaid within 5 years; (3) Alumni network participation—most scholarships expect active engagement with alumni associations; (4) Reporting obligations—some programs require periodic updates on career progress; (5) No immediate re-application—most scholarships prevent receiving the same award twice; (6) Maintaining good standing—failing to complete your degree or violating terms can require fund repayment. Development-focused scholarships like Commonwealth and Australia Awards particularly emphasize return obligations as their core mission is building capacity in home countries. Violating return requirements can affect future visa applications and may result in recovery of scholarship funds."
  },
  {
    category: "Common Concerns",
    question: "I have a low GPA. Can I still get a fully-funded scholarship?",
    answer: "Yes, scholarships consider more than GPA. Strategies for applicants with lower GPAs: (1) Emphasize upward trend—if your grades improved over time, highlight this trajectory; (2) Provide context—if circumstances affected your grades (illness, family situations, working while studying), address this directly; (3) Showcase other strengths—strong work experience, publications, leadership, or community impact can compensate; (4) Target appropriate programs—some scholarships like DAAD EPOS and Commonwealth value professional experience heavily; (5) Consider professional master's programs—MBA scholarships often weight work experience and GMAT more than undergraduate GPA; (6) Get strong recommendations—referees who can speak to your potential despite transcript limitations are valuable; (7) Excel in standardized tests—strong GRE, GMAT, or IELTS scores demonstrate current capability; (8) Apply to less competitive programs—development-focused scholarships may have more holistic review. Many successful scholars had imperfect transcripts but compelling stories and clear potential."
  },
  {
    category: "Common Concerns",
    question: "Can I apply for scholarships in countries where I don't speak the language?",
    answer: "Absolutely. Many countries offer English-taught programs specifically for international students: Germany has over 1,800 English-taught master's programs; France offers English tracks at most grande écoles and many universities; Netherlands has the highest number of English-taught programs in continental Europe; Sweden, Denmark, and Norway offer extensive English-medium instruction; Japan's MEXT scholarship includes Japanese language training before academic study. For PhD programs, many countries conduct research in English even when coursework may be in the local language. However, learning the local language offers significant advantages: better daily life experience, broader program choices, improved employment prospects, and stronger cultural integration. Many scholarships include language training—DAAD offers 2-6 months of German before studies; MEXT provides one year of Japanese. Check if your target scholarship includes language preparation and whether local language proficiency affects competitiveness."
  },
  {
    category: "Common Concerns",
    question: "How do I choose between multiple scholarship offers?",
    answer: "Evaluating multiple offers requires considering: (1) Financial coverage—compare total value including tuition, living stipend, travel, insurance, and hidden costs in each location; (2) Program quality—research university rankings in your specific field, not just overall; (3) Career alignment—which program and location best position you for your career goals; (4) Networking value—some scholarships (Rhodes, Schwarzman, Chevening) offer exceptional alumni networks; (5) Living conditions—cost of living, quality of life, climate, and personal safety in each location; (6) Post-study opportunities—visa options for staying to work, if desired; (7) Family considerations—if bringing family, compare family allowances and accompanying person visas; (8) Duration—longer programs may offer deeper learning but delay career entry; (9) Obligations—return requirements, loan components, or other commitments; (10) Gut feeling—where do you genuinely want to spend this formative period. Seek advice from current scholars in each program before deciding."
  },
  {
    category: "Common Concerns",
    question: "What if I get rejected from scholarships?",
    answer: "Rejection is common even for excellent candidates given the competition. Productive responses include: (1) Request feedback—some programs provide rejection reasons; use this to improve; (2) Reapply—many successful scholars were rejected on first attempts; Chevening and Fulbright explicitly welcome reapplication; (3) Strengthen your profile—use the gap year to gain experience, publish, or take leadership roles; (4) Expand your search—apply to different scholarships, consider partial funding options, or university-specific awards; (5) Consider alternative paths—teaching assistantships, research positions, or employer sponsorship; (6) Evaluate your essays—have them reviewed by alumni or advisors for the next cycle; (7) Improve test scores—retake IELTS/TOEFL if scores were borderline; (8) Build referee relationships—stronger letters can make a difference; (9) Stay connected—join scholarship communities, attend information sessions, network with alumni; (10) Maintain perspective—rejection reflects competition, not your worth. Many prominent leaders faced multiple scholarship rejections before success."
  }
];

const FAQ_CATEGORIES = [...new Set(FAQ_DATA.map(item => item.category))];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [activeCategory, setActiveCategory] = React.useState<string>('All');

  // Inject FAQPage schema for SEO
  useEffect(() => {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'faq-schema';
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_DATA.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    });

    const existing = document.getElementById('faq-schema');
    if (existing) existing.remove();
    document.head.appendChild(schemaScript);

    document.title = 'Scholarship FAQ | Scholarship Blueprint';

    return () => {
      const schema = document.getElementById('faq-schema');
      if (schema) schema.remove();
      document.title = 'Scholarship Blueprint | Fully Funded Global Grants 2025';
    };
  }, []);

  const filteredFAQs = activeCategory === 'All' 
    ? FAQ_DATA 
    : FAQ_DATA.filter(item => item.category === activeCategory);

  const categoryIcons: Record<string, React.ReactNode> = {
    'Eligibility': <GraduationCap size={16} />,
    'Application Process': <FileText size={16} />,
    'Funding': <DollarSign size={16} />,
    'Selection': <Users size={16} />,
    'Specific Programs': <Globe size={16} />,
    'After Selection': <Clock size={16} />,
    'Common Concerns': <AlertCircle size={16} />
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 px-4 py-2 rounded-full text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-8 border border-indigo-500/30">
            <HelpCircle size={14} /> Knowledge Base
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            Frequently Asked <span className="text-indigo-400">Questions</span>
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed font-medium max-w-2xl mx-auto">
            Comprehensive answers to the most common questions about fully-funded international scholarships, eligibility, applications, and more.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeCategory === 'All'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            All Questions
          </button>
          {FAQ_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {categoryIcons[category]}
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-start justify-between text-left gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    {categoryIcons[item.category] || <HelpCircle size={18} />}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {item.question}
                    </h3>
                  </div>
                </div>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-400 shrink-0 mt-1 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              {openIndex === index && (
                <div className="px-8 pb-8">
                  <div className="pl-14 border-l-2 border-indigo-100 ml-5">
                    <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-white text-center">
          <BookOpen size={40} className="mx-auto mb-6 opacity-80" />
          <h2 className="text-2xl font-black mb-4">Still Have Questions?</h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
            Our comprehensive scholarship guides provide in-depth information on specific programs, application strategies, and success tips.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/"
              className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
            >
              Browse Scholarship Guides
            </Link>
            <Link
              to="/contact"
              className="bg-indigo-500/30 text-white border border-white/20 px-8 py-3 rounded-xl font-bold hover:bg-indigo-500/50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
