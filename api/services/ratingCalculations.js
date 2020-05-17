
const addRemoveComment = (stored, posted, add = true) => {
  const serviceRating = posted.service
  const attentionRating = posted.attention
  const veracityRating = posted.veracity
  if (stored != null) {
    const storedData = stored.dataValues
    if (storedData.number_comments === null) {
      storedData.number_comments = 0
    }
    if (add === true) {
      storedData.service = (serviceRating + storedData.service * storedData.number_comments) / (storedData.number_comments + 1)
      storedData.attention = (attentionRating + storedData.attention * storedData.number_comments) / (storedData.number_comments + 1)
      storedData.veracity = (veracityRating + storedData.veracity * storedData.number_comments) / (storedData.number_comments + 1)
      storedData.number_comments += 1
    } else {
      if (storedData.number_comments - 1 > 0) {
        storedData.service = (storedData.service * storedData.number_comments - serviceRating) / (storedData.number_comments - 1)
        storedData.attention = (storedData.attention * storedData.number_comments - attentionRating) / (storedData.number_comments - 1)
        storedData.veracity = (storedData.veracity * storedData.number_comments - veracityRating) / (storedData.number_comments - 1)
        storedData.number_comments -= 1
      } else {
        storedData.service = 0
        storedData.attention = 0
        storedData.veracity = 0
        storedData.number_comments = 0
      }
    }
    return {
      service: storedData.service,
      attention: storedData.attention,
      veracity: storedData.veracity,
      number_comments: storedData.number_comments
    }
  }
  return {}
}
const updateComment = (stored, posted, add = true) => {
  const serviceRating = posted.attributes.service
  const attentionRating = posted.attributes.attention
  const veracityRating = posted.attributes.veracity
  if (stored != null) {
    const storedData = stored.dataValues
    if (storedData.number_comments === null) {
      storedData.number_comments = 0
    }
    if (add === true) {
      storedData.service = (serviceRating + storedData.service * storedData.number_comments) / (storedData.number_comments + 1)
      storedData.attention = (attentionRating + storedData.attention * storedData.number_comments) / (storedData.number_comments + 1)
      storedData.veracity = (veracityRating + storedData.veracity * storedData.number_comments) / (storedData.number_comments + 1)
      storedData.number_comments += 1
    } else {
      if (storedData.number_comments - 1 > 0) {
        storedData.service = (storedData.service * storedData.number_comments - serviceRating) / (storedData.number_comments - 1)
        storedData.attention = (storedData.attention * storedData.number_comments - attentionRating) / (storedData.number_comments - 1)
        storedData.veracity = (storedData.veracity * storedData.number_comments - veracityRating) / (storedData.number_comments - 1)
        storedData.number_comments -= 1
      } else {
        storedData.service = 0
        storedData.attention = 0
        storedData.veracity = 0
        storedData.number_comments = 0
      }
    }
    return {
      service: storedData.service,
      attention: storedData.attention,
      veracity: storedData.veracity,
      number_comments: storedData.number_comments
    }
  }
  return {}
}
module.exports = {
  addRemoveComment,
  updateComment
}
