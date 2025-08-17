import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TestSentry - Test Your Designs Across Devices",
  description: "A dev tool to preview websites and web applications across various screen sizes and devices.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <script
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
  )
}
