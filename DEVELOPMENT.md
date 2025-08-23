# Development Guide

This document explains the development setup and code quality tools used in TestSentry.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run full quality check (recommended before commits)
pnpm build
```

## Code Quality Tools

### ESLint

ESLint is configured to catch code quality issues and enforce best practices.

**Configuration**: `.eslintrc.json`
**Scripts**:

- `pnpm lint` - Check for linting issues (allows warnings)
- `pnpm lint:ci` - **Strict linting (fails on warnings)**
- `pnpm lint:fix` - Automatically fix linting issues

**Rules**:

- Extends Next.js recommended rules
- Enforces `prefer-const` and `no-var`
- **Zero warnings allowed in CI** (`--max-warnings=0`)
- TypeScript-specific rules enabled
- Unused variables must be prefixed with `_` or removed

### Prettier

Prettier automatically formats your code to maintain consistent style.

**Configuration**: `.prettierrc`
**Scripts**:

- `pnpm format` - Format all files
- `pnpm format:check` - Check formatting without changing files

**Settings**:

- 2 spaces for indentation
- 80 character line width
- Single quotes
- Semicolons required
- Trailing commas for cleaner diffs

### TypeScript

TypeScript provides type safety and catches errors at compile time.

**Scripts**:

- `pnpm type-check` - Run TypeScript type checking
- `pnpm build` - Includes type checking as part of the build process

**Configuration**: `tsconfig.json`

### Husky (Pre-commit Hooks)

Husky automatically runs quality checks before every commit.

**Configuration**: `.husky/pre-commit`
**What it runs**:

```bash
pnpm format:check && pnpm lint:ci && pnpm type-check
```

**If any check fails, the commit is blocked.**

## Development Workflow

### 1. Setup

```bash
pnpm install
```

### 2. Development

```bash
pnpm dev
```

### 3. Quality Checks (Required Before Commits)

**🚨 IMPORTANT: These checks are enforced by Husky and CI/CD**

```bash
# Comprehensive check - runs all quality gates
pnpm build

# Individual checks:
pnpm format:check    # Check formatting
pnpm lint:ci         # Strict linting (fails on warnings)
pnpm type-check      # TypeScript validation
```

### 4. Fixing Issues

```bash
# Fix formatting
pnpm format

# Fix auto-fixable lint issues
pnpm lint:fix

# For TypeScript errors, fix manually in your editor
```

### 5. Pre-commit (Automatic)

Husky automatically runs quality checks on every commit:

```bash
git add .
git commit -m "your message"
# Husky runs: format:check + lint:ci + type-check
# If any fail, commit is blocked
```

## Quality Gates

This project enforces strict quality standards at multiple levels:

### 🛡️ Local Enforcement (Husky)

- **Pre-commit hooks** block commits with quality issues
- **Zero tolerance** for formatting, lint warnings, or type errors
- **Automatic enforcement** - no manual steps required

### 🚀 CI/CD Enforcement (GitHub Actions)

- **Every push/PR** triggers full quality pipeline
- **All checks must pass** before merging
- **Vercel deployments** only succeed after CI passes

### 📋 Quality Checklist

Before any code can be committed or deployed:

- [ ] **Prettier formatting** - Code matches project standards
- [ ] **ESLint checks** - Zero warnings (`--max-warnings=0`)
- [ ] **TypeScript validation** - All types are valid
- [ ] **Build process** - Project builds successfully

## Editor Integration

### VS Code (Recommended)

Install these extensions for the best experience:

- **ESLint** - Real-time linting feedback
- **Prettier - Code formatter** - Auto-formatting
- **TypeScript Importer** - Better import management
- **EditorConfig for VS Code** - Consistent editor settings

**VS Code Settings** (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

### Other Editors

Most editors support ESLint and Prettier through plugins. Check your editor's marketplace for:

- ESLint integration
- Prettier integration
- TypeScript support
- EditorConfig support

## Why This Strict Setup?

1. **Consistency**: All contributors write code in the same style
2. **Quality**: Zero warnings means higher code quality
3. **Automation**: Tools handle formatting, you focus on logic
4. **Professional**: Industry-standard tools used by major projects
5. **Reliability**: Automated enforcement prevents human error
6. **CI/CD Safety**: Vercel deployments only succeed with quality code

## Troubleshooting

### Common Issues

**"Husky pre-commit hook failed"**

```bash
# See what's failing
pnpm build

# Fix formatting
pnpm format

# Fix lint issues
pnpm lint:fix

# Fix type issues manually
```

**"ESLint warnings blocking commit"**

- The project uses `--max-warnings=0` (zero tolerance)
- Fix all warnings before committing
- Use `pnpm lint:ci` to see what will fail in CI

**"TypeScript errors"**

- Check your editor for TypeScript errors
- Run `pnpm type-check` to see all issues
- Fix type issues before committing

**"Build fails locally"**

- Ensure Node.js 20+ and pnpm 10.15.0+
- Try `pnpm install --force`
- Check for TypeScript or lint errors

### Getting Help

1. **Check the error messages** - they usually tell you exactly what's wrong
2. **Run `pnpm build`** - comprehensive check shows all issues
3. **Check existing issues** - common problems are documented
4. **Open a new issue** - if you're stuck, we're here to help!

## Best Practices

### For Contributors

1. **Always run `pnpm build` before committing**
2. **Fix warnings, don't ignore them**
3. **Use TypeScript types properly**
4. **Let Prettier handle formatting**

### For Maintainers

1. **Keep quality gates strict**
2. **Update dependencies regularly**
3. **Monitor CI/CD pipeline health**
4. **Help contributors with quality issues**

---

**Remember: The quality gates are there to help everyone write better code. They ensure consistency and reliability across the entire project!**
