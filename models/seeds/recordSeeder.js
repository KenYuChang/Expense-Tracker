if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const Record = require('../Record')
const Category = require('../Category')
const User = require('../User')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

const SEED_USER = {
  name: 'Ken',
  email: 'user1@example.com',
  password: '12345678',
}

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', async () => {
  console.log('mongodb connected!')

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(SEED_USER.password, salt)
  const user = await User.create({ name: SEED_USER.name, email: SEED_USER.email, password: hash })
  const userId = user._id
  const categories = await Category.find().lean()

  const length = categories.length * 10
  await Promise.all(
    Array.from({ length }, async (_, i) => {
      await Record.create({
        name: categories[i % 5].name,
        date: Date.now(),
        amount: (i + 1) * 5,
        userId,
        categoryId: categories[i % 5]._id,
      })
    })
  )
  console.log('done.')
  process.exit()
})
