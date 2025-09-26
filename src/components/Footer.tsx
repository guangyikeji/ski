'use client'

import Link from 'next/link'
import { Mountain, Github, Mail, Phone, Lock } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Resource, Action } from '@/types/auth'
import { useState, useEffect } from 'react'

export default function Footer() {
  const { hasPermission, isAuthenticated } = useAuth()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <footer className="bg-ski-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Mountain className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">中国滑雪赛事积分系统</span>
            </div>
            <p className="text-gray-300 text-sm max-w-2xl leading-relaxed">
              国家体育总局冬季运动管理中心认证的专业滑雪竞赛数据管理平台，涵盖高山滑雪、自由式滑雪、单板滑雪全项目积分计算、成绩管理、赛事组织等一站式解决方案，
              致力于推动中国滑雪运动的数字化、标准化发展。
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
              {isClient && hasPermission(Resource.POINTS_QUERY, Action.READ) ? (
                <li>
                  <Link href="/points/fis" className="text-gray-300 hover:text-primary-400 transition-colors">
                    中国积分查询
                  </Link>
                </li>
              ) : null}

              {isClient && hasPermission(Resource.POINTS_RANKING, Action.READ) ? (
                <li>
                  <Link href="/points/rankings" className="text-gray-300 hover:text-primary-400 transition-colors">
                    积分排行榜
                  </Link>
                </li>
              ) : null}

              {isClient && hasPermission(Resource.POINTS_CALCULATOR, Action.READ) ? (
                <li>
                  <Link href="/points/calculator" className="text-gray-300 hover:text-primary-400 transition-colors">
                    积分计算器
                  </Link>
                </li>
              ) : null}

              {isClient && hasPermission(Resource.POINTS_TRENDS, Action.READ) ? (
                <li>
                  <Link href="/points/trends" className="text-gray-300 hover:text-primary-400 transition-colors">
                    积分变化趋势
                  </Link>
                </li>
              ) : null}

              {isClient && hasPermission(Resource.RULES_POINTS, Action.READ) ? (
                <li>
                  <Link href="/rules/points" className="text-gray-300 hover:text-primary-400 transition-colors">
                    积分规则详解
                  </Link>
                </li>
              ) : null}

              {/* 未登录用户看到引导 */}
              {isClient && !isAuthenticated && (
                <li className="pt-2 border-t border-gray-600">
                  <Link href="/login" className="text-sky-400 hover:text-sky-300 transition-colors text-sm">
                    登录查看更多功能 →
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* 赛事管理 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">赛事管理</h3>
            <ul className="space-y-2 text-sm">
              {isClient && hasPermission(Resource.COMPETITIONS, Action.READ) ? (
                <li>
                  <Link href="/competitions" className="text-gray-300 hover:text-primary-400 transition-colors">
                    比赛列表
                  </Link>
                </li>
              ) : null}

              {isClient && hasPermission(Resource.COMPETITIONS_SCHEDULE, Action.READ) ? (
                <li>
                  <Link href="/competitions/schedule" className="text-gray-300 hover:text-primary-400 transition-colors">
                    赛事日程
                  </Link>
                </li>
              ) : null}

              {isClient && hasPermission(Resource.REGISTRATION, Action.READ) ? (
                <li>
                  <Link href="/registration" className="text-gray-300 hover:text-primary-400 transition-colors">
                    在线报名
                  </Link>
                </li>
              ) : null}

              {/* 管理员功能 */}
              {isClient && hasPermission(Resource.RESULTS_IMPORT, Action.READ) ? (
                <li>
                  <Link href="/results-import" className="text-gray-300 hover:text-primary-400 transition-colors">
                    成绩导入
                  </Link>
                </li>
              ) : null}

              {isClient && hasPermission(Resource.RESULTS_ANNOUNCEMENT, Action.READ) ? (
                <li>
                  <Link href="/results-announcement" className="text-gray-300 hover:text-primary-400 transition-colors">
                    成绩公布
                  </Link>
                </li>
              ) : null}

              {/* 未登录用户看到引导 */}
              {isClient && !isAuthenticated && (
                <li className="pt-2 border-t border-gray-600">
                  <Link href="/register" className="text-sky-400 hover:text-sky-300 transition-colors text-sm">
                    注册参与赛事 →
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="text-sm text-gray-300 mb-4 md:mb-0">
              © 2024 中国滑雪赛事积分系统. 基于国家体育总局冬季运动管理中心标准开发.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                隐私政策
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                使用条款
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                技术规范
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                联系我们
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}