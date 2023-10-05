import express from 'express'
import { authorizeRoles, isAuthenticate } from '../middleware/auth'
import { addQuestion, getAllCourse, getCourseContent, getSingleCourse, updateCourse, uploadCourse } from '../controllers/course.controller'
const courseRouter = express.Router()

//Routes Course

courseRouter.post('/create-course',isAuthenticate,authorizeRoles("admin"),uploadCourse)
courseRouter.put('/update-course/:id',isAuthenticate,authorizeRoles("admin"),updateCourse)
courseRouter.get('/course/:id',getSingleCourse)
courseRouter.get('/course',getAllCourse)
courseRouter.get('/course-content/:id',isAuthenticate,getCourseContent)
courseRouter.put('/add-question/:id',isAuthenticate,addQuestion)


export default courseRouter