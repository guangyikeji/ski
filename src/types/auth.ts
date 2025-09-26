// 用户角色定义
export enum UserRole {
  PUBLIC = 'public',       // 公众用户（未登录）
  ATHLETE = 'athlete',     // 运动员
  COACH = 'coach',         // 教练
  ADMIN = 'admin'          // 系统管理员
}

// 用户状态
export enum UserStatus {
  ACTIVE = 'active',       // 激活
  INACTIVE = 'inactive',   // 非激活
  PENDING = 'pending'      // 待审核
}

// 权限资源
export enum Resource {
  // 公众资源 (未登录可访问)
  HOME = 'home',
  ABOUT = 'about',
  NEWS = 'news',
  CONTACT = 'contact',

  // 会员专享资源 (需要登录)
  PROFILE = 'profile',
  MY_POINTS = 'my_points',
  POINTS_QUERY = 'points_query',
  POINTS_RANKING = 'points_ranking',
  POINTS_CALCULATOR = 'points_calculator',
  POINTS_TRENDS = 'points_trends',
  RULES_POINTS = 'rules_points',

  // 赛事管理 (需要登录)
  COMPETITIONS = 'competitions',
  COMPETITIONS_SCHEDULE = 'competitions_schedule',
  RESULTS_IMPORT = 'results_import',
  RESULTS_ANNOUNCEMENT = 'results_announcement',
  REGISTRATION = 'registration',

  // 会员功能
  EVENTS = 'events',

  // 管理员专享资源
  ADMIN_DASHBOARD = 'admin_dashboard',
  POINTS_CALCULATION = 'points_calculation',
  USER_MANAGEMENT = 'user_management',
  STATISTICS = 'statistics',
  SYSTEM_CONFIG = 'system_config'
}

// 操作类型
export enum Action {
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete',
  UPDATE = 'update'
}

// 用户信息接口
export interface User {
  id: string
  username: string
  email: string
  role: UserRole
  status: UserStatus
  athleteId?: string       // 运动员ID（如果是运动员）
  coachId?: string         // 教练ID（如果是教练）
  createdAt: Date
  lastLoginAt?: Date
}

// 权限检查接口
export interface Permission {
  role: UserRole
  resource: Resource
  action: Action
  allowed: boolean
}

// 认证上下文状态
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// 登录请求
export interface LoginRequest {
  email: string
  password: string
}

// 注册请求
export interface RegisterRequest {
  username: string
  email: string
  password: string
  confirmPassword: string
  userType: 'athlete' | 'coach'
  realName: string
  phone?: string
}