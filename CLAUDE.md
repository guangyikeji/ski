# 高山滑雪竞赛管理系统

## 项目概述
基于国际雪联(FIS)规则的高山滑雪竞赛数据管理和积分计算系统，支持Web端和微信小程序多端访问。

## 核心功能需求

### 1. 竞赛数据管理
- **数据导入**: 支持FIS标准XML格式竞赛数据导入
- **数据解析**: 自动解析比赛结果、运动员信息、赛道条件等
- **数据存储**: 结构化存储历史比赛数据
- **数据查询**: 支持多维度数据检索和筛选

### 2. 积分计算系统
- **FIS积分规则**: 基于最新FIS积分规则自动计算
- **实时计算**: 比赛结束后自动更新运动员积分
- **积分历史**: 追踪运动员积分变化趋势
- **排名系统**: 基于积分的实时排名更新

### 3. 规则管理
- **规则库**: 数字化存储竞赛规则文档
- **规则查询**: 支持关键词搜索和分类查询
- **规则更新**: 及时更新最新版本规则
- **中英对照**: 支持中英文规则对照查看

### 4. 成绩管理
- **成绩录入**: 支持手动和批量成绩录入
- **成绩统计**: 运动员个人和团体成绩统计
- **成绩排名**: 多项目、多级别成绩排名
- **成绩验证**: 成绩数据校验和异常检测

### 5. 报名功能 ⭐ 新增
- **在线报名**: 运动员/教练员在线报名参赛
- **资格审查**: 自动验证参赛资格和积分要求
- **报名管理**: 报名信息审核、修改、取消
- **费用管理**: 报名费用计算和支付集成
- **名单导出**: 生成参赛名单和起跑顺序

### 6. 报表生成
- **比赛报告**: 自动生成比赛结果报告
- **积分报表**: 运动员积分变化报表
- **统计分析**: 比赛数据统计分析图表
- **导出功能**: 支持PDF、Excel等格式导出

## FIS积分计算规则详解 ⭐ 核心系统

### 1. 积分系统基本原理
- **标准化计算**: 使用统一的高山滑雪公式确保比赛积分的公平性
- **动态更新**: 通过基础积分表(BL)和常规积分表(NL)实现积分的动态更新
- **难度系数**: 基于参赛选手中最好5名的FIS积分计算比赛难度
- **有效期管理**: 当前赛季内的成绩有效，保持积分时效性

### 2. 核心计算公式

#### 2.1 比赛积分计算公式
```javascript
// 高山滑雪标准公式
P = F × (Tx/To - 1)
// 或者
P = (F × Tx/To) - F

// 参数说明:
// P = 比赛积分 (Race Points)
// To = 获胜者时间 (Winner's Time in seconds)
// Tx = 被排名选手时间 (Ranked Competitor's Time in seconds)
// F = 项目系数 (Discipline Factor)
```

#### 2.2 各项目F系数
```javascript
const DISCIPLINE_FACTORS = {
  DH: 1250,    // 速降 (Downhill)
  SL: 730,     // 回转 (Slalom)
  GS: 1010,    // 大回转 (Giant Slalom)
  SG: 1190,    // 超级大回转 (Super Giant Slalom)
  AC: 1360     // 全能 (Alpine Combined)
};
```

#### 2.3 惩罚值计算公式
```javascript
// 惩罚值 = (Sum A + Sum B - Sum C) ÷ 10
penalty = (sumA + sumB - sumC) / 10;

// 参数说明:
// sumA = 前10名中最好5名选手的FIS积分总和
// sumB = 所有参赛选手中最好5名的FIS积分总和
// sumC = 最好5名选手的比赛积分总和
```

### 3. 积分更新机制

#### 3.1 基础积分表(BL)
- **发布时间**: 每年6月中旬
- **计算方法**: 过去赛季每个项目最好2个成绩的平均值
- **特殊处理**:
  - 单一成绩: 增加20% (+标记)
  - 无成绩: 在之前BL基础上增加50% (>标记)

