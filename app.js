const Koa = require('koa')
const static = require('koa-static')
const path = require('path')
const route = require('./routes')


const app = new Koa
const port = 80

app.use(static(
  path.join(__dirname, '../blog')
))
app.use(route.routes())

app.listen(port, () => {
  console.log(`local80 successful at ${port}`)
})