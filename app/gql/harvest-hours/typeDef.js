// app/gql/harvest-hours/typeDef.js

const { gql } = require('apollo-server-express')

const typeDef = gql`

  type Harvest-hours {
    _id: String
    title: String
  }

  extend type Query {
    harvest-hours(_id: String): Harvest-hours
  }

  extend type Query {
    harvest-hourss: [Harvest-hours]
  }

  extend type Mutation {
    createHarvest-hours(title: String, content: String): Harvest-hours
  }

`

module.exports = typeDef
