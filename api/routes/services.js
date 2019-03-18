const { Router } = require('express')
const router = Router()
const couchbase = require('couchbase')
const cluster = new couchbase.Cluster('couchbase://localhost')
const NodeCache = require( "node-cache" );
const articleCache = new NodeCache( { stdTTL: 100, checkperiod: 60 } )
const bucketName = 'blockchain_media'
const tkpUrl = 'https://tokenpost.kr'

router.get('/init', function (req, res, next) {
  cluster.authenticate('method76', '!@Hy98657020')
  const media = cluster.openBucket(bucketName)
  console.log('media ' + JSON.stringify(media))
  var isTableExist = media.connected !== null
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
    const cm = cluster.manager('method76', '!@Hy98657020')
    cm.createBucket(bucketName, null, function (err) {
      if (err) {
        console.log('Bucket creation failed:', err)
        createIndex(cluster, res)
      } else {
        createIndex(cluster, res)
      }
    })
  } else if (param === 'b') {
    // table (document) creation
    const bucket = cluster.openBucket(bucketName, function (err) {
      if (err) {
        console.error('Got error: %j', err)
        res.sendStatus(500)
      } else {
        bucket.insert('TST-01-00001', datum, function (err, result) {
          if (err) {
            console.error('Got error: %j', err)
            res.sendStatus(500)
          } else {
            res.json({ code: 999, msg: 'data created' })
          }
        })
      }
    })
  } else if (param === 'c') {
    // table (document) creation
    const bucket = cluster.openBucket(bucketName, function (err) {
      if (err) {
        console.error('Got error: %j', err)
        res.sendStatus(500)
      } else {
        bucket.remove('TST-01-00001', function (err, result) {
          if (err) {
            console.error('Got error: %j', err)
            res.sendStatus(500)
          } else {
            res.json({ code: 999, msg: 'data removed' })
          }
        })
      }
    })
  }
})

function createIndex (cluster, res) {
  // CREATE PRIMARY INDEX ON blockchain_media
  console.log('createIndex')
  cluster.authenticate('method76', '!@Hy98657020')
  const bucket = cluster.openBucket(bucketName, function (err, result) {
    if (err) {
      console.error('Got error: %j', err)
      res.sendStatus(500)
    } else {
      console.log('no error')
      const bm = bucket.manager()
      console.log('createPrimaryIndex')
      bm.createPrimaryIndex({ ignoreIfExists: true }, function (err, result) {
        if (err) {
          console.error('Got error: %j', err)
          res.sendStatus(500)
        } else {
          res.json({code: 999, msg: 'index of bucket created'})
        }
      })
    }
  })
}
router.get('/news', function (req, res, next) {
  cluster.authenticate('method76', '!@Hy98657020')
  const bucket = cluster.openBucket(bucketName, function (err) {
    if (err) {
      console.error('Got error: %j', err)
      res.sendStatus(500)
    } else {
      const query = couchbase.N1qlQuery.fromString('SELECT * FROM ' + bucketName + ' ORDER BY date DESC LIMIT 10')
      bucket.query(query, (err, rows) => {
        let rowArr = []
        rows.forEach((row) => {
          console.log(row.blockchain_media)
          let item = row.blockchain_media
          item.id = 'tkp-' + item.link.replace('/', '')
          item.link = tkpUrl + item.link
          rowArr.push(item)
        })
        res.json({ code: 999, result: rowArr })
      })
    }
  })
})

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

module.exports = router
