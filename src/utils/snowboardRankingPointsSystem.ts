/**
 * 单板滑雪技巧项目积分系统 (Snowboard Ranking Points System)
 * 特点：积分越高越好，赛季取最好成绩累计
 * 适用项目：大跳台(BA)、坡面障碍技巧(SS)、U型场地(HP)
 * 基于240/360/120分档积分体系
 */

import { ScoringSystemType, UnifiedPointsResult, SeasonPointsSummary } from '../types/scoringSystems';
import { PointsCategory, POINTS_DISTRIBUTION } from '../data/multiSportData';

// 单板技巧项目枚举
export enum SnowboardTrickDiscipline {
  BA = 'BA',    // 大跳台 (Big Air)
  SS = 'SS',    // 坡面障碍技巧 (Slopestyle)
  HP = 'HP'     // U型场地 (Halfpipe)
}

// 单板技巧比赛数据接口
export interface SnowboardTrickRaceData {
  athleteId: string;
  discipline: SnowboardTrickDiscipline;
  competitionId: string;
  competitionDate: string;

  // 成绩数据
  finalRank: number;           // 最终排名
  finalScore?: number;         // 最终得分

  // 比赛配置
  pointsCategory: PointsCategory;  // 积分档次 (CATEGORY_1/2/3)

  // 详细成绩数据（可选）
  performanceDetails?: {
    preliminaryScores?: number[];  // 预赛成绩数组
    finalsScores?: number[];       // 决赛成绩数组
    bestPrelimScore?: number;      // 预赛最好成绩
    bestFinalsScore?: number;      // 决赛最好成绩
    judgeScores?: number[];        // 裁判评分
    difficulty?: number;           // 难度系数
    execution?: number;            // 完成质量
  };

  // 其他信息
  totalParticipants?: number;
  advancedToFinals?: boolean;
  eliminationRound?: string;
}

// 单板技巧赛季数据接口
export interface SnowboardTrickSeasonData {
  athleteId: string;
  discipline: SnowboardTrickDiscipline;
  season: string;              // 格式: "2025-2026"
  baselinePoints?: number;     // 基础积分（上赛季延续）
  races: SnowboardTrickRaceData[];
  seasonBestCount?: number;    // 取最好几次成绩（默认5次）
}

// 单板技巧积分计算结果
export interface SnowboardTrickPointsResult extends UnifiedPointsResult {
  systemType: ScoringSystemType.SNOWBOARD_RANKING_POINTS;
  snowboardTrickSpecific: {
    pointsCategory: PointsCategory;    // 积分档次
    maxCategoryPoints: number;         // 该档次最大积分
    rankPercentage: number;            // 排名百分比
    categoryMultiplier: number;        // 档次倍数
  };
}

export class SnowboardRankingPointsSystem {

  /**
   * 根据排名计算积分
   * 基于240/360/120分档体系
   */
  calculatePointsByRank(rank: number, pointsCategory: PointsCategory): number {
    const distribution = POINTS_DISTRIBUTION[pointsCategory];

    // 直接查表获取积分
    if (distribution.distribution[rank as keyof typeof distribution.distribution]) {
      return distribution.distribution[rank as keyof typeof distribution.distribution];
    }

    // 第11名及以后按递减公式计算
    const maxPoints = distribution.maxPoints;
    const rankPercentage = this.getRankPercentage(rank);

    return Math.round(maxPoints * rankPercentage * 100) / 100;
  }

  /**
   * 获取排名对应的积分百分比
   */
  private getRankPercentage(rank: number): number {
    if (rank <= 10) {
      // 前10名使用固定百分比
      const percentages = [1.0, 0.8, 0.6, 0.5, 0.45, 0.4, 0.36, 0.32, 0.29, 0.26];
      return percentages[rank - 1];
    }

    // 第11名开始递减：26% - (rank - 10) * 1.5%，最低0.12%
    const basePercentage = 0.26;
    const decreaseRate = 0.015;
    const minPercentage = 0.0012;

    const percentage = basePercentage - (rank - 10) * decreaseRate;
    return Math.max(percentage, minPercentage);
  }

