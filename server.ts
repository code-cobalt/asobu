require('dotenv').config()
const express = require('express')
const app = express()
//GraphQL
const graphqlHTTP = require('express-graphql')
import { execute, subscribe } from 'graphql'
import { createServer } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'
const subscribtionsEndpoint = `ws://localhost:${port}/subscriptions`
//Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//Multer/Cloudinary for Uploads
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
//Moment for Timestamps
const moment = require('moment')
//Port config
const port = process.env.PORT || 3000
//Mongoose for MongoDB queries
const mongoose = require('mongoose')
const schema = require('./server/schema.ts')
const root = require('./server/root.ts')
const { Seeder } = require('mongo-seeding')
//Path for static files
const path = require('path')
const User = require('./server/models/user')
//Bcrypt for hashing
const bcrypt = require('bcrypt')
//formatError for custom graphql resolver errors
import { formatError } from 'apollo-errors'

// setting useFindAndModify to false resolves MongoDB Node.js deprecation warnings from using certain Mongoose methods
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

// **DO NOT DELETE**
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
    graphiql: true,
    subscribtionsEndpoint,
    formatError
  }),
)

app.get('/api/test', (req, res) => {
  // res.sendStatus(200)
})

app.get('/auth', (req, res) => {
  const userObj = req.query
  User.findOne({ email: userObj.email }, (err, result) => {
    if (err) res.send({ err })
    if (!result) res.send({ err: 'Account Not Found' })
    if (result) {
      bcrypt.compare(userObj.password, result.password_hash, (err, valid) => {
        if (err) res.send({ err })
        if (!valid) res.send({ err: 'Invalid Password' })
        if (valid) {
          result.password_hash = null
          console.log(result)
          res.send(result)
        }
      })
    }
  })
})

app.post('/auth', (req, res) => {
  const userObj = req.body
  User.findOne({ email: userObj.email }, (err, result) => {
    if (err) return { err }
    if (result) return { err: 'Email Already Exists' }
    if (!result) {
      userObj.interests = []
      userObj.exp = 0
      userObj.lvl = 1
      userObj.stats = {}
      userObj.stats.funny = 0
      userObj.stats.intellectual = 0
      userObj.stats.fun = 0
      userObj.stats.kind = 0
      userObj.stats.therapeutic = 0
      userObj.stats.interesting = 0
      userObj.chats = []
      userObj.events = []
      bcrypt.hash(userObj.password, 10, (err, hash) => {
        userObj.password_hash = hash
        userObj.password = null
        User.create(userObj).then(document => {
          if (document) {
            document.password_hash = null
            res.send(document)
          } else res.send({ err: 'Database Error' })
        })
      })
    }
  })
})

app.post('/upload', parser.single('image'), (req, res) => {
  interface UploadedImage {
    url: string
    id: string
  }
  const image = <UploadedImage>{
    url: req.file.url,
    id: req.fild.public_id
  }
  res.send(image)
})


//This is the websocket that wraps the server. A websocket is basically a live connection between server and client that are actively
//listening to each other.
const ws = createServer(app)
ws.listen(port, () => {
  console.log(`Listening on ${port}`)
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions'
  })
})

// app.listen(port, () => console.log(`Listening on ${port}`))

export = { db }
