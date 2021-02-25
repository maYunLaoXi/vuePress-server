
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
function param2Obj(url) {
  let str = url.split('?')[1]
  return JSON.parse(
    '{"' +
      str.replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
    '"}'
  )
}
module.exports = {
  handleBodyParser, postData, param2Obj
}