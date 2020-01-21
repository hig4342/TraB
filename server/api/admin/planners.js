const Router = require('koa-router')
const Models = require('../../../models')

const planners = new Router({
  prefix: '/api/admin/planners'
})

planners.get('/', async ctx => {
  const result = await Models.Planner.findAll({
    include: [{
      model: Models.City
    }, {
      model: Models.Country
    }, {
      model: Models.Reply
    }, { 
      model: Models.User,
      attributes: { exclude: ['password', 'salt'] },
    }]
  })

  ctx.body = result
})

planners.get('/:id', async ctx => {
  const { id } = ctx.params

  const result = await Models.Planner.findOne({
    where: { 
      id: id
    },
    include: [{
      model: Models.City
    }, {
      model: Models.Country
    }, {
      model: Models.Reply,
      include: {
        model: Models.User,
        attributes: { exclude: ['password', 'salt'] },
      } 
    }, { 
      model: Models.User,
      attributes: { exclude: ['password', 'salt'] },
      include: [{
        model: Models.Planner,
        include: [{
          model: Models.City
        }, {
          model: Models.Country
        }, {
          model: Models.Reply
        }]
      }]
    }]
  })

  ctx.body = result
})

planners.put('/:id', async ctx => {
  const { id } = ctx.params
  const { title, country_name, city_name, contents_image, contents_text, themes_id } = ctx.request.body

  let result1 = await Models.Country.findOne({
    where: { country_name: country_name }
  })
  if (result1 === null ) {
    result1 = await Models.Country.create({
      country_name: country_name
    })
  }
  const CountryId = result1.dataValues.id

  let result2 = await Models.City.findOne({
    where: { city_name: city_name }
  })
  if (result2 === null ) {
    result2 = await Models.City.create({
      CountryId: CountryId,
      city_name: city_name
    })
  }
  const CityId = result2.dataValues.id

  const result = await Models.Planner.update({
    title: title,
    CountryId: CountryId,
    CityId: CityId,
    contents_image: contents_image,
    contents_image: contents_text,
    themes_id: themes_id
  }, {
    where: { id: id }
  })
  
  ctx.body = result
})

planners.patch('/:id/payment', async ctx => {
  const { id } = ctx.params
  const { payment_state } = ctx.request.body

  const result = await Models.Planner.update({
    payment_state: payment_state
  }, {
    where: {id: id}
  })
  
  ctx.body = result
})

planners.patch('/:id/state', async ctx => {
  const { id } = ctx.params
  const { state_id } = ctx.request.body

  const result = await Models.Planner.update({
    state_id: state_id
  }, {
    where: {id: id}
  })
  
  ctx.body = result
})

planners.delete('/:id', async ctx => {
  const { id } = ctx.params
  
  const result = await Models.Planner.destroy({
    where: {id: id}
  })
  
  ctx.body = result
})

module.exports = planners