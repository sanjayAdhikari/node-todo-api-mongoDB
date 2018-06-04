const {MongoClient, ObjectID} = require('mongodb');

const dbURL = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(dbURL, (err, DB) => {
    if(err) return console.log('Unable to connect to MongoDB server',err);
    var db = DB.db('TodoApp');

    // db.collection('Todos').find({_id: new ObjectID('5b154e0e84f67a2914bfa8aa')}).toArray().then( (resolve) => {
    //     console.log(JSON.stringify(resolve,undefined,2));
    //     DB.close();
    // }, (reject) => {
    //     if(reject) console.log('unable to find data',reject);
    //     DB.close();
    // });

    db.collection('Todos').find().count().then( (count) => {
        console.log('Todos count:',count);
        DB.close();
    }, (err) => {
        if(err) console.log('unable to find data',err);
        DB.close();
    });

})