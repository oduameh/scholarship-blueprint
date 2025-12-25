import React, { useState } from 'react';
import { X, GraduationCap, CheckCircle, Loader2, Mail, Sparkles } from 'lucide-react';
import { subscribeToNewsletter } from '../services/emailService';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    setTimeout(() => {
      const result = subscribeToNewsletter(email, 'popup');
      if (result.success) {
        setStatus('success');
        setMessage(result.message);
        setEmail('');
        // Auto close after success
        setTimeout(() => {
          onClose();
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(result.message);
      }
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all z-10"
        >
          <X size={20} />
        </button>

        {/* Header gradient */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 px-8 pt-12 pb-16 text-white relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
              <GraduationCap size={32} />
            </div>
            <h2 className="text-3xl font-black mb-2">Join the Network</h2>
            <p className="text-indigo-100 font-medium">
              Get exclusive alerts when top scholarship portals open.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-8 -mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            {status === 'success' ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">You're In!</h3>
                <p className="text-gray-500 font-medium">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="scholar@university.edu"
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-medium">{message}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Joining...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Get Scholarship Alerts
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Benefits */}
          <div className="mt-6 space-y-3">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">What you'll receive:</p>
            <div className="grid grid-cols-1 gap-2 text-sm">
              {[
                'Early deadline reminders for Chevening, DAAD, Vanier',
                'Exclusive application strategy guides',
                'Success stories from funded scholars'
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={14} />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            No spam. Unsubscribe anytime. Read our{' '}
            <a href="/#/privacy" className="text-indigo-600 underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

