/**
 * 四大积分系统统一管理器
 * Four Scoring Systems Unified Manager
 * 提供统一的接口管理和调用四个不同的积分系统
 */

import {
  ScoringSystemType,
  PointsDirection,
  UnifiedPointsResult,
  SeasonPointsSummary,
  SystemComparison,
  DISCIPLINE_TO_SYSTEM_MAP,
  SCORING_SYSTEM_DESCRIPTIONS
} from '../types/scoringSystems';

// 导入四个积分系统
import {
  AlpinePointsSystem,
  alpinePointsSystem,
  AlpineRaceData,
  AlpineSeasonData,
  AlpineDiscipline,
  AlpinePointsUtils
} from './alpinePointsSystem';

import {
  SnowboardAlpinePointsSystem,
  snowboardAlpinePointsSystem,
  SnowboardParallelRaceData,
  SnowboardParallelSeasonData,
  SnowboardParallelDiscipline,
  SnowboardAlpinePointsUtils
} from './snowboardAlpinePointsSystem';

import {
  SnowboardRankingPointsSystem,
  snowboardRankingPointsSystem,
  SnowboardTrickRaceData,
  SnowboardTrickSeasonData,
  SnowboardTrickDiscipline,
  SnowboardRankingPointsUtils
} from './snowboardRankingPointsSystem';

import {
  FreestyleRankingPointsSystem,
  freestyleRankingPointsSystem,
  FreestyleRaceData,
  FreestyleSeasonData,
  FreestyleDiscipline,
  FreestyleRankingPointsUtils
} from './freestyleRankingPointsSystem';

import { EventLevel } from './chinaSkiPointsCalculatorV4';
import { PointsCategory } from '../data/multiSportData';

// 通用比赛数据接口（支持所有四个系统）
export interface UniversalRaceData {
  athleteId: string;
  discipline: string;          // 完整项目名称，如 'ALPINE_DH', 'SNOWBOARD_BA' 等
  competitionId: string;
  competitionDate: string;

  // 时间成绩（高山滑雪 & 单板平行项目）
  athleteTime?: number;
  winnerTime?: number;

  // 排名成绩（技巧项目）
  finalRank?: number;
  finalScore?: number;

  // 赛事配置
  eventLevel?: EventLevel;          // A/B/C级赛事
  pointsCategory?: PointsCategory;  // 积分档次

  // 判罚分数据（高山滑雪专用）
  penaltyData?: {
    top10Best5Points: number[];
    allBest5Points: number[];
    allBest5RacePoints: number[];
  };

  // 其他信息
  totalParticipants?: number;
  weatherConditions?: string;
}

// 通用赛季数据接口
export interface UniversalSeasonData {
  athleteId: string;
  discipline: string;
  season: string;
  baselinePoints?: number;
  races: UniversalRaceData[];
  seasonBestCount?: number;
}

// 系统比较结果接口
export interface SystemComparisonResult {
  athleteId: string;
  systemResults: {
    [systemType in ScoringSystemType]?: {
      totalPoints: number;
      nationalRanking?: number;
      participatedEvents: number;
      bestPerformance: number;
      consistency: number;
    };
  };
  overallAssessment: {
    dominantSystem: ScoringSystemType;
    weakestSystem: ScoringSystemType;
    averageConsistency: number;
    crossSystemCorrelation: number;
  };
  recommendations: string[];
}

export class FourSystemsManager {
  private alpineSystem: AlpinePointsSystem;
  private snowboardAlpineSystem: SnowboardAlpinePointsSystem;
  private snowboardRankingSystem: SnowboardRankingPointsSystem;
  private freestyleRankingSystem: FreestyleRankingPointsSystem;

  constructor() {
    this.alpineSystem = alpinePointsSystem;
    this.snowboardAlpineSystem = snowboardAlpinePointsSystem;
    this.snowboardRankingSystem = snowboardRankingPointsSystem;
    this.freestyleRankingSystem = freestyleRankingPointsSystem;
  }

