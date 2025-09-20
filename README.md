# Alpine Ski Points - 高山滑雪积分管理系统

基于国际雪联(FIS)规则的高山滑雪竞赛数据管理和积分计算系统。

## 🎿 项目特色

- ✅ **FIS规则兼容**: 100%符合国际雪联积分计算规则
- ✅ **迭代开发**: 先实现核心功能，逐步扩展完整功能
- ✅ **现代界面**: 参考FIS官网设计，简洁专业
- ✅ **响应式设计**: 支持桌面端和移动端访问
- ✅ **TypeScript**: 完整的类型安全保障

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发运行

```bash
npm run dev
```

访问 `http://localhost:3000` 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 📋 功能状态

### ✅ 已实现功能

- **首页**: 项目介绍和功能概览
- **FIS积分查询**: 运动员积分和排名查询
- **规则文档**: FIS规则和积分计算规则详解
- **导航系统**: 完整的多级导航和路由

### 🔄 开发中功能

- **积分计算器**: 在线计算比赛积分
- **积分排行榜**: 实时积分排名展示

### 🕒 待开发功能

- **竞赛管理**: 比赛信息管理、成绩录入
- **运动员管理**: 运动员档案、积分历史
- **报名系统**: 在线报名、费用管理
- **数据分析**: 深度分析和可视化
- **用户认证**: 登录注册、权限管理

## 🏗️ 技术架构

### 前端技术栈

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks (未来可扩展到 Zustand/Redux)

### 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── page.tsx          # 首页
│   ├── points/           # 积分相关页面
│   └── rules/            # 规则相关页面
├── components/           # 可复用组件
│   ├── Navigation.tsx   # 导航组件
│   └── Footer.tsx       # 页脚组件
├── services/            # API服务层 (待开发)
├── utils/              # 工具函数 (待开发)
└── styles/             # 样式文件
```

## 🎨 设计系统

### 配色方案

- **主色**: `#1e3a8a` (ski-blue)
- **深色**: `#0f172a` (ski-navy)
- **浅色**: `#f0f9ff` (ski-ice)
- **背景**: `#fafafa` (ski-snow)

### 组件规范

- **卡片**: `card` 类，统一阴影和圆角
- **按钮**: `btn-primary` / `btn-secondary`
- **导航**: 悬停效果和活动状态
- **徽章**: `badge` 系列，区分功能状态

## 📝 开发规范

### 代码规范

```bash
# 类型检查
npm run typecheck

# 代码规范检查
npm run lint
```

### Git 提交规范

- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 样式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具相关

## 🔄 迭代计划

### Phase 1: 基础框架 ✅
- [x] 项目搭建和技术栈选择
- [x] 基础UI组件和导航
- [x] 首页和规则页面
- [x] FIS积分查询页面

### Phase 2: 积分系统 (进行中)
- [ ] 积分计算引擎
- [ ] 积分计算器页面
- [ ] 积分排行榜
- [ ] 数据模拟和API接口

### Phase 3: 数据管理
- [ ] 竞赛数据管理
- [ ] 运动员信息管理
- [ ] XML数据解析
- [ ] 数据库设计

### Phase 4: 高级功能
- [ ] 用户认证系统
- [ ] 报名功能
- [ ] 数据可视化
- [ ] 移动端优化

### Phase 5: 部署上线
- [ ] 生产环境配置
- [ ] 性能优化
- [ ] SEO优化
- [ ] 监控和日志

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支: `git checkout -b feature/new-feature`
3. 提交改动: `git commit -am 'Add new feature'`
4. 推送到分支: `git push origin feature/new-feature`
5. 提交Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源。

## 📞 联系我们

- 邮箱: contact@alpine-ski-points.com
- 项目地址: https://github.com/alpine-ski-points
- 国际雪联官网: https://www.fis-ski.com# GitHub Pages部署测试
