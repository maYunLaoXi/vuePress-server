const Koa = require('koa')
const cors = require('koa2-cors')
const app = new Koa
const static = require('koa-static')
const path = require('path')
const loginRouter = require('./router/login')
const bodyparser = require('koa-bodyparser')
const static = require('koa-static')
const path = require('path')
const route = require('./routes')


const app = new Koa
const port = 8090

app.use(cors())
app.use(static(
  path.join(__dirname, '../blog/dist')
))
app.use(bodyparser())
app.use(loginRouter.routes())
app.use(route.routes())

app.listen(port, () => {
  console.log(`local successful at ${port}`)
})