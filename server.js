const express = require('express')
const { ApolloServer } = require('apollo-server-express');

require('./src/db/index');

const typeDefs = require('./src/graphql/schema');
const resolvers = require('./src/graphql/resolvers');
const todoDataSource = require('./src/graphql/datasources/todo');

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => {
            return {
                todo: todoDataSource
            }
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