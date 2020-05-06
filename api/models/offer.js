module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define(
    'Offer',
    {
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
      deleted: DataTypes.BOOLEAN
    },
    {}
  )
  Offer.associate = function (models) {
    Offer.hasMany(models.OfferImage, {
      foreignKey: 'offer_id',
      onDelete: 'cascade',
      as: 'images'
    })

    Offer.belongsTo(models.Local, { foreignKey: 'local_id', as: 'local' })
  }
  Offer.findAllAndOrder = function (order, by, offset, limit, city) {
    let includes = ['local', 'images']
    if (city) {
      includes = [
        {
          model: sequelize.models.Local,
          as: 'local',
          required: true,
          include: [
            {
              model: sequelize.models.Address,
              as: 'address',
              required: true,
              attributes: [],
              where: {
                deleted: false,
                city: city
              }
            }
          ]
        }
      ]
    }
    return Offer.findAll({
      order: [[by, order]],
      where: {
        active: true,
        deleted: false
      },
      include: includes,
      offset: offset,
      limit: limit
    })
  }
  return Offer
}
