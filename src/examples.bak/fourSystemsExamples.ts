/**
 * 四大积分系统使用示例
 * Four Scoring Systems Usage Examples
 * 展示如何使用四个不同的积分系统
 */

import {
  fourSystemsManager,
  FourSystemsUtils,
  UniversalRaceData,
  UniversalSeasonData
} from '../utils/fourSystemsManager';

import { EventLevel } from '../utils/chinaSkiPointsCalculatorV4';
import { PointsCategory } from '../data/multiSportData';
import { ScoringSystemType } from '../types/scoringSystems';

// 使用示例类
export class FourSystemsExamples {

  /**
   * 示例1: 高山滑雪积分计算 (Alpine Points)
   * 特点：积分越低越好，基于时间计算
   */
  static example1_AlpineSkiing() {
    console.log('📋 示例1: 高山滑雪积分计算\n');

    // 模拟高山大回转比赛数据
    const alpineRaceData: UniversalRaceData = {
      athleteId: 'zhang_wei',
      discipline: 'ALPINE_GS',          // 高山大回转
      competitionId: 'national_alpine_2025',
      competitionDate: '2025-02-15',

      // 时间成绩（关键数据）
      athleteTime: 128.45,              // 运动员用时：2分8.45秒
      winnerTime: 125.20,               // 冠军时间：2分5.20秒

      // 赛事级别
      eventLevel: EventLevel.A,         // A级赛事（系数1.0）

      // 判罚分计算数据（可选）
      penaltyData: {
        top10Best5Points: [12.5, 15.8, 18.3, 22.1, 25.4],
        allBest5Points: [10.2, 12.5, 15.8, 18.3, 22.1],
        allBest5RacePoints: [8.5, 12.0, 15.2, 18.8, 21.5]
      }
    };

    // 计算积分
    const result = fourSystemsManager.calculatePoints(alpineRaceData);

    console.log('🎿 高山滑雪积分结果:');
    console.log(`   运动员: ${result.athleteId}`);
    console.log(`   项目: ${result.discipline}`);
    console.log(`   用时: ${alpineRaceData.athleteTime}秒`);
    console.log(`   冠军时间: ${alpineRaceData.winnerTime}秒`);
    console.log(`   ⭐ 最终积分: ${result.points.earnedPoints}分 (积分越低越好)`);
    console.log(`   系统类型: ${result.systemType}`);
    console.log(`   计算详情: 基础积分${result.calculationDetails.baseCalculation} + 判罚分${result.calculationDetails.penalties} × 系数${result.calculationDetails.coefficients}\n`);

    return result;
  }

  /**
   * 示例2: 单板平行项目积分计算 (Snowboard Alpine Points)
   * 特点：类似高山滑雪，积分越低越好
   */
  static example2_SnowboardParallel() {
    console.log('📋 示例2: 单板平行项目积分计算\n');

    const snowboardParallelData: UniversalRaceData = {
      athleteId: 'li_ming',
      discipline: 'SNOWBOARD_PSL',      // 单板平行回转
      competitionId: 'snowboard_championship_2025',
      competitionDate: '2025-03-10',

      // 时间成绩
      athleteTime: 62.35,               // 运动员用时：62.35秒
      winnerTime: 59.80,                // 冠军时间：59.80秒

      eventLevel: EventLevel.B,         // B级赛事（系数0.6）
      finalRank: 4                      // 最终排名第4
    };

    const result = fourSystemsManager.calculatePoints(snowboardParallelData);

    console.log('🏂 单板平行项目积分结果:');
    console.log(`   运动员: ${result.athleteId}`);
    console.log(`   项目: ${result.discipline}`);
    console.log(`   用时: ${snowboardParallelData.athleteTime}秒`);
    console.log(`   排名: 第${snowboardParallelData.finalRank}名`);
    console.log(`   ⭐ 最终积分: ${result.points.earnedPoints}分 (积分越低越好)`);
    console.log(`   系统类型: ${result.systemType}\n`);

    return result;
  }

