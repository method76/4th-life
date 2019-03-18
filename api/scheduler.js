const schedule = require('node-schedule')
const couchbase = require('couchbase')
const request = require('request')
const cheerio = require('cheerio')

const cluster = new couchbase.Cluster('couchbase://localhost')
const bucketName = 'news'

const tkp1 = 'https://tokenpost.kr/business'
const tkp2 = 'https://tokenpost.kr/regulation'
const tkp3 = 'https://tokenpost.kr/technology'
const tkp4 = 'https://tokenpost.kr/investing'
const tkp5 = 'https://tokenpost.kr/insights'
const tkp6 = 'https://tokenpost.kr/people'
const tkp7 = 'https://tokenpost.kr/briefing'
const tkpUrl = 'https://tokenpost.kr'
const tkpUrls = [tkp1, tkp2, tkp3, tkp4, tkp5, tkp6, tkp7]

module.exports = scheduledJob

/**
 * Runs every 5mins
 */
function scheduledJob() {
  schedule.scheduleJob('*/5 * * * *', function () {
    crawl()
  })
}

/**
 */
function crawl () {
  console.log('crawl')
  for (let i = 0; i < tkpUrls.length; i++) {
    request.get(tkpUrls[i], function (err, res, body) {
      if (!err) {
        // console.log('body ' + body)
        var $ = cheerio.load(body)
        cluster.authenticate('method76', '!@Hy98657020')
        const bucket = cluster.openBucket(bucketName, function (err) {
          if (err) {
            console.error('Got error: %j', err)
          } else {
            $('#list .articleListWrap').each(function (idx, elem) {
              const link = $(elem).find('.listLeft a').attr('href')
              // https://tokenpost.kr + href
              const uid = 'tkp-' + link.replace('/', '')
              const cate = 'tkp'
              const title = $(elem).find('.articleListTitle').text()
              const date = $(elem).find('.articleListDate').text()
              const content = $(elem).find('.articleListCont').text()
              upsertArticle(bucket, uid, {id: uid, link: link, cate: cate, title: title, content: content, date: date}
                , function (err, result) {
                  if (err) {
                    console.error('Got error: %j', err)
                    return
                  }
              })
              console.log('[upsertSuccess]')
            })
          }
        })
      }
    })
  }
}

function upsertArticle (bucket, id, datum, callback) {

  // case of couchbase
  bucket.upsert(id, datum, function (err, result) {
    if (err) {
      callback(err)
    } else {
      callback(null, result)
    }
  })
}
