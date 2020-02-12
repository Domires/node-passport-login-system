require('dotenv').config()

const express = require('express')
const { connection: db } = require('mongoose')
const path = require('path')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')

const initializeMongoDBconnection = require('./configs/db')
const routes = require('./routes')

const app = express()
require('./configs/auth')

const PORT = 3001

app.set('port', PORT)
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }))
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(routes)

initializeMongoDBconnection()
db.on('connection error', err => console.log(err))
db.once('open', _ => console.log('database connected'))

app.listen(app.get('port'), console.log(`Server running on port ${PORT}`))