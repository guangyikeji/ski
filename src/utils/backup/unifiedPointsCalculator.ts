/**
 * 中国滑雪赛事积分系统 - 四大积分系统统一计算引擎
 * Unified Points Calculator for Four Distinct Scoring Systems
 */

import {
  ScoringSystemType,
  PointsDirection,
  CalculationBasis,
  UnifiedPointsResult,
  SeasonPointsSummary,
  DISCIPLINE_TO_SYSTEM_MAP,
  SCORING_SYSTEM_CONFIGS
} from '../types/scoringSystems';

// 高山滑雪积分计算器 (已有)
import { ChinaSkiPointsCalculatorV4, EventLevel } from './chinaSkiPointsCalculatorV4';

// 多项目积分计算器 (已有)
import { MultiSportPointsCalculator } from './multiSportPointsCalculator';
import { PointsCategory } from '../data/multiSportData';

// 运动员基础信息接口
export interface AthletePerformance {
  athleteId: string;
  discipline: string;
  competitionId: string;
  competitionDate: string;

  // 成绩数据
  timeResult?: number;      // 时间成绩（秒）
  scoreResult?: number;     // 评分成绩
  rank?: number;           // 排名

  // 比赛配置
  eventLevel?: string;      // 赛事级别 (A/B/C)
  pointsCategory?: string;  // 积分档次 (CATEGORY_1/2/3)
  winnerTime?: number;      // 冠军时间（用于时间制项目）

  // 判罚分计算数据（高山滑雪专用）
  penaltyData?: {
    top10Best5Points: number[];
    allBest5Points: number[];
    allBest5RacePoints: number[];
  };
}

// 赛季数据接口
export interface SeasonData {
  athleteId: string;
  discipline: string;
  season: string;
  results: AthletePerformance[];
  baselinePoints?: number;  // 基础积分
}

export class UnifiedPointsCalculator {
  private alpineCalculator: ChinaSkiPointsCalculatorV4;
  private multiSportCalculator: MultiSportPointsCalculator;

  constructor() {
    this.alpineCalculator = new ChinaSkiPointsCalculatorV4();
    this.multiSportCalculator = new MultiSportPointsCalculator();
  }

  /**
   * 统一积分计算入口
   * 根据项目自动选择对应的积分系统
   */
  calculatePoints(performance: AthletePerformance): UnifiedPointsResult {
    const systemType = this.determineSystemType(performance.discipline);

    switch (systemType) {
      case ScoringSystemType.ALPINE_POINTS:
        return this.calculateAlpinePoints(performance);

      case ScoringSystemType.SNOWBOARD_ALPINE_POINTS:
        return this.calculateSnowboardAlpinePoints(performance);

      case ScoringSystemType.SNOWBOARD_RANKING_POINTS:
        return this.calculateSnowboardRankingPoints(performance);

      case ScoringSystemType.FREESTYLE_RANKING_POINTS:
        return this.calculateFreestyleRankingPoints(performance);

      default:
        throw new Error(`Unsupported discipline: ${performance.discipline}`);
    }
  }

