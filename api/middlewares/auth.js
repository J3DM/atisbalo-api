const AuthService = require('../services/auth')
const Redis = require('../helpers/redis')

module.exports = {
  verifyToken: (req, res, next) => {
    AuthService.verifyToken(req.get('Authorization'))
      .then(async (decoded) => {
        if (!decoded) {
          return res.status(401).json('Error when decoded the token')
        }
        req.user = decoded.user
        const userLogged = await Redis.existsUserData(req.user.id)
        if (userLogged) {
          next()
        } else {
          return res.status(401).json('User logged out')
        }
      })
      .catch((err) => {
        return res.status(401).json(err)
      })
  },
  verifyTokenParam: (req, res, next) => {
    AuthService.verifyToken(req.params.token)
      .then((decoded) => {
        if (!decoded) {
          return res.status(401).json('Error when decoded the token')
        }
        req.user = decoded.user
        next()
      })
      .catch((err) => {
        return res.status(401).json(err)
      })
  },

  verifyTokenAdmin: (req, res, next) => {
    AuthService.verifyToken(req.get('Authorization'))
      .then((decoded) => {
        if (!decoded) {
          return res.status(401).json('Error when decoded the token')
        }
        if (!decoded.user.provider.name === 'admin') {
          return res.status(401).json('')
        }
        req.user = decoded.user
        next()
      })
      .catch((err) => {
        return res.status(401).json(err)
      })
  }
}
