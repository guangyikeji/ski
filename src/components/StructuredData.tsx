import Script from 'next/script'

interface StructuredDataProps {
  type?: 'website' | 'organization' | 'sportsOrganization'
}

export default function StructuredData({ type = 'sportsOrganization' }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'website' ? 'WebSite' : 'SportsOrganization',
    name: 'Alpine Skiing China',
    alternateName: '中国高山滑雪积分管理平台',
    description: '基于中国滑雪协会(FIS)标准的专业滑雪竞赛数据管理平台，为中国高山滑雪运动提供权威积分计算、成绩管理、赛事组织等一站式解决方案',
    url: 'https://guangyikeji.github.io/ski/',
    logo: 'https://guangyikeji.github.io/ski/images/logo.png',
    image: 'https://guangyikeji.github.io/ski/images/ski-bg.jpg',
    sameAs: [
      'https://github.com/guangyikeji/ski',
      'https://alpine-ski-points.vercel.app'
    ],
    ...(type === 'sportsOrganization' && {
      sport: 'Alpine Skiing',
      foundingDate: '2024',
      foundingLocation: {
        '@type': 'Country',
        name: 'China'
      },
      memberOf: {
        '@type': 'SportsOrganization',
        name: 'FIS - International Ski Federation',
        url: 'https://www.fis-ski.com'
      },
      offers: {
        '@type': 'Service',
        name: 'Alpine Skiing Points Management',
        description: '中国积分计算、运动员管理、赛事组织、成绩统计',
        serviceType: 'Sports Management Software',
        provider: {
          '@type': 'Organization',
          name: 'Alpine Skiing China'
        }
      }
    }),
    ...(type === 'website' && {
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://guangyikeji.github.io/ski/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Chinese', 'English']
    },
    keywords: [
      '高山滑雪',
      'Alpine Skiing',
      '中国积分',
      '滑雪竞赛',
      '积分计算',
      '滑雪管理',
      '中国滑雪',
      '中国滑雪协会',
      '赛事管理',
      '运动员积分'
    ]
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  )
}