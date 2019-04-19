const schedule = require('node-schedule');
const request = require('request');
const cheerio = require('cheerio');

let news = null;
let arbi = null;
let config = null;
let index = 0;
let krwPrice = 1130;

Date.prototype.YYYYMMDDHHMM = function () {
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  return this.getFullYear()
    + pad2(this.getMonth() + 1)
    + pad2(this.getDate())
    + pad2(this.getHours())
    + pad2(this.getMinutes());
};

function crawlCrypto() {
  console.log('crawlCrypto');
  const time = new Date().YYYYMMDDHHMM();
  request.get(config.URL_UBT, (err1, res, body) => {
    if (!err1) {
      const jsonbody = JSON.parse(body);
      const exchange = 'UBT';
      for (let i=0; i<jsonbody.length; i++) {
        // console.log('ubt item ' + JSON.stringify(jsonbody[i]));
        const price = Math.floor(jsonbody[i].trade_price);
        const symbol = jsonbody[i].market.replace('KRW-', '');
        arbi.upsert(time + '-UBT-' + symbol, {
          exchange, symbol, price, time
        }, (err3, result) => {
          if (err3) {
            console.error('Got error: %j', err3);
          }
        });
      }
    }
  });
  request.get(config.URL_BFX, (err1, res, body) => {
    if (!err1) {
      const jsonbody = JSON.parse(body);
      const exchange = 'BFX';
      for (let i=0; i<jsonbody.length; i++) {
        const price = Math.round(jsonbody[i][1]*krwPrice);
        // console.log('bfx item ' + JSON.stringify(jsonbody[i]));
        const symbol = jsonbody[i][0].replace('t', '').replace('USD', '');
        arbi.upsert(time + '-BFX-' + symbol, {
          exchange, symbol, price, time
        }, (err3, result) => {
          if (err3) {
            console.error('Got error: %j', err3);
          }
        });
      }
    }
  });
}
function crawlRate() {
  console.log('crawlRate');
  const options = {
    url: config.URL_DAU,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  request.get(options, (err1, res, body) => {
    if (!err1) {
      // https://finance.daum.net/exchanges
      // console.log('crawlRate ' + body);
      const $ = cheerio.load(body);
      // 1,137.1 원
      try {
        let krwPriceStr = $("#_cs_foreigninfo strong").text().replace(',', '')
          .replace('원', '').trim();
        krwPrice = parseFloat(krwPriceStr);
        console.log('crawlRate ' + krwPrice);
      } catch (e) {
        console.log('e ' + e.message);
      }
    }
  });
}

function crawlBlp() {
  console.log('crawlBlp');
  request.get(config.URL_BLP, (err1, res, body) => {
    if (!err1) {
      // console.log('body ' + body)
      const $ = cheerio.load(body);
      $('#article-list li').each((idx, elem) => {
        const link = $(elem).find('.entry-thumbnail a').attr('href');
        const styles = $(elem).find('.entry-thumbnail').attr('style').split(';');
        let imgSrc = '';
        for (let i = 0; i < styles.length; i++) {
          const item = styles[i].trim();
          if (item.startsWith('background-image')) {
            // console.log('item ' + item)
            imgSrc = item.split("'")[1];
            break;
          }
        }
        const uid = `blp-${$(elem).attr('id')}`;
        const cate = 'blp';
        const title = $(elem).find('.entry-title a').text();
        // 2019년 9월 11일
        const dateRaw = $(elem).find('.entry-category span:last-child').text().trim();
        const dateArr = dateRaw.split(' ');
        let date = dateArr[0].replace('년', '');
        date += dateArr[1].replace('월', '').length < 2 ? (`0${dateArr[1].replace('월', '')}`)
          : (dateArr[1].replace('월', ''));
        date += dateArr[2].replace('일', '').length < 2 ? (`0${dateArr[2].replace('일', '')}`)
          : (`${dateArr[2].replace('일', '')}0000`);
        const content = $(elem).find('.entry-excerpt p').html();
        news.upsert(uid, {
          id: uid, link, cate, title, content, date, img: imgSrc,
        }, (err3, result) => {
          if (err3) {
            console.error('Got error: %j', err3);
          }
        });
      });
    }
  });
}

/**
 */
function crawlTkp() {
  console.log('crawlTkp');
  for (let i = 0; i < config.URLS_TKP.length; i++) {
    request.get(config.URLS_TKP[i], (err1, res, body) => {
      if (!err1) {
        // console.log('body ' + body)
        const $ = cheerio.load(body);
        $('#list .articleListWrap').each((idx, elem) => {
          const link = $(elem).find('.listLeft a').attr('href');
          if (typeof (link) !== 'undefined') {
            const imgSrc = $(elem).find('.listLeft img').attr('src');
            // https://tokenpost.kr + href
            const uid = `tkp-${link.replace('/', '')}`;
            const cate = 'tkp';
            const title = $(elem).find('.articleListTitle').text();
            // 2019-02-15 11:54
            const date = $(elem).find('.articleListDate').text().trim()
              .replace('-', '')
              .replace('-', '')
              .replace(' ', '')
              .replace(':', '');
            const content = $(elem).find('.articleListCont').text();
            news.upsert(uid, {
              id: uid, link: config.URL_TKP + link, cate, title, content, date, img: imgSrc,
            }, (err3, result) => {
              if (err3) {
                console.error('Got error: %j', err3);
              }
            });
          }
        });
      }
    });
  }
}

function crawlDst() {
  console.log('crawlDst');
  request.post(`${config.URL_DST}/get-list-feed`, {}, (err1, res, body) => {
    if (!err1) {
      const $ = cheerio.load(body);
      let date = '';
      $('li').each((idx, elem) => {
        const link = config.URL_DST + $(elem).attr('data-url');
        let imgSrc = '';
        if (typeof ($(elem).find('.photo').attr('style')) !== 'undefined') {
          const styles = $(elem).find('.photo').attr('style').split(';');
          for (let i = 0; i < styles.length; i++) {
            const item = styles[i].trim();
            if (item.startsWith('background-image')) {
              imgSrc = config.URL_DST + item.split('(')[1].split(')')[0];
              break;
            }
          }
        }
        const uid = `dst-${link.split('?id=')[1]}`;
        const cate = 'dst';
        const title = $(elem).find('.title').text();
        if (typeof (link.split('?id=N')[1]) !== 'undefined') {
          date = link.split('?id=N')[1].substring(0, 12); // ?일전
        }
        if (date === '') { date = new Date().YYYYMMDDHHMM; }
        const content = '';
        news.upsert(uid, {
          id: uid, link, cate, title, content, date, img: imgSrc,
        }, (err3, result) => {
          if (err3) {
            console.error('Got error: %j', err3);
          }
        });
      });
    } else {
      console.error('Got error: %j', err1);
    }
  });
}

function crawlBip() {
  console.log('crawlBip');
  const options = {
    url: config.URL_BIP,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  request.get(options, (err1, res, body) => {
    if (!err1) {
      // console.log('body ' + body)
      const $ = cheerio.load(body);
      try {
        $('#postList article').each((idx, elem) => {
          const link = $(elem).find('.entry-featured-image a').attr('href');
          const imgSrc = $(elem).find('.entry-featured-image img').attr('src');
          const uid = `bip-${$(elem).attr('id')}`;
          const cate = 'bip';
          const title = $(elem).find('.entry-title a').text();
          const dateRaw = $(elem).find('.entry-date').text().trim();
          const dateArr = dateRaw.split(' ');
          let date = dateArr[0].replace('년', '');
          date += dateArr[1].replace('월', '').length < 2 ? (`0${dateArr[1].replace('월', '')}`)
            : (dateArr[1].replace('월', ''));
          date += dateArr[2].replace('일', '').length < 2 ? (`0${dateArr[2].replace('일', '')}`)
            : `${dateArr[2].replace('일', '')}0000`;
          const content = $(elem).find('.entry-excerpt p:first-child').text();
          news.upsert(uid, {
            id: uid, link, cate, title, content, date, img: imgSrc,
          }, (err3, result) => {
            if (err3) {
              console.error('Got error: %j', err3);
            }
          });
        });
      } catch (e) { console.log(`e ${e.message}`); }
    }
  });
}

/**
 * Difficult
 * @param config
 */
function crawlTwc() {
  // .listing article    { .title a text() href
  console.log('crawlTwc');
  const options = {
    url: config.URL_TWC,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  request.get(options, (err1, res, body) => {
    if (!err1) {
      const $ = cheerio.load(body);
      config.cluster.authenticate('method76', '!@Hy98657020');
      $('.listing .listing-item a.b-loaded').each((idx, elem) => {
        const link = $(elem).attr('href').firstChild;
        console.log(`title elem ${$(elem).find('.title')}`);
        const imgSrc = $(elem).css('background-image');
        console.log(`imgSrc ${imgSrc}`);
        if (typeof (bgUrl) !== 'undefined') {
          const uid = `twc-${link.split('https://trendw.kr/')[1].split('.t1m')[0]}`;
          const cate = 'twc';
          const title = $(elem).find('.title a').text().trim();
          const date = $(elem).find('time').text(); // 2018-11-27
          const content = $(elem).find('.post-summary').text().trim();
          news.upsert(uid, {
            id: uid, link, cate, title, content, date, img: imgSrc,
          }, (err3, result) => {
            if (err3) {
              console.error('Got error: %j', err3);
            }
          });
        } else {
          console.log('no style attr');
        }
      });
    }
  });
}

/**
 * Runs every 5mins
 */
function scheduledJob() {
  schedule.scheduleJob('*/1 * * * *', () => {
    config = require('../configs/config');
    news = require('./app').newsBucket();
    arbi = require('./app').arbiBucket();
    switch (index % 5) {
      case 0:
        crawlDst();
        break;
      case 1:
        crawlBlp();
        break;
      case 2:
        crawlTkp();
        break;
      case 3:
        crawlBip();
        break;
      case 4:
        // crawlTwc(config)
        break;
      default:
    }
    crawlCrypto();
    if (index==0) {
      crawlRate();
    }
    index += 1;
    if (index === 100) {
      index = 0;
    }
  });
}

module.exports = scheduledJob;
