const Router = require('@koa/router')

const router = new Router({
  prefix: "/test"
})

router.get('/currentUser', ctx => {
  console.log('currentUser')
  ctx.status = 401
  ctx.body = 'err'
})
module.exports = router