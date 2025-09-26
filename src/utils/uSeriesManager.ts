/**
 * U系列青少年分组管理系统
 * 基于2025-2026赛季全国BA、SS青少年U系列比赛方案
 * 支持年龄验证、分组管理、参赛资格审查
 */

import {
  AgeGroup,
  SkiDiscipline,
  SkiCategory,
  MultiSportAthlete,
  MultiSportCompetition,
  AGE_GROUP_NAMES
} from '../data/multiSportData';

// U系列年龄组配置
export interface USeriesAgeGroupConfig {
  ageGroup: AgeGroup;
  minAge: number;
  maxAge: number;
  birthYearRange: {
    earliest: number;  // 最早出生年份
    latest: number;    // 最晚出生年份
  };
  maxParticipants: number;     // 每组别参赛人数上限
  eligibleDisciplines: SkiDiscipline[]; // 可参加项目
}

// 年龄验证结果
export interface AgeVerificationResult {
  isEligible: boolean;
  calculatedAge: number;
  recommendedAgeGroup: AgeGroup | null;
  eligibleAgeGroups: AgeGroup[];
  verificationDetails: {
    birthDate: Date;
    competitionYear: number;
    cutoffDate: Date;
    exactAge: number;
  };
  errors?: string[];
}

// 分组结果
export interface GroupingResult {
  athleteId: string;
  assignedAgeGroup: AgeGroup;
  isConfirmed: boolean;
  alternativeGroups: AgeGroup[];
  registrationStatus: 'pending' | 'confirmed' | 'rejected' | 'waitlist';
  registrationDate: string;
}

// U系列比赛统计
export interface USeriesStatistics {
  totalRegistered: number;
  byAgeGroup: {
    [key in AgeGroup]?: {
      registered: number;
      maxCapacity: number;
      availableSlots: number;
      waitlistCount: number;
    };
  };
  byDiscipline: {
    [key in SkiDiscipline]?: {
      registered: number;
      byAgeGroup: { [key in AgeGroup]?: number };
    };
  };
  registrationTrends: {
    date: string;
    totalRegistrations: number;
    newRegistrations: number;
  }[];
}

export class USeriesManager {

  // U系列年龄组配置（基于2025-2026赛季文档）
  private readonly ageGroupConfigs: USeriesAgeGroupConfig[] = [
    {
      ageGroup: AgeGroup.U12,
      minAge: 8,
      maxAge: 11,
      birthYearRange: { earliest: 2014, latest: 2018 }, // 基于2025年比赛
      maxParticipants: 32,
      eligibleDisciplines: [
        SkiDiscipline.FREESTYLE_BA,
        SkiDiscipline.FREESTYLE_SS,
        SkiDiscipline.SNOWBOARD_BA,
        SkiDiscipline.SNOWBOARD_SS
      ]
    },
    {
      ageGroup: AgeGroup.U15,
      minAge: 12,
      maxAge: 14,
      birthYearRange: { earliest: 2011, latest: 2013 },
      maxParticipants: 32,
      eligibleDisciplines: [
        SkiDiscipline.FREESTYLE_BA,
        SkiDiscipline.FREESTYLE_SS,
        SkiDiscipline.SNOWBOARD_BA,
        SkiDiscipline.SNOWBOARD_SS
      ]
    },
    {
      ageGroup: AgeGroup.U18,
      minAge: 15,
      maxAge: 17,
      birthYearRange: { earliest: 2008, latest: 2011 },
      maxParticipants: 32,
      eligibleDisciplines: [
        SkiDiscipline.FREESTYLE_BA,
        SkiDiscipline.FREESTYLE_SS,
        SkiDiscipline.SNOWBOARD_BA,
        SkiDiscipline.SNOWBOARD_SS
      ]
    }
  ];

  /**
   * 验证运动员年龄资格
   * 基于二代身份证信息进行验证
   */
  verifyAgeEligibility(
    birthDate: string,
    idCardNumber: string,
    competitionYear: number = 2025
  ): AgeVerificationResult {

    const errors: string[] = [];

    // 验证身份证号格式
    if (!this.validateIdCardNumber(idCardNumber)) {
      errors.push('身份证号格式不正确');
    }

    // 验证出生日期格式
    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) {
      errors.push('出生日期格式不正确');
    }

    // 验证身份证与出生日期一致性
    if (!this.verifyIdCardBirthDate(idCardNumber, birthDate)) {
      errors.push('身份证号与出生日期不符');
    }

    if (errors.length > 0) {
      return {
        isEligible: false,
        calculatedAge: 0,
        recommendedAgeGroup: null,
        eligibleAgeGroups: [],
        verificationDetails: {
          birthDate: birth,
          competitionYear,
          cutoffDate: new Date(competitionYear, 11, 31),
          exactAge: 0
        },
        errors
      };
    }

    // 计算年龄（以比赛年度12月31日为准）
    const cutoffDate = new Date(competitionYear, 11, 31);
    const calculatedAge = this.calculateAge(birth, cutoffDate);

