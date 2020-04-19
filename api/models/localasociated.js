'use strict'
module.exports = (sequelize, DataTypes) => {
  const LocalAsociated = sequelize.define('LocalAsociated', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: DataTypes.UUID,
    local_id: DataTypes.UUID,
    rol_id: DataTypes.UUID,
    deleted: DataTypes.BOOLEAN
  }, {})
  LocalAsociated.associate = function (models) {
    // associations can be defined here
  }
  return LocalAsociated
}
