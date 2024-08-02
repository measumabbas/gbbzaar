
const mongoose = require('mongoose')

const offerSchema = mongoose.Schema({
    offered_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    offered_to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    offered_by_book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'
    },
    offered_to_book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'
    },
    offered_price:{
        type:String
    },
    status:{
        type:String,
        default:"pending",
        enum:['pending','approved','declined']
    },
    message:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("Offer",offerSchema)