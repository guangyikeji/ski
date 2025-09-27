/**
 * 单板滑雪平行项目积分系统 (Snowboard Alpine Points System)
 * 特点：类似高山滑雪逻辑，积分越低越好，基于时间计算
 * 适用项目：平行回转(PSL)、平行大回转(PGS)
 */

import { EventLevel } from './chinaSkiPointsCalculatorV4';
import { ScoringSystemType, UnifiedPointsResult, SeasonPointsSummary } from '../types/scoringSystems';

// 单板平行项目枚举
export enum SnowboardParallelDiscipline {
  PSL = 'PSL',    // 平行回转 (Parallel Slalom)
  PGS = 'PGS'     // 平行大回转 (Parallel Giant Slalom)
}

// 单板平行项目系数
export const SNOWBOARD_PARALLEL_FACTORS = {
  [SnowboardParallelDiscipline.PSL]: 600,   // 平行回转系数
  [SnowboardParallelDiscipline.PGS]: 730    // 平行大回转系数
} as const;

// 单板平行项目最大积分值
export const SNOWBOARD_PARALLEL_MAX_POINTS = {
  [SnowboardParallelDiscipline.PSL]: 200,   // 平行回转最大积分
  [SnowboardParallelDiscipline.PGS]: 220    // 平行大回转最大积分
} as const;

// 赛事系数（与高山滑雪相同）
export const SNOWBOARD_EVENT_COEFFICIENTS = {
  [EventLevel.A]: 1.0,   // A级赛事
  [EventLevel.B]: 0.6,   // B级赛事
  [EventLevel.C]: 0.3    // C级赛事
} as const;

// 单板平行比赛数据接口
export interface SnowboardParallelRaceData {
  athleteId: string;
  discipline: SnowboardParallelDiscipline;
  competitionId: string;
  competitionDate: string;

  // 时间成绩
  athleteTime: number;      // 运动员用时（秒）
  winnerTime: number;       // 冠军用时（秒）

  // 比赛配置
  eventLevel: EventLevel;   // 赛事级别

  // 判罚分计算数据（可选，简化版可不使用）
  penaltyData?: {
    top10Best5Points: number[];      // 前10名中最好5名的积分
    allBest5Points: number[];        // 所有参赛选手中最好5名的积分
    allBest5RacePoints: number[];    // 对应的5名选手的基础比赛积分
  };

  // 其他信息
  rank?: number;
  eliminationRound?: string;    // 淘汰轮次（如16强、8强等）
  courseConditions?: string;
}

// 单板平行赛季数据接口
export interface SnowboardParallelSeasonData {
  athleteId: string;
  discipline: SnowboardParallelDiscipline;
  season: string;              // 格式: "2025-2026"
  baselinePoints?: number;     // BL基础积分
  races: SnowboardParallelRaceData[];
}

// 单板平行积分计算结果
export interface SnowboardParallelPointsResult extends UnifiedPointsResult {
  systemType: ScoringSystemType.SNOWBOARD_ALPINE_POINTS;
  snowboardParallelSpecific: {
    baseRacePoints: number;     // 基础比赛积分
    penalty: number;            // 判罚分
    eventCoefficient: number;   // 赛事系数
    disciplineFactor: number;   // 项目系数
  };
}

export class SnowboardAlpinePointsSystem {

  /**
   * 计算基础比赛积分
   * 公式：P = F × (Tx/To - 1)
   */
  calculateBaseRacePoints(
    athleteTime: number,
    winnerTime: number,
    discipline: SnowboardParallelDiscipline
  ): number {
    const factor = SNOWBOARD_PARALLEL_FACTORS[discipline];
    const basePoints = factor * (athleteTime / winnerTime - 1);
    return Math.round(basePoints * 100) / 100;
  }

  /**
   * 计算判罚分（简化版）
   * 单板平行项目可以使用简化的判罚分计算
   */
  calculatePenalty(
    top10Best5Points?: number[],
    allBest5Points?: number[],
    allBest5RacePoints?: number[]
  ): number {
    // 如果没有足够数据，返回0
    if (!top10Best5Points || !allBest5Points || !allBest5RacePoints ||
        top10Best5Points.length < 5 || allBest5Points.length < 5 || allBest5RacePoints.length < 5) {
      return 0;
    }

    const sumA = top10Best5Points.slice(0, 5).reduce((sum, points) => sum + points, 0);
    const sumB = allBest5Points.slice(0, 5).reduce((sum, points) => sum + points, 0);
    const sumC = allBest5RacePoints.slice(0, 5).reduce((sum, points) => sum + points, 0);

    const penalty = (sumA + sumB - sumC) / 10;
    return Math.round(penalty * 100) / 100;
  }

