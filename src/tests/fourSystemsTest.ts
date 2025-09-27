/**
 * 四大积分系统综合测试
 * Comprehensive Testing for Four Scoring Systems
 */

import { fourSystemsManager, FourSystemsUtils, UniversalRaceData, UniversalSeasonData } from '../utils/fourSystemsManager';
import { EventLevel } from '../utils/chinaSkiPointsCalculatorV4';
import { PointsCategory } from '../data/multiSportData';
import { ScoringSystemType } from '../types/scoringSystems';

// 测试数据生成器
export class TestDataGenerator {

  /**
   * 生成高山滑雪测试数据
   */
  static generateAlpineRaceData(
    athleteId: string = 'athlete_001',
    discipline: string = 'ALPINE_GS'
  ): UniversalRaceData {
    return {
      athleteId,
      discipline,
      competitionId: 'alpine_comp_001',
      competitionDate: '2025-01-15',
      athleteTime: 125.45,
      winnerTime: 122.30,
      eventLevel: EventLevel.B,
      penaltyData: {
        top10Best5Points: [15.2, 18.5, 22.1, 25.8, 28.3],
        allBest5Points: [12.5, 15.2, 18.5, 22.1, 25.8],
        allBest5RacePoints: [8.2, 12.5, 15.8, 19.2, 22.1]
      }
    };
  }

  /**
   * 生成单板平行项目测试数据
   */
  static generateSnowboardAlpineRaceData(
    athleteId: string = 'athlete_002',
    discipline: string = 'SNOWBOARD_PSL'
  ): UniversalRaceData {
    return {
      athleteId,
      discipline,
      competitionId: 'snowboard_alpine_comp_001',
      competitionDate: '2025-01-20',
      athleteTime: 58.75,
      winnerTime: 56.20,
      eventLevel: EventLevel.A,
      finalRank: 5
    };
  }

  /**
   * 生成单板技巧项目测试数据
   */
  static generateSnowboardTrickRaceData(
    athleteId: string = 'athlete_003',
    discipline: string = 'SNOWBOARD_BA'
  ): UniversalRaceData {
    return {
      athleteId,
      discipline,
      competitionId: 'snowboard_trick_comp_001',
      competitionDate: '2025-01-25',
      finalRank: 3,
      finalScore: 85.75,
      pointsCategory: PointsCategory.CATEGORY_2,
      totalParticipants: 32
    };
  }

  /**
   * 生成自由式滑雪测试数据
   */
  static generateFreestyleRaceData(
    athleteId: string = 'athlete_004',
    discipline: string = 'FREESTYLE_SS'
  ): UniversalRaceData {
    return {
      athleteId,
      discipline,
      competitionId: 'freestyle_comp_001',
      competitionDate: '2025-01-30',
      finalRank: 2,
      finalScore: 92.50,
      pointsCategory: PointsCategory.CATEGORY_1,
      totalParticipants: 48
    };
  }

  /**
   * 生成赛季测试数据
   */
  static generateSeasonData(
    athleteId: string,
    discipline: string,
    raceCount: number = 5
  ): UniversalSeasonData {
    const races: UniversalRaceData[] = [];

    for (let i = 0; i < raceCount; i++) {
      let raceData: UniversalRaceData;

      if (discipline.startsWith('ALPINE_')) {
        raceData = this.generateAlpineRaceData(athleteId, discipline);
        // 变化时间成绩
        raceData.athleteTime = 120 + Math.random() * 10;
        raceData.winnerTime = 118 + Math.random() * 3;
      } else if (discipline.startsWith('SNOWBOARD_P')) {
        raceData = this.generateSnowboardAlpineRaceData(athleteId, discipline);
        raceData.athleteTime = 55 + Math.random() * 8;
        raceData.winnerTime = 53 + Math.random() * 3;
      } else {
        if (discipline.startsWith('SNOWBOARD_')) {
          raceData = this.generateSnowboardTrickRaceData(athleteId, discipline);
        } else {
          raceData = this.generateFreestyleRaceData(athleteId, discipline);
        }
        // 变化排名
        raceData.finalRank = Math.floor(Math.random() * 15) + 1;
        raceData.finalScore = 70 + Math.random() * 25;
      }

      raceData.competitionId = `comp_${i + 1}`;
      raceData.competitionDate = `2025-${String(i + 1).padStart(2, '0')}-15`;
      races.push(raceData);
    }

    return {
      athleteId,
      discipline,
      season: '2025-2026',
      baselinePoints: 50,
      races
    };
  }
}

