require('dotenv').config()
const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
})
const moment = require('moment')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const schema = require('./server/schema')
const root = require('./server/root')
const { Seeder } = require('mongo-seeding')
const path = require('path')

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.once('open', () => console.log('Connected to DB'))

// const config = {
//   database: process.env.DB_URL,
//   dropDatabase: true
// }

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

app.post('/api/upload', upload.fields([{ name: 'file' }, { name: 'id' }]))

app.post('/upload', (req, res) => {
  cloudinary.uploader.upload(req.files[0], (result, error) => {
    if (error) console.log(error)
    if (result) {
      const url = result.url
    }
    //response.url will contain the upload URL point
  })
})

app.listen(port, () => console.log(`Listening on ${port}`))
