const Router = require('koa-router')
const Models = require('../../../models')

const users = new Router({
  prefix: '/api/admin/users'
})

users.get('/', async ctx => {
  const result = await Models.User.findAll()

  ctx.body = result
})

users.get('/count', async ctx => {
  const result = await Models.User.count()

  ctx.body = result
})

users.get('/designer', async ctx => {
  const result = await Models.User.findAll({
    where: {state_id: [3, 4, 5, 9999]}
  })

  ctx.body = result
})

users.get('/designer/count', async ctx => {
  const result = await Models.User.count({
    where: {state_id: [3, 4, 5, 9999]}
  })

  ctx.body = result
})

users.get('/:id', async ctx => {
  const { id } = ctx.params

  const result = await Models.User.findOne({
    where: {id: id}
  })

  ctx.body = result
})

module.exports = users