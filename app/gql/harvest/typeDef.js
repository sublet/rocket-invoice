// app/gql/harvest/typeDef.js

const { gql } = require('apollo-server-express')

const typeDef = gql`

  type Harvest {
    _id: String
    title: String
  }

  extend type Query {
    harvest(_id: String): Harvest
  }

  extend type Query {
    harvests: [Harvest]
  }

  extend type Mutation {
    createHarvest(title: String, content: String): Harvest
  }

`

module.exports = typeDef
