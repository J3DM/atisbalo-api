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
    if (payLoad.password) delete payLoad.password
    return jwt.sign({ user: payLoad }, ACCESS_TOKEN, {
      expiresIn: EXPIRATION_TOKEN
    })
  },
  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, ACCESS_TOKEN, function (err, decoded) {
        if (err) reject(err)
        resolve(decoded)
      })
    })
  },
  generateRefreshToken: (payLoad) => {
    return jwt.sign({ user: payLoad }, REFRESH_TOKEN, {
      expiresIn: EXPIRATION_TOKEN
    })
  },
  encrypt: (password) => {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
  }
}