  /**
   * 计算单场比赛积分
   */
  calculateRacePoints(raceData: SnowboardParallelRaceData): SnowboardParallelPointsResult {
    // 验证数据
    this.validateRaceData(raceData);

    // 计算基础比赛积分
    const baseRacePoints = this.calculateBaseRacePoints(
      raceData.athleteTime,
      raceData.winnerTime,
      raceData.discipline
    );

    // 计算判罚分
    let penalty = 0;
    if (raceData.penaltyData) {
      penalty = this.calculatePenalty(
        raceData.penaltyData.top10Best5Points,
        raceData.penaltyData.allBest5Points,
        raceData.penaltyData.allBest5RacePoints
      );
    }

    // 获取赛事系数
    const eventCoefficient = SNOWBOARD_EVENT_COEFFICIENTS[raceData.eventLevel];

    // 计算最终积分
    const finalPoints = (baseRacePoints + penalty) * eventCoefficient;

    return {
      athleteId: raceData.athleteId,
      discipline: `SNOWBOARD_${raceData.discipline}`,
      systemType: ScoringSystemType.SNOWBOARD_ALPINE_POINTS,
      rank: raceData.rank || 0,
      performance: {
        timeResult: raceData.athleteTime,
        finalResult: Math.round(finalPoints * 100) / 100
      },
      points: {
        earnedPoints: Math.round(finalPoints * 100) / 100
      },
      calculationDetails: {
        baseCalculation: baseRacePoints,
        penalties: penalty,
        coefficients: eventCoefficient
      },
      calculatedAt: new Date().toISOString(),
      competitionDate: raceData.competitionDate,
      snowboardParallelSpecific: {
        baseRacePoints,
        penalty,
        eventCoefficient,
        disciplineFactor: SNOWBOARD_PARALLEL_FACTORS[raceData.discipline]
      }
    };
  }