  /**
   * 1. 高山滑雪积分系统 (Alpine Points)
   * 特点：积分越低越好，赛季取最好两次成绩平均值
   */
  private calculateAlpinePoints(performance: AthletePerformance): UnifiedPointsResult {
    if (!performance.timeResult || !performance.winnerTime) {
      throw new Error('Alpine skiing requires time results');
    }

    const disciplineMap: { [key: string]: string } = {
      'ALPINE_DH': 'DH', 'ALPINE_SL': 'SL', 'ALPINE_GS': 'GS',
      'ALPINE_SG': 'SG', 'ALPINE_AC': 'AC'
    };

    const discipline = disciplineMap[performance.discipline];
    const eventLevel = (performance.eventLevel as EventLevel) || EventLevel.B;

    // 计算基础比赛积分
    const baseRacePoints = this.alpineCalculator.calculateBaseRacePoints(
      performance.timeResult,
      performance.winnerTime,
      discipline as keyof typeof import('./chinaSkiPointsCalculatorV4').DISCIPLINE_FACTORS_V4
    );

    // 计算判罚分（如果有数据）
    let penalty = 0;
    if (performance.penaltyData) {
      penalty = this.alpineCalculator.calculatePenalty(
        performance.penaltyData.top10Best5Points,
        performance.penaltyData.allBest5Points,
        performance.penaltyData.allBest5RacePoints
      );
    }

    // 计算最终积分
    const finalResult = this.alpineCalculator.calculateSimplifiedPoints(
      performance.timeResult,
      performance.winnerTime,
      discipline as keyof typeof import('./chinaSkiPointsCalculatorV4').DISCIPLINE_FACTORS_V4,
      eventLevel,
      penalty
    );

    return {
      athleteId: performance.athleteId,
      discipline: performance.discipline,
      systemType: ScoringSystemType.ALPINE_POINTS,
      rank: performance.rank || 0,
      performance: {
        timeResult: performance.timeResult,
        finalResult: finalResult.finalPoints
      },
      points: {
        earnedPoints: finalResult.finalPoints
      },
      calculationDetails: {
        baseCalculation: baseRacePoints,
        penalties: penalty,
        coefficients: finalResult.eventCoefficient
      },
      calculatedAt: new Date().toISOString(),
      competitionDate: performance.competitionDate
    };
  }

  /**
   * 2. 单板滑雪平行项目积分系统 (Snowboard Alpine Points)
   * 特点：类似高山滑雪，积分越低越好
   */
  private calculateSnowboardAlpinePoints(performance: AthletePerformance): UnifiedPointsResult {
    if (!performance.timeResult || !performance.winnerTime) {
      throw new Error('Snowboard alpine requires time results');
    }

    // 使用修改后的系数计算平行项目积分
    const disciplineFactors = {
      'SNOWBOARD_PSL': 600,  // 平行回转
      'SNOWBOARD_PGS': 730   // 平行大回转
    };

    const factor = disciplineFactors[performance.discipline as keyof typeof disciplineFactors] || 600;
    const basePoints = factor * (performance.timeResult / performance.winnerTime - 1);

    // 应用赛事系数
    const eventCoefficients = { 'A': 1.0, 'B': 0.6, 'C': 0.3 };
    const coefficient = eventCoefficients[performance.eventLevel as keyof typeof eventCoefficients] || 0.6;
    const finalPoints = basePoints * coefficient;

    return {
      athleteId: performance.athleteId,
      discipline: performance.discipline,
      systemType: ScoringSystemType.SNOWBOARD_ALPINE_POINTS,
      rank: performance.rank || 0,
      performance: {
        timeResult: performance.timeResult,
        finalResult: Math.round(finalPoints * 100) / 100
      },
      points: {
        earnedPoints: Math.round(finalPoints * 100) / 100
      },
      calculationDetails: {
        baseCalculation: Math.round(basePoints * 100) / 100,
        coefficients: coefficient
      },
      calculatedAt: new Date().toISOString(),
      competitionDate: performance.competitionDate
    };
  }

  /**
   * 3. 单板滑雪技巧项目积分系统 (Snowboard Ranking Points)
   * 特点：积分越高越好，赛季取最好成绩累计
   */
  private calculateSnowboardRankingPoints(performance: AthletePerformance): UnifiedPointsResult {
    if (!performance.rank) {
      throw new Error('Snowboard ranking system requires rank information');
    }

    const pointsCategory = this.mapPointsCategory(performance.pointsCategory);
    const earnedPoints = this.calculateRankingBasedPoints(performance.rank, pointsCategory);

    return {
      athleteId: performance.athleteId,
      discipline: performance.discipline,
      systemType: ScoringSystemType.SNOWBOARD_RANKING_POINTS,
      rank: performance.rank,
      performance: {
        scoreResult: performance.scoreResult,
        finalResult: earnedPoints
      },
      points: {
        earnedPoints
      },
      calculationDetails: {
        baseCalculation: earnedPoints,
        categoryMultiplier: this.getCategoryMultiplier(pointsCategory)
      },
      calculatedAt: new Date().toISOString(),
      competitionDate: performance.competitionDate
    };
  }

