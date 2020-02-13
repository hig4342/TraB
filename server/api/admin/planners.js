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
    }, {
      model: Models.Rate
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
        }, {
          model: Models.Rate
        }]
      }]
    }, {
      model: Models.Rate
    }]
  })

  ctx.body = result
})

planners.put('/:id', async ctx => {
  const { id } = ctx.params
  const { title, country_name, city_name, thumbnail, contents, themes_id, blog_link } = ctx.request.body

  const checked_country_name = country_name === '대한민국' ? '한국' : country_name
  let result1 = await Models.Country.findOne({
    where: { country_name: checked_country_name }
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
    thumbnail: thumbnail,
    contents: contents,
    themes_id: themes_id,
    blog_link: blog_link
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
  const { upload_state } = ctx.request.body

  const result = await Models.Planner.update({
    upload_state: upload_state
  }, {
    where: {id: id}
  })
  
  ctx.body = result
})

planners.delete('/:id', async ctx => {
  const { id } = ctx.params
  
  const result1 = await Models.Reply.destroy({
    where: {PlannerId: id}
  })
  const result2 = await Models.Rate.destroy({
    where: {PlannerId: id}
  })
  const result3 = await Models.Favorite.destroy({
    where: {PlannerId: id}
  })
  const result4 = await Models.Planner.destroy({
    where: {id: id}
  })
  
  ctx.body = result4
})

module.exports = planners