# Development Guide

This document explains the development setup and code quality tools used in TestSentry.

## Code Quality Tools

### ESLint

ESLint is configured to catch code quality issues and enforce best practices.

**Configuration**: `.eslintrc.json`
**Scripts**:

- `pnpm lint` - Check for linting issues
- `pnpm lint:fix` - Automatically fix linting issues

**Rules**:

- Extends Next.js recommended rules
- Enforces `prefer-const` and `no-var`
- Warns about unused variables

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

### EditorConfig

EditorConfig ensures consistent coding styles across different editors.

**Configuration**: `.editorconfig`
**Features**:

- UTF-8 encoding
- Unix line endings (LF)
- Consistent indentation
- Trailing whitespace removal

## Development Workflow

### 1. Setup

```bash
pnpm install
```

### 2. Development

```bash
pnpm dev
```

### 3. Code Quality Checks

```bash
# Check linting
pnpm lint

# Check formatting
pnpm format:check

# Fix linting issues
pnpm lint:fix

# Fix formatting issues
pnpm format
```

### 4. Pre-commit (Recommended)

Consider setting up pre-commit hooks to automatically run these checks:

```bash
# Install husky and lint-staged
pnpm add -D husky lint-staged

# Setup pre-commit hook
npx husky install
npx husky add .husky/pre-commit "pnpm lint-staged"

# Add to package.json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

## Editor Integration

### VS Code

Install these extensions for the best experience:

- ESLint
- Prettier - Code formatter
- EditorConfig for VS Code

### Other Editors

Most editors support ESLint and Prettier through plugins. Check your editor's marketplace for:

- ESLint integration
- Prettier integration
- EditorConfig support

## Why This Setup?

1. **Consistency**: All contributors write code in the same style
2. **Quality**: ESLint catches common bugs and enforces best practices
3. **Automation**: Prettier handles formatting, so you focus on logic
4. **Professional**: Industry-standard tools used by major open source projects
5. **Minimal**: Simple configuration that works out of the box

## Troubleshooting

### ESLint Errors

- Run `pnpm lint:fix` to auto-fix issues
- Check the ESLint documentation for rule explanations
- Some rules can be disabled if needed (but prefer fixing the issue)

### Prettier Issues

- Run `pnpm format` to fix formatting
- Check `.prettierignore` if certain files shouldn't be formatted
- Prettier is opinionated - it's designed to eliminate formatting debates

### Editor Issues

- Ensure you have the right extensions installed
- Restart your editor after installing extensions
- Check that your editor is using the project's ESLint/Prettier configs
