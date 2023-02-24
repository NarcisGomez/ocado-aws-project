const { ApolloServer } = require('apollo-server-lambda')
const { typeDefs } = require('./typeDefs.js')
const { resolvers } = require('./resolvers.js')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        endpoint: 'graphql'
    }
})

const graphqlHandler = server.createHandler()

module.exports = { graphqlHandler }