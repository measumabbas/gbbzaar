const express = require('express')
const { createUser, login, updateUserData, loadUser, verifyEmail, forgotPassword, forgotPasswordTokenVerify, forgetPasswordUpdate, getUser } = require('../controllers/userController')


const router = express.Router()

router.route('/users/new').post(createUser)
router.route('/users/login').post(login)
router.route('/users/update').post(updateUserData)
router.route('/users/me').get(loadUser)
router.route('/users/verify').post(verifyEmail)
router.route('/users/forgot').post(forgotPassword)
router.route('/users/forgot/verify').post(forgotPasswordTokenVerify)
router.route('/users/forgot/update').put(forgetPasswordUpdate)
router.route('/users/get').get(getUser)

module.exports = router