# 中国滑雪赛事积分系统 - 完整URL目录

## 🌐 网站基础URL
- **生产环境**: https://gaohao10010111-sketch.github.io/ski/
- **备用地址**: https://guangyikeji.github.io/ski/

---

## 📋 完整页面URL列表

### 🏠 公开页面 (所有用户可访问)

#### 主要页面
- **首页**: `/`
- **关于平台**: `/about`
- **四大积分系统**: `/scoring-systems`

#### 积分系统 (公开部分)
- **积分排行榜**: `/points/rankings`
- **积分变化趋势**: `/points/trends`
- **中国积分查询**: `/points/fis`

#### 规则文档 (公开)
- **中国积分规则**: `/rules/points`
- **竞赛规则**: `/rules/competition`
- **技术规范**: `/rules/technical`
- **中英对照**: `/rules/bilingual`

#### 赛事信息 (公开部分)
- **赛事日程**: `/competitions/schedule`

#### 用户系统
- **登录页面**: `/login`
- **注册页面**: `/register`
- **忘记密码**: `/forgot-password`

---

### 🔒 DEBUG模式 - 扩展公开访问

> **注意**: 当前为DEBUG模式，未登录用户也可访问以下页面用于测试

#### 积分功能 (DEBUG开放)
- **积分计算器**: `/points/calculator`
- **我的积分**: `/points/my-points`
- **积分分析**: `/points/analysis`

#### 赛事功能 (DEBUG开放)
- **比赛列表**: `/competitions`
- **比赛详情**: `/competitions/[id]`
- **在线报名**: `/registration`
- **报名管理**: `/registration/manage`
- **资格审查**: `/registration/verification`
- **费用管理**: `/registration/fees`

#### 运动员管理 (DEBUG开放)
- **运动员档案**: `/athletes`
- **成绩历史**: `/athletes/history`
- **积分排名**: `/athletes/rankings`
- **成绩统计**: `/athletes/stats`

---

### 👤 会员页面 (需要登录)

#### 个人中心
- **个人档案**: `/profile`
- **编辑资料**: `/profile/edit`
- **修改密码**: `/profile/password`
- **账户设置**: `/profile/settings`

#### 高级功能
- **数据分析**: `/competitions/stats`
- **个人报告**: `/reports/personal`
- **训练记录**: `/training/records`

---

### 🛠️ 管理员页面 (仅管理员访问)

#### 后台管理
- **管理后台首页**: `/admin`
- **数据仪表板**: `/admin/dashboard`
- **用户管理**: `/admin/users`
- **权限管理**: `/admin/permissions`
- **系统配置**: `/admin/settings`

#### 数据管理
- **成绩导入**: `/results-import`
- **成绩发布**: `/results-announcement`
- **赛事管理**: `/competitions/manage`
- **积分计算**: `/points/calculation`

#### 内容管理
- **新闻管理**: `/admin/news`
- **规则管理**: `/admin/rules`
- **内容管理**: `/admin/content`
- **反馈管理**: `/admin/feedback`

---

### 🔧 系统页面

#### 错误页面
- **页面未找到**: `/404`
- **权限不足**: `/403`
- **服务器错误**: `/500`
- **系统维护**: `/maintenance`

#### 法律页面
- **服务条款**: `/terms`
- **隐私政策**: `/privacy`
- **帮助中心**: `/help`

---

## 🧪 快速测试链接

### 完整URL测试列表 (复制粘贴即可测试)

