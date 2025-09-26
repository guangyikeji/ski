/**
 * 场地标准管理模块
 * 基于HPSSBA场地标准.xlsx和2025-2026赛季比赛方案
 * 管理大跳台、坡面障碍技巧、U型场地等技术标准
 */

import {
  SkiDiscipline,
  VenueLevel,
  VenueStandard,
  PointsCategory
} from '../data/multiSportData';

// 场地技术参数接口
export interface VenueTechnicalSpecs {
  // 大跳台技术参数
  bigAir: {
    approachLength: { min: number; recommended: number }; // 助滑区长度(米)
    approachGradient: { min: number; recommended: number }; // 助滑区坡度(度)
    jumpHeight: { min: number; recommended: number }; // 跳台高度(米)
    takeoffAngle: { min: number; max: number }; // 起跳角度(度)
    landingDistance: { min: number; recommended: number }; // 起跳点至落地区距离(米)
    landingGradient: { min: number; max: number }; // 落地坡度(度)
    landingWidth: { min: number; recommended: number }; // 落地区宽度(米)
    safetyZone: { sides: number; end: number }; // 安全区域(米)
  };

  // 坡面障碍技巧技术参数
  slopestyle: {
    verticalDrop: { min: number; recommended: number }; // 垂直落差(米)
    averageGradient: { min: number; max: number }; // 平均坡度(度)
    slopeWidth: { min: number; recommended: number }; // 坡面宽度(米)
    courseLength: { min: number; max: number }; // 赛道长度(米)
    obstacleTypes: { min: number; max: number }; // 道具类型数量
    minimumObstacles: number; // 最少障碍数量
    obstacleSeparation: { min: number; max: number }; // 障碍间距(米)
    safetyZones: { between: number; sides: number }; // 安全区域(米)
  };

  // U型场地技术参数
  halfpipe: {
    trackLength: { min: number; recommended: number }; // 赛道长度(米)
    trackDepth: { min: number; max: number }; // 赛道深度(米)
    trackWidth: { min: number; max: number }; // 场地宽度(米)
    gradient: { min: number; max: number }; // 坡度(度)
    wallHeight: { min: number; max: number }; // 壁面高度(米)
    transitionRadius: { min: number; max: number }; // 过渡段半径(米)
    flatBottom: { min: number; max: number }; // 平底宽度(米)
  };
}

// 场地认证结果
export interface VenueCertificationResult {
  venueId: string;
  discipline: SkiDiscipline;
  certifiedLevel: VenueLevel | null;
  isCompliant: boolean;

  // 详细检查结果
  compliance: {
    overall: boolean;
    safety: boolean;
    technical: boolean;
    equipment: boolean;
  };

  // 不符合项详情
  nonCompliantItems: {
    category: 'safety' | 'technical' | 'equipment';
    parameter: string;
    required: number | string;
    actual: number | string;
    severity: 'critical' | 'major' | 'minor';
  }[];

  // 改进建议
  recommendations: {
    priority: 'high' | 'medium' | 'low';
    description: string;
    estimatedCost?: number;
    timeline?: string;
  }[];

  certificationDate: string;
  validUntil: string;
  inspectorId: string;
}

// 场地标准配置映射
export class VenueStandardsManager {

