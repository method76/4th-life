const schedule = require('node-schedule')
const request = require('request')
const cheerio = require('cheerio')

module.exports = scheduledJob

/**
 * Runs every 5mins
 */
function scheduledJob () {
  schedule.scheduleJob('*/5 * * * *', function () {
    crawl()
  })
}

/**
 */
function crawl () {
  console.log('crawl')
  const config = require('../configs/config.js')
  for (let i = 0; i < config.URLS_TKP.length; i++) {
    request.get(config.URLS_TKP[i], function (err, res, body) {
      if (!err) {
        // console.log('body ' + body)
        var $ = cheerio.load(body)
        config.cluster.authenticate('method76', '!@Hy98657020')
        const bucket = config.cluster.openBucket(config.BUCKET_NAME, function (err) {
          if (err) {
            console.error('Got error: %j', err)
          } else {
            $('#list .articleListWrap').each(function (idx, elem) {
              const link = $(elem).find('.listLeft a').attr('href')
              const imgSrc = $(elem).find('.listLeft img').attr('src')
              // https://tokenpost.kr + href
              const uid = 'tkp-' + link.replace('/', '')
              const cate = 'tkp'
              const title = $(elem).find('.articleListTitle').text()
              const date = $(elem).find('.articleListDate').text()
              const content = $(elem).find('.articleListCont').text()
              upsertArticle(bucket, uid, { id: uid, link: link, cate: cate, title: title, content: content, date: date, img: imgSrc }
                , function (err, result) {
                  if (err) {
                    console.error('Got error: %j', err)
                  }
                })
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