#### 3.2 常规积分表(NL)
- **首次发布**: 7月1日
- **更新频率**: 赛季期间定期更新
- **计算原则**: 当前期间每个项目最好2个成绩的平均值

#### 3.3 特殊状态处理
```javascript
const SPECIAL_STATUS = {
  INJURY_PROTECTION: 1.10,    // 伤病保护(#): 增加10%
  PREGNANCY_PROTECTION: 9,    // 怀孕保护: 最多9个月
  CONFIRMED_POINTS: 4         // 积分确认(C): 退役选手4个赛季
};
```

### 4. 项目特殊规则

#### 4.1 最大积分值限制
```javascript
const MAX_POINTS = {
  DH: 330,    // 速降
  SG: 270,    // 超级大回转
  SL: 165,    // 回转
  GS: 220,    // 大回转
  AC: 270     // 全能
};
```

#### 4.2 参赛配额计算
```javascript
// 基于第1个FIS积分表中各国选手在5个项目中的最佳表现
function calculateQuota(rankingPosition, athleteCount) {
  if (rankingPosition <= 150) {
    if (athleteCount >= 10) return 10;
    if (athleteCount >= 9) return 9;
    if (athleteCount >= 8) return 8;
    if (athleteCount >= 7) return 7;
    return 6; // 1-6名选手
  } else if (rankingPosition <= 300) {
    return athleteCount >= 2 ? 5 : 4;
  }
  return 0;
}
```

### 5. 数据处理规则

#### 5.1 积分舍入规则
```javascript
function roundPoints(points) {
  // 从0.0004向下舍入，从0.0005向上舍入
  return Math.round(points * 100) / 100;
  // 例: 13.654 = 13.65, 21.849 = 21.85
}
```

#### 5.2 并列情况处理
- 第10名并列: 所有并列选手都参与惩罚值计算
- 第5好FIS积分并列: 选择比赛积分更高者参与计算

### 6. 系统实现架构

#### 6.1 积分计算引擎
```javascript
class FISPointsCalculator {
  calculateRacePoints(winnerTime, competitorTime, discipline) {
    const F = DISCIPLINE_FACTORS[discipline];
    return F * (competitorTime / winnerTime - 1);
  }

  calculatePenalty(top10FISPoints, allCompetitorsFISPoints, top5RacePoints) {
    const sumA = top10FISPoints.slice(0, 5).reduce((a, b) => a + b, 0);
    const sumB = allCompetitorsFISPoints.slice(0, 5).reduce((a, b) => a + b, 0);
    const sumC = top5RacePoints.reduce((a, b) => a + b, 0);
    return (sumA + sumB - sumC) / 10;
  }
}
```

#### 6.2 数据验证规则
- 反兴奋剂: 违规选手删除之前获得的FIS积分
- 数据传输: 必须使用FIS格式电子传输
- 技术监督: 技术代表必须监督并在线报告

### 7. 中文文档补充规则 📋

#### 7.1 评估周期管理
```javascript
const EVALUATION_PERIODS = {
  NORTHERN_HEMISPHERE: {
    start: '11月第二个周末',
    end: '4月30日'
  },
  SOUTHERN_HEMISPHERE: {
    start: '7月1日',
    end: '10月15日'
  }
};
```

#### 7.2 基础积分表(BL)详细规则
```javascript
function calculateBLPoints(previousResults, previousBL) {
  if (previousResults.length >= 2) {
    // 使用两个最佳成绩的平均值
    const bestTwo = previousResults.slice(0, 2);
    return bestTwo.reduce((a, b) => a + b) / 2;
  } else if (previousResults.length === 1) {
    // 仅有一次成绩：附加20%
    return previousResults[0] * 1.20;
  } else {
    // 无成绩：在之前BL基础上增加50%
    return previousBL * 1.50;
  }
}

// 伤病保护处理
function applyInjuryProtection(currentPoints, protectionPoints) {
  if (currentPoints < protectionPoints) {
    return protectionPoints * 1.10; // BL积分上调10%
  }
  return currentPoints;
}
```

