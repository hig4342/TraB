const Router = require('koa-router')
const Models = require('../../../models')

const themes = new Router({
  prefix: '/api/admin/themes'
})

themes.get('/', async ctx => {
  const result = await Models.Theme.findAll()

  ctx.body = result
})

themes.get('/:id', async ctx => {
  const { id } = ctx.params

  const result = await Models.Theme.findOne({
    where: {id: id}
  })

  ctx.body = result
})

themes.post('/', async ctx => {
  const { name } = ctx.request.body

  const result = await Models.Theme.create({
    name: name
  })
  
  ctx.body = result
})

themes.patch('/:id', async ctx => {
  const { id } = ctx.params
  const { name } = ctx.request.body

  const result = await Models.Theme.update({
    name: name
  },{
    where: {id: id}
  })
  
  ctx.body = result
})

themes.delete('/:id', async ctx => {
  const { id } = ctx.params
  
  const result = await Models.Theme.destroy({
    where: {id: id}
  })
  
  ctx.body = result
})

module.exports = themes