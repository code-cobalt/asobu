const root = {
    test: () => {
        return 'Test Resolver'
    },

    Users: async () => {
        return 'Users'
    },

    User: async (email) => {
        return 'User'
    }


}

module.exports = root