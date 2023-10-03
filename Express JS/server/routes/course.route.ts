import express from 'express'
import { authorizeRoles, isAuthenticate } from '../middleware/auth'
import { updateCourse, uploadCourse } from '../controllers/course.controller'
const courseRouter = express.Router()

//Routes Course

courseRouter.post('/create-course',isAuthenticate,authorizeRoles("admin"),uploadCourse)
courseRouter.put('/update-course/:id',isAuthenticate,authorizeRoles("admin"),updateCourse)


export default courseRouter