module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
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
    local_id: DataTypes.UUID,
    deleted: DataTypes.BOOLEAN,
    location: DataTypes.GEOMETRY('POINT')
  }, {})
  Address.associate = function (models) {
    // associations can be defined here
  }
  return Address
}
