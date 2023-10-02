import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
require('dotenv').config()


const emailRegexPattern: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    }
    role: string;
    isVerified: boolean;
    courses: Array<{ courseId: string }>;
    comparePassword: (password: string) => Promise<boolean>;
    SignAccessToken : () => string,
    SignRefreshToken : () => string,
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Your Name']
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email'],
        validate: {
            validator: (email: string) => {
                return emailRegexPattern.test(email)
            },
            message: 'Please Enter the Valid Email'
        },
        unique: true
    },
    password: {
        type: String,
        minlength: [8, 'Password Minimal 8 karakter'],
        select: false
    },
    avatar: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    courses: [
        {
            courseId: String
        }
    ]
}, { timestamps: true });

//hash password agar aman (diencrypt) guys pakai bcrypt

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


// sign access token

userSchema.methods.SignAccessToken = function () {
    return jwt.sign({id : this._id},process.env.ACCESS_TOKEN || '',{
        expiresIn : '5m'
    })
}

// sign refresh token

userSchema.methods.SignRefreshToken = function () {
    return jwt.sign({id : this._id},process.env.REFRESH_TOKEN || '',{
        expiresIn : '3d'
    })
}

//compare password untuk memastikan agar hash password (setelah hash) sesuai inputan password user

userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword,this.password)
}

const userModel : Model<IUser> = mongoose.model('User',userSchema);

export default userModel