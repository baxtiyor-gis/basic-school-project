const express = require('express')
const TeacherController = require('../controllers/teacherController')
const router = express.Router()



router.get('/add', (req, res) => { res.render('pages/teacher/add') })
router.get('/', TeacherController.getAll)
router.get('/update/:id', TeacherController.updatePage)
router.get('/delete/:id', TeacherController.delete)

router.post('/', TeacherController.create)
router.put('/update/:id', TeacherController.update)


module.exports = router