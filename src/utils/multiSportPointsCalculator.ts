/**
 * 中国滑雪赛事积分计算引擎 - 多项目版本
 * 支持自由式滑雪、单板滑雪的240/360/120分档积分体系
 * 基于2025-2026赛季全国BA、SS青少年U系列比赛方案
 */

import {
  SkiCategory,
  SkiDiscipline,
  AgeGroup,
  PointsCategory,
  POINTS_DISTRIBUTION,
  MultiSportResult,
  PointsContinuation
} from '../data/multiSportData';

// 参赛选手信息接口
export interface CompetitorInfo {
  athleteId: string;
  name: string;
  ageGroup: AgeGroup;
  finalScore: number;           // 最终得分
  rank: number;                 // 最终排名
  previousSeasonPoints?: number; // 上赛季积分（用于延续计算）
}

// 比赛配置接口
export interface RaceConfiguration {
  discipline: SkiDiscipline;
  pointsCategory: PointsCategory;  // 积分档次
  ageGroup: AgeGroup;
  season: string;                  // 赛季，格式："2025-2026"
}

// 积分计算结果接口
export interface PointsCalculationResult {
  athleteId: string;
  rank: number;
  finalScore: number;
  earnedPoints: number;            // 本场比赛获得积分

  // 详细计算信息
  calculationDetails: {
    pointsCategory: PointsCategory;
    maxCategoryPoints: number;
    rankPercentage: number;
    basePoints: number;
  };
}

// 赛季积分管理结果
export interface SeasonPointsResult {
  athleteId: string;
  discipline: SkiDiscipline;

  // 赛季积分组成
  baselinePoints: number;          // 基础积分 (BL)
  seasonResults: {
    competitionId: string;
    points: number;
    date: string;
  }[];

  // 计算结果
  bestTwoResults: number[];        // 最好两次成绩
  bestTwoAverage: number;          // 最好两次平均
  finalSeasonPoints: number;       // 最终赛季积分

  // 下赛季延续
  nextSeasonBaseline: number;      // 下赛季基础积分 (当前积分 × 50%)
}

export class MultiSportPointsCalculator {

  /**
   * 计算单场比赛积分分配
   * 基于名次和积分档次计算每位选手的积分
   */
  calculateRacePoints(
    competitors: CompetitorInfo[],
    raceConfig: RaceConfiguration
  ): PointsCalculationResult[] {

    // 获取积分分配表
    const distribution = POINTS_DISTRIBUTION[raceConfig.pointsCategory];
    const maxPoints = distribution.maxPoints;

    // 按成绩排序确定最终排名
    const sortedCompetitors = competitors
      .sort((a, b) => b.finalScore - a.finalScore) // 分数越高排名越靠前
      .map((competitor, index) => ({
        ...competitor,
        rank: index + 1
      }));

    // 计算每位选手的积分
    const results: PointsCalculationResult[] = sortedCompetitors.map(competitor => {
      const earnedPoints = this.calculateIndividualPoints(
        competitor.rank,
        raceConfig.pointsCategory
      );

      const rankPercentage = this.getRankPercentage(competitor.rank);

      return {
        athleteId: competitor.athleteId,
        rank: competitor.rank,
        finalScore: competitor.finalScore,
        earnedPoints,
        calculationDetails: {
          pointsCategory: raceConfig.pointsCategory,
          maxCategoryPoints: maxPoints,
          rankPercentage,
          basePoints: maxPoints * rankPercentage
        }
      };
    });

    return results;
  }

  /**
   * 计算个人在特定名次的积分
   */
  private calculateIndividualPoints(
    rank: number,
    pointsCategory: PointsCategory
  ): number {
    const distribution = POINTS_DISTRIBUTION[pointsCategory];

    // 直接查表获取积分，如果名次超出表格范围则使用递减公式
    if (distribution.distribution[rank as keyof typeof distribution.distribution]) {
      return distribution.distribution[rank as keyof typeof distribution.distribution];
    }

    // 第11名及以后按递减公式计算
    const maxPoints = distribution.maxPoints;
    const basePercentage = this.getRankPercentage(rank);

    return Math.round(maxPoints * basePercentage * 100) / 100;
  }

  /**
   * 获取排名对应的积分百分比
   * 基于国际雪联标准递减公式
   */
  private getRankPercentage(rank: number): number {
    if (rank <= 10) {
      // 前10名使用固定百分比
      const percentages = [1.0, 0.8, 0.6, 0.5, 0.45, 0.4, 0.36, 0.32, 0.29, 0.26];
      return percentages[rank - 1];
    }

    // 第11名开始递减
    // 公式: 26% - (rank - 10) * 1.5%，最低0.12%
    const basePercentage = 0.26;
    const decreaseRate = 0.015;
    const minPercentage = 0.0012;

    const percentage = basePercentage - (rank - 10) * decreaseRate;
    return Math.max(percentage, minPercentage);
  }

