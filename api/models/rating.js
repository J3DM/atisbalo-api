const updateRating = require('../services/ratingCalculations')
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      service: DataTypes.FLOAT,
      attention: DataTypes.FLOAT,
      veracity: DataTypes.FLOAT,
      deleted: DataTypes.BOOLEAN,
      number_comments: DataTypes.INTEGER
    },
    {}
  )
  Rating.associate = function (models) {
    Rating.belongsTo(models.Local, { foreignKey: 'local_id', as: 'local' })
  }
  Rating.create = (localId) => {
    Rating.build({ service: 0, attention: 0, veracity: 0, local_id: localId, number_comments: 0 }).save()
  }
  Rating.findByLocalId = (id) => {
    return Rating.findOne({ where: { local_id: id } })
  }
  Rating.calculateRating = async (localId, ratingDoc, add = true) => {
    const storedRating = await Rating.findByLocalId(localId)
    const updateRatingData = await updateRating.update(storedRating, ratingDoc, add)
    return Rating.update(updateRatingData, { where: { local_id: localId } })
  }
  return Rating
}
