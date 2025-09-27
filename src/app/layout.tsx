import './globals.css'
import type { Metadata } from 'next'
import { ClientProviders } from '@/components/ClientProviders'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: '中国滑雪赛事积分系统',
  description: '中国滑雪赛事积分管理平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <StructuredData />
      </head>
      <body>
        <ClientProviders>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  )
}