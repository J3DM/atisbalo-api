module.exports = (sequelize, DataTypes) => {
  const LocalAsociated = sequelize.define(
    'LocalAsociated',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      deleted: DataTypes.BOOLEAN
    },
    {}
  )
  LocalAsociated.associate = function (models) {
    LocalAsociated.belongsTo(models.Local, {
      foreignKey: 'local_id',
      as: 'local'
    })
    LocalAsociated.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    LocalAsociated.belongsTo(models.Rol, { foreignKey: 'rol_id', as: 'rol' })
  }
  return LocalAsociated
}
