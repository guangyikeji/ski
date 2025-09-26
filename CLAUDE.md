# 中国滑雪赛事积分系统

## 项目概述
中国综合性滑雪赛事积分管理系统，支持**高山滑雪**、**自由式滑雪**、**单板滑雪**三大项目的竞赛数据管理和积分计算。基于《中国高山滑雪赛事积分规则v4.docx》和《2025-2026赛季全国BA、SS青少年U系列比赛方案》，建立完整的中国滑雪运动积分体系。

### 🎿 支持项目范围
- **高山滑雪**: 速降(DH)、回转(SL)、大回转(GS)、超级大回转(SG)、全能(AC)
- **自由式滑雪**: 大跳台(BA)、坡面障碍技巧(SS)、U型场地(HP)
- **单板滑雪**: 大跳台(BA)、坡面障碍技巧(SS)、U型场地(HP)、平行项目(PSL/PGS)

### 🏅 积分体系
- **高山滑雪**: 基于时间的v4.0积分计算 (A/B/C级系数体系)
- **自由式/单板滑雪**: 基于排名的240/360/120分档积分体系
- **U系列管理**: U12/U15/U18青少年分组独立积分排名

## 核心功能需求

### 1. 竞赛数据管理
- **数据导入**: 支持FIS标准XML格式竞赛数据导入
- **数据解析**: 自动解析比赛结果、运动员信息、赛道条件等
- **数据存储**: 结构化存储历史比赛数据
- **数据查询**: 支持多维度数据检索和筛选

### 2. 积分计算系统
- **中国积分规则**: 基于《中国高山滑雪赛事积分规则v4.0》自动计算
- **实时计算**: 比赛结束后自动更新运动员积分
- **积分历史**: 追踪运动员积分变化趋势
- **排名系统**: 基于积分的实时排名更新
- **赛事分级**: 支持A级(1.0)、B级(0.6)、C级(0.3)赛事系数

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

### 6. 多项目积分管理 ⭐ 新增
- **240/360/120分档积分**: 自由式/单板滑雪积分计算引擎
- **多项目积分延续**: 赛季结束后×50%基础积分机制
- **独立项目排名**: 各项目独立积分排名和统计
- **跨项目积分转换**: 不同项目间积分标准化（如需要）

### 7. U系列青少年管理 ⭐ 新增
- **年龄分组验证**: 基于身份证的U12/U15/U18自动分组
- **参赛资格审查**: 年龄资格和项目资格双重验证
- **容量管理**: 每组32人上限，候补名单管理
- **独立积分排名**: U系列与成人组独立积分体系
- **注册统计**: 分组统计和趋势分析

### 8. 场地标准管理 ⭐ 新增
- **三级场地标准**: 一级/二级/三级赛事场地技术标准库
- **场地认证**: 大跳台、坡面障碍技巧、U型场地合规性验证
- **标准检查**: 自动化场地标准检查和认证报告
- **改进建议**: 场地改进计划和成本估算

### 9. 全国BA/SS巡回赛管理 ⭐ 新增
- **赛事站次管理**: 6站巡回赛站次安排和地域覆盖
- **奖金管理**: 参与奖、奖金分配和预算管理
- **比赛格式**: 预赛/决赛轮次设置和晋级规则
- **技巧项目评分**: 裁判评分系统和难度系数管理

### 10. 报表生成
- **比赛报告**: 自动生成比赛结果报告
- **积分报表**: 运动员积分变化报表
- **统计分析**: 比赛数据统计分析图表
- **导出功能**: 支持PDF、Excel等格式导出

## 🎿 中国滑雪赛事积分体系架构 ⭐ 核心系统

### 📊 双积分体系设计

本系统采用**双积分体系**设计，针对不同项目特点采用不同积分计算方法：

#### 1. 高山滑雪积分体系（基于时间）
- **适用项目**: 速降、回转、大回转、超级大回转、全能
- **计算方式**: 基于比赛时间的v4.0积分计算公式
- **赛事分级**: A级(1.0)、B级(0.6)、C级(0.3)系数体系
- **判罚分机制**: 基于参赛选手积分分布的动态判罚分

#### 2. 技巧项目积分体系（基于排名）
- **适用项目**: 自由式/单板滑雪大跳台、坡面障碍技巧、U型场地
- **计算方式**: 基于排名的240/360/120分档积分分配
- **赛事分级**: 一类(360分档)、二类(240分档)、三类(120分档)
- **评分机制**: 裁判评分转换为最终排名，再分配积分

### 🏅 积分延续与管理机制

#### 通用积分延续规则
- **延续比例**: 赛季结束后积分×50%作为下赛季基础积分
- **赛季定义**: 7月1日至次年6月30日
- **积分有效期**: 当前赛季内
- **最好成绩**: 取赛季内最好两次成绩平均值

#### U系列特殊管理
- **独立排名**: U12/U15/U18组别独立积分排名
- **年龄转换**: 满18岁后可选择保留U系列积分转入成年组
- **参赛限制**: 每组别32人上限，支持候补名单

