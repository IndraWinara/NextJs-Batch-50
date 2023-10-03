import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from 'cloudinary'
import { createCourse } from "../services/course.service";
import CourseModel from "../models/course.model";



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

    } catch (error : any) {
        return next (new ErrorHandler(error.message,400))
    }
})