  // 基于文档的场地标准配置
  private readonly venueStandards: Record<VenueLevel, Record<SkiDiscipline, VenueTechnicalSpecs | null>> = {
    [VenueLevel.LEVEL_1]: {
      // 一级赛事标准（最高级别）
      [SkiDiscipline.FREESTYLE_BA]: {
        bigAir: {
          approachLength: { min: 40, recommended: 50 },
          approachGradient: { min: 25, recommended: 30 },
          jumpHeight: { min: 3, recommended: 4 },
          takeoffAngle: { min: 30, max: 40 },
          landingDistance: { min: 12, recommended: 15 },
          landingGradient: { min: 28, max: 35 },
          landingWidth: { min: 25, recommended: 30 },
          safetyZone: { sides: 10, end: 20 }
        },
        slopestyle: {
          verticalDrop: { min: 60, recommended: 80 },
          averageGradient: { min: 15, max: 25 },
          slopeWidth: { min: 40, recommended: 50 },
          courseLength: { min: 300, max: 600 },
          obstacleTypes: { min: 3, max: 5 },
          minimumObstacles: 5,
          obstacleSeparation: { min: 30, max: 80 },
          safetyZones: { between: 15, sides: 10 }
        },
        halfpipe: {
          trackLength: { min: 150, recommended: 170 },
          trackDepth: { min: 5.5, max: 6.5 },
          trackWidth: { min: 17, max: 19 },
          gradient: { min: 17, max: 20 },
          wallHeight: { min: 3.5, max: 4.5 },
          transitionRadius: { min: 3.5, max: 4.0 },
          flatBottom: { min: 6, max: 8 }
        }
      },
      [SkiDiscipline.SNOWBOARD_BA]: {
        bigAir: {
          approachLength: { min: 40, recommended: 50 },
          approachGradient: { min: 25, recommended: 30 },
          jumpHeight: { min: 3, recommended: 4 },
          takeoffAngle: { min: 30, max: 40 },
          landingDistance: { min: 12, recommended: 15 },
          landingGradient: { min: 28, max: 35 },
          landingWidth: { min: 25, recommended: 30 },
          safetyZone: { sides: 10, end: 20 }
        },
        slopestyle: {
          verticalDrop: { min: 60, recommended: 80 },
          averageGradient: { min: 15, max: 25 },
          slopeWidth: { min: 40, recommended: 50 },
          courseLength: { min: 300, max: 600 },
          obstacleTypes: { min: 3, max: 5 },
          minimumObstacles: 5,
          obstacleSeparation: { min: 30, max: 80 },
          safetyZones: { between: 15, sides: 10 }
        },
        halfpipe: {
          trackLength: { min: 150, recommended: 170 },
          trackDepth: { min: 5.5, max: 6.5 },
          trackWidth: { min: 17, max: 19 },
          gradient: { min: 17, max: 20 },
          wallHeight: { min: 3.5, max: 4.5 },
          transitionRadius: { min: 3.5, max: 4.0 },
          flatBottom: { min: 6, max: 8 }
        }
      },
      // 其他项目暂时设为null，可根据需要扩展
      [SkiDiscipline.FREESTYLE_SS]: null,
      [SkiDiscipline.FREESTYLE_HP]: null,
      [SkiDiscipline.SNOWBOARD_SS]: null,
      [SkiDiscipline.SNOWBOARD_HP]: null,
      [SkiDiscipline.SNOWBOARD_PSL]: null,
      [SkiDiscipline.SNOWBOARD_PGS]: null,
      [SkiDiscipline.ALPINE_DH]: null,
      [SkiDiscipline.ALPINE_SL]: null,
      [SkiDiscipline.ALPINE_GS]: null,
      [SkiDiscipline.ALPINE_SG]: null,
      [SkiDiscipline.ALPINE_AC]: null
    },
    [VenueLevel.LEVEL_2]: {
      // 二级赛事标准（中等级别）
      [SkiDiscipline.FREESTYLE_BA]: {
        bigAir: {
          approachLength: { min: 30, recommended: 40 },
          approachGradient: { min: 20, recommended: 25 },
          jumpHeight: { min: 2, recommended: 3 },
          takeoffAngle: { min: 25, max: 35 },
          landingDistance: { min: 8, recommended: 12 },
          landingGradient: { min: 24, max: 30 },
          landingWidth: { min: 18, recommended: 25 },
          safetyZone: { sides: 8, end: 15 }
        },
        slopestyle: {
          verticalDrop: { min: 40, recommended: 60 },
          averageGradient: { min: 12, max: 20 },
          slopeWidth: { min: 30, recommended: 40 },
          courseLength: { min: 200, max: 500 },
          obstacleTypes: { min: 2, max: 4 },
          minimumObstacles: 3,
          obstacleSeparation: { min: 25, max: 70 },
          safetyZones: { between: 12, sides: 8 }
        },
        halfpipe: {
          trackLength: { min: 130, recommended: 150 },
          trackDepth: { min: 3.5, max: 5.5 },
          trackWidth: { min: 15, max: 17 },
          gradient: { min: 16, max: 18 },
          wallHeight: { min: 2.5, max: 3.5 },
          transitionRadius: { min: 3.0, max: 3.5 },
          flatBottom: { min: 5, max: 7 }
        }
      },
      [SkiDiscipline.SNOWBOARD_BA]: {
        bigAir: {
          approachLength: { min: 30, recommended: 40 },
          approachGradient: { min: 20, recommended: 25 },
          jumpHeight: { min: 2, recommended: 3 },
          takeoffAngle: { min: 25, max: 35 },
          landingDistance: { min: 8, recommended: 12 },
          landingGradient: { min: 24, max: 30 },
          landingWidth: { min: 18, recommended: 25 },
          safetyZone: { sides: 8, end: 15 }
        },
        slopestyle: {
          verticalDrop: { min: 40, recommended: 60 },
          averageGradient: { min: 12, max: 20 },
          slopeWidth: { min: 30, recommended: 40 },
          courseLength: { min: 200, max: 500 },
          obstacleTypes: { min: 2, max: 4 },
          minimumObstacles: 3,
          obstacleSeparation: { min: 25, max: 70 },
          safetyZones: { between: 12, sides: 8 }
        },
        halfpipe: {
          trackLength: { min: 130, recommended: 150 },
          trackDepth: { min: 3.5, max: 5.5 },
          trackWidth: { min: 15, max: 17 },
          gradient: { min: 16, max: 18 },
          wallHeight: { min: 2.5, max: 3.5 },
          transitionRadius: { min: 3.0, max: 3.5 },
          flatBottom: { min: 5, max: 7 }
        }
      },
      // 其他项目设为null
      [SkiDiscipline.FREESTYLE_SS]: null,
      [SkiDiscipline.FREESTYLE_HP]: null,
      [SkiDiscipline.SNOWBOARD_SS]: null,
      [SkiDiscipline.SNOWBOARD_HP]: null,
      [SkiDiscipline.SNOWBOARD_PSL]: null,
      [SkiDiscipline.SNOWBOARD_PGS]: null,
      [SkiDiscipline.ALPINE_DH]: null,
      [SkiDiscipline.ALPINE_SL]: null,
      [SkiDiscipline.ALPINE_GS]: null,
      [SkiDiscipline.ALPINE_SG]: null,
      [SkiDiscipline.ALPINE_AC]: null
    },
    [VenueLevel.LEVEL_3]: {
      // 三级赛事标准（基础级别，适合U系列）
      [SkiDiscipline.FREESTYLE_BA]: {
        bigAir: {
          approachLength: { min: 25, recommended: 30 },
          approachGradient: { min: 18, recommended: 22 },
          jumpHeight: { min: 1.5, recommended: 2 },
          takeoffAngle: { min: 20, max: 30 },
          landingDistance: { min: 6, recommended: 8 },
          landingGradient: { min: 20, max: 26 },
          landingWidth: { min: 12, recommended: 18 },
          safetyZone: { sides: 6, end: 12 }
        },
        slopestyle: {
          verticalDrop: { min: 30, recommended: 40 },
          averageGradient: { min: 10, max: 15 },
          slopeWidth: { min: 20, recommended: 30 },
          courseLength: { min: 150, max: 300 },
          obstacleTypes: { min: 2, max: 3 },
          minimumObstacles: 3,
          obstacleSeparation: { min: 20, max: 60 },
          safetyZones: { between: 10, sides: 6 }
        },
        halfpipe: {
          trackLength: { min: 80, recommended: 120 },
          trackDepth: { min: 2.0, max: 3.5 },
          trackWidth: { min: 12, max: 15 },
          gradient: { min: 14, max: 16 },
          wallHeight: { min: 1.5, max: 2.5 },
          transitionRadius: { min: 2.5, max: 3.0 },
          flatBottom: { min: 4, max: 6 }
        }
      },
      [SkiDiscipline.SNOWBOARD_BA]: {
        bigAir: {
          approachLength: { min: 25, recommended: 30 },
          approachGradient: { min: 18, recommended: 22 },
          jumpHeight: { min: 1.5, recommended: 2 },
          takeoffAngle: { min: 20, max: 30 },
          landingDistance: { min: 6, recommended: 8 },
          landingGradient: { min: 20, max: 26 },
          landingWidth: { min: 12, recommended: 18 },
          safetyZone: { sides: 6, end: 12 }
        },
        slopestyle: {
          verticalDrop: { min: 30, recommended: 40 },
          averageGradient: { min: 10, max: 15 },
          slopeWidth: { min: 20, recommended: 30 },
          courseLength: { min: 150, max: 300 },
          obstacleTypes: { min: 2, max: 3 },
          minimumObstacles: 3,
          obstacleSeparation: { min: 20, max: 60 },
          safetyZones: { between: 10, sides: 6 }
        },
        halfpipe: {
          trackLength: { min: 80, recommended: 120 },
          trackDepth: { min: 2.0, max: 3.5 },
          trackWidth: { min: 12, max: 15 },
          gradient: { min: 14, max: 16 },
          wallHeight: { min: 1.5, max: 2.5 },
          transitionRadius: { min: 2.5, max: 3.0 },
          flatBottom: { min: 4, max: 6 }
        }
      },
      // 其他项目设为null
      [SkiDiscipline.FREESTYLE_SS]: null,
      [SkiDiscipline.FREESTYLE_HP]: null,
      [SkiDiscipline.SNOWBOARD_SS]: null,
      [SkiDiscipline.SNOWBOARD_HP]: null,
      [SkiDiscipline.SNOWBOARD_PSL]: null,
      [SkiDiscipline.SNOWBOARD_PGS]: null,
      [SkiDiscipline.ALPINE_DH]: null,
      [SkiDiscipline.ALPINE_SL]: null,
      [SkiDiscipline.ALPINE_GS]: null,
      [SkiDiscipline.ALPINE_SG]: null,
      [SkiDiscipline.ALPINE_AC]: null
    }
  };

