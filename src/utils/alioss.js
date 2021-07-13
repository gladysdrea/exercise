function uploadFile (file, ossConfig, resultUrl) {
  const OSS = require('ali-oss')
  // 这里是通过接口拿到的这些参数，所以在调用该方法之前，需调用后台接口先拿到这些参数
  // 如果这些参数不是通过后台接口拿到的话，可以从上边介绍的第6条中，找到需要的参数放过来就可以了
  const client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI4GFgAyoUMj96MLGTfoyP',
    accessKeySecret: ossConfig.accessKeySecret,
    bucket: 'gladysdrea-demo'
  })
  async function put () {
    try {
      // 这里加个时间戳，目的是以防有同名的文件被覆盖
      var timestamp = (new Date()).getTime()
      var fileName = ossConfig.path + '/' + timestamp + '/' + file.name
      // 上传到OSS
      const result = await client.put(fileName, file)
      console.log(result)
      console.log('阿里云OSS上传文件接口返回：', result)

      resultUrl(result)
    } catch (e) {
      console.log('阿里云OSS上传文件接口返回错误：', e)
      resultUrl()
    }
  }
  return put()
}
export {
  uploadFile
}
