/**
 * 中国滑雪赛事积分系统 - 多项目数据模型
 * 支持高山滑雪、自由式滑雪、单板滑雪
 * 基于2025-2026赛季全国BA、SS青少年U系列比赛方案
 */

// 滑雪项目大类
export enum SkiCategory {
  ALPINE = 'ALPINE',           // 高山滑雪
  FREESTYLE = 'FREESTYLE',     // 自由式滑雪
  SNOWBOARD = 'SNOWBOARD'      // 单板滑雪
}

// 具体比赛项目
export enum SkiDiscipline {
  // 高山滑雪项目
  ALPINE_DH = 'ALPINE_DH',     // 高山速降
  ALPINE_SL = 'ALPINE_SL',     // 高山回转
  ALPINE_GS = 'ALPINE_GS',     // 高山大回转
  ALPINE_SG = 'ALPINE_SG',     // 高山超级大回转
  ALPINE_AC = 'ALPINE_AC',     // 高山全能

  // 自由式滑雪项目
  FREESTYLE_BA = 'FREESTYLE_BA',   // 自由式大跳台 (Big Air)
  FREESTYLE_SS = 'FREESTYLE_SS',   // 自由式坡面障碍技巧 (Slopestyle)
  FREESTYLE_HP = 'FREESTYLE_HP',   // 自由式U型场地 (Halfpipe)

  // 单板滑雪项目
  SNOWBOARD_BA = 'SNOWBOARD_BA',   // 单板大跳台 (Big Air)
  SNOWBOARD_SS = 'SNOWBOARD_SS',   // 单板坡面障碍技巧 (Slopestyle)
  SNOWBOARD_HP = 'SNOWBOARD_HP',   // 单板U型场地 (Halfpipe)
  SNOWBOARD_PSL = 'SNOWBOARD_PSL', // 单板平行回转
  SNOWBOARD_PGS = 'SNOWBOARD_PGS'  // 单板平行大回转
}

// 年龄组别（基于文档要求）
export enum AgeGroup {
  U12 = 'U12',         // 8-11岁（2014-2018年出生）
  U15 = 'U15',         // 12-14岁（2011-2013年出生）
  U18 = 'U18',         // 15-17岁（2008-2011年出生）
  ADULT = 'ADULT'      // 18岁以上大众组
}

// 积分档次体系（新的240/360/120分档）
export enum PointsCategory {
  CATEGORY_1 = 'CATEGORY_1',  // 一类赛事：360分档
  CATEGORY_2 = 'CATEGORY_2',  // 二类赛事：240分档
  CATEGORY_3 = 'CATEGORY_3'   // 三类赛事：120分档
}

// 积分分配标准
export const POINTS_DISTRIBUTION = {
  [PointsCategory.CATEGORY_1]: {
    maxPoints: 360,
    distribution: {
      1: 360.000,  // 第一名100%
      2: 288.000,  // 第二名80%
      3: 216.000,  // 第三名60%
      4: 180.000,  // 第四名50%
      5: 162.000,  // 第五名45%
      6: 144.000,  // 第六名40%
      7: 129.600,  // 第七名36%
      8: 115.200,  // 第八名32%
      9: 104.400,  // 第九名29%
      10: 93.600   // 第十名26%
    }
  },
  [PointsCategory.CATEGORY_2]: {
    maxPoints: 240,
    distribution: {
      1: 240.000,
      2: 192.000,
      3: 144.000,
      4: 120.000,
      5: 108.000,
      6: 96.000,
      7: 86.400,
      8: 76.800,
      9: 69.600,
      10: 62.400
    }
  },
  [PointsCategory.CATEGORY_3]: {
    maxPoints: 120,
    distribution: {
      1: 120.000,
      2: 96.000,
      3: 72.000,
      4: 60.000,
      5: 54.000,
      6: 48.000,
      7: 43.200,
      8: 38.400,
      9: 34.800,
      10: 31.200
    }
  }
} as const;

// 场地标准等级
export enum VenueLevel {
  LEVEL_1 = 'LEVEL_1',  // 一级赛事标准
  LEVEL_2 = 'LEVEL_2',  // 二级赛事标准
  LEVEL_3 = 'LEVEL_3'   // 三级赛事标准
}