  /**
   * 获取场地标准
   */
  getVenueStandard(
    discipline: SkiDiscipline,
    level: VenueLevel
  ): VenueTechnicalSpecs | null {
    return this.venueStandards[level][discipline];
  }

  /**
   * 验证场地是否符合标准
   */
  validateVenueCompliance(
    actualSpecs: Partial<VenueTechnicalSpecs>,
    discipline: SkiDiscipline,
    targetLevel: VenueLevel
  ): VenueCertificationResult {

    const standard = this.getVenueStandard(discipline, targetLevel);

    if (!standard) {
      return {
        venueId: '',
        discipline,
        certifiedLevel: null,
        isCompliant: false,
        compliance: {
          overall: false,
          safety: false,
          technical: false,
          equipment: false
        },
        nonCompliantItems: [{
          category: 'technical',
          parameter: 'discipline_support',
          required: '支持该项目',
          actual: '不支持该项目',
          severity: 'critical'
        }],
        recommendations: [{
          priority: 'high',
          description: `该场地不支持${discipline}项目，需要重新设计场地布局`
        }],
        certificationDate: new Date().toISOString().split('T')[0],
        validUntil: '',
        inspectorId: ''
      };
    }

    const nonCompliantItems: VenueCertificationResult['nonCompliantItems'] = [];
    const recommendations: VenueCertificationResult['recommendations'] = [];

    // 验证大跳台规格
    if (actualSpecs.bigAir && standard.bigAir) {
      const bigAirChecks = this.validateBigAirSpecs(actualSpecs.bigAir, standard.bigAir);
      nonCompliantItems.push(...bigAirChecks.nonCompliant);
      recommendations.push(...bigAirChecks.recommendations);
    }

    // 验证坡面障碍技巧规格
    if (actualSpecs.slopestyle && standard.slopestyle) {
      const slopestyleChecks = this.validateSlopestyleSpecs(actualSpecs.slopestyle, standard.slopestyle);
      nonCompliantItems.push(...slopestyleChecks.nonCompliant);
      recommendations.push(...slopestyleChecks.recommendations);
    }

    // 验证U型场地规格
    if (actualSpecs.halfpipe && standard.halfpipe) {
      const halfpipeChecks = this.validateHalfpipeSpecs(actualSpecs.halfpipe, standard.halfpipe);
      nonCompliantItems.push(...halfpipeChecks.nonCompliant);
      recommendations.push(...halfpipeChecks.recommendations);
    }

    // 评估整体合规性
    const criticalIssues = nonCompliantItems.filter(item => item.severity === 'critical').length;
    const majorIssues = nonCompliantItems.filter(item => item.severity === 'major').length;

    const isCompliant = criticalIssues === 0 && majorIssues <= 2;
    const certifiedLevel = isCompliant ? targetLevel : this.suggestLowerLevel(targetLevel);

    // 计算认证有效期
    const certificationDate = new Date();
    const validUntil = new Date(certificationDate);
    validUntil.setFullYear(validUntil.getFullYear() + (isCompliant ? 3 : 1));

    return {
      venueId: '',
      discipline,
      certifiedLevel,
      isCompliant,
      compliance: {
        overall: isCompliant,
        safety: nonCompliantItems.filter(item => item.category === 'safety').length === 0,
        technical: nonCompliantItems.filter(item => item.category === 'technical').length <= 2,
        equipment: nonCompliantItems.filter(item => item.category === 'equipment').length === 0
      },
      nonCompliantItems,
      recommendations,
      certificationDate: certificationDate.toISOString().split('T')[0],
      validUntil: validUntil.toISOString().split('T')[0],
      inspectorId: ''
    };
  }

