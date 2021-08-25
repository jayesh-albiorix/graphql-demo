var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },

}, {
    versionKey: false,
    timestamps: true,
})
todoSchema.index({ title: 'text' })

var TodoModel = mongoose.model('graphql-todo', todoSchema);

module.exports = TodoModel;

