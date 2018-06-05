const {MongoClient, ObjectID} = require('mongodb');

const dbURL = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(dbURL, (err, DB) => {
    if(err) return console.log('Unable to connect to Mongo Server ',err);
    console.log('Connected to Mongo Server');

    var db = DB.db('TodoApp');

    // to update data from getting ID as a reference 
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5b15e4cb2c7e910db2e0a6cb")
    // },{
    //     $set: {
    //         completed: true
    //     }
    // },{
    //     returnOriginal: false
    // }).then( (result) => {
    //     console.log(result);
    //     DB.close();
    // })

    // updating name and incrementing age of users ObjectId("5b154fd660a15420b8bc7b4a")
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5b154fd660a15420b8bc7b4a")
    },{
        $set: {name: 'Dipesh'},
        $inc : {age: 2}
    }, {
        returnOriginal: false
    }).then( (res) => {
        console.log(res);
        DB.close();
    })

});