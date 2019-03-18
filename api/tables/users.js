var users = require('../configs/couchdb').use('users')

exports.create = function create (user, cb) {
  users.insert(user, user.email, cb)
}
