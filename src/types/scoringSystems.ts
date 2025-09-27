/**
 * 中国滑雪赛事四大积分系统统一类型定义
 * Four Distinct Scoring Systems for Chinese Ski Competitions
 */

// 积分系统类型枚举
export enum ScoringSystemType {
  ALPINE_POINTS = 'ALPINE_POINTS',                     // 高山滑雪积分系统（低分制）
  SNOWBOARD_ALPINE_POINTS = 'SNOWBOARD_ALPINE_POINTS', // 单板平行项目积分系统（低分制）
  SNOWBOARD_RANKING_POINTS = 'SNOWBOARD_RANKING_POINTS', // 单板技巧积分系统（高分制）
  FREESTYLE_RANKING_POINTS = 'FREESTYLE_RANKING_POINTS'  // 自由式技巧积分系统（高分制）
}

// 积分方向（低分越好 vs 高分越好）
export enum PointsDirection {
  LOWER_IS_BETTER = 'LOWER_IS_BETTER',   // 积分越低排名越好
  HIGHER_IS_BETTER = 'HIGHER_IS_BETTER'  // 积分越高排名越好
}

// 积分计算基础类型（时间制 vs 排名制）
export enum CalculationBasis {
  TIME_BASED = 'TIME_BASED',       // 基于时间的积分计算
  RANKING_BASED = 'RANKING_BASED'  // 基于排名的积分分配
}

// 积分聚合方式
export enum PointsAggregation {
  BEST_TWO_AVERAGE = 'BEST_TWO_AVERAGE',     // 最好两次成绩平均值
  BEST_RESULTS_SUM = 'BEST_RESULTS_SUM',     // 最好几次成绩累计
  SINGLE_BEST = 'SINGLE_BEST',               // 单次最好成绩
  WEIGHTED_AVERAGE = 'WEIGHTED_AVERAGE'      // 加权平均
}

// 统一积分系统配置接口
export interface ScoringSystemConfig {
  systemType: ScoringSystemType;
  pointsDirection: PointsDirection;
  calculationBasis: CalculationBasis;
  aggregationMethod: PointsAggregation;

  // 系统特定配置
  systemSpecificConfig: {
    // 高山滑雪 & 单板平行项目（低分制，时间基础）
    timeBasedConfig?: {
      disciplineFactors: { [discipline: string]: number };
      maxPoints: { [discipline: string]: number };
      penaltyCalculation: boolean;
      eventCoefficients: { [level: string]: number };
    };

    // 技巧项目（高分制，排名基础）
    rankingBasedConfig?: {
      pointsCategories: {
        [categoryKey: string]: {
          maxPoints: number;
          distribution: { [rank: number]: number };
        };
      };
      seasonBestCount: number;  // 取赛季最好几次成绩
    };
  };

  // 赛季管理配置
  seasonConfig: {
    continuationRate: number;        // 积分延续比例（如50%）
    seasonCycleMonths: number;       // 赛季周期（月）
    maxHistorySeasons: number;       // 最大保留历史赛季数
  };
}

// 统一积分计算结果接口
export interface UnifiedPointsResult {
  athleteId: string;
  discipline: string;

  // 基础信息
  systemType: ScoringSystemType;
  rank: number;

  // 成绩表现
  performance: {
    timeResult?: number;     // 时间成绩（秒）
    scoreResult?: number;    // 评分成绩
    finalResult: number;     // 最终结果
  };

  // 积分信息
  points: {
    earnedPoints: number;    // 本场获得积分
    seasonPoints?: number;   // 赛季积分
    cumulativePoints?: number; // 累计积分
  };

  // 计算详情
  calculationDetails: {
    baseCalculation: number;   // 基础计算值
    penalties?: number;        // 判罚分（如适用）
    coefficients?: number;     // 系数（如适用）
    categoryMultiplier?: number; // 档次倍数（如适用）
  };

  // 时间戳
  calculatedAt: string;
  competitionDate: string;
}

// 赛季积分总结接口
export interface SeasonPointsSummary {
  athleteId: string;
  discipline: string;
  systemType: ScoringSystemType;
  season: string;

