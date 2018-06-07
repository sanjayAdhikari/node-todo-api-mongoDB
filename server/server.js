require('./config/config');

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose');
var {User} = require('./model/user');
var {Todo} = require('./model/todo');
var authenticate = require('./middleware/authenticate');

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

    todoThing.save().then((doc) => {
        // console.log('Todo saved as:',JSON.stringify(doc,undefined,2));
        res.send(doc);
    }, (err) => {
        // console.log('Error occured:',err);
        res.status(400).send(err); //400 is a bad request error
    });
});

// get all todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.status(200).send({
            todos
        });
    }, (err) => {
        res.status(400).send(err);
    })
});

// GET /todos/1231323 -get particular todo
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) return res.status(400).send();

    Todo.findById(id).then((todo) => {
        if (!todo) return res.status(404).send();

        res.status(200).send({
            todo
        });
    }, (err) => {
        res.status(404).send(err)
    });
})


//DELETE /todos/id -delete particular todo
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) return res.status(400).send();
    Todo.findByIdAndRemove(id).then((todo) => {
        res.status(200).send({
            todo
        });
    }, (err) => res.status(404).send()).catch((err) => res.status(404).send())
})

// Path /todos/id -update the todo
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) return res.status(400).send();

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) return res.status(404).send();
        res.send({
            todo
        });
    }).catch((err) => {
        res.status(400).send(err);
    })
})

// FOR Users

// POST /user
app.post('/user', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token, ).send({user});
    }, (err) => res.status(404).send(err)).catch((e) => res.status(400).send(e))
});

app.get('/user/me', authenticate, (req, res) => {
    var token = req.header('x-auth');
    
    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        res.send(user);
    }).catch( (err) => {
        res.status(401).send();
    });
});

app.post('/user/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredential(body.email, body.password).then((user) => {
        
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        })

    }).catch((e) => {
        res.status(404).send();
    });
});

app.delete('/user/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then( ()=> {
        res.status(200).send();
    }, (err) => res.status(401).send());
})

// Firing up the server
app.listen(port || 3000, () => {
    console.log(`server is up @${port} port.`);
});

module.exports.app = app;