module.exports = (sequelize, DataTypes) => {
  const LocalTag = sequelize.define('LocalTag', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    tag_id: DataTypes.UUID,
    local_id: DataTypes.UUID,
    deleted: DataTypes.BOOLEAN
  }, {})
  LocalTag.associate = function (models) {
    // associations can be defined here
  }
  return LocalTag
}
