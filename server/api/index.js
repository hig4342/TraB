const combineRouters = require('koa-combine-routers')

const auth = require('./auth')

const api = combineRouters(
  auth
)

module.exports = api