#### 7.3 国内积分系统架构
```javascript
class DomesticPointsSystem {
  constructor() {
    this.baselist = [];
    this.evaluationCycle = 14; // 14天为一个积分周期
  }

  // 创建国内基础积分表
  createDomesticBaseList(fisRegisteredAthletes) {
    // 按项目分类排序，第一名为0分
    const sorted = fisRegisteredAthletes.sort((a, b) => a.fisPoints - b.fisPoints);
    const champion = sorted[0];

    return sorted.map(athlete => ({
      ...athlete,
      domesticPoints: athlete.fisPoints - champion.fisPoints
    }));
  }

  // 积分周期更新流程
  updatePointsCycle(raceResults) {
    // 1. 比赛成绩确认
    const confirmedResults = this.confirmResults(raceResults);

    // 2. 排名计算
    const rankings = this.calculateRankings(confirmedResults);

    // 3. 换算公式应用
    const racePoints = this.applyConversionFormula(rankings);

    // 4. 减去罚分
    const finalPoints = this.applyPenalty(racePoints);

    // 5. 形成世界排名
    return this.generateWorldRanking(finalPoints);
  }
}
```

#### 7.4 分站赛积分系统
```javascript
const STAGE_RACE_POINTS = {
  CHAMPION: 1000,
  RUNNER_UP: 800,
  THIRD_PLACE: 600,
  FOURTH_PLACE: 500,
  FIFTH_PLACE: 400
  // ... 其他名次
};

// 总决赛积分通过叠加分站赛成绩确定
function calculateFinalPoints(stageResults) {
  return stageResults.reduce((total, stage) => {
    return total + STAGE_RACE_POINTS[stage.position] || 0;
  }, 0);
}
```

#### 7.5 竞赛管理规则
```javascript
const COMPETITION_RULES = {
  // 电子媒体权利管理
  MEDIA_RIGHTS: {
    rules: '208-209',
    description: '竞赛转播和媒体权利管理'
  },

  // 竞赛组织程序
  ORGANIZATION: {
    rules: '210-219',
    description: '赛事筹备和组织流程'
  },

  // 参赛资格
  ELIGIBILITY: {
    rules: '605-610',
    description: '运动员参赛资格和年龄限制'
  },

  // 竞赛执行
  EXECUTION: {
    rules: '611-617',
    description: '比赛现场执行程序'
  },

  // 申诉程序
  APPEALS: {
    rules: '640-647',
    description: '抗议与申诉处理流程'
  }
};
```

#### 7.6 特殊情况处理详则
```javascript
class SpecialCaseHandler {
  // 单一成绩处理
  handleSingleResult(result, hasBL) {
    if (!hasBL) {
      return result * 1.20; // 加20%
    }
    return result;
  }

  // 无成绩处理
  handleNoResults(previousBL) {
    return previousBL * 1.50; // 在BL基础上加50%
  }

  // 伤病保护处理
  handleInjuryProtection(currentBL) {
    return currentBL * 1.10; // 在BL基础上加10%
  }

  // 反兴奋剂处理
  handleDopingViolation(athleteId) {
    // 删除所有FIS积分
    this.deleteAllFISPoints(athleteId);
    this.addViolationRecord(athleteId);
  }

  // 罚分不足5人处理
  handleInsufficientParticipants(availablePoints, discipline) {
    const maxValues = MAX_POINTS[discipline];
    return this.padWithMaxValues(availablePoints, maxValues, 5);
  }
}
```

