const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')

// 新增頁面
router.get('/new', async (req, res) => {
  try {
    const categories = await Category.find().lean().sort('_id')
    res.render('new', { categories })
  } catch (err) {
    console.log(err)
  }
})

// 新增支出
router.post('/', async (req, res) => {
  try {
    const newRecord = req.body
    newRecord.userId = req.user._id

    await Record.create(newRecord)
    req.flash('success_msg', '已新增')
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

// 刪除支出
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id

    await Record.findOneAndDelete({ userId, _id })
    req.flash('success_msg', '已刪除')
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

// 修改支出頁面
router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const categories = await Category.find().lean().sort('_id')
    const record = await Record.findOne({ userId, _id }).populate('categoryId').lean()
    const selectedOption = record.categoryId.name
    res.render('edit', { record, categories, selectedOption })
  } catch (err) {
    console.log(err)
  }
})

// 修改支出
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const editedRecord = req.body
    await Record.findOneAndUpdate({ userId, _id }, editedRecord)
    req.flash('message_msg', '已更改')
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
