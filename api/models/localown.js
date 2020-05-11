module.exports = (sequelize, DataTypes) => {
  const LocalOwn = sequelize.define(
    'LocalOwn',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      credits: DataTypes.INTEGER,
      deleted: DataTypes.BOOLEAN
    },
    {}
  )
  LocalOwn.associate = function (models) {
    LocalOwn.belongsTo(models.Local, { foreignKey: 'local_id', as: 'local' })
  }
  return LocalOwn
}
