require('dotenv').config()
const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const multer = require('multer')
const cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
})
const cloudinaryStorage = require('multer-storage-cloudinary')
const storage = cloudinaryStorage({
  cloudinary,
  folder: 'demo',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
})
const parser = multer({ storage })
const moment = require('moment')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const schema = require('./server/schema')
const root = require('./server/root')
const { Seeder } = require('mongo-seeding')
const path = require('path')

// setting useFindAndModify to false resolves MongoDB Node.js deprecation warnings from using certain Mongoose warnings
// setting useCreateIndex true to allow unique constraint in user email
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const db = mongoose.connection
db.once('open', () => console.log('Connected to DB'))

// const config = {
//   database: process.env.DB_URL,
//   dropDatabase: true
// }

// NOTE: To avoid overages on our MongoDB/Cloudinary, please refrain from
// seeding, querying, and uploading too often!
// const seeder = new Seeder(config)
// const collections = seeder.readCollectionsFromPath(path.resolve('./data'))

// seeder
//   .import(collections)
//   .then(() => console.log('Successfully seeded database'))
//   .catch(err => console.log('Error seeding database', err))

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
)

app.get('/api/test', (req, res) => {
  // res.sendStatus(200)
})

// import loginUser from './auth'
const loginUser = require('./auth')
app.get('/auth', (req, res) => {
  const userObj = req.query
  loginUser(userObj).then(result => {
    res.send(result)
  })
})

// import registerUser from './auth'
const registerUser = require('./auth')
app.post('/auth', (req, res) => {
  const userObj = req.body
  registerUser(userObj).then(result => {
    res.send(result)
  })
})

app.post('/upload', parser.single('image'), (req, res) => {
  const image = {}
  image.url = req.file.url
  image.id = req.file.public_id
  console.log(image)
})

app.listen(port, () => console.log(`Listening on ${port}`))

module.exports = { db }
