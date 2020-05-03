module.exports = (sequelize, DataTypes) => {
  const OfferImage = sequelize.define(
    'OfferImage',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      url: DataTypes.STRING,
      deleted: DataTypes.BOOLEAN
    },
    {}
  )
  OfferImage.associate = function (models) {
    OfferImage.belongsTo(models.Offer, { foreignKey: 'offer_id', as: 'offer' })
  }
  return OfferImage
}
