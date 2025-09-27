'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { User, UserRole, UserStatus, AuthState, LoginRequest, RegisterRequest, Resource, Action } from '@/types/auth'

// 权限规则配置 - 中国高山滑雪积分管理平台
const PERMISSIONS_MAP: Record<UserRole, Record<Resource, Action[]>> = {
  [UserRole.PUBLIC]: {
    // DEBUG模式: 未登录用户可访问所有页面用于调试
    [Resource.HOME]: [Action.READ],
    [Resource.ABOUT]: [Action.READ],
    [Resource.NEWS]: [Action.READ],
    [Resource.CONTACT]: [Action.READ],

    // DEBUG: 开放积分系统功能
    [Resource.PROFILE]: [Action.READ],
    [Resource.MY_POINTS]: [Action.READ],
    [Resource.POINTS_QUERY]: [Action.READ],
    [Resource.POINTS_RANKING]: [Action.READ],
    [Resource.POINTS_CALCULATOR]: [Action.READ],
    [Resource.POINTS_TRENDS]: [Action.READ],
    [Resource.RULES_POINTS]: [Action.READ],

    // DEBUG: 开放赛事功能
    [Resource.COMPETITIONS]: [Action.READ],
    [Resource.COMPETITIONS_SCHEDULE]: [Action.READ],
    [Resource.REGISTRATION]: [Action.READ],
    [Resource.EVENTS]: [Action.READ],

    // DEBUG: 开放运动员管理
    [Resource.USER_MANAGEMENT]: [Action.READ],
    [Resource.STATISTICS]: [Action.READ],
  } as Record<Resource, Action[]>,

  [UserRole.ATHLETE]: {
    // 公众信息
    [Resource.HOME]: [Action.READ],
    [Resource.ABOUT]: [Action.READ],
    [Resource.NEWS]: [Action.READ],
    [Resource.CONTACT]: [Action.READ],

    // 会员专享功能
    [Resource.PROFILE]: [Action.READ, Action.UPDATE],
    [Resource.MY_POINTS]: [Action.READ],
    [Resource.POINTS_QUERY]: [Action.READ],
    [Resource.POINTS_RANKING]: [Action.READ],
    [Resource.POINTS_CALCULATOR]: [Action.READ],
    [Resource.POINTS_TRENDS]: [Action.READ],
    [Resource.RULES_POINTS]: [Action.READ],

    // 赛事功能
    [Resource.COMPETITIONS]: [Action.READ],
    [Resource.COMPETITIONS_SCHEDULE]: [Action.READ],
    [Resource.REGISTRATION]: [Action.READ, Action.WRITE],
    [Resource.EVENTS]: [Action.READ, Action.WRITE],
  } as Record<Resource, Action[]>,

  [UserRole.COACH]: {
    // 公众信息
    [Resource.HOME]: [Action.READ],
    [Resource.ABOUT]: [Action.READ],
    [Resource.NEWS]: [Action.READ],
    [Resource.CONTACT]: [Action.READ],

    // 会员专享功能
    [Resource.PROFILE]: [Action.READ, Action.UPDATE],
    [Resource.MY_POINTS]: [Action.READ],
    [Resource.POINTS_QUERY]: [Action.READ],
    [Resource.POINTS_RANKING]: [Action.READ],
    [Resource.POINTS_CALCULATOR]: [Action.READ],
    [Resource.POINTS_TRENDS]: [Action.READ],
    [Resource.RULES_POINTS]: [Action.READ],

    // 赛事功能 (教练权限更高)
    [Resource.COMPETITIONS]: [Action.READ],
    [Resource.COMPETITIONS_SCHEDULE]: [Action.READ],
    [Resource.REGISTRATION]: [Action.READ, Action.WRITE],
    [Resource.EVENTS]: [Action.READ, Action.WRITE],
  } as Record<Resource, Action[]>,

  [UserRole.ADMIN]: {
    // 公众信息
    [Resource.HOME]: [Action.READ],
    [Resource.ABOUT]: [Action.READ, Action.UPDATE],
    [Resource.NEWS]: [Action.READ, Action.WRITE, Action.UPDATE, Action.DELETE],
    [Resource.CONTACT]: [Action.READ, Action.UPDATE],

    // 会员功能
    [Resource.PROFILE]: [Action.READ, Action.UPDATE],
    [Resource.MY_POINTS]: [Action.READ],
    [Resource.POINTS_QUERY]: [Action.READ],
    [Resource.POINTS_RANKING]: [Action.READ],
    [Resource.POINTS_CALCULATOR]: [Action.READ],
    [Resource.POINTS_TRENDS]: [Action.READ],
    [Resource.RULES_POINTS]: [Action.READ, Action.UPDATE],

    // 赛事管理 (完全权限)
    [Resource.COMPETITIONS]: [Action.READ, Action.WRITE, Action.UPDATE, Action.DELETE],
    [Resource.COMPETITIONS_SCHEDULE]: [Action.READ, Action.WRITE, Action.UPDATE],
    [Resource.RESULTS_IMPORT]: [Action.READ, Action.WRITE],
    [Resource.RESULTS_ANNOUNCEMENT]: [Action.READ, Action.WRITE],
    [Resource.REGISTRATION]: [Action.READ, Action.WRITE, Action.UPDATE, Action.DELETE],
    [Resource.EVENTS]: [Action.READ, Action.WRITE, Action.UPDATE, Action.DELETE],

    // 管理员专享
    [Resource.ADMIN_DASHBOARD]: [Action.READ],
    [Resource.POINTS_CALCULATION]: [Action.READ, Action.WRITE, Action.UPDATE],
    [Resource.USER_MANAGEMENT]: [Action.READ, Action.WRITE, Action.UPDATE, Action.DELETE],
    [Resource.STATISTICS]: [Action.READ],
    [Resource.SYSTEM_CONFIG]: [Action.READ, Action.UPDATE],
  } as Record<Resource, Action[]>
}

