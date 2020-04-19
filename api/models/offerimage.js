module.exports = (sequelize, DataTypes) => {
  const OfferImage = sequelize.define('OfferImage', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    url: DataTypes.STRING,
    offer_id: DataTypes.UUID,
    deleted: DataTypes.BOOLEAN
  }, {})
  OfferImage.associate = function (models) {
    // associations can be defined here
  }
  return OfferImage
}
