require('express')
import express from 'express'
import { activationUser, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updateAccessToken, updateAvatar, updatePassword, updateUserInfo } from '../controllers/user.controller'
import { isAuthenticate } from '../middleware/auth'
const userRouter = express.Router()


// authentication routes

userRouter.post('/registration',registrationUser)
userRouter.post('/activation',activationUser)
userRouter.post('/login-user',loginUser)
userRouter.get('/logout-user',isAuthenticate,logoutUser)
userRouter.get('/refresh-token',updateAccessToken)
userRouter.get('/me',isAuthenticate,getUserInfo)
userRouter.post('/social-auth',socialAuth)
userRouter.put('/update-user-info',isAuthenticate,updateUserInfo)
userRouter.put('/update-user-password',isAuthenticate,updatePassword)
userRouter.put('/update-user-avatar',isAuthenticate,updateAvatar)



export default userRouter;