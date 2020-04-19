module.exports = (sequelize, DataTypes) => {
  const LocalType = sequelize.define('LocalType', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {})
  LocalType.associate = function (models) {
    // associations can be defined here

  }
  return LocalType
}
