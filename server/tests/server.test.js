const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../model/todo');
const {User} = require('../model/user');

beforeEach( (done) => {
    Todo.remove({}).then( () => done());
});

describe('Post /todos', () => {
    it('should create a new todo', (done) => {
        var text = "test todo text";

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect( (res) => {
            expect(res.body.text).toBe(text);
        })
        .end( (err, res) => {
            if(err) return done(err);
            Todo.find().then( (todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch( (e) => done(e));
        });
    });




});

it('should not create todo with invalid body data', (done)=> {
    request(app)
        .post('/todo')
        .send({})
        .expect(404)
        .expect( (res) => {
            // expect(res.body).toBe({})
        })
        .end( (err, res) => {
            if(err) return done(err);

            Todo.find().then( (todos) => {
                expect(todos.length).toBe(0);
                // expect(todos[0]).toBe({});
                done();
            }).catch( (err) => done(e));
        })
})