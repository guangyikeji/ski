import './globals.css'
import type { Metadata } from 'next'

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
      <body>{children}</body>
    </html>
  )
}