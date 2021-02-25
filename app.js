const path = require('path')
const Koa = require('koa')
const cors = require('koa2-cors')
const static = require('koa-static')
const bodyparser = require('koa-bodyparser')
const loginRouter = require('./router/login')
const tententRouter = require('./router/tencent')
const testRouter = require('./router/test')

const app = new Koa
const port = 8090

app.use(cors())
app.use(static(
  path.join(__dirname, '../web/yingyinbiclound-console/dist')
))
app.use(bodyparser())
app.use(loginRouter.routes())
app.use(tententRouter.routes())
app.use(testRouter.routes())

app.listen(port, () => {
  console.log(`local successful at ${port}`)
})