  /**
   * 4. 自由式滑雪积分系统 (Freestyle Ranking Points)
   * 特点：积分越高越好，赛季取最好成绩累计
   */
  private calculateFreestyleRankingPoints(performance: AthletePerformance): UnifiedPointsResult {
    if (!performance.rank) {
      throw new Error('Freestyle ranking system requires rank information');
    }

    const pointsCategory = this.mapPointsCategory(performance.pointsCategory);
    const earnedPoints = this.calculateRankingBasedPoints(performance.rank, pointsCategory);

    return {
      athleteId: performance.athleteId,
      discipline: performance.discipline,
      systemType: ScoringSystemType.FREESTYLE_RANKING_POINTS,
      rank: performance.rank,
      performance: {
        scoreResult: performance.scoreResult,
        finalResult: earnedPoints
      },
      points: {
        earnedPoints
      },
      calculationDetails: {
        baseCalculation: earnedPoints,
        categoryMultiplier: this.getCategoryMultiplier(pointsCategory)
      },
      calculatedAt: new Date().toISOString(),
      competitionDate: performance.competitionDate
    };
  }

  /**
   * 赛季积分计算
   * 根据不同积分系统的特点进行赛季积分汇总
   */
  calculateSeasonPoints(seasonData: SeasonData): SeasonPointsSummary {
    const systemType = this.determineSystemType(seasonData.discipline);
    const config = SCORING_SYSTEM_CONFIGS[systemType];

    // 计算所有比赛的积分
    const allResults = seasonData.results.map(result => {
      const pointsResult = this.calculatePoints(result);
      return {
        competitionId: result.competitionId,
        points: pointsResult.points.earnedPoints,
        rank: pointsResult.rank,
        date: result.competitionDate
      };
    });

    let finalSeasonPoints: number;
    let bestResults: number[];

    // 根据积分系统特点计算赛季积分
    if (config.pointsDirection === PointsDirection.LOWER_IS_BETTER) {
      // 低分制：取最好（最低）两次成绩平均值
      const sortedResults = allResults
        .map(r => r.points)
        .sort((a, b) => a - b)
        .slice(0, 2);

      bestResults = sortedResults;

      if (sortedResults.length === 0) {
        finalSeasonPoints = seasonData.baselinePoints || 999;
      } else if (sortedResults.length === 1) {
        finalSeasonPoints = (sortedResults[0] + (seasonData.baselinePoints || 999)) / 2;
      } else {
        finalSeasonPoints = (sortedResults[0] + sortedResults[1]) / 2;
      }
    } else {
      // 高分制：取最好（最高）成绩累计
      const sortedResults = allResults
        .map(r => r.points)
        .sort((a, b) => b - a)
        .slice(0, config.systemSpecificConfig.rankingBasedConfig?.seasonBestCount || 5);

      bestResults = sortedResults;
      finalSeasonPoints = sortedResults.reduce((sum, points) => sum + points, 0);
    }

    // 计算下赛季基础积分
    const nextSeasonBaseline = finalSeasonPoints * config.seasonConfig.continuationRate;

    return {
      athleteId: seasonData.athleteId,
      discipline: seasonData.discipline,
      systemType,
      season: seasonData.season,
      participatedEvents: seasonData.results.length,
      validResults: allResults.filter(r => r.points > 0).length,
      allResults,
      bestResults,
      finalSeasonPoints: Math.round(finalSeasonPoints * 100) / 100,
      nextSeasonBaseline: Math.round(nextSeasonBaseline * 100) / 100
    };
  }

  /**
   * 批量计算多个运动员的积分
   */
  calculateBatchPoints(performances: AthletePerformance[]): UnifiedPointsResult[] {
    return performances.map(performance => this.calculatePoints(performance));
  }

  /**
   * 积分系统比较分析
   */
  comparePointsAcrossSystems(
    athleteId: string,
    seasonData: { [discipline: string]: SeasonData }
  ) {
    const systemResults: { [key in ScoringSystemType]?: SeasonPointsSummary } = {};

    // 按系统分组计算
    Object.values(seasonData).forEach(data => {
      const systemType = this.determineSystemType(data.discipline);
      const seasonSummary = this.calculateSeasonPoints(data);
      systemResults[systemType] = seasonSummary;
    });

    return systemResults;
  }

