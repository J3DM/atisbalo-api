module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    service: DataTypes.STRING,
    attention: DataTypes.STRING,
    veracity: DataTypes.STRING,
    local_id: DataTypes.UUID,
    deleted: DataTypes.BOOLEAN
  }, {})
  Rating.associate = function (models) {
    // associations can be defined here
  }
  return Rating
}
