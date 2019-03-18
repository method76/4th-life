const express = require('express')
const env = process.env.NODE_ENV || 'development'
const config = require('./configs/server')[env]

// Create express instnace
const app = express()

// Require API routes
const users = require('./routes/services')

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

// ex) usage: config.database.host
