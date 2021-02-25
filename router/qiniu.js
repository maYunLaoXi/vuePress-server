const Router = require('@koa/router')
const qiniu = require('qiniu')
const fCom = require('f-com')
const { param2Obj, handleBodyParser } = require('../uitls')

const { AccessKey: accessKey, SecretKey: secretKey } = require('../account/qiniu')

const router = new Router({
  prefix: "/ying/qiniu"
})

router.get('/upToken', ctx => {
  console.log('get upToken')
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const bucket = 'yinyingbi'
  const options = {
    scope: bucket,
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  ctx.body = uploadToken
})
router.get('/list', async (ctx, next) => {
  console.log('get /list')
  ctx.body = 'success'
})

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
const bucketManager = new qiniu.rs.BucketManager(mac, config);
const bucket = 'yinyingbi'


// 获取指定前缀的文件列表
router.get('/listPrefix', async ctx => {
  let { marker = '', limit = 100 } = param2Obj(ctx.request.url)
  marker = decodeURIComponent(marker)
  // console.log('marker', marker)
  // @param options 列举操作的可选参数
  //                prefix    列举的文件前缀
  //                marker    上一次列举返回的位置标记，作为本次列举的起点信息
  //                limit     每次返回的最大列举文件数量
  //                delimiter 指定目录分隔符
  var options = {
    limit,
    marker,
    prefix: 'public/',
  };
  const { status, data } = await new Promise((resolve, reject) => {
    bucketManager.listPrefix(bucket, options, function(err, respBody, respInfo) {
      if (err) {
        console.log(err);
        throw err;
      }
      if (respInfo.statusCode == 200) {
        //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
        //指定options里面的marker为这个值
        var nextMarker = respBody.marker;
        // console.log('nextMarker', nextMarker);
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
      resolve({ status: respInfo.statusCode, data: respBody })
    });
  })
  ctx.status = status
  ctx.body = data
})

// 删除空间中的文件
router.get('/delete', async ctx => {
  const { key } = fCom.param2Obj(ctx.request.url)

  const { respBody, respInfo } = await new Promise(resolve => {
    bucketManager.delete(bucket, key, function(err, respBody, respInfo) {
      resolve({ respBody, respInfo })
      if (err) {
        console.log(err);
        //throw err;
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
    })
  })
  ctx.body = respBody
  ctx.status = respInfo.statusCode
})

// 跟椐key查看文件信息
router.get('/stat', async ctx => {
  const { key } = fCom.param2Obj(ctx.request.url)
  console.log(key)
  const { status, data } = await new Promise(resolve => {
    bucketManager.stat(bucket, key, (err, respBody, respInfo) => {
      resolve({ status: respInfo.statusCode, data: respBody })
      if (err) {
        console.log(err)
      } else {
        if (respInfo.statusCode == 200) {
          console.log(respBody.hash);
          console.log(respBody.fsize);
          console.log(respBody.mimeType);
          console.log(respBody.putTime);
          console.log(respBody.type);
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody.error);
        }
      }
    })
  })
  ctx.body = data
  ctx.status = status
})
module.exports = router
