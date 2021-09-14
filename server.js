const express = require('express')
const { ApolloServer } = require('apollo-server-express');
const { AuthenticationError } = require("apollo-server-express");
const jwt = require('jsonwebtoken');

require('./src/db/index');

const userSchema = require('./src/graphql/schemas/user')
const todoSchema = require('./src/graphql/schemas/todo')
const authSchema = require('./src/graphql/schemas/auth')

const todoResolver = require('./src/graphql/resolvers/todo');
const userResolver = require('./src/graphql/resolvers/user');
const authResolver = require('./src/graphql/resolvers/auth')

// const typeDefs = require('./src/graphql/schema');
// const resolvers = require('./src/graphql/resolvers');
const todoDataSource = require('./src/graphql/datasources/todo');
const userDataSource = require('./src/graphql/datasources/user');
const authDataSource = require('./src/graphql/datasources/auth');


const getUser = req => {
    try {
        // return the user information from the token
        return jwt.verify(req.headers.authorization, "jwtsecretkey");
    } catch (err) {
        throw new AuthenticationError('you must be logged in');

        // if there's a problem with the token, throw an error
        throw new Error('Session invalid');
    }
};


const startServer = async () => {
    const server = new ApolloServer({
        typeDefs: [userSchema, todoSchema, authSchema],
        resolvers: [userResolver, todoResolver, authResolver],
        dataSources: () => {
            return {
                todo: todoDataSource,
                user: userDataSource,
                auth: authDataSource
            }
        },
        context: ({ req }) => {
            const user = getUser(req);
            if (!user) throw new AuthenticationError('you must be logged in');

            return { user };
        }
    })

    await server.start();

    const app = express();

    const port = 3400;

    server.applyMiddleware({
        app
    })

    await new Promise(r => app.listen({
        port,
    }, r))

    console.log(`graphql server is running on port: ${port}, route: ${server.graphqlPath}`)
}

startServer();