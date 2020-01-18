const Router = require('koa-router')
const passport = require('koa-passport')

const auth = new Router({
  prefix: '/api/auth'
})

auth.post('/signin', passport.authenticate('local', {
  successRedirect: '/api/auth/signin/success',
  failureRedirect: '/api/auth/signin/failure'
}))

auth.get('/signin/success', async ctx => {
  console.log("성공 테스트", ctx.session.passport.user);
  ctx.body = ctx.session.passport.user
})

auth.get('/signin/failure', async ctx => {
  console.log("실패 테스트", ctx.session.passport.user);
  ctx.body = 'failure'
})

module.exports = auth