// 场地技术标准接口
export interface VenueStandard {
  venueLevel: VenueLevel;
  discipline: SkiDiscipline;
  specifications: {
    // 大跳台标准
    bigAir?: {
      approachLength: number;     // 助滑区长度(米)
      approachGradient: number;   // 助滑区坡度(度)
      jumpHeight: number;         // 跳台高度(米)
      takeoffAngle: number;       // 起跳角度(度)
      landingDistance: number;    // 起跳点至落地区距离(米)
      landingGradient: number;    // 落地坡度(度)
      landingWidth: number;       // 落地区宽度(米)
    };

    // 坡面障碍技巧标准
    slopestyle?: {
      verticalDrop: number;       // 垂直落差(米)
      averageGradient: number;    // 平均坡度(度)
      slopeWidth: number;         // 坡面宽度(米)
      obstacleTypes: number;      // 道具类型数量
      minimumObstacles: number;   // 最少障碍数量
    };

    // U型场地标准
    halfpipe?: {
      trackLength: number;        // 赛道长度(米)
      trackDepth: number;         // 赛道深度(米)
      trackWidth: number;         // 场地宽度(米)
      gradient: number;           // 坡度(度)
    };
  };
}

// 扩展的运动员接口（支持多项目）
export interface MultiSportAthlete {
  id: string;
  name: string;
  gender: 'male' | 'female';
  birthDate: string;
  nationality: string;
  fisCode?: string;
  idCardNumber: string;         // 身份证号（系统唯一识别号）

  // 多项目积分记录
  currentPoints: {
    [key in SkiDiscipline]?: number;
  };

  baselinePoints: {             // BL基础积分
    [key in SkiDiscipline]?: number;
  };

  seasonBestPoints: {           // 赛季最好积分
    [key in SkiDiscipline]?: number;
  };

  specialties: SkiDiscipline[]; // 专项
  categories: SkiCategory[];    // 参与的大项
  ageGroup: AgeGroup;          // 年龄组别
  team?: string;
  coach?: string;
  status: 'active' | 'injured' | 'retired' | 'inactive';
  profileImage?: string;
  achievements: string[];
  careerStart: string;

  // 伤病保护相关
  injuryProtection?: {
    status: 'none' | 'applied' | 'approved' | 'expired';
    applicationDate?: string;
    approvalDate?: string;
    expiryDate?: string;
    protectionPercentage?: number; // 增加百分比
  };
}

// 扩展的比赛接口（支持多项目）
export interface MultiSportCompetition {
  id: string;
  name: string;
  category: SkiCategory;
  pointsCategory: PointsCategory;  // 积分档次
  disciplines: SkiDiscipline[];

  // 年龄组设置
  ageGroups: {
    [key in AgeGroup]?: {
      enabled: boolean;
      maxParticipants?: number;
    };
  };

  startDate: string;
  endDate: string;
  location: {
    venue: string;
    country: string;
    city: string;
  };

  // 场地信息
  venueStandards: VenueStandard[];

  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  participants: number;
  organizer: string;

  // 赛事编码和预算
  competitionCode?: string;
  totalBudget?: number;
  prizePool?: {
    first: number;
    second: number;
    third: number;
    participationBonus: number;
    finalsBonus: number;
  };

  resultsPublished: boolean;

  // 比赛格式设置
  competitionFormat: {
    preliminary: {
      rounds: number;
      scoringMethod: 'best' | 'average';
      qualifyingNumber: number; // 进入决赛人数
    };
    finals: {
      rounds: number;
      scoringMethod: 'best' | 'average' | 'combined';
    };
  };
}

// 扩展的成绩接口
export interface MultiSportResult {
  id: string;
  competitionId: string;
  athleteId: string;
  discipline: SkiDiscipline;
  ageGroup: AgeGroup;

  // 根据项目类型区分成绩记录
  performance: {
    // 高山滑雪（基于时间）
    time?: {
      totalTime: string;      // 总时间
      run1Time?: string;      // 第一轮时间
      run2Time?: string;      // 第二轮时间
    };

    // 技巧项目（基于评分）
    scores?: {
      preliminary?: number[]; // 预赛成绩数组
      finals?: number[];      // 决赛成绩数组
      bestScore: number;      // 最好成绩
      totalScore?: number;    // 总分（如适用）
    };
  };

  rank: number;
  points: number;              // 获得积分

  // 比赛状态
  status: 'completed' | 'dnf' | 'dns' | 'dq';
  date: string;

  // 技术信息
  technicalData?: {
    judgeScores?: number[];   // 裁判评分
    difficulty?: number;      // 难度系数
    execution?: number;       // 完成质量
  };
}

// 积分延续机制接口
export interface PointsContinuation {
  athleteId: string;
  discipline: SkiDiscipline;
  previousSeasonPoints: number;
  baselinePoints: number;      // 新赛季基础积分 (上赛季 × 50%)
  currentSeasonPoints?: number;
  calculationDate: string;
}

// 赛季积分历史
export interface SeasonPointsHistory {
  id: string;
  athleteId: string;
  discipline: SkiDiscipline;
  season: string;              // 格式: "2025-2026"

  // 积分记录
  baselinePoints: number;      // BL基础积分
  seasonResults: {
    competitionId: string;
    points: number;
    date: string;
    rank: number;
  }[];

