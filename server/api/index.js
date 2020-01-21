const combineRouters = require('koa-combine-routers')

const auth = require('./auth')
const boards = require('./boards')
const cities = require('./cities')
const countries = require('./countries')
const file = require('./file')
const planners = require('./planners')
const themes = require('./themes')
const users = require('./users')

const api = combineRouters(
  auth,
  boards,
  cities,
  countries,
  file,
  planners,
  themes,
  users
)

module.exports = api