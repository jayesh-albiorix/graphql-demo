const { gql } = require('apollo-server-express');

const typeDefs = gql`
        type Query {
            getProductList: [Product!]
        }

        type Mutation {
            addProduct(
                data: ProductInput!
            ): Product
        }

        type Product {
            _id: ID!
            title: String
            description: String
            price: Int
            exp_date: Date,
            review: Int
        }

        input ProductInput {
            title: String
            description: String
            price: Int
            exp_date: Date
            review: Int
        }
        scalar Date

`

module.exports = typeDefs;