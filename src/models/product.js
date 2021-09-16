var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    exp_date: {
        type: String,
        required: false
    },
    review: {
        type: Number,
        required: false
    },

}, {
    versionKey: false,
    timestamps: true,
})

var ProductModel = mongoose.model('graphql-product', productSchema);

module.exports = ProductModel;

