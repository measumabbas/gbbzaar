const express = require('express')
const { createArt, getSingleArt, deleteArt, getSingleUserArts, updateArtTitle, getAllArts, createArtReview, getArtReviews, orderArt } = require('../controllers/bookController')

const router = express.Router()

router.route('/book/create').post(createArt)
router.route('/book/me').post(getSingleUserArts)
router.route('/book/:id').get(getSingleArt).delete(deleteArt).put(updateArtTitle)
router.route('/books').get(getAllArts)
router.route('/book/reviews/add').post(createArtReview)
router.route('/book/reviews/get').get(getArtReviews)
router.route('/book/order').post(orderArt)
// router.route('/')
module.exports = router