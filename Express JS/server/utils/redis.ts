import {Redis} from 'ioredis'
require('dotenv').config()

const redisClient = ()=>{
    if(process.env.REDIS_URL){
        console.log('Redis Tersambung')
        return process.env.REDIS_URL
    }

    throw new Error('Redis gagal tersambung')
}

export const redis = new Redis (redisClient())