const db = require('../dbClient')
const {parse, stringify, toJSON, fromJSON} = require('flatted');

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username || !user.firstname || !user.lastname)
      return callback(new Error("Wrong user parameters"), null)
    // Save to DB
    db.hmget(user.username, ['firstname','lastname'],(err,res)=>{
      if(err) return callback(err, null)
      if(res[0]!==null){
        return callback(new Error("User already exists"), null)
      }
      db.hmset(user.username, {'firstname':user.firstname,'lastname':user.lastname}, (err, res) => {
        if (err) return callback(err, null)
        callback(null, res) // Return callback
      }
      )
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
      if(res[0]===null){
        return callback(new Error("User does not exist"), null)
      }
      callback(null,res)

    })
  },
  update: (username,user, callback) => {
    if(!username || !user.firstname || !user.lastname)
      return callback(new Error("Wrong user parameters"), null)
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    db.hmget(username, ['firstname','lastname'],(err,res)=>{
      if(err) return callback(err, null)
      if(res[0]==null){
        return callback(new Error("User not existe"), null)
      }
    })
    db.hmset(username, userObj, (err, res) => {
      if (err) return callback(err, null)
      callback(null, res) // Return callback
    })
  },
  delete: (username, callback) => {
    if(!username)
      return callback(new Error("Wrong user parameters"), null)
    db.del(username, (err, res) => {
      if (err) return callback(err, null)
      callback(null, res) // Return callback
    })
  }
}
