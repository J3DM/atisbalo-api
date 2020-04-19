const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  jwt.verify(req.get('Authorization'), process.env.SEED_TOKEN, (err, decoded) => {
    if (err) {
      throw new Error('Invalid Token')
    }
    if (!decoded) {
      throw new Error('Error when decoded the token')
    }
    req.user = decoded.user
    next()
  })
}

module.exports = {
  verifyToken
}
