const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const handlebars = require('express-handlebars')
const userRoutes = require('./routes/users')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(userRoutes)

async function start() {
    try {
        await mongoose.connect('mongodb+srv://alexbirvik:1Fg2Gf@cluster0-hnzto.mongodb.net/users', {
            useNewUrlParser: true,
            // useFindAndModify: false,
            // useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log('Server is listening...')
        })
    } catch (e) {
        console.log(e)
    }
}

start()