  /**
   * 计算单场比赛积分
   */
  calculateRacePoints(raceData: SnowboardTrickRaceData): SnowboardTrickPointsResult {
    // 验证数据
    this.validateRaceData(raceData);

    // 计算积分
    const earnedPoints = this.calculatePointsByRank(raceData.finalRank, raceData.pointsCategory);
    const distribution = POINTS_DISTRIBUTION[raceData.pointsCategory];
    const rankPercentage = this.getRankPercentage(raceData.finalRank);

    return {
      athleteId: raceData.athleteId,
      discipline: `SNOWBOARD_${raceData.discipline}`,
      systemType: ScoringSystemType.SNOWBOARD_RANKING_POINTS,
      rank: raceData.finalRank,
      performance: {
        scoreResult: raceData.finalScore,
        finalResult: earnedPoints
      },
      points: {
        earnedPoints
      },
      calculationDetails: {
        baseCalculation: earnedPoints,
        categoryMultiplier: distribution.maxPoints
      },
      calculatedAt: new Date().toISOString(),
      competitionDate: raceData.competitionDate,
      snowboardTrickSpecific: {
        pointsCategory: raceData.pointsCategory,
        maxCategoryPoints: distribution.maxPoints,
        rankPercentage,
        categoryMultiplier: distribution.maxPoints
      }
    };
  }

  /**
   * 计算赛季积分
   * 特点：取最好成绩累计（高分制）
   */
  calculateSeasonPoints(seasonData: SnowboardTrickSeasonData): SeasonPointsSummary {
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

    // 按积分排序（积分越高越好）
    const sortedResults = raceResults
      .map(r => r.points)
      .sort((a, b) => b - a);

    // 取最好几次成绩累计
    const seasonBestCount = seasonData.seasonBestCount || 5;
    const bestResults = sortedResults.slice(0, Math.min(seasonBestCount, sortedResults.length));

    // 累计积分
    const finalSeasonPoints = bestResults.reduce((sum, points) => sum + points, 0);

    // 加上基础积分（如果有）
    const totalSeasonPoints = finalSeasonPoints + (seasonData.baselinePoints || 0);

    // 计算下赛季基础积分（当前积分 × 50%）
    const nextSeasonBaseline = totalSeasonPoints * 0.5;

    return {
      athleteId: seasonData.athleteId,
      discipline: `SNOWBOARD_${seasonData.discipline}`,
      systemType: ScoringSystemType.SNOWBOARD_RANKING_POINTS,
      season: seasonData.season,
      participatedEvents: seasonData.races.length,
      validResults: raceResults.filter(r => r.points > 0).length,
      allResults: raceResults,
      bestResults,
      finalSeasonPoints: Math.round(totalSeasonPoints * 100) / 100,
      nextSeasonBaseline: Math.round(nextSeasonBaseline * 100) / 100
    };
  }

  /**
   * 批量计算多个运动员的比赛积分
   */
  calculateBatchRacePoints(raceDataList: SnowboardTrickRaceData[]): SnowboardTrickPointsResult[] {
    return raceDataList.map(raceData => this.calculateRacePoints(raceData));
  }

