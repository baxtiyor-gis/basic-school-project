const StudentModel = require('../models/studentModel')
const GroupModel = require('../models/groupModels')
const TeacherModel = require('../models/teacherModel')

class StudentController {
    async getAll(req, res) {
        try {
            const students = await StudentModel.find(req.query).populate('group', 'name').sort('-dateOfVisit')
            console.log(req.query);
            return res.render('pages/student/index', { students: students, page: 'students', sort: req.query })
        } catch (e) {
            console.error(e)
        }
    }


    async create(req, res) {
        try {
            const { fullName, dateOfVisit, sourceOfInformation, probableTime, phone, subject, group, status } = req.body
            const student = new StudentModel({
                fullName, dateOfVisit, sourceOfInformation, probableTime, phone, subject, group, status
            })
            const result = await student.save()

            if (result)
                // return res.json({ message: 'succes', data: result })
                return res.redirect('/dashboard/students/')

        } catch (e) {
            console.error(e.message)
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const student = req.body
            console.log(student)
            if (!id) {
                return res.status(400).json({ message: 'Id not reqired' })
            }
            const result = await StudentModel.findByIdAndUpdate(id, student, { new: true, runValidators: true })
            if (!result) {
                return res.status(400).json({ message: 'Id not found' })
            }
            return res.redirect('/dashboard/students')
        } catch (e) {
            console.error(e.message)
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const result = await StudentModel.findByIdAndRemove(id)
            if (result)
                return res.redirect('/dashboard/students/')

        } catch (e) {
            console.error(e.message)
        }
    }

}




module.exports = new StudentController()

