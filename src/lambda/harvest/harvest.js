// src/lambda/harvest/index.js

require('dotenv').config()
const axios = require('axios')

const api = require('./api')

exports.handler = async (event, context, callback) => {

  try {

    const { type, scope } = event.queryStringParameters

    if (!type) throw new Error('type is required')

    let body = {}

    if (type === 'connect') {
      const { code } = event.queryStringParameters

      const data = {
        code,
        client_id: process.env.VUE_APP_HARVEST_CLIENT_ID,
        client_secret: process.env.VUE_APP_HARVEST_CLIENT_SECRET,
        grant_type: 'authorization_code'
      }

      const response = await axios.post('https://id.getharvest.com/api/v2/oauth2/token', data, {
        headers: {
          'User-Agent': 'Rocket Test (jeffhunter@rocketinsights.com)'
        }
      })

      if (response && response.status >= 200 && response.status < 300 && response.data) {
        body = response.data
        body.scope = scope
      } else {
        throw new Error('Error with request.')
      }
    } else {
      const { accessToken, scope, from, to } = event.queryStringParameters

      if (!accessToken) throw new Error('accessToken is required')
      if (!scope) throw new Error('scope is required')

      const params = {
        accessToken,
        accountId: scope.replace('harvest:', ''),
        from,
        to
      }

      let results = null
      if (type === 'accountInfo') {
        results = await api.harvest.fetchAccounts(params)
      } else if (type === 'projectList') {
        results = await api.harvest.fetchProjects(params)
      } else if (type === 'timeEntriesList') {
        results = await api.harvest.fetchTimeEntries(params)
      }

      if (results) {
        body = results.data
      }
    }
    
    // console.log('')
    // console.log('##### Body: ', body)
    // console.log('')

    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      body: JSON.stringify(body)
    }

    return response

    // return callback(null, response)
  } catch (e) {
    return callback(e)
  }
}