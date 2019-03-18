const couchbase = require('couchbase')
const cluster = new couchbase.Cluster('couchbase://localhost/')
cluster.authenticate('method76', '!@Hy98657020')
const bucket = cluster.openBucket('bucketname')
const N1qlQuery = couchbase.N1qlQuery

const config = {
  development: {
    // url to be used in link generation
    url: 'https://my.site.com',
    // mongodb connection settings
    database: {
      host: '127.0.0.1',
      port: '27017',
      db: 'site_dev'
    },
    // server details
    server: {
      host: '127.0.0.1',
      port: '3422'
    }
  },
  production: {
    // url to be used in link generation
    url: 'http://my.site.com',
    // mongodb connection settings
    database: {
      host: '127.0.0.1',
      port: '27017',
      db: 'site'
    },
    // server details
    server: {
      host: '127.0.0.1',
      port: '3421'
    }
  }
}
module.exports = config
