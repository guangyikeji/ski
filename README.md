# 中国滑雪赛事积分系统

中国综合性滑雪赛事积分管理系统，支持**高山滑雪**、**自由式滑雪**、**单板滑雪**三大项目的竞赛数据管理和积分计算。

## 🏔️ 项目概述

本系统是基于《中国高山滑雪赛事积分规则v4.docx》和《2025-2026赛季全国BA、SS青少年U系列比赛方案》构建的完整中国滑雪运动积分管理平台，涵盖多项目竞赛数据管理、双积分体系计算、U系列青少年管理、场地标准认证等核心功能。

### 🎿 支持项目
- **高山滑雪**: 速降(DH)、回转(SL)、大回转(GS)、超级大回转(SG)、全能(AC)
- **自由式滑雪**: 大跳台(BA)、坡面障碍技巧(SS)、U型场地(HP)
- **单板滑雪**: 大跳台(BA)、坡面障碍技巧(SS)、U型场地(HP)、平行项目(PSL/PGS)

### 🏅 积分体系
- **高山滑雪**: 基于时间的v4.0积分计算 (A/B/C级系数体系)
- **自由式/单板滑雪**: 基于排名的240/360/120分档积分体系
- **U系列管理**: U12/U15/U18青少年分组独立积分排名

## ✨ 核心功能

### 🎯 竞赛数据管理
- **数据导入**: 支持FIS标准XML格式竞赛数据导入
- **数据解析**: 自动解析比赛结果、运动员信息、赛道条件等
- **数据存储**: 结构化存储历史比赛数据
- **数据查询**: 支持多维度数据检索和筛选

### 📊 FIS积分计算系统
- **标准化计算**: 基于FIS官方积分规则自动计算
- **实时更新**: 比赛结束后自动更新运动员积分
- **积分历史**: 追踪运动员积分变化趋势
- **排名系统**: 基于积分的实时排名更新

### 📚 规则管理
- **规则库**: 数字化存储竞赛规则文档
- **规则查询**: 支持关键词搜索和分类查询
- **中英对照**: 支持中英文规则对照查看

### 🏆 成绩管理
- **成绩录入**: 支持手动和批量成绩录入
- **成绩统计**: 运动员个人和团体成绩统计
- **成绩排名**: 多项目、多级别成绩排名
- **成绩验证**: 成绩数据校验和异常检测

### 📝 在线报名系统
- **在线报名**: 运动员/教练员在线报名参赛
- **资格审查**: 自动验证参赛资格和积分要求
- **报名管理**: 报名信息审核、修改、取消
- **费用管理**: 报名费用计算和支付集成
- **名单导出**: 生成参赛名单和起跑顺序

### 📈 报表生成
- **比赛报告**: 自动生成比赛结果报告
- **积分报表**: 运动员积分变化报表
- **统计分析**: 比赛数据统计分析图表
- **导出功能**: 支持PDF、Excel等格式导出

## 🧮 FIS积分计算规则详解

### 📐 核心计算公式

#### 1. 比赛积分计算公式
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

#### 2. 惩罚值计算公式
```javascript
// 惩罚值 = (Sum A + Sum B - Sum C) ÷ 10
penalty = (sumA + sumB - sumC) / 10;

// 参数说明:
// sumA = 前10名中最好5名选手的FIS积分总和
// sumB = 所有参赛选手中最好5名的FIS积分总和
// sumC = 最好5名选手的比赛积分总和
```

### 🎯 项目系数详表
| 项目代码 | 项目名称 | 系数值 | 最大积分 | 说明 |
|----------|----------|--------|----------|------|
| DH | 速降 (Downhill) | 1250 | 330 | 高速技术项目 |
| SL | 回转 (Slalom) | 730 | 165 | 技术性项目 |
| GS | 大回转 (Giant Slalom) | 1010 | 220 | 技术速度项目 |
| SG | 超级大回转 (Super Giant Slalom) | 1190 | 270 | 速度技术项目 |
| AC | 全能 (Alpine Combined) | 1360 | 270 | 综合项目 |

### 📊 积分更新机制

#### 1. 基础积分表(BL) - Base List
- **发布时间**: 每年6月中旬
- **计算方法**: 过去赛季每个项目最好2个成绩的平均值
- **特殊处理**:
  ```javascript
  // 单一成绩处理
  if (previousResults.length === 1) {
    return previousResults[0] * 1.20; // 增加20% (+标记)
  }

  // 无成绩处理
  if (previousResults.length === 0) {
    return previousBL * 1.50; // 在之前BL基础上增加50% (>标记)
  }
  ```

