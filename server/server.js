var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {User} = require('./model/user');
var {Todo} = require('./model/todo');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse application/json
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
     var todoThing = new Todo({
         text: req.body.text
     });

     todoThing.save().then( (doc) => {
        // console.log('Todo saved as:',JSON.stringify(doc,undefined,2));
        res.send(doc);
     }, (err) => {
        // console.log('Error occured:',err);
        res.status(400).send(e); //400 is a bad request error
     });
});

app.get('/todos', (req, res) => {
    Todo.find().then( (todos) => {
        res.status(200).send({todos});
    }, (err) => {
        res.status(400).send(err);
    })
})


app.listen(3000, () => {
    console.log('server is up @3000 port.');
});

module.exports.app = app;