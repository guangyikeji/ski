import Link from 'next/link'
import { Mountain, Github, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ski-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Mountain className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">Alpine Ski Points</span>
            </div>
            <p className="text-gray-300 text-sm max-w-md">
              基于中国滑雪协会(FIS)规则的高山滑雪竞赛数据管理和积分计算系统，
              为滑雪运动提供专业的数据分析和管理服务。
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="mailto:contact@alpine-ski-points.com"
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="tel:+86-400-123-4567"
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/alpine-ski-points"
                className="text-gray-300 hover:text-primary-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/points/fis" className="text-gray-300 hover:text-primary-400 transition-colors">
                  中国积分查询
                </Link>
              </li>
              <li>
                <Link href="/rules/fis" className="text-gray-300 hover:text-primary-400 transition-colors">
                  FIS规则
                </Link>
              </li>
              <li>
                <Link href="/rules/points" className="text-gray-300 hover:text-primary-400 transition-colors">
                  积分规则
                </Link>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">竞赛管理 (即将上线)</span>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">报名系统 (即将上线)</span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">技术支持</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  使用指南
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  API文档
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  常见问题
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  联系我们
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-300">
            © 2024 Alpine Ski Points. 基于 FIS 规则开发.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
              隐私政策
            </a>
            <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
              使用条款
            </a>
            <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
              Cookie政策
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}