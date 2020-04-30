const {
  User,
  Local,
  LocalType,
  Tag,
  Rol,
  LocalTag,
  LocalAsociated,
  UserFauvoriteLocal,
  Comment,
  LocalOwn,
  LocalDocuments,
  Address,
  Document,
  LocalImage,
  Offer,
  OfferImage,
  Rating
} = require('../sequelize')
const faker = require('faker/locale/es')
const bcrypt = require('bcrypt')

module.exports = {
  generate: async (req, res) => {
    await Rol.build({ name: 'Owner' })
      .save()
      .catch((err) => console.log(err))
    await Rol.build({ name: 'Manager' })
      .save()
      .catch((err) => console.log(err))
    await Rol.build({ name: 'Employee' })
      .save()
      .catch((err) => console.log(err))

    for (let i = 0; i < 20; i++) {
      await LocalType.build({ name: faker.commerce.product() })
        .save()
        .catch((err) => console.log(err))
      await Tag.build({ name: faker.commerce.productAdjective() })
        .save()
        .catch((err) => console.log(err))
    }

    for (let i = 0; i < 1000; i++) {
      await User.build({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: await bcrypt.hashSync(faker.internet.userName(), 10)
      })
        .save()
        .catch((err) => console.log(err))
    }

    const localtypes = await LocalType.findAll()

    for (let i = 0; i < localtypes.length; i++) {
      const o = localtypes[i]
      await Local.build({
        name: faker.company.companyName(),
        telephone: faker.phone.phoneNumber(),
        description: faker.lorem.sentence(),
        capacity: faker.random.number(100),
        occupation: faker.random.number(100),
        identifier: faker.name.findName(),
        localtype_id: o.id,
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      })
        .save()
        .catch((err) => console.log(err))
      await Local.build({
        name: faker.company.companyName(),
        telephone: faker.phone.phoneNumber(),
        description: faker.lorem.sentence(),
        capacity: faker.random.number(100),
        occupation: faker.random.number(100),
        identifier: faker.name.findName(),
        localtype_id: o.id,
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      })
        .save()
        .catch((err) => console.log(err))
      await Local.build({
        name: faker.company.companyName(),
        telephone: faker.phone.phoneNumber(),
        description: faker.lorem.sentence(),
        capacity: faker.random.number(100),
        occupation: faker.random.number(100),
        identifier: faker.name.findName(),
        localtype_id: o.id,
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      })
        .save()
        .catch((err) => console.log(err))
      await Local.build({
        name: faker.company.companyName(),
        telephone: faker.phone.phoneNumber(),
        description: faker.lorem.sentence(),
        capacity: faker.random.number(100),
        occupation: faker.random.number(100),
        identifier: faker.name.findName(),
        localtype_id: o.id,
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      })
        .save()
        .catch((err) => console.log(err))
      await Local.build({
        name: faker.company.companyName(),
        telephone: faker.phone.phoneNumber(),
        description: faker.lorem.sentence(),
        capacity: faker.random.number(100),
        occupation: faker.random.number(100),
        identifier: faker.name.findName(),
        localtype_id: o.id,
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      })
        .save()
        .catch((err) => console.log(err))
      await Local.build({
        name: faker.company.companyName(),
        telephone: faker.phone.phoneNumber(),
        description: faker.lorem.sentence(),
        capacity: faker.random.number(100),
        occupation: faker.random.number(100),
        identifier: faker.name.findName(),
        localtype_id: o.id,
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      })
        .save()
        .catch((err) => console.log(err))
    }

    const locals = await Local.findAll()
    const users = await User.findAll()

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
          .catch((err) => console.log(err))
      }

      await Rating.build({
        service: faker.random.number(10),
        attention: faker.random.number(10),
        veracity: faker.random.number(10),
        local_id: l.id
      })
        .save()
        .catch((err) => console.log(err))
      await LocalOwn.build({
        credits: faker.random.number(50),
        local_id: l.id
      })
        .save()
        .catch((err) => console.log(err))
      await LocalDocuments.build({
        CIF: faker.random.alphaNumeric(),
        local_id: l.id
      })
        .save()
        .catch((err) => console.log(err))

      await LocalImage.build({
        url: faker.image.imageUrl(400, 400, 'local'),
        local_id: l.id
      })
        .save()
        .catch((err) => console.log(err))
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
        .catch((err) => console.log(err))

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
        .catch((err) => console.log(err))
    }
    const offers = await Offer.findAll()
    for (let i = 0; i < offers.length; i++) {
      const of = offers[i]
      await OfferImage.build({
        offer_id: of.id,
        url: faker.internet.url()
      })
        .save()
        .catch((err) => console.log(err))
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
        .catch((err) => console.log(err))
      await Document.build({
        localDocument_id: ld.id,
        url: faker.internet.url()
      })
        .save()
        .catch((err) => console.log(err))
    }

    for (let i = 0; i < locals.length; i++) {
      const l = locals[i]

      const u = users[(users.length / 3) * 2 - i]
      const u1 = users[users.length / 3 - i]
      const u2 = users[users.length - 1 - i]

      if (faker.random.number(1)) {
        await UserFauvoriteLocal.build({
          user_id: u.id,
          local_id: l.id
        })
          .save()
          .catch((err) => console.log(err))

        await UserFauvoriteLocal.build({
          user_id: u1.id,
          local_id: l.id
        })
          .save()
          .catch((err) => console.log(err))
      } else {
        await UserFauvoriteLocal.build({
          user_id: u2.id,
          local_id: l.id
        })
          .save()
          .catch((err) => console.log(err))
      }
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
        .catch((err) => console.log(err))

      l = locals[faker.random.number(locals.length - 1)]

      await LocalTag.build({
        local_id: l.id,
        tag_id: tag.id
      })
        .save()
        .catch((err) => console.log(err))

      l = locals[faker.random.number(locals.length - 1)]

      await LocalTag.build({
        local_id: l.id,
        tag_id: tag.id
      })
        .save()
        .catch((err) => console.log(err))
    }
    const roles = await Rol.findAll()
    for (let j = 0; j < roles.length; j++) {
      const r = roles[j]
      for (let i = 0; i < locals.length; i++) {
        const l = locals[i]

        if (r.name === 'Manager') {
          const u = users[users.length / 3 + i]

          await LocalAsociated.build({
            user_id: u.id,
            local_id: l.id,
            rol_id: r.id
          })
            .save()
            .catch((err) => console.log(err))
        } else if (r.name === 'Owner') {
          const u = users[(users.length / 3) * 2 + i]

          await LocalAsociated.build({
            user_id: u.id,
            local_id: l.id,
            rol_id: r.id
          })
            .save()
            .catch((err) => console.log(err))
        } else {
          const u = users[i]

          await LocalAsociated.build({
            user_id: u.id,
            local_id: l.id,
            rol_id: r.id
          })
            .save()
            .catch((err) => console.log(err))
        }
      }
    }
    console.log('fin')
  }
}
