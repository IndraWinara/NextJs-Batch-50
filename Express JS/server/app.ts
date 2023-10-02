import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middleware/error';
import userRouter from './routes/user.route'
require('dotenv').config()
export const app = express()
require('express')


//body parser
app.use(express.json({limit : '50mb'}))


//cookies-parser untuk frontend
app.use(cookieParser())

//cors ==> agar bisa hit api kita ya
app.use(cors({
    origin: process.env.ORIGIN
}))

//routes
app.use('/api/v1',userRouter)

//test api dulu gaes
app.get('/test', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: 'success test api nya gae'
    })
})




//jika ada yang mau akses route not found
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error (`Route ${req.originalUrl} tidak ada lur`) as any
    err.statusCode = 404
    next(err)
})

//tambahkan error handling yang sudah dibuat
app.use(ErrorMiddleware)