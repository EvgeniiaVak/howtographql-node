const {GraphQLServer} = require('graphql-yoga')
const {PrismaClient} = require('@prisma/client')
const {PubSub} = require('graphql-yoga')

const Subscription = require('./resolvers/Subscription')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Vote = require('./resolvers/Vote')

process.env.PORT = 3455
// process.env.PORT = 4000

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
})
const pubsub = new PubSub()

const resolvers = {
  Subscription,
  Query,
  Mutation,
  User,
  Link,
  Vote,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
      pubsub,
    }
  },
})


server.start(() => console.log(`Server is running on http://localhost:${process.env.PORT}`))