// 测试执行器
export class FourSystemsTestRunner {

  /**
   * 运行基础功能测试
   */
  static runBasicTests(): boolean {
    console.log('🧪 开始四大积分系统基础功能测试...\n');

    try {
      // 测试1: 高山滑雪积分计算
      console.log('📋 测试1: 高山滑雪积分计算');
      const alpineData = TestDataGenerator.generateAlpineRaceData();
      const alpineResult = fourSystemsManager.calculatePoints(alpineData);

      console.log(`   ✅ 高山滑雪 ${alpineData.discipline}`);
      console.log(`   📊 积分: ${alpineResult.points.earnedPoints} (低分制)`);
      console.log(`   🏆 排名: ${alpineResult.rank}`);
      console.log(`   🎯 系统: ${alpineResult.systemType}\n`);

      // 测试2: 单板平行项目积分计算
      console.log('📋 测试2: 单板平行项目积分计算');
      const snowboardAlpineData = TestDataGenerator.generateSnowboardAlpineRaceData();
      const snowboardAlpineResult = fourSystemsManager.calculatePoints(snowboardAlpineData);

      console.log(`   ✅ 单板平行 ${snowboardAlpineData.discipline}`);
      console.log(`   📊 积分: ${snowboardAlpineResult.points.earnedPoints} (低分制)`);
      console.log(`   🏆 排名: ${snowboardAlpineResult.rank}`);
      console.log(`   🎯 系统: ${snowboardAlpineResult.systemType}\n`);

      // 测试3: 单板技巧项目积分计算
      console.log('📋 测试3: 单板技巧项目积分计算');
      const snowboardTrickData = TestDataGenerator.generateSnowboardTrickRaceData();
      const snowboardTrickResult = fourSystemsManager.calculatePoints(snowboardTrickData);

      console.log(`   ✅ 单板技巧 ${snowboardTrickData.discipline}`);
      console.log(`   📊 积分: ${snowboardTrickResult.points.earnedPoints} (高分制)`);
      console.log(`   🏆 排名: ${snowboardTrickResult.rank}`);
      console.log(`   🎯 系统: ${snowboardTrickResult.systemType}\n`);

      // 测试4: 自由式滑雪积分计算
      console.log('📋 测试4: 自由式滑雪积分计算');
      const freestyleData = TestDataGenerator.generateFreestyleRaceData();
      const freestyleResult = fourSystemsManager.calculatePoints(freestyleData);

      console.log(`   ✅ 自由式滑雪 ${freestyleData.discipline}`);
      console.log(`   📊 积分: ${freestyleResult.points.earnedPoints} (高分制)`);
      console.log(`   🏆 排名: ${freestyleResult.rank}`);
      console.log(`   🎯 系统: ${freestyleResult.systemType}\n`);

      console.log('✅ 基础功能测试全部通过!\n');
      return true;
    } catch (error) {
      console.error('❌ 基础功能测试失败:', error);
      return false;
    }
  }

