'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class LocalActivity extends Model {
    static associate (models) {
      LocalActivity.belongsTo(models.Local, { foreignKey: 'local_id', as: 'local' })
    }
  }
  LocalActivity.init({
    action: DataTypes.STRING,
    user: DataTypes.STRING,
    local_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LocalActivity'
  })
  LocalActivity.list = (localId) => {
    return LocalActivity.findAll({ local_id: localId, deleted: false })
  }
  LocalActivity.create = (activityDoc) => {
    return LocalActivity.build(activityDoc).save()
  }
  LocalActivity.get = (filterDoc, limit, offset) => {
    return LocalActivity.findAndCountAll({ where: filterDoc, limit: limit, offset: offset })
  }
  return LocalActivity
}
