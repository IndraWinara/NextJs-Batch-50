import { Request, Response, NextFunction } from 'express'
import userModel, { IUser } from '../models/user.model'
import ErrorHandler from '../utils/ErrorHandler'
import { CatchAsyncError } from '../middleware/catchAsyncErrors'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import ejs from 'ejs'
import path from 'path'
import sendMail from '../utils/sendMail'
import { accessTokenOptions, refreshTokenOptions, sendToken } from '../utils/jwt'
import { redis } from '../utils/redis'
import { getUserId } from '../services/user.service'
import cloudinary from 'cloudinary'
require('dotenv').config()


// interface Registration

interface IRegistrationBody {
    name: string,
    email: string,
    password: string,
    avatar?: string
}



//Fungsi Register User 

export const registrationUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const isEmailExist = await userModel.findOne({ email })
        if (isEmailExist) {
            return next(new ErrorHandler('Email Sudah Terdaftar', 400))
        }
        const user: IRegistrationBody = {
            name,
            email,
            password
        }
        const activationToken = createActivationToken(user)
        const activationCode = activationToken.activationCode
        const data = { user: { name: user.name }, activationCode }
        const html = await ejs.renderFile(path.join(__dirname, '../mails/activation-email.ejs'), data)

        try {
            await sendMail({
                email: user.email,
                subject: 'Aktivasi Akun Anda',
                template: 'activation-email.ejs',
                data,
            })

            res.status(201).json({
                success: true,
                message: `silahkan cek email anda : ${user.email} untuk aktivasi akun `,
                activationToken: activationToken.token
            })
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400))
        }

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }

})

// interface jwttoken

interface IActivationToken {
    token: string,
    activationCode: string
}

//mengenkripsi data ke jwt token
export const createActivationToken = (user: any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign({ user, activationCode }, process.env.ACTIVATION_SECRET as Secret, { expiresIn: '5m' })
    return { activationCode, token }
}


// interface aktivasi user

interface IActivationRequest {
    activation_token: string,
    activation_code: string
}

export const activationUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        //destruturing dari request body
        const { activation_code, activation_token } = req.body as IActivationRequest

        //verifikasi apakah inputan user activation_token sesuai dengan jwt token
        const newUser: { user: IUser, activationCode: string } = jwt.verify(
            activation_token, process.env.ACTIVATION_SECRET as string
        ) as { user: IUser, activationCode: string }

        if (newUser.activationCode !== activation_code) {
            return next(new ErrorHandler('Aktivasi Kode Anda Salah', 400))
        }

        const { name, email, password } = newUser.user

        const isUserExist = await userModel.findOne({ email })

        if (isUserExist) {
            return next(new ErrorHandler('User Telah Teraktivasi', 400))
        }

        const user = await userModel.create({
            name,
            email,
            password
        })

        res.status(200).json({
            success: true
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }

})



// Interface Login User
interface ILoginBody {
    email: string,
    password: string
}

// Fungsi login User

export const loginUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email, password } = req.body as ILoginBody

        if (!email && !password) {
            return next(new ErrorHandler('tolong masukan email dan password anda', 400))
        }

        // cek email dan password di database

        const user = await userModel.findOne({ email }).select('+password')

        if (!user) {
            return next(new ErrorHandler('email atau password anda salah', 400))
        }

        const isPasswordMatch = await user.comparePassword(password)

        if (!isPasswordMatch) {
            return next(new ErrorHandler('email atau password anda salah', 400))
        }

        sendToken(user, 200, res)

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }

})


//Fungsi Logout User

export const logoutUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie('access_token', "", { maxAge: 1 })
        res.cookie('refresh_token', "", { maxAge: 1 })
        const userId = req.user?._id
        redis.del(userId)
        res.status(200).json({
            success: true,
            message: 'berhasil logout'
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})


// fungsi update access token

export const updateAccessToken = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        //ambil refresh_token di cookies
        const refresh_token = req.cookies.refresh_token as string

        //validasi sign token dengan secret env
        const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload
        const message = 'tidak bisa melakukan refresh token'
        if (!decoded) {
            return next(new ErrorHandler(message, 400))
        }

        //ambil id dari redis dan validasi session

        const session = await redis.get(decoded.id as string)

        if (!session) {
            return next(new ErrorHandler(message, 400))
        }

        //setelah semua validasi complete kita sign baru access token dari jwt

        const user = JSON.parse(session)

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN as string, {
            expiresIn: '5m'
        })

        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN as string, {
            expiresIn: '3d'
        })

        //Update terbaru perubahan access dan refresh token untuk keamanan hak akses
        req.user = user
        res.cookie('access_token', accessToken, accessTokenOptions)
        res.cookie('refresh_token', refreshToken, refreshTokenOptions)

        res.status(200).json({
            success: true,
            accessToken
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})


// Fungsi ambil informasi user

export const getUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {


    try {
        const user = req.user?._id
        getUserId(user, res)

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// interface socialAuth

interface ISocialAuthBody {
    email: string,
    name: string,
    avatar?: string
}


// Fungsi social auth (github,google,facebook,etc...) kita hanya terima responce dari nextjs authentication

export const socialAuth = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email, name, avatar } = req.body as ISocialAuthBody
        const user = await userModel.findOne({ email })
        if (!user) {
            const newUser = await userModel.create({
                email, name, avatar
            })
            sendToken(newUser, 200, res)
        } else {
            sendToken(user, 200, res)
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }

})


// interface updateUserInfo

interface IUpdateUser {
    name: string,
    email: string
}

// Fungsi update informasi user

export const updateUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email } = req.body as IUpdateUser
        const userId = req.user?._id
        const user = await userModel.findById(userId)
        if (email && user) {
            const isEmailExist = await userModel.findOne({ email })
            if (isEmailExist) {
                return next(new ErrorHandler('Email Telah Terdaftar', 400))
            } else {
                user.email = email
            }
        }

        if (name && user) {
            user.name = name
        }

        await user?.save()

        await redis.set(userId, JSON.stringify(user))

        res.status(201).json({
            success: true,
            user
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

//interface update password

interface IUpdatePassword {
    oldPassword: string,
    newPassword: string
}

export const updatePassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { oldPassword, newPassword } = req.body as IUpdatePassword
        const user = await userModel.findById(req.user?._id).select("+password")
        if (user?.password === undefined) {
            return next(new ErrorHandler('Akun Anda Belum Terdaftar', 400))
        }

        const isPasswordMatch = await user?.comparePassword(oldPassword)

        if (!isPasswordMatch) {
            return next(new ErrorHandler('Password yang anda masukan salah', 400))
        }

        user.password = newPassword;

        await user.save();

        await redis.set(req.user?._id, JSON.stringify(user));
        res.status(200).json({
            success: true,
            user
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// interface update avatar

interface IUpdateAvatar {
    avatar: string
}

export const updateAvatar = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { avatar } = req.body as IUpdateAvatar
        const userId = req.user?._id
        const user = await userModel.findById(userId)

        if (user && avatar) {
            // kode if akan berjalan ketika sudah ada file avatar
            if (user?.avatar?.public_id) {
                // mengupdate file sebelumnya dangen yang baru
                await cloudinary.v2.uploader.destroy(user?.avatar?.public_id)
            } else {
                const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 150
                });
                user.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }
        }

        await user?.save();
        await redis.set(userId,JSON.stringify(user))

        res.status(200).json({
            success : true,
            user
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }


})