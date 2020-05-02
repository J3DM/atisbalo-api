const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {
  REFRESH_TOKEN,
  ACCESS_TOKEN,
  EXPIRATION_TOKEN
} = require('../../config/constants')

module.exports = {
  verifyRefreshToken: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, REFRESH_TOKEN, (err, decoded) => {
        if (err) {
          reject(err)
        }
        if (!decoded) {
          reject(new Error('Error when decoded the token'))
        }
        resolve(decoded)
      })
    })
  },
  validatePassword: (hash, password) => {
    return bcrypt.compareSync(password, hash)
  },
  generateAccessToken: (payLoad) => {
    return jwt.sign({ user: payLoad }, ACCESS_TOKEN, {
      expiresIn: EXPIRATION_TOKEN
    })
  },
  generateRefreshToken: (payLoad) => {
    return jwt.sign({ user: payLoad }, REFRESH_TOKEN, {
      expiresIn: EXPIRATION_TOKEN
    })
  }
}
