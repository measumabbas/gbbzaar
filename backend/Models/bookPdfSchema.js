const mongoose = require('mongoose')

const bookPdfSchema = mongoose.Schema({
    title:{
        type:String
    },
    author:{
        type:String
    },
    url:{
        type:String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})



module.exports = mongoose.model('Pdf',bookPdfSchema)