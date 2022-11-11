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
    // Save user in Redis
    db.hmget(username, ['firstname','lastname'],(err,res)=>{
      if(err) return callback(err, null)
      if(res[0] && res[1]) return callback(new Error("User already exists"), null)
      db.hmset(username, userObj, (err, res) => {
        if(err) return callback(err, null)
        return callback(null, res)
      })
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
  },
  delete: (username,callback)=>
  {
    if(!username)
      return callback(new Error("Wrong user parameters"), null)
    db.hmdel(username,(err,res)=>{
      if(err) return callback(err, null)
      callback(null,res)
    })
  }
}
