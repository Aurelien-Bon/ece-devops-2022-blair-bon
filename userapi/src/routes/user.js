const express = require('express')
const userController = require('../controllers/user')

const userRouter = express.Router()

userRouter
  .post('/', (req, resp) => { //type: POST, URL: http://localhost:3000/user/?username={username}&firstname={firstname}&lastname={lastname}
    userController.create(req.query, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(201).json(respObj)
    })
  })
  .get('/:username', (req, resp) => { // type GET, URL: http://localhost:3000/user/{username}
     const username = req.params.username
     userController.get(username,(err,res)=>{
       let respObj
       if(err){
         respObj={
           status: "error",
           msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj={
        status:"success",
        msg:res
      }
      resp.status(201).json(respObj)
     })
  })
  .put('/:username', (req, resp) => { // type PUT, URL: http://localhost:3000/user/{username}?firstname={firstname}&lastname={lastname}
    const username = req.params.username
    const user = req.query
    userController.update(username,user,(err,res)=>{
      let respObj
      if(err){
        respObj={
          status:"error",
          msg:err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj={
        status:"success",
        msg:res
      }
      resp.status(201).json(respObj)
    }
    )
  })
  .delete('/:username', (req, resp) => { // type DELETE, URL: http://localhost:3000/user/{username}
    const username = req.params.username
    userController.delete(username,(err,res)=>{
      let respObj
      if(err){
        respObj={
          status:"error",
          msg:err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj={
        status:"success",
        msg:res
      }
      resp.status(201).json(respObj)
    }
    )
  })

module.exports = userRouter