## 🎯 自由式/单板滑雪积分规则详解 ⭐ 新增核心系统

**重要声明**: 基于《2025-2026赛季全国BA、SS青少年U系列比赛方案》官方文档

### 1. 积分分档体系

#### 1.1 三档积分标准
```javascript
一类赛事（360分档）：第一名360分，按比例递减
二类赛事（240分档）：第一名240分，按比例递减
三类赛事（120分档）：第一名120分，按比例递减
```

#### 1.2 积分分配表（前10名）
| 名次 | 积分百分比 | 一类赛事 | 二类赛事 | 三类赛事 |
|------|------------|----------|----------|----------|
| 1    | 100%       | 360.000  | 240.000  | 120.000  |
| 2    | 80%        | 288.000  | 192.000  | 96.000   |
| 3    | 60%        | 216.000  | 144.000  | 72.000   |
| 4    | 50%        | 180.000  | 120.000  | 60.000   |
| 5    | 45%        | 162.000  | 108.000  | 54.000   |

### 2. 比赛格式标准

#### 2.1 大跳台比赛格式
- **预赛**: 两轮，取最好成绩，前8名进决赛
- **决赛**: 三轮，取两轮不同动作最好成绩相加
- **评分**: 裁判评分确定最终排名

#### 2.2 坡面障碍技巧格式
- **预赛**: 两轮，取最好成绩，前8名进决赛
- **决赛**: 三轮，取最好成绩
- **评分**: 裁判评分确定最终排名

### 3. 场地技术标准

#### 3.1 大跳台标准（FIS240分档）
- **助滑区长度**: 至少30米，坡度至少20度
- **跳台高度**: 至少2米，起跳角度至少25度
- **落地区距离**: 至少8米（二级）/6米（三级）
- **落地坡度**: 至少24度，宽度18米（二级）/12米（三级）

#### 3.2 坡面障碍技巧标准
- **垂直落差**: 至少40米（二级）/30米（三级）
- **平均坡度**: 至少12度（二级）/10度（三级）
- **坡面宽度**: 30米（二级）/20米（三级）
- **障碍要求**: 至少2种道具类型，至少3个障碍

### 4. 奖励机制

#### 4.1 奖项设置
- **录取名额**: 前8名
- **奖牌证书**: 前3名颁发奖牌和证书，4-8名颁发证书

#### 4.2 奖金分配
- **第一名**: 3000元
- **第二名**: 2000元
- **第三名**: 1000元
- **参与奖**: 预赛100元/人，决赛200元/人

## 🏆 中国高山滑雪赛事积分规则详解 ⭐ 传统核心系统 (官方v4.0版本)

**重要声明**: 以下规则基于《中国高山滑雪赛事积分规则v4.docx》官方文档，系统开发必须严格遵循此规则体系

**📋 v4.0核心特点**:
- 完整的赛事分级系数体系（A级1.0、B级0.6、C级0.3）
- 简化而精确的积分计算公式
- 扩展的U系列青少年体系（U10-U21）
- 完善的伤病保护和申诉机制
- 明确的数据传输和技术代表职责体系

### 1. 中国积分系统基本原理
- **标准化计算**: 使用统一的高山滑雪公式确保中国赛事积分的公平性
- **动态更新**: 通过基础积分表(BL)和常规积分表(NL)实现积分的动态更新
- **判罚分机制**: 基于参赛选手中最好5名的中国积分计算比赛难度
- **有效期管理**: 当前赛季内的成绩有效，保持积分时效性
- **赛事分级**: A级(1.0)、B级(0.6)、C级(0.3)不同系数体系

### 2. 核心计算公式

#### 2.1 基础比赛积分计算公式 (v4.0标准)
```javascript
// 高山滑雪标准公式
P = F × (Tx/To - 1)

// 参数说明:
// P = 基础比赛积分 (Base Race Points)
// To = 获胜者时间 (Winner's Time in seconds)
// Tx = 被排名选手时间 (Ranked Competitor's Time in seconds)
// F = 项目系数 (Discipline Factor)
```

#### 2.2 最终积分计算公式 (v4.0核心)
```javascript
// 完整计算流程：
// 1. 基础比赛积分：P = F × (Tx/To - 1)
// 2. 加入判罚分：积分 = P + 判罚分
// 3. 应用赛事系数：最终积分 = (P + 判罚分) × 赛事系数

// 最终积分公式：
最终积分 = (基础比赛积分 + 判罚分) × 赛事系数

// 赛事系数：A级1.0，B级0.6，C级0.3
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

#### 2.3 判罚分(Penalty)计算公式 (v4.0标准)
```javascript
// 判罚分 = (Sum A + Sum B - Sum C) ÷ 10
Penalty = (sumA + sumB - sumC) / 10;

