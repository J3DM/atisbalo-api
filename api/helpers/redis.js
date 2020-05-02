const redis = require('redis')
const { REDIS_TOKEN, REDIS_URL } = require('../../config/constants')
const { Log } = require('../helpers/log')
const redisClient = redis.createClient({
  host: REDIS_URL,
  port: 6379,
  password: REDIS_TOKEN,
  no_ready_check: true
})
redisClient.on('connect', function () {
  Log.debug('Redis client connected')
})
redisClient.on('error', function (err) {
  Log.error('Redis - ' + err)
})

module.exports = {
  addRefreshToken: function (refreshToken, username, accessToken) {
    return new Promise((resolve, reject) => {
      redisClient.HMSET(
        refreshToken,
        { username: username, accessToken: accessToken },
        (err, reply) => {
          if (err) {
            reject(err)
          }
          redisClient.expire(refreshToken, 21600)
          resolve(reply)
        }
      )
    })
  },

  updateRefreshToken: function (refreshToken, accessToken) {
    return new Promise((resolve, reject) => {
      redisClient.hset(
        refreshToken,
        'accessToken',
        accessToken,
        (err, reply) => {
          if (err) {
            reject(err)
          }
          resolve(reply)
        }
      )
    })
  },

  removeRefreshToken: function (refreshToken) {
    return new Promise((resolve, reject) => {
      redisClient.del(refreshToken, (err, reply) => {
        if (err) {
          reject(err)
        }
        resolve(reply)
      })
    })
  },

  existsRefreshToken: function (refreshToken) {
    return new Promise((resolve, reject) => {
      redisClient.exists(refreshToken, (err, exist) => {
        if (err) {
          reject(err)
        }
        resolve(exist)
      })
    })
  }
}
