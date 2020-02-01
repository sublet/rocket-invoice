---
to: app/gql/<%= name %>/typeDef.js
---
// app/gql/<%= name %>/typeDef.js

const { gql } = require('apollo-server-express')

const typeDef = gql`

  type <%= h.inflection.capitalize(name) %> {
    _id: String
    title: String
  }

  extend type Query {
    <%= name %>(_id: String): <%= h.inflection.capitalize(name) %>
  }

  extend type Query {
    <%= name %>s: [<%= h.inflection.capitalize(name) %>]
  }

  extend type Mutation {
    create<%= h.inflection.capitalize(name) %>(title: String, content: String): <%= h.inflection.capitalize(name) %>
  }

`

module.exports = typeDef
