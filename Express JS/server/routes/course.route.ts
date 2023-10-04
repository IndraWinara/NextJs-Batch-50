import express from 'express'
import { authorizeRoles, isAuthenticate } from '../middleware/auth'
import { getAllCourse, getSingleCourse, updateCourse, uploadCourse } from '../controllers/course.controller'
const courseRouter = express.Router()

//Routes Course

courseRouter.post('/create-course',isAuthenticate,authorizeRoles("admin"),uploadCourse)
courseRouter.put('/update-course/:id',isAuthenticate,authorizeRoles("admin"),updateCourse)
courseRouter.get('/course/:id',getSingleCourse)
courseRouter.get('/course',getAllCourse)


export default courseRouter