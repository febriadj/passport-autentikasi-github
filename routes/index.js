'use strict'

const 
  router = require('express').Router()
, passport = require('passport')
, request = require('request')

router.get('/', (req, res, next) => {
  res.json(req.session)
})

router.get('/login', (req, res, next) => {
  res.status(200).render('login')
})


/** routing untuk otentikasi @github */
router.get('/auth/github/callback', passport.authenticate('github', {
  failureRedirect: '/auth/error'
}), (req, res, next) => {
  res.redirect('/')
})

module.exports = router