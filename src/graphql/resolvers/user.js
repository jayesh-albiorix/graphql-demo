const { ApolloError } = require("apollo-server-express");

const resolvers = {
    Query: {
        getUserList: async (parent, args, context, info) => {
            try {
                console.log('info: ', info);
                console.log('context: ', context);
                console.log('args: ', args);
                console.log('parent: ', parent);
                const list = await context.dataSources.user.getUserList()
                console.log('list:====> ', list);
                return list;
            } catch (err) {
                console.log(err)
                throw new ApolloError(err)
            }
        },
        getUser: async (parent, args, context, info) => {
            try {
                console.log('info: ', info);
                console.log('context: ', context);
                console.log('args: ', args);
                console.log('parent: ', parent);
                return await context.dataSources.user.getUser(args._id)
            } catch (err) {
                console.log(err)
                throw new ApolloError(err)
            }
        }
    },
    Mutation: {
        addUser: async (parent, args, context, info) => {
            try {
                console.log('info: ', info);
                console.log('context: ', context);
                console.log('args: ', args);
                console.log('parent: ', parent);
                return await context.dataSources.user.addUser(args.data)
            } catch (err) {
                console.log(err)
                throw new ApolloError(err)
            }
        },
        updateUser: async (parent, args, context, info) => {
            try {
                console.log('info: ', info);
                console.log('context: ', context);
                console.log('args: ', args);
                console.log('parent: ', parent);
                return await context.dataSources.user.updateUser(args._id, args.data);
            } catch (err) {
                console.log(err)
                throw new ApolloError(err)
            }
        },
        removeUser: async (parent, args, context, info) => {
            try {
                console.log('info: ', info);
                console.log('context: ', context);
                console.log('args: ', args);
                console.log('parent: ', parent);
                return await context.dataSources.user.removeUser(args._id);
            } catch (err) {
                console.log(err)
                throw new ApolloError(err)
            }
        }
    }
}

module.exports = resolvers;