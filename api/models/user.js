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
        },
        afterBulkUpdate: async (user) => {
          if (user.fields.includes('deleted')) {
            if (user.attributes.deleted) {
              sequelize.models.LocalAsociated.removeUserAssociations(user.where.id)
            } else {
              sequelize.models.LocalAsociated.reactivateUserAssociations(user.where.id)
            }
          }
        }
      }
    }
  )
  User.associate = function (models) {
    User.hasMany(models.Comment, {
      foreignKey: 'user_id',
      onDelete: 'cascade',
      hooks: true,
      as: 'comments'
    })
    User.hasMany(models.UserFavoriteLocal, {
      foreignKey: 'user_id',
      onDelete: 'cascade',
      hooks: true,
      as: 'favoriteLocals'
    })
    User.hasMany(models.LocalAsociated, {
      foreignKey: 'user_id',
      onDelete: 'cascade',
      hooks: true,
      as: 'localsAsociated'
    })
  }
  User.findOneByEmail = (email) => {
    return User.findOne({
      where: { email: email },
      include: ['favoriteLocals', 'localsAsociated']
    })
  }
  User.getAllUsers = () => {
    return User.findAll({
      include: ['favoriteLocals', 'localsAsociated']
    })
  }
  User.findUserById = (id) => {
    return User.findByPk(id, {
      include: ['favoriteLocals', 'localsAsociated'],
      attributes: ['firstName', 'lastName', 'email', 'verified', 'deleted']
    })
  }
  User.create = (newUser) => {
    return User.build(newUser).save()
  }
  User.erase = async (id) => {
    const users = await User.findAll({ where: { id: id } })
    for (const user of users) {
      user.destroy()
    }
    return true
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
  User.recover = (id) => {
    return User.update({ deleted: false }, { where: { id: id } })
  }
  User.updateProfile = (updateData, id) => {
    return User.update(updateData, { where: { id: id } })
  }
  return User
}
