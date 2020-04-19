module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('Offer', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    promotion: DataTypes.INTEGER,
    endDate: DataTypes.DATE,
    startDate: DataTypes.DATE,
    local_id: DataTypes.UUID,
    deleted: DataTypes.BOOLEAN
  }, {})
  Offer.associate = function (models) {
    // associations can be defined here
  }
  return Offer
}