  /**
   * 计算赛季积分
   * 特点：取最好两次成绩的平均值（与高山滑雪相同）
   */
  calculateSeasonPoints(seasonData: SnowboardParallelSeasonData): SeasonPointsSummary {
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
      discipline: `SNOWBOARD_${seasonData.discipline}`,
      systemType: ScoringSystemType.SNOWBOARD_ALPINE_POINTS,
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
  calculateBatchRacePoints(raceDataList: SnowboardParallelRaceData[]): SnowboardParallelPointsResult[] {
    return raceDataList.map(raceData => this.calculateRacePoints(raceData));
  }

  /**
   * 计算比赛中所有运动员的积分并排名
   */
  calculateRaceRanking(
    raceDataList: SnowboardParallelRaceData[],
    addRankInfo: boolean = true
  ): SnowboardParallelPointsResult[] {
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
  getMaxPoints(discipline: SnowboardParallelDiscipline): number {
    return SNOWBOARD_PARALLEL_MAX_POINTS[discipline];
  }

  /**
   * 获取项目系数
   */
  getDisciplineFactor(discipline: SnowboardParallelDiscipline): number {
    return SNOWBOARD_PARALLEL_FACTORS[discipline];
  }

  /**
   * 验证积分有效性
   */
  isValidPoints(points: number, discipline: SnowboardParallelDiscipline): boolean {
    const maxPoints = this.getMaxPoints(discipline);
    return points >= 0 && points <= maxPoints;
  }

  /**
   * 计算积分改进所需时间
   */
  calculateTimeImprovementNeeded(
    currentTime: number,
    winnerTime: number,
    targetPoints: number,
    discipline: SnowboardParallelDiscipline,
    eventLevel: EventLevel
  ): number {
    const factor = SNOWBOARD_PARALLEL_FACTORS[discipline];
    const coefficient = SNOWBOARD_EVENT_COEFFICIENTS[eventLevel];

    // 反向计算：根据目标积分计算需要的时间比例
    const requiredRatio = (targetPoints / coefficient) / factor + 1;
    const requiredTime = winnerTime * requiredRatio;

    return Math.max(0, currentTime - requiredTime);
  }

  /**
   * 积分变化趋势分析
   */
  analyzePointsTrend(
    seasonData: SnowboardParallelSeasonData
  ): {
    trend: 'improving' | 'declining' | 'stable';
    averageChange: number;
    bestImprovement: number;
    worstDecline: number;
    consistency: number;
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

    // 计算一致性
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
    seasonData: SnowboardParallelSeasonData
  ): {
    summary: SeasonPointsSummary;
    trend: ReturnType<SnowboardAlpinePointsSystem['analyzePointsTrend']>;
    recommendations: string[];
  } {
    const summary = this.calculateSeasonPoints(seasonData);
    const trend = this.analyzePointsTrend(seasonData);

    const recommendations: string[] = [];

    if (trend.trend === 'improving') {
      recommendations.push('单板平行项目积分持续改善，保持当前训练强度');
    } else if (trend.trend === 'declining') {
      recommendations.push('积分有下降趋势，建议检查转弯技术和节奏控制');
    }

    if (trend.consistency < 0.7) {
      recommendations.push('比赛表现不够稳定，建议加强平行项目的一致性训练');
    }

    if (summary.participatedEvents < 4) {
      recommendations.push('平行项目参赛次数较少，建议增加比赛经验');
    }

    return {
      summary,
      trend,
      recommendations
    };
  }

  /**
   * 比较单板平行项目与高山滑雪积分
   */
  compareWithAlpinePoints(
    snowboardPoints: number,
    alpinePoints: number,
    snowboardDiscipline: SnowboardParallelDiscipline
  ): {
    relativeDifference: number;
    performanceLevel: 'better' | 'similar' | 'worse';
    explanation: string;
  } {
    // 基于项目特点进行相对比较
    const snowboardMax = this.getMaxPoints(snowboardDiscipline);
    const alpineMax = 220; // 假设对应高山大回转

    const snowboardPercentile = snowboardPoints / snowboardMax;
    const alpinePercentile = alpinePoints / alpineMax;

    const relativeDifference = snowboardPercentile - alpinePercentile;

    let performanceLevel: 'better' | 'similar' | 'worse';
    let explanation: string;

    if (Math.abs(relativeDifference) < 0.1) {
      performanceLevel = 'similar';
      explanation = '单板平行项目与高山滑雪表现水平相近';
    } else if (relativeDifference < 0) {
      performanceLevel = 'better';
      explanation = '单板平行项目表现优于高山滑雪';
    } else {
      performanceLevel = 'worse';
      explanation = '单板平行项目表现不如高山滑雪';
    }

    return {
      relativeDifference: Math.round(relativeDifference * 100) / 100,
      performanceLevel,
      explanation
    };
  }

  // 私有辅助方法

  private validateRaceData(raceData: SnowboardParallelRaceData): void {
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
    if (!Object.values(SnowboardParallelDiscipline).includes(raceData.discipline)) {
      throw new Error('无效的单板平行项目');
    }
    if (!Object.values(EventLevel).includes(raceData.eventLevel)) {
      throw new Error('无效的赛事级别');
    }
  }
}

// 导出单例实例
export const snowboardAlpinePointsSystem = new SnowboardAlpinePointsSystem();

// 导出便捷工具函数
export const SnowboardAlpinePointsUtils = {
  /**
   * 快速计算积分
   */
  quickCalculate: (
    athleteTime: number,
    winnerTime: number,
    discipline: SnowboardParallelDiscipline,
    eventLevel: EventLevel = EventLevel.B
  ) => {
    const raceData: SnowboardParallelRaceData = {
      athleteId: 'temp',
      discipline,
      competitionId: 'temp',
      competitionDate: new Date().toISOString().split('T')[0],
      athleteTime,
      winnerTime,
      eventLevel
    };

    return snowboardAlpinePointsSystem.calculateRacePoints(raceData);
  },

  /**
   * 获取所有单板平行项目
   */
  getAllDisciplines: () => Object.values(SnowboardParallelDiscipline),

  /**
   * 获取项目中文名称
   */
  getDisciplineName: (discipline: SnowboardParallelDiscipline) => {
    const names = {
      [SnowboardParallelDiscipline.PSL]: '单板平行回转',
      [SnowboardParallelDiscipline.PGS]: '单板平行大回转'
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
    discipline: SnowboardParallelDiscipline,
    eventLevel: EventLevel = EventLevel.B
  ) => {
    const points1 = SnowboardAlpinePointsUtils.quickCalculate(time1, winnerTime, discipline, eventLevel);
    const points2 = SnowboardAlpinePointsUtils.quickCalculate(time2, winnerTime, discipline, eventLevel);

    return {
      difference: points1.points.earnedPoints - points2.points.earnedPoints,
      betterPerformance: points1.points.earnedPoints < points2.points.earnedPoints ? 'time1' : 'time2'
    };
  },

  /**
   * 预估基于时间改进的积分变化
   */
  estimatePointsImprovement: (
    currentTime: number,
    winnerTime: number,
    improvementSeconds: number,
    discipline: SnowboardParallelDiscipline,
    eventLevel: EventLevel = EventLevel.B
  ) => {
    const currentPoints = SnowboardAlpinePointsUtils.quickCalculate(currentTime, winnerTime, discipline, eventLevel);
    const improvedPoints = SnowboardAlpinePointsUtils.quickCalculate(currentTime - improvementSeconds, winnerTime, discipline, eventLevel);

    return {
      currentPoints: currentPoints.points.earnedPoints,
      improvedPoints: improvedPoints.points.earnedPoints,
      pointsGain: currentPoints.points.earnedPoints - improvedPoints.points.earnedPoints,
      timeImprovement: improvementSeconds
    };
  }
};