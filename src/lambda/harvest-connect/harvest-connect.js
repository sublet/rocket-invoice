// https://bitsofco.de/how-to-use-puppeteer-in-a-netlifyws-lambda-function/
// https://github.com/ireade/netlify-puppeteer-screenshot-demo

const harvestLib = require('harvest-v2')

exports.handler = async (event, context, callback) => {

  try {
    const harvest = new harvestLib({
      CLIENT_ID: '...'
    })

    const response = {}

    return callback(null, response)
  } catch (e) {
    return callback(e)
  }
}