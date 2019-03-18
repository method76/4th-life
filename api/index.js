const express = require('express')
const scheduler = require('./scheduler')
const env = process.env.NODE_ENV || 'development'

// Create express instnace
const app = express()

// Require API routes
const users = require('./routes/services')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// Import API Routes
app.use(users)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}

scheduler()
// ex) usage: config.database.host
