'use strict'

const 
  passport = require('passport')
, GithubStrategy = require('passport-github2').Strategy

module.exports = function() {
  passport.use(new GithubStrategy(
    { 
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/auth/github/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      return done(null, profile)
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user._json)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })
}