  // 赛季表现
  participatedEvents: number;
  validResults: number;

  // 积分构成
  allResults: {
    competitionId: string;
    points: number;
    rank: number;
    date: string;
  }[];

  // 计算结果
  bestResults: number[];       // 最好成绩列表
  finalSeasonPoints: number;   // 最终赛季积分
  nextSeasonBaseline: number;  // 下赛季基础积分

  // 排名信息
  nationalRanking?: number;
  ageGroupRanking?: number;
  regionalRanking?: number;
}

// 积分系统比较接口
export interface SystemComparison {
  athleteId: string;

  // 各系统积分
  alpinePoints?: number;
  snowboardAlpinePoints?: number;
  snowboardRankingPoints?: number;
  freestyleRankingPoints?: number;

  // 相对排名
  systemRankings: {
    [systemType in ScoringSystemType]?: {
      points: number;
      rank: number;
      percentile: number;
    };
  };

  // 综合评估
  overallPerformance: {
    dominantSystem: ScoringSystemType;
    averagePercentile: number;
    consistencyScore: number;  // 跨系统一致性评分
  };
}

// 项目映射到积分系统
export const DISCIPLINE_TO_SYSTEM_MAP = {
  // 高山滑雪项目 → Alpine Points
  'ALPINE_DH': ScoringSystemType.ALPINE_POINTS,
  'ALPINE_SL': ScoringSystemType.ALPINE_POINTS,
  'ALPINE_GS': ScoringSystemType.ALPINE_POINTS,
  'ALPINE_SG': ScoringSystemType.ALPINE_POINTS,
  'ALPINE_AC': ScoringSystemType.ALPINE_POINTS,

  // 单板平行项目 → Snowboard Alpine Points
  'SNOWBOARD_PSL': ScoringSystemType.SNOWBOARD_ALPINE_POINTS,
  'SNOWBOARD_PGS': ScoringSystemType.SNOWBOARD_ALPINE_POINTS,

  // 单板技巧项目 → Snowboard Ranking Points
  'SNOWBOARD_BA': ScoringSystemType.SNOWBOARD_RANKING_POINTS,
  'SNOWBOARD_SS': ScoringSystemType.SNOWBOARD_RANKING_POINTS,
  'SNOWBOARD_HP': ScoringSystemType.SNOWBOARD_RANKING_POINTS,

  // 自由式项目 → Freestyle Ranking Points
  'FREESTYLE_BA': ScoringSystemType.FREESTYLE_RANKING_POINTS,
  'FREESTYLE_SS': ScoringSystemType.FREESTYLE_RANKING_POINTS,
  'FREESTYLE_HP': ScoringSystemType.FREESTYLE_RANKING_POINTS
} as const;

