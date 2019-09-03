const mongoose = require('mongoose')
const [User, Event, Message] = [require('./models/user'), require('./models/event'), require('./models/message')]
const { GraphQLDateTime } = require('graphql-iso-date')


const root = {
    test: () => {
        return 'Test Resolver'
    },

    DateTime: GraphQLDateTime,

    Users: () => {
        // User.find({}, (err, val) => {
        //      console.log(val)
        // })
        return User.find()
        // User.find().then((results) => {
        //     return results
        // })
        // console.log(User.collection)
        // console.log(result)
        // return result
    },

    User: async email => {
        return await User.findOne(email)
    },

    Events: args => {
        return Event.find()
    },

    Event: async args => {
        
    }  




}

module.exports = root