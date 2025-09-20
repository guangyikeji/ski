import Link from 'next/link'
import { Mountain, Github, Mail, Phone, Lock } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Resource, Action } from '@/types/auth'

export default function Footer() {
  const { hasPermission, isAuthenticated } = useAuth()
  return (
    <footer className="bg-ski-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Mountain className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">Alpine Ski Points</span>
            </div>
            <p className="text-gray-300 text-sm max-w-md">
              参照国际雪联(FIS)积分体系的中国高山滑雪竞赛数据管理和积分计算系统，
              为中国滑雪运动提供专业的数据分析和管理服务。
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

          {/* 积分系统 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">积分系统</h3>
            <ul className="space-y-2 text-sm">
              {hasPermission(Resource.POINTS_QUERY, Action.READ) ? (
                <li>
                  <Link href="/points/fis" className="text-gray-300 hover:text-primary-400 transition-colors">
                    中国积分查询
                  </Link>
                </li>
              ) : (
                <li className="flex items-center text-gray-500">
                  <Lock className="h-3 w-3 mr-2" />
                  <span>中国积分查询 (需要登录)</span>
                </li>
              )}

              {hasPermission(Resource.POINTS_RANKING, Action.READ) ? (
                <li>
                  <Link href="/points/rankings" className="text-gray-300 hover:text-primary-400 transition-colors">
                    积分排行榜
                  </Link>
                </li>
              ) : (
                <li className="flex items-center text-gray-500">
                  <Lock className="h-3 w-3 mr-2" />
                  <span>积分排行榜 (需要登录)</span>
                </li>
              )}

              {hasPermission(Resource.POINTS_CALCULATOR, Action.READ) ? (
                <li>
                  <Link href="/points/calculator" className="text-gray-300 hover:text-primary-400 transition-colors">
                    积分计算器
                  </Link>
                </li>
              ) : (
                <li className="flex items-center text-gray-500">
                  <Lock className="h-3 w-3 mr-2" />
                  <span>积分计算器 (需要登录)</span>
                </li>
              )}

              {hasPermission(Resource.POINTS_TRENDS, Action.READ) ? (
                <li>
                  <Link href="/points/trends" className="text-gray-300 hover:text-primary-400 transition-colors">
                    积分变化趋势
                  </Link>
                </li>
              ) : (
                <li className="flex items-center text-gray-500">
                  <Lock className="h-3 w-3 mr-2" />
                  <span>积分变化趋势 (需要登录)</span>
                </li>
              )}

              {hasPermission(Resource.RULES_POINTS, Action.READ) ? (
                <li>
                  <Link href="/rules/points" className="text-gray-300 hover:text-primary-400 transition-colors">
                    积分规则详解
                  </Link>
                </li>
              ) : (
                <li className="flex items-center text-gray-500">
                  <Lock className="h-3 w-3 mr-2" />
                  <span>积分规则详解 (需要登录)</span>
                </li>
              )}
            </ul>
          </div>

          {/* 赛事管理 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">赛事管理</h3>
            <ul className="space-y-2 text-sm">
              {hasPermission(Resource.COMPETITIONS, Action.READ) ? (
                <li>
                  <Link href="/competitions" className="text-gray-300 hover:text-primary-400 transition-colors">
                    比赛列表
                  </Link>
                </li>
              ) : (
                <li className="flex items-center text-gray-500">
                  <Lock className="h-3 w-3 mr-2" />
                  <span>比赛列表 (需要登录)</span>
                </li>
              )}

              {hasPermission(Resource.COMPETITIONS_SCHEDULE, Action.READ) ? (
                <li>
                  <Link href="/competitions/schedule" className="text-gray-300 hover:text-primary-400 transition-colors">
                    赛事日程
                  </Link>
                </li>
              ) : (
                <li className="flex items-center text-gray-500">
                  <Lock className="h-3 w-3 mr-2" />
                  <span>赛事日程 (需要登录)</span>
                </li>
              )}

              {hasPermission(Resource.RESULTS_IMPORT, Action.READ) ? (
                <li>
                  <Link href="/results-import" className="text-gray-300 hover:text-primary-400 transition-colors">
                    成绩导入
                  </Link>
                </li>
              ) : (
                <li className="flex items-center text-gray-500">
                  <Lock className="h-3 w-3 mr-2" />
                  <span>成绩导入 (管理员功能)</span>
                </li>
              )}

              {hasPermission(Resource.RESULTS_ANNOUNCEMENT, Action.READ) ? (
                <li>
                  <Link href="/results-announcement" className="text-gray-300 hover:text-primary-400 transition-colors">
                    成绩公布
                  </Link>
                </li>
              ) : (
                <li className="flex items-center text-gray-500">
                  <Lock className="h-3 w-3 mr-2" />
                  <span>成绩公布 (管理员功能)</span>
                </li>
              )}

              {hasPermission(Resource.REGISTRATION, Action.READ) ? (
                <li>
                  <Link href="/registration" className="text-gray-300 hover:text-primary-400 transition-colors">
                    在线报名
                  </Link>
                </li>
              ) : (
                <li className="flex items-center text-gray-500">
                  <Lock className="h-3 w-3 mr-2" />
                  <span>在线报名 (需要登录)</span>
                </li>
              )}
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