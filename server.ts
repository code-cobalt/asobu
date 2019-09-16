require('dotenv').config()
const express = require('express')
const app = express()
//Port config
const port = process.env.PORT || 3000
//GraphQL
const graphqlHTTP = require('express-graphql')
import { execute, subscribe } from 'graphql'
import { createServer } from 'http'
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
//Mongoose for MongoDB queries
const mongoose = require('mongoose')
const schema = require('./server/schema.ts')
const root = require('./server/root.ts')
const { Seeder } = require('mongo-seeding')
//Path for static files
const path = require('path')
//formatError for custom graphql resolver errors
import { formatError } from 'apollo-errors'
import { client } from 'websocket'
//WebSocket
const server = require('ws').Server

// setting useFindAndModify to false resolves MongoDB Node.js deprecation warnings from using certain Mongoose methods
// setting useCreateIndex true to allow unique constraint in user email
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const db = mongoose.connection
db.once('open', () => console.log('Connected to DB'))

const config = {
  database: process.env.DB_URL,
  dropDatabase: true
}

// **DO NOT DELETE**
// NOTE: To avoid overages on our MongoDB/Cloudinary, please refrain from
// seeding, querying, and uploading too often!
const seeder = new Seeder(config)
const collections = seeder.readCollectionsFromPath(path.resolve('./data'))

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
    formatError
  })
)

app.post('/upload', parser.single('image'), (req, res) => {
  interface UploadedImage {
    url: string
    id: string
  }
  const image = <UploadedImage>{
    url: req.file.url,
    id: req.file.public_id
  }
  res.send(req.file.url)
})

//This is the websocket that wraps the server. A websocket is basically a live connection between server and client that are actively
//listening to each other.
// const WebSocket = require('ws')
// const wss = new WebSocket.Server({ port: 3001 })
const l0 = new RegExp(/l0/)
const m0 = new RegExp(/m0/)
// import User from './server/models/user'

// interface clientList {
//   email: WebSocket
// }

interface Client {
  email: string
  socket: WebSocket
  heartbeat: boolean
}

interface Pair {
  pairList: object
  started: boolean
  finished: boolean
  reviewed: boolean
}

interface Player {
  email: string
  socket: WebSocket
  heartbeat: boolean
  answer: string
  hasAnswered: boolean
}

interface Clients {
  clientList: Object
}

interface ActiveClients {
  clientList: Object
}

class Client {
  constructor(email, socket) {
    this.email = email
    this.socket = socket
    this.heartbeat = true
  }
}

class Player {
  constructor(email, socket) {
    this.email = email
    this.socket = socket
    this.heartbeat = true
    this.answer = ''
    this.hasAnswered = false
  }
}

class Clients {
  constructor() {
    this.clientList = {}
    this.saveClient = this.saveClient.bind(this)
  }
  saveClient(client: Client) {
    this.clientList[client.email] = client
  }
  removeClient(email: string) {
    delete this.clientList[email]
  }
}

class ActiveClients {
  constructor() {
    this.clientList = {}
    this.saveClient = this.saveClient.bind(this)
  }
  saveClient(client: Client) {
    this.clientList[client.email] = client
  }
  removeClient(email: string) {
    delete this.clientList[email]
  }
}

interface QuizGame {
  playerList: object
  validPlayers: Array<string>
  answers: number
}

class QuizGame {
  constructor(validPlayers) {
    this.playerList = {}
    this.validPlayers = validPlayers
    this.answers = 0
    this.addPlayer = this.addPlayer.bind(this)
  }
  addPlayer(client: Client) {
    let player = new Player(client.email, client.socket)
    this.playerList[player.email] = player
  }
}

interface QuizGames {
  gameList: object
}

class QuizGames {
  constructor() {
    this.gameList = {}
    this.addGame = this.addGame.bind(this)
  }
  addGame(game: QuizGame) {
    this.gameList[game.validPlayers[0]] = game
  }
}

const clients = new Clients()
const activeClients = new ActiveClients()
const quizGames = new QuizGames()

const wss = new server({ port: 3001 })
const hangoutSocketServer = new server({ port: 3002 })

