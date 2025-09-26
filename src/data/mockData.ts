// 模拟数据管理中心

export interface Athlete {
  id: string
  name: string
  gender: 'male' | 'female'
  birthDate: string
  nationality: string
  fisCode: string
  currentPoints: {
    SL: number
    GS: number
    SG: number
    DH: number
    overall: number
  }
  bestPoints: {
    SL: number
    GS: number
    SG: number
    DH: number
    overall: number
  }
  specialties: string[]
  team?: string
  coach?: string
  status: 'active' | 'injured' | 'retired'
  profileImage?: string
  achievements: string[]
  careerStart: string
}

export interface Competition {
  id: string
  name: string
  type: 'National Championship' | 'Regional Championship' | 'China Cup' | 'Provincial Championship' | 'Training Race'
  disciplines: string[]
  startDate: string
  endDate: string
  location: {
    venue: string
    country: string
    city: string
  }
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  participants: number
  organizer: string
  chinaCode?: string
  resultsPublished: boolean
}

export interface Result {
  id: string
  competitionId: string
  athleteId: string
  discipline: string
  rank: number
  time: string
  points: number
  run1Time?: string
  run2Time?: string
  dnf: boolean
  dsq: boolean
  date: string
}

export interface PointsHistory {
  id: string
  athleteId: string
  discipline: string
  points: number
  date: string
  competitionId: string
  rank: number
}

// 模拟运动员数据
export const mockAthletes: Athlete[] = [
  {
    id: 'ATH001',
    name: '张伟',
    gender: 'male',
    birthDate: '1998-03-15',
    nationality: 'CHN',
    fisCode: '125001',
    currentPoints: {
      SL: 45.67,
      GS: 52.18,
      SG: 68.95,
      DH: 75.32,
      overall: 60.53
    },
    bestPoints: {
      SL: 35.42,
      GS: 41.67,
      SG: 58.23,
      DH: 65.89,
      overall: 50.30
    },
    specialties: ['SL', 'GS'],
    team: '中国国家队',
    coach: '李教练',
    status: 'active',
    achievements: ['2023年全国锦标赛冠军', '2022年亚洲杯季军'],
    careerStart: '2016-01-01'
  },
  {
    id: 'ATH002',
    name: '李芳',
    gender: 'female',
    birthDate: '2000-07-22',
    nationality: 'CHN',
    fisCode: '125002',
    currentPoints: {
      SL: 38.45,
      GS: 43.78,
      SG: 56.23,
      DH: 62.45,
      overall: 50.23
    },
    bestPoints: {
      SL: 28.67,
      GS: 34.56,
      SG: 45.89,
      DH: 52.34,
      overall: 40.37
    },
    specialties: ['SL', 'GS', 'SG'],
    team: '中国国家队',
    coach: '王教练',
    status: 'active',
    achievements: ['2023年世界杯第5名', '2022年全国锦标赛亚军'],
    careerStart: '2018-01-01'
  },
  {
    id: 'ATH003',
    name: '王磊',
    gender: 'male',
    birthDate: '1995-11-08',
    nationality: 'CHN',
    fisCode: '125003',
    currentPoints: {
      SL: 68.95,
      GS: 62.45,
      SG: 45.23,
      DH: 38.67,
      overall: 53.83
    },
    bestPoints: {
      SL: 58.23,
      GS: 52.34,
      SG: 35.45,
      DH: 28.89,
      overall: 43.73
    },
    specialties: ['DH', 'SG'],
    team: '中国国家队',
    coach: '赵教练',
    status: 'injured',
    achievements: ['2021年世界锦标赛第8名', '2020年世界杯第3名'],
    careerStart: '2014-01-01'
  },
  {
    id: 'ATH004',
    name: '陈晨',
    gender: 'female',
    birthDate: '2001-12-03',
    nationality: 'CHN',
    fisCode: '125004',
    currentPoints: {
      SL: 39.42,
      GS: 46.78,
      SG: 58.34,
      DH: 72.56,
      overall: 54.28
    },
    bestPoints: {
      SL: 32.15,
      GS: 38.92,
      SG: 48.67,
      DH: 62.34,
      overall: 45.52
    },
    specialties: ['SL'],
    team: '北京队',
    coach: '刘教练',
    status: 'active',
    achievements: ['2023年青年锦标赛冠军'],
    careerStart: '2019-01-01'
  },
  {
    id: 'ATH005',
    name: 'Mikaela Shiffrin',
    gender: 'female',
    birthDate: '1995-03-13',
    nationality: 'USA',
    fisCode: '6535237',
    currentPoints: {
      SL: 0.00,
      GS: 5.23,
      SG: 25.67,
      DH: 35.89,
      overall: 16.70
    },
    bestPoints: {
      SL: 0.00,
      GS: 0.00,
      SG: 15.23,
      DH: 25.67,
      overall: 10.23
    },
    specialties: ['SL', 'GS'],
    team: 'US Ski Team',
    status: 'active',
    achievements: ['奥运会冠军', '世界杯总冠军', '世界锦标赛冠军'],
    careerStart: '2011-01-01'
  },
  {
    id: 'ATH006',
    name: 'Marco Odermatt',
    gender: 'male',
    birthDate: '1997-10-08',
    nationality: 'SUI',
    fisCode: '512182',
    currentPoints: {
      SL: 45.67,
      GS: 0.00,
      SG: 8.23,
      DH: 12.45,
      overall: 16.59
    },
    bestPoints: {
      SL: 35.89,
      GS: 0.00,
      SG: 0.00,
      DH: 5.67,
      overall: 10.39
    },
    specialties: ['GS', 'SG', 'DH'],
    team: 'Swiss Ski Team',
    status: 'active',
    achievements: ['奥运会冠军', '世界杯总冠军'],
    careerStart: '2015-01-01'
  },
  {
    id: 'ATH007',
    name: 'Petra Vlhová',
    gender: 'female',
    birthDate: '1995-06-13',
    nationality: 'SVK',
    fisCode: '705423',
    currentPoints: {
      SL: 8.45,
      GS: 15.78,
      SG: 45.23,
      DH: 68.45,
      overall: 34.48
    },
    bestPoints: {
      SL: 0.00,
      GS: 8.56,
      SG: 35.89,
      DH: 58.34,
      overall: 25.70
    },
    specialties: ['SL', 'GS'],
    team: 'Slovak Ski Team',
    status: 'active',
    achievements: ['世界杯总冠军', '世界锦标赛冠军'],
    careerStart: '2012-01-01'
  }
]

