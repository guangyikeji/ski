/**
 * 中国高山滑雪积分计算引擎
 * 基于《中国高山滑雪赛事积分规则v1.1》
 */

// 项目系数 - 中国标准
export const CHINA_DISCIPLINE_FACTORS = {
  DH: 1250,    // 速降 (Downhill)
  SL: 730,     // 回转 (Slalom)
  GS: 1010,    // 大回转 (Giant Slalom)
  SG: 1190,    // 超级大回转 (Super Giant Slalom)
  AC: 1360     // 全能 (Alpine Combined)
} as const

// 最大积分值限制 - 中国标准
export const CHINA_MAX_POINTS = {
  DH: 330,     // 速降
  SG: 270,     // 超级大回转
  SL: 165,     // 回转
  GS: 220,     // 大回转
  AC: 270      // 全能
} as const

// 中国特殊状态处理
export const CHINA_SPECIAL_STATUS = {
  INJURY_PROTECTION: 1.10,    // 伤病保护: 增加10%
  PREGNANCY_PROTECTION: 9,    // 怀孕保护: 最多9个月
  CONFIRMED_POINTS: 4,        // 积分确认: 退役选手4个赛季
  YOUTH_PROTECTION: 1.05      // 青训保护: U18增加5%
} as const

// 省份配额系数
export const PROVINCE_QUOTA_COEFFICIENTS = {
  TIER_1: ['北京', '黑龙江', '吉林', '辽宁', '河北', '新疆'],      // 一线省份
  TIER_2: ['内蒙古', '山西', '陕西', '甘肃', '青海', '宁夏'],      // 二线省份
  TIER_3: ['其他省份']                                           // 其他省份
}

export type DisciplineCode = keyof typeof CHINA_DISCIPLINE_FACTORS
export type ProvinceCode = string

export interface RaceResult {
  athleteId: string
  athleteName: string
  province: string
  time: number              // 成绩时间(秒)
  chinaPoints?: number      // 现有中国积分
  position: number          // 名次
  dnf?: boolean            // 是否未完成比赛
  dsq?: boolean            // 是否被取消资格
}

export interface CompetitionInfo {
  id: string
  name: string
  date: Date
  discipline: DisciplineCode
  level: 'national' | 'regional' | 'provincial' | 'training'
  venue: string
  winnerTime: number        // 冠军成绩
}

export interface CalculationResult {
  athleteId: string
  racePoints: number        // 比赛积分
  penalty: number           // 罚分值
  finalPoints: number       // 最终积分
  status: 'normal' | 'injury_protected' | 'youth_protected'
}

/**
 * 中国高山滑雪积分计算器
 */
export class ChinaPointsCalculator {

  /**
   * 计算比赛积分 (Race Points)
   * 公式: P = F × (Tx/To - 1)
   */
  calculateRacePoints(
    competitorTime: number,
    winnerTime: number,
    discipline: DisciplineCode
  ): number {
    const F = CHINA_DISCIPLINE_FACTORS[discipline]
    const racePoints = F * (competitorTime / winnerTime - 1)
    return Math.max(0, this.roundPoints(racePoints))
  }

  /**
   * 计算罚分值 (Penalty) - 中国特色修正
   * 中国公式: penalty = (sumA + sumB - sumC) ÷ 12 (国际标准为÷10)
   */
  calculatePenalty(
    top10ChinaPoints: number[],
    allCompetitorsChinaPoints: number[],
    top5RacePoints: number[]
  ): number {
    // 获取前10名中最好5名的中国积分
    const sumA = top10ChinaPoints
      .sort((a, b) => a - b)
      .slice(0, 5)
      .reduce((sum, points) => sum + points, 0)

    // 获取所有选手中最好5名的中国积分
    const sumB = allCompetitorsChinaPoints
      .sort((a, b) => a - b)
      .slice(0, 5)
      .reduce((sum, points) => sum + points, 0)

    // 获取最好5名的比赛积分
    const sumC = top5RacePoints.reduce((sum, points) => sum + points, 0)

    // 中国标准: 除以12 (而非国际标准的10)
    const penalty = (sumA + sumB - sumC) / 12
    return Math.max(0, this.roundPoints(penalty))
  }

  /**
   * 计算最终积分
   * 最终积分 = 比赛积分 + 罚分值
   */
  calculateFinalPoints(
    racePoints: number,
    penalty: number,
    discipline: DisciplineCode,
    specialStatus?: keyof typeof CHINA_SPECIAL_STATUS
  ): number {
    let finalPoints = racePoints + penalty

    // 应用特殊状态调整
    if (specialStatus) {
      const adjustment = CHINA_SPECIAL_STATUS[specialStatus]
      if (typeof adjustment === 'number' && adjustment > 1) {
        finalPoints *= adjustment
      }
    }

    // 应用最大积分限制
    const maxPoints = CHINA_MAX_POINTS[discipline]
    finalPoints = Math.min(finalPoints, maxPoints)

    return this.roundPoints(finalPoints)
  }

