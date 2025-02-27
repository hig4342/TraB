const Router = require('koa-router')
const Models = require('../../../models')

const boards = new Router({
  prefix: '/api/admin/boards'
})

boards.get('/notices', async ctx => {
  const result = await Models.Board.findAll({
    where: { board_state: 1 },
    include: [Models.BoardReply]
  })

  ctx.body = result
})

boards.get('/advertises', async ctx => {
  const result = await Models.Board.findAll({
    where: { board_state: 2 },
    include: [Models.BoardReply]
  })

  ctx.body = result
})

boards.get('/:id', async ctx => {
  const { id } = ctx.params

  const result = await Models.Board.findOne({
    where: { id: id },
    include: [Models.BoardReply]
  })

  ctx.body = result
})

boards.put('/:id', async ctx => {
  const { id } = ctx.params
  const { title, ad_link, banner_image, main_image, content, ad_region, visible, ad_deadline, themes_id } = ctx.request.body

  const result = await Models.Board.update({
    title: title,
    ad_link: ad_link,
    ad_deadline: ad_deadline,
    banner_image: banner_image,
    main_image: main_image,
    content: content,
    ad_region: ad_region,
    visible: visible,
    themes_id: themes_id,
  }, {
    where: { id: id }
  })

  ctx.body = result
})

boards.post('/', async ctx => {
  const { title, ad_link, banner_image, main_image, content, board_state, UserId, ad_deadline, ad_region, visible } = ctx.request.body

  const result = await Models.Board.create({
    UserId: UserId,
    title: title,
    ad_link: ad_link,
    board_state: board_state,
    banner_image: banner_image,
    main_image: main_image,
    content: content,
    visible: visible,
    ad_deadline: ad_deadline,
    ad_region: ad_region,
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

module.exports = boards