// 模拟比赛数据
export const mockCompetitions: Competition[] = [
  {
    id: 'COMP001',
    name: '2024年全国高山滑雪锦标赛',
    type: 'National Championship',
    disciplines: ['SL', 'GS', 'SG', 'DH'],
    startDate: '2024-02-15',
    endDate: '2024-02-18',
    location: {
      venue: '长白山滑雪场',
      country: '中国',
      city: '长春'
    },
    status: 'completed',
    participants: 156,
    organizer: '中国滑雪协会',
    chinaCode: 'CHN2024001',
    resultsPublished: true
  },
  {
    id: 'COMP002',
    name: '2024年全国青少年滑雪锦标赛',
    type: 'Regional Championship',
    disciplines: ['SL', 'GS'],
    startDate: '2024-02-01',
    endDate: '2024-02-03',
    location: {
      venue: '万龙滑雪场',
      country: '中国',
      city: '张家口'
    },
    status: 'completed',
    participants: 89,
    organizer: '中国滑雪协会',
    chinaCode: 'CHN2024002',
    resultsPublished: true
  },
  {
    id: 'COMP003',
    name: '2024年中国高山滑雪巡回赛（北京站）',
    type: 'China Cup',
    disciplines: ['SL', 'GS'],
    startDate: '2024-03-15',
    endDate: '2024-03-17',
    location: {
      venue: '南山滑雪场',
      country: '中国',
      city: '北京'
    },
    status: 'upcoming',
    participants: 120,
    organizer: '北京滑雪协会',
    chinaCode: 'CHN2024003',
    resultsPublished: false
  },
  {
    id: 'COMP004',
    name: '2024年崇礼中国积分赛',
    type: 'Provincial Championship',
    disciplines: ['SG', 'DH'],
    startDate: '2024-01-20',
    endDate: '2024-01-21',
    location: {
      venue: '云顶滑雪场',
      country: '中国',
      city: '张家口'
    },
    status: 'completed',
    participants: 67,
    organizer: '河北省滑雪协会',
    chinaCode: 'CHN2024004',
    resultsPublished: true
  },
  {
    id: 'COMP005',
    name: '2024年春季训练赛',
    type: 'Training Race',
    disciplines: ['SL', 'GS'],
    startDate: '2024-03-25',
    endDate: '2024-03-26',
    location: {
      venue: '万龙滑雪场',
      country: '中国',
      city: '张家口'
    },
    status: 'upcoming',
    participants: 45,
    organizer: '崇礼滑雪协会',
    resultsPublished: false
  }
]

