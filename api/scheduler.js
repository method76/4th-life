const schedule = require('node-schedule');
const request = require('request');
const cheerio = require('cheerio');
const level = require('../configs/db.js');
const cache = require('../configs/cache.js');

let news = null;
let arbi = null;
let config = null;
let index = 0;
let krwPrice = 0;
let usdtPrice = 0;

Date.prototype.YYYYMMDDHHMM = function () {
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  return this.getFullYear()
    + pad2(this.getMonth() + 1)
    + pad2(this.getDate())
    + pad2(this.getHours())
    + pad2(this.getMinutes());
};

function crawlCrypto() {
  if (krwPrice===0) {
    console.error('Got error: no krw price found');
    return;
  }
  const time = parseInt(new Date().YYYYMMDDHHMM(), 10);
  request.get(config.URL_UBT, (err1, res, body) => {
    if (!err1) {
      const jsonbody = JSON.parse(body);
      const exchange = 'UBT';
      for (let i=0; i<jsonbody.length; i++) {
        // console.log('ubt item ' + JSON.stringify(jsonbody[i]));
        const price = Math.floor(jsonbody[i].trade_price);
        const priceUsd = price/krwPrice;
        const symbol = jsonbody[i].market.replace('KRW-', '');
        arbi.upsert(time + '-UBT-' + symbol, {
          exchange, symbol, price, priceUsd, time
        }, (err2, result) => {
          if (err2) {
            console.error('Got error: %j', err2);
          }
        });
      }
    } else {
      console.error('UBT Got error: %j', err1);
    }
  });
  request.get(config.URL_BFX, (err1, res, body) => {
    if (!err1) {
      const jsonbody = JSON.parse(body);
      const exchange = 'BFX';
      for (let i = 0; i < jsonbody.length; i++) {
        const priceUsd = jsonbody[i][1];
        const price = Math.round(priceUsd * krwPrice);
        // console.log('bfx item ' + JSON.stringify(jsonbody[i]));
        const symbol = jsonbody[i][0].replace('t', '').replace('USD', '');
        arbi.upsert(time + '-BFX-' + symbol, {
          exchange, symbol, price, priceUsd, time
        }, (err2, result) => {
          if (err2) {
            console.error('Got error: %j', err2);
          }
        });
      }
    } else {
      console.error('BFX Got error: %j', err1);
    }
  });
  request.get(config.URL_GIO, (err1, res, body) => {
    if (!err1) {
      const jsonbody = JSON.parse(body);
      const exchange = 'GIO';
      const tickerArr = ['btc_usdt', 'ltc_usdt', 'xrp_usdt', 'eth_usdt', 'eos_usdt', 'xlm_usdt'];
      for (let i=0; i<tickerArr.length; i++) {
        const priceUsdt = jsonbody[tickerArr[i]].last;
        // baseVolume
        const priceUsd = parseFloat(priceUsdt)*usdtPrice;
        const price = Math.round(priceUsd * krwPrice);
        // console.log('bfx item ' + JSON.stringify(jsonbody[i]));
        const symbol = tickerArr[i].replace('_usdt', '').toUpperCase();
        arbi.upsert(time + '-GIO-' + symbol, {
          exchange, symbol, price, priceUsd, time
        }, (err2, result) => {
          if (err2) {
            console.error('Got error: %j', err2);
          }
        });
      }
    } else {
      console.error('GIO Got error: %j', err1);
    }
  });
}

function crawlRate() {
  let options = {
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
        level.put('krwPrice', parseFloat(krwPriceStr), function (err2) {
          if (err2) return console.error('Got error: %j', err2);
          level.get('krwPrice', function (err3, value) {
            if (err3) return console.error('Got error: %j', err3);
            krwPrice = value;
          });
        });
      } catch (e) {
        console.log('e ' + e.message);
      }
    } else {
      console.error('Naver Got error: %j', err1);
    }
  });
  options = {
    url: config.URL_USDT,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  request.get(options, (err1, res, body) => {
    if (!err1) {
      const $ = cheerio.load(body);
      // 1,137.1 원
      try {
        let usdtPriceStr = $("#quote_price .details-panel-item--price__value").text().replace('$', '')
          .trim();
        level.put('usdtPrice', parseFloat(usdtPriceStr), function (err2) {
          if (err2) return console.error('Got error: %j', err2);
          level.get('usdtPrice', function (err3, value) {
            if (err3) return console.error('Got error: %j', err3);
            usdtPrice = value;
          });
        });
      } catch (e) {
        console.log('e ' + e.message);
      }
    } else {
      console.error('CmCap Got error: %j', err1);
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
        }, (err2, result) => {
          if (err2) {
            console.error('Got error: %j', err2);
          }
        });
      });
    }
  });
}

/**
 * 토큰포스트
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
            const title = $(elem).find('.articleListTitle a').text();
            // 2019-02-15 11:54
            const date = $(elem).find('.articleListDate').text().trim()
              .replace('-', '')
              .replace('-', '')
              .replace(' ', '')
              .replace(':', '');
            const content = $(elem).find('.articleListCont').text();
            news.upsert(uid, {
              id: uid, link: config.URL_TKP + link, cate, title, content, date, img: imgSrc,
            }, (err2, result) => {
              if (err2) {
                console.error('Got error: %j', err2);
              }
            });
          }
        });
      }
    });
  }
}

/**
 * Decenter
 */
