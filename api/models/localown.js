module.exports = (sequelize, DataTypes) => {
  const LocalOwn = sequelize.define(
    'LocalOwn',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      credits: DataTypes.INTEGER,
      local_id: DataTypes.UUID,
      deleted: DataTypes.BOOLEAN
    },
    {}
  )
  LocalOwn.associate = function (models) {
    // associations can be defined here
  }
  return LocalOwn
}