  // 辅助方法

  private determineSystemType(discipline: string): ScoringSystemType {
    return DISCIPLINE_TO_SYSTEM_MAP[discipline as keyof typeof DISCIPLINE_TO_SYSTEM_MAP]
      || ScoringSystemType.ALPINE_POINTS;
  }

  private mapPointsCategory(category?: string): PointsCategory {
    const mapping = {
      'CATEGORY_1': PointsCategory.CATEGORY_1,
      'CATEGORY_2': PointsCategory.CATEGORY_2,
      'CATEGORY_3': PointsCategory.CATEGORY_3
    };
    return mapping[category as keyof typeof mapping] || PointsCategory.CATEGORY_2;
  }

  private calculateRankingBasedPoints(rank: number, category: PointsCategory): number {
    // 使用现有的多项目积分计算器
    return this.multiSportCalculator['calculateIndividualPoints'](rank, category);
  }

  private getCategoryMultiplier(category: PointsCategory): number {
    const multipliers = {
      [PointsCategory.CATEGORY_1]: 360,
      [PointsCategory.CATEGORY_2]: 240,
      [PointsCategory.CATEGORY_3]: 120
    };
    return multipliers[category];
  }

  /**
   * 获取积分系统信息
   */
  getSystemInfo(discipline: string) {
    const systemType = this.determineSystemType(discipline);
    const config = SCORING_SYSTEM_CONFIGS[systemType];

    return {
      systemType,
      pointsDirection: config.pointsDirection,
      calculationBasis: config.calculationBasis,
      aggregationMethod: config.aggregationMethod,
      isLowerBetter: config.pointsDirection === PointsDirection.LOWER_IS_BETTER
    };
  }

  /**
   * 验证成绩数据完整性
   */
  validatePerformanceData(performance: AthletePerformance): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const systemType = this.determineSystemType(performance.discipline);
    const config = SCORING_SYSTEM_CONFIGS[systemType];

    // 基础字段验证
    if (!performance.athleteId) errors.push('缺少运动员ID');
    if (!performance.discipline) errors.push('缺少项目信息');
    if (!performance.competitionDate) errors.push('缺少比赛日期');

    // 系统特定验证
    if (config.calculationBasis === CalculationBasis.TIME_BASED) {
      if (!performance.timeResult) errors.push('基于时间的项目需要时间成绩');
      if (!performance.winnerTime) errors.push('基于时间的项目需要冠军时间');
    }

    if (config.calculationBasis === CalculationBasis.RANKING_BASED) {
      if (!performance.rank) errors.push('基于排名的项目需要排名信息');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// 导出单例实例
export const unifiedPointsCalculator = new UnifiedPointsCalculator();

// 导出便捷工具函数
export const PointsCalculatorToolkit = {
  /**
   * 快速计算单场比赛积分
   */
  quickCalculate: (performance: AthletePerformance) => {
    return unifiedPointsCalculator.calculatePoints(performance);
  },

  /**
   * 获取项目对应的积分系统类型
   */
  getSystemType: (discipline: string) => {
    return unifiedPointsCalculator['determineSystemType'](discipline);
  },

  /**
   * 判断积分系统是否为低分制
   */
  isLowerBetterSystem: (discipline: string) => {
    const systemType = unifiedPointsCalculator['determineSystemType'](discipline);
    const config = SCORING_SYSTEM_CONFIGS[systemType];
    return config.pointsDirection === PointsDirection.LOWER_IS_BETTER;
  },

  /**
   * 验证成绩数据
   */
  validateData: (performance: AthletePerformance) => {
    return unifiedPointsCalculator.validatePerformanceData(performance);
  },

  /**
   * 获取系统描述信息
   */
  getSystemDescription: (discipline: string) => {
    const systemType = unifiedPointsCalculator['determineSystemType'](discipline);
    return SCORING_SYSTEM_CONFIGS[systemType];
  }
};