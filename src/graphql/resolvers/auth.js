const { ApolloError } = require("apollo-server-express");

const resolvers = {
    Query: {

    },
    Mutation: {
        login: async (parent, args, context, info) => {
            try {
                return await context.dataSources.auth.userLogin(args.data)
            } catch (err) {
                console.log(err)
                throw new ApolloError(err)
            }
        },
    }
}

module.exports = resolvers;