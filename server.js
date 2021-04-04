'use strict'

const
  express = require('express')
, app = express()
, session = require('express-session')
, passport = require('passport')
, path = require('path')
, dotenv = require('dotenv')
, port = 8080

dotenv.config({ path: './.env' })

// middleware parsing body request
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// set view engine ejs
app.set('view engine', 'ejs')

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true
  })
)

// middleware passport.js
app.use(passport.initialize())
app.use(passport.session())
require('./middleware/passport')()

// routes
app.use(require('./routes/index'))

app.listen(port, () => {
  console.log('Server running on Port:' + port)
})