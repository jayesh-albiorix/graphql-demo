const { ApolloError } = require("apollo-server-express");

const resolvers = {
    Query: {
        todoList: async (parent, args, context, info) => {
            try {
                console.log('info: ', info);
                console.log('context: ', context);
                console.log('args: ', args);
                console.log('parent: ', parent);
                return await context.dataSources.todo.getTodoList()
            } catch (err) {
                console.log(err)
                throw new ApolloError(err)
            }
        },
        todo: async (parent, args, context, info) => {
            try {
                console.log('info: ', info);
                console.log('context: ', context);
                console.log('args: ', args);
                console.log('parent: ', parent);
                return await context.dataSources.todo.getTodo(args._id)
            } catch (err) {
                console.log(err)
                throw new ApolloError(err)
            }
        }
    },
    Mutation: {
        post: async (parent, args, context, info) => {
            try {
                console.log('info: ', info);
                console.log('context: ', context);
                console.log('args: ', args);
                console.log('parent: ', parent);
                return await context.dataSources.todo.addTodo(args.data)
            } catch (err) {
                console.log(err)
                throw new ApolloError(err)
            }
        },
        put: async (parent, args, context, info) => {
            try {
                console.log('info: ', info);
                console.log('context: ', context);
                console.log('args: ', args);
                console.log('parent: ', parent);
                return await context.dataSources.todo.updateTodo(args._id, args.data);
            } catch (err) {
                console.log(err)
                throw new ApolloError(err)
            }
        },
        delete: async (parent, args, context, info) => {
            try {
                console.log('info: ', info);
                console.log('context: ', context);
                console.log('args: ', args);
                console.log('parent: ', parent);
                return await context.dataSources.todo.removeTodo(args._id);
            } catch (err) {
                console.log(err)
                throw new ApolloError(err)
            }
        }
    }
}

module.exports = resolvers;