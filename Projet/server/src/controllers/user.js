const db = require('../dbClient')
const {parse, stringify, toJSON, fromJSON} = require('flatted');

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    // Save to DB
    // TODO check if user already exists
    db.hmset(user.username, userObj, (err, res) => {
      if (err) return callback(err, null)
      callback(null, res) // Return callback
    })
  },
  get: (username,callback) => {
    if(!username)
      return callback(new Error("Wrong user parameters"), null)
    const userObj = {
      firstname: '',
      lastname: '',
    }
    db.hmget(username, ['firstname','lastname'],(err,res)=>{
      if(err) return callback(err, null)
      callback(null,res)

    })
  }
}