// 参数定义：
// Sum A：比赛前10名中最好5名选手的积分总和
// Sum B：所有参赛选手中最好5名的积分总和  
// Sum C：对应Sum B的5名选手在本场比赛的基础比赛积分总和（P = F × (Tx/To - 1)）

// 数据采集规则：
// 1. 优先使用运动员最新有效的中国高山滑雪积分
// 2. 若无国内积分，使用FIS国际积分
// 3. 若均无积分，使用各项目最大积分值
```

### 3. 中国高山滑雪积分更新机制

#### 3.1 基础积分表(BL) (v4.0标准)
- **发布时间**: 每年6月中旬
- **计算方式**:
  - **2次及以上成绩**: BL积分 = （最好成绩 + 次好成绩）÷ 2
  - **单一成绩**: BL积分 = 该成绩 × 1.20（标记“+”）
  - **无成绩**: BL积分 = 前一年BL积分 × 1.50（标记“>”）
  - **新注册运动员**: 参加首场比赛后，根据实际表现确定BL积分：
    - 首次比赛成绩 × 1.30（标记“N”）
    - 若首次比赛未完成，给予该项目70%分位数积分（标记“N”）

#### 3.2 常规积分表(NL) (v4.0标准)
- **首次发布**: 7月1日
- **计算规则**:
  - 取当前赛季各小项最好2次成绩的平均值
  - 若当前NL积分优于BL积分，则更新为NL积分
  - 若运动员本赛季无参赛，保持BL积分不变
- **更新周期**:
  - 每场比赛结束后7个工作日内更新单场积分
  - **赛季期间每周二发布NL积分表更新**
  - **非赛季期间每月15日发布NL积分表更新**
  - A级重要赛事后可进行临时更新

#### 3.3 积分有效期 (v4.0新增)
- **积分有效期**: 当前赛季内
- **违规处理**: 违反反兴奋剂规则的运动员，其此前所获得的积分将予以删除

#### 3.4 项目最大积分值 (v4.0标准)
```javascript
const MAX_POINTS_V4 = {
  DH: 330,    // 滑降 (Downhill)
  SG: 270,    // 超级大回转 (Super Giant Slalom) 
  GS: 220,    // 大回转 (Giant Slalom)
  SL: 165,    // 回转 (Slalom)
  AC: 270     // 全能 (Alpine Combined)
};
```

### 4. 赛事管理规则 (v4.0核心)

#### 4.1 赛事分级系数体系
```javascript
const RACE_COEFFICIENTS = {
  A_LEVEL: 1.0,    // A级赛事：全国锦标赛、冬运会等
  B_LEVEL: 0.6,    // B级赛事：青年冠军赛、省级锦标赛等  
  C_LEVEL: 0.3     // C级赛事：地市级比赛等
};

