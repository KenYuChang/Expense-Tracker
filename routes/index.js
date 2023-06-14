const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const user = require('./modules/user')
const record = require('./modules/record')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use('/record', authenticator, record)
router.use('/user', user)
router.use('/auth', auth)
router.use('/', authenticator, home)
router.use('/', generalErrorHandler)

module.exports = router
