module.exports = (sequelize, DataTypes) => {
  const UserFauvoriteLocal = sequelize.define(
    'UserFauvoriteLocal',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      }
    },
    {}
  )
  UserFauvoriteLocal.associate = function (models) {
    UserFauvoriteLocal.belongsTo(models.Local, {
      foreignKey: 'local_id',
      as: 'local'
    })
    UserFauvoriteLocal.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    })
  }
  return UserFauvoriteLocal
}
