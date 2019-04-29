const { Router } = require('express');
const config = require('../../configs/config');
const couchbase = require('couchbase')
const level = require('../../configs/db.js');
const cache = require('../../configs/cache.js');
const router = Router();

router.get('/init', function (req, res, next) {
  const isTableExist = db.connected !== null
  res.render('init', {
    title: 'kittychain installation',
    isTableExist: isTableExist
  })
})

router.get('/init/proc', function (req, res, next) {
  var param = req.query.a
  console.log('param ' + param)
  if (param === 'a') {
    // DB(bucket) creation
    // const cm = config.cluster.manager('method76', '!@Hy98657020')
    // cm.createBucket(config.BUCKET_NAME, null, function (err) {
    //   if (err) {
    //     console.log('Bucket creation failed:', err)
    //     createIndex(config.cluster, res)
    //   } else {
    //     createIndex(config.cluster, res)
    //   }
    // })
  } else if (param === 'b') {
    // table (document) creation
    // bucket.insert('TST-01-00001', datum, function (err, result) {
    //   if (err) {
    //     console.error('Got error: %j', err)
    //     res.sendStatus(500)
    //   } else {
    //     res.json({ code: 999, msg: 'data created' })
    //   }
    // })
  } else if (param === 'c') {
    // table (document) creation
    db.remove('TST-01-00001', function (err, result) {
      if (err) {
        console.error('Got error: %j', err)
        res.sendStatus(500)
      } else {
        res.json({ code: 999, msg: 'data removed' })
      }
    })
  }
})

function createIndex (cluster, res) {
  // CREATE PRIMARY INDEX ON news
  console.log('createIndex')
  const bm = bucket.manager()
  console.log('createPrimaryIndex')
  bm.createPrimaryIndex({ ignoreIfExists: true }, function (err, result) {
    if (err) {
      console.error('Got error: %j', err)
      res.sendStatus(500);
    } else {
      res.json( {code: 999, msg: 'index of bucket created'} );
    }
  })
}

router.get('/news', function (req, res, next) {
  let news = cache.get( 'news' );
  if (news) {
    res.json(news);
  } else {
    const query = couchbase.N1qlQuery.fromString('SELECT * FROM '
      + config.couchbase.newsBucket
      + ' ORDER BY date DESC LIMIT 35')
    const db = require('../app').newsBucket();
    db.query(query, (err2, rows) => {
      if (err2) {
        console.error('Got error: %j', err2)
        res.sendStatus(500);
      } else {
        let idx = 0
        let rowArr1 = []
        let rowArr2 = []
        let rowArr3 = []
        let rowArr4 = []
        rows.forEach((row) => {
          // console.log(row[config.BUCKET_NAME])
          let item = row[config.couchbase.newsBucket]
          if (idx < 8) {
            rowArr1.push(item)
          } else if (idx < 17) {
            rowArr2.push(item)
          } else if (idx < 26) {
            rowArr3.push(item)
          } else {
            rowArr4.push(item)
          }
          idx++
        })
        news = { code: 999, news1: rowArr1, news2: rowArr2, news3: rowArr3, news4: rowArr4 };
        const success = cache.set('news', news, 30);
        if (success) {
          res.json(news);
        } else {
          console.error('Got error')
          res.sendStatus(500);
        }
      }
    })
  }
})

router.get('/arbi', function (req, res, next) {
  let arbi = cache.get( 'arbi' );
  if (arbi) {
    // console.log('got arbi ', JSON.stringify(arbi));
    res.json(arbi);
  } else {
    const db = require('../app').arbiBucket();
    const q1 = couchbase.N1qlQuery.fromString('select max(time) as time from '
      + config.couchbase.arbiBucket);
    db.query(q1, (err1, rows) => {
      if (err1) {
        console.error('Got error: %j', err1)
        res.sendStatus(500)
      } else if (rows) {
        const time = rows[0].time;
        const q2 = couchbase.N1qlQuery.fromString('select * from '
          + config.couchbase.arbiBucket + ' where time = ' + time);
        db.query(q2, (err2, rows) => {
          if (err2) {
            console.error('Got error: %j', err2)
            res.sendStatus(500)
          } else {
            level.get('krwPrice', function (err3, value) {
              if (err3) {
                console.error('Got error: %j', err3)
                res.sendStatus(500);
              } else {
                let timestr = "" + rows[0].arbi.time;
                const timeKr = timestr.substring(4, 6) + '월'
                  + timestr.substring(6, 8) + '일 ' + timestr.substring(8, 10) + '시'
                  + timestr.substring(10, 12) + '분';
                console.log('timeKr ' + timeKr);
                arbi = {'usd-krw': value, 'datetime': timestr, 'timeKr': timeKr, result: rows};
                const success = cache.set('arbi', arbi, 15);
                if (success) {
                  res.json(arbi);
                } else {
                  console.error('Got error')
                  res.sendStatus(500);
                }
              }
            });
          }
        });
      }
    });
  }
});

module.exports = router