#### 2. 常规积分表(NL) - Normal List
- **首次发布**: 7月1日
- **更新频率**: 赛季期间定期更新
- **计算原则**: 当前期间每个项目最好2个成绩的平均值

#### 3. 特殊状态处理
```javascript
const SPECIAL_STATUS = {
  INJURY_PROTECTION: 1.10,    // 伤病保护(#): 增加10%
  PREGNANCY_PROTECTION: 9,    // 怀孕保护: 最多9个月
  CONFIRMED_POINTS: 4,        // 积分确认(C): 退役选手4个赛季
  DOPING_VIOLATION: 'DELETE'  // 反兴奋剂: 删除所有FIS积分
};
```

### 🏆 积分计算实现

#### 核心计算引擎
```javascript
class FISPointsCalculator {
  /**
   * 计算比赛积分
   * @param {number} winnerTime 获胜者时间(秒)
   * @param {number} competitorTime 选手时间(秒)
   * @param {string} discipline 项目代码
   * @returns {number} 比赛积分
   */
  calculateRacePoints(winnerTime, competitorTime, discipline) {
    const F = DISCIPLINE_FACTORS[discipline];
    return F * (competitorTime / winnerTime - 1);
  }

  /**
   * 计算惩罚值
   * @param {number[]} top10FISPoints 前10名FIS积分
   * @param {number[]} allCompetitorsFISPoints 所有选手FIS积分
   * @param {number[]} top5RacePoints 前5名比赛积分
   * @returns {number} 惩罚值
   */
  calculatePenalty(top10FISPoints, allCompetitorsFISPoints, top5RacePoints) {
    const sumA = this.getBest5Points(top10FISPoints);
    const sumB = this.getBest5Points(allCompetitorsFISPoints);
    const sumC = top5RacePoints.slice(0, 5).reduce((a, b) => a + b, 0);

    return Math.max(0, (sumA + sumB - sumC) / 10);
  }

  /**
   * 获取最好5个积分
   * @param {number[]} points 积分数组
   * @returns {number} 前5个积分之和
   */
  getBest5Points(points) {
    const sorted = points.sort((a, b) => a - b);
    return sorted.slice(0, 5).reduce((a, b) => a + b, 0);
  }

  /**
   * 积分舍入规则
   * @param {number} points 原始积分
   * @returns {number} 舍入后积分
   */
  roundPoints(points) {
    // 从0.0004向下舍入，从0.0005向上舍入
    return Math.round(points * 100) / 100;
  }
}
```

### 🌍 国际排名系统

#### 1. 评估周期管理
```javascript
const EVALUATION_PERIODS = {
  NORTHERN_HEMISPHERE: {
    start: '11月第二个周末',
    end: '4月30日',
    description: '北半球雪季'
  },
  SOUTHERN_HEMISPHERE: {
    start: '7月1日',
    end: '10月15日',
    description: '南半球雪季'
  }
};
```

#### 2. 参赛配额计算
```javascript
/**
 * 计算国家队参赛配额
 * @param {number} rankingPosition 国家最佳排名位置
 * @param {number} athleteCount 符合条件的运动员数量
 * @returns {number} 参赛配额
 */
function calculateQuota(rankingPosition, athleteCount) {
  if (rankingPosition <= 150) {
    if (athleteCount >= 10) return 10;
    if (athleteCount >= 9) return 9;
    if (athleteCount >= 8) return 8;
    if (athleteCount >= 7) return 7;
    return Math.min(athleteCount, 6); // 1-6名选手
  } else if (rankingPosition <= 300) {
    return athleteCount >= 2 ? 5 : 4;
  }
  return 0; // 不符合参赛条件
}
```

### 🔢 国内积分系统