  /**
   * 示例3: 单板技巧项目积分计算 (Snowboard Ranking Points)
   * 特点：积分越高越好，基于排名的240/360/120分档
   */
  static example3_SnowboardTricks() {
    console.log('📋 示例3: 单板技巧项目积分计算\n');

    const snowboardTrickData: UniversalRaceData = {
      athleteId: 'wang_xiaoli',
      discipline: 'SNOWBOARD_BA',       // 单板大跳台
      competitionId: 'big_air_series_2025',
      competitionDate: '2025-03-20',

      // 排名成绩（关键数据）
      finalRank: 2,                     // 最终排名第2名
      finalScore: 89.75,                // 最终得分89.75分

      // 积分档次
      pointsCategory: PointsCategory.CATEGORY_1,  // 一类赛事（360分档）

      totalParticipants: 64
    };

    const result = fourSystemsManager.calculatePoints(snowboardTrickData);

    console.log('🏂 单板技巧项目积分结果:');
    console.log(`   运动员: ${result.athleteId}`);
    console.log(`   项目: ${result.discipline}`);
    console.log(`   排名: 第${snowboardTrickData.finalRank}名`);
    console.log(`   得分: ${snowboardTrickData.finalScore}分`);
    console.log(`   ⭐ 最终积分: ${result.points.earnedPoints}分 (积分越高越好)`);
    console.log(`   积分档次: ${snowboardTrickData.pointsCategory} (360分档)`);
    console.log(`   系统类型: ${result.systemType}\n`);

    return result;
  }

  /**
   * 示例4: 自由式滑雪积分计算 (Freestyle Ranking Points)
   * 特点：积分越高越好，基于排名的240/360/120分档
   */
  static example4_FreestyleSkiing() {
    console.log('📋 示例4: 自由式滑雪积分计算\n');

    const freestyleData: UniversalRaceData = {
      athleteId: 'chen_hao',
      discipline: 'FREESTYLE_SS',       // 自由式坡面障碍技巧
      competitionId: 'freestyle_nationals_2025',
      competitionDate: '2025-04-05',

      // 排名成绩
      finalRank: 1,                     // 第1名（冠军）
      finalScore: 95.25,                // 最终得分95.25分

      // 积分档次
      pointsCategory: PointsCategory.CATEGORY_2,  // 二类赛事（240分档）

      totalParticipants: 48
    };

    const result = fourSystemsManager.calculatePoints(freestyleData);

    console.log('⛷️ 自由式滑雪积分结果:');
    console.log(`   运动员: ${result.athleteId}`);
    console.log(`   项目: ${result.discipline}`);
    console.log(`   排名: 第${freestyleData.finalRank}名 🥇`);
    console.log(`   得分: ${freestyleData.finalScore}分`);
    console.log(`   ⭐ 最终积分: ${result.points.earnedPoints}分 (积分越高越好)`);
    console.log(`   积分档次: ${freestyleData.pointsCategory} (240分档)`);
    console.log(`   系统类型: ${result.systemType}\n`);

    return result;
  }

  /**
   * 示例5: 运动员赛季积分计算
   * 展示如何计算一个完整赛季的积分
   */
  static example5_SeasonPoints() {
    console.log('📋 示例5: 运动员赛季积分计算\n');

    // 构建某运动员的赛季数据（高山大回转）
    const seasonData: UniversalSeasonData = {
      athleteId: 'professional_athlete',
      discipline: 'ALPINE_GS',
      season: '2025-2026',
      baselinePoints: 45.50,           // 基础积分（上赛季延续）
      races: [
        {
          athleteId: 'professional_athlete',
          discipline: 'ALPINE_GS',
          competitionId: 'race_1',
          competitionDate: '2025-01-15',
          athleteTime: 125.30,
          winnerTime: 122.50,
          eventLevel: EventLevel.A
        },
        {
          athleteId: 'professional_athlete',
          discipline: 'ALPINE_GS',
          competitionId: 'race_2',
          competitionDate: '2025-02-10',
          athleteTime: 128.75,
          winnerTime: 126.20,
          eventLevel: EventLevel.B
        },
        {
          athleteId: 'professional_athlete',
          discipline: 'ALPINE_GS',
          competitionId: 'race_3',
          competitionDate: '2025-02-25',
          athleteTime: 124.85,
          winnerTime: 123.10,
          eventLevel: EventLevel.A
        },
        {
          athleteId: 'professional_athlete',
          discipline: 'ALPINE_GS',
          competitionId: 'race_4',
          competitionDate: '2025-03-15',
          athleteTime: 127.40,
          winnerTime: 125.00,
          eventLevel: EventLevel.B
        }
      ]
    };

    const seasonResult = fourSystemsManager.calculateSeasonPoints(seasonData);

    console.log('📊 赛季积分结果:');
    console.log(`   运动员: ${seasonResult.athleteId}`);
    console.log(`   项目: ${seasonResult.discipline}`);
    console.log(`   赛季: ${seasonResult.season}`);
    console.log(`   参赛次数: ${seasonResult.participatedEvents}场`);
    console.log(`   有效成绩: ${seasonResult.validResults}场`);
    console.log(`   最好两次成绩: ${seasonResult.bestResults.join(', ')}分`);
    console.log(`   ⭐ 最终赛季积分: ${seasonResult.finalSeasonPoints}分`);
    console.log(`   下赛季基础积分: ${seasonResult.nextSeasonBaseline}分 (×50%延续)\n`);

    return seasonResult;
  }

