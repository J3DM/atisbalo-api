module.exports = (sequelize, DataTypes) => {
  const LocalImage = sequelize.define(
    'LocalImage',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      url: DataTypes.STRING,
      deleted: DataTypes.BOOLEAN
    },
    {}
  )
  LocalImage.associate = function (models) {
    LocalImage.belongsTo(models.Local, { foreignKey: 'local_id', as: 'local' })
  }
  return LocalImage
}
