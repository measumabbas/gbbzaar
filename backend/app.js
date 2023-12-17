const express = require('express')
const errorMiddleWare = require('./middlewares/error')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()


app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true
}))
const userRoutes = require('./routes/userRoutes')
const artRoutes = require('./routes/artRoutes')


app.use(express.json())
app.use(cors())
app.use('/api/v1',userRoutes)
app.use('/api/v1',artRoutes)
app.use(errorMiddleWare)


module.exports = app