const {GraphQLServer} = require('graphql-yoga')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()
const links = []

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany()
    },
    link: (parent, args) => links.find(l => l.id === args.id)
  },

  Mutation: {
    post: async (parent, args, context) => {
      const link = await context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        }
      })

      return link
    },

    updateLink: async (parent, args, context) => {
      let link = await context.prisma.link.findOne({
        where: {
          id: parseInt(args.id),
        },
      })
      if (link) {
        const updatedLink = await prisma.link.update({
          where: {id: link.id},
          data: {
            url: args.url ? args.url : link.url,
            description: args.description ? args.description : link.description
          },
        })
        return updatedLink
      } else {
        throw Error('Link not found')
      }
    },

    deleteLink: async (parent, args, context) => {
      const deletedLink = await context.prisma.link.delete({
        where: {
          id: parseInt(args.id)
        }
      })
      return deletedLink
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma,
  }
})


server.start(() => console.log(`Server is running on http://localhost:4000`))