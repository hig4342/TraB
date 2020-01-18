const combineRouters = require('koa-combine-routers')

const auth = require('./auth')
const planners = require('./planners')

const api = combineRouters(
  auth,
  planners
)

module.exports = api