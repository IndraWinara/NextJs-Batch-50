import mongoose, {Document,Model,Schema} from 'mongoose'


//buat interface terlebih dahulu

interface IComment extends Document {
    user : object,
    comment : string,
    commentReplies : IComment[]
}


interface IReview extends Document {
    user : object,
    rating : number,
    comment : string,
    commentReplies : IComment[]
}

interface ILink extends Document {
    title : string,
    url : string,
}

interface ICourseData extends Document {
    title : string,
    description : string,
    videoUrl : string,
    videoThumbnail : object,
    videoSection : string,
    videoLength : number,
    videoPlayer : string,
    links : ILink[],
    suggestion : string,
    questions : IComment[]
}

interface ICourse extends Document {
    name : string,
    description : string,
    price : number,
    estimatedPrice : number,
    thumbnail : object,
    tags : string,
    level : string,
    demoUrl : string,
    benefits : {title : string}[],
    prerequisitites : {title : string}[],
    reviews : IReview[],
    courseData : ICourseData[],
    ratings? : number,
    purchased? : number
}


// Buat schema dan validasi tipe data sesuai interface diatas


const reviewSchema : Schema<IReview> = new mongoose.Schema({
    user : Object,
    rating : {
        type : Number,
        default : 0
    },
    comment : String
})

const linkSchema : Schema<ILink> = new mongoose.Schema({
    title : String,
    url : String
})

const commentSchema : Schema<IComment> = new mongoose.Schema({
    user : Object,
    comment : String,
    commentReplies : [Object]
})

const courseDataSchema : Schema<ICourseData> = new mongoose.Schema({
    title : String,
    description : String,
    videoUrl : String,
    videoThumbnail : Object,
    videoSection : String,
    videoLength : Number,
    videoPlayer : String,
    links : [linkSchema],
    suggestion : String,
    questions : [commentSchema]
})

const courseSchema : Schema<ICourse> = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    estimatedPrice : {
        type : Number
    },
    thumbnail : {
        public_id : {
            required : true,
            type : String
        },
        url : {
            required : true,
            type : String
        },
    },
    tags : {
        required : true,
        type : String
    },
    level : {
        required : true,
        type : String
    },
    demoUrl : {
        required : true,
        type : String
    },
    benefits : [{title : String}],
    prerequisitites : [{title : String}],
    reviews : [reviewSchema],
    courseData : [courseDataSchema],
    ratings : {
        type : Number,
        default : 0
    },
    purchased : {
        type : Number,
        default : 0
    }
})

const courseModel : Model <ICourse> = mongoose.model('Course',courseSchema)

export default courseModel