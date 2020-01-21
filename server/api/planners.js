const Router = require('koa-router')
const Models = require('../../models')
const Op = Models.Sequelize.Op
const sequelize = Models.sequelize

const planners = new Router({
  prefix: '/api/planners'
})

planners.get('/domestic', async ctx => {
  const result = await Models.Planner.findAll({
    where: { 
      upload_state: [3, 4, 5],
      CountryId: 1
    },
    include: [{
      model: Models.City
    }, {
      model: Models.Country
    }, {
      model: Models.Reply
    }, { 
      model: Models.User,
      attributes: ['email', 'nickname']
    }]
  })

  ctx.body = result
})

planners.get('/foreign', async ctx => {
  const result = await Models.Planner.findAll({
    where: { 
      upload_state: [3, 4, 5],
      [Op.not]: { CountryId: 1 }
    },
    include: [{
      model: Models.City
    }, {
      model: Models.Country
    }, {
      model: Models.Reply
    }, { 
      model: Models.User,
      attributes: ['email', 'nickname']
    }]
  })

  ctx.body = result
})

planners.get('/count', async ctx => {
  const domestic = await Models.Planner.findAll({
    where: {
      upload_state: [3, 4, 5],
      CountryId: 1
    },
    attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count']]
  })
  const foreign = await Models.Planner.findAll({
    where: {
      upload_state: [3, 4, 5],
      [Op.not]: { CountryId: 1 }
    },
    attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count']]
  })

  const count = {
    domestic: Number(domestic[0].dataValues.count),
    foreign: Number(foreign[0].dataValues.count)
  }
  ctx.body = count
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
        attributes: ['email', 'nickname', 'profile_image'],
      } 
    }, { 
      model: Models.User,
      attributes: ['email', 'nickname', 'sex', 'profile_image', 'profile'],
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

planners.post('/', async ctx => {
  const {title, UserId, country_name, city_name, contents_image, contents_text} = ctx.request.body
  
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

  const result = await Models.Planner.create({
    title: title,
    UserId: UserId,
    CountryId: CountryId,
    CityId: CityId,
    contents_image: contents_image,
    contents_text: contents_text,
    themes_id: [],
    thumbnail: 1,
    blog_name: '',
    blog_link: '',
  })
  ctx.body = result
})

module.exports = planners