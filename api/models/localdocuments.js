'use strict'
module.exports = (sequelize, DataTypes) => {
  const LocalDocuments = sequelize.define('LocalDocuments', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    CIF: DataTypes.STRING,
    local_id: DataTypes.UUID,
    deleted: DataTypes.BOOLEAN
  }, {})
  LocalDocuments.associate = function (models) {
    // associations can be defined here
  }
  return LocalDocuments
}
