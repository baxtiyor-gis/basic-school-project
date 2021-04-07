const express = require('express')
const StudentController = require('../controllers/studentController')
const StyudentModel = require('../models/studentModel')
const GroupModels = require('../models/groupModels')
const studentModel = require('../models/studentModel')
const router = express.Router()

router.get('/add', async (req, res) => {
    const groups = await GroupModels.find()
    res.render('pages/student/add', { groups })
})

router.get('/update/:id', async (req, res) => {
    const groups = await GroupModels.find()
    const student = await studentModel.findById(req.params.id)
    console.log(student)
    res.render('pages/student/update', { student, groups })
})


router.get('/', StudentController.getAll)

router.get('/delete/:id', StudentController.delete)
router.post('/', StudentController.create)
router.put('/update/:id', StudentController.update)


module.exports = router