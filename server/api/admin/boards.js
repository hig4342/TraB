const Router = require('koa-router')
const Models = require('../../../models')

const cities = new Router({
  prefix: '/api/cities'
})

cities.get('/', async ctx => {
  const result = await Models.City.findAll({
    include: [Models.Country]
  })

  ctx.body = result
})

cities.get('/:id', async ctx => {
  const { id } = ctx.params

  const result = await Models.City.findAll({
    where: {CountryId: id}
  })

  ctx.body = result
})

module.exports = cities