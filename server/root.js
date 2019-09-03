const mongoose = require('mongoose')
const [User, Event, Message] = [require('./models/user'), require('./models/event'), require('./models/message')]



const root = {
    test: () => {
        return 'Test Resolver'
    },

    Users: () => {
        User.find({}, (err, val) => {
             console.log(val)
        })
        // User.find().then((results) => {
        //     return results
        // })
        // console.log(User.collection)
        // console.log(result)
        // return result
    },

    User: (email) => {
        const result = User.find({ email })
        return result
    }


}

module.exports = root