    // 确定适用的年龄组
    const eligibleAgeGroups = this.getEligibleAgeGroups(calculatedAge);
    const recommendedAgeGroup = eligibleAgeGroups.length > 0 ? eligibleAgeGroups[0] : null;

    return {
      isEligible: eligibleAgeGroups.length > 0,
      calculatedAge,
      recommendedAgeGroup,
      eligibleAgeGroups,
      verificationDetails: {
        birthDate: birth,
        competitionYear,
        cutoffDate,
        exactAge: calculatedAge
      }
    };
  }

  /**
   * 自动分组运动员
   */
  assignAgeGroup(
    athlete: MultiSportAthlete,
    competitionYear: number = 2025
  ): GroupingResult {

    const verification = this.verifyAgeEligibility(
      athlete.birthDate,
      athlete.idCardNumber,
      competitionYear
    );

    if (!verification.isEligible || !verification.recommendedAgeGroup) {
      return {
        athleteId: athlete.id,
        assignedAgeGroup: AgeGroup.ADULT, // 默认分配到大众组
        isConfirmed: false,
        alternativeGroups: [],
        registrationStatus: 'rejected',
        registrationDate: new Date().toISOString().split('T')[0]
      };
    }

    return {
      athleteId: athlete.id,
      assignedAgeGroup: verification.recommendedAgeGroup,
      isConfirmed: true,
      alternativeGroups: verification.eligibleAgeGroups.filter(
        group => group !== verification.recommendedAgeGroup
      ),
      registrationStatus: 'confirmed',
      registrationDate: new Date().toISOString().split('T')[0]
    };
  }

  /**
   * 批量处理运动员分组
   */
  batchAssignAgeGroups(
    athletes: MultiSportAthlete[],
    competitionYear: number = 2025
  ): GroupingResult[] {

    return athletes.map(athlete =>
      this.assignAgeGroup(athlete, competitionYear)
    );
  }

  /**
   * 检查年龄组容量限制
   */
  checkAgeGroupCapacity(
    ageGroup: AgeGroup,
    currentRegistrations: number
  ): {
    isAvailable: boolean;
    maxCapacity: number;
    availableSlots: number;
    isNearingCapacity: boolean;
  } {

    const config = this.getAgeGroupConfig(ageGroup);
    if (!config) {
      return {
        isAvailable: false,
        maxCapacity: 0,
        availableSlots: 0,
        isNearingCapacity: false
      };
    }

    const availableSlots = config.maxParticipants - currentRegistrations;
    const isAvailable = availableSlots > 0;
    const isNearingCapacity = availableSlots <= 5; // 剩余5个名额时警告

    return {
      isAvailable,
      maxCapacity: config.maxParticipants,
      availableSlots: Math.max(0, availableSlots),
      isNearingCapacity
    };
  }

  /**
   * 管理候补名单
   */
  manageWaitlist(
    ageGroup: AgeGroup,
    newRegistration: GroupingResult,
    currentRegistrations: GroupingResult[]
  ): {
    status: 'confirmed' | 'waitlist' | 'rejected';
    position?: number;
    estimatedWaitTime?: string;
  } {

    const capacity = this.checkAgeGroupCapacity(
      ageGroup,
      currentRegistrations.filter(r => r.registrationStatus === 'confirmed').length
    );

    if (capacity.isAvailable) {
      return { status: 'confirmed' };
    }

    // 计算候补位置
    const waitlistCount = currentRegistrations.filter(
      r => r.registrationStatus === 'waitlist'
    ).length;

    return {
      status: 'waitlist',
      position: waitlistCount + 1,
      estimatedWaitTime: this.estimateWaitTime(waitlistCount + 1)
    };
  }

  /**
   * 生成U系列统计报告
   */
  generateUSeriesStatistics(
    registrations: GroupingResult[],
    disciplines: SkiDiscipline[]
  ): USeriesStatistics {

    const totalRegistered = registrations.length;
    const byAgeGroup: USeriesStatistics['byAgeGroup'] = {};
    const byDiscipline: USeriesStatistics['byDiscipline'] = {};

    // 按年龄组统计
    this.ageGroupConfigs.forEach(config => {
      const ageGroupRegistrations = registrations.filter(
        r => r.assignedAgeGroup === config.ageGroup
      );

      const confirmed = ageGroupRegistrations.filter(
        r => r.registrationStatus === 'confirmed'
      ).length;

      const waitlist = ageGroupRegistrations.filter(
        r => r.registrationStatus === 'waitlist'
      ).length;

      byAgeGroup[config.ageGroup] = {
        registered: confirmed,
        maxCapacity: config.maxParticipants,
        availableSlots: Math.max(0, config.maxParticipants - confirmed),
        waitlistCount: waitlist
      };
    });

    // 按项目统计
    disciplines.forEach(discipline => {
      byDiscipline[discipline] = {
        registered: registrations.length, // 简化统计
        byAgeGroup: {}
      };

      this.ageGroupConfigs.forEach(config => {
        const count = registrations.filter(
          r => r.assignedAgeGroup === config.ageGroup &&
               config.eligibleDisciplines.includes(discipline)
        ).length;

        byDiscipline[discipline]!.byAgeGroup[config.ageGroup] = count;
      });
    });

    // 注册趋势（示例数据）
    const registrationTrends = this.generateRegistrationTrends(registrations);

    return {
      totalRegistered,
      byAgeGroup,
      byDiscipline,
      registrationTrends
    };
  }

  /**
   * 验证项目参赛资格
   */
  validateDisciplineEligibility(
    ageGroup: AgeGroup,
    discipline: SkiDiscipline
  ): boolean {

    const config = this.getAgeGroupConfig(ageGroup);
    return config ? config.eligibleDisciplines.includes(discipline) : false;
  }

  /**
   * 获取年龄组可参加项目
   */
  getEligibleDisciplines(ageGroup: AgeGroup): SkiDiscipline[] {
    const config = this.getAgeGroupConfig(ageGroup);
    return config ? config.eligibleDisciplines : [];
  }

  // 私有辅助方法

  private validateIdCardNumber(idCard: string): boolean {
    // 简化的身份证号验证，实际应用中需要更严格的验证
    const pattern = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dX]$/;
    return pattern.test(idCard);
  }

  private verifyIdCardBirthDate(idCard: string, birthDate: string): boolean {
    if (!this.validateIdCardNumber(idCard)) return false;

    // 从身份证号提取出生日期
    const year = idCard.substring(6, 10);
    const month = idCard.substring(10, 12);
    const day = idCard.substring(12, 14);

    const idBirthDate = `${year}-${month}-${day}`;
    return idBirthDate === birthDate;
  }

  private calculateAge(birthDate: Date, cutoffDate: Date): number {
    let age = cutoffDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = cutoffDate.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && cutoffDate.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  private getEligibleAgeGroups(age: number): AgeGroup[] {
    return this.ageGroupConfigs
      .filter(config => age >= config.minAge && age <= config.maxAge)
      .map(config => config.ageGroup);
  }

  private getAgeGroupConfig(ageGroup: AgeGroup): USeriesAgeGroupConfig | undefined {
    return this.ageGroupConfigs.find(config => config.ageGroup === ageGroup);
  }

  private estimateWaitTime(position: number): string {
    // 基于历史数据估算候补转正时间
    if (position <= 3) return '1-2周';
    if (position <= 8) return '2-4周';
    if (position <= 15) return '1-2个月';
    return '赛季中期或下赛季';
  }

  private generateRegistrationTrends(
    registrations: GroupingResult[]
  ): { date: string; totalRegistrations: number; newRegistrations: number; }[] {

    // 按日期分组统计注册趋势
    const dateGroups = registrations.reduce((groups, registration) => {
      const date = registration.registrationDate;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(registration);
      return groups;
    }, {} as { [date: string]: GroupingResult[] });

    const trends: { date: string; totalRegistrations: number; newRegistrations: number; }[] = [];
    let totalCount = 0;

    Object.keys(dateGroups)
      .sort()
      .forEach(date => {
        const newRegistrations = dateGroups[date].length;
        totalCount += newRegistrations;

        trends.push({
          date,
          totalRegistrations: totalCount,
          newRegistrations
        });
      });

    return trends;
  }
}

