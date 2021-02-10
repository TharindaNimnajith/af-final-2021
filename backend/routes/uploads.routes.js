const express = require('express')
const {upload} = require('../config/uploads.configs')
const UploadsController = require('../controllers/uploads-controller')

const router = express.Router()
router.post('/uploads', upload.single('file'), UploadsController.fileUpload)

module.exports = router
