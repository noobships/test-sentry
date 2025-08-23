# ⛡ TestSentry

<div align="left">

**A simple, powerful cross-device testing tool for web developers.**

[![Live Demo](https://img.shields.io/badge/🚀_Try_Live-testsentry.devstool.dev-000000?style=for-the-badge)](https://testsentry.devstool.dev/)
[![MIT License](https://img.shields.io/badge/License-MIT-white?style=for-the-badge&logo=opensourceinitiative&logoColor=black)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-000000?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/noobships/test-sentry/actions)

</div>

> Currently in early development. Built by a solo developer who got tired of manually resizing browser windows and running the same tests over and over.

## What is TestSentry?

Right now, it's a straightforward tool where you can:

- Enter any website URL
- See how it looks across iPhone, iPad, and desktop simultaneously
- Switch between portrait/landscape orientations
- Focus on individual devices for detailed inspection

**[Try the live demo →](https://testsentry.devstool.dev/)**

## Screenshots

**Multi-Device Testing Interface**

<div align="center">

![TestSentry Multi-Device Interface](https://rss7lu1con.ufs.sh/f/WPpLHLZ4aXfphJsSqZlIlz8GQ1qkojRbuWKMxasrYF6dvZHt)

</div>

**Focus Mode for Detailed Inspection**

<div align="center">

![TestSentry Focus Mode](https://rss7lu1con.ufs.sh/f/WPpLHLZ4aXfpodkJd8v9OZsLkqiAU0rvbDGdF28anKQyTIJx)

</div>

## The Vision

I'm building TestSentry because I'm sick of repetitive manual testing. Here's the plan:

### ▪️ Phase 1: Better Device Testing

- [ ] Custom screen sizes and device frames
- [ ] Remove scrollbars for cleaner previews
- [ ] **Cross-browser testing** (Chrome, Firefox, Safari, Edge - powered by [BrowserStack](https://www.browserstack.com/))
- [ ] **Cross-platform testing** (Windows, macOS, Linux, mobile)

### ▪️ Phase 2: AI-Powered Automation (The Game Changer)

- [ ] **Auto-testing on save** - Paste your localhost URL, tool automatically tests every time you save code
- [ ] **AI agents that actually use your app** - Inspired by [OpenAI's ChatGPT Agent](https://openai.com/index/introducing-chatgpt-agent/) and [Anthropic's Computer Use](https://www.anthropic.com/news/3-5-models-and-computer-use)
- [ ] **Background monitoring agents** - Like [Cursor's background agents](https://docs.cursor.com/en/background-agent), but for web testing
- [ ] **Intelligent issue detection** - AI catches visual bugs, broken flows, performance issues

### ▪️ Phase 3: Smart Monitoring

- [ ] **24/7 background testing** - Catches issues before users do
- [ ] **Core Web Vitals tracking** - No more manual Lighthouse runs
- [ ] **Visual regression detection** - AI compares screenshots and flags changes
- [ ] **Accessibility monitoring** - Continuous WCAG compliance checking

### ▪️ Phase 4: Team Features

- [ ] Save and share test results
- [ ] Team collaboration and alerts
- [ ] Integration with CI/CD pipelines

## Why This Matters

| **Current workflow**                                                                                                                                                                                                     | **TestSentry workflow**                                                                                                                                                                |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `1.` Make code changes<br>`2.` Manually resize browser window<br>`3.` Test on different devices/browsers manually<br>`4.` Run Lighthouse manually<br>`5.` Check for visual bugs manually<br>`6.` Repeat for every change | `1.` Paste your URL once<br>`2.` AI agents automatically test everything on every save<br>`3.` Get notified only when something actually breaks<br>`4.` Focus on building, not testing |

## Requirements

- **Node.js**: 20.0.0 or higher
- **Package Manager**: pnpm 10.15.0 or higher (npm and yarn not supported)

## Tech Stack

- **Next.js 15** with TypeScript
- **Tailwind CSS** + **shadcn/ui** for styling
- **Playwright** (planned for cross-browser automation)
- **AI integrations** (planned for intelligent testing agents)

## Getting Started

**⚠️ This project requires pnpm as the package manager. npm and yarn are not supported.**

```bash
git clone https://github.com/noobships/test-sentry.git
cd test-sentry
pnpm install
pnpm dev
```

Open `http://localhost:3000` and test any website.

## Development & Quality

This project maintains high code quality standards through automated checks:

### 🚀 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production (includes quality checks)
pnpm start        # Start production server
pnpm lint         # Check for linting issues
pnpm lint:ci      # Strict linting (fails on warnings)
pnpm lint:fix     # Auto-fix linting issues
pnpm format       # Format code with Prettier
pnpm format:check # Check code formatting
pnpm type-check   # Run TypeScript type checking
```

### 🛡️ Quality Gates

- **Pre-commit hooks** (Husky) ensure code quality before commits
- **GitHub Actions** run full quality checks on every push/PR
- **Vercel deployments** only succeed after passing all quality checks
- **Zero tolerance** for lint warnings or formatting issues

### 🔧 Code Quality Tools

- **ESLint** with TypeScript support and strict rules
- **Prettier** for consistent code formatting
- **TypeScript** for type safety
- **Husky** for pre-commit quality enforcement

## Contributing

This is a new open source project and I'd love help! Whether you:

| **Find bugs**              | **Have feature ideas** | **Want to contribute code** | **Know about AI automation** |
| :------------------------- | :--------------------- | :-------------------------- | :--------------------------- |
| Report issues you discover | Suggest new features   | Submit pull requests        | Share automation expertise   |

**All skill levels welcome.**

**[Read our Contributing Guide →](CONTRIBUTING.md)**

## Current Status

| **Status** | **Feature**                                      |
| :--------: | :----------------------------------------------- |
|    `✓`     | Basic multi-device preview working               |
|    `✓`     | Clean, simple interface                          |
|    `✓`     | Deployed and stable                              |
|    `✓`     | Quality gates and CI/CD pipeline                 |
|    `○`     | Planning AI automation features                  |
|    `○`     | Researching cross-browser testing implementation |
|    `○`     | Designing the agent-based testing architecture   |

## Contact

Built by **[@noobships](https://github.com/noobships)**

[![Email](https://img.shields.io/badge/Email-creativecoder.crco@gmail.com-000000?style=for-the-badge&logo=gmail&logoColor=white)](mailto:creativecoder.crco@gmail.com)
[![Issues](https://img.shields.io/badge/Feedback-Open_an_Issue-white?style=for-the-badge&logo=github&logoColor=black)](https://github.com/noobships/test-sentry/issues)

## License

MIT License - use it however you want.

---

**Like this project? Give it a ⭐**
