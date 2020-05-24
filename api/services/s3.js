const AWS = require('aws-sdk')
const {
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  S3_BUCKET,
  CLOUDFRONT_URL
} = require('../../config/constants')

const s3 = new AWS.S3({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY
})

const uploadFile = (localId, fileName, file) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: S3_BUCKET,
      Key: `files/${localId}/${fileName}`,
      Body: file
    }
    s3.upload(params, function (err, data) {
      if (err) {
        reject(err)
      }
      data.url = `${CLOUDFRONT_URL}/${localId}/${fileName}`
      resolve(data)
    })
  })
}
const uploadImage = (localId, imageName, image) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: S3_BUCKET,
      Key: `images/${localId}/${imageName}`,
      Body: image
    }
    s3.upload(params, function (err, data) {
      if (err) {
        reject(err)
      }
      data.url = `${CLOUDFRONT_URL}/${localId}/${imageName}`
      resolve(data)
    })
  })
}

module.exports = {
  uploadFile,
  uploadImage
}
