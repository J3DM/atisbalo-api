const Redis = require('../helpers/redis')
const AuthService = require('../services/auth')
const { User, Populate } = require('../sequelize')
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
    User.findOne({ where: { email: email }, include: Populate.User.All })
      .then((user) => {
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
            .then((err) => {
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
  logout: (req, res) => {},
  refresh: (req, res) => {}
}
