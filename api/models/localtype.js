module.exports = (sequelize, DataTypes) => {
  const LocalType = sequelize.define(
    'LocalType',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      deleted: DataTypes.BOOLEAN
    },
    {}
  )
  LocalType.associate = function (models) {
    LocalType.hasMany(models.Local, { foreignKey: 'localtype_id', as: 'local' })
  }
  LocalType.findById = (id) => {
    return LocalType.findOne({ where: { id: id } })
  }
  LocalType.updateData = (id, updateDoc) => {
    return LocalType.update(updateDoc, { where: { id: id } })
  }
  LocalType.erase = (id) => {
    return LocalType.destroy({ where: { id: id } })
  }
  LocalType.filterSearch = (filterDoc) => {
    return LocalType.findAll({ where: filterDoc })
  }
  return LocalType
}
