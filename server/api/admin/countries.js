const Router = require('koa-router')
const Models = require('../../../models')

const countries = new Router({
  prefix: '/api/admin/countries'
})

countries.get('/', async ctx => {
  const result = await Models.Country.findAll({
    include: [{
      model: Models.City
    }]
  })

  ctx.body = result
})

countries.get('/:id', async ctx => {
  const { id } = ctx.params

  const result = await Models.Country.findOne({
    where: {id: id}
  })

  ctx.body = result
})

countries.post('/', async ctx => {
  const { country_name } = ctx.request.body

  const result = await Models.Country.create({
    country_name: country_name
  })
  
  ctx.body = result
})

countries.patch('/:id', async ctx => {
  const { id } = ctx.params
  const { country_name } = ctx.request.body

  const result = await Models.Country.update({
    country_name: country_name
  },{
    where: {id: id}
  })
  
  ctx.body = result
})

countries.delete('/:id', async ctx => {
  const { id } = ctx.params
  
  const result = await Models.Country.destroy({
    where: {id: id}
  })

  ctx.body = result
})

module.exports = countries