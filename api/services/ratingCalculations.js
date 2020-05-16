
const update = (stored, posted, add = true) => {
  const serviceRating = posted.service
  const attentionRating = posted.attention
  const veracityRating = posted.veracity
  const stotedData = stored.dataValues
  if (stotedData.number_comments === null) {
    stotedData.number_comments = 0
  }
  if (add === true) {
    stotedData.service = (serviceRating + stotedData.service * stotedData.number_comments) / (stotedData.number_comments + 1)
    stotedData.attention = (attentionRating + stotedData.attention * stotedData.number_comments) / (stotedData.number_comments + 1)
    stotedData.veracity = (veracityRating + stotedData.veracity * stotedData.number_comments) / (stotedData.number_comments + 1)
    stotedData.number_comments += 1
  } else {
    if (stotedData.number_comments - 1 !== 0) {
      stotedData.service = (stotedData.service * stotedData.number_comments - serviceRating) / (stotedData.number_comments - 1)
      stotedData.attention = (stotedData.attention * stotedData.number_comments - attentionRating) / (stotedData.number_comments - 1)
      stotedData.veracity = (stotedData.veracity * stotedData.number_comments - veracityRating) / (stotedData.number_comments - 1)
      stotedData.number_comments -= 1
    } else {
      stotedData.service = 0
      stotedData.attention = 0
      stotedData.veracity = 0
      stotedData.number_comments = 0
    }
  }
  return {
    service: stotedData.service,
    attention: stotedData.attention,
    veracity: stotedData.veracity,
    number_comments: stotedData.number_comments
  }
}
module.exports = {
  update
}