  /**
   * 计算省份配额分配
   */
  calculateProvinceQuota(
    province: string,
    rankingPosition: number,
    athleteCount: number
  ): number {
    let baseQuota = 0

    // 基础配额计算
    if (rankingPosition <= 150) {
      if (athleteCount >= 10) baseQuota = 10
      else if (athleteCount >= 9) baseQuota = 9
      else if (athleteCount >= 8) baseQuota = 8
      else if (athleteCount >= 7) baseQuota = 7
      else baseQuota = 6
    } else if (rankingPosition <= 300) {
      baseQuota = athleteCount >= 2 ? 5 : 4
    }

    // 省份系数调整
    if (PROVINCE_QUOTA_COEFFICIENTS.TIER_1.includes(province)) {
      return Math.floor(baseQuota * 1.2) // 一线省份+20%
    } else if (PROVINCE_QUOTA_COEFFICIENTS.TIER_2.includes(province)) {
      return Math.floor(baseQuota * 1.1) // 二线省份+10%
    }

    return baseQuota
  }

  /**
   * 应用伤病保护机制
   */
  applyInjuryProtection(
    currentPoints: number,
    previousBestPoints: number,
    injuryDate: Date,
    competitionDate: Date
  ): number {
    const monthsDiff = this.getMonthsDifference(injuryDate, competitionDate)

    // 伤病保护期内(12个月)
    if (monthsDiff <= 12) {
      const protectedPoints = previousBestPoints * CHINA_SPECIAL_STATUS.INJURY_PROTECTION
      return Math.min(currentPoints, protectedPoints)
    }

    return currentPoints
  }

  /**
   * 应用青训保护 (U18/U15)
   */
  applyYouthProtection(
    points: number,
    birthDate: Date,
    competitionDate: Date
  ): number {
    const age = this.calculateAge(birthDate, competitionDate)

    if (age < 18) {
      return points * CHINA_SPECIAL_STATUS.YOUTH_PROTECTION // 减少5%
    }

    return points
  }

  /**
   * 基础积分表(BL)更新规则
   */
  calculateBaseListPoints(
    previousResults: number[],
    previousBL?: number
  ): number {
    if (previousResults.length >= 2) {
      // 使用两个最佳成绩的平均值
      const bestTwo = previousResults.sort((a, b) => a - b).slice(0, 2)
      return bestTwo.reduce((a, b) => a + b) / 2
    } else if (previousResults.length === 1) {
      // 仅有一次成绩：附加20%
      return previousResults[0] * 1.20
    } else if (previousBL) {
      // 无成绩：在之前BL基础上增加50%
      return previousBL * 1.50
    }

    return 999.99 // 新运动员默认积分
  }

  /**
   * 批量计算比赛结果
   */
  calculateCompetitionResults(
    results: RaceResult[],
    competition: CompetitionInfo
  ): CalculationResult[] {
    const validResults = results.filter(r => !r.dnf && !r.dsq)
    const sortedResults = validResults.sort((a, b) => a.time - b.time)

    // 获取各种积分数组
    const top10ChinaPoints = sortedResults
      .slice(0, 10)
      .map(r => r.chinaPoints || 999.99)

    const allChinaPoints = sortedResults
      .map(r => r.chinaPoints || 999.99)

    const top5RacePoints = sortedResults
      .slice(0, 5)
      .map(r => this.calculateRacePoints(r.time, competition.winnerTime, competition.discipline))

    // 计算罚分值
    const penalty = this.calculatePenalty(top10ChinaPoints, allChinaPoints, top5RacePoints)

    // 计算每个运动员的最终积分
    return validResults.map(result => {
      const racePoints = this.calculateRacePoints(
        result.time,
        competition.winnerTime,
        competition.discipline
      )

      const finalPoints = this.calculateFinalPoints(
        racePoints,
        penalty,
        competition.discipline
      )

      return {
        athleteId: result.athleteId,
        racePoints,
        penalty,
        finalPoints,
        status: 'normal'
      }
    })
  }

  /**
   * 积分舍入规则
   * 从0.004向下舍入，从0.005向上舍入
   */
  private roundPoints(points: number): number {
    return Math.round(points * 100) / 100
  }

  /**
   * 计算月份差异
   */
  private getMonthsDifference(date1: Date, date2: Date): number {
    const yearDiff = date2.getFullYear() - date1.getFullYear()
    const monthDiff = date2.getMonth() - date1.getMonth()
    return yearDiff * 12 + monthDiff
  }

  /**
   * 计算年龄
   */
  private calculateAge(birthDate: Date, currentDate: Date): number {
    const age = currentDate.getFullYear() - birthDate.getFullYear()
    const monthDiff = currentDate.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
      return age - 1
    }

    return age
  }
}

// 导出计算器实例
export const chinaPointsCalculator = new ChinaPointsCalculator()