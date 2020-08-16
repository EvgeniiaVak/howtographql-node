const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)

  const user = await context.prisma.user.create({ data: { ...args, password } })

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findOne({ where: { email: args.email } })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function post(parent, args, context, info) {
  const userId = getUserId(context)

  return await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    }
  })
}

async function updateLink(parent, args, context) {
  let link = await context.prisma.link.findOne({
    where: {
      id: parseInt(args.id),
    },
  })
  if (link) {
    const updatedLink = await context.prisma.link.update({
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
}

async function deleteLink(parent, args, context) {
  const deletedLink = await context.prisma.link.delete({
    where: {
      id: parseInt(args.id)
    }
  })
  return deletedLink
}

module.exports = {
  signup,
  login,
  post,
  updateLink,
  deleteLink
}