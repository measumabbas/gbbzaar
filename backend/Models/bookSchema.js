const mongoose = require('mongoose')

const artSchema = mongoose.Schema({
    imageUrl: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    description:String,
    author:String,
    language:String,
    condition:{
        type:Number,
        enum:[1,2,3,4,5]
    },
    availability:{
        type:Number,
        enum:[1,2,3]
    },
    category:{
        type:String,
        required:true
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    ratings: {
        type: Number,
        default: 0,
    },
    status:{
        type:String,
        default:"open",
        enum:['open','sold']
    }
    
},{timestamps:true})


module.exports = mongoose.model('Book', artSchema)