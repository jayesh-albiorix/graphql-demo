const ProductModel = require('./../../models/product');

const getProductList = async () => {
    try {
        return await ProductModel.find();

    } catch (error) {
        throw new Error("getting list failed")
    }
}

const addProduct = async (postData) => {
    try {
        return await ProductModel.create(postData);

    } catch (error) {
        throw new Error("Add product failed")
    }
}

module.exports = {
    getProductList: getProductList,
    addProduct: addProduct,
}