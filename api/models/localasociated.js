const { Log } = require('../helpers/log')
const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const LocalAsociated = sequelize.define(
    'LocalAsociated',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      deleted: DataTypes.BOOLEAN
    },
    {}
  )
  LocalAsociated.associate = function (models) {
    LocalAsociated.belongsTo(models.Local, {
      foreignKey: 'local_id',
      as: 'local'
    })
    LocalAsociated.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    LocalAsociated.belongsTo(models.Rol, { foreignKey: 'rol_id', as: 'rol' })
  }
  LocalAsociated.findAsociateds = (id) => {
    return LocalAsociated.findAll({
      where: { local_id: id, deleted: false },
      includes: [
        { model: sequelize.models.User, as: 'user', attributes: ['firstName', 'lastName', 'email'] }
      ]
    })
  }
  LocalAsociated.findLocals = (id) => {
    return LocalAsociated.findAll({
      where: { user_id: id, deleted: false },
      includes: [
        { model: sequelize.models.Local, as: 'local' }
      ]
    })
  }
  LocalAsociated.create = (newAssociated) => {
    return LocalAsociated.build(newAssociated).save()
  }
  LocalAsociated.erase = (id) => {
    return LocalAsociated.destroy({ where: { id: id } })
  }
  LocalAsociated.updateData = (updateData) => {
    return LocalAsociated.update(updateData, { where: { local_id: updateData.local_id, user_id: updateData.user_id } })
  }
  LocalAsociated.removeUserAssociations = (id) => {
    Log.info('Triggered update on LocalsAssociated table for user_id ' + id)
    return LocalAsociated.update({ deleted: true }, { where: { user_id: id } })
  }
  LocalAsociated.reactivateUserAssociations = (id) => {
    Log.info('Triggered update on LocalsAssociated table for user_id ' + id)
    return LocalAsociated.update({ deleted: false }, { where: { user_id: id } })
  }
  LocalAsociated.removeLocalAssociations = (id) => {
    Log.info('Triggered update on LocalsAssociated table for local_id ' + id)
    return LocalAsociated.update({ deleted: true }, { where: { local_id: id } })
  }
  LocalAsociated.reactivateLocalAssociations = (id) => {
    Log.info('Triggered update on LocalsAssociated table for local_id ' + id)
    return LocalAsociated.update({ deleted: false }, { where: { local_id: id } })
  }
  LocalAsociated.hasRoles = (userId, localId, allowedRoles, ownerOnly=false) => {
    Log.info('Checking that the user ' + userId + ' has one of the roles ' + allowedRoles + ' for the local ' + localId)
    const whereDoc = { user_id: userId, local_id: localId, rol_id: { [Sequelize.Op.in]: allowedRoles } }
    if (!ownerOnly) {
      whereDoc.deleted = false
    }
    return LocalAsociated.findAll({ where: whereDoc })
  }
  return LocalAsociated
}
