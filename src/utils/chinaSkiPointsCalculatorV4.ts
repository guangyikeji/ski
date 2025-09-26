/**
 * 中国高山滑雪积分计算引擎 v4.0
 * 完全遵循官方《中国高山滑雪赛事积分规则v4.docx》
 * 简化版积分计算，去除复杂的质量系数和人数系数
 */

// 赛事等级系数（官方v4.0标准）
export enum EventLevel {
  A = 'A',  // A级赛事（系数1.0）：全国锦标赛、冬运会等
  B = 'B',  // B级赛事（系数0.6）：省级锦标赛、区域邀请赛等
  C = 'C'   // C级赛事（系数0.3）：地市级赛事等
}

export const EVENT_COEFFICIENTS_V4 = {
  [EventLevel.A]: 1.0,
  [EventLevel.B]: 0.6,
  [EventLevel.C]: 0.3
} as const;

// 项目系数（与v2.0相同）
export const DISCIPLINE_FACTORS_V4 = {
  DH: 1250,    // 速降
  SL: 730,     // 回转
  GS: 1010,    // 大回转
  SG: 1190,    // 超级大回转
  AC: 1360     // 全能
} as const;

// 青少年年龄组（根据v4.docx官方文档）
export enum AgeGroupV4 {
  U15 = 'U15',  // 15岁以下（正式积分）
  U18 = 'U18',  // 18岁以下（正式积分）
  ADULT = 'ADULT'
}

// 最大积分值（官方v4.0标准）
export const MAX_POINTS_V4 = {
  DH: 330,    // 滑降
  SG: 270,    // 超级大回转
  GS: 220,    // 大回转
  SL: 165,    // 回转
  AC: 270     // 全能
} as const;

export interface AthleteResultV4 {
  athleteId: string;
  name: string;
  time: number;                    // 用时（秒）
  ageGroup: AgeGroupV4;
  currentChinaPoints?: number;     // 当前中国积分（用于判罚分计算）
}

export interface RaceConfigV4 {
  eventLevel: EventLevel;
  discipline: keyof typeof DISCIPLINE_FACTORS_V4;
  winnerTime: number;              // 冠军用时（秒）
  // 判罚分计算需要的数据
  top10Best5Points?: number[];     // 前10名中最好5名的积分
  allBest5Points?: number[];       // 所有参赛选手中最好5名的积分
  allBest5RacePoints?: number[];   // 对应的5名选手的基础比赛积分
}

export interface CalculationResultV4 {
  baseRacePoints: number;          // 基础比赛积分
  penalty: number;                 // 判罚分
  eventCoefficient: number;        // 赛事系数
  finalPoints: number;             // 最终积分
}

export class ChinaSkiPointsCalculatorV4 {

  /**
   * 计算基础比赛积分（v4.0标准公式）
   * P = F × (Tx/To - 1)
   */
  calculateBaseRacePoints(
    athleteTime: number, 
    winnerTime: number, 
    discipline: keyof typeof DISCIPLINE_FACTORS_V4
  ): number {
    const F = DISCIPLINE_FACTORS_V4[discipline];
    const basePoints = F * (athleteTime / winnerTime - 1);
    return Math.round(basePoints * 100) / 100; // 保留2位小数
  }

  /**
   * 计算判罚分（v4.0标准）
   * Penalty = (Sum A + Sum B - Sum C) ÷ 10
   */
  calculatePenalty(
    sumA: number[], // 前10名中最好5名选手的积分总和
    sumB: number[], // 所有参赛选手中最好5名的积分总和
    sumC: number[]  // 对应Sum B的5名选手的基础比赛积分总和
  ): number {
    if (sumA.length < 5 || sumB.length < 5 || sumC.length < 5) {
      // 如果数据不足，使用最大积分值补足或返回0
      return 0;
    }

    const totalA = sumA.slice(0, 5).reduce((sum, points) => sum + points, 0);
    const totalB = sumB.slice(0, 5).reduce((sum, points) => sum + points, 0);
    const totalC = sumC.slice(0, 5).reduce((sum, points) => sum + points, 0);

    const penalty = (totalA + totalB - totalC) / 10;
    return Math.round(penalty * 100) / 100; // 保留2位小数
  }

  /**
   * 计算最终积分（v4.0核心公式）
   * 最终积分 = (基础比赛积分 + 判罚分) × 赛事系数
   */
  calculateFinalPoints(
    athlete: AthleteResultV4,
    raceConfig: RaceConfigV4
  ): CalculationResultV4 {
    // 1. 计算基础比赛积分
    const baseRacePoints = this.calculateBaseRacePoints(
      athlete.time,
      raceConfig.winnerTime,
      raceConfig.discipline
    );

    // 2. 计算判罚分
    let penalty = 0;
    if (raceConfig.top10Best5Points && 
        raceConfig.allBest5Points && 
        raceConfig.allBest5RacePoints) {
      penalty = this.calculatePenalty(
        raceConfig.top10Best5Points,
        raceConfig.allBest5Points,
        raceConfig.allBest5RacePoints
      );
    }

    // 3. 获取赛事系数
    const eventCoefficient = EVENT_COEFFICIENTS_V4[raceConfig.eventLevel];

    // 4. 计算最终积分
    const finalPoints = (baseRacePoints + penalty) * eventCoefficient;

    return {
      baseRacePoints,
      penalty,
      eventCoefficient,
      finalPoints: Math.round(finalPoints * 100) / 100
    };
  }

  /**
   * 简化版积分计算（不含判罚分）
   * 适用于积分计算器演示使用
   */
  calculateSimplifiedPoints(
    athleteTime: number,
    winnerTime: number,
    discipline: keyof typeof DISCIPLINE_FACTORS_V4,
    eventLevel: EventLevel,
    penalty: number = 0
  ): CalculationResultV4 {
    const baseRacePoints = this.calculateBaseRacePoints(athleteTime, winnerTime, discipline);
    const eventCoefficient = EVENT_COEFFICIENTS_V4[eventLevel];
    const finalPoints = (baseRacePoints + penalty) * eventCoefficient;

    return {
      baseRacePoints,
      penalty,
      eventCoefficient, 
      finalPoints: Math.round(finalPoints * 100) / 100
    };
  }

  /**
   * 批量计算比赛所有运动员的积分
   */
  calculateRaceResults(
    athletes: AthleteResultV4[],
    raceConfig: RaceConfigV4
  ): Array<AthleteResultV4 & CalculationResultV4> {
    return athletes.map(athlete => {
      const calculation = this.calculateFinalPoints(athlete, raceConfig);
      return {
        ...athlete,
        ...calculation
      };
    }).sort((a, b) => a.finalPoints - b.finalPoints); // 按积分排序（积分越低名次越好）
  }

  /**
   * 获取项目最大积分值
   */
  getMaxPoints(discipline: keyof typeof DISCIPLINE_FACTORS_V4): number {
    return MAX_POINTS_V4[discipline];
  }

  /**
   * 验证积分有效性
   */
  isValidPoints(points: number, discipline: keyof typeof DISCIPLINE_FACTORS_V4): boolean {
    const maxPoints = this.getMaxPoints(discipline);
    return points >= 0 && points <= maxPoints;
  }
}

// 导出单例实例
export const chinaSkiPointsCalculatorV4 = new ChinaSkiPointsCalculatorV4();