  /**
   * 示例6: 多项目运动员跨系统比较
   * 展示一个运动员在多个积分系统中的表现比较
   */
  static example6_CrossSystemComparison() {
    console.log('📋 示例6: 多项目运动员跨系统比较\n');

    const multiSportAthlete = 'versatile_athlete';

    // 该运动员在不同项目的赛季数据
    const seasonDataList: UniversalSeasonData[] = [
      // 高山滑雪成绩
      {
        athleteId: multiSportAthlete,
        discipline: 'ALPINE_GS',
        season: '2025-2026',
        baselinePoints: 50.0,
        races: [
          {
            athleteId: multiSportAthlete,
            discipline: 'ALPINE_GS',
            competitionId: 'alpine_1',
            competitionDate: '2025-01-20',
            athleteTime: 126.50,
            winnerTime: 124.20,
            eventLevel: EventLevel.A
          },
          {
            athleteId: multiSportAthlete,
            discipline: 'ALPINE_GS',
            competitionId: 'alpine_2',
            competitionDate: '2025-02-15',
            athleteTime: 129.80,
            winnerTime: 127.10,
            eventLevel: EventLevel.B
          }
        ]
      },

      // 单板大跳台成绩
      {
        athleteId: multiSportAthlete,
        discipline: 'SNOWBOARD_BA',
        season: '2025-2026',
        baselinePoints: 180.0,
        races: [
          {
            athleteId: multiSportAthlete,
            discipline: 'SNOWBOARD_BA',
            competitionId: 'snowboard_1',
            competitionDate: '2025-03-01',
            finalRank: 3,
            finalScore: 85.50,
            pointsCategory: PointsCategory.CATEGORY_2
          },
          {
            athleteId: multiSportAthlete,
            discipline: 'SNOWBOARD_BA',
            competitionId: 'snowboard_2',
            competitionDate: '2025-03-20',
            finalRank: 5,
            finalScore: 82.75,
            pointsCategory: PointsCategory.CATEGORY_1
          }
        ]
      },

      // 自由式滑雪成绩
      {
        athleteId: multiSportAthlete,
        discipline: 'FREESTYLE_HP',
        season: '2025-2026',
        baselinePoints: 200.0,
        races: [
          {
            athleteId: multiSportAthlete,
            discipline: 'FREESTYLE_HP',
            competitionId: 'freestyle_1',
            competitionDate: '2025-04-10',
            finalRank: 2,
            finalScore: 90.25,
            pointsCategory: PointsCategory.CATEGORY_2
          },
          {
            athleteId: multiSportAthlete,
            discipline: 'FREESTYLE_HP',
            competitionId: 'freestyle_2',
            competitionDate: '2025-04-25',
            finalRank: 4,
            finalScore: 87.80,
            pointsCategory: PointsCategory.CATEGORY_1
          }
        ]
      }
    ];

    const comparison = fourSystemsManager.compareAcrossSystems(multiSportAthlete, seasonDataList);

    console.log('🏆 跨系统表现比较:');
    console.log(`   运动员: ${comparison.athleteId}`);
    console.log(`   最强系统: ${comparison.overallAssessment.dominantSystem}`);
    console.log(`   最弱系统: ${comparison.overallAssessment.weakestSystem}`);
    console.log(`   平均一致性: ${comparison.overallAssessment.averageConsistency}`);

    console.log('\n   📊 各系统详细表现:');
    Object.entries(comparison.systemResults).forEach(([systemType, data]) => {
      if (data) {
        const systemName = {
          [ScoringSystemType.ALPINE_POINTS]: '高山滑雪',
          [ScoringSystemType.SNOWBOARD_ALPINE_POINTS]: '单板平行',
          [ScoringSystemType.SNOWBOARD_RANKING_POINTS]: '单板技巧',
          [ScoringSystemType.FREESTYLE_RANKING_POINTS]: '自由式滑雪'
        }[systemType as ScoringSystemType] || systemType;

        console.log(`     ${systemName}: ${data.totalPoints}分 (${data.participatedEvents}场比赛)`);
      }
    });

    console.log('\n   💡 发展建议:');
    comparison.recommendations.forEach(rec => {
      console.log(`     • ${rec}`);
    });

    console.log('');
    return comparison;
  }