  /**
   * 计算赛季积分
   * 基于最好两次成绩的平均值
   */
  calculateSeasonPoints(
    athleteId: string,
    discipline: SkiDiscipline,
    seasonResults: Array<{
      competitionId: string;
      points: number;
      date: string;
    }>,
    baselinePoints: number
  ): SeasonPointsResult {

    // 排序获取最好两次成绩
    const sortedResults = seasonResults
      .sort((a, b) => a.points - b.points) // 积分越低排名越好
      .slice(0, 2);

    let finalSeasonPoints: number;
    let bestTwoAverage: number;

    if (sortedResults.length === 0) {
      // 无参赛记录，保持基础积分
      finalSeasonPoints = baselinePoints;
      bestTwoAverage = baselinePoints;
    } else if (sortedResults.length === 1) {
      // 只有一次成绩，与基础积分平均
      bestTwoAverage = (sortedResults[0].points + baselinePoints) / 2;
      finalSeasonPoints = bestTwoAverage;
    } else {
      // 有两次或以上成绩，取最好两次平均
      bestTwoAverage = (sortedResults[0].points + sortedResults[1].points) / 2;
      // 如果平均分优于基础积分，则更新
      finalSeasonPoints = Math.min(bestTwoAverage, baselinePoints);
    }

    // 计算下赛季基础积分 (当前积分 × 50%)
    const nextSeasonBaseline = finalSeasonPoints * 0.5;

    return {
      athleteId,
      discipline,
      baselinePoints,
      seasonResults,
      bestTwoResults: sortedResults.map(r => r.points),
      bestTwoAverage: Math.round(bestTwoAverage * 100) / 100,
      finalSeasonPoints: Math.round(finalSeasonPoints * 100) / 100,
      nextSeasonBaseline: Math.round(nextSeasonBaseline * 100) / 100
    };
  }

  /**
   * 批量计算积分延续机制
   * 将上赛季积分×50%作为新赛季基础积分
   */
  calculatePointsContinuation(
    previousSeasonResults: Array<{
      athleteId: string;
      discipline: SkiDiscipline;
      finalPoints: number;
    }>,
    newSeason: string
  ): PointsContinuation[] {

    return previousSeasonResults.map(result => ({
      athleteId: result.athleteId,
      discipline: result.discipline,
      previousSeasonPoints: result.finalPoints,
      baselinePoints: Math.round(result.finalPoints * 0.5 * 100) / 100,
      calculationDate: new Date().toISOString().split('T')[0]
    }));
  }

  /**
   * 获取项目最大积分值
   */
  getMaxPointsForCategory(pointsCategory: PointsCategory): number {
    return POINTS_DISTRIBUTION[pointsCategory].maxPoints;
  }

  /**
   * 验证积分有效性
   */
  isValidPoints(
    points: number,
    pointsCategory: PointsCategory
  ): boolean {
    const maxPoints = this.getMaxPointsForCategory(pointsCategory);
    return points >= 0 && points <= maxPoints;
  }

  /**
   * 计算年龄组积分排名
   * 支持U系列独立排名
   */
  calculateAgeGroupRanking(
    results: PointsCalculationResult[],
    ageGroup: AgeGroup
  ): PointsCalculationResult[] {

    return results
      .sort((a, b) => a.earnedPoints - b.earnedPoints) // 积分越低排名越好
      .map((result, index) => ({
        ...result,
        rank: index + 1
      }));
  }

