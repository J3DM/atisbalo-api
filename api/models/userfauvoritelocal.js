module.exports = (sequelize, DataTypes) => {
  const UserFavoriteLocal = sequelize.define('UserFavoriteLocal', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    }
  })
  UserFavoriteLocal.associate = function (models) {
    UserFavoriteLocal.belongsTo(models.Local, {
      foreignKey: 'local_id',
      as: 'local'
    })
    UserFavoriteLocal.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    })
  }
  UserFavoriteLocal.getAll = () => {
    return UserFavoriteLocal.findAll()
  }
  UserFavoriteLocal.add = (newFavoriteLocal) => {
    return UserFavoriteLocal.build(newFavoriteLocal).save()
  }
  UserFavoriteLocal.remove = (deleteFavoriteLocal) => {
    return UserFavoriteLocal.destroy({ where: deleteFavoriteLocal })
  }
  UserFavoriteLocal.getUsers = (iuserId) => {
    return UserFavoriteLocal.findAll({
      where: { user_id: iuserId },
      include: [
        { model: sequelize.models.Local, as: 'local', include: [{ model: sequelize.models.Address, as: 'address' }, { model: sequelize.models.Offer, as: 'offers' }] }
      ],
      // attributes: ['local']
      attributes: []
    })
  }
  return UserFavoriteLocal
}
