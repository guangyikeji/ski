// XML解析器工具类
export interface CompetitionData {
  // 赛事基本信息
  raceHeader: {
    sector: string
    sex: string
    level: string
    season: string
    codex: string
    nation: string
    discipline: string
    category: string
    type: string
    raceDate: {
      day: string
      month: string
      year: string
      formatted: string
    }
    eventName: string
    place: string
    td: {
      function: string
      number: string
      lastname: string
      firstname: string
      nation: string
    }
  }

  // 裁判信息
  jury: {
    referee: {
      function: string
      lastname: string
      firstname: string
      nation: string
    }
    chiefRace: {
      function: string
      lastname: string
      firstname: string
      nation: string
    }
  }

  // 赛道信息
  courses: {
    run: string
    name: string
    homologation?: string
    startTime: string
    gates: string
    turningGates: string
    courseSetter: {
      lastname: string
      firstname: string
      nation: string
    }
    startElev: string
    finishElev: string
  }[]

  // 天气和比赛信息
  raceInfo: {
    weather: {
      snow: string
      weather: string
      temperatureAirStart: string
      temperatureAirFinish: string
    }
    timingBy: string
    dataProcessingBy: string
    appliedPenalty: string
    calculatedPenalty: string
    fValue: string
  }

  // 选手排名信息 - 完整35名选手
  competitors: {
    rank: number
    order: number
    bib: number
    fisCode: string
    lastname: string
    firstname: string
    sex: string
    nation: string
    yearOfBirth: number
    status: string
  }[]
}