#### 7.7 积分展示要求
```javascript
const DISPLAY_REQUIREMENTS = {
  // 积分排行榜公示
  PUBLIC_RANKING: {
    updateFrequency: '14天周期',
    includeFields: ['排名', '姓名', '积分', '罚分值', '最终积分'],
    format: '参照国际雪联官网风格'
  },

  // 罚分值展示
  PENALTY_DISPLAY: {
    showInRanking: true,
    showCalculationDetails: true,
    transparency: '完全公开计算过程'
  },

  // 国际化界面
  INTERNATIONALIZATION: {
    languages: ['中文', '英文'],
    terminology: '与FIS官方术语保持一致'
  }
};
```

## 技术架构

### 前端架构
- **Web端**: React/Vue.js 响应式设计
- **小程序**: 微信小程序原生开发
- **移动端**: 响应式设计适配手机访问

### 后端架构
- **API服务**: Node.js/Python FastAPI
- **数据库**: PostgreSQL + Redis缓存
- **文件存储**: 云存储服务(OSS/COS)
- **消息队列**: Redis/RabbitMQ

### 数据层设计
```sql
-- 核心数据表结构设计
athletes (运动员表)
competitions (比赛表)
results (成绩表)
points (积分表)
registrations (报名表)
rules (规则表)
```

## 开发阶段规划

### Phase 1: 基础数据管理
- 数据库设计和搭建
- XML数据解析模块
- 基础CRUD接口开发
- 用户认证系统

### Phase 2: 积分计算核心
- FIS积分计算引擎
- 成绩管理系统
- 基础报表功能
- Web端管理界面

### Phase 3: 报名系统
- 在线报名功能
- 资格审查模块
- 支付集成
- 报名管理后台

### Phase 4: 移动端开发
- 微信小程序开发
- 移动端优化
- 离线功能支持
- 推送通知

### Phase 5: 高级功能
- 数据分析和可视化
- 智能推荐系统
- 多语言支持
- 性能优化

## 项目文件说明

### 现有资源
- `CHN6377.O22.xml`: FIS标准比赛数据样本
- `fis_points_rules_02-09-2024.pdf`: FIS积分规则文档
- `icr_21-12-2024.pdf`: 国际竞赛规则
- `国际雪联竞赛规则2021年7月版（中英）.docx`: 中英文规则对照
- `滑雪积分问题汇总.docx`: 积分计算问题总结

### 开发命令
```bash
# 测试命令
npm test

# 构建命令
npm run build

# 类型检查
npm run typecheck

# 代码规范检查
npm run lint
```

## Git仓库信息 📦

### 🔗 远程仓库
- **Gitee仓库**: https://gitee.com/guangyikeji/ski.git
- **GitHub仓库**: https://github.com/guangyikeji/ski.git
- **克隆命令**: `git clone https://gitee.com/guangyikeji/ski.git`
- **主分支**: main

### 👤 Git配置
```bash
git config --global user.name 'guangyikeji'
git config --global user.email '16161327+guangyikeji@user.noreply.gitee.com'
```

### 🔑 访问令牌
- **Gitee Token**: `5cb815ad06bd80f3fa523ba8498a89d8`
- **GitHub Token**: 请使用环境变量 `$GITHUB_TOKEN` 或安全存储
- **用途**: 用于推送代码到远程仓库
- **使用方法**: 在HTTPS URL中替换密码部分

### 📤 推送命令
```bash
# 添加Gitee远程仓库
git remote add gitee https://guangyikeji:5cb815ad06bd80f3fa523ba8498a89d8@gitee.com/guangyikeji/ski.git

# 添加GitHub远程仓库 (使用环境变量)
git remote add github https://guangyikeji:$GITHUB_TOKEN@github.com/guangyikeji/ski.git

# 推送到Gitee
git push gitee main

# 推送到GitHub
git push github main
```

