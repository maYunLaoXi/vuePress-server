const Router = require('@koa/router')
const axios = require('axios')
const fCom = require('f-com')
const { handleBodyParser, postData } = require('../uitls')
const url = 'https://api.weixin.qq.com'

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
  const res = await request({
    mehtod: 'GET',
    url: '/cgi-bin/token',
    params
  })
  ctx.body = {
    success: true,
    ...res.data
  }
})
router.post('/tcb/invokecloudfunction', async ctx => {
  console.log('get ', ctx.request.url)
  const params = fCom.param2Obj(ctx.request.url)
  const res = await request({
    method: 'post',
    url: '/tcb/invokecloudfunction',
    data: handleBodyParser(ctx.request.body),
    params
  })
  ctx.body = {
    success: true,
    ...res.data
  }
})
router.post('/tcb/databaseupdate', async ctx => {
  console.log('get', ctx.request.url)
  const params = fCom.param2Obj(ctx.request.url)
  let str = ''
  const data = await postData(ctx)
  console.log(data)
  // const res = await request({
  //   method: 'post',
  //   url: '/tcb/databaseupdate',
  //   data: handleBodyParser(ctx.request.body),
  //   params
  // })
  // ctx.body = res.data
})
module.exports = router