# Contributing to TestSentry

Thanks for your interest in TestSentry! I'm a solo developer building this cross-device testing tool, and I'd genuinely love some help.

## ▪️ What I'm Building

TestSentry aims to solve the frustrating problem of manual responsive testing. Right now it's basic, but I have big plans for AI-powered automation and background testing.

## ▪️ Getting Started

### Prerequisites

- Node.js 20+ and pnpm 10.15.0+
- Git
- Some React/TypeScript knowledge (beginner-friendly!)

### Setup

```bash
# Fork the repo and clone your fork
git clone https://github.com/yourusername/test-sentry.git
cd test-sentry

# Install and run
pnpm install
pnpm dev

# Visit http://localhost:3000 and test it out!
```

## ▪️ How You Can Help

Since I'm solo, **any help is appreciated** - no contribution is too small!

### Found a Bug?

Just [open an issue](https://github.com/noobships/test-sentry/issues/new) with:

- What you were doing
- What went wrong
- Screenshots if helpful

No need for formal templates - just tell me what broke!

### Have an idea?

I'm very open to suggestions! [Create an issue](https://github.com/noobships/test-sentry/issues/new) and let's discuss it.

### Want to Code?

**Perfect!** Here's what would help most right now:

| **Difficulty**                                         | **Tasks**                                                                                                                                                                                                      |
| :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Easy Wins**<br>_(Great for First-Time Contributors)_ | `□` Fix mobile responsiveness issues<br>`□` Add more device presets (Android phones, tablets, etc.)<br>`□` Improve error handling and user feedback<br>`□` Add keyboard shortcuts<br>`□` Better loading states |
| **Medium Difficulty**                                  | `□` Custom device size input<br>`□` Screenshot capture functionality<br>`□` Dark mode improvements<br>`□` URL validation and better error messages                                                             |
| **Advanced**<br>_(If You're Feeling Ambitious)_        | `□` Multi-environment testing setup<br>`□` Performance monitoring integration<br>`□` Visual regression detection research<br>`□` Background testing architecture                                               |

## ▪️ Development Workflow

**⚠️ Important: This project has strict quality gates that will block commits and deployments if not met.**

### Quality Gates

Before any code can be committed or deployed, it must pass:

1. **Prettier formatting** - Code must match project formatting standards
2. **ESLint checks** - Zero warnings allowed (`--max-warnings=0`)
3. **TypeScript type checking** - All types must be valid
4. **Build process** - Must build successfully

### Development Steps

| **Step** | **Action**                                              | **Quality Check**                   |
| :------- | :------------------------------------------------------ | :---------------------------------- |
| `1.`     | **Fork the repo**                                       | -                                   |
| `2.`     | **Create a branch**: `git checkout -b fix/your-feature` | -                                   |
| `3.`     | **Make changes**                                        | -                                   |
| `4.`     | **Test locally**: Run quality checks                    | `pnpm build` (includes all checks)  |
| `5.`     | **Commit**: Husky will auto-run checks                  | Pre-commit hook enforces quality    |
| `6.``    | **Push and create PR**                                  | GitHub Actions run full CI pipeline |

### Local Quality Checks

**Always run these before committing:**

```bash
# Quick check - will fail if any issues found
pnpm build

# Or run individual checks:
pnpm format:check    # Check formatting
pnpm lint:ci         # Strict linting (fails on warnings)
pnpm type-check      # TypeScript validation
```

**If you have issues, fix them with:**

```bash
pnpm format          # Fix formatting
pnpm lint:fix        # Fix auto-fixable lint issues
```

### Code Style

- **Prettier** handles formatting (configured in `.prettierrc`)
- **ESLint** with TypeScript support catches issues (configured in `.eslintrc.json`)
- **TypeScript** for safety
- **Husky** enforces quality on every commit

**The project uses strict ESLint rules:**

- Zero warnings allowed in CI
- TypeScript-specific rules enabled
- Unused variables must be prefixed with `_` or removed

## ▪️ What Happens When You Submit a PR

1. **GitHub Actions** automatically run the full quality pipeline
2. **All checks must pass** before the PR can be merged
3. **Vercel** will only deploy if CI passes
4. **Code review** focuses on logic, not formatting (tools handle that)

### CI Pipeline

The GitHub Actions workflow runs:

```yaml
- Checkout code
- Setup Node.js & pnpm
- Install dependencies
- Check code formatting (Prettier)
- Run ESLint (strict mode - no warnings)
- Type check (TypeScript)
- Build project
- Verify build output
```

## ▪️ Contribution Ideas

Not sure where to start? Try these:

| **Category**      | **Ideas**                                                                                                                                             |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Documentation** | Improve this CONTRIBUTING.md<br>Add code comments<br>Create usage examples<br>Write better error messages                                             |
| **Testing**       | Test on different browsers<br>Try edge cases and report issues<br>Test accessibility features                                                         |
| **Features**      | Look at the [GitHub issues](https://github.com/noobships/test-sentry/issues)<br>Pick something marked "good first issue"<br>Or suggest something new! |

## ▪️ Current Focus

Right now I'm focusing on:

| **Priority** | **Focus Area**                                                      |
| :----------: | :------------------------------------------------------------------ |
|     `1.`     | **Making the basic tool rock-solid** - fixing bugs, improving UX    |
|     `2.`     | **Planning the AI automation features** - research and architecture |
|     `3.`     | **Growing the community** - getting feedback and contributors       |

## ▪️ Troubleshooting

### Common Issues

**"Husky pre-commit hook failed"**

- Run `pnpm build` to see what's failing
- Fix formatting: `pnpm format`
- Fix lint issues: `pnpm lint:fix`
- Fix type issues: Check TypeScript errors

**"GitHub Actions failed"**

- Check the Actions tab for specific failure reasons
- Usually formatting, lint warnings, or type errors
- Fix locally and push again

**"Build fails locally"**

- Ensure you're using Node.js 20+ and pnpm 10.15.0+
- Try `pnpm install --force` to refresh dependencies
- Check for TypeScript errors in your editor

## ▪️ Questions?

I'm pretty responsive! You can:

[![Open Issue](https://img.shields.io/badge/Questions-Open_an_Issue-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/noobships/test-sentry/issues/new)
[![Email](https://img.shields.io/badge/Email-creativecoder.crco@gmail.com-white?style=for-the-badge&logo=gmail&logoColor=black)](mailto:creativecoder.crco@gmail.com)

Check existing issues and discussions for common questions.

## ▪️ License

By contributing, you agree your contributions will be under the same MIT License as the project.

---

**Thanks for considering contributing! Even small improvements make a huge difference for a solo project like this.**

**Remember: The quality gates are there to help, not hinder. They ensure everyone's code meets the same high standards!**
