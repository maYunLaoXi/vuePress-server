const Koa = require('koa')
const cors = require('koa2-cors')
const app = new Koa
const static = require('koa-static')
const path = require('path')
const loginRouter = require('./router/login')
const bodyparser = require('koa-bodyparser')

app.use(cors())
app.use(static(
  path.join(__dirname, '../blog/dist')
))
app.use(bodyparser())
app.use(loginRouter.routes())
app.listen(8090, () => {
  console.log('aaaaaaaa')
})