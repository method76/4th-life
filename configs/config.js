const couchbase = require('couchbase')

const config = function () {
  const DOMAIN = '4th.life'
  const tkp1 = 'https://tokenpost.kr/business'
  const tkp2 = 'https://tokenpost.kr/regulation'
  const tkp3 = 'https://tokenpost.kr/technology'
  const tkp4 = 'https://tokenpost.kr/investing'
  const tkp5 = 'https://tokenpost.kr/insights'
  const tkp6 = 'https://tokenpost.kr/people'
  const tkp7 = 'https://tokenpost.kr/briefing'
  const cluster = new couchbase.Cluster('couchbase://' + DOMAIN)
  return {
    cluster: cluster,
    BUCKET_NAME: 'news',
    BASE_URL: 'https://' + DOMAIN,
    URL_TKP: 'https://tokenpost.kr',
    URLS_TKP: [tkp1, tkp2, tkp3, tkp4, tkp5, tkp6, tkp7],
    URL_BLP: 'https://blockpost.com/allNews',
    URL_DST: 'https://dstreet.io',
    URL_BIP: 'https://blockinpress.com/recent',
    URL_TWC: 'https://trendw.kr/category/blockchain'
  }
}

module.exports = config

// const config : {
//   development: {
//     // url to be used in link generation
//     url: 'https://my.site.com',
//     // mongodb connection settings
//     database: {
//       host: '127.0.0.1',
//       port: '27017',
//       db: 'site_dev'
//     },
//     // server details
//     server: {
//       host: '127.0.0.1',
//       port: '3422'
//     }
//   },
//   production: {
//     // url to be used in link generation
//     url: 'http://my.site.com',
//     // mongodb connection settings
//     database: {
//       host: '127.0.0.1',
//       port: '27017',
//       db: 'site'
//     },
//     // server details
//     server: {
//       host: '127.0.0.1',
//       port: '3421'
//     }
//   }
// }
