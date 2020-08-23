const Koa = require('koa')
const app = new Koa
const static = require('koa-static')
const path = require('path')

app.use(static(
  path.join(__dirname, '../blog')
))

app.listen(80, () => {
  console.log('aaaaaaaa')
})