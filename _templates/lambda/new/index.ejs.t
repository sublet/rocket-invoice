---
to: src/lambda/<%= name %>/index.js
---
// src/lambda/<%= name %>/index.js

exports.handler = async (event, context, callback) => {

  try {
    
    var hello = 'world'

    const response = { hello }

    return callback(null, response)
  } catch (e) {
    return callback(e)
  }
}