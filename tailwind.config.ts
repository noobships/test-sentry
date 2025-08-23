import type { Config } from 'tailwindcss';

const config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
} satisfies Config;

export default config;
