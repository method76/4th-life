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
    switch (idx % 5) {
      case 4:
        crawlBlp(config)
        break
      case 1:
        crawlTkp(config)
        break
      case 2:
        crawlDst(config)
        break
      case 3:
        crawlBip(config)
        break
      case 0:
        // crawlTwc(config)
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
                // console.log('item ' + item)
                imgSrc = item.split("'")[1]
                break
              }
            }
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

function crawlDst (config) {
  console.log('crawlDst')
  request.get(config.URL_DST + '/news/', function (err, res, body) {
    if (!err) {
      // console.log('body ' + body)
      var $ = cheerio.load(body)
      config.cluster.authenticate('method76', '!@Hy98657020')
      const bucket = config.cluster.openBucket(config.BUCKET_NAME, function (err) {
        if (err) {
          console.error('Got error: %j', err)
        } else {
          $('#section-02 li').each(function (idx, elem) {
            const link = config.URL_DST + $(elem).attr('data-url')
            const styles = $(elem).find('.photo').attr('style').split(';')
            let imgSrc = ''
            for (var i = 0; i < styles.length; i++) {
              let item = styles[i].trim()
              if (item.startsWith('background-image')) {
                // console.log('item ' + item)
                imgSrc = config.URL_DST + item.split('(')[1].split(')')[0]
                break
              }
            }
            const uid = 'dst-' + link.split('id=')[1]
            const cate = 'dst'
            const title = $(elem).find('.title').text()
            const date = $(elem).find('.date').text() // ?일전
            const content = ''
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

function crawlBip (config) {
  console.log('crawlBip ' + config.URL_BIP)
  let options = {
    url: config.URL_BIP,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
      'Content-Type': 'application/x-www-form-urlencoded' }
  }
  request.get(options, function (err, res, body) {
    if (!err) {
      // console.log('body ' + body)
      var $ = cheerio.load(body)
      config.cluster.authenticate('method76', '!@Hy98657020')
      const bucket = config.cluster.openBucket(config.BUCKET_NAME, function (err) {
        if (err) {
          console.error('Got error: %j', err)
        } else {
          try {
            $('#postList article').each(function (idx, elem) {
              const link = $(elem).find('.entry-featured-image a').attr('href')
              const imgSrc = $(elem).find('.entry-featured-image img').attr('src')
              const uid = 'bip-' + $(elem).attr('id')
              const cate = 'bip'
              const title = $(elem).find('.entry-title a').text()
              const date = $(elem).find('.entry-date').text().trim() // 2019년 3월 22일
              const content = $(elem).find('.entry-excerpt p:first-child').text()
              upsertArticle(bucket, uid, {
                  id: uid, link: link, cate: cate, title: title,
                  content: content, date: date, img: imgSrc
                },
                function (err, result) {
                  if (err) {
                    console.error('Got error: %j', err)
                  }
                })
            })
          } catch (e) { console.log('e ' + e.message) }
        }
      })
    }
  })
}

/**
 * Difficult
 * @param config
 */
function crawlTwc (config) {
  // .listing article    { .title a text() href
  console.log('crawlTwc')
  let options = {
    url: config.URL_TWC,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
      'Content-Type': 'application/x-www-form-urlencoded' }
  }
  request.get(options, function (err, res, body) {
    if (!err) {
      // console.log('body ' + body)
      var $ = cheerio.load(body)
      config.cluster.authenticate('method76', '!@Hy98657020')
      const bucket = config.cluster.openBucket(config.BUCKET_NAME, function (err) {
        if (err) {
          console.error('Got error: %j', err)
        } else {
          $('.listing .listing-item a.b-loaded').each(function (idx, elem) {
            const link = $(elem).attr('href').firstChild
            console.log('title elem ' + $(elem).find('.title'))
            let imgSrc = $(elem).css('background-image')
            console.log('imgSrc ' + imgSrc)
            if (typeof (bgUrl) !== 'undefined') {
              const uid = 'twc-' + link.split('https://trendw.kr/')[1].split('.t1m')[0]
              const cate = 'twc'
              const title = $(elem).find('.title a').text().trim()
              const date = $(elem).find('time').text() // 2018-11-27
              const content = $(elem).find('.post-summary').text().trim()
              upsertArticle(bucket, uid, { id: uid, link: link, cate: cate, title: title,
                  content: content, date: date, img: imgSrc },
                function (err, result) {
                  if (err) {
                    console.error('Got error: %j', err)
                  }
                })
            } else {
              console.log('no style attr')
            }
          })
        }
      })
    }
  })
}

function upsertArticle (bucket, id, datum, callback) {
  // case of couchbase
  bucket.upsert(id, datum, function (err, result) {
    if (err) {
      callback(err)
    } else {
      console.log('upsert ' + JSON.stringify(result))
      callback(null, result)
    }
  })
}

module.exports = scheduledJob
