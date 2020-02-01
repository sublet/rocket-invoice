// src/lambda/harvest-hours/index.js

const HarvestLib = require('harvest-v2');

exports.handler = async (event, context, callback) => {

  try {

    const accessToken = event.queryStringParameters.token || null
    const scope = event.queryStringParameters.scope || null

    if (!accessToken || accessToken === '') {
      throw new Error('You did not provide an access token.')
    }
    
    const harvest = new HarvestLib({
      access_token: accessToken,
      scope
    })

    const response = { hello }

    return callback(null, response)
  } catch (e) {
    return callback(e)
  }
}