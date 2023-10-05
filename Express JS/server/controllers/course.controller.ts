import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from 'cloudinary'
import { createCourse } from "../services/course.service";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";



// Fungsi membuat course

export const uploadCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        //ambil keseluruhan data dari input di body
        const data = req.body;
        const thumbnail = data.thumbnail;

        //validasi apakah request body terdapat thumbnail atau tidak
        if (thumbnail) {
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
            })

            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }

        createCourse(data, res, next)
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})


// edit course

export const updateCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const data = req.body
        const thumbnail = data.thumbnail

        //validasi thumbnail dahulu
        if (thumbnail) {
            await cloudinary.v2.uploader.destroy(thumbnail.public_id)
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: 'courses'
            })

            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }

        //ambil parameter params.id
        const courseId = req.params.id

        //validasi id dan update course
        const course = await CourseModel.findByIdAndUpdate(courseId, { $set: data }, { new: true })
        res.status(200).json({
            success: true,
            course
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// Fungsi ambil informasi (get) course untuk yang belum Bayar (purchasing)

export const getSingleCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id

        // kita buat cache di redis untuk user yang hitting public api karena banyak yang akses agar tidak terjadi server down
        const isCacheExist = await redis.get(courseId)
        if (isCacheExist) {
            const courseRedis = JSON.parse(isCacheExist)
            //  console.log('hitting redis')
            res.status(200).json({
                success: true,
                courseRedis
            })
        } else {
            const courseDb = await CourseModel.findById(courseId).select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links")
            //  console.log('hitting mongodb')
            await redis.set(courseId, JSON.stringify(courseDb))
            res.status(200).json({
                success: true,
                courseDb
            })
        }


    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})




// Fungsi ambil informasi (get) semua course untuk yang belum Bayar (purchasing)

export const getAllCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // kita buat cache di redis untuk user yang hitting public api karena banyak yang akses agar tidak terjadi server down
        const isCacheExist = await redis.get("AllCourses")
        if (isCacheExist) {
            const courseRedis = JSON.parse(isCacheExist)
            // console.log('hitting redis')
            res.status(200).json({
                success: true,
                courseRedis
            })
        } else {
            const courseDb = await CourseModel.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links")
            // console.log('hitting Mongodb')
            await redis.set("AllCourses", JSON.stringify(courseDb))
            res.status(200).json({
                success: true,
                courseDb
            })
        }

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})


// fungsi Get Detail Course untuk user yang sudah ada coursenya(purchased)

export const getCourseContent = CatchAsyncError(async(req : Request, res : Response , next : NextFunction)=>{
    try {
        const userCourseList = req.user?.courses
        const courseId = req.params.id
        
        const courseExits = userCourseList?.find((course :any)=> course._id.toString() === courseId)

        if(!courseExits){
            return next (new ErrorHandler('Anda Tidak Bisa Mengakses Course Ini',400))
        }

        const course = await CourseModel.findById(courseId)
        const content = course?.courseData

        res.status(200).json({
            success : true,
            content
        })
    } catch (error : any) {
        return next (new ErrorHandler(error.message,400))
    }
})



//interface Pertanyaan 

interface IAddQuestionData {
    question : string,
    courseId : string,
    contentId : string
}

// Fungsi add pertanyaan

export const addQuestion = CatchAsyncError(async(req : Request, res : Response, next : NextFunction)=>{
    try {
        const {question,contentId,courseId} : IAddQuestionData = req.body
        const course = await CourseModel.findById(courseId)


        //validasi terlebih dahulu contentId di mongoose dan modeldatabase
        const checkMongoose = mongoose.Types.ObjectId.isValid(contentId)
        if(!checkMongoose){
            return next (new ErrorHandler(`Content id : ${contentId} tidak ditemukan`,400))
        }

        const courseContent = course?.courseData?.find((item : any)=> item._id.equals(contentId))

        if (!courseContent){
            return next (new ErrorHandler(`Content id : ${contentId} tidak ditemukan`,400))
        }

        //setelah validasi content success lanjut buat questionya

        const createQuestion : any = {
            user : req.user,
            question,
            questionReplies : []
        }

        //tambahkan ke dalam courseData
        courseContent.questions.push(createQuestion)

        //simpan ke database
        await course?.save()

        res.status(200).json({
            success : true,
            course
        })
    } catch (error : any) {
        return next (new ErrorHandler(error.message,400))
    }
})