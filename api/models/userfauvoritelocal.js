module.exports = (sequelize, DataTypes) => {
  const UserFavouriteLocal = sequelize.define('UserFauvoriteLocal', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    }
  })
  UserFavouriteLocal.associate = function (models) {
    UserFavouriteLocal.belongsTo(models.Local, {
      foreignKey: 'local_id',
      as: 'local'
    })
    UserFavouriteLocal.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    })
  }
  UserFavouriteLocal.getAll = () => {
    return UserFavouriteLocal.findAll()
  }
  UserFavouriteLocal.add = (newFavouriteLocal) => {
    return UserFavouriteLocal.build(newFavouriteLocal).save()
  }
  UserFavouriteLocal.remove = (deleteFavouriteLocal) => {
    return UserFavouriteLocal.destroy({ where: deleteFavouriteLocal })
  }
  UserFavouriteLocal.getUsers = (iuserId) => {
    return UserFavouriteLocal.findAll({
      where: { user_id: iuserId },
      include: ['local']
    })
  }
  return UserFavouriteLocal
}
