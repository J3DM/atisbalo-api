const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {
  REFRESH_TOKEN,
  ACCESS_TOKEN,
  EXPIRATION_TOKEN
} = require('../../config/constants')

module.exports = {
  verifyToken: (req, res, next) => {
    jwt.verify(
      req.get('Authorization'),
      process.env.SEED_TOKEN,
      (err, decoded) => {
        if (err) {
          throw new Error('Invalid Token')
        }
        if (!decoded) {
          throw new Error('Error when decoded the token')
        }
        req.user = decoded.user
        next()
      }
    )
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
