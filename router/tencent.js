const Router = require('@koa/router')
const axios = require('axios')
const url = 'https://api.weixin.qq.com/tencent'
const fCom = require('f-com')

const request = axios.create({
  baseURL: url,
  timeout: 5000
})


const router = new Router({
  prefix: "/tencent"
})

router.get('/cgi-bin/token', async ctx => {
  console.log('get /cgi-bin/token')

  const params = fCom.param2Obj(ctx.request.url)
  console.log(ctx.request.url, params)
  request({
    mehtod: 'GET',
    url: ctx.request.url
  }).then(res => {
    console.log(1)
  }).catch(err => {
    console.log('err', err)
  })
  // console.log(res)
  ctx.body = 222222
})
module.exports = router