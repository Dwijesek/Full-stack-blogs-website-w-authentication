const express = require('express')
const router = express.Router()
const controllers = require('../controllers/main')

router.get('/', controllers.getAll)

router.post('/', controllers.createOne)

router.post('/:id', controllers.getOne)

router.delete('/:id', controllers.deleteOne)


module.exports = router