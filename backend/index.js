const app = require('./app')
const dotenv = require('dotenv')
const connectToMongo = require('./config/db')
const cloudinary = require('cloudinary')
dotenv.config({path:'./config/config.env'})

connectToMongo()

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
app.listen(process.env.PORT, ()=>{
    console.log(`App listening to port ${process.env.PORT}`)
})