const User = require('../models/User')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const facebookStrategy = require('passport-facebook').Strategy

module.exports = (app) => {
  // passport初始化
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(
    new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email })
        if (!user) return done(null, false, req.flash('error_msg', '使用者不存在'))

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
          return done(null, false, req.flash('error_msg', '密碼不正確'))
        }
        return done(null, user)
      } catch (err) {
        done(err, false)
      }
    })
  )

  passport.use(
    new facebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { name, email } = profile._json
          let user = await User.findOne({ email })
          if (user) return done(null, user)
          const randomPassword = Math.random().toString(36).slice(-8)
          const salt = await bcrypt.genSalt(10)
          const hash = await bcrypt.hash(randomPassword, salt)
          user = await User.create({ name, email, password: hash })
          done(null, user)
        } catch (err) {
          done(err, false)
        }
      }
    )
  )

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      done(null, user)
    } catch (err) {
      done(err, null)
    }
  })
}
