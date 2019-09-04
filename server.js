require('dotenv').config()
const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const schema = require('./server/schema')
const root = require('./server/root')
const { Seeder } = require('mongo-seeding')
const path = require('path')

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.once('open', () => console.log('Connected to DB'))

const config = {
  database: process.env.DB_URL,
  dropDatabase: true
}

const seeder = new Seeder(config)
const collections = seeder.readCollectionsFromPath(path.resolve('./data'))

seeder
  .import(collections)
  .then(() => console.log('Successfully seeded database'))
  .catch(err => console.log('Error seeding database', err))

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

app.listen(port, () => console.log(`Listening on ${port}`))
