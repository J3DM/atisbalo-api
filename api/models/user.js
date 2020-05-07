const AuthService = require('../services/auth')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      verified: { type: DataTypes.BOOLEAN, defaultValue: false },
      provider: DataTypes.STRING,
      deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          user.password = AuthService.encrypt(user.password)
        },
        afterCreate: (user) => {
          // TODO send email for verification
        }
      }
    }
  )
  User.associate = function (models) {
    User.hasMany(models.Comment, {
      foreignKey: 'user_id',
      onDelete: 'cascade',
      as: 'comments'
    })
    User.hasMany(models.UserFauvoriteLocal, {
      foreignKey: 'user_id',
      onDelete: 'cascade',
      as: 'fauvoriteLocals'
    })
    User.hasMany(models.LocalAsociated, {
      foreignKey: 'user_id',
      onDelete: 'cascade',
      as: 'localsAsociated'
    })
  }
  User.findOneByEmail = (email) => {
    return User.findOne({
      where: { email: email },
      include: ['fauvoriteLocals', 'localsAsociated']
    })
  }
  User.getAllUsers = () => {
    return User.findAll({
      include: ['fauvoriteLocals', 'localsAsociated']
    })
  }
  User.findUserById = (id) => {
    return User.findByPk(id, {
      include: ['fauvoriteLocals', 'localsAsociated']
    })
  }
  User.create = (newUser) => {
    return User.build(newUser).save()
  }
  User.erase = (id) => {
    return User.destroy({
      where: {
        id: id
      }
    })
  }
  User.remove = (id) => {
    return User.update({ deleted: true }, { where: { id: id } })
  }
  User.changePassword = (userData, id) => {
    userData.password = AuthService.encrypt(userData.password)
    return User.update(userData, { where: { id: id } })
  }
  User.updateUserById = (id, update) => {
    return User.update(update, {
      where: { id: id }
    })
  }
  return User
}
