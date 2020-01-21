const Router = require('koa-router')
const Models = require('../../../models')

const cities = new Router({
  prefix: '/api/admin/cities'
})

cities.get('/', async ctx => {
  const result = await Models.City.findAll({
    include: [{
      model: Models.Country
    }, {
      model: Models.Planner
    }]
  })

  ctx.body = result
})

cities.get('/:id', async ctx => {
  const { id } = ctx.params

  const result = await Models.City.findOne({
    where: {id: id},
    include: [Models.Country]
  })

  ctx.body = result
})

cities.post('/', async ctx => {
  const { country_name, city_name } = ctx.request.body

  let result1 = await Models.Country.findOne({
    where: { country_name: country_name }
  })
  if (result1 === null ) {
    result1 = await Models.Country.create({
      country_name: country_name
    })
  }
  const CountryId = result1.dataValues.id

  const result2 = await Models.City.create({
    CountryId: CountryId,
    city_name: city_name
  })
  
  ctx.body = result2
})

cities.patch('/:id', async ctx => {
  const { id } = ctx.params
  const { country_name, city_name } = ctx.request.body

  let result1 = await Models.Country.findOne({
    where: { country_name: country_name }
  })
  if (result1 === null ) {
    result1 = await Models.Country.create({
      country_name: country_name
    })
  }
  const CountryId = result1.dataValues.id

  const result2 = await Models.City.update({
    CountryId: CountryId,
    city_name: city_name
  })
  
  ctx.body = result2
})

cities.delete('/:id', async ctx => {
  const { id } = ctx.params
  
  const result = await Models.City.destroy({
    where: {id: id}
  })

  ctx.body = result
})

module.exports = cities