// 模拟比赛成绩数据
export const mockResults: Result[] = [
  // 2024年全国高山滑雪锦标赛 - 回转
  {
    id: 'RES001',
    competitionId: 'COMP001',
    athleteId: 'ATH001',
    discipline: 'SL',
    rank: 3,
    time: '1:45.67',
    points: 35.42,
    run1Time: '53.24',
    run2Time: '52.43',
    dnf: false,
    dsq: false,
    date: '2024-02-15'
  },
  {
    id: 'RES002',
    competitionId: 'COMP001',
    athleteId: 'ATH002',
    discipline: 'SL',
    rank: 1,
    time: '1:43.89',
    points: 28.67,
    run1Time: '52.15',
    run2Time: '51.74',
    dnf: false,
    dsq: false,
    date: '2024-02-15'
  },
  {
    id: 'RES003',
    competitionId: 'COMP001',
    athleteId: 'ATH004',
    discipline: 'SL',
    rank: 2,
    time: '1:44.56',
    points: 32.15,
    run1Time: '52.89',
    run2Time: '51.67',
    dnf: false,
    dsq: false,
    date: '2024-02-15'
  },
  // 2024年全国高山滑雪锦标赛 - 大回转
  {
    id: 'RES004',
    competitionId: 'COMP001',
    athleteId: 'ATH001',
    discipline: 'GS',
    rank: 5,
    time: '2:15.89',
    points: 52.18,
    run1Time: '1:08.45',
    run2Time: '1:07.44',
    dnf: false,
    dsq: false,
    date: '2024-02-16'
  },
  {
    id: 'RES005',
    competitionId: 'COMP001',
    athleteId: 'ATH002',
    discipline: 'GS',
    rank: 2,
    time: '2:12.34',
    points: 38.92,
    run1Time: '1:06.78',
    run2Time: '1:05.56',
    dnf: false,
    dsq: false,
    date: '2024-02-16'
  },
  // 2024年亚洲杯高山滑雪赛
  {
    id: 'RES006',
    competitionId: 'COMP002',
    athleteId: 'ATH002',
    discipline: 'SL',
    rank: 8,
    time: '1:48.23',
    points: 45.67,
    run1Time: '54.12',
    run2Time: '54.11',
    dnf: false,
    dsq: false,
    date: '2024-02-01'
  },
  {
    id: 'RES007',
    competitionId: 'COMP002',
    athleteId: 'ATH001',
    discipline: 'GS',
    rank: 12,
    time: '2:18.45',
    points: 68.34,
    run1Time: '1:09.23',
    run2Time: '1:09.22',
    dnf: false,
    dsq: false,
    date: '2024-02-02'
  },
  // 2024年崇礼中国积分赛
  {
    id: 'RES008',
    competitionId: 'COMP004',
    athleteId: 'ATH003',
    discipline: 'SG',
    rank: 6,
    time: '1:28.34',
    points: 45.23,
    dnf: false,
    dsq: false,
    date: '2024-01-20'
  },
  {
    id: 'RES009',
    competitionId: 'COMP004',
    athleteId: 'ATH003',
    discipline: 'DH',
    rank: 4,
    time: '1:52.67',
    points: 38.67,
    dnf: false,
    dsq: false,
    date: '2024-01-21'
  }
]

