# Scholarship Blueprint - Global Funding Guide

A premium, AdSense-compliant blogging platform providing "blueprints" for fully-funded global scholarships (UK Chevening, Canada Vanier, Germany DAAD, France Eiffel, and more). Built for high-achieving international students seeking 2025/2026 academic funding.

![Scholarship Blueprint](https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80)

## 🎯 Features

### Content & SEO
- **6 Comprehensive Scholarship Blueprints** - 1,200+ word guides for major scholarships
- **Medium-Style Reading Experience** - Lora serif font, single-column layout
- **JSON-LD Structured Data** - BlogPosting schema for each article
- **Dynamic Meta Tags** - SEO-optimized titles and descriptions

### AdSense Integration
- **Bot Traffic Protection** - Detects and blocks suspicious traffic from Facebook ads
- **Human Verification Gate** - Challenge for Facebook referral traffic
- **Cookie Consent** - GDPR-compliant with granular controls
- **Ad Slot Management** - Easy configuration for all ad placements
- **Complete Legal Pages** - Privacy Policy, Terms of Service, Cookie disclosures

### Admin Dashboard
- **Content Management** - Create and manage scholarship posts
- **AI Content Generation** - Gemini API integration for drafts
- **Traffic Guard Analytics** - Monitor blocked bot traffic
- **AdSense Configuration** - Status and setup instructions

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router (HashRouter)
- **Icons**: Lucide React
- **AI**: Google Gemini API
- **Build**: Vite

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/scholarship-blueprint.git
cd scholarship-blueprint

# Install dependencies
npm install

# Start development server
npm run dev
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file:

```env
API_KEY=your_gemini_api_key_here
```

### AdSense Setup

1. Update your Publisher ID in `index.html` (already set to `ca-pub-9012240625310684`)
2. Create ad units in [Google AdSense](https://www.google.com/adsense)
3. Add slot IDs to `components/AdPlaceholder.tsx`:

```typescript
const AD_SLOTS: Record<string, string> = {
  leaderboard: 'YOUR_SLOT_ID',
  sidebar: 'YOUR_SLOT_ID',
  content: 'YOUR_SLOT_ID',
};
```

### ads.txt

The `ads.txt` file is pre-configured:
```
google.com, pub-9012240625310684, DIRECT, f08c47fec0942fa0
```

## 📁 Project Structure

```
├── components/
│   ├── AdPlaceholder.tsx    # AdSense ad components
│   ├── CookieConsent.tsx    # GDPR cookie banner
│   ├── Layout.tsx           # Main layout with header/footer
│   └── TrafficGate.tsx      # Bot verification gate
├── pages/
│   ├── Home.tsx             # Homepage with article feed
│   ├── PostDetail.tsx       # Article view with JSON-LD
│   ├── Admin.tsx            # Admin dashboard
│   ├── About.tsx            # About page
│   ├── Contact.tsx          # Contact form
│   ├── Privacy.tsx          # Privacy Policy (AdSense compliant)
│   └── Terms.tsx            # Terms of Service
├── services/
│   ├── geminiService.ts     # AI content generation
│   ├── trafficGuard.ts      # Bot detection system
│   └── adsenseConfig.ts     # AdSense configuration
├── constants.ts             # Mock data and categories
├── types.ts                 # TypeScript interfaces
├── App.tsx                  # Main app with routing
├── index.html               # HTML entry with AdSense
└── ads.txt                  # AdSense authorization
```

## 🔒 AdSense Compliance

This project includes all requirements for Google AdSense approval:

| Requirement | Status |
|-------------|--------|
| Privacy Policy | ✅ |
| Terms of Service | ✅ |
| Cookie Consent | ✅ |
| ads.txt | ✅ |
| Original Content | ✅ |
| "Advertisement" Labels | ✅ |
| Mobile Responsive | ✅ |
| Bot Protection | ✅ |

## 🚀 Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Deploy the `dist` folder to your hosting provider (Vercel, Netlify, GitHub Pages, etc.)

## 📱 Admin Access

Navigate to `/#/admin` and login with:
- **Username**: admin
- **Password**: 08081834353

> ⚠️ Change these credentials before deploying to production!

## 📄 License

MIT License - feel free to use for your own scholarship website.

## 🤝 Contributing

Contributions welcome! Please read the contributing guidelines first.

---

Built with ❤️ for international students seeking fully-funded education opportunities.
