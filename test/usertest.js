const chai = require("chai");
const chaihttp = require("chai-http");
const should = chai.should();
const chailike = require("chai-like");
const chaithings = require("chai-things");

const server = require('../index');
var serverRun;
chai.use(chaihttp);
chai.use(chailike);
chai.use(chaithings);


///include test case
///test of server running
before(done => {
        serverRun = server.listen(4010, done);
    })
    /////////////////////
    after(done => {
        serverRun.close(done);
    });

////occupation name added
////////////////////
var testUserdata = {
    'firstname': 'biraj',
    'lastname': 'maharjan',
    'email_address': 'mhzbiraj11@gmail.com',
    'address': 'lazimpath',
    'user_image': 'dog4.jpg',
    'username': 'apple',
    'password': 'home',
    'type': 'user'
};
// mocha function
describe("User Add", function() {
    describe("POST register", () => {
        it("it should register a name", (done) => {
            chai.request(server)
                .post("/v1/register").send(testUserdata)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    done();
                });
        })
    })

    describe('PUT user', function() {
        uid = 13;
        it('it should edit the user with new values', function(done) {
            chai.request(server)
                .put('/v1/updateUser/' + uid)
                .send({
                    'firstname': 'hoho',
                    'lastname': 'hoho'
                })
                .end(function(err, res) {
                    res.should.have.status(201);
                    res.body.should.have.property('message');
                    done();
                })
        })    });



    describe('delete user', function() {
        uid = 12;
        it('it should delete the user with new values', function(done) {
            chai.request(server)
                .delete('/v1/deleteuser/' + uid)
                // .send({
                //     'address': 'testAddress',
                //     'pass':'hit2'
                // })
                .end(function(err, res) {
                    res.should.have.status(201);
                    res.body.should.have.property('message');
                    done();
                })
        })


    });
})