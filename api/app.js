const express = require('express')
const scheduler = require('./scheduler')
const couchbase = require('couchbase')
const config = require("../configs/config");
// Create express instnace
const app = express()
// Require API routes
const users = require('./routes/services')
const env = process.env.NODE_ENV || 'development'
const cluster = new couchbase.Cluster('couchbase://' + config.couchbase.server);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// Import API Routes
app.use(users)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

// Export the server middleware
module.exports = { path: '/api', handler: app, }

module.exports.newsBucket = function () {
  cluster.authenticate('method76', '!@Hy98657020');
  return cluster.openBucket(config.couchbase.newsBucket, function(e) {
    if (e) { console.log('failed open budket ' + e.message); }
  });
}

module.exports.arbiBucket = function () {
  cluster.authenticate('method76', '!@Hy98657020');
  return cluster.openBucket(config.couchbase.arbiBucket, function(e) {
    if (e) { console.log('failed open budket ' + e.message); }
  });
}

scheduler()
