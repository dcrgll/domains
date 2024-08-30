import type { Metadata, Viewport } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import './globals.css'

import { GoogleAnalytics } from '@next/third-parties/google'
import { ThemeProvider } from 'next-themes'

import { env } from '@/env'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'
import Header from '@/components/header'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    template: '%s | dan cargill',
    default: site.title
  },
  description: site.description,
  twitter: {
    card: 'summary_large_image'
  },
  openGraph: {
    url: site.url,
    title: site.title,
    description: site.description
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'max-w-dvw min-h-dvh font-sans antialiased',
          'font-sans',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={env.GOOGLE_ANALYTICS_ID!} />
    </html>
  )
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
}