// 积分系统配置预设
export const SCORING_SYSTEM_CONFIGS: { [key in ScoringSystemType]: ScoringSystemConfig } = {
  [ScoringSystemType.ALPINE_POINTS]: {
    systemType: ScoringSystemType.ALPINE_POINTS,
    pointsDirection: PointsDirection.LOWER_IS_BETTER,
    calculationBasis: CalculationBasis.TIME_BASED,
    aggregationMethod: PointsAggregation.BEST_TWO_AVERAGE,
    systemSpecificConfig: {
      timeBasedConfig: {
        disciplineFactors: {
          'DH': 1250, 'SL': 730, 'GS': 1010, 'SG': 1190, 'AC': 1360
        },
        maxPoints: {
          'DH': 330, 'SL': 165, 'GS': 220, 'SG': 270, 'AC': 270
        },
        penaltyCalculation: true,
        eventCoefficients: { 'A': 1.0, 'B': 0.6, 'C': 0.3 }
      }
    },
    seasonConfig: {
      continuationRate: 0.5,
      seasonCycleMonths: 12,
      maxHistorySeasons: 4
    }
  },

  [ScoringSystemType.SNOWBOARD_ALPINE_POINTS]: {
    systemType: ScoringSystemType.SNOWBOARD_ALPINE_POINTS,
    pointsDirection: PointsDirection.LOWER_IS_BETTER,
    calculationBasis: CalculationBasis.TIME_BASED,
    aggregationMethod: PointsAggregation.BEST_TWO_AVERAGE,
    systemSpecificConfig: {
      timeBasedConfig: {
        disciplineFactors: {
          'PSL': 600, 'PGS': 730  // 平行项目系数（待调整）
        },
        maxPoints: {
          'PSL': 200, 'PGS': 220  // 平行项目最大积分（待调整）
        },
        penaltyCalculation: true,
        eventCoefficients: { 'A': 1.0, 'B': 0.6, 'C': 0.3 }
      }
    },
    seasonConfig: {
      continuationRate: 0.5,
      seasonCycleMonths: 12,
      maxHistorySeasons: 4
    }
  },

  [ScoringSystemType.SNOWBOARD_RANKING_POINTS]: {
    systemType: ScoringSystemType.SNOWBOARD_RANKING_POINTS,
    pointsDirection: PointsDirection.HIGHER_IS_BETTER,
    calculationBasis: CalculationBasis.RANKING_BASED,
    aggregationMethod: PointsAggregation.BEST_RESULTS_SUM,
    systemSpecificConfig: {
      rankingBasedConfig: {
        pointsCategories: {
          'CATEGORY_1': { maxPoints: 360, distribution: {} },
          'CATEGORY_2': { maxPoints: 240, distribution: {} },
          'CATEGORY_3': { maxPoints: 120, distribution: {} }
        },
        seasonBestCount: 5  // 取赛季最好5次成绩累计
      }
    },
    seasonConfig: {
      continuationRate: 0.5,
      seasonCycleMonths: 12,
      maxHistorySeasons: 4
    }
  },

  [ScoringSystemType.FREESTYLE_RANKING_POINTS]: {
    systemType: ScoringSystemType.FREESTYLE_RANKING_POINTS,
    pointsDirection: PointsDirection.HIGHER_IS_BETTER,
    calculationBasis: CalculationBasis.RANKING_BASED,
    aggregationMethod: PointsAggregation.BEST_RESULTS_SUM,
    systemSpecificConfig: {
      rankingBasedConfig: {
        pointsCategories: {
          'CATEGORY_1': { maxPoints: 360, distribution: {} },
          'CATEGORY_2': { maxPoints: 240, distribution: {} },
          'CATEGORY_3': { maxPoints: 120, distribution: {} }
        },
        seasonBestCount: 5  // 取赛季最好5次成绩累计
      }
    },
    seasonConfig: {
      continuationRate: 0.5,
      seasonCycleMonths: 12,
      maxHistorySeasons: 4
    }
  }
};

// 积分系统描述
export const SCORING_SYSTEM_DESCRIPTIONS = {
  [ScoringSystemType.ALPINE_POINTS]: {
    name: '高山滑雪积分系统',
    description: '基于时间的积分计算，积分越低排名越好，赛季取最好两次成绩平均值',
    characteristics: ['时间基础', '低分制', '判罚分机制', '赛事系数']
  },
  [ScoringSystemType.SNOWBOARD_ALPINE_POINTS]: {
    name: '单板滑雪平行项目积分系统',
    description: '类似高山滑雪逻辑，基于时间的积分计算，积分越低越好',
    characteristics: ['时间基础', '低分制', '平行项目专用', '赛事系数']
  },
  [ScoringSystemType.SNOWBOARD_RANKING_POINTS]: {
    name: '单板滑雪技巧项目积分系统',
    description: '基于排名的积分分配，积分越高越好，赛季取最好成绩累计',
    characteristics: ['排名基础', '高分制', '240/360/120分档', '累计积分']
  },
  [ScoringSystemType.FREESTYLE_RANKING_POINTS]: {
    name: '自由式滑雪积分系统',
    description: '基于排名的积分分配，积分越高越好，赛季取最好成绩累计',
    characteristics: ['排名基础', '高分制', '240/360/120分档', '累计积分']
  }
} as const;