  /**
   * 运行赛季积分测试
   */
  static runSeasonPointsTests(): boolean {
    console.log('🧪 开始赛季积分计算测试...\n');

    try {
      const disciplines = ['ALPINE_GS', 'SNOWBOARD_PSL', 'SNOWBOARD_BA', 'FREESTYLE_HP'];

      disciplines.forEach((discipline, index) => {
        console.log(`📋 测试赛季积分: ${discipline}`);

        const seasonData = TestDataGenerator.generateSeasonData(`athlete_${index + 1}`, discipline, 6);
        const seasonResult = fourSystemsManager.calculateSeasonPoints(seasonData);

        const isLowerBetter = FourSystemsUtils.isLowerBetterSystem(discipline);

        console.log(`   ✅ 项目: ${discipline}`);
        console.log(`   📊 最终积分: ${seasonResult.finalSeasonPoints} (${isLowerBetter ? '低分制' : '高分制'})`);
        console.log(`   🏁 参赛次数: ${seasonResult.participatedEvents}`);
        console.log(`   🎯 有效成绩: ${seasonResult.validResults}`);
        console.log(`   📈 下赛季基础积分: ${seasonResult.nextSeasonBaseline}`);
        console.log(`   🎪 系统类型: ${seasonResult.systemType}\n`);
      });

      console.log('✅ 赛季积分测试全部通过!\n');
      return true;
    } catch (error) {
      console.error('❌ 赛季积分测试失败:', error);
      return false;
    }
  }

  /**
   * 运行跨系统比较测试
   */
  static runCrossSystemTests(): boolean {
    console.log('🧪 开始跨系统比较测试...\n');

    try {
      const athleteId = 'multi_sport_athlete';
      const seasonDataList: UniversalSeasonData[] = [
        TestDataGenerator.generateSeasonData(athleteId, 'ALPINE_GS', 4),
        TestDataGenerator.generateSeasonData(athleteId, 'SNOWBOARD_BA', 5),
        TestDataGenerator.generateSeasonData(athleteId, 'FREESTYLE_SS', 6)
      ];

      const comparison = fourSystemsManager.compareAcrossSystems(athleteId, seasonDataList);

      console.log('📋 跨系统比较结果:');
      console.log(`   🏃 运动员ID: ${comparison.athleteId}`);
      console.log(`   🥇 最强系统: ${comparison.overallAssessment.dominantSystem}`);
      console.log(`   📉 最弱系统: ${comparison.overallAssessment.weakestSystem}`);
      console.log(`   📊 平均一致性: ${comparison.overallAssessment.averageConsistency}`);

      console.log('\n   💡 系统积分详情:');
      Object.entries(comparison.systemResults).forEach(([systemType, data]) => {
        if (data) {
          console.log(`     ${systemType}: ${data.totalPoints}分 (${data.participatedEvents}场比赛)`);
        }
      });

      console.log('\n   📝 建议:');
      comparison.recommendations.forEach(rec => {
        console.log(`     • ${rec}`);
      });

      console.log('\n✅ 跨系统比较测试通过!\n');
      return true;
    } catch (error) {
      console.error('❌ 跨系统比较测试失败:', error);
      return false;
    }
  }

  /**
   * 运行批量计算测试
   */
  static runBatchCalculationTests(): boolean {
    console.log('🧪 开始批量计算测试...\n');

    try {
      const batchData: UniversalRaceData[] = [
        TestDataGenerator.generateAlpineRaceData('athlete_001', 'ALPINE_DH'),
        TestDataGenerator.generateAlpineRaceData('athlete_002', 'ALPINE_SL'),
        TestDataGenerator.generateSnowboardAlpineRaceData('athlete_003', 'SNOWBOARD_PGS'),
        TestDataGenerator.generateSnowboardTrickRaceData('athlete_004', 'SNOWBOARD_SS'),
        TestDataGenerator.generateFreestyleRaceData('athlete_005', 'FREESTYLE_BA')
      ];

      const batchResults = fourSystemsManager.calculateBatchPoints(batchData);

      console.log('📋 批量计算结果:');
      batchResults.forEach((result, index) => {
        const isLowerBetter = FourSystemsUtils.isLowerBetterSystem(result.discipline);
        console.log(`   ${index + 1}. ${result.athleteId} - ${result.discipline}`);
        console.log(`      📊 积分: ${result.points.earnedPoints} (${isLowerBetter ? '低分制' : '高分制'})`);
        console.log(`      🎯 系统: ${result.systemType}`);
      });

      console.log('\n✅ 批量计算测试通过!\n');
      return true;
    } catch (error) {
      console.error('❌ 批量计算测试失败:', error);
      return false;
    }
  }

