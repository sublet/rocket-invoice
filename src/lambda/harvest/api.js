const axios = require('axios')

const host = 'https://api.harvestapp.com'

const buildQueryStringFromJSON = params => {
  var str = Object.keys(params).map(key => key + '=' + params[key]).join('&')
  return (str) ? '?' + str : ''
}

const http = (method, endpoint, options) => {
  const ops = {
    url: endpoint,
    method: method,
    data: options.data || {},
    headers: options.headers || {}
  }

  // console.log('##### Ops: ', ops)

  return Promise.resolve(axios.request(ops))
}

const buildEndpoint = endpoint  => {
  if (endpoint.indexOf('http') >= 0) return endpoint
  return host + endpoint
}

const httpGet = (endpoint, options = {}) => {
  return http('GET', buildEndpoint(endpoint), options)
}

const httpGetAuth = (endpoint, accessToken, accountId, data = null) => {
  if (!accessToken) return Promise.reject(new Error('Accces token is invalid'))
  if (!accountId) return Promise.reject(new Error('Account ID is invalid'))

  const options = {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Harvest-Account-ID': String(accountId),
      'User-Agent': 'Harvest API',
      'Content-Type': 'application/json'
    }
  }

  if (data) {
    endpoint = `${endpoint}${buildQueryStringFromJSON(data)}`
  }

  return httpGet(endpoint, options)
}

const harvest = {
  fetchAccounts: ({ accessToken, accountId, from, to }) => httpGetAuth(`https://id.getharvest.com/api/v2/accounts`, accessToken, accountId, { from, to }),
  fetchTimeEntries: ({ accessToken, accountId, from, to }) => httpGetAuth(`/v2/time_entries`, accessToken, accountId, { from, to })
}

module.exports = {
  harvest
}
