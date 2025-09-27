/**
 * 高山滑雪积分系统 (Alpine Points System)
 * 特点：积分越低越好，赛季取最好两次成绩平均值
 * 基于中国高山滑雪赛事积分规则v4.0
 */

import { ChinaSkiPointsCalculatorV4, EventLevel, DISCIPLINE_FACTORS_V4, MAX_POINTS_V4 } from './chinaSkiPointsCalculatorV4';
import { ScoringSystemType, UnifiedPointsResult, SeasonPointsSummary } from '../types/scoringSystems';

// 高山滑雪项目枚举
export enum AlpineDiscipline {
  DH = 'DH',    // 速降
  SL = 'SL',    // 回转
  GS = 'GS',    // 大回转
  SG = 'SG',    // 超级大回转
  AC = 'AC'     // 全能
}

// 高山滑雪比赛数据接口
export interface AlpineRaceData {
  athleteId: string;
  discipline: AlpineDiscipline;
  competitionId: string;
  competitionDate: string;

  // 时间成绩
  athleteTime: number;      // 运动员用时（秒）
  winnerTime: number;       // 冠军用时（秒）

  // 比赛配置
  eventLevel: EventLevel;   // 赛事级别

  // 判罚分计算数据（可选）
  penaltyData?: {
    top10Best5Points: number[];      // 前10名中最好5名的积分
    allBest5Points: number[];        // 所有参赛选手中最好5名的积分
    allBest5RacePoints: number[];    // 对应的5名选手的基础比赛积分
  };

  // 其他信息
  rank?: number;
  weatherConditions?: string;
  courseConditions?: string;
}

// 高山滑雪赛季数据接口
export interface AlpineSeasonData {
  athleteId: string;
  discipline: AlpineDiscipline;
  season: string;              // 格式: "2025-2026"
  baselinePoints?: number;     // BL基础积分
  races: AlpineRaceData[];
}

// 高山滑雪积分计算结果
export interface AlpinePointsResult extends UnifiedPointsResult {
  systemType: ScoringSystemType.ALPINE_POINTS;
  alpineSpecific: {
    baseRacePoints: number;     // 基础比赛积分
    penalty: number;            // 判罚分
    eventCoefficient: number;   // 赛事系数
    disciplineFactor: number;   // 项目系数
  };
}

export class AlpinePointsSystem {
  private calculator: ChinaSkiPointsCalculatorV4;

  constructor() {
    this.calculator = new ChinaSkiPointsCalculatorV4();
  }

  /**
   * 计算单场高山滑雪比赛积分
   */
  calculateRacePoints(raceData: AlpineRaceData): AlpinePointsResult {
    // 验证数据
    this.validateRaceData(raceData);

    // 计算基础比赛积分
    const baseRacePoints = this.calculator.calculateBaseRacePoints(
      raceData.athleteTime,
      raceData.winnerTime,
      raceData.discipline
    );

    // 计算判罚分
    let penalty = 0;
    if (raceData.penaltyData) {
      penalty = this.calculator.calculatePenalty(
        raceData.penaltyData.top10Best5Points,
        raceData.penaltyData.allBest5Points,
        raceData.penaltyData.allBest5RacePoints
      );
    }

    // 计算最终积分
    const calculation = this.calculator.calculateSimplifiedPoints(
      raceData.athleteTime,
      raceData.winnerTime,
      raceData.discipline,
      raceData.eventLevel,
      penalty
    );

    return {
      athleteId: raceData.athleteId,
      discipline: `ALPINE_${raceData.discipline}`,
      systemType: ScoringSystemType.ALPINE_POINTS,
      rank: raceData.rank || 0,
      performance: {
        timeResult: raceData.athleteTime,
        finalResult: calculation.finalPoints
      },
      points: {
        earnedPoints: calculation.finalPoints
      },
      calculationDetails: {
        baseCalculation: baseRacePoints,
        penalties: penalty,
        coefficients: calculation.eventCoefficient
      },
      calculatedAt: new Date().toISOString(),
      competitionDate: raceData.competitionDate,
      alpineSpecific: {
        baseRacePoints: calculation.baseRacePoints,
        penalty: calculation.penalty,
        eventCoefficient: calculation.eventCoefficient,
        disciplineFactor: DISCIPLINE_FACTORS_V4[raceData.discipline]
      }
    };
  }

