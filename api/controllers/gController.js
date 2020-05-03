const LocalType = require('../models').LocalType
const Tag = require('../models').Tag
const Rol = require('../models').Rol
const LocalTag = require('../models').LocalTag
const LocalAsociated = require('../models').LocalAsociated
const UserFauvoriteLocal = require('../models').UserFauvoriteLocal
const Comment = require('../models').Comment
const LocalOwn = require('../models').LocalOwn
const LocalDocuments = require('../models').LocalDocuments
const Address = require('../models').Address
const Document = require('../models').Document
const LocalImage = require('../models').LocalImage
const Offer = require('../models').Offer
const OfferImage = require('../models').OfferImage
const Rating = require('../models').Rating
const Local = require('../models').Local
const User = require('../models').User
const faker = require('faker/locale/es')
const bcrypt = require('bcrypt')
const { Log } = require('../helpers/log')
module.exports = {
  generate: async (req, res) => {
    await Rol.build({ name: 'Owner' })
      .save()
      .catch((err) => Log.info(err))
    await Rol.build({ name: 'Manager' })
      .save()
      .catch((err) => Log.info(err))
    await Rol.build({ name: 'Employee' })
      .save()
      .catch((err) => Log.info(err))

    Log.info('Generados Roles')
    for (let i = 0; i < 20; i++) {
      await LocalType.build({
        name: faker.commerce.product() + faker.random.number(1000)
      })
        .save()
        .catch((err) => Log.info(err))
      await Tag.build({
        name: faker.commerce.productAdjective() + faker.random.number(1000)
      })
        .save()
        .catch((err) => Log.info(err))
      Log.info('Generados typos y tags ' + i)
    }

    for (let i = 0; i < 100; i++) {
      await User.build({
        firstName: faker.name.firstName() + faker.random.number(1000),
        lastName: faker.name.lastName() + faker.random.number(1000),
        email: faker.internet.email() + faker.random.number(1000),
        password: await bcrypt.hashSync(faker.internet.userName(), 10)
      })
        .save()
        .catch((err) => Log.info(err))
      await User.build({
        firstName: faker.name.firstName() + faker.random.number(1000),
        lastName: faker.name.lastName() + faker.random.number(1000),
        email: faker.internet.email() + faker.random.number(1000),
        password: await bcrypt.hashSync(faker.internet.userName(), 10)
      })
        .save()
        .catch((err) => Log.info(err))
      await User.build({
        firstName: faker.name.firstName() + faker.random.number(1000),
        lastName: faker.name.lastName() + faker.random.number(1000),
        email: faker.internet.email() + faker.random.number(1000),
        password: await bcrypt.hashSync(faker.internet.userName(), 10)
      })
        .save()
        .catch((err) => Log.info(err))
      await User.build({
        firstName: faker.name.firstName() + faker.random.number(1000),
        lastName: faker.name.lastName() + faker.random.number(1000),
        email: faker.internet.email() + faker.random.number(1000),
        password: await bcrypt.hashSync(faker.internet.userName(), 10)
      })
      await User.build({
        firstName: faker.name.firstName() + faker.random.number(1000),
        lastName: faker.name.lastName() + faker.random.number(1000),
        email: faker.internet.email() + faker.random.number(1000),
        password: await bcrypt.hashSync(faker.internet.userName(), 10)
      })
        .save()
        .catch((err) => Log.info(err))
      await User.build({
        firstName: faker.name.firstName() + faker.random.number(1000),
        lastName: faker.name.lastName() + faker.random.number(1000),
        email: faker.internet.email() + faker.random.number(1000),
        password: await bcrypt.hashSync(faker.internet.userName(), 10)
      })
        .save()
        .catch((err) => Log.info(err))
      await User.build({
        firstName: faker.name.firstName() + faker.random.number(1000),
        lastName: faker.name.lastName() + faker.random.number(1000),
        email: faker.internet.email() + faker.random.number(1000),
        password: await bcrypt.hashSync(faker.internet.userName(), 10)
      })
      await User.build({
        firstName: faker.name.firstName() + faker.random.number(1000),
        lastName: faker.name.lastName() + faker.random.number(1000),
        email: faker.internet.email() + faker.random.number(1000),
        password: await bcrypt.hashSync(faker.internet.userName(), 10)
      })
        .save()
        .catch((err) => Log.info(err))
      await User.build({
        firstName: faker.name.firstName() + faker.random.number(1000),
        lastName: faker.name.lastName() + faker.random.number(1000),
        email: faker.internet.email() + faker.random.number(1000),
        password: await bcrypt.hashSync(faker.internet.userName(), 10)
      })
        .save()
        .catch((err) => Log.info(err))
      await User.build({
        firstName: faker.name.firstName() + faker.random.number(1000),
        lastName: faker.name.lastName() + faker.random.number(1000),
        email: faker.internet.email() + faker.random.number(1000),
        password: await bcrypt.hashSync(faker.internet.userName(), 10)
      })
      Log.info('Generados usuarios ' + i)
    }

    const localtypes = await LocalType.findAll()

    for (let i = 0; i < localtypes.length; i++) {
      const o = localtypes[i]
      await Local.build({
        name: faker.company.companyName() + faker.random.number(1000),
        telephone: faker.phone.phoneNumber(),
        description: faker.lorem.sentence(),
        capacity: faker.random.number(100),
        occupation: faker.random.number(100),
        identifier: faker.name.findName() + faker.random.number(1000),
        localtype_id: o.id,
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      })
        .save()
        .catch((err) => Log.info(err))
      await Local.build({
        name: faker.company.companyName() + faker.random.number(1000),
        telephone: faker.phone.phoneNumber(),
        description: faker.lorem.sentence(),
        capacity: faker.random.number(100),
        occupation: faker.random.number(100),
        identifier: faker.name.findName() + faker.random.number(1000),
        localtype_id: o.id,
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      })
        .save()
        .catch((err) => Log.info(err))
      await Local.build({
        name: faker.company.companyName() + faker.random.number(1000),
        telephone: faker.phone.phoneNumber(),
        description: faker.lorem.sentence(),
        capacity: faker.random.number(100),
        occupation: faker.random.number(100),
        identifier: faker.name.findName() + faker.random.number(1000),
        localtype_id: o.id,
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      })
        .save()
        .catch((err) => Log.info(err))
      await Local.build({
        name: faker.company.companyName() + faker.random.number(1000),
        telephone: faker.phone.phoneNumber(),
        description: faker.lorem.sentence(),
        capacity: faker.random.number(100),
        occupation: faker.random.number(100),
        identifier: faker.name.findName() + faker.random.number(1000),
        localtype_id: o.id,
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      })
        .save()
        .catch((err) => Log.info(err))
      await Local.build({
        name: faker.company.companyName() + faker.random.number(1000),
        telephone: faker.phone.phoneNumber(),
        description: faker.lorem.sentence(),
        capacity: faker.random.number(100),
        occupation: faker.random.number(100),
        identifier: faker.name.findName() + faker.random.number(1000),
        localtype_id: o.id,
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      })
        .save()
        .catch((err) => Log.info(err))
      await Local.build({
        name: faker.company.companyName() + faker.random.number(1000),
        telephone: faker.phone.phoneNumber(),
        description: faker.lorem.sentence(),
        capacity: faker.random.number(100),
        occupation: faker.random.number(100),
        identifier: faker.name.findName() + faker.random.number(1000),
        localtype_id: o.id,
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      })
        .save()
        .catch((err) => Log.info(err))
      Log.info('Generados Locales ' + i)
    }

    const locals = await Local.findAll()
    const users = await User.findAll()

    for (let i = 0; i < locals.length; i++) {
      const l = locals[i]

      const u = users[i]
      const u1 = users[(users.length / 3 + i) | 0]
      const u2 = users[((users.length / 3) * 2 + i) | 0]

      if (faker.random.number(1)) {
        await UserFauvoriteLocal.build({
          user_id: u.id,
          local_id: l.id
        })
          .save()
          .catch((err) => Log.info(err))

        await UserFauvoriteLocal.build({
          user_id: u1.id,
          local_id: l.id
        })
          .save()
          .catch((err) => Log.info(err))
      } else {
        await UserFauvoriteLocal.build({
          user_id: u2.id,
          local_id: l.id
        })
          .save()
          .catch((err) => Log.info(err))
      }
      Log.info('set fauvorites ' + i)
    }
    for (let i = 0; i < locals.length; i++) {
      const l = locals[i]

      for (let k = 0; k < 30; k++) {
        const u = users[faker.random.number(users.length - 1)]
        await Comment.build({
          comment: faker.lorem.words(),
          rating: faker.random.number(10),
          user_id: u.id,
          local_id: l.id
        })
          .save()
          .catch((err) => Log.info(err))
      }
      Log.info('Generados Comentarios ' + i)

      await Rating.build({
        service: faker.random.number(10),
        attention: faker.random.number(10),
        veracity: faker.random.number(10),
        local_id: l.id
      })
        .save()
        .catch((err) => Log.info(err))
      Log.info('Generados rating ' + i)
      await LocalOwn.build({
        credits: faker.random.number(50),
        local_id: l.id
      })
        .save()
        .catch((err) => Log.info(err))
      Log.info('Generados localown ' + i)

      await LocalDocuments.build({
        CIF: faker.random.alphaNumeric() + faker.random.number(1000),
        local_id: l.id
      })
        .save()
        .catch((err) => Log.info(err))
      Log.info('Generados localdocuments ' + i)

      await LocalImage.build({
        url: faker.image.imageUrl(400, 400, 'local'),
        local_id: l.id
      })
        .save()
        .catch((err) => Log.info(err))
      Log.info('Generados localimage ' + i)

      await Address.build({
        local_id: l.id,
        street: faker.address.streetName(),
        number: faker.random.number(200),
        postalCode: faker.address.zipCode(),
        city: faker.address.country(),
        province: faker.address.state(),
        complete: faker.lorem.words()
      })
        .save()
        .catch((err) => Log.info(err))
      Log.info('Generados address ' + i)

      await Offer.build({
        title: faker.lorem.words(),
        active: faker.random.number(1),
        description: faker.lorem.lines(),
        promotion: faker.random.number(50),
        endDate: faker.date.future(),
        startDate: faker.date.past(),
        local_id: l.id
      })
        .save()
        .catch((err) => Log.info(err))
      Log.info('Generados Offer ' + i)
    }
    const offers = await Offer.findAll()
    for (let i = 0; i < offers.length; i++) {
      const of = offers[i]
      await OfferImage.build({
        offer_id: of.id,
        url: faker.internet.url()
      })
        .save()
        .catch((err) => Log.info(err))
      Log.info('Generados offers ' + i)
    }

    // generamos documentos relacionados con local documents 2 documentos por cada local

    const localsDocuments = await LocalDocuments.findAll()
    for (let i = 0; i < localsDocuments.length; i++) {
      const ld = localsDocuments[i]
      await Document.build({
        localDocument_id: ld.id,
        url: faker.internet.url()
      })
        .save()
        .catch((err) => Log.info(err))
      await Document.build({
        localDocument_id: ld.id,
        url: faker.internet.url()
      })
        .save()
        .catch((err) => Log.info(err))
      Log.info('Generados localdocuments ' + i)
    }

    const tags = await Tag.findAll()
    for (let f = 0; f < tags.length; f++) {
      const tag = tags[f]
      let l = locals[faker.random.number(locals.length - 1)]
      await LocalTag.build({
        local_id: l.id,
        tag_id: tag.id
      })
        .save()
        .catch((err) => Log.info(err))

      l = locals[faker.random.number(locals.length - 1)]

      await LocalTag.build({
        local_id: l.id,
        tag_id: tag.id
      })
        .save()
        .catch((err) => Log.info(err))

      l = locals[faker.random.number(locals.length - 1)]

      await LocalTag.build({
        local_id: l.id,
        tag_id: tag.id
      })
        .save()
        .catch((err) => Log.info(err))
      Log.info('Generados local tags ' + f)
    }

    const roles = await Rol.findAll()
    for (let j = 0; j < roles.length; j++) {
      const r = roles[j]
      for (let i = 0; i < locals.length; i++) {
        const l = locals[i]

        if (r.name === 'Manager') {
          const u = users[(users.length / 3 + i) | 0]

          await LocalAsociated.build({
            user_id: u.id,
            local_id: l.id,
            rol_id: r.id
          })
            .save()
            .catch((err) => Log.info(err))
        } else if (r.name === 'Owner') {
          const u = users[((users.length / 3) * 2 + i) | 0]

          await LocalAsociated.build({
            user_id: u.id,
            local_id: l.id,
            rol_id: r.id
          })
            .save()
            .catch((err) => Log.info(err))
        } else {
          const u = users[i]

          await LocalAsociated.build({
            user_id: u.id,
            local_id: l.id,
            rol_id: r.id
          })
            .save()
            .catch((err) => Log.info(err))
        }
        Log.info('Generados roles ' + i)
      }
      Log.info('Generados roles ' + j)
    }

    Log.info('fin')
  }
}
