const { GraphQLServer } = require('graphql-yoga')


let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => links.find(l => l.id === args.id)
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },

    updateLink: (parent, args) => {
      let link = links.find(l => l.id === args.id)
      if (args.url) {
        link.url = args.url
      }
      if (args.description) {
        link.description = args.description
      }
      return link
    },

    deleteLink: (parent, args) => {
      let linkIndex = links.findIndex(l => l.id === args.id)
      const link = links[linkIndex]
      links.splice(linkIndex, 1)
      return link
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})


server.start(() => console.log(`Server is running on http://localhost:4000`))