#### 1. 国内基础积分表创建
```javascript
class DomesticPointsSystem {
  /**
   * 创建国内基础积分表
   * @param {Array} fisRegisteredAthletes FIS注册运动员
   * @returns {Array} 国内积分表
   */
  createDomesticBaseList(fisRegisteredAthletes) {
    // 按项目分类排序，第一名为0分
    const sorted = fisRegisteredAthletes.sort((a, b) => a.fisPoints - b.fisPoints);
    const champion = sorted[0];

    return sorted.map(athlete => ({
      ...athlete,
      domesticPoints: athlete.fisPoints - champion.fisPoints,
      rank: sorted.indexOf(athlete) + 1
    }));
  }

  /**
   * 积分周期更新流程
   * @param {Array} raceResults 比赛结果
   * @returns {Array} 更新后排名
   */
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

#### 2. 分站赛积分系统
```javascript
const STAGE_RACE_POINTS = {
  1: 1000,   // 冠军
  2: 800,    // 亚军
  3: 600,    // 季军
  4: 500,    // 第四名
  5: 400,    // 第五名
  6: 360,    // 第六名
  7: 320,    // 第七名
  8: 290,    // 第八名
  9: 260,    // 第九名
  10: 240,   // 第十名
  // ... 其他名次递减
};

/**
 * 总决赛积分计算
 * @param {Array} stageResults 分站赛成绩
 * @returns {number} 总积分
 */
function calculateFinalPoints(stageResults) {
  return stageResults.reduce((total, stage) => {
    return total + (STAGE_RACE_POINTS[stage.position] || 0);
  }, 0);
}
```

### 🛡️ 特殊情况处理

#### 1. 数据验证和异常处理
```javascript
class SpecialCaseHandler {
  /**
   * 伤病保护处理
   * @param {number} currentBL 当前基础积分
   * @returns {number} 保护后积分
   */
  handleInjuryProtection(currentBL) {
    return currentBL * 1.10; // 在BL基础上加10%
  }

  /**
   * 反兴奋剂处理
   * @param {string} athleteId 运动员ID
   */
  handleDopingViolation(athleteId) {
    // 删除所有FIS积分
    this.deleteAllFISPoints(athleteId);
    this.addViolationRecord(athleteId);
    this.notifyFISDatabase(athleteId);
  }

  /**
   * 罚分不足5人处理
   * @param {Array} availablePoints 可用积分
   * @param {string} discipline 项目
   * @returns {Array} 补足的积分数组
   */
  handleInsufficientParticipants(availablePoints, discipline) {
    const maxValues = MAX_POINTS[discipline];
    const needed = 5 - availablePoints.length;

    // 用最大值补足到5个
    for (let i = 0; i < needed; i++) {
      availablePoints.push(maxValues);
    }

    return availablePoints.slice(0, 5);
  }

  /**
   * 并列情况处理
   * @param {Array} tiedAthletes 并列运动员
   * @param {number} position 并列位置
   * @returns {Array} 处理后的排名
   */
  handleTiedPositions(tiedAthletes, position) {
    if (position === 10) {
      // 第10名并列: 所有并列选手都参与惩罚值计算
      return tiedAthletes.map(athlete => ({ ...athlete, rank: 10 }));
    }

    if (position <= 5) {
      // 前5名并列: 选择比赛积分更高者参与计算
      return tiedAthletes.sort((a, b) => b.racePoints - a.racePoints);
    }

    return tiedAthletes;
  }
}
```

### 📋 竞赛管理规则

#### 1. 竞赛组织规则表
```javascript
const COMPETITION_RULES = {
  // 电子媒体权利管理
  MEDIA_RIGHTS: {
    rules: '208-209',
    description: '竞赛转播和媒体权利管理',
    requirements: ['转播权申请', '信号制作标准', '版权保护']
  },

  // 竞赛组织程序
  ORGANIZATION: {
    rules: '210-219',
    description: '赛事筹备和组织流程',
    phases: ['申办', '准备', '执行', '总结']
  },

  // 参赛资格
  ELIGIBILITY: {
    rules: '605-610',
    description: '运动员参赛资格和年龄限制',
    criteria: ['FIS注册', '年龄要求', '积分门槛', '医疗检查']
  },

  // 竞赛执行
  EXECUTION: {
    rules: '611-617',
    description: '比赛现场执行程序',
    stages: ['检录', '起跑', '计时', '成绩确认']
  },

  // 申诉程序
  APPEALS: {
    rules: '640-647',
    description: '抗议与申诉处理流程',
    levels: ['现场申诉', '技术申诉', '仲裁委员会']
  }
};
```

#### 2. 积分展示要求
```javascript
const DISPLAY_REQUIREMENTS = {
  // 积分排行榜公示
  PUBLIC_RANKING: {
    updateFrequency: '14天周期',
    includeFields: ['排名', '姓名', '国家', '积分', '罚分值', '最终积分'],
    format: '参照国际雪联官网风格',
    languages: ['中文', '英文']
  },

  // 罚分值展示
  PENALTY_DISPLAY: {
    showInRanking: true,
    showCalculationDetails: true,
    transparency: '完全公开计算过程',
    formula: 'P = (A + B - C) ÷ 10'
  },

  // 特殊标记说明
  SPECIAL_MARKERS: {
    '+': '单一成绩，增加20%',
    '>': '无成绩，在BL基础上增加50%',
    '#': '伤病保护，在BL基础上增加10%',
    'C': '积分确认，退役选手保留4个赛季'
  }
};
```

### 🔍 数据质量控制

#### 1. 成绩验证规则
```javascript
class DataValidation {
  /**
   * 验证比赛成绩合理性
   * @param {Object} result 比赛成绩
   * @param {Object} competition 比赛信息
   * @returns {Object} 验证结果
   */
  validateRaceResult(result, competition) {
    const validation = {
      isValid: true,
      errors: [],
      warnings: []
    };

    // 时间合理性检查
    if (result.time <= 0) {
      validation.errors.push('比赛时间必须大于0');
      validation.isValid = false;
    }

    // 与获胜者时间差异检查
    const timeDifference = (result.time - competition.winnerTime) / competition.winnerTime;
    if (timeDifference > 0.5) { // 超过获胜者50%的时间
      validation.warnings.push('成绩与获胜者差距较大，请确认');
    }

    // FIS积分合理性检查
    if (result.fisPoints < 0 || result.fisPoints > 999) {
      validation.errors.push('FIS积分超出有效范围(0-999)');
      validation.isValid = false;
    }

    return validation;
  }

