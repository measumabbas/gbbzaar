const mongoose = require('mongoose')

const artSchema = mongoose.Schema({
    imageUrl: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    description:String,
    publishedDate: {
        type: Date,
        default: Date.now()
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
    
})


module.exports = mongoose.model('Art', artSchema)