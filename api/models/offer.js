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
  Offer.getFromLocalId = (idLocal, offset, limit) => {
    return Offer.findAndCountAll(
      {
        where: { local_id: idLocal },
        offset: offset,
        limit: limit
      }
    )
  }
  Offer.getActiveLocalId = (activeFilterDoc, offset, limit) => {
    return Offer.findAndCountAll(
      {
        where: activeFilterDoc,
        offset: offset,
        limit: limit
      }
    )
  }
  Offer.create = (newOffer) => {
    return Offer.build(newOffer).save()
  }
  Offer.udpateData = (idOffer, offerDoc) => {
    return Offer.update(
      offerDoc,
      { where: { id: idOffer } }
    )
  }
  Offer.erase = (idOffer) => {
    return Offer.destroy(
      { where: { id: idOffer } }
    )
  }
  Offer.findById = (id) => {
    return Offer.findOne(
      { where: { id: id } }
    )
  }
  return Offer
}
