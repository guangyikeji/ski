import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Alpine Skiing China | 中国高山滑雪积分管理平台',
  description: '基于中国积分体系标准的专业滑雪竞赛数据管理平台，为中国高山滑雪运动提供权威积分计算、成绩管理、赛事组织等一站式解决方案',
  keywords: ['高山滑雪', 'Alpine Skiing', '中国积分', '滑雪竞赛', '积分计算', '滑雪管理', '中国滑雪', '中国滑雪协会', '赛事管理', '运动员积分'],
  authors: [{ name: 'Alpine Skiing China' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Alpine Skiing China | 中国高山滑雪积分管理平台',
    description: '基于中国积分体系标准的专业滑雪竞赛数据管理平台',
    type: 'website',
    locale: 'zh_CN',
    siteName: 'Alpine Skiing China'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alpine Skiing China | 中国高山滑雪积分管理平台',
    description: '基于中国积分体系标准的专业滑雪竞赛数据管理平台'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="canonical" href="https://guangyikeji.github.io/ski/" />
        <link rel="alternate" hrefLang="zh-CN" href="https://guangyikeji.github.io/ski/" />
        <link rel="alternate" hrefLang="en" href="https://guangyikeji.github.io/ski/en/" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta property="og:site_name" content="Alpine Skiing China" />
        <meta name="twitter:site" content="@AlpineSkiChina" />
        <meta name="google-site-verification" content="" />
        <meta name="baidu-site-verification" content="" />
      </head>
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
        <StructuredData type="sportsOrganization" />
        <SpeedInsights />
      </body>
    </html>
  )
}