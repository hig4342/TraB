const Router = require('koa-router')
const Models = require('../../models')
const Op = Models.Sequelize.Op

const boards = new Router({
  prefix: '/api/boards'
})

boards.post('/', async ctx => {
  const {title, content, UserId} = ctx.request.body
  const result = await Models.Board.create({
    title: title,
    content: content,
    UserId: UserId,
    board_state: 3,
    visible: true
  })

  ctx.body = result
})

boards.get('/notices', async ctx => {
  const result = await Models.Board.findAll({
    order: [['id', 'ASC']],
    where: { board_state: 1, visible: true }
  })

  ctx.body = result
})

boards.get('/advertisements', async ctx => {
  const { region } = ctx.query
  const result = await Models.Board.findAll({
    order: [['id', 'ASC']],
    where: {
      board_state: 2,
      visible: true,
      ad_region: region && region !== 1 ? [1, region] : [1, 2, 3],
      ad_deadline: {
        [Op.gte]: new Date()
      }
    }
  })

  ctx.body = result
})

boards.get('/posts', async ctx => {
  const notices = await Models.Board.findAll({
    order: [['id', 'ASC']],
    where: { board_state: 1 }
  })
  const posts = await Models.Board.findAll({
    order: [['id', 'DESC']],
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

boards.put('/:id', async ctx => {
  const { id } = ctx.params
  const { title, content } = ctx.request.body
  const result = await Models.Board.update({
    title: title,
    content: content,
  }, {
    where: {id: id}
  })

  ctx.body = result
})

boards.delete('/:id', async ctx => {
  const { id } = ctx.params

  const result = await Models.Board.destroy({
    where: { id: id }
  })

  ctx.body = result
})

boards.post('/reply', async ctx => {
  const { BoardId, UserId, content } = ctx.request.body

  const result = await Models.BoardReply.create({
    BoardId: BoardId,
    UserId: UserId,
    content: content,
  })

  ctx.body = result
})

boards.patch('/reply/:id', async ctx => {
  const { id } = ctx.params
  const { content } = ctx.request.body

  const result = await Models.BoardReply.update({
    content: content
  }, {
    where: {id: id}
  })
  
  ctx.body = result
})

boards.delete('/reply/:id', async ctx => {
  const { id } = ctx.params

  const result = await Models.BoardReply.destroy({
    where: {id: id}
  })
  
  ctx.body = result
})

module.exports = boards