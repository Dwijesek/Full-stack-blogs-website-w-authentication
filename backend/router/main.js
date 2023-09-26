const express = require('express')
const router = express.Router()
const controllers = require('../controllers/main')

router.get('/', controllers.getAll)

router.get('/myhome', controllers.getSome)

router.get('/:id', controllers.getOne)

router.post('/', controllers.createOne)

router.patch('/:id', controllers.updateOne)

router.delete('/:id', controllers.deleteOne)


module.exports = router