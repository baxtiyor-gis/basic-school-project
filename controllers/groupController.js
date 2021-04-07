const GroupModel = require('../models/groupModels')
const TeacherModel = require('../models/teacherModel')

class GroupController {
    async getAll(req, res) {
        try {
            const groups = await GroupModel.find().populate('teacher', 'fullName').sort('-startDate')
            return res.render('pages/group/index', { groups: groups, page: 'groups' })
        } catch (e) {
            console.error(e)
        }
    }
    
    async updatePage(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: 'Id not reqired' })
            }
            const teachers = await TeacherModel.find()
            const group = await GroupModel.findById(id).populate('teacher', '-date -phone -subject')
            return res.render('pages/group/update', { group, teachers })

        } catch (e) {
            console.error(e.message)
        }
    }

    async create(req, res) {
        try {
            const { name, subject, teacher, time, price, date } = req.body
            const group = new GroupModel({
                name, subject, teacher, time, price, date
            })
            const result = await group.save()
            if (result)
                return res.redirect('/dashboard/groups')
        } catch (e) {
            console.error(e.message)
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const teacher = await TeacherModel.findById(req.body.teacher)
            const group = {
                name: req.body.name,
                subject: req.body.subject,
                teacher: teacher._id,
                date: req.body.date,
                time: req.body.time,
                price: req.body.price,
            }

            if (!id) {
                return res.status(400).json({ message: 'Id not reqired' })
            }
            const result = await GroupModel.findByIdAndUpdate(id, group, { new: true, runValidators: true })
            if (!result) {
                return res.status(400).json({ message: 'Id not found' })
            }
            return res.redirect('/dashboard/groups')
        } catch (e) {
            console.error(e.message)
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: 'Id not required' })
            }
            const result = await GroupModel.findByIdAndRemove(id)
            if (result)
                return res.redirect('/dashboard/groups/')

        } catch (e) {
            console.error(e.message)
        }
    }

}

module.exports = new GroupController()

