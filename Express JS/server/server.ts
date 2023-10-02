import { app } from "./app";
import connectDb from "./utils/db";
import {v2 as cloudinary} from 'cloudinary'
require('dotenv').config();

//connect ke claudinary
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_SECRET_KEY
})

// kita buat servernya oke 

app.listen(process.env.PORT, ()=>{
    console.log(`server jalan di port ${process.env.PORT}`)
    connectDb();
})