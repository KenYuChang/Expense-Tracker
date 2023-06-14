if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../Category')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

const CATEGORY = {
  家居: 'fa-solid fa-house',
  交通: 'fa-solid fa-van-shuttle',
  娛樂: 'fa-solid fa-face-grin-beam',
  飲食: 'fa-solid fa-utensils',
  其他: 'fa-solid fa-pen',
}

const category = Object.entries(CATEGORY).map((item) => ({
  name: item[0],
  icon: item[1],
}))

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  Category.create(category).then(() => db.close())

  console.log('done')
})