  /**
   * 计算高山滑雪赛季积分
   * 特点：取最好两次成绩的平均值
   */
  calculateSeasonPoints(seasonData: AlpineSeasonData): SeasonPointsSummary {
    // 计算所有比赛的积分
    const raceResults = seasonData.races.map(race => {
      const result = this.calculateRacePoints(race);
      return {
        competitionId: race.competitionId,
        points: result.points.earnedPoints,
        rank: result.rank,
        date: race.competitionDate
      };
    });

    // 按积分排序（积分越低越好）
    const sortedResults = raceResults
      .map(r => r.points)
      .sort((a, b) => a - b);

    let finalSeasonPoints: number;
    let bestTwoResults: number[];

    if (sortedResults.length === 0) {
      // 无参赛记录，使用基础积分
      finalSeasonPoints = seasonData.baselinePoints || this.getMaxPoints(seasonData.discipline);
      bestTwoResults = [];
    } else if (sortedResults.length === 1) {
      // 只有一次成绩，与基础积分平均
      const baselinePoints = seasonData.baselinePoints || this.getMaxPoints(seasonData.discipline);
      finalSeasonPoints = (sortedResults[0] + baselinePoints) / 2;
      bestTwoResults = [sortedResults[0], baselinePoints];
    } else {
      // 取最好（最低）两次成绩平均
      bestTwoResults = sortedResults.slice(0, 2);
      finalSeasonPoints = (bestTwoResults[0] + bestTwoResults[1]) / 2;

      // 如果平均分优于基础积分，则更新
      if (seasonData.baselinePoints && finalSeasonPoints > seasonData.baselinePoints) {
        finalSeasonPoints = seasonData.baselinePoints;
      }
    }

    // 计算下赛季基础积分（当前积分 × 50%）
    const nextSeasonBaseline = finalSeasonPoints * 0.5;

    return {
      athleteId: seasonData.athleteId,
      discipline: `ALPINE_${seasonData.discipline}`,
      systemType: ScoringSystemType.ALPINE_POINTS,
      season: seasonData.season,
      participatedEvents: seasonData.races.length,
      validResults: raceResults.filter(r => r.points > 0).length,
      allResults: raceResults,
      bestResults: bestTwoResults,
      finalSeasonPoints: Math.round(finalSeasonPoints * 100) / 100,
      nextSeasonBaseline: Math.round(nextSeasonBaseline * 100) / 100
    };
  }

  /**
   * 批量计算多个运动员的比赛积分
   */
  calculateBatchRacePoints(raceDataList: AlpineRaceData[]): AlpinePointsResult[] {
    return raceDataList.map(raceData => this.calculateRacePoints(raceData));
  }

  /**
   * 计算比赛中所有运动员的积分并排名
   */
  calculateRaceRanking(
    raceDataList: AlpineRaceData[],
    addRankInfo: boolean = true
  ): AlpinePointsResult[] {
    // 按时间排序确定排名
    const sortedRaces = [...raceDataList].sort((a, b) => a.athleteTime - b.athleteTime);

    if (addRankInfo) {
      sortedRaces.forEach((race, index) => {
        race.rank = index + 1;
      });
    }

    // 计算积分
    const results = this.calculateBatchRacePoints(sortedRaces);

    // 按积分排序（积分越低排名越好）
    return results.sort((a, b) => a.points.earnedPoints - b.points.earnedPoints);
  }

  /**
   * 获取项目最大积分值
   */
  getMaxPoints(discipline: AlpineDiscipline): number {
    return MAX_POINTS_V4[discipline];
  }

  /**
   * 获取项目系数
   */
  getDisciplineFactor(discipline: AlpineDiscipline): number {
    return DISCIPLINE_FACTORS_V4[discipline];
  }

  /**
   * 验证积分有效性
   */
  isValidPoints(points: number, discipline: AlpineDiscipline): boolean {
    return this.calculator.isValidPoints(points, discipline);
  }

  /**
   * 计算积分改进所需时间
   * 返回为了获得目标积分需要改进的时间（秒）
   */
  calculateTimeImprovementNeeded(
    currentTime: number,
    winnerTime: number,
    targetPoints: number,
    discipline: AlpineDiscipline,
    eventLevel: EventLevel
  ): number {
    const factor = DISCIPLINE_FACTORS_V4[discipline];
    const coefficient = { [EventLevel.A]: 1.0, [EventLevel.B]: 0.6, [EventLevel.C]: 0.3 }[eventLevel];

    // 反向计算：根据目标积分计算需要的时间比例
    const requiredRatio = (targetPoints / coefficient) / factor + 1;
    const requiredTime = winnerTime * requiredRatio;

    return Math.max(0, currentTime - requiredTime);
  }

  /**
   * 积分变化趋势分析
   */
  analyzePointsTrend(
    seasonData: AlpineSeasonData
  ): {
    trend: 'improving' | 'declining' | 'stable';
    averageChange: number;
    bestImprovement: number;
    worstDecline: number;
    consistency: number;  // 一致性评分 (0-1)
  } {
    const results = seasonData.races.map(race => this.calculateRacePoints(race));
    const points = results.map(r => r.points.earnedPoints);

    if (points.length < 2) {
      return {
        trend: 'stable',
        averageChange: 0,
        bestImprovement: 0,
        worstDecline: 0,
        consistency: 1
      };
    }

    // 计算相邻比赛间的变化
    const changes = [];
    for (let i = 1; i < points.length; i++) {
      changes.push(points[i-1] - points[i]); // 积分下降为正值（改进）
    }

    const averageChange = changes.reduce((sum, change) => sum + change, 0) / changes.length;
    const bestImprovement = Math.max(...changes, 0);
    const worstDecline = Math.min(...changes, 0);

    // 计算一致性（标准差的倒数）
    const mean = points.reduce((sum, p) => sum + p, 0) / points.length;
    const variance = points.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) / points.length;
    const consistency = 1 / (1 + Math.sqrt(variance) / mean);

