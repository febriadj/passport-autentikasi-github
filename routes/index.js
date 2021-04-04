'use strict'

const 
  router = require('express').Router()
, passport = require('passport')

router.get('/', async (req, res, next) => {
  try {
    const details = req.session.passport

    if (!details) {
      return res.status(200).render('index', {
        title: 'Home'
      })
    }

    res.status(200).render('profile', {
      title: details.user.login,
      details: details.user
    })
  }
  catch(err) {
    console.log(err)
  }
})

router.get('/login', (req, res, next) => {
  res.status(200).render('login')
})

router.get('/logout', (req, res, next) => {
  if (!req.session.passport) return res.status(301).redirect('/')

  req.session.destroy(err => {
    res.status(301).redirect('/')
  })
})

/** routing untuk otentikasi @github */
router.get('/auth/github', passport.authenticate('github'),
  (req, res, next) => {
    res.status(301).redirect('/')
  }
)

router.get('/auth/github/callback', passport.authenticate('github', 
  { failureRedirect: '/auth/error' }), 
  (req, res, next) => {
    res.status(301).redirect('/')
  }
)

module.exports = router