// A级赛事（系数1.0）：经有关部门确定的其他全国级重要赛事
// B级赛事（系数0.6）：经有关部门确定的其他省级及区域性重要赛事 
// C级赛事（系数0.3）：经有关部门确定的其他地市级赛事
```

#### 4.2 U系列赛事规则 (v4.0扩展)
```javascript
const U_SERIES_RULES = {
  // 计入积分体系的组别
  age_groups: {
    U21: { max_age: 21, points_system: '正式积分' },
    U18: { max_age: 18, points_system: '正式积分' },
    U15: { max_age: 15, points_system: '正式积分' },
    U12: { max_age: 12, points_system: '发展积分' }
  },
  
  // 赛事级别归属  
  race_levels: {
    national_championship: 'B级赛事（系数0.6）',
    provincial_series: 'C级赛事（系数0.3）',
    municipal_series: 'C级赛事（系数0.3）'
  }
};
```

#### 4.3 运动员管理规则 (v4.0核心)
```javascript
const ATHLETE_MANAGEMENT = {
  // 注册要求
  registration: {
    min_age_for_official_points: 13,    // 13周岁可注册正式积分
    youth_development_points: 'under_13', // 13岁以下可注册青少年发展积分
    required_documents: ['参赛声明', '有效保险'],
    registration_number_required: true
  },
  
  // 状态管理
  status_management: {
    activation_period: '赛季内保持不变',
    deactivation_window: '6月1日-12月31日',
    points_retention_after_deactivation: '4个赛季'
  },
  
  // 注册费标准
  fees: {
    adult_registration: 'xxx元/赛季',
    youth_registration: 'xxx元/赛季', 
    annual_points_certificate: 'xxx元/项目',
    group_discounts: {
      ten_plus: 0.9,    // 10人以上9折
      twenty_plus: 0.85, // 20人以上8.5折
      fifty_plus: 0.8    // 50人以上8折
    }
  }
};
```

### 5. 积分计算周期 (v4.0标准)
```javascript
const CALCULATION_PERIODS = {
  winter_season: {
    start: '每年11月第二个周末',
    end: '次年4月30日'
  },
  summer_season: {
    start: '每年6月1日', 
    end: '每年10月15日',
    venue_type: '室内雪场赛事'
  }
};
```

### 6. 数据处理规则 (v4.0完善)

#### 6.1 特殊情况成绩处理 (v4.0新增)
```javascript
const SPECIAL_RESULTS_HANDLING = {
  DNS: {
    description: '未出发',
    points_calculation: '不计算积分，不影响个人积分记录',
    penalty_participation: false
  },
  
  DNF: {
    description: '未完成比赛',
    points_calculation: '不计算积分，不影响个人积分记录',
    penalty_participation: false
  },
  
  DQ: {
    description: '被取消资格',
    points_calculation: '不计算积分，成绩标注为DQ',
    penalty_participation: false,
    additional_penalty: '可能面临额外纪律处分'
  },
  
  // 恶劣天气中断处理
  weather_interruption: {
    'completed_30_plus': '按已完成选手成绩计算积分，未完成者记为DNF',
    'completed_15_29': '比赛有效，但积分按0.8系数计算',
    'completed_under_15': '比赛无效，不计算任何积分',
    'restart_option': '若条件允许，可择日重新举行比赛'
  }
};
```

#### 6.2 并列情况处理 (v4.0精确化)
```javascript
const TIE_HANDLING = {
  tenth_place_tie: {
    description: '第10名并列',
    rule: '所有并列选手均参与Sum A计算'
  },
  
  best_five_points_tie: {
    description: '前5好积分并列', 
    rule: '选择比赛积分较高者参与Sum C计算'
  },
  
  insufficient_participants: {
    description: '参赛人数不足5人',
    rule: '使用最大积分值补足计算'
  }
};
```

### 7. 伤病保护机制 (v4.0完善)

#### 7.1 申请条件 (v4.0严格化)
```javascript
const INJURY_PROTECTION = {
  // 医疗证明要求
  medical_requirements: {
    hospital_level: '县级以上医院',
    required_info: ['伤病类型', '严重程度', '预计康复时间'],
    chronic_disease: '需提供持续治疗证明'
  },
  
  // 适用伤病类型
  applicable_injuries: [
    '骨折、韧带播裂等运动伤害',
    '需手术治疗的严重伤病',
    '影响训练和比赛的慢性疾病', 
    '因伤病导致连续3个月以上无法参赛'
  ]
};
```

#### 7.2 申请流程 (v4.0规范化)
```javascript
const APPLICATION_PROCESS = {
  time_limits: {
    standard: '伤病发生后30天内提出申请',
    special_extension: '特殊情况可申请延期，但不超过45天',
    overdue_policy: '超过期限原则上不予受理'
  },
  
  review_process: [
    '运动员或所属单位向协会提交书面申请',
    '提供完整医疗证明材料',
    '协会指定医学专家进行审核',
    '15个工作日内出具审核结果',
    '审核通过后生效，不溯及既往'
  ]
};
```

### 8. 系统实现架构 (v4.0升级)

#### 8.1 中国积分计算引擎 (v4.0标准)
```javascript
class ChinaSkiPointsCalculator {
  // 基础比赛积分计算
  calculateBaseRacePoints(winnerTime, competitorTime, discipline) {
    const F = DISCIPLINE_FACTORS[discipline];
    return F * (competitorTime / winnerTime - 1);
  }

  // 判罚分计算  
  calculatePenalty(top10ChinaPoints, allCompetitorsChinaPoints, top5BaseRacePoints) {
    const sumA = top10ChinaPoints.slice(0, 5).reduce((a, b) => a + b, 0);
    const sumB = allCompetitorsChinaPoints.slice(0, 5).reduce((a, b) => a + b, 0);
    const sumC = top5BaseRacePoints.reduce((a, b) => a + b, 0);
    return (sumA + sumB - sumC) / 10;
  }
  
