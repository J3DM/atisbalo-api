module.exports = (sequelize, DataTypes) => {
  const LocalImage = sequelize.define('LocalImage', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    url: DataTypes.STRING,
    local_id: DataTypes.UUID,
    deleted: DataTypes.BOOLEAN
  }, {})
  LocalImage.associate = function (models) {
    // associations can be defined here
  }
  return LocalImage
}
