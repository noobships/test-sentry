# 🛡️ TestSentry

<div align="center">

![TestSentry Logo](https://via.placeholder.com/200x80/000000/FFFFFF?text=TestSentry+Logo)

**A simple, powerful cross-device testing tool for web developers**

[![Live Demo](https://img.shields.io/badge/🚀%20Try%20Live-testsentry.vercel.app-brightgreen)](https://testsentry.vercel.app)
[![MIT License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

> Currently in early development. Built by a solo developer who got tired of manually resizing browser windows and running the same tests over and over.

## What is TestSentry?

Right now, it's a straightforward tool where you can:
- Enter any website URL 
- See how it looks across iPhone, iPad, and desktop simultaneously
- Switch between portrait/landscape orientations
- Focus on individual devices for detailed inspection

**[Try the live demo →](https://testsentry.vercel.app)**

## Screenshots

**Multi-Device Testing Interface**
<div align="center">

![TestSentry Multi-Device Interface](https://rss7lu1con.ufs.sh/f/WPpLHLZ4aXfpwsRwONhUlpDmEQ5FkrN08Rd2aZIKPzsbnJhc)

</div>

**Focus Mode for Detailed Inspection**
<div align="center">

![TestSentry Focus Mode](https://rss7lu1con.ufs.sh/f/WPpLHLZ4aXfpFY1zy5wXTd3ORNapDouhAtUmifBHLIs7nl0Y)

</div>

## The Vision

I'm building TestSentry because I'm sick of repetitive manual testing. Here's the plan:

### Phase 1: Better Device Testing
- [ ] Custom screen sizes and device frames
- [ ] Remove scrollbars for cleaner previews
- [ ] **Cross-browser testing** (Chrome, Firefox, Safari, Edge - like BrowserStack)
- [ ] **Cross-platform testing** (Windows, macOS, Linux, mobile)

### Phase 2: AI-Powered Automation (The Game Changer)
- [ ] **Auto-testing on save** - Paste your localhost URL, tool automatically tests every time you save code
- [ ] **AI agents that actually use your app** - Inspired by OpenAI's ChatGPT Agent and Anthropic's Computer Use
- [ ] **Background monitoring agents** - Like Cursor's background agents, but for web testing
- [ ] **Intelligent issue detection** - AI catches visual bugs, broken flows, performance issues

### Phase 3: Smart Monitoring
- [ ] **24/7 background testing** - Catches issues before users do
- [ ] **Core Web Vitals tracking** - No more manual Lighthouse runs
- [ ] **Visual regression detection** - AI compares screenshots and flags changes
- [ ] **Accessibility monitoring** - Continuous WCAG compliance checking

### Phase 4: Team Features
- [ ] Save and share test results
- [ ] Team collaboration and alerts
- [ ] Integration with CI/CD pipelines

## Why This Matters

**Current workflow:**
1. Make code changes
2. Manually resize browser window
3. Test on different devices/browsers manually
4. Run Lighthouse manually
5. Check for visual bugs manually
6. Repeat for every change

**TestSentry workflow:**
1. Paste your URL once
2. AI agents automatically test everything on every save
3. Get notified only when something actually breaks
4. Focus on building, not testing

## Tech Stack

- **Next.js 15** with TypeScript
- **Tailwind CSS** + **shadcn/ui** for styling
- **Playwright** (planned for cross-browser automation)
- **AI integrations** (planned for intelligent testing agents)

## Getting Started

```bash
git clone https://github.com/noobships/test-sentry.git
cd test-sentry
npm install
npm run dev
```

Open `http://localhost:3000` and test any website.

## Contributing

This is a new open source project and I'd love help! Whether you:
- Find bugs 🐛
- Have feature ideas 💡
- Want to contribute code 🔧
- Know about AI automation 🤖

All skill levels welcome.

## Current Status

- ✅ Basic multi-device preview working
- ✅ Clean, simple interface
- ✅ Deployed and stable
- 🚧 Planning AI automation features
- 🚧 Researching cross-browser testing implementation
- 📋 Designing the agent-based testing architecture

## Contact

Built by [@noobships](https://github.com/noobships) 

- Email: creativecoder.crco@gmail.com
- Have ideas or feedback? [Open an issue](https://github.com/noobships/test-sentry/issues)

## License

MIT License - use it however you want.

---

**Like this project? Give it a ⭐**