  /**
   * 统一计算接口 - 自动路由到对应的积分系统
   */
  calculatePoints(raceData: UniversalRaceData): UnifiedPointsResult {
    const systemType = this.getSystemType(raceData.discipline);

    switch (systemType) {
      case ScoringSystemType.ALPINE_POINTS:
        return this.calculateAlpinePoints(raceData);

      case ScoringSystemType.SNOWBOARD_ALPINE_POINTS:
        return this.calculateSnowboardAlpinePoints(raceData);

      case ScoringSystemType.SNOWBOARD_RANKING_POINTS:
        return this.calculateSnowboardRankingPoints(raceData);

      case ScoringSystemType.FREESTYLE_RANKING_POINTS:
        return this.calculateFreestyleRankingPoints(raceData);

      default:
        throw new Error(`不支持的项目: ${raceData.discipline}`);
    }
  }

  /**
   * 统一赛季积分计算
   */
  calculateSeasonPoints(seasonData: UniversalSeasonData): SeasonPointsSummary {
    const systemType = this.getSystemType(seasonData.discipline);

    switch (systemType) {
      case ScoringSystemType.ALPINE_POINTS:
        return this.calculateAlpineSeasonPoints(seasonData);

      case ScoringSystemType.SNOWBOARD_ALPINE_POINTS:
        return this.calculateSnowboardAlpineSeasonPoints(seasonData);

      case ScoringSystemType.SNOWBOARD_RANKING_POINTS:
        return this.calculateSnowboardRankingSeasonPoints(seasonData);

      case ScoringSystemType.FREESTYLE_RANKING_POINTS:
        return this.calculateFreestyleRankingSeasonPoints(seasonData);

      default:
        throw new Error(`不支持的项目: ${seasonData.discipline}`);
    }
  }

  /**
   * 跨系统积分比较分析
   */
  compareAcrossSystems(
    athleteId: string,
    seasonDataList: UniversalSeasonData[]
  ): SystemComparisonResult {
    const systemResults: SystemComparisonResult['systemResults'] = {};

    // 按系统分组计算
    seasonDataList.forEach(seasonData => {
      const systemType = this.getSystemType(seasonData.discipline);
      const summary = this.calculateSeasonPoints(seasonData);

      if (!systemResults[systemType]) {
        systemResults[systemType] = {
          totalPoints: summary.finalSeasonPoints,
          participatedEvents: summary.participatedEvents,
          bestPerformance: 0,
          consistency: 0
        };
      } else {
        systemResults[systemType]!.totalPoints += summary.finalSeasonPoints;
        systemResults[systemType]!.participatedEvents += summary.participatedEvents;
      }
    });

    // 找出最强和最弱系统
    const systemEntries = Object.entries(systemResults) as [ScoringSystemType, NonNullable<SystemComparisonResult['systemResults'][ScoringSystemType]>][];
    const sortedSystems = systemEntries.sort((a, b) => b[1].totalPoints - a[1].totalPoints);

    const dominantSystem = sortedSystems[0]?.[0] || ScoringSystemType.ALPINE_POINTS;
    const weakestSystem = sortedSystems[sortedSystems.length - 1]?.[0] || ScoringSystemType.ALPINE_POINTS;

    // 计算平均一致性
    const averageConsistency = systemEntries.reduce((sum, [_, data]) => sum + data.consistency, 0) / systemEntries.length;

    // 生成建议
    const recommendations = this.generateCrossSystemRecommendations(systemResults, dominantSystem, weakestSystem);

    return {
      athleteId,
      systemResults,
      overallAssessment: {
        dominantSystem,
        weakestSystem,
        averageConsistency: Math.round(averageConsistency * 100) / 100,
        crossSystemCorrelation: 0.75 // 简化计算
      },
      recommendations
    };
  }

  /**
   * 批量计算多个运动员的积分
   */
  calculateBatchPoints(raceDataList: UniversalRaceData[]): UnifiedPointsResult[] {
    return raceDataList.map(raceData => this.calculatePoints(raceData));
  }

