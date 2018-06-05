var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {User} = require('./model/user');
var {Todo} = require('./model/todo');

var app = express();
const port = process.env.PORT;
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
});

// GET /todos/1231323
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) return res.status(400).send();

    Todo.findById(id).then( (todo) => {
        if(!todo) return res.status(404).send();

        res.status(200).send({todo});
    }, (err) => {res.status(404).send(err)});
})


app.listen(port, () => {
    console.log(`server is up @${port} port.`);
});

module.exports.app = app;