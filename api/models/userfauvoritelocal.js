module.exports = (sequelize, DataTypes) => {
  const UserFauvoriteLocal = sequelize.define('UserFauvoriteLocal', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: DataTypes.UUID,
    local_id: DataTypes.UUID
  }, {})
  UserFauvoriteLocal.associate = function (models) {
    // associations can be defined here
  }
  return UserFauvoriteLocal
}
