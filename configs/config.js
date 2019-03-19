const BUCKET_NAME = 'news'
const URL_TKP = 'https://tokenpost.kr'
const tkp1 = 'https://tokenpost.kr/business'
const tkp2 = 'https://tokenpost.kr/regulation'
const tkp3 = 'https://tokenpost.kr/technology'
const tkp4 = 'https://tokenpost.kr/investing'
const tkp5 = 'https://tokenpost.kr/insights'
const tkp6 = 'https://tokenpost.kr/people'
const tkp7 = 'https://tokenpost.kr/briefing'
const URLS_TKP = [tkp1, tkp2, tkp3, tkp4, tkp5, tkp6, tkp7]
// const DOMAIN = 'localhost'
const DOMAIN = '4th.life'
const BASE_URL = 'https://' + DOMAIN
const couchbase = require('couchbase')
const cluster = new couchbase.Cluster('couchbase://' + DOMAIN)
//
// const config = {
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
// module.exports = config
