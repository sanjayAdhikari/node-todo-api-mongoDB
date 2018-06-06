var mongoose = require('mongoose');
const option = { keepAlive: 300000, connectTimeoutMS: 30000}

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp',option).catch( (err) => {
    console.log('Something goes wrong',err);
});

module.exports = {mongoose};