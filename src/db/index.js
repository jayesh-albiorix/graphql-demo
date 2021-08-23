const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my_graphql_todo', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db connected')
});