export class XMLParser {
  static parseCompetitionXML(xmlContent: string): CompetitionData {
    // 在实际应用中，这里应该使用DOMParser或xml2js等库
    // 为了演示，我直接返回解析好的数据
    const mockData: CompetitionData = {
      raceHeader: {
        sector: 'AL',
        sex: 'L',
        level: 'STARTLIST2',
        season: '2016',
        codex: '6377',
        nation: 'CHN',
        discipline: 'SL',
        category: 'FIS',
        type: 'Startlist',
        raceDate: {
          day: '08',
          month: '12',
          year: '2015',
          formatted: '2015年12月08日'
        },
        eventName: '2015-16 FIS SKI RACE CHINA',
        place: 'Genting',
        td: {
          function: 'Delegate',
          number: '810',
          lastname: 'NAKAMURA.M',
          firstname: '',
          nation: 'JPN'
        }
      },
      jury: {
        referee: {
          function: 'Referee',
          lastname: 'MIN',
          firstname: 'ZHENG',
          nation: 'CHN'
        },
        chiefRace: {
          function: 'Chiefrace',
          lastname: 'LI.HONGQUAN',
          firstname: '',
          nation: 'CHN'
        }
      },
      courses: [
        {
          run: '1',
          name: 'TROLLIUS 6d',
          homologation: '10376/03/12',
          startTime: '8:25',
          gates: '55',
          turningGates: '53',
          courseSetter: {
            lastname: 'TOMIIJIRO',
            firstname: '',
            nation: 'JPN'
          },
          startElev: '2026',
          finishElev: '1876'
        },
        {
          run: '2',
          name: 'TROLLIUS 6d',
          homologation: '',
          startTime: '10:35',
          gates: '54',
          turningGates: '53',
          courseSetter: {
            lastname: 'RENLIGANG',
            firstname: '',
            nation: 'CHN'
          },
          startElev: '2026',
          finishElev: '1876'
        }
      ],
      raceInfo: {
        weather: {
          snow: 'SOFT',
          weather: 'CLOUDY',
          temperatureAirStart: '-8',
          temperatureAirFinish: '-1'
        },
        timingBy: 'Microgate',
        dataProcessingBy: 'Microgate',
        appliedPenalty: '0.00',
        calculatedPenalty: '0.00',
        fValue: '720'
      },
      competitors: [
        { rank: 1, order: 1, bib: 24, fisCode: '325110', lastname: 'OH', firstname: 'Seo-young', sex: 'L', nation: 'KOR', yearOfBirth: 1994, status: '' },
        { rank: 2, order: 2, bib: 29, fisCode: '125027', lastname: 'LI', firstname: 'Yang', sex: 'L', nation: 'CHN', yearOfBirth: 1989, status: '' },
        { rank: 3, order: 3, bib: 26, fisCode: '125036', lastname: 'SUN', firstname: 'Weibo', sex: 'L', nation: 'CHN', yearOfBirth: 1993, status: '' },
        { rank: 4, order: 4, bib: 16, fisCode: '325131', lastname: 'HAN', firstname: 'Ji-Hye', sex: 'L', nation: 'KOR', yearOfBirth: 1998, status: '' },
        { rank: 5, order: 5, bib: 27, fisCode: '325132', lastname: 'RA', firstname: 'Aron', sex: 'L', nation: 'KOR', yearOfBirth: 1998, status: '' },
        { rank: 6, order: 6, bib: 25, fisCode: '125037', lastname: 'MEIXIA', firstname: 'Wang', sex: 'L', nation: 'CHN', yearOfBirth: 1997, status: '' },
        { rank: 7, order: 7, bib: 10, fisCode: '125039', lastname: 'NI', firstname: 'Yueming', sex: 'L', nation: 'CHN', yearOfBirth: 1995, status: '' },
        { rank: 8, order: 8, bib: 23, fisCode: '125026', lastname: 'LIU', firstname: 'Yang', sex: 'L', nation: 'CHN', yearOfBirth: 1988, status: '' },
        { rank: 9, order: 9, bib: 19, fisCode: '307392', lastname: 'ORIGUCHI', firstname: 'Miho', sex: 'L', nation: 'JPN', yearOfBirth: 1995, status: '' },
        { rank: 10, order: 10, bib: 28, fisCode: '125040', lastname: 'ZHANG', firstname: 'Yuying', sex: 'L', nation: 'CHN', yearOfBirth: 1997, status: '' },
        { rank: 11, order: 11, bib: 22, fisCode: '125022', lastname: 'QIN', firstname: 'Xiyue', sex: 'L', nation: 'CHN', yearOfBirth: 1988, status: '' },
        { rank: 12, order: 12, bib: 18, fisCode: '307817', lastname: 'KIKUCHI', firstname: 'Juki', sex: 'L', nation: 'JPN', yearOfBirth: 1998, status: '' },
        { rank: 13, order: 13, bib: 39, fisCode: '307899', lastname: 'SHIMIZU', firstname: 'Ami', sex: 'L', nation: 'JPN', yearOfBirth: 1999, status: '' },
        { rank: 14, order: 14, bib: 11, fisCode: '307808', lastname: 'HATA', firstname: 'Urara', sex: 'L', nation: 'JPN', yearOfBirth: 1998, status: '' },
        { rank: 15, order: 15, bib: 17, fisCode: '307699', lastname: 'ORIGUCHI', firstname: 'Misa', sex: 'L', nation: 'JPN', yearOfBirth: 1997, status: '' },
        { rank: 16, order: 16, bib: 3, fisCode: '325130', lastname: 'HONG', firstname: 'Ye-Bin', sex: 'L', nation: 'KOR', yearOfBirth: 1998, status: '' },
        { rank: 17, order: 17, bib: 7, fisCode: '307684', lastname: 'TAKAHASHI', firstname: 'Moe', sex: 'L', nation: 'JPN', yearOfBirth: 1997, status: '' },
        { rank: 18, order: 18, bib: 15, fisCode: '325111', lastname: 'JO', firstname: 'Eun-hwa', sex: 'L', nation: 'KOR', yearOfBirth: 1995, status: '' },
        { rank: 19, order: 19, bib: 6, fisCode: '325118', lastname: 'NOH', firstname: 'Jin-soul', sex: 'L', nation: 'KOR', yearOfBirth: 1996, status: '' },
        { rank: 20, order: 20, bib: 14, fisCode: '45384', lastname: 'BROWN', firstname: 'Rebecca', sex: 'L', nation: 'AUS', yearOfBirth: 1997, status: '' },
        { rank: 21, order: 21, bib: 20, fisCode: '125021', lastname: 'XIA', firstname: 'Lina', sex: 'L', nation: 'CHN', yearOfBirth: 1987, status: '' },
        { rank: 22, order: 22, bib: 2, fisCode: '307714', lastname: 'KANG', firstname: 'Rine', sex: 'L', nation: 'JPN', yearOfBirth: 1997, status: '' },
        { rank: 23, order: 23, bib: 1, fisCode: '307818', lastname: 'SAITO', firstname: 'Miyu', sex: 'L', nation: 'JPN', yearOfBirth: 1998, status: '' },
        { rank: 24, order: 24, bib: 21, fisCode: '125038', lastname: 'FANYING', firstname: 'Kong', sex: 'L', nation: 'CHN', yearOfBirth: 1996, status: '' },
        { rank: 25, order: 25, bib: 9, fisCode: '325115', lastname: 'CHOE', firstname: 'Jeong-hyeon', sex: 'L', nation: 'KOR', yearOfBirth: 1996, status: '' },
        { rank: 26, order: 26, bib: 5, fisCode: '307460', lastname: 'MATSUURA', firstname: 'Yukino', sex: 'L', nation: 'JPN', yearOfBirth: 1995, status: '' },
        { rank: 27, order: 27, bib: 4, fisCode: '307711', lastname: 'ITO', firstname: 'Momoka', sex: 'L', nation: 'JPN', yearOfBirth: 1997, status: '' },
        { rank: 28, order: 28, bib: 38, fisCode: '307947', lastname: 'TOMII', firstname: 'Yukina', sex: 'L', nation: 'JPN', yearOfBirth: 1999, status: '' },
        { rank: 29, order: 29, bib: 8, fisCode: '307791', lastname: 'TAKAHASHI', firstname: 'Risa', sex: 'L', nation: 'JPN', yearOfBirth: 1998, status: '' },
        { rank: 30, order: 30, bib: 13, fisCode: '485525', lastname: 'BUREEVA', firstname: 'Vladislava', sex: 'L', nation: 'RUS', yearOfBirth: 1989, status: '' },
        { rank: 31, order: 31, bib: 36, fisCode: '125043', lastname: 'ZHU', firstname: 'Tianhui', sex: 'L', nation: 'CHN', yearOfBirth: 1994, status: '' },
        { rank: 32, order: 32, bib: 37, fisCode: '307889', lastname: 'HIROSE', firstname: 'Chisaki', sex: 'L', nation: 'JPN', yearOfBirth: 1999, status: '' },
        { rank: 33, order: 33, bib: 30, fisCode: '135013', lastname: 'CHEN', firstname: 'Wei-Hsuan', sex: 'L', nation: 'TPE', yearOfBirth: 1998, status: '' },
        { rank: 34, order: 34, bib: 31, fisCode: '135012', lastname: 'WU', firstname: 'Meng-Chien', sex: 'L', nation: 'TPE', yearOfBirth: 1998, status: '' },
        { rank: 35, order: 35, bib: 32, fisCode: '135015', lastname: 'HUANG', firstname: 'Pin-Ting', sex: 'L', nation: 'TPE', yearOfBirth: 1999, status: '' }
      ]
    }

    return mockData
  }

  static getDisciplineName(code: string): string {
    const disciplines: { [key: string]: string } = {
      'SL': '回转',
      'GS': '大回转',
      'SG': '超级大回转',
      'DH': '速降',
      'AC': '全能'
    }
    return disciplines[code] || code
  }

  static getSexName(code: string): string {
    return code === 'L' ? '女子' : '男子'
  }

  static getNationFlag(code: string): string {
    const flags: { [key: string]: string } = {
      'CHN': '🇨🇳',
      'JPN': '🇯🇵',
      'KOR': '🇰🇷',
      'AUS': '🇦🇺',
      'RUS': '🇷🇺',
      'TPE': '🇹🇼'
    }
    return flags[code] || '🏁'
  }
}