const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts');

const teacherRouter = require('./routes/teacherRoutes')
const groupRouter = require('./routes/groupRoutes')
const studentRouter = require('./routes/studentRoutes')
const app = express()

mongoose.connect('mongodb://localhost/lumos',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => { console.log('MongoDB ga ulanish hosil qlindi') })
    .catch((e) => { console.error(e) })
    
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use('/css', express.static(path.join(__dirname, "assets/css")))
app.use('/images', express.static(path.join(__dirname, "assets/images")))
app.use('/js', express.static(path.join(__dirname, "assets/js")))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.get('/', (req, res) => { res.redirect('/dashboard/students') })
app.get('/dashboard/', (req, res) => { res.redirect('/dashboard/students') })
app.use('/dashboard/teachers', teacherRouter)
app.use('/dashboard/groups', groupRouter)
app.use('/dashboard/students', studentRouter)


const PORT = process.env.PORT || 2000
app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) })

