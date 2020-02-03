const Router = require('koa-router')
const passport = require('koa-passport')
const jwt = require("jsonwebtoken")
const jwtDecode = require('jwt-decode')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt-nodejs')
const Models = require('../../models')

const auth = new Router({
  prefix: '/api/auth'
})

auth.post('/signin', passport.authenticate('local', {
  successRedirect: '/api/auth/signin/success',
  failureRedirect: '/api/auth/signin/failure'
}))

auth.get('/signout', async ctx => {
  ctx.logout()
  ctx.redirect('/')
})

auth.get('/signin/success', async ctx => {
  const { user } = ctx.session.passport
  const userdata = {
    id: user.id,
    email: user.email,
    name: user.name,
    nickname: user.nickname,
    phone: user.phone,
    birth: user.birth,
    sex: user.sex,
    address_zonecode: user.address_zonecode,
    address_fulladdress: user.address_fulladdress,
    address_detailaddress: user.address_detailaddress,
    profile_image: user.profile_image,
    profile: user.profile,
    account_bank: user.account_bank,
    account_num: user.account_num,
    state_id: user.state_id
  }
  let token = jwt.sign(userdata, 'TraBSecret', {
    expiresIn: '1d'
  })
  ctx.body = token
})

auth.get('/signin/failure', async ctx => {
  console.log("실패 테스트", ctx.session.passport.user)
  ctx.status = 401
  ctx.body = 'failure'
})

auth.post('/signup', async ctx => {
  const { email, password, name, nickname, phone, birth, sex, address_zonecode, address_fulladdress, address_detailaddress} = ctx.request.body
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt)
  const result = await Models.User.create({
    email: email,
    password: hashedPassword,
    salt: salt,
    name: name,
    nickname: nickname,
    phone: phone,
    birth: birth,
    sex: sex,
    address_zonecode: address_zonecode,
    address_fulladdress: address_fulladdress,
    address_detailaddress: address_detailaddress
  })

  let token = jwt.sign({
    email: email
  },
    'TraBSecret',
  {
    expiresIn: '1d'
  })

  let transporter = nodemailer.createTransport({
    service: 'naver',
    host: 'smtp.naver.com',
    port: '465',
    auth: {
      user: 'trab2019@naver.com',
      pass: 't10293847!!'
    }
  })

  const mailHTML = 
      '<p>안녕하세요! TraB 입니다.</p>' +
      '<p>이메일 인증을 하기 위해서</p>' +
      '<p>아래의 링크를 클릭해주세요 !</p>' +
      "<a href='https://trab.co.kr/api/auth/certify?email=" + email + "&token=" + token +"'>인증하기</a>"

  let mailOptions = {
    from: 'trab2019@naver.com',
    to: email,
    subject: '안녕하세요. TraB 이메일 인증입니다.',
    html: mailHTML
  };

  try{
    const sendmail = await transporter.sendMail(mailOptions)
    ctx.body = '회원가입 완료'
  } catch (err) {
    console.log(err)
  } 
})

auth.get('/certify', async ctx => {
  const { email, token } = ctx.query
  const decoded = jwt.verify(token, 'TraBSecret')
  if(decoded) {
    const result = await Models.User.findOne({
      where: {email: email}
    })
    if(result === null) {
      ctx.body = '없음'
      return
    }

    if(result.dataValues.state_id == 1){
      const result2 = await Models.User.update({
        state_id: 2
      }, {
        where: {email: email},
        returning: true
      })
      ctx.redirect('https://trab.co.kr/?auth=success')
    }
  }
})

auth.post('/edit', async ctx => {
  const { id, name, nickname, phone, sex, address_zonecode, address_fulladdress, address_detailaddress, profile_image, profile, account_bank, account_num} = ctx.request.body
  
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
  },{
    where: {id: id}
  })

  const user = await Models.User.findOne({
    where: {id: id}
  })

  const userdata = {
    id: user.dataValues.id,
    email: user.dataValues.email,
    name: user.dataValues.name,
    nickname: user.dataValues.nickname,
    phone: user.dataValues.phone,
    birth: user.dataValues.birth,
    sex: user.dataValues.sex,
    address_zonecode: user.dataValues.address_zonecode,
    address_fulladdress: user.dataValues.address_fulladdress,
    address_detailaddress: user.dataValues.address_detailaddress,
    profile_image: user.dataValues.profile_image,
    profile: user.dataValues.profile,
    account_bank: user.dataValues.account_bank,
    account_num: user.dataValues.account_num,
    state_id: user.dataValues.state_id,
  }

  const token = jwt.sign(userdata, 'TraBSecret', {
    expiresIn: '1d'
  })

  ctx.body = token
})

auth.get('/update', async ctx => {
  const { user } = ctx.state
  if ( user ) {
    const userdb = await Models.User.findOne({
      where: {id: user.id}
    })
    const userdata = {
      id: userdb.dataValues.id,
      email: userdb.dataValues.email,
      name: userdb.dataValues.name,
      nickname: userdb.dataValues.nickname,
      phone: userdb.dataValues.phone,
      birth: userdb.dataValues.birth,
      sex: userdb.dataValues.sex,
      address_zonecode: userdb.dataValues.address_zonecode,
      address_fulladdress: userdb.dataValues.address_fulladdress,
      address_detailaddress: userdb.dataValues.address_detailaddress,
      profile_image: userdb.dataValues.profile_image,
      profile: userdb.dataValues.profile,
      account_bank: userdb.dataValues.account_bank,
      account_num: userdb.dataValues.account_num,
      state_id: userdb.dataValues.state_id,
    }
  
    const token = jwt.sign(userdata, 'TraBSecret', {
      expiresIn: '1d'
    })
    ctx.body = token
  } else {
    ctx.status = 401
    ctx.body = 'failure'
  }
})

module.exports = auth