  /**
   * 验证积分计算准确性
   * @param {Object} calculation 积分计算结果
   * @returns {boolean} 是否准确
   */
  validatePointsCalculation(calculation) {
    const recalculated = this.fisCalculator.calculateRacePoints(
      calculation.winnerTime,
      calculation.competitorTime,
      calculation.discipline
    );

    const difference = Math.abs(calculation.racePoints - recalculated);
    return difference < 0.01; // 允许0.01的舍入误差
  }
}
```

### 📈 统计分析功能

#### 1. 趋势分析
```javascript
class StatisticsAnalyzer {
  /**
   * 分析运动员积分趋势
   * @param {string} athleteId 运动员ID
   * @param {string} discipline 项目
   * @param {number} months 分析月数
   * @returns {Object} 趋势分析结果
   */
  analyzePointsTrend(athleteId, discipline, months = 12) {
    const history = this.getPointsHistory(athleteId, discipline, months);

    return {
      trend: this.calculateTrend(history),
      bestResult: Math.min(...history.map(h => h.points)),
      averageImprovement: this.calculateImprovement(history),
      consistency: this.calculateConsistency(history),
      prediction: this.predictNextPoints(history)
    };
  }

  /**
   * 比赛质量分析
   * @param {string} competitionId 比赛ID
   * @returns {Object} 质量分析结果
   */
  analyzeCompetitionQuality(competitionId) {
    const participants = this.getParticipants(competitionId);
    const results = this.getResults(competitionId);

    return {
      participantLevel: this.calculateParticipantLevel(participants),
      competitiveness: this.calculateCompetitiveness(results),
      penalty: this.calculatePenalty(participants, results),
      reliability: this.assessReliability(results)
    };
  }
}
```

## 🏗️ 技术架构

### 前端技术栈
- **Web端**: React/Next.js + TypeScript
- **小程序**: 微信小程序原生开发
- **UI组件**: Ant Design / Material-UI
- **状态管理**: Redux Toolkit / Zustand

### 后端技术栈
- **API服务**: Node.js + Express/Fastify
- **数据库**: PostgreSQL + Redis
- **ORM**: Prisma / TypeORM
- **文件存储**: 阿里云OSS/腾讯云COS
- **消息队列**: Redis/Bull

### 核心数据表结构
```sql
-- 运动员表
athletes (id, name, country, fis_code, birth_date, gender)

-- 比赛表
competitions (id, name, location, date, discipline, status)

-- 成绩表
results (id, athlete_id, competition_id, time, rank, points)

