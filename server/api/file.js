const Router = require('koa-router')
const AWS = require('aws-sdk')
const multer = require('koa-multer');
const multerS3 = require('multer-s3')
const path = require('path')
const moment = require('moment')

const file = new Router({
  prefix: '/api/file'
})

const s3 = new AWS.S3({
  accessKeyId : 'AKIAUWP6QV75SESHXYUC',
  secretAccessKey : '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',
  region : 'ap-northeast-2'
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'trab2019',
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, {fieldName: file.fieldname}); // 파일 메타정보를 저장합니다.
    },
    key: (req, file, cb) => {
      const dateString = moment().format('YYYYMMDDHHmmss')
      cb(null, `TraB/${dateString}_${path.basename(file.originalname)}`)
    }
  }),
  limits: {fileSize : 10 * 1024 * 1024}
})

file.post('/upload', upload.single('image'), async ctx => {
  try {
    //console.log("req.file: ", ctx.req.file);
    ctx.body = ctx.req.file.location
  } catch (err) {
    ctx.status = 500
    ctx.body = '서버 에러'
  }
})

module.exports = file