  /**
   * 计算比赛中所有运动员的积分并排名
   */
  calculateRaceRanking(
    raceDataList: SnowboardTrickRaceData[],
    addRankInfo: boolean = true
  ): SnowboardTrickPointsResult[] {
    // 按得分排序确定排名（得分越高排名越靠前）
    const sortedRaces = [...raceDataList].sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0));

    if (addRankInfo) {
      sortedRaces.forEach((race, index) => {
        race.finalRank = index + 1;
      });
    }

    // 计算积分
    const results = this.calculateBatchRacePoints(sortedRaces);

    // 按积分排序（积分越高排名越好）
    return results.sort((a, b) => b.points.earnedPoints - a.points.earnedPoints);
  }

  /**
   * 获取积分档次最大积分值
   */
  getMaxPoints(pointsCategory: PointsCategory): number {
    return POINTS_DISTRIBUTION[pointsCategory].maxPoints;
  }

  /**
   * 验证积分有效性
   */
  isValidPoints(points: number, pointsCategory: PointsCategory): boolean {
    const maxPoints = this.getMaxPoints(pointsCategory);
    return points >= 0 && points <= maxPoints;
  }

  /**
   * 计算排名改进所需积分
   */
  calculateRankImprovementPoints(
    currentRank: number,
    targetRank: number,
    pointsCategory: PointsCategory
  ): number {
    const currentPoints = this.calculatePointsByRank(currentRank, pointsCategory);
    const targetPoints = this.calculatePointsByRank(targetRank, pointsCategory);

    return targetPoints - currentPoints;
  }

  /**
   * 积分变化趋势分析
   */
  analyzePointsTrend(
    seasonData: SnowboardTrickSeasonData
  ): {
    trend: 'improving' | 'declining' | 'stable';
    averageChange: number;
    bestImprovement: number;
    worstDecline: number;
    consistency: number;
    topRankings: number;  // 前三名次数
  } {
    const results = seasonData.races.map(race => this.calculateRacePoints(race));
    const points = results.map(r => r.points.earnedPoints);
    const ranks = results.map(r => r.rank);

    if (points.length < 2) {
      return {
        trend: 'stable',
        averageChange: 0,
        bestImprovement: 0,
        worstDecline: 0,
        consistency: 1,
        topRankings: ranks.filter(r => r <= 3).length
      };
    }

    // 计算相邻比赛间的变化
    const changes = [];
    for (let i = 1; i < points.length; i++) {
      changes.push(points[i] - points[i-1]); // 积分上升为正值（改进）
    }

    const averageChange = changes.reduce((sum, change) => sum + change, 0) / changes.length;
    const bestImprovement = Math.max(...changes, 0);
    const worstDecline = Math.min(...changes, 0);

    // 计算一致性
    const mean = points.reduce((sum, p) => sum + p, 0) / points.length;
    const variance = points.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) / points.length;
    const consistency = mean > 0 ? 1 / (1 + Math.sqrt(variance) / mean) : 0;

    let trend: 'improving' | 'declining' | 'stable';
    if (averageChange > 10) trend = 'improving';
    else if (averageChange < -10) trend = 'declining';
    else trend = 'stable';

    return {
      trend,
      averageChange: Math.round(averageChange * 100) / 100,
      bestImprovement: Math.round(bestImprovement * 100) / 100,
      worstDecline: Math.round(worstDecline * 100) / 100,
      consistency: Math.round(consistency * 100) / 100,
      topRankings: ranks.filter(r => r <= 3).length
    };
  }

  /**
   * 生成积分报告
   */
  generatePointsReport(
    seasonData: SnowboardTrickSeasonData
  ): {
    summary: SeasonPointsSummary;
    trend: ReturnType<SnowboardRankingPointsSystem['analyzePointsTrend']>;
    recommendations: string[];
  } {
    const summary = this.calculateSeasonPoints(seasonData);
    const trend = this.analyzePointsTrend(seasonData);

    const recommendations: string[] = [];

    if (trend.trend === 'improving') {
      recommendations.push('单板技巧项目积分持续上升，保持当前训练强度');
    } else if (trend.trend === 'declining') {
      recommendations.push('积分有下降趋势，建议检查技术动作和比赛策略');
    }

    if (trend.consistency < 0.6) {
      recommendations.push('比赛表现不够稳定，建议加强基础技术训练');
    }

    if (trend.topRankings === 0 && summary.participatedEvents > 3) {
      recommendations.push('缺少前三名表现，建议提高难度动作和完成质量');
    }

    if (summary.participatedEvents < 6) {
      recommendations.push('建议增加参赛次数以积累更多积分');
    }

    return {
      summary,
      trend,
      recommendations
    };
  }

  /**
   * 比较不同积分档次的价值
   */
  comparePointsCategories(
    rank: number
  ): {
    category1Points: number;
    category2Points: number;
    category3Points: number;
    bestCategory: PointsCategory;
    categoryRatio: { [key: string]: number };
  } {
    const category1Points = this.calculatePointsByRank(rank, PointsCategory.CATEGORY_1);
    const category2Points = this.calculatePointsByRank(rank, PointsCategory.CATEGORY_2);
    const category3Points = this.calculatePointsByRank(rank, PointsCategory.CATEGORY_3);

    const bestCategory = PointsCategory.CATEGORY_1; // 一类赛事积分最高

    return {
      category1Points,
      category2Points,
      category3Points,
      bestCategory,
      categoryRatio: {
        'Category1vs2': Math.round((category1Points / category2Points) * 100) / 100,
        'Category1vs3': Math.round((category1Points / category3Points) * 100) / 100,
        'Category2vs3': Math.round((category2Points / category3Points) * 100) / 100
      }
    };
  }

  /**
   * 预估达到目标积分需要的比赛表现
   */
  estimateRequiredPerformance(
    targetSeasonPoints: number,
    currentPoints: number,
    remainingEvents: number,
    pointsCategory: PointsCategory
  ): {
    requiredAveragePoints: number;
    requiredAverageRank: number;
    achievable: boolean;
    recommendations: string[];
  } {
    const pointsNeeded = targetSeasonPoints - currentPoints;
    const requiredAveragePoints = pointsNeeded / remainingEvents;

    // 估算需要的平均排名
    let requiredAverageRank = 50; // 默认值
    for (let rank = 1; rank <= 50; rank++) {
      const points = this.calculatePointsByRank(rank, pointsCategory);
      if (points <= requiredAveragePoints) {
        requiredAverageRank = rank;
        break;
      }
    }

    const maxPossiblePoints = this.getMaxPoints(pointsCategory);
    const achievable = requiredAveragePoints <= maxPossiblePoints;

    const recommendations: string[] = [];

    if (!achievable) {
      recommendations.push('目标积分过高，建议调整期望或增加参赛次数');
    } else if (requiredAverageRank <= 3) {
      recommendations.push('需要保持前三名水平，建议重点训练高难度动作');
    } else if (requiredAverageRank <= 8) {
      recommendations.push('需要稳定进入决赛，建议平衡难度与稳定性');
    } else {
      recommendations.push('目标相对容易达成，建议争取更好名次');
    }

    return {
      requiredAveragePoints: Math.round(requiredAveragePoints * 100) / 100,
      requiredAverageRank,
      achievable,
      recommendations
    };
  }

  // 私有辅助方法

  private validateRaceData(raceData: SnowboardTrickRaceData): void {
    if (!raceData.athleteId) {
      throw new Error('缺少运动员ID');
    }
    if (!raceData.finalRank || raceData.finalRank <= 0) {
      throw new Error('无效的最终排名');
    }
    if (!Object.values(SnowboardTrickDiscipline).includes(raceData.discipline)) {
      throw new Error('无效的单板技巧项目');
    }
    if (!Object.values(PointsCategory).includes(raceData.pointsCategory)) {
      throw new Error('无效的积分档次');
    }
  }
}

