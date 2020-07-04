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
  addUserData: function (userId, refreshToken, accessToken) {
    return new Promise((resolve, reject) => {
      redisClient.HMSET(
        userId,
        { refreshToken: refreshToken, accessToken: accessToken },
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

  updateUserData: function (userId, refreshToken, accessToken) {
    return new Promise((resolve, reject) => {
      redisClient.hmset(
        userId,
        'refreshToken',
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

  removeUserData: function (userId) {
    return new Promise((resolve, reject) => {
      redisClient.del(userId, (err, reply) => {
        if (err) {
          Log.error(err)
          reject(err)
        }
        console.log(reply)
        resolve(reply)
      })
    })
  },

  existsUserRefreshToken: function (userId, refreshToken) {
    return new Promise((resolve, reject) => {
      redisClient.hget(userId, 'refreshToken', (err, exist) => {
        if (err) {
          Log.error(err)
          reject(err)
        }
        resolve(exist === refreshToken)
      })
    })
  },

  existsUserData: function (userId) {
    return new Promise((resolve, reject) => {
      redisClient.exists(userId, (err, exist) => {
        if (err) {
          Log.error(err)
          reject(err)
        }
        resolve(exist)
      })
    })
  }
}
