const express = require('express')
const GroupController = require('../controllers/groupController')
const TeacherModel = require('../models/teacherModel')
const router = express.Router()

router.get('/add', async (req, res) => {
    const teachers = await TeacherModel.find()
    res.render('pages/group/add',{ teachers})
})


router.get('/update/:id', GroupController.updatePage)
router.get('/', GroupController.getAll)
router.post('/', GroupController.create)
router.put('/update/:id', GroupController.update)
router.get('/delete/:id', GroupController.delete)


module.exports = router