    let trend: 'improving' | 'declining' | 'stable';
    if (averageChange > 2) trend = 'improving';
    else if (averageChange < -2) trend = 'declining';
    else trend = 'stable';

    return {
      trend,
      averageChange: Math.round(averageChange * 100) / 100,
      bestImprovement: Math.round(bestImprovement * 100) / 100,
      worstDecline: Math.round(worstDecline * 100) / 100,
      consistency: Math.round(consistency * 100) / 100
    };
  }

  /**
   * 生成积分报告
   */
  generatePointsReport(
    seasonData: AlpineSeasonData
  ): {
    summary: SeasonPointsSummary;
    trend: ReturnType<AlpinePointsSystem['analyzePointsTrend']>;
    recommendations: string[];
  } {
    const summary = this.calculateSeasonPoints(seasonData);
    const trend = this.analyzePointsTrend(seasonData);

    const recommendations: string[] = [];

    // 基于表现给出建议
    if (trend.trend === 'improving') {
      recommendations.push('积分持续改善，保持当前训练强度');
    } else if (trend.trend === 'declining') {
      recommendations.push('积分有下降趋势，建议检查训练方法和比赛策略');
    }

    if (trend.consistency < 0.7) {
      recommendations.push('比赛表现不够稳定，建议加强一致性训练');
    }

    if (summary.participatedEvents < 5) {
      recommendations.push('参赛次数较少，建议增加比赛经验');
    }

    return {
      summary,
      trend,
      recommendations
    };
  }

  // 私有辅助方法

  private validateRaceData(raceData: AlpineRaceData): void {
    if (!raceData.athleteId) {
      throw new Error('缺少运动员ID');
    }
    if (!raceData.athleteTime || raceData.athleteTime <= 0) {
      throw new Error('无效的运动员时间');
    }
    if (!raceData.winnerTime || raceData.winnerTime <= 0) {
      throw new Error('无效的冠军时间');
    }
    if (raceData.athleteTime < raceData.winnerTime) {
      throw new Error('运动员时间不能小于冠军时间');
    }
    if (!Object.values(AlpineDiscipline).includes(raceData.discipline)) {
      throw new Error('无效的高山滑雪项目');
    }
    if (!Object.values(EventLevel).includes(raceData.eventLevel)) {
      throw new Error('无效的赛事级别');
    }
  }
}

// 导出单例实例
export const alpinePointsSystem = new AlpinePointsSystem();

// 导出便捷工具函数
export const AlpinePointsUtils = {
  /**
   * 快速计算积分
   */
  quickCalculate: (
    athleteTime: number,
    winnerTime: number,
    discipline: AlpineDiscipline,
    eventLevel: EventLevel = EventLevel.B
  ) => {
    const raceData: AlpineRaceData = {
      athleteId: 'temp',
      discipline,
      competitionId: 'temp',
      competitionDate: new Date().toISOString().split('T')[0],
      athleteTime,
      winnerTime,
      eventLevel
    };

    return alpinePointsSystem.calculateRacePoints(raceData);
  },

  /**
   * 获取所有高山滑雪项目
   */
  getAllDisciplines: () => Object.values(AlpineDiscipline),

  /**
   * 获取项目中文名称
   */
  getDisciplineName: (discipline: AlpineDiscipline) => {
    const names = {
      [AlpineDiscipline.DH]: '速降',
      [AlpineDiscipline.SL]: '回转',
      [AlpineDiscipline.GS]: '大回转',
      [AlpineDiscipline.SG]: '超级大回转',
      [AlpineDiscipline.AC]: '全能'
    };
    return names[discipline];
  },

  /**
   * 计算两个时间的积分差
   */
  calculatePointsDifference: (
    time1: number,
    time2: number,
    winnerTime: number,
    discipline: AlpineDiscipline,
    eventLevel: EventLevel = EventLevel.B
  ) => {
    const points1 = AlpinePointsUtils.quickCalculate(time1, winnerTime, discipline, eventLevel);
    const points2 = AlpinePointsUtils.quickCalculate(time2, winnerTime, discipline, eventLevel);

    return {
      difference: points1.points.earnedPoints - points2.points.earnedPoints,
      betterPerformance: points1.points.earnedPoints < points2.points.earnedPoints ? 'time1' : 'time2'
    };
  }
};