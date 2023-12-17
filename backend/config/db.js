const mongoose = require('mongoose')

const connectToMongo = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('MongoDB connected successfully')

    }).catch((err)=>{
        console.log(err)
    })
}


module.exports = connectToMongo