async function feed (parent, args, context) {
  const where = args.filter
    ? {
      OR: [
        { description: { contains: args.filter } },
        { url: { contains: args.filter } },
      ],
    }
    : {}

  const links = context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  })

  const count = await context.prisma.link.count({ where })

  return {
    links,
    count,
  }
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