import './globals.css'
import type { Metadata } from 'next'
import { ClientProviders } from '@/components/ClientProviders'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: {
    default: '中国滑雪赛事积分系统 - 专业权威的滑雪竞赛管理平台',
    template: '%s | 中国滑雪赛事积分系统'
  },
  description: '中国官方认证的滑雪赛事积分管理平台，支持高山滑雪、自由式滑雪、单板滑雪等项目的积分计算、赛事管理、运动员档案管理。基于国家体育总局标准，提供准确的积分计算和排名服务。',
  keywords: [
    '中国滑雪积分系统',
    '高山滑雪积分',
    '自由式滑雪',
    '单板滑雪',
    '滑雪竞赛管理',
    '积分计算',
    '运动员管理',
    '赛事管理',
    '中国滑雪协会',
    '滑雪积分排名'
  ],
  authors: [{ name: '中国滑雪协会' }],
  creator: '中国滑雪协会',
  publisher: '中国滑雪协会',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://gaohao10010111-sketch.github.io/ski/',
    siteName: '中国滑雪赛事积分系统',
    title: '中国滑雪赛事积分系统 - 专业权威的滑雪竞赛管理平台',
    description: '中国官方认证的滑雪赛事积分管理平台，支持高山滑雪、自由式滑雪、单板滑雪等项目的积分计算、赛事管理、运动员档案管理。',
    images: [
      {
        url: '/images/ski-bg.jpg',
        width: 1200,
        height: 630,
        alt: '中国滑雪赛事积分系统',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '中国滑雪赛事积分系统',
    description: '中国官方认证的滑雪赛事积分管理平台',
    images: ['/images/ski-bg.jpg'],
  },
  alternates: {
    canonical: 'https://gaohao10010111-sketch.github.io/ski/',
  },
  verification: {
    google: 'your-google-verification-code',
    baidu: 'your-baidu-verification-code',
  },
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