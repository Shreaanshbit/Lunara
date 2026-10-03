const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const {
	createSymptomLog,
	getSymptomLogs,
	deleteSymptomLog,
	confirmSymptoms
} = require('../controllers/symptomController')

const router = express.Router()

router.use(authMiddleware)
router.post('/', createSymptomLog)
router.get('/', getSymptomLogs)
router.delete('/:id', deleteSymptomLog)
router.post('/confirm', confirmSymptoms)

module.exports = router