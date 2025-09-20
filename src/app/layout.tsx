import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '中国高山滑雪积分管理平台 | Alpine Ski Points',
  description: '专业的滑雪竞赛数据管理平台，采用国际标准积分算法，为中国滑雪运动提供完整解决方案',
  keywords: ['高山滑雪', '滑雪积分', '滑雪竞赛', '积分计算', '滑雪管理', '中国滑雪'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}