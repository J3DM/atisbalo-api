const User = require('../models').User
const { Log } = require('../helpers/log')

module.exports = {
  getAllUsers: (req, res) => {
    User.getAllUsers()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  findUserById: (req, res) => {
    User.findUserById(req.user.id)
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  createUser: async (req, res) => {
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    }
    const storedUser = await User.findOneByEmail(newUser.email)
    if (storedUser != null) {
      return res
        .status(409)
        .json(`An user already exists with the email ${newUser.email}`)
    }
    User.create(newUser)
      .then((user) => res.status(200).json(user))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  eraseUser: (req, res) => {
    User.erase(req.user.id)
      .then((res) => {
        res.status(200).json(res)
      })
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  deleteUser: (req, res) => {
    User.remove(req.user.id)
      .then((user) => {
        res.status(200).json(user)
      })
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  updateUser: (req, res) => {
    const updateUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      provider: req.body.provider
    }
    User.updateProfile(updateUser, req.user.id)
      .then((user) => {
        res.status(200).json(user)
      })
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  changeEmailUser: async (req, res) => {
    const updateUser = {
      email: req.body.email,
      verified: false
    }
    const storedUser = await User.findOneByEmail(updateUser.email)
    if (storedUser != null) {
      return res
        .status(409)
        .json(`An user already exists with the email ${updateUser.email}`)
    }
    User.updateProfile(updateUser, req.user.id)
      .then((user) => {
        res.status(200).json(user)
      })
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  changePasswordUser: (req, res) => {
    const updateUser = {
      password: req.body.password,
      verified: false
    }
    if (req.body.verifyPassword !== updateUser.password) {
      return res
        .status(404)
        .json('The provided verify password and password are not equal')
    }
    User.changePassword(updateUser, req.user.id)
      .then((user) => {
        res.status(200).json(user)
      })
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  verifyUser: (req, res) => {
    const updateUser = {
      verified: true
    }
    User.updateProfile(updateUser, req.user.id)
      .then((user) => {
        res.status(200).json(user)
      })
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  }
}
