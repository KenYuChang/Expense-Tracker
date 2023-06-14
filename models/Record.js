const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    Default: Date.now,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    require: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    require: true,
  },
})

module.exports = mongoose.model('Record', recordSchema)