var mongoose = require('mongoose');
const option = { keepAlive: 300000, connectTimeoutMS: 30000}

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOB_URI || 'mongodb://localhost:27017/TodoApp',option);

module.exports = {mongoose};