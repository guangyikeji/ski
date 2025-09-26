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
  title: '中国滑雪赛事积分系统 | China Skiing Competition Points System',
  description: '国家体育总局冬季运动管理中心认证的专业滑雪竞赛数据管理平台，涵盖高山滑雪、自由式滑雪、单板滑雪全项目积分计算、成绩管理、赛事组织等一站式解决方案',
  keywords: ['滑雪赛事', '积分系统', '高山滑雪', '自由式滑雪', '单板滑雪', '中国积分', '滑雪竞赛', '积分计算', '赛事管理', 'U系列', '大跳台', '坡面障碍技巧', '中国滑雪协会'],
  authors: [{ name: '中国滑雪赛事积分系统' }],
  robots: 'index, follow',
  openGraph: {
    title: '中国滑雪赛事积分系统 | China Skiing Competition Points System',
    description: '国家体育总局冬季运动管理中心认证的专业滑雪竞赛数据管理平台',
    type: 'website',
    locale: 'zh_CN',
    siteName: '中国滑雪赛事积分系统'
  },
  twitter: {
    card: 'summary_large_image',
    title: '中国滑雪赛事积分系统 | China Skiing Competition Points System',
    description: '国家体育总局冬季运动管理中心认证的专业滑雪竞赛数据管理平台'
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