// 导出单例实例
export const uSeriesManager = new USeriesManager();

// 导出辅助工具函数
export const USeriesUtils = {
  /**
   * 获取年龄组显示名称
   */
  getAgeGroupDisplayName(ageGroup: AgeGroup): string {
    return AGE_GROUP_NAMES[ageGroup] || ageGroup;
  },

  /**
   * 检查是否为U系列组别
   */
  isUSeriesAgeGroup(ageGroup: AgeGroup): boolean {
    return [AgeGroup.U12, AgeGroup.U15, AgeGroup.U18].includes(ageGroup);
  },

  /**
   * 获取年龄组颜色标识（用于UI显示）
   */
  getAgeGroupColor(ageGroup: AgeGroup): string {
    const colors = {
      [AgeGroup.U12]: '#FFB74D',  // 橙色
      [AgeGroup.U15]: '#64B5F6',  // 蓝色
      [AgeGroup.U18]: '#81C784',  // 绿色
      [AgeGroup.ADULT]: '#9E9E9E' // 灰色
    };
    return colors[ageGroup] || '#9E9E9E';
  },

  /**
   * 格式化注册状态
   */
  formatRegistrationStatus(status: string): string {
    const statusMap = {
      'pending': '审核中',
      'confirmed': '已确认',
      'rejected': '已拒绝',
      'waitlist': '候补中'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  },

  /**
   * 计算年龄组注册进度百分比
   */
  calculateRegistrationProgress(
    registered: number,
    maxCapacity: number
  ): number {
    return Math.round((registered / maxCapacity) * 100);
  },

  /**
   * 生成年龄组摘要信息
   */
  generateAgeGroupSummary(
    ageGroup: AgeGroup,
    statistics: USeriesStatistics
  ): string {
    const stats = statistics.byAgeGroup[ageGroup];
    if (!stats) return '暂无数据';

    const progress = this.calculateRegistrationProgress(
      stats.registered,
      stats.maxCapacity
    );

    return `${stats.registered}/${stats.maxCapacity} (${progress}%)`;
  }
};