import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { redis } from "../utils/redis";
require('dotenv').config()


export const isAuthenticate = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    // cek access token dari server cookie
    const access_token = req.cookies.access_token as string

    if (!access_token) {
        return next(new ErrorHandler('Tolong Login terlebih dahulu', 400))
    }


    // verifikasi apakah access token sesuai dengan data secret kita
    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload

    if (!decoded) {
        return next(new ErrorHandler('Token tidak sesuai', 400))
    }

    // mengecek apakah user ada didalam redis client kita

    const user = await redis.get(decoded.id)

    if (!user) {
        return next(new ErrorHandler('user tidak ditemukan', 400))
    }

    req.user = JSON.parse(user);
    next();
})

// validasi role yang login [user,admin,etc...]

export const authorizeRoles = (...roles : string[])=>{
    return (req : Request, res : Response, next : NextFunction)=>{
        if (!roles.includes(req.user?.role || '')){
            return next (new ErrorHandler(`Role : ${roles} tidak berhak mengakses data ini`,400))
        }
    }
}