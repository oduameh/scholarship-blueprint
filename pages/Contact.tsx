
import React, { useState } from 'react';
import { Mail, MapPin, Send, HelpCircle, FileText, Briefcase, Loader2 } from 'lucide-react';
import { submitContactForm } from '../services/emailService';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Scholarship Eligibility Question',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const result = submitContactForm(
        formData.name,
        formData.email,
        formData.inquiryType,
        formData.message
      );

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', inquiryType: 'Scholarship Eligibility Question', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tight text-slate-900">Get in Touch.</h1>
          <p className="text-slate-500 text-xl mb-12 leading-relaxed font-medium">
            Have questions about a specific blueprint or wish to contribute to our global scholarship database? Our editorial team is here to assist.
          </p>

          <div className="space-y-10">
            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                <Mail size={28} />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-lg mb-1">Editorial Support</h4>
                <p className="text-indigo-600 font-black">odulolaa@gmail.com</p>
                <p className="text-slate-400 text-sm mt-2 font-medium">We typically respond to academic inquiries within 48 business hours.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                <Briefcase size={28} />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-lg mb-1">Partnerships</h4>
                <p className="text-slate-500 font-medium">Collaborate with Scholarship Blueprint to reach high-achieving international students.</p>
              </div>
            </div>
          </div>

          <div className="mt-16 p-8 bg-indigo-600 rounded-[2.5rem] text-white">
            <h4 className="font-black text-xl mb-4">Quick Links for Students</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-100 text-sm font-bold">
                <HelpCircle size={18} className="text-indigo-300" /> FAQs on Application Deadlines
              </div>
              <div className="flex items-center gap-3 text-indigo-100 text-sm font-bold">
                <FileText size={18} className="text-indigo-300" /> Statement of Purpose Guidelines
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-10 md:p-12 border border-gray-100 shadow-2xl shadow-gray-200/20">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-inner">
                <Send size={44} />
              </div>
              <h2 className="text-3xl font-black mb-4">Message Transmitted</h2>
              <p className="text-slate-500 font-medium text-lg">Thank you for contacting Scholarship Blueprint. Our editorial team will review your inquiry shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold" 
                    placeholder="Your name" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold" 
                    placeholder="your@email.com" 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Inquiry Type</label>
                <select 
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold"
                >
                  <option>Scholarship Eligibility Question</option>
                  <option>Data Correction / Update</option>
                  <option>Advertising & Partnership</option>
                  <option>Technical Support</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message Detail</label>
                <textarea 
                  required 
                  rows={5} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold resize-none" 
                  placeholder="How can we help you with your scholarship journey?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 text-sm uppercase tracking-widest disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Sending...
                  </>
                ) : (
                  'Send Inquiry'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
