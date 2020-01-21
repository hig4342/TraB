const combineRouters = require('koa-combine-routers')

const boards = require('./boards')
const cities = require('./cities')
const countries = require('./countries')
const planners = require('./planners')
const themes = require('./themes')
const users = require('./users')

const admin = combineRouters(
  boards,
  cities,
  countries,
  planners,
  themes,
  users
)

module.exports = admin