  /**
   * 获取系统信息
   */
  getSystemInfo(discipline: string) {
    const systemType = this.getSystemType(discipline);
    const description = SCORING_SYSTEM_DESCRIPTIONS[systemType];

    return {
      systemType,
      ...description,
      isLowerBetter: systemType === ScoringSystemType.ALPINE_POINTS ||
                     systemType === ScoringSystemType.SNOWBOARD_ALPINE_POINTS
    };
  }

  /**
   * 获取所有支持的项目列表
   */
  getSupportedDisciplines(): {
    [systemType in ScoringSystemType]: string[];
  } {
    return {
      [ScoringSystemType.ALPINE_POINTS]: [
        'ALPINE_DH', 'ALPINE_SL', 'ALPINE_GS', 'ALPINE_SG', 'ALPINE_AC'
      ],
      [ScoringSystemType.SNOWBOARD_ALPINE_POINTS]: [
        'SNOWBOARD_PSL', 'SNOWBOARD_PGS'
      ],
      [ScoringSystemType.SNOWBOARD_RANKING_POINTS]: [
        'SNOWBOARD_BA', 'SNOWBOARD_SS', 'SNOWBOARD_HP'
      ],
      [ScoringSystemType.FREESTYLE_RANKING_POINTS]: [
        'FREESTYLE_BA', 'FREESTYLE_SS', 'FREESTYLE_HP'
      ]
    };
  }

