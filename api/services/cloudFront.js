/* eslint-disable space-before-function-paren */
const AWS = require('aws-sdk')
const fs = require('fs')
const {
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY
} = require('../../config/constants')
AWS.config.update({
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY
})
const s3 = new AWS.S3()

var uuid = require('node-uuid')

// Create an S3 client

// Create a bucket and upload something into it
var bucketName = 'node-sdk-sample-' + uuid.v4()
var keyName = 'hello_world.txt'

s3.createBucket({ Bucket: bucketName }, function () {
  var params = { Bucket: bucketName, Key: keyName, Body: 'Hello World!' }
  s3.putObject(params, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      console.log('Successfully uploaded data to ' + bucketName + '/' + keyName)
    }
  })
})
