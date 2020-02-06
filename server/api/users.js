const Router = require('koa-router')
const Models = require('../../models')
const sequelize = Models.sequelize

const users = new Router({
  prefix: '/api/users'
})

users.get('/designer', async ctx => {
  const result = await Models.User.findAll({
    where: { state_id: [4] },
    include: [{
      model: Models.Planner,
      include: [{
        model: Models.Reply
      }]
    }]
  })

  ctx.body = result
})

users.post('/designer/register', async ctx => {
  const { id, name, nickname, phone, sex, address_zonecode, address_fulladdress, address_detailaddress, profile, profile_image, account_bank, account_num} = ctx.request.body
  
  const result = await Models.User.update({
    name: name,
    nickname: nickname,
    phone: phone,
    sex: sex,
    address_zonecode: address_zonecode,
    address_fulladdress: address_fulladdress,
    address_detailaddress: address_detailaddress,
    profile_image: profile_image,
    profile: profile,
    account_bank: account_bank,
    account_num: account_num,
    state_id: 3
  },{
    where: {id: id}
  })

  ctx.body = '변경 성공'
})

users.get('/designer/count', async ctx => {
  const result = await Models.User.findAll({
    where: { state_id: [4, 9999] },
    attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count']]
  })

  const designers = Number(result[0].dataValues.count)
  ctx.body = designers
})

users.get('/:id', async ctx => {
  const { id } = ctx.params
  const result = await Models.User.findOne({
    where: {id: id},
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
  })

  ctx.body = result
})

users.get('/:id/planners', async ctx => {
  const { id } = ctx.params
  
  const result = await Models.User.findOne({
    where: [{id: id}],
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
  })

  ctx.body = result
})
module.exports = users