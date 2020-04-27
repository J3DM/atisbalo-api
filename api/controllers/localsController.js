const { Local, Populate } = require('../sequelize')
const { Log } = require('../services/logService')

module.exports = {
  createLocal: (req, res) => {
    Local.build(req.body)
      .save()
      .then((local) => res.json(local))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  getAllLocals: async (req, res) => {
    let query
    query = req.query.query ? (query = req.query.query) : 'All'

    Local.findAll({ include: Populate.Local[query] }).then((locals) => {
      res.status(200).json(locals)
    })
  },
  getLocalsGeo: async (req, res) => {
    let offset, limit, lat, lng, type, query, max

    lat = req.query.lat
      ? (lat = req.query.lat)
      : res.status(500).send('lat is required')
    lng = req.query.lng
      ? (lng = req.query.lng)
      : res.status(500).send('lng is required')
    type = req.query.type
      ? (type = req.query.type)
      : res.status(500).send('type is required')

    max = req.query.max ? (max = req.query.max) : 10000
    query = req.query.query ? (query = req.query.query) : 'All'
    offset = req.query.offset ? (offset = req.query.offset) : (offset = 0)
    limit = req.query.limit ? (limit = req.query.offset) : (limit = 5)

    const locals = await Local.findLocalGeo(
      lat,
      lng,
      Populate.Local[query],
      {
        localtype_id: type,
        deleted: false
      },
      max,
      offset,
      limit
    ).catch((err) => {
      Log.error(err)
      res.status(500).json(err)
    })

    // const locals = await Local.findAll({
    //   attributes: [
    //     'id',
    //     'name',
    //     'capacity',
    //     'telephone',
    //     'description',
    //     'capacity',
    //     'identifier',
    //     [
    //       sequelize.literal(
    //         '6371 * acos(cos(radians(' +
    //           lat +
    //           ')) * cos(radians(lat)) * cos(radians(' +
    //           lng +
    //           ') - radians(lng)) + sin(radians(' +
    //           lat +
    //           ')) * sin(radians(lat)))'
    //       ),
    //       'distance'
    //     ]
    //   ],

    //   include: [
    //     {
    //       model: Offer,
    //       required: false,
    //       attributes: [
    //         'id',
    //         'title',
    //         'description',
    //         'promotion',
    //         'endDate',
    //         'startDate'
    //       ],
    //       where: { active: true, deleted: false }
    //     },

    //     {
    //       model: Address,
    //       attributes: [
    //         'id',
    //         'street',
    //         'number',
    //         'city',
    //         'province',
    //         'complete'
    //       ],
    //       where: { deleted: false }
    //     },
    //     {
    //       model: LocalImage,
    //       required: false,
    //       attributes: ['id', 'url'],
    //       where: { deleted: false }
    //     },
    //     {
    //       model: LocalTag,
    //       required: false,
    //       attributes: ['id', 'tag_id'],
    //       where: { deleted: false }
    //     },
    //     {
    //       model: Rating,
    //       attributes: ['id', 'veracity', 'attention', 'service'],
    //       where: { deleted: false }
    //     }
    //   ],
    //   where: {
    //     localtype_id: type,
    //     deleted: false
    //   },
    //   order: sequelize.col('distance'),
    //   offset: offset,
    //   limit: limit
    // }).catch((err) => {
    //   res.status(500).json(err)
    // })

    if (locals.length < 1) {
      res.status(204).json(locals)
    } else {
      res.status(200).json(locals)
    }
  }
}
