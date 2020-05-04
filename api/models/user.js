var bcrypt = require('bcrypt')

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
      verified: DataTypes.BOOLEAN,
      provider: DataTypes.STRING,
      deleted: DataTypes.BOOLEAN
    },
    {
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync()
          user.password = bcrypt.hashSync(user.password, salt)
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
  User.updateUserById = (id, update) => {
    return User.update(update, {
      returning: true,
      where: { id: id }
    })
  }
  return User
}