  // 最终积分计算 (v4.0核心公式)
  calculateFinalPoints(baseRacePoints, penalty, raceCoefficient) {
    return (baseRacePoints + penalty) * raceCoefficient;
  }
}
```

#### 8.2 数据传输要求 (v4.0规范)
```javascript
const DATA_TRANSMISSION = {
  // 责任主体
  organizer_responsibilities: [
    '负责成绩数据的采集、整理和传输',
    '确保数据格式符合协会要求',
    '在规定时限内完成数据上传'
  ],
  
  technical_delegate_responsibilities: [
    '审核数据的准确性和完整性',
    '确认特殊情况标注的正确性',
    '在数据传输前进行最终审核签字'
  ],
  
  // 传输标准
  transmission_standards: {
    formats: ['协会指定的XML模板', 'Excel模板'],
    required_data: ['运动员基本信息', '成绩', '时间', '特殊情况标注'],
    time_limits: {
      a_level: '比赛结束后6小时内',
      b_level: '比赛结束后12小时内', 
      c_level: '比赛结束后24小时内'
    }
  }
};
```

### 9. 参赛名额分配体系 (v4.0核心)

#### 9.1 基础名额计算 (v4.0新规)
```javascript
const QUOTA_ALLOCATION = {
  // 名额计算依据
  calculation_basis: '根据当年度首期BL积分中各单位运动员的最佳小项积分',
  
  // 省级单位名额
  provincial_quotas: {
    a_level_races: {
      'top_3_provinces': 12,     // 前3名省份
      'rank_4_8_provinces': 10,  // 第4-8名省份
      'rank_9_15_provinces': 8,  // 第9-15名省份
      'rank_16_25_provinces': 6, // 第16-25名省份
      'other_provinces': 4       // 其他省份
    },
    
    b_level_races: {
      'top_5_provinces': 10,     // 前5名省份
      'rank_6_15_provinces': 8,  // 第6-15名省份
      'rank_16_30_provinces': 6, // 第16-30名省份
      'other_provinces': 4       // 其他省份
    },
    
    c_level_races: '不设名额限制，所有注册运动员均可参赛'
  }
};
```

#### 9.2 个人名额获得 (v4.0优化)
```javascript
const INDIVIDUAL_QUOTA = {
  // 自动获得参赛权
  automatic_qualification: {
    a_level_races: '各小项积分排名前50名的运动员',
    b_level_races: '各小项积分排名前100名的运动员',
    previous_season_protection: '上赛季全国前三名运动员保留参赛权'
  },
  
  // 参赛原则
  participation_principles: [
    '不设置积分门槛限制，鼓励更多运动员参与竞赛',
    '所有注册运动员均有机会通过团体名额或个人排名获得参赛资格',
    '重在推广项目发展，提高参与面'
  ]
};
```

#### 9.3 主办地区名额 (v4.0完善)
```javascript
const HOST_REGION_QUOTA = {
  // 基础保障名额
  basic_guaranteed: {
    a_level_races: { basic: 15, max: 20 },
    b_level_races: { basic: 12, max: 16 },
    c_level_races: '不限名额'
  },
  
  // 重点单位额外名额
  additional_quotas: {
    national_training_base: 5,      // 国家队训练基地
    provincial_key_units: 3,        // 省级重点训练单位
    high_level_sports_colleges: 2   // 高水平运动队院校
  }
};
```

### 10. 国际参赛政策 (v4.0开放性)
```javascript
const INTERNATIONAL_PARTICIPATION = {
  foreign_athletes: {
    a_level_limit: 25,    // A级赛事最多25名外籍运动员
    b_level_limit: 15,    // B级赛事最多15名外籍运动员
    c_level_limit: '不限制外籍运动员数量'
  },
  
  registration_process: [
    '外籍运动员通过其所在国滑雪协会提交申请',
    '提供有效FIS积分证明（近12个月内成绩）',
    '提交保险证明和医疗健康证明', 
    '缴纳参赛费用（与国内运动员相同标准）和国际手续费50元',
    '报名截止时间比国内运动员提前7天'
  ],
  
  points_handling: {
    domestic_ranking: '外籍运动员成绩不参与国内积分排名',
    penalty_calculation: '但其成绩参与判罚分计算',
    awards: '外籍运动员获奖不占用国内运动员奖项名额'
  }
};
```

### 11. 运动员等级与选拔 (v4.0指导原则)
```javascript
const ATHLETE_RATING_SELECTION = {
  technical_rating: {
    basis: '基于积分表现确定运动员技术等级申报资格',
    standards: '具体标准由相关部门制定并公布'
  },
  
  national_team_selection: {
    primary_reference: '积分排名作为国家队选拔的重要参考依据',
    comprehensive_evaluation: '结合训练表现、比赛态度等综合考量'
  }
};
```

### 12. 积分申诉与调整 (v4.0完善机制)

#### 12.1 申诉机制 (v4.0规范化)
```javascript
const APPEAL_MECHANISM = {
  time_limits: {
    race_points_appeal: {
      on_site: '比赛结束后48小时内提出现场申诉',
      written: '积分公布后7个工作日内提出书面申诉'
    },
    
    bl_nl_points_appeal: '积分表发布后10个工作日内提出申诉'
  },
  
  appeal_process: [
    '申诉须提供充分证据和理由',
    '缴纳申诉费200元（申诉成功后退还）',
    '协会在15个工作日内给出处理结果',
    '对处理结果不服可向上级体育部门申诉'
  ]
};
```

#### 12.2 积分调整情况 (v4.0透明化)
```javascript
const POINTS_ADJUSTMENT = {
  adjustment_principles: [
    '发现计算错误或数据错误时，及时调整并公布',
    '重大调整须说明原因并通知相关运动员'
  ],
  
  retrospective_period: {
    general_errors: '比赛结束后3个月内可调整',
    serious_violations: '当前赛季内均可调整',
    anti_doping_violations: '无时限限制，可追溯至违规发生时'
  },
  
  adjustment_notification: {
    individual_notification: '积分调整后48小时内通知相关运动员',
    public_announcement: '重大调整需在官网公示7天'
  }
};
```

### 13. v4.0计算示例汇总

#### 13.1 大回转比赛积分计算示例 (v4.0标准)
```javascript
// 示例1：大回转比赛积分计算（无判罚分情况）

