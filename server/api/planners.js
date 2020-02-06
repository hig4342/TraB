const Router = require('koa-router')
const Models = require('../../models')
const axios = require('axios')
const cheerio = require('cheerio')
const Op = Models.Sequelize.Op
const sequelize = Models.sequelize

const planners = new Router({
  prefix: '/api/planners'
})

planners.get('/domestic', async ctx => {
  const result = await Models.Planner.findAll({
    order: [['createdAt', 'DESC']],
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
    order: [['createdAt', 'DESC']],
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

planners.get('/domestic/hot', async ctx => {
  const result = await Models.Planner.findAll({
    order: [['createdAt', 'DESC']],
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
    }],
    limit: 4
  })

  ctx.body = result
})

planners.get('/foreign/hot', async ctx => {
  const result = await Models.Planner.findAll({
    order: [['createdAt', 'DESC']],
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
    }],
    limit: 4
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

planners.get('/new', async ctx => {
  const result1 = await Models.Planner.findAll({
    order: [['createdAt', 'DESC']],
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
    }],
    limit: 7
  })

  const result2 = await Models.Planner.findAll({
    order: [['createdAt', 'DESC']],
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
    }],
    limit: 7
  })

  const result = {
    domestic: result1,
    foreign: result2
  }

  ctx.body = result
})

planners.get('/metadata', async ctx => {
  const { url } = ctx.request.query
  var metadata;
  if( url ) {
    const html = await axios.get(url)
    const $ = cheerio.load(html.data)
    metadata = {
      title: $("meta[property='og:title']").attr("content"),
      image: $("meta[property='og:image']").attr("content")
    }
  }
  ctx.body = metadata
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
        where: { upload_state: [3, 4, 5] },
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
  const {title, UserId, country_name, city_name, thumbnail, contents, themes_id} = ctx.request.body
  
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
    thumbnail: thumbnail,
    contents: contents,
    themes_id: themes_id,
    blog_name: '',
    blog_link: '',
  })
  ctx.body = result
})

planners.post('/reply', async ctx => {
  const { PlannerId, UserId, content, rate } = ctx.request.body

  const result = await Models.Reply.create({
    PlannerId: PlannerId,
    UserId: UserId,
    content: content,
    rate: rate
  })

  ctx.body = result
})

module.exports = planners