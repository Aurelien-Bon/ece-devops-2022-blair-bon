const db = require('../dbClient')
const {parse, stringify, toJSON, fromJSON} = require('flatted');

module.exports = {
  create: (user, callback) => {
    // Check parameters
    console.log(user)
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    // Save user in Redis
    db.get(user.username, ['firstname','lastname'],(err,res)=>{
      if(err) return callback(err, null)
      if(res[0] && res[1]) return callback(new Error("User already exists"), null)
      db.set(user.username, userObj, (err, res) => {
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
    db.hmGet(username, ['firstname','lastname'],(err,res)=>{
      if(err) return callback(err, null)
      callback(null,res)

    })
  },
  delete: (user,callback)=>
  {
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    db.del(user.username,(err,res)=>{
      if(err) return callback(err, null)
      callback(null,res)
    })
  }
}
