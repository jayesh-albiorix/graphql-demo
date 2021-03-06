const express = require('express')
const { ApolloServer } = require('apollo-server-express');

require('./src/db/index');

const userSchema = require('./src/graphql/schemas/user')
const todoSchema = require('./src/graphql/schemas/todo')
const productSchema = require('./src/graphql/schemas/product')

const todoResolver = require('./src/graphql/resolvers/todo');
const userResolver = require('./src/graphql/resolvers/user');
const productResolver = require('./src/graphql/resolvers/product')

// const typeDefs = require('./src/graphql/schema');
// const resolvers = require('./src/graphql/resolvers');
const todoDataSource = require('./src/graphql/datasources/todo');
const userDataSource = require('./src/graphql/datasources/user');
const productSource = require('./src/graphql/datasources/product');

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs: [userSchema, todoSchema, productSchema],
        resolvers: [userResolver, todoResolver, productResolver],
        dataSources: () => {
            return {
                todo: todoDataSource,
                user: userDataSource,
                product:productSource
            }
        }
    });

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