const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../model/todo');
const {User} = require('../model/user');

const todos = [{
    text: 'first test todo'
},{
    text: 'second test tood'
}];

// beforeEach( (done) => {
//     Todo.remove({}).then( () => {
//         return Todo.insertMany(todos);
//     }).then(() => done());
// });

// describe('Post /todos', () => {
//     it('should create a new todo', (done) => {
//         var text = "test todo text";

//         request(app)
//         .post('/todos')
//         .send({text})
//         .expect(200)
//         .expect( (res) => {
//             expect(res.body.text).toBe(text);
//         })
//         .end( (err, res) => {
//             if(err) return done(err);
//             Todo.find().then( (todos) => {
//                 expect(todos.length).toBe(1);
//                 expect(todos[0].text).toBe(text);
//                 done();
//             }).catch( (e) => done(e));
//         });
//     });
// });

// it('should not create todo with invalid body data', (done)=> {
//     request(app)
//         .post('/todo')
//         .send({})
//         .expect(404)
//         .expect( (res) => {
            
//         })
//         .end( (err, res) => {
//             if(err) return done(err);

//             Todo.find().then( (todos) => {
//                 expect(todos.length).toBe(2);
//                 // expect(todos[0]).toBe({});
//                 done();
//             }).catch( (err) => done(e));
//         })
// })

// describe('GET /toods', () => {
//     it('should get all todos', (done) => {
//         request(app)
//             .get('/todos')
//             .expect(200)
//             .expect( (res) => {
//                 expect(res.body.todos.length).toBe(2);
//             })
//             .end(done);
//     });
// });

// describe('DELETE /todos/:id', () => {
//     it('should remove a tood', (done) => {
//         var hexId = todos[1]._id.toHexString();

//         request(app).
//             delete(`/todos/${hexId}`)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todo._id).toBe(hexId);
//             })
//             .end( (err,res) => {
//                 if(err) return done(err);
//                  Todo.findById(hexId).then( (todo) => {
//                      expect(todo).toNotExist();
//                      done();
//                  }).catch( (e) => done(e));
//             })
//     });

//     it('should return 404 if todo not found', (done) => {

//     });

//     it('should return 400 if object id is invalid', (done) => {

//     });
// })