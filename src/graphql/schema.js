const { gql } = require('apollo-server-express');

const typeDefs = gql`
        type Query {
            todoList: TodoListResponse
            todo(
                _id: ID!
            ): Todo
        }

        type Mutation {
            post(
                data: TodoInput!
            ): Todo
            put(
                _id: ID!,
                data: TodoInput!
            ): Todo
            delete(
                _id: ID!
            ): Todo
        }

        type TodoListResponse {
            data: [Todo!]
        }

        type Todo {
            _id: ID!
            title: String
            description: String
            status: String
            date: Date
        }

        input TodoInput {
            _id: ID
            title: String
            description: String
            status: String
            date: Date
        }
        scalar Date

`

module.exports = typeDefs;