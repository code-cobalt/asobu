const db = require('./server')
const User = require('./server/models/user')
const bcrypt = require('bcrypt')

const registerUser = (userObj) => {
  return User.findOne({ email: userObj.email }, (err, result) => {
    if (err) return { err }
    if (result) return { err: 'Email Already Exists' }
    if (!result) {
      userObj.interests = []
      userObj.hobbies = []
      userObj.exp = 0
      userObj.lvl = 1
      userObj.stats.funny = 0
      userObj.stats.intellectual = 0
      userObj.stats.fun = 0
      userObj.stats.kind = 0
      userObj.stats.therapeutic = 0
      userObj.stats.interesting = 0
      userObj.chats = []
      userObj.events = []
      return bcrypt.hash(userObj.password, 10, (err, hash) => {
        userObj.password_hash = hash
        userObj.password = null
        User.create(userObj)
          .then((document) => {
            if (document) {
              document.password_hash = null
              return document
            }
            else return { err: 'Database Error' }
          })
      })
    }
  })
}

const loginUser = (userObj) => {
  return User.findOne({ email: userObj.email }, (err, result) => {
    if (err) return { err }
    if (!result) return { err: 'Account Not Found' }
    if (result) {
      return bcrypt.compare(userObj.password, result.password_hash, (err, valid) => {
        if (err) return { err }
        if (!valid) return { err: 'Invalid Password' }
        if (valid) {
          result.pasword_hash = null
          return result
        }
      })
    }
  })
}

module.exports = { registerUser, loginUser }