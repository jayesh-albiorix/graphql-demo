const { gql } = require('apollo-server-express');

const typeDefs = gql`
        type Query {
            todoList(
                page: Int
                limit: Int
                search: String
            ): TodoListResponse
            todo(
                _id: ID!
            ): Todo
        }

        type Mutation {
            addTodo(
                data: TodoInput!
            ): Todo
            updateTodo(
                _id: ID!,
                data: TodoInput!
            ): Todo
            deleteTodo(
                _id: ID!
            ): Todo
        }

        type TodoListResponse {
            data: [Todo!]
            meta: TodoListMeta
        }

        type TodoListMeta {
            total: Int,
            hasMore: Boolean
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