
function handleBodyParser(obj) {
  if (!obj) return obj
  const keys = Object.keys(obj)
  if (!keys.length) return {}
  return JSON.parse(keys[0])
}
function postData(ctx) {
  return new Promise(resolve => {
    let str = ''
    ctx.req.on('data', (data) => {
        str += data
    })
    ctx.req.addListener('end', () => {
        resolve(str)
    })
  })
}
module.exports = {
  handleBodyParser, postData
}