### 🏷️ 分支管理
- **main**: 主分支，稳定版本
- **develop**: 开发分支（可选）
- **feature/***: 功能分支（按需创建）

### 📊 仓库状态
- ✅ **Gitee**: 代码已成功推送，可正常访问
- ✅ **GitHub**: 代码已成功推送，可正常访问
- 🔄 **同步策略**: 双仓库同步更新

## 云服务器部署方案 ☁️

### 🎯 迁移复杂度: ⭐⭐ (5星制，非常简单)

#### 📊 调整工作量评估
- **Vercel**: 0% 调整 - 零配置部署
- **阿里云ECS**: 5% 调整 - 仅需运行部署脚本
- **Docker部署**: 10% 调整 - 已提供完整配置

### 🚀 推荐部署方案

#### 1. Vercel (最简单) ⭐⭐⭐⭐⭐
```bash
# 一行命令部署
npx vercel --prod
```
- ✅ 零配置，自动优化
- ✅ 免费SSL和CDN
- ✅ 自动从Gitee部署
- ✅ 无需服务器管理

#### 2. 阿里云/腾讯云 ECS ⭐⭐⭐⭐
```bash
# 服务器上执行
git clone https://gitee.com/guangyikeji/ski.git
cd ski
chmod +x deploy.sh
./deploy.sh
```
- ✅ 已提供完整部署脚本
- ✅ PM2进程管理
- ✅ Nginx反向代理配置
- ✅ SSL证书支持

#### 3. Docker容器化 ⭐⭐⭐⭐⭐
```bash
# 单命令启动
docker-compose up -d
```
- ✅ 环境一致性
- ✅ 易于扩展和维护
- ✅ 包含Nginx和应用

### 📁 已创建的部署文件

```
项目根目录/
├── Dockerfile              # Docker镜像构建
├── docker-compose.yml      # 容器编排配置
├── nginx.conf              # Nginx反向代理配置
├── ecosystem.config.js     # PM2进程管理配置
├── deploy.sh               # 一键部署脚本
├── .env.example            # 环境变量模板
└── .gitignore              # 已更新部署相关忽略文件
```

### ⚡ 一键部署流程

#### 方案A: Vercel (推荐新手)
1. 注册Vercel账号
2. 连接Gitee仓库
3. 自动部署完成 ✅

#### 方案B: 云服务器ECS
```bash
# 1. 购买云服务器 (1核2G即可)
# 2. 安装Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. 克隆并部署
git clone https://gitee.com/guangyikeji/ski.git
cd ski
chmod +x deploy.sh
./deploy.sh
```

#### 方案C: Docker部署
```bash
# 1. 安装Docker
curl -fsSL https://get.docker.com | sh

# 2. 一键启动
git clone https://gitee.com/guangyikeji/ski.git
cd ski
docker-compose up -d
```

### 🔧 环境变量配置
```bash
# 复制并编辑环境变量
cp .env.example .env
nano .env

# 主要配置项
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NODE_ENV=production
PORT=3000
```

### 📊 部署成本预估
| 方案 | 月费用 | 适用场景 |
|------|--------|----------|
| Vercel | 免费 | 个人项目、演示 |
| 阿里云ECS 1核2G | ¥50-80 | 小型项目 |
| 阿里云ECS 2核4G | ¥100-150 | 中型项目 |
| Docker集群 | ¥200+ | 大型项目 |

### 🛡️ 安全配置
- ✅ SSL证书自动配置
- ✅ 安全HTTP头设置
- ✅ 环境变量保护
- ✅ 文件权限控制
- ✅ 进程自动重启

## 部署和运维
- **容器化**: Docker部署 (已配置)
- **CI/CD**: Gitee Actions自动化部署 (可选)
- **进程管理**: PM2集群模式
- **反向代理**: Nginx负载均衡
- **监控**: 进程状态和日志监控
- **备份**: 数据库定期备份策略
- **SSL**: 自动HTTPS重定向

## 安全考虑
- 用户权限管理
- 数据加密传输
- 敏感信息脱敏
- 审计日志记录
- **重要**: 请妥善保管访问令牌，避免泄露