  /**
   * 推荐适合的赛事等级
   */
  recommendVenueLevel(
    actualSpecs: Partial<VenueTechnicalSpecs>,
    discipline: SkiDiscipline
  ): {
    recommendedLevel: VenueLevel;
    alternatives: VenueLevel[];
    reasoning: string;
  } {

    // 从高到低测试各级别标准
    const levels = [VenueLevel.LEVEL_1, VenueLevel.LEVEL_2, VenueLevel.LEVEL_3];

    for (const level of levels) {
      const validation = this.validateVenueCompliance(actualSpecs, discipline, level);
      if (validation.isCompliant) {
        return {
          recommendedLevel: level,
          alternatives: levels.filter(l => l !== level),
          reasoning: `场地完全符合${this.getLevelDescription(level)}标准`
        };
      }
    }

    return {
      recommendedLevel: VenueLevel.LEVEL_3,
      alternatives: [VenueLevel.LEVEL_2, VenueLevel.LEVEL_1],
      reasoning: '场地需要改进才能达到认证标准，建议先申请三级认证'
    };
  }

  /**
   * 生成场地改进计划
   */
  generateImprovementPlan(
    certificationResult: VenueCertificationResult,
    targetLevel: VenueLevel,
    budget?: number
  ): {
    phases: {
      phase: number;
      title: string;
      items: typeof certificationResult.recommendations;
      estimatedCost: number;
      duration: string;
      priority: 'critical' | 'high' | 'medium' | 'low';
    }[];
    totalCost: number;
    totalDuration: string;
    feasibilityAnalysis: string;
  } {

    const criticalItems = certificationResult.recommendations.filter(r => r.priority === 'high');
    const highItems = certificationResult.recommendations.filter(r => r.priority === 'medium');
    const mediumItems = certificationResult.recommendations.filter(r => r.priority === 'low');

    const phases = [
      {
        phase: 1,
        title: '安全和关键设施改进',
        items: criticalItems,
        estimatedCost: criticalItems.reduce((sum, item) => sum + (item.estimatedCost || 100000), 0),
        duration: '2-3个月',
        priority: 'critical' as const
      },
      {
        phase: 2,
        title: '技术标准提升',
        items: highItems,
        estimatedCost: highItems.reduce((sum, item) => sum + (item.estimatedCost || 50000), 0),
        duration: '1-2个月',
        priority: 'high' as const
      },
      {
        phase: 3,
        title: '优化和完善',
        items: mediumItems,
        estimatedCost: mediumItems.reduce((sum, item) => sum + (item.estimatedCost || 20000), 0),
        duration: '2-4周',
        priority: 'medium' as const
      }
    ];

    const totalCost = phases.reduce((sum, phase) => sum + phase.estimatedCost, 0);
    const feasibilityAnalysis = budget ?
      (totalCost <= budget ? '预算充足，建议按计划执行' : '预算不足，建议分阶段实施') :
      '需要进一步评估预算可行性';

    return {
      phases,
      totalCost,
      totalDuration: '4-6个月',
      feasibilityAnalysis
    };
  }

