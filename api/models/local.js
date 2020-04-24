module.exports = (sequelize, DataTypes) => {
  const Local = sequelize.define(
    'Local',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      telephone: DataTypes.STRING,
      description: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      identifier: DataTypes.STRING,
      localtype_id: DataTypes.UUID,
      deleted: DataTypes.BOOLEAN,
      lng: DataTypes.FLOAT,
      lat: DataTypes.FLOAT
    },
    {}
  )
  Local.associate = function (models) {
    // associations can be defined here
  }
  return Local
}
