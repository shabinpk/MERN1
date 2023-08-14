const express=require('express')
const userRoutes=express.Router()
const { userRegisterCtrl,
    userLoginCtrl,
    userGetMeCtrl}=require('../controllers/userCtrl')
const { protect } = require('../middleware/authMiddleware')


userRoutes.post('/',userRegisterCtrl)
userRoutes.post('/login',userLoginCtrl)

userRoutes.get('/me',protect,userGetMeCtrl)

module.exports=userRoutes;