const axios = require('axios')

const request = axios.create({
  baseURL: 'http://111.231.86.179:8296',
  timeout: 1000
})
async function asy() {
  request({
    url: '/spinms/sysConfig/getCodeParam',
    method: 'POST'
  }).then(res => {
    console.log(res)
  }).catch(err => {{
    console.log(err)
  }})
}

function promise () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('successed')
    }, 1000)
  })
}

asy()