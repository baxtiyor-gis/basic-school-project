const TeacherModel = require('../models/teacherModel')


class TeacherController {
    async getAll(req, res) {
        try {
            const teachers = await TeacherModel.find().sort('-date')
            return res.render('pages/teacher/index', { teachers: teachers, page: 'teachers' })
        } catch (e) {
            console.error(e)
        }
    }


    async updatePage(req, res)  {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: 'Id not reqired' })
            }
            const teacher = await TeacherModel.findById(id)
            return res.render('pages/teacher/update', {teacher})
    
        } catch (e) {
            console.error(e.message)
        }
    }



    async create(req, res) {
        try {
            const { fullName, phone, subject } = req.body
            const teacher = new TeacherModel({
                fullName, phone, subject
            })
            const result = await teacher.save()

            if (result)
                return res.redirect('/dashboard/teachers')

        } catch (e) {
            console.error(e.message)
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const teacher = req.body
            if (!id) {
                return res.status(400).json({ message: 'Id not reqired' })
            }
            const result = await TeacherModel.findByIdAndUpdate(id, teacher, { new: true, runValidators: true })
            if (!result) {
                return res.status(400).json({ message: 'Id not found' })
            }
            return res.redirect('/dashboard/teachers')
        } catch (e) {
            console.error(e.message)
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const result = await TeacherModel.findByIdAndRemove(id)
            if (result)
                return res.redirect('/dashboard/teachers/')

        } catch (e) {
            console.error(e.message)
        }
    }

}

module.exports = new TeacherController()

