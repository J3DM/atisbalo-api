module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      service: DataTypes.STRING,
      attention: DataTypes.STRING,
      veracity: DataTypes.STRING,
      deleted: DataTypes.BOOLEAN
    },
    {}
  )
  Rating.associate = function (models) {
    Rating.belongsTo(models.Local, { foreignKey: 'local_id', as: 'local' })
  }
  return Rating
}
