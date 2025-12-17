import type { Metadata, Viewport } from 'next'
import './globals.css'
import WhatsAppChatbot from '@/components/WhatsAppChatbot'
import { Toaster } from '@/components/ui/sonner'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://opyrainfotech.com'),
  title: 'Opyra Infotech - Digital Agency',
  description: 'Digital Agency That Thrives on Your Success. We help you create a remarkable presence online.',
  keywords: 'digital agency, web design, web development, digital marketing, SEO, Los Angeles',
  authors: [{ name: 'Opyra Infotech' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Opyrainfotech',
    startupImage: ['/images/MainLogo.jpg'],
  },
  icons: {
    icon: '/images/MainLogo.jpg',
    shortcut: '/images/MainLogo.jpg',
    apple: '/images/MainLogo.jpg',
  },
  openGraph: {
    title: 'Opyra Infotech - Digital Agency',
    description: 'Digital Agency That Thrives on Your Success. We help you create a remarkable presence online.',
    url: '/',
    siteName: 'Opyra Infotech',
    images: ['/images/MainLogo.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Opyra Infotech - Digital Agency',
    description: 'Digital Agency That Thrives on Your Success. We help you create a remarkable presence online.',
    images: ['/images/MainLogo.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="google-site-verification" content="hVqshwlmr2wPLeKxrPBLsvbPdrlqGIyZ6QbGiXybRtk" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          expand={false}
        />
        <WhatsAppChatbot />
      </body>
    </html>
  )
}