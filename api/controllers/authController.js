const Redis = require('../helpers/redis')
const AuthService = require('../services/auth')
const User = require('../models').User

const { Log } = require('../helpers/log')
module.exports = {
  signin: (req, res) => {
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    }
    User.build(newUser)
      .save()
      .then((user) => res.status(200).json(user))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  login: (req, res) => {
    let email, password

    email = req.body.email ? (email = req.body.email) : (email = false)

    password = req.body.password
      ? (password = req.body.password)
      : (password = false)

    if (!password || !email) {
      return res.status(500).json('Email and password required')
    }
    User.findOneByEmail(email)
      .then((user) => {
        if (!user) {
          return res.status(401).json('User not found')
        }
        user = user.dataValues
        if (AuthService.validatePassword(user.password, password)) {
          delete user.password

          const accessToken = AuthService.generateAccessToken(user)
          const refreshToken = AuthService.generateRefreshToken(user.email)

          Redis.addRefreshToken(refreshToken, user.email, accessToken)
            .then((response) => {
              res.status(200).json({
                access_token: accessToken,
                refresh_token: refreshToken
              })
            })
            .catch((err) => {
              res.status(500).json(err)
            })
        } else {
          res.status(401).json('Invalid Password')
        }
      })
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  logout: (req, res) => {
    const refreshToken = req.body.refreshToken
    Redis.existsRefreshToken(refreshToken).then((exists) => {
      if (exists) {
        Redis.removeRefreshToken(refreshToken)
        res.sendStatus(204)
      } else {
        Log.error('The refresh token does not exist')
        res.status(401).send({
          statusCode: 401,
          error: 'Unauthorized',
          message: 'The refresh token does not exist'
        })
      }
    })
  },
  refresh: (req, res) => {
    const refreshToken = req.body.refreshToken

    Redis.existsRefreshToken(refreshToken)
      .then((exists) => {
        if (exists) {
          AuthService.verifyRefreshToken(refreshToken)
            .then((decoded) => {
              const accessToken = AuthService.generateAccessToken(decoded)
              Redis.updateRefreshToken(refreshToken, accessToken)
                .then((r) => {
                  res.status(200).json({
                    access_token: accessToken,
                    refresh_token: refreshToken
                  })
                })
                .catch((err) => {
                  Log.error(err)
                  res.status(500).json(err)
                })
            })
            .catch((err) => {
              Log.error(err)
              res.status(401).json(err)
            })
        } else {
          Log.error('RefreshToken invalid')
          res.status(401).json('RefreshToken invalid')
        }
      })
      .catch((err) => {
        Log.error(err)
        res.status(401).json(err)
      })
  }
}