```
# 基础页面
https://gaohao10010111-sketch.github.io/ski/
https://gaohao10010111-sketch.github.io/ski/about
https://gaohao10010111-sketch.github.io/ski/scoring-systems

# 积分系统
https://gaohao10010111-sketch.github.io/ski/points/rankings
https://gaohao10010111-sketch.github.io/ski/points/trends
https://gaohao10010111-sketch.github.io/ski/points/fis
https://gaohao10010111-sketch.github.io/ski/points/calculator

# 运动员管理
https://gaohao10010111-sketch.github.io/ski/athletes
https://gaohao10010111-sketch.github.io/ski/athletes/history
https://gaohao10010111-sketch.github.io/ski/athletes/rankings
https://gaohao10010111-sketch.github.io/ski/athletes/stats

# 赛事管理
https://gaohao10010111-sketch.github.io/ski/competitions
https://gaohao10010111-sketch.github.io/ski/competitions/schedule
https://gaohao10010111-sketch.github.io/ski/registration

# 规则文档
https://gaohao10010111-sketch.github.io/ski/rules/points
https://gaohao10010111-sketch.github.io/ski/rules/competition
https://gaohao10010111-sketch.github.io/ski/rules/technical
https://gaohao10010111-sketch.github.io/ski/rules/bilingual

# 用户系统
https://gaohao10010111-sketch.github.io/ski/login
https://gaohao10010111-sketch.github.io/ski/register
https://gaohao10010111-sketch.github.io/ski/profile
```

---

## 📊 页面状态说明

### 页面状态图例
- ✅ **已实现**: 页面完整可用
- 🚧 **开发中**: 基础框架完成，功能待完善
- ❌ **未实现**: 仅导航链接，页面内容待开发

### 当前实现状态

#### ✅ 完全实现的页面
```
/ (首页)
/points/rankings (积分排行榜)
/points/trends (积分变化趋势)
/points/fis (中国积分查询)
/athletes (运动员档案)
/login (登录页面)
/register (注册页面)
```

#### 🚧 部分实现的页面
```
/about (关于页面 - 基础框架)
/scoring-systems (积分系统介绍)
/competitions (比赛列表)
/registration (报名系统)
/profile (个人中心)
```

#### ❌ 待开发的页面
```
/rules/* (规则文档页面)
/admin/* (管理后台页面)
/competitions/stats (数据分析)
/results-import (成绩导入)
```

---

## 🔍 导航结构图

```
中国滑雪赛事积分系统
├── 首页 (/)
├── 积分系统
│   ├── 四大积分系统 (/scoring-systems)
│   ├── 中国积分查询 (/points/fis)
│   ├── 积分计算器 (/points/calculator)
│   ├── 积分排行榜 (/points/rankings)
│   └── 积分变化趋势 (/points/trends)
├── 赛事管理
│   ├── 赛事日程 (/competitions/schedule)
│   ├── 比赛列表 (/competitions)
│   ├── 成绩导入 (/results-import)
│   ├── 成绩公布 (/results-announcement)
│   └── 数据分析 (/competitions/stats)
├── 运动员管理
│   ├── 运动员档案 (/athletes)
│   ├── 成绩历史 (/athletes/history)
│   └── 成绩统计 (/athletes/stats)
├── 报名系统
│   ├── 在线报名 (/registration)
│   ├── 报名管理 (/registration/manage)
│   ├── 资格审查 (/registration/verification)
│   └── 费用管理 (/registration/fees)
├── 规则文档
│   ├── 中国积分规则 (/rules/points)
│   ├── 竞赛规则 (/rules/competition)
│   ├── 技术规范 (/rules/technical)
│   └── 中英对照 (/rules/bilingual)
├── 登录 (/login)
└── 注册 (/register)
```

---

## 📞 测试说明

### DEBUG模式特点
1. **权限全开**: 未登录用户可访问大部分页面
2. **功能测试**: 便于测试各个功能模块
3. **导航显示**: 所有菜单项均可见
4. **错误提示**: 功能性错误会有友好提示

### 生产模式差异
1. **严格权限**: 按角色严格控制页面访问
2. **登录要求**: 会员功能需要登录
3. **菜单过滤**: 根据权限动态显示菜单
4. **安全验证**: 前后端双重权限验证

---

*最后更新: 2024年12月15日*
*当前模式: DEBUG (开发调试)*