// 认证状态管理
type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'CLEAR_ERROR' }

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
  hasPermission: (resource: Resource, action: Action) => boolean
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // 权限检查函数
  const hasPermission = (resource: Resource, action: Action): boolean => {
    if (!state.user) {
      // 未登录用户默认为公众角色
      const publicPermissions = PERMISSIONS_MAP[UserRole.PUBLIC]
      return publicPermissions[resource]?.includes(action) || false
    }

    const userPermissions = PERMISSIONS_MAP[state.user.role]
    return userPermissions[resource]?.includes(action) || false
  }

  // 登录函数
  const login = async (credentials: LoginRequest): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 模拟登录验证 - 4个权限级别测试账号
      if (credentials.email === 'admin@ski.com' && credentials.password === 'admin123') {
        // 管理员账号 - 完整权限
        const user: User = {
          id: '1',
          username: 'admin',
          email: credentials.email,
          role: UserRole.ADMIN,
          status: UserStatus.ACTIVE,
          createdAt: new Date(),
          lastLoginAt: new Date()
        }
        dispatch({ type: 'LOGIN_SUCCESS', payload: user })
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_user', JSON.stringify(user))
        }
      } else if (credentials.email === 'athlete@ski.com' && credentials.password === 'athlete123') {
        // 运动员账号 - 会员基础功能
        const user: User = {
          id: '2',
          username: 'athlete_user',
          email: credentials.email,
          role: UserRole.ATHLETE,
          status: UserStatus.ACTIVE,
          athleteId: 'ATH001',
          createdAt: new Date(),
          lastLoginAt: new Date()
        }
        dispatch({ type: 'LOGIN_SUCCESS', payload: user })
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_user', JSON.stringify(user))
        }
      } else if (credentials.email === 'coach@ski.com' && credentials.password === 'coach123') {
        // 教练账号 - 教练管理功能
        const user: User = {
          id: '3',
          username: 'coach_user',
          email: credentials.email,
          role: UserRole.COACH,
          status: UserStatus.ACTIVE,
          coachId: 'COACH001',
          createdAt: new Date(),
          lastLoginAt: new Date()
        }
        dispatch({ type: 'LOGIN_SUCCESS', payload: user })
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_user', JSON.stringify(user))
        }
      } else {
        throw new Error('邮箱或密码错误，请使用以下测试账号：\n管理员：admin@ski.com / admin123\n运动员：athlete@ski.com / athlete123\n教练：coach@ski.com / coach123')
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error instanceof Error ? error.message : '登录失败' })
    }
  }

  // 注册函数
  const register = async (data: RegisterRequest): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500))

      // 模拟注册成功
      const user: User = {
        id: Date.now().toString(),
        username: data.username,
        email: data.email,
        role: data.userType === 'athlete' ? UserRole.ATHLETE : UserRole.COACH,
        status: UserStatus.PENDING,
        athleteId: data.userType === 'athlete' ? `ATH${Date.now()}` : undefined,
        coachId: data.userType === 'coach' ? `COACH${Date.now()}` : undefined,
        createdAt: new Date()
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: user })
      localStorage.setItem('auth_user', JSON.stringify(user))
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error instanceof Error ? error.message : '注册失败' })
    }
  }

  // 登出函数
  const logout = (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user')
    }
    dispatch({ type: 'LOGOUT' })
  }

  // 清除错误
  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  // 初始化时检查本地存储
  useEffect(() => {
    // 检查是否在浏览器环境
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('auth_user')
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser)
          dispatch({ type: 'LOGIN_SUCCESS', payload: user })
        } catch (error) {
          localStorage.removeItem('auth_user')
        }
      }
    }
  }, [])

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    hasPermission,
    clearError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
