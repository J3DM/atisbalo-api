const jwt = require('jsonwebtoken')

const verifyTokenEmail = (req, res, next) => {
  jwt.verify(req.params.token, process.env.SEED_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Invalid Token',
        err
      })
    }
    if (!decoded) {
      return res.status(400).json({
        message: 'Error when decoded the token'
      })
    }
    req.user = decoded.user
    next()
  })
}

const verifyToken = (req, res, next) => {
  jwt.verify(req.get('Authorization'), process.env.SEED_TOKEN, (err, decoded) => {
    if (err) {
      throw new Error('Invalid Token')
      // return res.status(401).json({
      //   message: 'Invalid Token',
      //   err
      // })
    }
    if (!decoded) {
      throw new Error('Error when decoded the token')
      // return res.status(400).json({
      //   message: 'Error when decoded the token'
      // })
    }
    if (!decoded.client) {
      req.user = decoded.user
      next()
    } else {
      req.user = decoded.user
      req.client = decoded.client
      next()
    }
  })
}
module.exports = {
  verifyToken,
  verifyTokenEmail
}
