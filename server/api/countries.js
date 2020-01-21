const Router = require('koa-router')
const Models = require('../../models')

const countries = new Router({
  prefix: '/api/countries'
})

countries.get('/', async ctx => {
  const result = await Models.Country.findAll({
    include: [Models.City]
  })

  ctx.body = result
})

countries.get('/:id', async ctx => {
  const { id } = ctx.params

  const result = await Models.City.findAll({
    where: {CountryId: id}
  })
  
  ctx.body = result
})

module.exports = countries