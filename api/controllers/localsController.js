const { Local, sequelize } = require('../sequelize')

module.exports = {
  createLocal: (req, res) => {
    Local.build(req.body)
      .save()
      .then((local) => res.json(local))
      .catch((err) => {
        res.json(err)
      })
  },
  getLocals: (req, res) => {
    let offset
    let limit
    const lat = req.query.lat
    const lng = req.query.lng
    const type = req.query.type
    offset = req.query.offset ? (offset = req.query.offset) : (offset = 0)
    limit = req.query.limit ? (limit = req.query.offset) : (limit = 5)

    Local.findAll({
      attributes: [
        'id',
        'name',
        'capacity',
        'telephone',
        'description',
        'capacity',
        'identifier',
        [
          sequelize.literal(
            '6371 * acos(cos(radians(' +
              lat +
              ')) * cos(radians(lat)) * cos(radians(' +
              lng +
              ') - radians(lng)) + sin(radians(' +
              lat +
              ')) * sin(radians(lat)))'
          ),
          'distance'
        ]
      ],
      where: { localtype_id: type },
      order: sequelize.col('distance'),
      offset: offset,
      limit: limit
    })
      .then((locals) => {
        res.status(200).json(locals)
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  }
}
