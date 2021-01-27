const Router = require('koa-router')
const route = new Router()
const { param2Obj } = require('f-com')

route.get('/img/public', async (ctx) => {
  ctx.body = {
    url: 'public',
    pass: true
  }
  console.log(param2Obj(ctx.originalUrl))
})
module.exports = route
