const { gql } = require('apollo-server-express');

const userDefs = gql`

    type Mutation {
        login(
            data: LoginInput!
        ) :LoginResponse
    }

    type LoginResponse {
        user: UserResponse
        auth_token: String
    }

    type UserResponse {
        _id:ID!
        userName: String
        firstName: String
        lastName: String
        email: String
        password: String
    }

    input LoginInput {
        email: String
        password: String
    }
`

module.exports = userDefs