module.exports = (sequelize, DataTypes) => {
  const Rol = sequelize.define(
    'Rol',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
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
  return Rol
}
