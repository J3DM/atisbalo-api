const { Address } = require('../sequelize')
const Sequelize = require('sequelize')

module.exports = {
  getAllAddresses: (req, res) => {
    Address.findAll().then(objects => res.status(200).send(objects)).catch(err => {
      res.status(500).send(err.messaje)
    })
  },
  findAddressGeo: (req, res) => {
    // point example
    // const point = { type: 'Point', coordinates: [39.807222, -76.984722] }
    const lat = req.headers.lat
    const long = req.headers.long
    const range = req.headers.range

    Address.findAll({
      where: Sequelize.where(
        Sequelize.fn('ST_DWithin',
          Sequelize.col('location'),
          Sequelize.fn('ST_SetSRID',
            Sequelize.fn('ST_MakePoint',
              long, lat),
            4326),
          +range * 0.016),
        true)
    }).then(objects => res.status(200).send(objects)).catch(err => {
      res.status(500).send(err.messaje)
    })
  }

}
