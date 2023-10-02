import mongoose from "mongoose";
require('dotenv').config();

const dbUrl :string = process.env.DB_URI || '' ;

//sambungkan ke database mongodb dengan mongoose

const connectDb = async ()=>{

    try {
        await mongoose.connect(dbUrl)
        .then((data : any)=>{
            console.log(`berhasil connect ke mongodb dengan koneksi ${data.connection.host}`)
        })
    } catch (error:any) {
        console.log(error.message);
        setTimeout(connectDb,5000)
    }
   
}

export default connectDb;