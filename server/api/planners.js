const Router = require('koa-router')
const passport = require('koa-passport')

const planners = new Router({
  prefix: '/api/planners'
})

planners.get('/count', async ctx => {
  const count = {
    domestic: 7,
    foreign: 5
  }
  ctx.body = count
})

module.exports = planners