  /**
   * 生成积分计算报告
   */
  generatePointsReport(
    raceResults: PointsCalculationResult[],
    raceConfig: RaceConfiguration
  ): {
    summary: {
      totalParticipants: number;
      pointsCategory: PointsCategory;
      discipline: SkiDiscipline;
      ageGroup: AgeGroup;
      averagePoints: number;
    };
    topPerformers: PointsCalculationResult[];
    statisticalData: {
      pointsDistribution: { [key: string]: number };
      rankDistribution: { [key: string]: number };
    };
  } {

    const totalParticipants = raceResults.length;
    const averagePoints = raceResults.reduce((sum, r) => sum + r.earnedPoints, 0) / totalParticipants;

    // 前三名表现者
    const topPerformers = raceResults
      .sort((a, b) => a.earnedPoints - b.earnedPoints)
      .slice(0, 3);

    // 积分分布统计
    const pointsDistribution: { [key: string]: number } = {};
    const rankDistribution: { [key: string]: number } = {};

    raceResults.forEach(result => {
      const pointsRange = Math.floor(result.earnedPoints / 50) * 50;
      const rankRange = Math.floor((result.rank - 1) / 10) * 10 + 1;

      pointsDistribution[`${pointsRange}-${pointsRange + 49}`] =
        (pointsDistribution[`${pointsRange}-${pointsRange + 49}`] || 0) + 1;

      rankDistribution[`${rankRange}-${rankRange + 9}`] =
        (rankDistribution[`${rankRange}-${rankRange + 9}`] || 0) + 1;
    });

    return {
      summary: {
        totalParticipants,
        pointsCategory: raceConfig.pointsCategory,
        discipline: raceConfig.discipline,
        ageGroup: raceConfig.ageGroup,
        averagePoints: Math.round(averagePoints * 100) / 100
      },
      topPerformers,
      statisticalData: {
        pointsDistribution,
        rankDistribution
      }
    };
  }

  /**
   * 特殊情况积分处理
   * 处理DNS、DNF、DQ等情况
   */
  handleSpecialStatus(
    status: 'dns' | 'dnf' | 'dq',
    raceConfig: RaceConfiguration
  ): PointsCalculationResult {

    // DNS、DNF、DQ都不获得积分
    return {
      athleteId: '',
      rank: 0,
      finalScore: 0,
      earnedPoints: 0,
      calculationDetails: {
        pointsCategory: raceConfig.pointsCategory,
        maxCategoryPoints: 0,
        rankPercentage: 0,
        basePoints: 0
      }
    };
  }

  /**
   * 项目积分转换
   * 在不同项目间进行积分标准化（如果需要）
   */
  convertPointsBetweenDisciplines(
    points: number,
    fromDiscipline: SkiDiscipline,
    toDiscipline: SkiDiscipline,
    fromCategory: PointsCategory,
    toCategory: PointsCategory
  ): number {

    // 基于最大积分值进行比例转换
    const fromMaxPoints = POINTS_DISTRIBUTION[fromCategory].maxPoints;
    const toMaxPoints = POINTS_DISTRIBUTION[toCategory].maxPoints;

    const ratio = points / fromMaxPoints;
    const convertedPoints = ratio * toMaxPoints;

    return Math.round(convertedPoints * 100) / 100;
  }
}

// 导出单例实例
export const multiSportPointsCalculator = new MultiSportPointsCalculator();

// 导出积分计算工具函数
export const PointsCalculatorUtils = {
  /**
   * 快速计算积分（简化版）
   */
  quickCalculatePoints(
    rank: number,
    pointsCategory: PointsCategory
  ): number {
    return multiSportPointsCalculator['calculateIndividualPoints'](rank, pointsCategory);
  },

  /**
   * 获取积分档次说明
   */
  getPointsCategoryDescription(pointsCategory: PointsCategory): string {
    const descriptions = {
      [PointsCategory.CATEGORY_1]: '一类赛事（360分档）',
      [PointsCategory.CATEGORY_2]: '二类赛事（240分档）',
      [PointsCategory.CATEGORY_3]: '三类赛事（120分档）'
    };
    return descriptions[pointsCategory];
  },

  /**
   * 获取年龄组说明
   */
  getAgeGroupDescription(ageGroup: AgeGroup): string {
    const descriptions = {
      [AgeGroup.U12]: 'U12组（8-11岁）',
      [AgeGroup.U15]: 'U15组（12-14岁）',
      [AgeGroup.U18]: 'U18组（15-17岁）',
      [AgeGroup.ADULT]: '大众组（18岁以上）'
    };
    return descriptions[ageGroup];
  },

  /**
   * 验证运动员年龄组资格
   */
  validateAgeGroupEligibility(
    birthDate: string,
    ageGroup: AgeGroup,
    competitionYear: number
  ): boolean {
    const birth = new Date(birthDate);
    const age = competitionYear - birth.getFullYear();

    // 以比赛年度的12月31日为计算节点
    const cutoffDate = new Date(competitionYear, 11, 31);
    if (birth > cutoffDate) {
      return false;
    }

    switch (ageGroup) {
      case AgeGroup.U12:
        return age >= 8 && age <= 11;
      case AgeGroup.U15:
        return age >= 12 && age <= 14;
      case AgeGroup.U18:
        return age >= 15 && age <= 17;
      case AgeGroup.ADULT:
        return age >= 18;
      default:
        return false;
    }
  }
};