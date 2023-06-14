const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})
// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 登入驗證
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true,
  })
)

// 註冊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errs = []

  if (!name || !email || !password || !confirmPassword) {
    errs.push({ errMsg: '所有欄位皆為必填' })
  }
  if (password !== confirmPassword) {
    errs.push({ errMsg: '所輸入的密碼不一致' })
  }
  if (errs.length) {
    return res.render('register', {
      errs,
      name,
      email,
      password,
      confirmPassword,
    })
  }

  User.findOne({ email })
    .lean()
    .then((user) => {
      if (user) {
        errs.push({ message: '該帳號已註冊' })
        res.render('register', {
          errs,
          name,
          email,
          password,
          confirmPassword,
        })
      }
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) =>
          User.create({
            name,
            email,
            password: hash,
          })
        )
        .then(() => {
          req.flash('success_msg', '您已註冊成功，請重新登入')
          res.redirect('/users/login')
        })
        .catch((err) => res.render('error', { err }))
    })
    .catch((err) => res.render('error', { err }))
})

// 登出
router.get('/logout', (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err)
    }
    req.flash('success_msg', '您已成功登出')
    res.redirect('/user/login')
  })
})

module.exports = router
