const {
    MongoClient,
    ObjectID
} = require('mongodb');

const dbURL = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(dbURL, (err, DB) => {
    if (err) return console.log('Unable to connect to MongoDB server', err);
    var db = DB.db('TodoApp');

    deleteMany
    db.collection('Todos').deleteMany({
        text: 'eat lunch'
    }).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to fetch ', err)
    })

    deleteOne
    db.collection('Todos').deleteOne({
        text: 'eat lunch'
    }).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to fetch ', err)
    })

    findOneAndDelete
    db.collection('Todos').findOneAndDelete({
        text: 'eat lunch'
    }).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to fetch ', err)
    })

    db.collection('Users').deleteMany({
        name: 'Brinda Subedi'
    });

    db.collection("Users").findOneAndDelete({
        _id: new ObjectID('5b15e6992c7e910db2e0a787')
    }).then((res) => {
        console.log(res);
    }, (err) => {
        console.log(err);
    })

})