  // 私有辅助方法

  private validateBigAirSpecs(
    actual: any,
    standard: VenueTechnicalSpecs['bigAir']
  ): {
    nonCompliant: VenueCertificationResult['nonCompliantItems'];
    recommendations: VenueCertificationResult['recommendations'];
  } {
    const nonCompliant: VenueCertificationResult['nonCompliantItems'] = [];
    const recommendations: VenueCertificationResult['recommendations'] = [];

    // 检查助滑区长度
    if (actual.approachLength < standard.approachLength.min) {
      nonCompliant.push({
        category: 'technical',
        parameter: 'approach_length',
        required: `${standard.approachLength.min}米`,
        actual: `${actual.approachLength}米`,
        severity: 'major'
      });
      recommendations.push({
        priority: 'high',
        description: `延长助滑区至${standard.approachLength.recommended}米`,
        estimatedCost: 150000,
        timeline: '3-4周'
      });
    }

    // 检查跳台高度
    if (actual.jumpHeight < standard.jumpHeight.min) {
      nonCompliant.push({
        category: 'safety',
        parameter: 'jump_height',
        required: `${standard.jumpHeight.min}米`,
        actual: `${actual.jumpHeight}米`,
        severity: 'critical'
      });
      recommendations.push({
        priority: 'high',
        description: `提高跳台高度至${standard.jumpHeight.recommended}米`,
        estimatedCost: 200000,
        timeline: '4-6周'
      });
    }

    return { nonCompliant, recommendations };
  }

