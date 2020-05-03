const redis = require('redis')
const { REDIS_URL } = require('../../config/constants')
const { Log } = require('../helpers/log')
const redisClient = redis.createClient({
  host: REDIS_URL,
  port: 6379
})
redisClient.on('connect', function () {
  Log.debug(`Redis client connected ${REDIS_URL}`)
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
            Log.error(err)
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
            Log.error(err)
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
          Log.error(err)
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
          Log.error(err)
          reject(err)
        }
        resolve(exist)
      })
    })
  }
}
