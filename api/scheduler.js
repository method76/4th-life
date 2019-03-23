const schedule = require('node-schedule')
const request = require('request')
const cheerio = require('cheerio')
// const service = require('./service/crawler')

let idx = 0

/**
 * Runs every 5mins
 */
function scheduledJob () {
  schedule.scheduleJob('*/1 * * * *', function () {
    const config = require('../configs/config.js')()
    switch (idx % 2) {
      case 1:
        crawlTkp(config)
        break
      case 0:
        crawlBlp(config)
        break
    }
    idx++
  })
}

function crawlBlp (config) {
  console.log('crawlBlp')
  request.get(config.URL_BLP, function (err, res, body) {
    if (!err) {
      // console.log('body ' + body)
      var $ = cheerio.load(body)
      config.cluster.authenticate('method76', '!@Hy98657020')
      const bucket = config.cluster.openBucket(config.BUCKET_NAME, function (err) {
        if (err) {
          console.error('Got error: %j', err)
        } else {
          $('#article-list li').each(function (idx, elem) {
            const link = $(elem).find('.entry-thumbnail a').attr('href')
            const styles = $(elem).find('.entry-thumbnail').attr('style').split(';')
            let imgSrc = ''
            for (var i = 0; i < styles.length; i++) {
              let item = styles[i].trim()
              if (item.startsWith('background-image')) {
                console.log('item ' + item)
                imgSrc = item.split("'")[1]
                break
              }
            }
            console.log('imgSrc ' + imgSrc)
            // background-image: url('')
            // https://tokenpost.kr + href
            const uid = 'blp-' + $(elem).attr('id')
            const cate = 'blp'
            const title = $(elem).find('.entry-title a').text()
            const date = $(elem).find('.entry-category span:last-child').text() // 한글 2019년 9월 11일
            const content = $(elem).find('.entry-excerpt p').html()
            upsertArticle(bucket, uid, { id: uid, link: link, cate: cate, title: title,
                content: content, date: date, img: imgSrc },
              function (err, result) {
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

/**
 */
function crawlTkp (config) {
  console.log('crawlTkp')
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
              upsertArticle(bucket, uid, { id: uid,
                link: config.URL_TKP + link,
                cate: cate,
                title: title,
                content: content,
                date: date,
                img: imgSrc },
              function (err, result) {
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

module.exports = scheduledJob
