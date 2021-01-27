const Router = require('@koa/router')
const { user, userInfo } = require('../account/user')
const fCom = require('f-com')

const router = new Router({
  prefix: "/ying/user"
})

router.post('/login', ctx => {
  console.log('require login')
  const body = ctx.request.body
  let data = {}
  for (let i in body) {
    if (i.match(/userName/)) {
      data = i
      break
    }
  }
  if (typeof data === 'string') data = JSON.parse(data)
  if (data.userName === user.userName && data.password === user.passward) {
    console.log('login success')
    ctx.body = userInfo
  }
})
router.get('/get_info', ctx => {
  console.log('getTokey')
  const params = fCom.param2Obj(ctx.request.url)
  if(params && params.token && params.token === 'super_admin') ctx.body = userInfo

})
module.exports = router