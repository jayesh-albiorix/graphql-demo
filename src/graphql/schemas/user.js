const { gql } = require('apollo-server-express');

const userDefs = gql`
    type Query {
        getUserList: UserListResponse
        getUser(
            _id:ID!
        ): UserResponse
    }

    type Mutation {
        addUser(
            data: UserInput!
        ) :UserResponse
        updateUser (
            _id:ID!,
            data: UserInput!
        ): UserResponse
        removeUser(
            _id:ID
        ):UserResponse
    }

    type UserListResponse {
        data: [UserResponse!]
    }

    type UserResponse {
        _id:ID!
        userName: String
        firstName: String
        lastName: String
        email: String
        password: String
    }

    input UserInput {
        _id:ID
        userName: String
        firstName: String
        lastName: String
        email: String
        password: String
    }
`


module.exports = userDefs