// 模拟积分历史数据
export const mockPointsHistory: PointsHistory[] = [
  // 张伟的积分历史
  {
    id: 'PH001',
    athleteId: 'ATH001',
    discipline: 'SL',
    points: 35.42,
    date: '2024-02-15',
    competitionId: 'COMP001',
    rank: 3
  },
  {
    id: 'PH002',
    athleteId: 'ATH001',
    discipline: 'SL',
    points: 42.18,
    date: '2024-01-28',
    competitionId: 'COMP004',
    rank: 5
  },
  {
    id: 'PH003',
    athleteId: 'ATH001',
    discipline: 'SL',
    points: 48.95,
    date: '2024-01-15',
    competitionId: 'COMP002',
    rank: 8
  },
  // 李芳的积分历史
  {
    id: 'PH004',
    athleteId: 'ATH002',
    discipline: 'SL',
    points: 28.67,
    date: '2024-02-15',
    competitionId: 'COMP001',
    rank: 1
  },
  {
    id: 'PH005',
    athleteId: 'ATH002',
    discipline: 'SL',
    points: 35.42,
    date: '2024-01-28',
    competitionId: 'COMP002',
    rank: 3
  },
  {
    id: 'PH006',
    athleteId: 'ATH002',
    discipline: 'GS',
    points: 38.92,
    date: '2024-02-16',
    competitionId: 'COMP001',
    rank: 2
  }
]

// 数据查询辅助函数
export const getAthleteById = (id: string): Athlete | undefined => {
  return mockAthletes.find(athlete => athlete.id === id)
}

export const getCompetitionById = (id: string): Competition | undefined => {
  return mockCompetitions.find(competition => competition.id === id)
}

export const getResultsByAthleteId = (athleteId: string): Result[] => {
  return mockResults.filter(result => result.athleteId === athleteId)
}

export const getResultsByCompetitionId = (competitionId: string): Result[] => {
  return mockResults.filter(result => result.competitionId === competitionId)
}

export const getPointsHistoryByAthleteId = (athleteId: string): PointsHistory[] => {
  return mockPointsHistory.filter(history => history.athleteId === athleteId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const getAthletesByNationality = (nationality: string): Athlete[] => {
  return mockAthletes.filter(athlete => athlete.nationality === nationality)
}

export const getCompetitionsByStatus = (status: Competition['status']): Competition[] => {
  return mockCompetitions.filter(competition => competition.status === status)
}

export const getTopAthletesByDiscipline = (discipline: string, limit: number = 10): Athlete[] => {
  return mockAthletes
    .filter(athlete => athlete.specialties.includes(discipline))
    .sort((a, b) => {
      const pointsA = a.currentPoints[discipline as keyof typeof a.currentPoints] || Infinity
      const pointsB = b.currentPoints[discipline as keyof typeof b.currentPoints] || Infinity
      return pointsA - pointsB
    })
    .slice(0, limit)
}

// 统计数据
export const getStatistics = () => {
  const totalAthletes = mockAthletes.length
  const activeAthletes = mockAthletes.filter(a => a.status === 'active').length
  const totalCompetitions = mockCompetitions.length
  const completedCompetitions = mockCompetitions.filter(c => c.status === 'completed').length
  const upcomingCompetitions = mockCompetitions.filter(c => c.status === 'upcoming').length
  const totalResults = mockResults.length

  const nationalityStats = mockAthletes.reduce((acc, athlete) => {
    acc[athlete.nationality] = (acc[athlete.nationality] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return {
    totalAthletes,
    activeAthletes,
    totalCompetitions,
    completedCompetitions,
    upcomingCompetitions,
    totalResults,
    nationalityStats
  }
}