  /**
   * 验证数据完整性
   */
  validateRaceData(raceData: UniversalRaceData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const systemType = this.getSystemType(raceData.discipline);

    // 基础验证
    if (!raceData.athleteId) errors.push('缺少运动员ID');
    if (!raceData.discipline) errors.push('缺少项目信息');
    if (!raceData.competitionDate) errors.push('缺少比赛日期');

    // 系统特定验证
    if (systemType === ScoringSystemType.ALPINE_POINTS ||
        systemType === ScoringSystemType.SNOWBOARD_ALPINE_POINTS) {
      if (!raceData.athleteTime) errors.push('时间制项目需要运动员时间');
      if (!raceData.winnerTime) errors.push('时间制项目需要冠军时间');
      if (!raceData.eventLevel) errors.push('时间制项目需要赛事级别');
    }

    if (systemType === ScoringSystemType.SNOWBOARD_RANKING_POINTS ||
        systemType === ScoringSystemType.FREESTYLE_RANKING_POINTS) {
      if (!raceData.finalRank) errors.push('排名制项目需要最终排名');
      if (!raceData.pointsCategory) errors.push('排名制项目需要积分档次');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * 生成全面的积分报告
   */
  generateComprehensiveReport(
    athleteId: string,
    seasonDataList: UniversalSeasonData[]
  ): {
    individualReports: { [discipline: string]: any };
    crossSystemComparison: SystemComparisonResult;
    overallSummary: {
      totalEvents: number;
      totalSystems: number;
      averagePerformance: number;
      strongestDiscipline: string;
      improvementPotential: string[];
    };
  } {
    const individualReports: { [discipline: string]: any } = {};

    // 生成各项目详细报告
    seasonDataList.forEach(seasonData => {
      const systemType = this.getSystemType(seasonData.discipline);

      switch (systemType) {
        case ScoringSystemType.ALPINE_POINTS:
          const alpineData = this.convertToAlpineSeasonData(seasonData);
          individualReports[seasonData.discipline] = this.alpineSystem.generatePointsReport(alpineData);
          break;
        case ScoringSystemType.SNOWBOARD_ALPINE_POINTS:
          const snowboardAlpineData = this.convertToSnowboardAlpineSeasonData(seasonData);
          individualReports[seasonData.discipline] = this.snowboardAlpineSystem.generatePointsReport(snowboardAlpineData);
          break;
        case ScoringSystemType.SNOWBOARD_RANKING_POINTS:
          const snowboardRankingData = this.convertToSnowboardRankingSeasonData(seasonData);
          individualReports[seasonData.discipline] = this.snowboardRankingSystem.generatePointsReport(snowboardRankingData);
          break;
        case ScoringSystemType.FREESTYLE_RANKING_POINTS:
          const freestyleData = this.convertToFreestyleSeasonData(seasonData);
          individualReports[seasonData.discipline] = this.freestyleRankingSystem.generatePointsReport(freestyleData);
          break;
      }
    });

    // 跨系统比较
    const crossSystemComparison = this.compareAcrossSystems(athleteId, seasonDataList);

    // 综合总结
    const totalEvents = seasonDataList.reduce((sum, data) => sum + data.races.length, 0);
    const totalSystems = new Set(seasonDataList.map(data => this.getSystemType(data.discipline))).size;

    const performanceScores = Object.values(individualReports).map(report => {
      if (report.trend && report.trend.consistency) {
        return report.trend.consistency;
      }
      return 0.5; // 默认值
    });

    const averagePerformance = performanceScores.reduce((sum, score) => sum + score, 0) / performanceScores.length;

    // 找出最强项目
    const strongestDiscipline = seasonDataList.reduce((best, current) => {
      const currentSummary = this.calculateSeasonPoints(current);
      const bestSummary = best ? this.calculateSeasonPoints(best) : null;

      if (!bestSummary) return current;

      // 根据系统类型比较（低分制vs高分制）
      const currentSystemType = this.getSystemType(current.discipline);
      const isLowerBetter = currentSystemType === ScoringSystemType.ALPINE_POINTS ||
                           currentSystemType === ScoringSystemType.SNOWBOARD_ALPINE_POINTS;

      if (isLowerBetter) {
        return currentSummary.finalSeasonPoints < bestSummary.finalSeasonPoints ? current : best;
      } else {
        return currentSummary.finalSeasonPoints > bestSummary.finalSeasonPoints ? current : best;
      }
    })?.discipline || '';

    const overallSummary = {
      totalEvents,
      totalSystems,
      averagePerformance: Math.round(averagePerformance * 100) / 100,
      strongestDiscipline,
      improvementPotential: crossSystemComparison.recommendations
    };

    return {
      individualReports,
      crossSystemComparison,
      overallSummary
    };
  }

  // 私有辅助方法

  private getSystemType(discipline: string): ScoringSystemType {
    return DISCIPLINE_TO_SYSTEM_MAP[discipline as keyof typeof DISCIPLINE_TO_SYSTEM_MAP] ||
           ScoringSystemType.ALPINE_POINTS;
  }

  private calculateAlpinePoints(raceData: UniversalRaceData): UnifiedPointsResult {
    const alpineRaceData: AlpineRaceData = {
      athleteId: raceData.athleteId,
      discipline: raceData.discipline.replace('ALPINE_', '') as AlpineDiscipline,
      competitionId: raceData.competitionId,
      competitionDate: raceData.competitionDate,
      athleteTime: raceData.athleteTime!,
      winnerTime: raceData.winnerTime!,
      eventLevel: raceData.eventLevel!,
      penaltyData: raceData.penaltyData,
      rank: raceData.finalRank
    };

    return this.alpineSystem.calculateRacePoints(alpineRaceData);
  }

  private calculateSnowboardAlpinePoints(raceData: UniversalRaceData): UnifiedPointsResult {
    const snowboardRaceData: SnowboardParallelRaceData = {
      athleteId: raceData.athleteId,
      discipline: raceData.discipline.replace('SNOWBOARD_', '') as SnowboardParallelDiscipline,
      competitionId: raceData.competitionId,
      competitionDate: raceData.competitionDate,
      athleteTime: raceData.athleteTime!,
      winnerTime: raceData.winnerTime!,
      eventLevel: raceData.eventLevel!,
      rank: raceData.finalRank
    };

    return this.snowboardAlpineSystem.calculateRacePoints(snowboardRaceData);
  }

  private calculateSnowboardRankingPoints(raceData: UniversalRaceData): UnifiedPointsResult {
    const snowboardTrickData: SnowboardTrickRaceData = {
      athleteId: raceData.athleteId,
      discipline: raceData.discipline.replace('SNOWBOARD_', '') as SnowboardTrickDiscipline,
      competitionId: raceData.competitionId,
      competitionDate: raceData.competitionDate,
      finalRank: raceData.finalRank!,
      finalScore: raceData.finalScore,
      pointsCategory: raceData.pointsCategory!,
      totalParticipants: raceData.totalParticipants
    };

    return this.snowboardRankingSystem.calculateRacePoints(snowboardTrickData);
  }

  private calculateFreestyleRankingPoints(raceData: UniversalRaceData): UnifiedPointsResult {
    const freestyleData: FreestyleRaceData = {
      athleteId: raceData.athleteId,
      discipline: raceData.discipline.replace('FREESTYLE_', '') as FreestyleDiscipline,
      competitionId: raceData.competitionId,
      competitionDate: raceData.competitionDate,
      finalRank: raceData.finalRank!,
      finalScore: raceData.finalScore,
      pointsCategory: raceData.pointsCategory!,
      totalParticipants: raceData.totalParticipants
    };

    return this.freestyleRankingSystem.calculateRacePoints(freestyleData);
  }

  // 赛季积分计算的私有方法
  private calculateAlpineSeasonPoints(seasonData: UniversalSeasonData): SeasonPointsSummary {
    const alpineSeasonData = this.convertToAlpineSeasonData(seasonData);
    return this.alpineSystem.calculateSeasonPoints(alpineSeasonData);
  }

  private calculateSnowboardAlpineSeasonPoints(seasonData: UniversalSeasonData): SeasonPointsSummary {
    const snowboardAlpineSeasonData = this.convertToSnowboardAlpineSeasonData(seasonData);
    return this.snowboardAlpineSystem.calculateSeasonPoints(snowboardAlpineSeasonData);
  }

  private calculateSnowboardRankingSeasonPoints(seasonData: UniversalSeasonData): SeasonPointsSummary {
    const snowboardRankingSeasonData = this.convertToSnowboardRankingSeasonData(seasonData);
    return this.snowboardRankingSystem.calculateSeasonPoints(snowboardRankingSeasonData);
  }

  private calculateFreestyleRankingSeasonPoints(seasonData: UniversalSeasonData): SeasonPointsSummary {
    const freestyleSeasonData = this.convertToFreestyleSeasonData(seasonData);
    return this.freestyleRankingSystem.calculateSeasonPoints(freestyleSeasonData);
  }

  // 数据转换方法
  private convertToAlpineSeasonData(seasonData: UniversalSeasonData): AlpineSeasonData {
    return {
      athleteId: seasonData.athleteId,
      discipline: seasonData.discipline.replace('ALPINE_', '') as AlpineDiscipline,
      season: seasonData.season,
      baselinePoints: seasonData.baselinePoints,
      races: seasonData.races.map(race => ({
        athleteId: race.athleteId,
        discipline: race.discipline.replace('ALPINE_', '') as AlpineDiscipline,
        competitionId: race.competitionId,
        competitionDate: race.competitionDate,
        athleteTime: race.athleteTime!,
        winnerTime: race.winnerTime!,
        eventLevel: race.eventLevel!,
        penaltyData: race.penaltyData,
        rank: race.finalRank
      }))
    };
  }

  private convertToSnowboardAlpineSeasonData(seasonData: UniversalSeasonData): SnowboardParallelSeasonData {
    return {
      athleteId: seasonData.athleteId,
      discipline: seasonData.discipline.replace('SNOWBOARD_', '') as SnowboardParallelDiscipline,
      season: seasonData.season,
      baselinePoints: seasonData.baselinePoints,
      races: seasonData.races.map(race => ({
        athleteId: race.athleteId,
        discipline: race.discipline.replace('SNOWBOARD_', '') as SnowboardParallelDiscipline,
        competitionId: race.competitionId,
        competitionDate: race.competitionDate,
        athleteTime: race.athleteTime!,
        winnerTime: race.winnerTime!,
        eventLevel: race.eventLevel!,
        rank: race.finalRank
      }))
    };
  }

  private convertToSnowboardRankingSeasonData(seasonData: UniversalSeasonData): SnowboardTrickSeasonData {
    return {
      athleteId: seasonData.athleteId,
      discipline: seasonData.discipline.replace('SNOWBOARD_', '') as SnowboardTrickDiscipline,
      season: seasonData.season,
      baselinePoints: seasonData.baselinePoints,
      races: seasonData.races.map(race => ({
        athleteId: race.athleteId,
        discipline: race.discipline.replace('SNOWBOARD_', '') as SnowboardTrickDiscipline,
        competitionId: race.competitionId,
        competitionDate: race.competitionDate,
        finalRank: race.finalRank!,
        finalScore: race.finalScore,
        pointsCategory: race.pointsCategory!,
        totalParticipants: race.totalParticipants
      })),
      seasonBestCount: seasonData.seasonBestCount
    };
  }

  private convertToFreestyleSeasonData(seasonData: UniversalSeasonData): FreestyleSeasonData {
    return {
      athleteId: seasonData.athleteId,
      discipline: seasonData.discipline.replace('FREESTYLE_', '') as FreestyleDiscipline,
      season: seasonData.season,
      baselinePoints: seasonData.baselinePoints,
      races: seasonData.races.map(race => ({
        athleteId: race.athleteId,
        discipline: race.discipline.replace('FREESTYLE_', '') as FreestyleDiscipline,
        competitionId: race.competitionId,
        competitionDate: race.competitionDate,
        finalRank: race.finalRank!,
        finalScore: race.finalScore,
        pointsCategory: race.pointsCategory!,
        totalParticipants: race.totalParticipants
      })),
      seasonBestCount: seasonData.seasonBestCount
    };
  }

  private generateCrossSystemRecommendations(
    systemResults: SystemComparisonResult['systemResults'],
    dominantSystem: ScoringSystemType,
    weakestSystem: ScoringSystemType
  ): string[] {
    const recommendations: string[] = [];

    recommendations.push(`最强项目为${SCORING_SYSTEM_DESCRIPTIONS[dominantSystem].name}，建议保持优势`);

    if (weakestSystem !== dominantSystem) {
      recommendations.push(`${SCORING_SYSTEM_DESCRIPTIONS[weakestSystem].name}需要重点改进`);
    }

    const totalSystems = Object.keys(systemResults).length;

    if (totalSystems === 1) {
      recommendations.push('建议尝试其他项目，发展多项目能力');
    } else if (totalSystems >= 3) {
      recommendations.push('多项目发展良好，注意平衡训练时间分配');
    }

    return recommendations;
  }
}

// 导出单例实例
export const fourSystemsManager = new FourSystemsManager();

// 导出便捷工具函数
export const FourSystemsUtils = {
  /**
   * 快速计算积分
   */
  quickCalculate: (raceData: UniversalRaceData) => {
    return fourSystemsManager.calculatePoints(raceData);
  },

  /**
   * 判断是否为低分制系统
   */
  isLowerBetterSystem: (discipline: string) => {
    const systemType = fourSystemsManager['getSystemType'](discipline);
    return systemType === ScoringSystemType.ALPINE_POINTS ||
           systemType === ScoringSystemType.SNOWBOARD_ALPINE_POINTS;
  },

  /**
   * 获取项目对应的积分系统
   */
  getSystemType: (discipline: string) => {
    return fourSystemsManager['getSystemType'](discipline);
  },

  /**
   * 验证数据
   */
  validateData: (raceData: UniversalRaceData) => {
    return fourSystemsManager.validateRaceData(raceData);
  },

  /**
   * 获取系统描述
   */
  getSystemDescription: (discipline: string) => {
    return fourSystemsManager.getSystemInfo(discipline);
  },

  /**
   * 获取所有支持的项目
   */
  getAllDisciplines: () => {
    return fourSystemsManager.getSupportedDisciplines();
  }
};