// 导出单例实例
export const snowboardRankingPointsSystem = new SnowboardRankingPointsSystem();

// 导出便捷工具函数
export const SnowboardRankingPointsUtils = {
  /**
   * 快速计算积分
   */
  quickCalculate: (
    rank: number,
    pointsCategory: PointsCategory = PointsCategory.CATEGORY_2
  ) => {
    return snowboardRankingPointsSystem.calculatePointsByRank(rank, pointsCategory);
  },

  /**
   * 获取所有单板技巧项目
   */
  getAllDisciplines: () => Object.values(SnowboardTrickDiscipline),

  /**
   * 获取项目中文名称
   */
  getDisciplineName: (discipline: SnowboardTrickDiscipline) => {
    const names = {
      [SnowboardTrickDiscipline.BA]: '单板大跳台',
      [SnowboardTrickDiscipline.SS]: '单板坡面障碍技巧',
      [SnowboardTrickDiscipline.HP]: '单板U型场地'
    };
    return names[discipline];
  },

  /**
   * 获取积分档次描述
   */
  getPointsCategoryDescription: (pointsCategory: PointsCategory) => {
    const descriptions = {
      [PointsCategory.CATEGORY_1]: '一类赛事（360分档）',
      [PointsCategory.CATEGORY_2]: '二类赛事（240分档）',
      [PointsCategory.CATEGORY_3]: '三类赛事（120分档）'
    };
    return descriptions[pointsCategory];
  },

  /**
   * 比较两个排名的积分差
   */
  calculateRankPointsDifference: (
    rank1: number,
    rank2: number,
    pointsCategory: PointsCategory = PointsCategory.CATEGORY_2
  ) => {
    const points1 = snowboardRankingPointsSystem.calculatePointsByRank(rank1, pointsCategory);
    const points2 = snowboardRankingPointsSystem.calculatePointsByRank(rank2, pointsCategory);

    return {
      difference: Math.abs(points1 - points2),
      betterRank: points1 > points2 ? rank1 : rank2,
      pointsGap: points1 - points2
    };
  },

  /**
   * 生成排名积分对照表
   */
  generateRankingTable: (
    maxRank: number = 30,
    pointsCategory: PointsCategory = PointsCategory.CATEGORY_2
  ) => {
    const table = [];
    for (let rank = 1; rank <= maxRank; rank++) {
      const points = snowboardRankingPointsSystem.calculatePointsByRank(rank, pointsCategory);
      table.push({ rank, points });
    }
    return table;
  }
};