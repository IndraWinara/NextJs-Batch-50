require('dotenv').config()
import { Response } from "express"
import { IUser } from "../models/user.model"
import { redis } from "./redis"

interface ITokenOptions {
    expire : Date,
    maxAge : number,
    httpOnly : boolean,
    sameSite : 'lax' | 'strict' | 'none' | undefined,
    secure? : boolean
}

// parse data .env kita dahulu
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300",10)
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1200",10)
 

//option untuk parameter cookie

export const accessTokenOptions : ITokenOptions = {
    // akan expire dalam satuan mili second ke menit
    expire : new Date(Date.now() + accessTokenExpire *3600 * 1000 ),
    maxAge : accessTokenExpire * 3600 * 1000,
    httpOnly : true,
    sameSite : 'lax'
}

export const refreshTokenOptions : ITokenOptions = {
     // akan expire dalam satuan mili second dikonversi ke hari
    expire : new Date(Date.now() + refreshTokenExpire *3600 * 1000),
    maxAge : refreshTokenExpire * 24 *3600 * 1000,
    httpOnly : true,
    sameSite : 'lax'
}

export const sendToken = (user : IUser, statusCode : number, res : Response)=>{
    const accessToken = user.SignAccessToken()
    const refreshToken = user.SignRefreshToken()


    // kirim token ke database redis berupa cache
    redis.set(user._id, JSON.stringify(user) as any)



    //ketika dideploy ke production

    if(process.env.NODE_ENV === 'production'){
        accessTokenOptions.secure = true
    }

    res.cookie('access_token',accessToken,accessTokenOptions);
    res.cookie('refresh_token',refreshToken,refreshTokenOptions);

    res.status(statusCode).json({
        success : true,
        user,
        accessToken
    })
}