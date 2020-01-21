const Router = require('koa-router')
const Models = require('../../models')

const themes = new Router({
  prefix: '/api/themes'
})

themes.get('/', async ctx => {
  const result = await Models.Theme.findAll()

  ctx.body = result
})

module.exports = themes