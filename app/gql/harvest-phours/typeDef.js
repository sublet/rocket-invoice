// app/gql/harvest-phours/typeDef.js

const { gql } = require('apollo-server-express')

const typeDef = gql`

  type Harvest-phours {
    _id: String
    title: String
  }

  extend type Query {
    harvest-phours(_id: String): Harvest-phours
  }

  extend type Query {
    harvest-phourss: [Harvest-phours]
  }

  extend type Mutation {
    createHarvest-phours(title: String, content: String): Harvest-phours
  }

`

module.exports = typeDef
