async function feed (parent, args, context) {
  return context.prisma.link.findMany()
}

async function link (parent, args, context) {
  return await context.prisma.link.findOne({
    where: {
      id: parseInt(args.id)
    }
  })
}

const info = () => `This is the API of a Hackernews Clone`

module.exports = {
  feed,
  link,
  info
}