// 赛事信息：
// 项目：大回转（F = 1010）
// 赛事级别：A级（系数 1.0）
// 冠军用时：To = 125.30秒
// 某运动员用时：Tx = 128.75秒
// 判罚分：0.00分（假设为标准难度比赛）

// 计算步骤：
// 1.基础比赛积分：P = 1010 × (128.75/125.30 - 1) = 1010 × 0.0275 = 27.76分
// 2.加入判罚分：27.76 + 0.00 = 27.76分
// 3.最终积分 = 27.76 × 1.0 = 27.76分

function calculateExample1() {
  const F = 1010;
  const To = 125.30;
  const Tx = 128.75;
  const penalty = 0.00;
  const raceCoefficient = 1.0;
  
  const basePoints = F * (Tx/To - 1);
  const finalPoints = (basePoints + penalty) * raceCoefficient;
  
  return {
    basePoints: 27.76,
    penalty: 0.00,
    finalPoints: 27.76
  };
}
```

#### 13.2 回转比赛积分计算示例 (B级赛事)
```javascript
// 示例2：回转比赛积分计算（B级赛事）

// 赛事信息：
// 项目：回转（F = 730）
// 赛事级别：B级（系数 0.6）
// 冠军用时：To = 98.45秒
// 某运动员用时：Tx = 102.30秒
// 判罚分：-2.15分（比赛难度低于标准）

// 计算步骤：
// 1.基础比赛积分：P = 730 × (102.30/98.45 - 1) = 730 × 0.0391 = 28.54分
// 2.加入判罚分：28.54 + (-2.15) = 26.39分
// 3.最终积分 = 26.39 × 0.6 = 15.83分

function calculateExample2() {
  const F = 730;
  const To = 98.45;
  const Tx = 102.30;
  const penalty = -2.15;
  const raceCoefficient = 0.6;
  
  const basePoints = F * (Tx/To - 1);
  const finalPoints = (basePoints + penalty) * raceCoefficient;
  
  return {
    basePoints: 28.54,
    penalty: -2.15,
    intermediatePoints: 26.39,
    finalPoints: 15.83
  };
}
```

#### 13.3 判罚分计算完整示例 (v4.0标准)
```javascript
// 示例3：完整判罚分计算

// 比赛数据：
// 前10名中最好5名选手积分：12, 15, 18, 22, 28分
// 所有参赛选手中最好5名积分：8, 12, 15, 18, 20分
// 对应的基础比赛积分：15.2, 27.8, 32.1, 38.5, 42.3分

// 计算步骤：
// 1.Sum A = 12 + 15 + 18 + 22 + 28 = 95分
// 2.Sum B = 8 + 12 + 15 + 18 + 20 = 73分
// 3.Sum C = 15.2 + 27.8 + 32.1 + 38.5 + 42.3 = 155.9分
// 4.Penalty = (95 + 73 - 155.9) ÷ 10 = 1.21分

function calculatePenaltyExample() {
  const sumA = [12, 15, 18, 22, 28].reduce((a, b) => a + b);
  const sumB = [8, 12, 15, 18, 20].reduce((a, b) => a + b);
  const sumC = [15.2, 27.8, 32.1, 38.5, 42.3].reduce((a, b) => a + b);
  
  const penalty = (sumA + sumB - sumC) / 10;
  
  return {
    sumA: 95,
    sumB: 73,
    sumC: 155.9,
    penalty: 1.21
  };
}

// 某运动员最终积分计算（A级赛事）：
// 基础比赛积分：35.60分
// 加入判罚分：35.60 + 1.21 = 36.81分
// 最终积分 = 36.81 × 1.0 = 36.81分
```

#### 13.4 BL基础积分表计算示例 (v4.0标准)
```javascript
// 示例4：BL基础积分表计算

// 运动员A在大回转项目：
// 上赛季最好2次成绩：25.30分、28.75分
// BL积分 = (25.30 + 28.75) ÷ 2 = 27.03分

// 运动员B在回转项目：
// 上赛季只有1次成绩：22.40分
// BL积分 = 22.40 × 1.20 = 26.88分（标记“+”）

// 运动员C在滑降项目：
// 上赛季无成绩，前BL积分：45.60分
// 新BL积分 = 45.60 × 1.50 = 68.40分（标记“>”）

function calculateBLExamples() {
  return {
    athleteA: {
      previousResults: [25.30, 28.75],
      blPoints: (25.30 + 28.75) / 2,
      marker: ''
    },
    
    athleteB: {
      previousResults: [22.40],
      blPoints: 22.40 * 1.20,
      marker: '+'
    },
    
    athleteC: {
      previousResults: [],
      previousBL: 45.60,
      blPoints: 45.60 * 1.50,
      marker: '>'
    }
  };
}
```

#### 13.5 积分标记说明 (v4.0完整版)
```javascript
const POINTS_MARKERS_V4 = {
  '+': '仅有1次成绩，增加20%',
  '>': '无成绩，在前BL基础上增加50%',
  '#': '伤病保护，增加10%',
  'N': '新注册运动员，首次成绩增加30%',
  'C': '确认积分，退役选手4个赛季有效',
  'DQO': '超额参赛，成绩无效'
};

