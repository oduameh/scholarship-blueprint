
import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <div className="prose prose-slate prose-xl max-w-none">
        <h1 className="text-5xl font-black mb-8 tracking-tight text-slate-900">Terms of Service</h1>
        <p className="text-indigo-600 text-xs font-black uppercase tracking-widest mb-12">Last updated: January 15, 2025</p>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 font-medium leading-relaxed">By accessing or using Scholarship Blueprint ("the Website"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website. Our platform provides academic funding information for educational purposes only.</p>
          </section>

          <section className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
            <h2 className="text-3xl font-black text-slate-900 mb-4">2. Academic Disclaimer</h2>
            <p className="text-slate-600 font-medium leading-relaxed">Scholarship Blueprint is NOT a scholarship provider, university, or government entity. We provide independent research, analysis, and educational blueprints. While we strive for accuracy, we cannot guarantee:</p>
            <ul className="text-slate-600 font-medium list-disc ml-6 mt-4 space-y-2">
              <li>The outcome of any scholarship application</li>
              <li>The availability of funds at the time of your application</li>
              <li>The accuracy of deadlines, which may change without notice</li>
              <li>Eligibility requirements, which are subject to change by awarding bodies</li>
            </ul>
            <p className="text-slate-600 font-medium leading-relaxed mt-4">Always verify information directly with official scholarship providers before submitting applications.</p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-4">3. Intellectual Property</h2>
            <p className="text-slate-600 font-medium leading-relaxed">The content, blueprints, analytical frameworks, text, graphics, logos, and other materials on this site are the exclusive property of Scholarship Blueprint or its content suppliers and are protected by copyright laws. Unauthorized reproduction, distribution, or modification of our content for commercial purposes is strictly prohibited.</p>
            <p className="text-slate-600 font-medium leading-relaxed mt-4">You may share links to our content and quote brief excerpts with proper attribution to Scholarship Blueprint.</p>
          </section>

          <section className="bg-indigo-50 p-10 rounded-[2.5rem] border border-indigo-100">
            <h2 className="text-3xl font-black text-slate-900 mb-4">4. Advertising & Sponsored Content</h2>
            <p className="text-slate-600 font-medium leading-relaxed mb-4">Our platform is supported by advertising through Google AdSense and potentially other advertising partners. By using this website, you acknowledge and agree that:</p>
            <ul className="text-slate-600 font-medium list-disc ml-6 space-y-3">
              <li><strong>Third-Party Ads:</strong> Advertisements are served by third parties (primarily Google) and we do not control their content. The appearance of advertisements does not constitute endorsement.</li>
              <li><strong>Ad Personalization:</strong> Ads may be personalized based on your browsing behavior. You can opt out of personalized ads through your Google account settings.</li>
              <li><strong>No Click Incentives:</strong> We do not encourage, incentivize, or require users to click on advertisements. Any such activity is prohibited.</li>
              <li><strong>Ad Blockers:</strong> While you may use ad-blocking software, please consider that advertising revenue supports our free educational content.</li>
              <li><strong>Sponsored Content:</strong> Any sponsored or paid content will be clearly labeled as "Sponsored" or "Advertisement."</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-4">5. User Conduct</h2>
            <p className="text-slate-600 font-medium leading-relaxed">When using Scholarship Blueprint, you agree not to:</p>
            <ul className="text-slate-600 font-medium list-disc ml-6 mt-4 space-y-2">
              <li>Use automated systems (bots, scrapers) to access the website</li>
              <li>Engage in any activity that could disable, overburden, or impair the website</li>
              <li>Attempt to interfere with the proper working of the website</li>
              <li>Artificially inflate ad impressions or click on advertisements fraudulently</li>
              <li>Reproduce or redistribute our content without permission</li>
              <li>Use the website for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-4">6. External Links</h2>
            <p className="text-slate-600 font-medium leading-relaxed">Our website may contain links to external websites, including official scholarship provider sites, university portals, and advertiser websites. We are not responsible for the content, privacy practices, or availability of these external sites. Following links to external sites is at your own risk.</p>
          </section>

          <section className="border-l-4 border-indigo-600 pl-8">
            <h2 className="text-3xl font-black text-slate-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-slate-600 font-medium leading-relaxed">To the fullest extent permitted by law, Scholarship Blueprint shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website, including but not limited to:</p>
            <ul className="text-slate-600 font-medium list-disc ml-6 mt-4 space-y-2">
              <li>Loss of scholarship opportunities</li>
              <li>Missed application deadlines</li>
              <li>Inaccurate information relied upon</li>
              <li>Any other damages arising from use of our content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-4">8. Indemnification</h2>
            <p className="text-slate-600 font-medium leading-relaxed">You agree to indemnify and hold harmless Scholarship Blueprint, its owners, employees, and affiliates from any claims, damages, losses, or expenses arising from your use of the website or violation of these Terms.</p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-4">9. Changes to Terms</h2>
            <p className="text-slate-600 font-medium leading-relaxed">We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes constitutes acceptance of the modified terms.</p>
          </section>

          <section className="bg-gray-900 p-8 rounded-2xl text-white">
            <h2 className="text-3xl font-black text-white mb-4">10. Contact Information</h2>
            <p className="text-slate-300 font-medium leading-relaxed">For questions about these Terms of Service, please contact us:</p>
            <div className="mt-4">
              <p className="text-white font-bold">Email: <a href="mailto:odulolaa@gmail.com" className="text-indigo-400">odulolaa@gmail.com</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-4">11. Governing Law</h2>
            <p className="text-slate-600 font-medium leading-relaxed">These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.</p>
          </section>
        </div>
      </div>
    </div>
  );
};
