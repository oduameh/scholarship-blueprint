
import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <div className="prose prose-slate prose-xl max-w-none">
        <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tight text-slate-900">Privacy & Cookie Policy</h1>
        <p className="text-indigo-600 text-xs font-black uppercase tracking-[0.3em] mb-12">Scholarship Blueprint Authority Document | Last updated: Jan 2025</p>
        
        <div className="space-y-16">
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6">1. Information Collection</h2>
            <p className="text-slate-600 font-medium leading-relaxed">At Scholarship Blueprint, accessible from our domain, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Scholarship Blueprint and how we use it.</p>
            <p className="text-slate-600 font-medium leading-relaxed mt-4">We collect information that you voluntarily provide when using our contact forms, newsletter subscriptions, or when interacting with our content. This may include your name, email address, and any messages you send us.</p>
          </section>

          <section className="bg-slate-900 p-12 rounded-[2.5rem] text-white border border-slate-800 shadow-2xl">
            <h2 className="text-3xl font-black text-white mb-6">2. Google AdSense & Advertising</h2>
            <p className="text-slate-400 font-medium leading-relaxed mb-6">Scholarship Blueprint uses Google AdSense to display advertisements. Google AdSense is an advertising service provided by Google LLC. This service uses the "DoubleClick" cookie to track user behavior and serve personalized ads based on browsing history.</p>
            <p className="text-slate-400 font-medium leading-relaxed mb-6">Google may use the information collected to contextualize and personalize the ads of its own advertising network. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline font-bold">Google Ads Settings</a>.</p>
            <p className="text-slate-400 font-medium leading-relaxed">For more information on how Google uses data when you use our site, please visit: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline font-bold">How Google uses data</a></p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6">3. Cookies We Use</h2>
            <p className="text-slate-600 font-medium leading-relaxed mb-6">Our website uses the following types of cookies:</p>
            <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-bold text-slate-900">Essential Cookies</h4>
                <p className="text-slate-500 text-sm">Required for the website to function properly. These cannot be disabled.</p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-bold text-slate-900">Analytics Cookies</h4>
                <p className="text-slate-500 text-sm">Help us understand how visitors interact with our website to improve user experience.</p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-bold text-slate-900">Advertising Cookies (Google AdSense)</h4>
                <p className="text-slate-500 text-sm">Used by Google to display personalized advertisements based on your browsing behavior. These cookies track your activity across websites.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Preference Cookies</h4>
                <p className="text-slate-500 text-sm">Remember your settings and preferences for a better browsing experience.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6">4. Third-Party Advertising Partners</h2>
            <p className="text-slate-600 font-medium leading-relaxed mb-4">Our advertising partners may use cookies and web beacons on our site. Our primary advertising partner is:</p>
            <ul className="text-slate-600 font-medium space-y-2 list-disc ml-6">
              <li><strong>Google AdSense</strong> – <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Privacy Policy</a></li>
            </ul>
            <p className="text-slate-600 font-medium leading-relaxed mt-6">These third-party ad servers automatically receive your IP address when serving ads. Other technologies (such as cookies, JavaScript, or Web Beacons) may also be used by the third-party ad networks to measure the effectiveness of their advertisements and/or to personalize the advertising content you see.</p>
            <p className="text-slate-600 font-medium leading-relaxed mt-4">Scholarship Blueprint has no access to or control over these cookies that are used by third-party advertisers. You should consult the respective privacy policies of these third-party ad servers for more detailed information.</p>
          </section>

          <section className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
            <h2 className="text-3xl font-black text-slate-900 mb-6">5. Your Choices</h2>
            <p className="text-slate-600 font-medium leading-relaxed mb-4">You can choose to disable or selectively turn off our cookies or third-party cookies in your browser settings. However, this can affect how you are able to interact with our site as well as other websites.</p>
            <div className="space-y-3 mt-6">
              <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 font-bold hover:underline">→ Manage Google Ad Personalization</a>
              <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 font-bold hover:underline">→ Network Advertising Initiative Opt-Out</a>
              <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 font-bold hover:underline">→ Digital Advertising Alliance Opt-Out</a>
            </div>
          </section>

          <section className="border-l-4 border-indigo-600 pl-8">
            <h2 className="text-3xl font-black text-slate-900 mb-6">6. GDPR Data Protection Rights</h2>
            <p className="text-slate-600 font-medium leading-relaxed">We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
            <ul className="text-slate-600 font-medium space-y-4 list-disc ml-6 mt-4">
              <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
              <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6">7. California Consumer Privacy Act (CCPA)</h2>
            <p className="text-slate-600 font-medium leading-relaxed">If you are a California resident, you have specific rights regarding your personal information under the CCPA. You have the right to request disclosure of information we collect, the right to request deletion of your data, and the right to opt-out of the sale of your personal information.</p>
            <p className="text-slate-600 font-medium leading-relaxed mt-4">We do not sell personal information. To exercise your CCPA rights, please contact us using the information below.</p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6">8. Children's Privacy</h2>
            <p className="text-slate-600 font-medium leading-relaxed">Our website is intended for users who are at least 16 years of age. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete the information.</p>
          </section>

          <section className="bg-gray-900 p-8 rounded-2xl text-white">
            <h2 className="text-3xl font-black text-white mb-6">9. Contact Information</h2>
            <p className="text-slate-300 font-medium leading-relaxed">If you have additional questions or require more information about our Privacy Policy, or wish to exercise your data rights, please contact us:</p>
            <div className="mt-6 space-y-2">
              <p className="text-white font-bold">Email: <a href="mailto:odulolaa@gmail.com" className="text-indigo-400">odulolaa@gmail.com</a></p>
              <p className="text-slate-400 text-sm">We aim to respond to all privacy-related inquiries within 30 days.</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6">10. Policy Updates</h2>
            <p className="text-slate-600 font-medium leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this document.</p>
          </section>
        </div>
      </div>
    </div>
  );
};
