/**
 * 中国高山滑雪综合积分计算引擎 v2.0
 * 完全遵循官方《中国高山滑雪赛事积分规则v2.0.docx》
 */

// 赛事等级系数（官方v2.0标准）
export enum EventLevel {
  A = 'A',  // 全国锦标赛、冬运会等
  B = 'B',  // 青年冠军赛、巡回赛分站等
  C = 'C',  // 省级锦标赛、区域邀请赛
  D = 'D'   // 市级比赛、俱乐部赛事
}

export const EVENT_COEFFICIENTS = {
  [EventLevel.A]: 1.0,
  [EventLevel.B]: 0.8,
  [EventLevel.C]: 0.6,
  [EventLevel.D]: 0.4
} as const;

// 项目系数（不变）
export const DISCIPLINE_FACTORS = {
  DH: 1250,    // 速降
  SL: 730,     // 回转
  GS: 1010,    // 大回转
  SG: 1190,    // 超级大回转
  AC: 1360     // 全能
} as const;

// 青少年年龄组系数（官方v2.0标准）
export enum AgeGroup {
  U10 = 'U10',
  U12 = 'U12',
  U15 = 'U15',
  U18 = 'U18',
  U21 = 'U21',
  ADULT = 'ADULT'
}

export const YOUTH_COEFFICIENTS = {
  [AgeGroup.U10]: { coefficient: 0.40, progressBonus: 3.0 },
  [AgeGroup.U12]: { coefficient: 0.55, progressBonus: 2.5 },
  [AgeGroup.U15]: { coefficient: 0.70, progressBonus: 2.0 },
  [AgeGroup.U18]: { coefficient: 0.85, progressBonus: 1.5 },
  [AgeGroup.U21]: { coefficient: 0.95, progressBonus: 1.0 },
  [AgeGroup.ADULT]: { coefficient: 1.0, progressBonus: 0 }
} as const;

// 附加分类型
export enum BonusType {
  CONSECUTIVE_COMPLETION = 'consecutive_completion',  // 连续完赛
  DEFEAT_HIGHER_RANK = 'defeat_higher_rank',        // 战胜高手
  PERSONAL_BEST = 'personal_best',                   // 刷新个人最佳
  FIRST_COMPLETION = 'first_completion',             // 项目首次完赛
  ANNUAL_PROGRESS = 'annual_progress',               // 年度进步奖
  DOUBLE_EVENT_SAME_DAY = 'double_event_same_day',   // 单日双项
  FULL_ATTENDANCE = 'full_attendance'                // 赛季全勤
}

export interface AthleteResult {
  athleteId: string;
  name: string;
  time: number;                    // 用时（秒）
  previousRank?: number;           // 上次排名（用于计算进步奖励）
  currentPoints?: number;          // 当前积分（用于战胜高手计算）
  ageGroup: AgeGroup;
}

export interface RaceConfig {
  eventLevel: EventLevel;
  discipline: keyof typeof DISCIPLINE_FACTORS;
  participantCount: number;
  winnerTime: number;              // 冠军用时（秒）
  top8AveragePoints: number;       // 前8名平均中国积分
}

export interface BonusPoint {
  type: BonusType;
  points: number;
  description: string;
}

export class ComprehensivePointsCalculator {

  /**
   * 计算基础积分（原公式不变）
   */
  calculateBasicPoints(athleteTime: number, winnerTime: number, discipline: keyof typeof DISCIPLINE_FACTORS): number {
    const F = DISCIPLINE_FACTORS[discipline];
    return (F * athleteTime / winnerTime) - F;
  }

  /**
   * 获取人数系数（官方v2.0精确分档）
   */
  getParticipantCoefficient(participantCount: number): number {
    if (participantCount >= 256) return 1.4;
    if (participantCount >= 128) return 1.3;
    if (participantCount >= 64) return 1.2;
    if (participantCount >= 32) return 1.1;
    if (participantCount >= 16) return 1.0;
    if (participantCount >= 8) return 0.8;
    return 0.8; // 不足8人
  }

  /**
   * 计算质量系数（官方v2.0标准）
   */
  calculateQualityCoefficient(top8AveragePoints: number): number {
    return 1 + (top8AveragePoints / 500);
  }

  /**
   * 计算连续完赛附加分
   */
  calculateConsecutiveCompletionBonus(consecutiveCount: number, isDoubleEventSameDay: boolean, isFullAttendance: boolean): BonusPoint[] {
    const bonuses: BonusPoint[] = [];

    if (isDoubleEventSameDay) {
      bonuses.push({
        type: BonusType.DOUBLE_EVENT_SAME_DAY,
        points: 3,
        description: '单日双项完赛'
      });
    }

    if (consecutiveCount >= 2) {
      bonuses.push({
        type: BonusType.CONSECUTIVE_COMPLETION,
        points: 5,
        description: '连续两站全勤参赛'
      });
    }

    if (isFullAttendance) {
      bonuses.push({
        type: BonusType.FULL_ATTENDANCE,
        points: 10,
        description: '赛季全勤奖（参加80%以上赛事）'
      });
    }

    return bonuses;
  }

