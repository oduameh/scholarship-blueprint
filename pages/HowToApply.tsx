import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, CheckCircle, Clock, FileText, Users, 
  Target, Calendar, AlertTriangle, Lightbulb, ArrowRight,
  Search, PenTool, Send, Award, GraduationCap
} from 'lucide-react';

export const HowToApply: React.FC = () => {
  useEffect(() => {
    document.title = 'How to Apply for Scholarships | Scholarship Blueprint';
    return () => {
      document.title = 'Scholarship Blueprint | Fully Funded Global Grants 2025';
    };
  }, []);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 px-4 py-2 rounded-full text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-8 border border-indigo-500/30">
            <BookOpen size={14} /> Complete Guide
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            How to Apply for <span className="text-indigo-400">Scholarships</span>
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed font-medium max-w-2xl mx-auto">
            A comprehensive step-by-step guide to navigating the scholarship application process, from initial research to successful acceptance.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-xl text-slate-600 leading-relaxed">
            Securing a fully-funded scholarship is one of the most transformative achievements for international students. These prestigious awards can cover tuition fees worth $30,000-$80,000 annually, provide living stipends of $1,000-$3,000 per month, and open doors to world-class universities. However, the application process is rigorous and competitive, with acceptance rates often below 5% for top programs.
          </p>
          <p className="text-xl text-slate-600 leading-relaxed">
            This comprehensive guide walks you through each phase of the scholarship application process, providing actionable strategies developed from analyzing thousands of successful applications to programs like Chevening, Fulbright, Gates Cambridge, Commonwealth, and DAAD.
          </p>
        </div>

        {/* Timeline Overview */}
        <div className="bg-indigo-50 rounded-3xl p-8 mb-16">
          <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <Calendar className="text-indigo-600" size={28} />
            Recommended Timeline: 12-18 Months
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { months: "12-18", task: "Research & Identify", desc: "Explore scholarships matching your profile" },
              { months: "9-12", task: "Prepare & Test", desc: "Take IELTS/TOEFL, gather documents" },
              { months: "6-9", task: "Draft & Refine", desc: "Write essays, secure references" },
              { months: "3-6", task: "Apply & Follow Up", desc: "Submit applications, prepare for interviews" }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-indigo-100">
                <div className="text-indigo-600 font-black text-lg mb-2">{item.months} months before</div>
                <h4 className="font-bold text-slate-900 mb-1">{item.task}</h4>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1 */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-xl">1</div>
            <div>
              <h2 className="text-3xl font-black text-slate-900">Research and Identify Scholarships</h2>
              <p className="text-slate-500 font-medium">Timeline: 12-18 months before deadline</p>
            </div>
          </div>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              The first phase of your scholarship journey involves comprehensive research to identify opportunities that genuinely match your profile. Many applicants waste valuable time applying to scholarships where they don't meet basic eligibility criteria or where their profile doesn't align with program priorities.
            </p>

            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Search className="text-indigo-600" size={20} /> What to Research
              </h3>
              <ul className="space-y-3">
                {[
                  "Eligibility requirements: citizenship, age limits, academic qualifications, work experience",
                  "Program values and priorities: leadership focus, development impact, research excellence",
                  "Application components: essays, research proposals, interviews, recommendations",
                  "Deadlines and timelines: application periods, interview dates, notification schedules",
                  "Funding coverage: tuition, living costs, travel, family allowances",
                  "Post-award obligations: return requirements, employment restrictions, reporting"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
              <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                <AlertTriangle size={18} /> Common Mistake
              </h4>
              <p className="text-amber-800">
                Applying to scholarships based solely on prestige without verifying eligibility. Always confirm you meet ALL requirements before investing time in an application. For example, Chevening requires 2 years (2,800 hours) of work experience—even a few weeks short disqualifies you.
              </p>
            </div>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-xl">2</div>
            <div>
              <h2 className="text-3xl font-black text-slate-900">Prepare Your Foundation</h2>
              <p className="text-slate-500 font-medium">Timeline: 9-12 months before deadline</p>
            </div>
          </div>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              Strong scholarship applications are built on a solid foundation of standardized test scores, academic documents, and preliminary outreach. This phase requires careful planning to ensure all components are ready when you begin drafting applications.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">English Language Proficiency</h3>
            <p>
              Most scholarships require IELTS (typically 6.5-7.0 minimum) or TOEFL (typically 90-100 minimum). Allow 2-3 months for preparation and testing. Key strategies:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <ArrowRight className="text-indigo-600 shrink-0 mt-1" size={16} />
                <span>Take a diagnostic test early to identify weak areas</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-indigo-600 shrink-0 mt-1" size={16} />
                <span>Register for test dates 6+ weeks in advance (slots fill quickly)</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-indigo-600 shrink-0 mt-1" size={16} />
                <span>Aim higher than minimum—competitive candidates often score 7.5+ IELTS</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-indigo-600 shrink-0 mt-1" size={16} />
                <span>Plan retake dates if needed (allow 13+ days between IELTS attempts)</span>
              </li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Academic Documents</h3>
            <p>
              Gather and authenticate all academic records. Requirements typically include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {[
                "Official transcripts from all institutions attended",
                "Degree certificates and diplomas",
                "Grading scale explanations",
                "Official translations (if not in English)",
                "Notarization or apostille (some countries)",
                "Course descriptions (occasionally required)"
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                  <FileText className="text-indigo-600 shrink-0" size={18} />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Identify Potential Referees</h3>
            <p>
              Begin identifying 3-4 potential referees who can write strong, specific letters. The best referees:
            </p>
            <ul className="space-y-2 ml-6 mt-4">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                <span>Know you well from sustained interaction (courses, work, research)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                <span>Can speak specifically to your abilities, not just generally praise</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                <span>Hold positions that give their endorsement weight</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                <span>Are responsive and reliable with deadlines</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Step 3 */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-xl">3</div>
            <div>
              <h2 className="text-3xl font-black text-slate-900">Craft Your Application Materials</h2>
              <p className="text-slate-500 font-medium">Timeline: 6-9 months before deadline</p>
            </div>
          </div>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              Your essays and personal statements are where you distinguish yourself from thousands of other qualified applicants. This phase requires multiple drafts, feedback cycles, and careful alignment with each scholarship's values.
            </p>

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <PenTool size={22} /> The Personal Statement Framework
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-xl p-5">
                  <h4 className="font-bold mb-2">Past</h4>
                  <p className="text-indigo-100 text-sm">What experiences shaped you? What have you accomplished? What motivates your interests?</p>
                </div>
                <div className="bg-white/10 rounded-xl p-5">
                  <h4 className="font-bold mb-2">Present</h4>
                  <p className="text-indigo-100 text-sm">Why this program now? Why are you the right candidate? What do you bring?</p>
                </div>
                <div className="bg-white/10 rounded-xl p-5">
                  <h4 className="font-bold mb-2">Future</h4>
                  <p className="text-indigo-100 text-sm">What will you do with this education? How will you create impact? What's your 5-10 year vision?</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Essay Writing Best Practices</h3>
            <ul className="space-y-4">
              <li className="bg-white rounded-xl border border-gray-100 p-5">
                <h4 className="font-bold text-slate-900 mb-2">Show, Don't Tell</h4>
                <p className="text-slate-500">Instead of claiming "I am a leader," describe a specific situation where your leadership created measurable change. Use the STAR method: Situation, Task, Action, Result.</p>
              </li>
              <li className="bg-white rounded-xl border border-gray-100 p-5">
                <h4 className="font-bold text-slate-900 mb-2">Be Specific About the Program</h4>
                <p className="text-slate-500">Generic statements like "I want to study at a world-class university" fail. Reference specific courses, faculty, research centers, or institutional resources that attract you.</p>
              </li>
              <li className="bg-white rounded-xl border border-gray-100 p-5">
                <h4 className="font-bold text-slate-900 mb-2">Align with Scholarship Values</h4>
                <p className="text-slate-500">Each scholarship has distinct priorities: Chevening emphasizes leadership and networking; Gates Cambridge focuses on improving others' lives; DAAD prioritizes development impact. Tailor accordingly.</p>
              </li>
              <li className="bg-white rounded-xl border border-gray-100 p-5">
                <h4 className="font-bold text-slate-900 mb-2">Quantify Your Impact</h4>
                <p className="text-slate-500">"Led a team" is weak. "Led a team of 12 volunteers to organize 5 community workshops reaching 200+ participants" is compelling.</p>
              </li>
            </ul>

            <div className="bg-green-50 border border-green-100 rounded-2xl p-6 mt-8">
              <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                <Lightbulb size={18} /> Pro Tip
              </h4>
              <p className="text-green-800">
                Have at least three different people review your essays: someone who knows the scholarship well (ideally an alumnus), a mentor in your field, and someone unfamiliar with your work who can assess clarity. Aim for 5-7 revision cycles before submission.
              </p>
            </div>
          </div>
        </section>

        {/* Step 4 */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-xl">4</div>
            <div>
              <h2 className="text-3xl font-black text-slate-900">Submit and Prepare for Interviews</h2>
              <p className="text-slate-500 font-medium">Timeline: 3-6 months before deadline</p>
            </div>
          </div>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              The final phase involves careful submission, thorough interview preparation, and maintaining momentum through the waiting period. Even after submitting, there's significant work to ensure you're ready for the next stages.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Submission Best Practices</h3>
            <ul className="space-y-3">
              {[
                "Submit 24-48 hours before the deadline to avoid technical issues",
                "Save confirmation emails and screenshots of submitted applications",
                "Verify all uploaded documents are readable and complete",
                "Confirm referees have submitted their letters",
                "Keep copies of everything you submitted for interview preparation"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Send className="text-indigo-600 shrink-0 mt-1" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Interview Preparation</h3>
            <p>
              If shortlisted, you'll typically have 2-4 weeks to prepare for interviews. Common formats include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h4 className="font-bold text-slate-900 mb-3">Panel Interviews</h4>
                <p className="text-slate-500 text-sm mb-3">3-10 interviewers asking questions for 20-30 minutes. Common for Rhodes, Marshall, Gates Cambridge.</p>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Maintain eye contact with the questioner while answering</li>
                  <li>• Include other panelists with brief eye contact</li>
                  <li>• Keep answers focused (2-3 minutes maximum)</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h4 className="font-bold text-slate-900 mb-3">Competency-Based</h4>
                <p className="text-slate-500 text-sm mb-3">Questions aligned with scholarship criteria. Common for Chevening, Commonwealth.</p>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Prepare 2-3 examples for each essay theme</li>
                  <li>• Use STAR method for structured responses</li>
                  <li>• Include examples not in your written application</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Common Interview Questions</h3>
            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <ul className="space-y-4">
                {[
                  "Why do you want to study in [country/institution] specifically?",
                  "How does this program fit into your career trajectory?",
                  "Describe a challenge you've overcome and what you learned.",
                  "What would your critics say about you?",
                  "How will you contribute to [scholarship name] community?",
                  "What's the biggest issue facing your field/country today?",
                  "Where do you see yourself in 10 years?",
                  "Why should we choose you over other qualified candidates?"
                ].map((q, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold">{i + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Document Checklist */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <FileText className="text-indigo-600" size={32} />
            Universal Document Checklist
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Valid passport (6+ months validity)",
                "Passport-size photographs (per specification)",
                "Academic transcripts (all institutions)",
                "Degree certificates",
                "English proficiency scores (IELTS/TOEFL)",
                "Letters of recommendation (2-4)",
                "CV/Resume (tailored format)",
                "Personal statement/Statement of purpose",
                "Research proposal (PhD applicants)",
                "Proof of citizenship",
                "Work experience certificates",
                "Medical certificate (some programs)",
                "Financial documents (if required)",
                "Portfolio (arts applicants)"
              ].map((item, i) => (
                <label key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-slate-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-white text-center">
          <Award size={48} className="mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-black mb-4">Ready to Start Your Journey?</h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto text-lg">
            Explore our comprehensive scholarship guides for detailed information on specific programs, deadlines, and application strategies.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/"
              className="bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
            >
              Browse All Scholarships
            </Link>
            <Link
              to="/faq"
              className="bg-indigo-500/30 text-white border border-white/20 px-10 py-4 rounded-xl font-bold hover:bg-indigo-500/50 transition-colors"
            >
              Read FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
