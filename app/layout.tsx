import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '⛡ TestSentry - Open Source Testing Agent',
  description:
    'A simple, powerful cross-device testing tool for web developers. Test any website across multiple devices simultaneously with AI-powered automation planned.',
  generator: 'v0.dev',
  openGraph: {
    title: '⛡ TestSentry - Open Source Testing Agent',
    description:
      'A simple, powerful cross-device testing tool for web developers. Test any website across multiple devices simultaneously with AI-powered automation planned.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'TestSentry - Open Source Testing Agent',
      },
    ],
    type: 'website',
    siteName: 'TestSentry',
  },
  twitter: {
    card: 'summary_large_image',
    title: '⛡ TestSentry - Open Source Testing Agent',
    description:
      'A simple, powerful cross-device testing tool for web developers. Test any website across multiple devices simultaneously with AI-powered automation planned.',
    images: ['/og-default.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body className={inter.className}>
        <Suspense fallback={null}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Suspense>
        <Analytics />

        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "swvylq767d");
            `,
          }}
        />

        <Script
          id="theme-color-script"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function updateThemeColor() {
                  const isDark = document.documentElement.classList.contains('dark');
                  const themeColorMeta = document.querySelector('meta[name="theme-color"]:not([media])');
                  if (themeColorMeta) {
                    themeColorMeta.setAttribute('content', isDark ? '#000000' : '#ffffff');
                  }
                }
                
                // Update on initial load
                updateThemeColor();
                
                // Watch for theme changes
                const observer = new MutationObserver(updateThemeColor);
                observer.observe(document.documentElement, {
                  attributes: true,
                  attributeFilter: ['class']
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