// N标记移除：第二次正式比赛完成后自动移除“N”标记
```

#### 13.6 积分舍入规则 (v4.0精度标准)
```javascript
// 从0.0004向下舍入，从0.0005向上舍入
function roundPointsV4(points) {
  return Math.round(points * 100) / 100;
}

// 示例：
// 13.654分 → 13.65分
// 21.849分 → 21.85分  
// 45.005分 → 45.01分
```

### 14. v4.0系统开发要求总结

#### 14.1 必须实现的核心功能
```javascript
const V4_CORE_REQUIREMENTS = {
  // 1. 积分计算引擎
  points_calculation_engine: {
    base_formula: 'P = F × (Tx/To - 1)',
    final_formula: '最终积分 = (基础积分 + 判罚分) × 赛事系数',
    race_coefficients: { A: 1.0, B: 0.6, C: 0.3 },
    precision: 2  // 小数点后2位
  },
  
  // 2. 赛事分级管理
  race_level_management: {
    automatic_coefficient_application: true,
    level_validation: true,
    coefficient_display: true
  },
  
  // 3. U系列青少年体系
  youth_series_system: {
    age_groups: ['U21', 'U18', 'U15', 'U12'],
    independent_ranking: true,
    development_points_for_u12: true
  },
  
  // 4. 伤病保护机制
  injury_protection: {
    application_time_limit: 30, // 天
    review_period: 15,          // 工作日
    protection_increase: 1.10,  // 10%增加
    max_duration: 18            // 月
  }
};
```

#### 14.2 数据结构要求 (v4.0标准)
```sql
-- v4.0数据表设计要求
CREATE TABLE china_ski_points_v4 (
  id SERIAL PRIMARY KEY,
  athlete_id INT NOT NULL,
  discipline ENUM('DH','SL','GS','SG','AC') NOT NULL,
  race_level ENUM('A','B','C') NOT NULL,
  base_race_points DECIMAL(10,2) NOT NULL,
  penalty_points DECIMAL(10,2) DEFAULT 0.00,
  race_coefficient DECIMAL(3,1) NOT NULL,
  final_points DECIMAL(10,2) NOT NULL,
  calculation_date TIMESTAMP DEFAULT NOW(),
  marker VARCHAR(5) DEFAULT '',
  INDEX idx_athlete_discipline (athlete_id, discipline),
  INDEX idx_race_level (race_level),
  INDEX idx_final_points (final_points)
);

CREATE TABLE injury_protection_v4 (
  id SERIAL PRIMARY KEY,
  athlete_id INT NOT NULL,
  application_date DATE NOT NULL,
  medical_certificate TEXT NOT NULL,
  review_status ENUM('pending','approved','rejected') DEFAULT 'pending',
  protection_start_date DATE,
  protection_end_date DATE,
  protection_percentage DECIMAL(4,2) DEFAULT 1.10,
  created_at TIMESTAMP DEFAULT NOW()
);
```
#### 14.3 v4.0系统集成清单
```javascript
const V4_INTEGRATION_CHECKLIST = {
  // 必须集成功能
  mandatory_integrations: [
    '中国滑雪协会/国家体育总局系统对接',
    '注册费、报名费在线支付系统',
    '积分更新、赛事通知消息推送',
    'Excel、CSV、PDF多格式数据导出',
    '伤病保护申请5个工作日审核流程',
    '反兴奋剂违规运动员积分自动删除机制'
  ],
  
  // 性能要求
  performance_requirements: {
    response_time: '2秒以内',
    concurrent_users: 1000,
    points_update_time: '24小时内',
    system_availability: '99.9%'
  },
  
  // 数据安全
  data_security: [
    '敏感数据加密存储',
    '访问权限严格控制',
    '所有比赛数据自动备份，保留期4年以上',
    '操作日志完整记录'
  ]
};
```

### 📝 v4.0更新总结

**核心变化**:
1. ✅ **简化积分公式**: 去除复杂的质量系数和人数系数，采用简洁明确的三步计算
2. ✅ **标准化赛事分级**: 明确A级(1.0)、B级(0.6)、C级(0.3)三级体系
3. ✅ **扩展U系列体系**: 新增U21和U12组别，独立积分排名
4. ✅ **完善伤病保护**: 明确申请流程和时限要求
5. ✅ **规范数据传输**: 明确责任主体和传输标准
6. ✅ **完善申诉机制**: 详细规定申诉时限和处理流程

**开发优先级**:
1. 🔥 **第一优先级**: 积分计算引擎 + 赛事分级系统
2. 🔥 **第二优先级**: U系列青少年管理 + 伤病保护系统
3. 🔥 **第三优先级**: 数据传输与申诉系统 + 名额分配管理

## 技术架构

### 前端架构
- **Web端**: Next.js + TypeScript 响应式设计
- **小程序**: 微信小程序原生开发
- **移动端**: PWA + 响应式设计适配手机访问

### 后端架构
- **API服务**: Next.js API Routes + TypeScript
- **数据库**: PostgreSQL + Redis缓存
- **文件存储**: 云存储服务(OSS/COS)
- **消息队列**: Redis/RabbitMQ

### 多项目积分计算架构
```typescript
// 双积分计算引擎架构
├── AlpineSkiPointsCalculator (高山滑雪)
│   ├── v4.0时间基础积分计算
│   ├── 判罚分动态计算
│   └── A/B/C级系数应用
└── MultiSportPointsCalculator (自由式/单板)
    ├── 240/360/120分档积分分配
    ├── 排名转积分映射
    └── U系列独立积分管理
