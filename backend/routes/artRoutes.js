const express = require('express')
const { createArt, getSingleArt, deleteArt, getSingleUserArts, updateArtTitle, getAllArts, createArtReview, getArtReviews, orderArt } = require('../controllers/artController')

const router = express.Router()

router.route('/arts/create').post(createArt)
router.route('/arts/me').post(getSingleUserArts)
router.route('/arts/:id').get(getSingleArt).delete(deleteArt).put(updateArtTitle)
router.route('/arts').get(getAllArts)
router.route('/arts/reviews/add').post(createArtReview)
router.route('/arts/reviews/get').get(getArtReviews)
router.route('/arts/order').post(orderArt)
// router.route('/')
module.exports = router