function crawlDct() {
  console.log('crawlDct');
  for (let i = 0; i < config.URLS_DCT.length; i++) {
    request.get(config.URLS_DCT[i], (err1, res, body) => {
      if (!err1) {
        // console.log('body ' + body)
        const $ = cheerio.load(body);
        $('.news_list li').each((idx, elem) => {
          const link = $(elem).find('dt a').attr('href');
          if (typeof (link) !== 'undefined') {
            const imgSrc = $(elem).find('p img').attr('src');
            // https://tokenpost.kr + href
            const uid = `dct-${link.replace('/NewsView/', '').replace('/', '-')}`;
            const cate = 'dct';
            const title = $(elem).find('dt span').text();
            // 2019-02-15 11:54
            const date = $(elem).find('span.letter').text().trim()
              .replace('-', '')
              .replace('-', '');
            const content = $(elem).find('dd a').text();
            news.upsert(uid, {
              id: uid, link: config.URL_DCT + link, cate, title, content, date, img: imgSrc,
            }, (err2, result) => {
              if (err2) {
                console.error('Got error: %j', err2);
              }
            });
          }
        });
      }
    });
  }
}

function crawlCnr() {
  console.log('crawlCnr');
  for (let i = 0; i < config.URLS_CNR.length; i++) {
    request.get(config.URLS_CNR[i], (err1, res, body) => {
      if (!err1) {
        // console.log('body ' + body)
        const $ = cheerio.load(body);
        $('#sub_read_list .sub_read_list_box').each((idx, elem) => {
          const link = $(elem).find('dt a').attr('href');
          if (typeof (link) !== 'undefined') {
            let imgSrc = $(elem).find('.img_file img').attr('src');
            if (typeof (imgSrc) !== 'undefined') {
              imgSrc = imgSrc.replace('.', '');
            }
            // https://tokenpost.kr + href
            const uid = `cnr-${link.replace('/', '')}`;
            const cate = 'cnr';
            const title = $(elem).find('dt a').text();
            // 2019-02-15 11:54
            const date = $(elem).find('.etc').text().split('|')[1].trim()
              .replace('.', '')
              .replace('.', '')
              .replace(' ', '')
              .replace(':', '');
            const content = $(elem).find('.sbody a').text();
            news.upsert(uid, {
              id: uid, link: config.URL_CNR + link, cate, title, content, date,
              img: config.URL_CNR + imgSrc,
            }, (err2, result) => {
              if (err2) {
                console.error('Got error: %j', err2);
              }
            });
          }
        });
      }
    });
  }
}

function crawlCtd() {
  console.log('crawlCtd');
  for (let i = 0; i < config.URLS_CTD.length; i++) {
    request.get(config.URLS_CTD[i], (err1, res, body) => {
      if (!err1) {
        // console.log('body ' + body)
        const $ = cheerio.load(body);
        $('.td-ss-main-content .td_module_wrap').each((idx, elem) => {
          const link = $(elem).find('h3 a').attr('href');
          if (typeof (link) !== 'undefined') {
            let img = $(elem).find('.td-module-thumb img').attr('src');
            const id = `ctd-${link.replace('http://cointoday.co.kr/', '').replace('/', '')
              .replace('/', '')}`;
            const cate = 'ctd';
            const title = $(elem).find('h3 a').attr('title');
            // 2019-02-15 11:54
            let date = $(elem).find('.entry-date').text().trim()
              .replace('년', '').replace('월', '').replace('일', '').replace(':', '');
            const dateSpl = date.split(' ');
            date = dateSpl[0];
            if (dateSpl[1].length<2) {
              date += '0' + dateSpl[1];
            } else {
              date += dateSpl[1];
            }
            if (dateSpl[2].length<2) {
              date += '0' + dateSpl[2];
            } else {
              date += dateSpl[2];
            }
            date += dateSpl[3];
            const content = $(elem).find('.td-excerpt').text();
            news.upsert(id, { id, link, cate, title, content, date, img },
              (err2, result) => {
                if (err2) {
                  console.error('Got error: %j', err2);
                }
              });
          }
        });
      }
    });
  }
}

function crawlBlm() {
  console.log('crawlBlm');
  for (let i = 0; i < config.URLS_BLM.length; i++) {
    request.get(config.URLS_BLM[i], (err1, res, body) => {
      if (!err1) {
        const $ = cheerio.load(body);
        $('.paginated_content article').each((idx, elem) => {
          const link = $(elem).find('.header a').attr('href');
          if (typeof (link) !== 'undefined') {
            let img = $(elem).find('.header img').attr('src');
            const cate = 'blm';
            const id = cate + '-' + $(elem).attr('id');
            const title = $(elem).find('.et-accent-color').text();
            const date = new Date().YYYYMMDDHHMM();
            const content = $(elem).find('.entry-summary p').text();
            news.insert(id, { id, link, cate, title, content, date, img },
              (err2, result) => {
                if (err2) {
                  if (!err2.message.startsWith('The key')) {
                    console.error('Got error: %j', err2);
                  }
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
        if (date === '') { date = new Date().YYYYMMDDHHMM(); }
        const content = '';
        news.insert(uid, {
          id: uid, link, cate, title, content, date, img: imgSrc,
        }, (err2, result) => {
          if (err2) {
            if (!err2.message.startsWith('The key')) {
              console.error('Got error: %j', err2);
            }
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
          }, (err2, result) => {
            if (err2) {
              console.error('Got error: %j', err2);
            }
          });
        });
      } catch (e) { console.log(`e ${e.message}`); }
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
    if (index==0) {
      crawlRate();
    } else {
      crawlCrypto();
    }
    switch (index % 8) {
      case 0:
        crawlBlm();
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
        crawlDst()
        break;
      case 5:
        crawlDct();
        break;
      case 6:
        crawlCnr();
        break;
      case 7:
        crawlCtd();
        break;
      default:
    }
    index += 1;
    if (index === 100) {
      index = 0;
    }
  });
}

module.exports = scheduledJob;
