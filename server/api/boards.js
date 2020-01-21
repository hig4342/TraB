const Router = require('koa-router')
const Models = require('../../models')

const boards = new Router({
  prefix: '/api/boards'
})

boards.post('/', async ctx => {
  const {title, content, UserId} = ctx.request.body
  const result = await Models.Board.create({
    title: title,
    content: content,
    UserId: UserId,
    board_state: 3
  })

  ctx.body = result
})

boards.get('/notices', async ctx => {
  const result = await Models.Board.findAll({
    where: { board_state: 1 }
  })

  ctx.body = result
})

boards.get('/advertisements', async ctx => {
  const result = await Models.Board.findAll({
    where: { board_state: 2 }
  })

  ctx.body = result
})

boards.get('/posts', async ctx => {
  const notices = await Models.Board.findAll({
    where: { board_state: 1 }
  })
  const posts = await Models.Board.findAll({
    where: { board_state: 3 },
    include: [{
      model: Models.User,
      attributes: ['email', 'nickname', 'profile_image']
    }]
  })

  ctx.body = {
    notices: notices,
    posts: posts
  }
})

boards.get('/:id', async ctx => {
  const { id } = ctx.params
  const result = await Models.Board.findOne({
    where: { id: id },
    include: [{
      model: Models.User,
      attributes: { exclude: ['password', 'salt'] },
    }, {
      model: Models.BoardReply,
      include: [{
        model: Models.User,
        attributes: { exclude: ['password', 'salt'] },
      }]
    }]
  })

  ctx.body = result
})

boards.post('/reply', async ctx => {
  const { BoardId, UserId, content } = ctx.request.body

  const result = await Models.BoardReply.create({
    BoardId: BoardId,
    UserId: UserId,
    content: content
  })

  ctx.body = result
})

module.exports = boards