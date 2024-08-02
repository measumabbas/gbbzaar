const express = require('express')
const { createOffer, getAllOffers, acceptOffer, declineOffer } = require('../controllers/offersController')
const router = express.Router()

router.route('/offer/create').post(createOffer)
router.route('/offer/get/:id').get(getAllOffers)
router.route('/offer/accept').post(acceptOffer)
router.route('/offer/decline').post(declineOffer)



module.exports = router