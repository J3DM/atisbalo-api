module.exports = (sequelize, DataTypes) => {
  const LocalTag = sequelize.define(
    'LocalTag',
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
  LocalTag.associate = function (models) {
    LocalTag.belongsTo(models.Tag, { foreignKey: 'tag_id', as: 'tag' })
    LocalTag.belongsTo(models.Local, { foreignKey: 'local_id', as: 'local' })
  }
  LocalTag.getLocals = (localId) => {
    return LocalTag.findAll({ where: { local_id: localId } })
  }
  LocalTag.createLocals = (localTags) => {
    return LocalTag.bulkCreate(localTags)
  }
  LocalTag.eraseLocals = (localId) => {
    return LocalTag.destroy({ where: { local_id: localId } })
  }
  return LocalTag
}