  /**
   * 示例7: 批量数据处理
   * 展示如何批量处理多个运动员的比赛数据
   */
  static example7_BatchProcessing() {
    console.log('📋 示例7: 批量数据处理\n');

    // 模拟一场比赛中多个运动员的数据
    const batchRaceData: UniversalRaceData[] = [
      {
        athleteId: 'athlete_001',
        discipline: 'ALPINE_SL',
        competitionId: 'national_slalom_2025',
        competitionDate: '2025-03-15',
        athleteTime: 105.25,
        winnerTime: 103.80,
        eventLevel: EventLevel.A,
        finalRank: 1
      },
      {
        athleteId: 'athlete_002',
        discipline: 'ALPINE_SL',
        competitionId: 'national_slalom_2025',
        competitionDate: '2025-03-15',
        athleteTime: 106.15,
        winnerTime: 103.80,
        eventLevel: EventLevel.A,
        finalRank: 2
      },
      {
        athleteId: 'athlete_003',
        discipline: 'ALPINE_SL',
        competitionId: 'national_slalom_2025',
        competitionDate: '2025-03-15',
        athleteTime: 107.80,
        winnerTime: 103.80,
        eventLevel: EventLevel.A,
        finalRank: 3
      },
      {
        athleteId: 'athlete_004',
        discipline: 'ALPINE_SL',
        competitionId: 'national_slalom_2025',
        competitionDate: '2025-03-15',
        athleteTime: 109.25,
        winnerTime: 103.80,
        eventLevel: EventLevel.A,
        finalRank: 4
      }
    ];

    console.log('🏁 批量计算结果 (高山回转比赛):');
    const batchResults = fourSystemsManager.calculateBatchPoints(batchRaceData);

    batchResults.forEach((result, index) => {
      const raceData = batchRaceData[index];
      console.log(`   ${index + 1}. ${result.athleteId}`);
      console.log(`      ⏱️ 用时: ${raceData.athleteTime}秒`);
      console.log(`      🏆 排名: 第${raceData.finalRank}名`);
      console.log(`      📊 积分: ${result.points.earnedPoints}分`);
    });

    console.log(`\n   ✅ 成功处理 ${batchResults.length} 名运动员的成绩\n`);

    return batchResults;
  }

  /**
   * 示例8: 系统功能验证
   * 展示系统的各种辅助功能
   */
  static example8_SystemValidation() {
    console.log('📋 示例8: 系统功能验证\n');

    // 获取支持的项目列表
    const supportedDisciplines = fourSystemsManager.getSupportedDisciplines();
    console.log('🎯 支持的积分系统和项目:');
    Object.entries(supportedDisciplines).forEach(([systemType, disciplines]) => {
      const systemName = {
        [ScoringSystemType.ALPINE_POINTS]: '高山滑雪积分系统',
        [ScoringSystemType.SNOWBOARD_ALPINE_POINTS]: '单板平行项目积分系统',
        [ScoringSystemType.SNOWBOARD_RANKING_POINTS]: '单板技巧积分系统',
        [ScoringSystemType.FREESTYLE_RANKING_POINTS]: '自由式滑雪积分系统'
      }[systemType as ScoringSystemType] || systemType;

      console.log(`   ${systemName}:`);
      disciplines.forEach(discipline => {
        console.log(`     • ${discipline}`);
      });
    });

    // 数据验证示例
    console.log('\n🔍 数据验证示例:');

    const validData: UniversalRaceData = {
      athleteId: 'test_athlete',
      discipline: 'ALPINE_GS',
      competitionId: 'test_comp',
      competitionDate: '2025-05-01',
      athleteTime: 120.50,
      winnerTime: 118.20,
      eventLevel: EventLevel.B
    };

    const validation = fourSystemsManager.validateRaceData(validData);
    console.log(`   ✅ 数据验证结果: ${validation.valid ? '通过' : '失败'}`);

    if (!validation.valid) {
      console.log(`   ❌ 错误信息: ${validation.errors.join(', ')}`);
    }

    // 系统信息获取
    console.log('\n📊 系统信息查询:');
    const testDisciplines = ['ALPINE_GS', 'SNOWBOARD_BA', 'FREESTYLE_SS'];

    testDisciplines.forEach(discipline => {
      const systemInfo = fourSystemsManager.getSystemInfo(discipline);
      console.log(`   ${discipline}:`);
      console.log(`     系统: ${systemInfo.name}`);
      console.log(`     特点: ${systemInfo.description}`);
      console.log(`     积分制: ${systemInfo.isLowerBetter ? '低分制（积分越低越好）' : '高分制（积分越高越好）'}`);
    });

    console.log('');
  }

