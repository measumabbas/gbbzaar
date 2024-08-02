const express = require('express')
const { createBook } = require('../controllers/bookPdfController')

const router = express.Router()

// router.route('/pdf/create').post(createBook)


module.exports = router