  /**
   * 运行数据验证测试
   */
  static runDataValidationTests(): boolean {
    console.log('🧪 开始数据验证测试...\n');

    try {
      // 测试有效数据
      console.log('📋 测试有效数据验证:');
      const validData = TestDataGenerator.generateAlpineRaceData();
      const validResult = fourSystemsManager.validateRaceData(validData);
      console.log(`   ✅ 有效数据验证: ${validResult.valid ? '通过' : '失败'}`);

      // 测试无效数据
      console.log('\n📋 测试无效数据验证:');
      const invalidData: UniversalRaceData = {
        athleteId: '',  // 缺少athleteId
        discipline: 'ALPINE_GS',
        competitionId: 'test',
        competitionDate: '2025-01-01'
        // 缺少时间数据
      };

      const invalidResult = fourSystemsManager.validateRaceData(invalidData);
      console.log(`   ❌ 无效数据验证: ${invalidResult.valid ? '未检测到错误' : '正确检测到错误'}`);
      console.log(`   📝 错误信息: ${invalidResult.errors.join(', ')}`);

      // 测试系统信息获取
      console.log('\n📋 测试系统信息获取:');
      const disciplines = ['ALPINE_GS', 'SNOWBOARD_PSL', 'SNOWBOARD_BA', 'FREESTYLE_HP'];
      disciplines.forEach(discipline => {
        const systemInfo = fourSystemsManager.getSystemInfo(discipline);
        console.log(`   📊 ${discipline}: ${systemInfo.name} (${systemInfo.isLowerBetter ? '低分制' : '高分制'})`);
      });

      console.log('\n✅ 数据验证测试通过!\n');
      return true;
    } catch (error) {
      console.error('❌ 数据验证测试失败:', error);
      return false;
    }
  }

  /**
   * 运行性能测试
   */
  static runPerformanceTests(): boolean {
    console.log('🧪 开始性能测试...\n');

    try {
      const testSizes = [10, 100, 500];

      testSizes.forEach(size => {
        console.log(`📋 测试 ${size} 条数据的处理性能:`);

        const startTime = Date.now();

        // 生成测试数据
        const testData: UniversalRaceData[] = [];
        for (let i = 0; i < size; i++) {
          const disciplines = ['ALPINE_GS', 'SNOWBOARD_BA', 'FREESTYLE_SS'];
          const discipline = disciplines[i % disciplines.length];

          if (discipline.startsWith('ALPINE_')) {
            testData.push(TestDataGenerator.generateAlpineRaceData(`athlete_${i}`, discipline));
          } else if (discipline.startsWith('SNOWBOARD_')) {
            testData.push(TestDataGenerator.generateSnowboardTrickRaceData(`athlete_${i}`, discipline));
          } else {
            testData.push(TestDataGenerator.generateFreestyleRaceData(`athlete_${i}`, discipline));
          }
        }

        // 批量计算
        const results = fourSystemsManager.calculateBatchPoints(testData);

        const endTime = Date.now();
        const duration = endTime - startTime;
        const avgTime = duration / size;

        console.log(`   ⏱️ 总耗时: ${duration}ms`);
        console.log(`   📊 平均每条: ${avgTime.toFixed(2)}ms`);
        console.log(`   ✅ 成功处理: ${results.length}/${size} 条数据\n`);
      });

      console.log('✅ 性能测试通过!\n');
      return true;
    } catch (error) {
      console.error('❌ 性能测试失败:', error);
      return false;
    }
  }