  /**
   * 运行所有示例
   */
  static runAllExamples() {
    console.log('🚀 四大积分系统使用示例演示\n');
    console.log('=' .repeat(60) + '\n');

    const examples = [
      { name: '高山滑雪积分计算', fn: this.example1_AlpineSkiing },
      { name: '单板平行项目积分计算', fn: this.example2_SnowboardParallel },
      { name: '单板技巧项目积分计算', fn: this.example3_SnowboardTricks },
      { name: '自由式滑雪积分计算', fn: this.example4_FreestyleSkiing },
      { name: '运动员赛季积分计算', fn: this.example5_SeasonPoints },
      { name: '多项目运动员跨系统比较', fn: this.example6_CrossSystemComparison },
      { name: '批量数据处理', fn: this.example7_BatchProcessing },
      { name: '系统功能验证', fn: this.example8_SystemValidation }
    ];

    examples.forEach((example, index) => {
      console.log(`\n${index + 1}. ${example.name}`);
      console.log('-'.repeat(40));
      example.fn();
    });

    console.log('🎉 所有示例演示完成!\n');

    // 总结
    console.log('📝 四大积分系统总结:');
    console.log('   1. 🎿 高山滑雪积分系统: 基于时间的低分制，积分越低排名越好');
    console.log('   2. 🏂 单板平行项目积分系统: 类似高山滑雪的低分制');
    console.log('   3. 🏂 单板技巧积分系统: 基于排名的高分制，240/360/120分档');
    console.log('   4. ⛷️ 自由式滑雪积分系统: 基于排名的高分制，240/360/120分档');
    console.log('\n   ✨ 系统特点: 统一管理、自动路由、跨系统比较、批量处理');
  }
}

// 快速使用示例
export function quickExample() {
  console.log('⚡ 四大积分系统快速示例\n');

  // 创建四种不同类型的比赛数据
  const examples = [
    {
      name: '高山滑雪',
      data: {
        athleteId: 'quick_test_alpine',
        discipline: 'ALPINE_GS',
        competitionId: 'quick_test',
        competitionDate: '2025-06-01',
        athleteTime: 125.50,
        winnerTime: 123.20,
        eventLevel: EventLevel.A
      } as UniversalRaceData
    },
    {
      name: '单板平行',
      data: {
        athleteId: 'quick_test_snowboard_parallel',
        discipline: 'SNOWBOARD_PSL',
        competitionId: 'quick_test',
        competitionDate: '2025-06-01',
        athleteTime: 61.25,
        winnerTime: 59.80,
        eventLevel: EventLevel.B
      } as UniversalRaceData
    },
    {
      name: '单板技巧',
      data: {
        athleteId: 'quick_test_snowboard_trick',
        discipline: 'SNOWBOARD_BA',
        competitionId: 'quick_test',
        competitionDate: '2025-06-01',
        finalRank: 3,
        finalScore: 87.25,
        pointsCategory: PointsCategory.CATEGORY_2
      } as UniversalRaceData
    },
    {
      name: '自由式滑雪',
      data: {
        athleteId: 'quick_test_freestyle',
        discipline: 'FREESTYLE_HP',
        competitionId: 'quick_test',
        competitionDate: '2025-06-01',
        finalRank: 1,
        finalScore: 93.75,
        pointsCategory: PointsCategory.CATEGORY_1
      } as UniversalRaceData
    }
  ];

  examples.forEach(example => {
    try {
      const result = FourSystemsUtils.quickCalculate(example.data);
      const isLowerBetter = FourSystemsUtils.isLowerBetterSystem(example.data.discipline);

      console.log(`✅ ${example.name}:`);
      console.log(`   积分: ${result.points.earnedPoints}分 (${isLowerBetter ? '低分制' : '高分制'})`);
      console.log(`   系统: ${result.systemType}\n`);
    } catch (error) {
      console.error(`❌ ${example.name} 计算失败:`, error);
    }
  });

  console.log('🎉 快速示例完成！');
}

// 导出默认示例函数
export default FourSystemsExamples;