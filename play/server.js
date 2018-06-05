var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

// var Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: null
//     }
// });

// var cookFoodTodo = new Todo({
//     text: 'Walk the dog'
// });

// cookFoodTodo.save().then( (doc) => {
//     console.log(JSON.stringify(doc,undefined,2));
// }, (err) => {
//     console.log(err);
// })

var User = mongoose.model('User',{
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

var sanjay = new User({
    name: 'Sanjay Adhikari',
    age: 19,
    email: 'idsanjay81@gmail.com'
});

sanjay.save().then( (doc) => {
    console.log(doc);
}, (err) => {
    console.log(err);
})