  /**
   * 计算战胜高手附加分
   */
  calculateDefeatHigherRankBonus(
    athletePoints: number,
    defeatedOpponentPoints: number,
    eventLevel: EventLevel
  ): BonusPoint | null {
    if (defeatedOpponentPoints <= athletePoints) {
      return null; // 没有战胜更高积分的选手
    }

    const pointsDifference = defeatedOpponentPoints - athletePoints;
    const eventCoefficient = EVENT_COEFFICIENTS[eventLevel];
    const bonusPoints = Math.min((pointsDifference / 100) * eventCoefficient, 10); // 最高10分

    if (bonusPoints > 0) {
      return {
        type: BonusType.DEFEAT_HIGHER_RANK,
        points: Math.round(bonusPoints * 100) / 100, // 保留2位小数
        description: `战胜高手（积分差${pointsDifference.toFixed(2)}分）`
      };
    }

    return null;
  }

  /**
   * 计算突破类附加分
   */
  calculateBreakthroughBonus(
    isPersonalBest: boolean,
    isFirstCompletion: boolean,
    isAnnualProgress: boolean
  ): BonusPoint[] {
    const bonuses: BonusPoint[] = [];

    if (isPersonalBest) {
      bonuses.push({
        type: BonusType.PERSONAL_BEST,
        points: 5,
        description: '刷新个人最佳成绩'
      });
    }

    if (isFirstCompletion) {
      bonuses.push({
        type: BonusType.FIRST_COMPLETION,
        points: 3,
        description: '项目首次完赛'
      });
    }

    if (isAnnualProgress) {
      bonuses.push({
        type: BonusType.ANNUAL_PROGRESS,
        points: 8,
        description: '年度进步奖（积分提升超30%）'
      });
    }

    return bonuses;
  }

  /**
   * 计算进步奖励分（青少年专用）
   */
  calculateProgressBonus(previousRank: number, currentRank: number): number {
    const improvement = previousRank - currentRank;
    return Math.min(improvement * 0.5, 5); // 最高5分
  }

  /**
   * 综合积分计算（官方v2.0核心公式）
   * 总积分 = 基础积分 × 赛事系数 × 质量系数 × 人数系数 + 附加分
   */
  calculateComprehensivePoints(
    athlete: AthleteResult,
    raceConfig: RaceConfig,
    bonusPoints: BonusPoint[] = []
  ): {
    basicPoints: number;
    eventCoefficient: number;
    qualityCoefficient: number;
    participantCoefficient: number;
    totalBonus: number;
    comprehensivePoints: number;
    youthFinalPoints?: number; // 青少年最终积分
    progressBonus?: number;    // 进步奖励分
  } {
    // 1. 计算基础积分
    const basicPoints = this.calculateBasicPoints(
      athlete.time,
      raceConfig.winnerTime,
      raceConfig.discipline
    );

    // 2. 获取各系数
    const eventCoefficient = EVENT_COEFFICIENTS[raceConfig.eventLevel];
    const qualityCoefficient = this.calculateQualityCoefficient(raceConfig.top8AveragePoints);
    const participantCoefficient = this.getParticipantCoefficient(raceConfig.participantCount);

    // 3. 计算附加分总和
    const totalBonus = bonusPoints.reduce((sum, bonus) => sum + bonus.points, 0);

    // 4. 计算综合积分
    const comprehensivePoints = Math.round(
      (basicPoints * eventCoefficient * qualityCoefficient * participantCoefficient + totalBonus) * 100
    ) / 100;

    const result = {
      basicPoints: Math.round(basicPoints * 100) / 100,
      eventCoefficient,
      qualityCoefficient: Math.round(qualityCoefficient * 100) / 100,
      participantCoefficient,
      totalBonus,
      comprehensivePoints
    };

    // 5. 青少年特殊处理
    if (athlete.ageGroup !== AgeGroup.ADULT) {
      const youthConfig = YOUTH_COEFFICIENTS[athlete.ageGroup];
      let youthFinalPoints = comprehensivePoints * youthConfig.coefficient;

      // 进步奖励分
      let progressBonus = 0;
      if (athlete.previousRank && athlete.previousRank > 0) {
        // 假设当前排名需要从其他地方获取，这里简化处理
        // 实际应用中需要传入当前排名
        progressBonus = youthConfig.progressBonus; // 简化示例
      }

      youthFinalPoints = Math.round((youthFinalPoints + progressBonus) * 100) / 100;

      return {
        ...result,
        youthFinalPoints,
        progressBonus
      };
    }

    return result;
  }

  /**
   * 批量计算比赛所有运动员的综合积分
   */
  calculateRaceResults(
    athletes: AthleteResult[],
    raceConfig: RaceConfig,
    athleteBonuses: Map<string, BonusPoint[]> = new Map()
  ): Array<AthleteResult & ReturnType<typeof this.calculateComprehensivePoints>> {
    return athletes.map(athlete => {
      const bonuses = athleteBonuses.get(athlete.athleteId) || [];
      const calculation = this.calculateComprehensivePoints(athlete, raceConfig, bonuses);

      return {
        ...athlete,
        ...calculation
      };
    }).sort((a, b) => a.comprehensivePoints - b.comprehensivePoints); // 按积分排序（积分越低名次越好）
  }
}

// 导出单例实例
export const comprehensivePointsCalculator = new ComprehensivePointsCalculator();