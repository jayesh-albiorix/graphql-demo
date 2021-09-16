const { ApolloError } = require("apollo-server-express");

const resolvers = {
    Query: {
        getProductList: async (parent, args, context, info) => {
            try {
                const list = await context.dataSources.product.getProductList()
                return list;
            } catch (err) {
                console.log(err)
                throw new ApolloError(err)
            }
        }
    },
    Mutation: {
        addProduct: async (parent, args, context, info) => {
            try {
                return await context.dataSources.product.addProduct(args.data)
            } catch (err) {
                console.log(err)
                throw new ApolloError(err)
            }
        }
    }
};

module.exports = resolvers;