wss.on('connection', (ws) => {
  console.log("CONNECTED")
  ws.on('message', (msg) => {
    console.log(msg)
    const message = msg.split(' ')
    //[0] - Login Code, [1] - User Email
    if (message[0] === 'l0') {
      let newClient = new Client(message[1], ws)
      clients.saveClient(newClient)
      const pulseCheck = setInterval(() => {
        if (!newClient.heartbeat) {
          clients.removeClient(newClient.email)
          clearInterval(pulseCheck)
          console.log('DEAD CLIENT REMOVED')
        } else {
          newClient.heartbeat = false
          newClient.socket.send('p0')
          console.log('PINGED CLIENT')
        }
      }, 30000)
    }
    if (message[0] === 'l1') {
      clients.removeClient(message[1])
    }
    if (message[0] === 'p0') {
      console.log('CLIENT PONGED')
      // if (clients.clientList[message[1]]) {
      //   clients.clientList[message[1]].heartbeat = true
      // }
      if (clients.clientList[message[1]]) { clients.clientList[message[1]].heartbeat = true }
    }
    //[0] - Message Code, [1] - Target Email, [2] - Chat ID
    if (message[0] === 'm0') {
      // for (let client in clients.clientList) {
      //   if (client === message[1]) {
      //     clients.clientList[client].socket.send(`m0 ${message[2]}`)
      //   }
      // }
      if (clients.clientList[message[1]]) clients.clientList[message[1]].socket.send(`m0 ${message[2]}`)
    }
    //[0] - Hangout Request Code, [1] - Sender Email, [2] - Target Email
    if (message[0] === 'h0') {
      // for (let client in clients.clientList) {
      //   if (client === message[2]) {
      //     clients.clientList[client].socket.send(`h0 ${message[1]}`)
      //   }
      // }
      if (clients.clientList[message[2]]) clients.clientList[message[2]].socket.send(`h0 ${message[1]}`)
    }
    //[0] - Hangout Accept Code, [1] - Accepting Email, [2] - Target Email
    if (message[0] === 'h1') {
      if (clients.clientList[message[2]]) clients.clientList[message[2]].socket.send(`h1 ${message[1]}`)
    }
    //[0] - Block Code, [1] - Requesting Email, [2] - Target Email, [3] - Chat ID
    if (message[0] === 'b0') {
      // for (let client in clients.clientList) {
      //   if (client === message[2]) {
      //     clients.clientList[client].socket.send(`b0 ${message[1]} ${message[3]}`)
      //   }
      // }
      if (clients.clientList[message[2]]) clients.clientList[message[2]].socket.send(`b0 ${message[1]} ${message[3]}`)
    }
  })
  ws.on('close', (event) => {

  })
})

hangoutSocketServer.on('connection', (ws) => {
  console.log('USER ACTIVE')
  ws.on('message', (msg) => {
    console.log(msg)
    const message = msg.split(' ')
    let newClient = new Client(message[1], ws)
    if (message[0] === 'l0') {
      activeClients.saveClient(newClient)
    }
    if (message[0] === 'l1') {
      activeClients.removeClient(newClient.email)
    }
    if (message[0] === 'match0') {
      //user matched
    }
    if (message[0] === 'match1') {
      //match canceled
    }
    if (message[0] === 'hangout0') {
      //hangout active
    }
    if (message[0] === 'hangout1') {
      //hangout complete
    }
    if (message[0] === 'quizg0') {
      //game quiz joined
      let newPlayer = new Player(newClient.email, newClient.socket)
      let placed = false
      for (let game in quizGames.gameList) {
        if (quizGames.gameList[game].validPlayers.includes(newPlayer.email)) {
          quizGames.gameList[game].playerList.addPlayer(newPlayer)
          placed = true
        }
      }
      if (!placed) {
        let quizGame = new QuizGame([newPlayer.email, message[1]])
        quizGame.addPlayer(newPlayer)
        quizGames.addGame(quizGame)
      }
    }
    if (message[0] === 'quizgm0') {
      //game quiz message received
    }
    if (message[0] === 'quizg1') {
      //game quiz finished
    }
  })
  ws.on('close', (event) => {

  })
})

app.listen(port, () => console.log(`Listening on ${port}`))

export = { db }