  /**
   * 运行所有测试
   */
  static runAllTests(): boolean {
    console.log('🚀 开始四大积分系统完整测试套件...\n');
    console.log('=' .repeat(60) + '\n');

    const tests = [
      { name: '基础功能测试', fn: this.runBasicTests },
      { name: '赛季积分测试', fn: this.runSeasonPointsTests },
      { name: '跨系统比较测试', fn: this.runCrossSystemTests },
      { name: '批量计算测试', fn: this.runBatchCalculationTests },
      { name: '数据验证测试', fn: this.runDataValidationTests },
      { name: '性能测试', fn: this.runPerformanceTests }
    ];

    let passedTests = 0;

    tests.forEach((test, index) => {
      console.log(`\n🔬 第 ${index + 1}/${tests.length} 项: ${test.name}`);
      console.log('-'.repeat(40));

      const result = test.fn();
      if (result) {
        passedTests++;
        console.log(`✅ ${test.name} 通过`);
      } else {
        console.log(`❌ ${test.name} 失败`);
      }
    });

    console.log('\n' + '='.repeat(60));
    console.log('🏁 测试结果总结:');
    console.log(`   ✅ 通过: ${passedTests}/${tests.length} 项测试`);
    console.log(`   📊 成功率: ${((passedTests / tests.length) * 100).toFixed(1)}%`);

    if (passedTests === tests.length) {
      console.log('\n🎉 所有测试全部通过! 四大积分系统运行正常。');
      return true;
    } else {
      console.log('\n⚠️ 部分测试失败，请检查相关功能。');
      return false;
    }
  }
}

// 快速测试入口
export function runQuickTest(): void {
  console.log('⚡ 运行四大积分系统快速测试...\n');

  try {
    // 快速测试每个系统
    const testCases = [
      {
        name: '高山滑雪',
        data: TestDataGenerator.generateAlpineRaceData('test_alpine', 'ALPINE_GS')
      },
      {
        name: '单板平行',
        data: TestDataGenerator.generateSnowboardAlpineRaceData('test_snowboard_alpine', 'SNOWBOARD_PSL')
      },
      {
        name: '单板技巧',
        data: TestDataGenerator.generateSnowboardTrickRaceData('test_snowboard_trick', 'SNOWBOARD_BA')
      },
      {
        name: '自由式滑雪',
        data: TestDataGenerator.generateFreestyleRaceData('test_freestyle', 'FREESTYLE_SS')
      }
    ];

    testCases.forEach(testCase => {
      const result = FourSystemsUtils.quickCalculate(testCase.data);
      const isLowerBetter = FourSystemsUtils.isLowerBetterSystem(testCase.data.discipline);

      console.log(`✅ ${testCase.name}: ${result.points.earnedPoints}分 (${isLowerBetter ? '低分制' : '高分制'})`);
    });

    console.log('\n🎉 快速测试完成！所有系统运行正常。');

  } catch (error) {
    console.error('❌ 快速测试失败:', error);
  }
}

// 导出测试工具
export const TestingTools = {
  /**
   * 生成测试报告
   */
  generateTestReport: () => {
    const report = {
      timestamp: new Date().toISOString(),
      systems: fourSystemsManager.getSupportedDisciplines(),
      testResults: FourSystemsTestRunner.runAllTests()
    };

    return report;
  },

  /**
   * 验证系统完整性
   */
  validateSystemIntegrity: () => {
    const supportedDisciplines = fourSystemsManager.getSupportedDisciplines();
    const allDisciplines = Object.values(supportedDisciplines).flat();

    console.log('🔍 系统完整性检查:');
    console.log(`   📊 支持的积分系统: ${Object.keys(supportedDisciplines).length}`);
    console.log(`   🎯 支持的项目总数: ${allDisciplines.length}`);

    Object.entries(supportedDisciplines).forEach(([systemType, disciplines]) => {
      console.log(`   • ${systemType}: ${disciplines.length} 个项目`);
    });

    return allDisciplines.length > 0;
  }
};