  private validateSlopestyleSpecs(
    actual: any,
    standard: VenueTechnicalSpecs['slopestyle']
  ): {
    nonCompliant: VenueCertificationResult['nonCompliantItems'];
    recommendations: VenueCertificationResult['recommendations'];
  } {
    // 类似大跳台的验证逻辑
    return { nonCompliant: [], recommendations: [] };
  }

  private validateHalfpipeSpecs(
    actual: any,
    standard: VenueTechnicalSpecs['halfpipe']
  ): {
    nonCompliant: VenueCertificationResult['nonCompliantItems'];
    recommendations: VenueCertificationResult['recommendations'];
  } {
    // 类似大跳台的验证逻辑
    return { nonCompliant: [], recommendations: [] };
  }

  private suggestLowerLevel(currentLevel: VenueLevel): VenueLevel | null {
    switch (currentLevel) {
      case VenueLevel.LEVEL_1:
        return VenueLevel.LEVEL_2;
      case VenueLevel.LEVEL_2:
        return VenueLevel.LEVEL_3;
      case VenueLevel.LEVEL_3:
        return null;
      default:
        return null;
    }
  }

  private getLevelDescription(level: VenueLevel): string {
    const descriptions = {
      [VenueLevel.LEVEL_1]: '一级赛事',
      [VenueLevel.LEVEL_2]: '二级赛事',
      [VenueLevel.LEVEL_3]: '三级赛事'
    };
    return descriptions[level];
  }
}

// 导出单例实例
export const venueStandardsManager = new VenueStandardsManager();

// 导出辅助工具函数
export const VenueUtils = {
  /**
   * 获取场地等级描述
   */
  getLevelDescription(level: VenueLevel): string {
    const descriptions = {
      [VenueLevel.LEVEL_1]: '一级赛事标准（国际/全国级）',
      [VenueLevel.LEVEL_2]: '二级赛事标准（省级/区域级）',
      [VenueLevel.LEVEL_3]: '三级赛事标准（市级/U系列）'
    };
    return descriptions[level];
  },

  /**
   * 获取项目类型描述
   */
  getDisciplineDescription(discipline: SkiDiscipline): string {
    const descriptions: Partial<Record<SkiDiscipline, string>> = {
      [SkiDiscipline.FREESTYLE_BA]: '自由式滑雪大跳台',
      [SkiDiscipline.FREESTYLE_SS]: '自由式滑雪坡面障碍技巧',
      [SkiDiscipline.FREESTYLE_HP]: '自由式滑雪U型场地',
      [SkiDiscipline.SNOWBOARD_BA]: '单板滑雪大跳台',
      [SkiDiscipline.SNOWBOARD_SS]: '单板滑雪坡面障碍技巧',
      [SkiDiscipline.SNOWBOARD_HP]: '单板滑雪U型场地'
    };
    return descriptions[discipline] || discipline;
  },

  /**
   * 计算合规性得分
   */
  calculateComplianceScore(result: VenueCertificationResult): number {
    const criticalWeight = 3;
    const majorWeight = 2;
    const minorWeight = 1;

    const criticalIssues = result.nonCompliantItems.filter(item => item.severity === 'critical').length;
    const majorIssues = result.nonCompliantItems.filter(item => item.severity === 'major').length;
    const minorIssues = result.nonCompliantItems.filter(item => item.severity === 'minor').length;

    const totalDeductions = (criticalIssues * criticalWeight) + (majorIssues * majorWeight) + (minorIssues * minorWeight);
    const maxPossibleDeductions = 20; // 假设最大扣分

    return Math.max(0, Math.round(((maxPossibleDeductions - totalDeductions) / maxPossibleDeductions) * 100));
  }
};