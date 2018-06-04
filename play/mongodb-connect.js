// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

const dbURL = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(dbURL, (err, DB) => {
    if (err) return console.log('Unable to connect to mongodb server');
    console.log('Connected to Mongodb server');
    var db = DB.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'nothing to do',
    //     completed: true
    // }, (err, result) => {
    //     if (err) return console.log('Unable to insert Todos', err);
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Sanjay',
    //     age: 19,
    //     location: 'Khursanitar-35,Lazimpat, Kathmandu'
    // }, (err, results) => {
    //     if(err) return console.log('Unable to inset User', err);
    //     console.log(JSON.stringify(results.ops,undefined,2));
    // })
    
    DB.close();
})