module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      street: DataTypes.STRING,
      number: DataTypes.INTEGER,
      postalCode: DataTypes.INTEGER,
      city: DataTypes.STRING,
      province: DataTypes.STRING,
      complete: DataTypes.STRING,
      deleted: DataTypes.BOOLEAN
    },
    {}
  )
  Address.associate = function (models) {
    Address.belongsTo(models.Local, { foreignKey: 'local_id', as: 'local' })
  }
  return Address
}