-- 积分表
points (id, athlete_id, discipline, points, update_date, season)

-- 报名表
registrations (id, athlete_id, competition_id, status, payment_status)

-- 规则表
rules (id, category, content_cn, content_en, version, effective_date)
```

## 🚀 快速开始

### 环境要求
- Node.js 18+
- PostgreSQL 14+
- Redis 6+

### 安装依赖
```bash
# 克隆项目
git clone https://gitee.com/guangyikeji/ski.git
cd ski

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
```

### 开发命令
```bash
# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 运行测试
npm test

# 类型检查
npm run typecheck

# 代码检查
npm run lint
```

## 🌐 部署方案

### 🎯 推荐部署方案

#### 1. Vercel (最简单)
```bash
# 一键部署
npx vercel --prod
```
- ✅ 零配置自动部署
- ✅ 免费SSL和CDN
- ✅ 支持从Gitee自动部署

#### 2. 云服务器 ECS
```bash
# 一键部署脚本
chmod +x deploy.sh
./deploy.sh
```
- ✅ PM2进程管理
- ✅ Nginx反向代理
- ✅ SSL证书支持

#### 3. Docker 容器化
```bash
# 启动服务
docker-compose up -d
```
- ✅ 环境一致性
- ✅ 易于扩展维护

### 部署成本预估
| 方案 | 月费用 | 适用场景 |
|------|--------|----------|
| Vercel | 免费 | 个人项目、演示 |
| 阿里云ECS 1核2G | ¥50-80 | 小型项目 |
| 阿里云ECS 2核4G | ¥100-150 | 中型项目 |

## 📁 项目文件结构

```
ski/
├── src/                    # 源代码目录
│   ├── components/         # React组件
│   ├── pages/             # 页面组件
│   ├── services/          # API服务
│   ├── utils/             # 工具函数
│   └── types/             # TypeScript类型定义
├── public/                # 静态资源
├── docs/                  # 文档目录
├── tests/                 # 测试文件
├── docker-compose.yml     # Docker编排
├── Dockerfile            # Docker镜像
├── nginx.conf            # Nginx配置
├── deploy.sh             # 部署脚本
└── ecosystem.config.js   # PM2配置
```

## 📊 项目资源

### 现有文档
- `CHN6377.O22.xml`: FIS标准比赛数据样本
- `fis_points_rules_02-09-2024.pdf`: FIS积分规则文档
- `icr_21-12-2024.pdf`: 国际竞赛规则
- `国际雪联竞赛规则2021年7月版（中英）.docx`: 中英文规则对照
- `滑雪积分问题汇总.docx`: 积分计算问题总结

## 🗓️ 开发路线图

### Phase 1: 基础架构 (4周)
- [x] 项目初始化和基础架构搭建
- [x] 数据库设计和基础表结构
- [ ] 用户认证和权限管理系统
- [ ] XML数据解析模块开发

### Phase 2: 核心功能 (6周)
- [ ] FIS积分计算引擎实现
- [ ] 成绩管理系统开发
- [ ] 基础报表和统计功能
- [ ] Web管理后台界面

### Phase 3: 报名系统 (4周)
- [ ] 在线报名功能开发
- [ ] 资格审查和验证模块
- [ ] 支付系统集成
- [ ] 报名管理后台

### Phase 4: 移动端 (4周)
- [ ] 微信小程序开发
- [ ] 响应式设计优化
- [ ] 离线功能支持
- [ ] 消息推送服务

### Phase 5: 高级功能 (4周)
- [ ] 数据分析和可视化
- [ ] 智能推荐算法
- [ ] 多语言国际化
- [ ] 性能优化和监控

## 🤝 贡献指南

### 开发流程
1. Fork 项目到个人仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 代码规范
- 使用 ESLint + Prettier 进行代码格式化
- 遵循 TypeScript 严格模式
- 组件和函数需要添加 JSDoc 注释
- 提交信息遵循 Conventional Commits 规范

## 📞 联系方式

- **项目维护者**: guangyikeji
- **邮箱**: 16161327+guangyikeji@user.noreply.gitee.com
- **Gitee**: https://gitee.com/guangyikeji/ski

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 国际雪联(FIS) 提供的技术规则和积分标准
- 滑雪运动社区的支持和反馈
- 开源社区提供的优秀工具和框架

---

**⭐ 如果这个项目对你有帮助，请给它一个星标！**