```

### 数据层设计
```sql
-- 核心数据表结构设计（多项目扩展）
multi_sport_athletes (多项目运动员表)
  ├── 支持多项目积分记录
  ├── U系列年龄组管理
  └── 跨项目积分历史

multi_sport_competitions (多项目比赛表)
  ├── 支持自由式/单板/高山滑雪
  ├── 积分档次配置(240/360/120)
  └── 场地标准关联

multi_sport_results (多项目成绩表)
  ├── 时间成绩(高山滑雪)
  ├── 评分成绩(技巧项目)
  └── 排名积分计算

venue_standards (场地标准表)
  ├── 三级场地技术标准
  ├── 合规性验证记录
  └── 认证管理

u_series_management (U系列管理表)
  ├── 年龄组验证
  ├── 容量限制管理
  └── 候补名单

points_continuation (积分延续表)
  ├── 赛季积分记录
  ├── 50%延续计算
  └── 跨赛季管理

-- 传统高山滑雪表(保留)
athletes (运动员表)
competitions (比赛表)
results (成绩表)
points (积分表)
registrations (报名表)
rules (规则表)
```

## 开发阶段规划

### Phase 1: 多项目基础架构 ⭐ 系统升级
- 多项目数据模型设计和搭建
- 双积分计算引擎开发
- 统一用户认证和权限系统
- 基础多项目CRUD接口

### Phase 2: 高山滑雪核心系统 (v4.0标准)
- 高山滑雪v4.0积分计算引擎
- 赛事分级系数管理 (A/B/C级)
- 判罚分动态计算系统
- 伤病保护申请系统
- 传统高山滑雪管理界面

### Phase 3: 自由式/单板滑雪系统 ⭐ 新增
- 240/360/120分档积分计算引擎
- 技巧项目评分转排名系统
- 大跳台/坡面障碍技巧比赛管理
- 裁判评分录入系统
- 多轮次比赛格式支持

### Phase 4: U系列青少年管理 ⭐ 新增
- U12/U15/U18年龄组自动分组
- 身份证年龄验证系统
- 32人容量限制和候补管理
- 独立积分排名系统
- 跨年龄组转换管理

### Phase 5: 场地标准管理 ⭐ 新增
- 三级场地标准库
- 场地合规性验证系统
- 大跳台/坡障/U型场地认证
- 改进建议和成本估算
- 场地认证报告生成

### Phase 6: 全国巡回赛管理 ⭐ 新增
- 6站巡回赛站次管理
- 地域覆盖性验证
- 奖金分配和预算管理
- 赛事统计和排名系统
- 积分延续机制(×50%)

### Phase 7: 移动端和小程序
- 微信小程序多项目支持
- 移动端优化和PWA
- 离线功能支持
- 推送通知

### Phase 8: 高级功能和优化
- 数据分析和可视化
- 多项目积分转换
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

### 新增多项目资源 ⭐
- `2025-2026赛季全国BA、SS青少年U系列比赛方案.docx`: U系列赛事官方方案
- `HPSSBA场地标准.xlsx`: 场地技术标准详细规格
- `自由式滑雪和单板滑雪国内赛事积分体系.docx`: 240/360/120分档积分规则
- `中国高山滑雪赛事积分规则v2.1.txt`: 积分规则文本版
- `中国高山滑雪赛事积分规则v3_精简版.md`: 规则精简版

### 核心代码文件 ⭐ 新增
```
src/
├── data/
│   ├── mockData.ts                     # 原始高山滑雪数据模型
│   └── multiSportData.ts               # 多项目数据模型 ⭐
├── utils/
│   ├── chinaSkiPointsCalculatorV4.ts   # 高山滑雪v4.0积分计算
│   ├── multiSportPointsCalculator.ts   # 多项目积分计算引擎 ⭐
│   ├── uSeriesManager.ts               # U系列青少年管理 ⭐
│   └── venueStandardsManager.ts        # 场地标准管理 ⭐
└── types/
    └── multiSport.ts                   # 多项目类型定义
```

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