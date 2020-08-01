module.exports = (sequelize, DataTypes) => {
  const Rol = sequelize.define(
    'Rol',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: DataTypes.STRING,
      deleted: DataTypes.BOOLEAN
    },
    {}
  )
  Rol.associate = function (models) {
    Rol.hasMany(models.LocalAsociated, {
      foreignKey: 'rol_id',
      onDelete: 'cascade',
      as: 'localAsociated'
    })
  }
  Rol.findById = (id) => {
    return Rol.findOne({ where: { id: id } })
  }
  Rol.create = (newRol) => {
    return Rol.build(newRol).save()
  }
  Rol.updateData = (id, updateData) => {
    return Rol.update(updateData, { where: { id: id } })
  }
  Rol.erase = (id) => {
    return Rol.destroy({
      where: { id: id }
    })
  }
  Rol.paginate = (filterDoc, offset, limit) => {
    return Rol.findAndCountAll({ where: filterDoc, limit: limit, offset: offset })
  }
  return Rol
}