  // 计算结果
  bestTwoAverage?: number;     // 最好两次成绩平均
  finalSeasonPoints: number;   // 赛季最终积分

  updateHistory: {
    date: string;
    points: number;
    reason: string;
  }[];
}

// 赛事站次安排（针对全国巡回赛）
export interface TourEvent {
  id: string;
  tourSeries: string;          // 赛事系列名称
  stationNumber: number;       // 站次
  competition: MultiSportCompetition;

  // 地域覆盖要求
  region: string;              // 地区
  geographicalRequirement: boolean; // 是否满足地域覆盖性要求
}

// 导出统一的数据查询接口
export interface MultiSportDataAPI {
  // 运动员相关
  getAthleteById(id: string): MultiSportAthlete | undefined;
  getAthletesByCategory(category: SkiCategory): MultiSportAthlete[];
  getAthletesByAgeGroup(ageGroup: AgeGroup): MultiSportAthlete[];

  // 比赛相关
  getCompetitionById(id: string): MultiSportCompetition | undefined;
  getCompetitionsByCategory(category: SkiCategory): MultiSportCompetition[];
  getCompetitionsByPointsCategory(pointsCategory: PointsCategory): MultiSportCompetition[];

  // 成绩相关
  getResultsByAthleteId(athleteId: string): MultiSportResult[];
  getResultsByCompetitionId(competitionId: string): MultiSportResult[];
  getResultsByDiscipline(discipline: SkiDiscipline): MultiSportResult[];

  // 积分相关
  getPointsHistoryByAthlete(athleteId: string, discipline: SkiDiscipline): SeasonPointsHistory[];
  calculateSeasonPoints(athleteId: string, discipline: SkiDiscipline): number;

  // 场地标准相关
  getVenueStandard(discipline: SkiDiscipline, level: VenueLevel): VenueStandard | undefined;
}

// 比赛类型映射
export const DISCIPLINE_CATEGORY_MAP = {
  [SkiDiscipline.ALPINE_DH]: SkiCategory.ALPINE,
  [SkiDiscipline.ALPINE_SL]: SkiCategory.ALPINE,
  [SkiDiscipline.ALPINE_GS]: SkiCategory.ALPINE,
  [SkiDiscipline.ALPINE_SG]: SkiCategory.ALPINE,
  [SkiDiscipline.ALPINE_AC]: SkiCategory.ALPINE,

  [SkiDiscipline.FREESTYLE_BA]: SkiCategory.FREESTYLE,
  [SkiDiscipline.FREESTYLE_SS]: SkiCategory.FREESTYLE,
  [SkiDiscipline.FREESTYLE_HP]: SkiCategory.FREESTYLE,

  [SkiDiscipline.SNOWBOARD_BA]: SkiCategory.SNOWBOARD,
  [SkiDiscipline.SNOWBOARD_SS]: SkiCategory.SNOWBOARD,
  [SkiDiscipline.SNOWBOARD_HP]: SkiCategory.SNOWBOARD,
  [SkiDiscipline.SNOWBOARD_PSL]: SkiCategory.SNOWBOARD,
  [SkiDiscipline.SNOWBOARD_PGS]: SkiCategory.SNOWBOARD
} as const;

// 项目中文名称映射
export const DISCIPLINE_NAMES = {
  [SkiDiscipline.ALPINE_DH]: '高山速降',
  [SkiDiscipline.ALPINE_SL]: '高山回转',
  [SkiDiscipline.ALPINE_GS]: '高山大回转',
  [SkiDiscipline.ALPINE_SG]: '高山超级大回转',
  [SkiDiscipline.ALPINE_AC]: '高山全能',

  [SkiDiscipline.FREESTYLE_BA]: '自由式大跳台',
  [SkiDiscipline.FREESTYLE_SS]: '自由式坡面障碍技巧',
  [SkiDiscipline.FREESTYLE_HP]: '自由式U型场地',

  [SkiDiscipline.SNOWBOARD_BA]: '单板大跳台',
  [SkiDiscipline.SNOWBOARD_SS]: '单板坡面障碍技巧',
  [SkiDiscipline.SNOWBOARD_HP]: '单板U型场地',
  [SkiDiscipline.SNOWBOARD_PSL]: '单板平行回转',
  [SkiDiscipline.SNOWBOARD_PGS]: '单板平行大回转'
} as const;

// 年龄组中文名称
export const AGE_GROUP_NAMES = {
  [AgeGroup.U12]: 'U12组 (8-11岁)',
  [AgeGroup.U15]: 'U15组 (12-14岁)',
  [AgeGroup.U18]: 'U18组 (15-17岁)',
  [AgeGroup.ADULT]: '大众组 (18岁以上)'
} as const;