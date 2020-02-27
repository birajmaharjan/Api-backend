const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const chaiLike = require('chai-like');
const chaiThings = require('chai-things');

const server = require('../index');
var serverRun;
chai.use(chaiHttp);
chai.use(chaiLike);
chai.use(chaiThings);



before(done => {
    server.listen(4001, done);
});
after(done => {
    server = serverRun.close(done);
});
describe('Add pet', function() {
    describe('POST register', function() {
        it('it should add pet', function(done) {
            chai.request(server)
                .post('/v1/addpet')
                .send({
                    "petname": "Dany",
                    "breed": "Dog",
                    "type": "Dog",
                    "pet_image": "dog.jpg",
                    "age": "12",
                    "gender": "male",
                })
                .end(function(err, res) {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    done()

                }) }) })

})



describe('Delete Pet', function() {
    petid = 12;
    it('it should delete the pet', function(done) {
        chai.request(server)
            .delete('/v1/pet/delete/' + petid)
            .end(function(err, res) {
                res.should.have.status(201);
                res.body.should.have.property('message');
                done();
            })
    })


});



describe('Pet Update', function() {
    describe('update pett detail ', function() {
        petid = 6;
        it('it should update the notice', function(done) {
            chai.request(server)
                .put('/v1/pet/update/' + petid)
                .send({
                    'petname': 'doogy',
                    'petage': '12'
                })
                .end(function(err, res) {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    done()

                });

        })
    })
});


//getting
describe('PetDetail', () => {
    describe('/GET Pet info', () => {
        it('it should GET all the Pet', (done) => {
            chai.request(server)
                .get('/v1/getpet')
                .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhpdDIiLCJhY2Nlc3NMZXZlbCI6ImFkbWluIiwiaWF0IjoxNTYyNDI5MzAxLCJleHAiOjE1NjI0NjUzMDF9.xp18eJvCiITXsIQ2IkUmKyDTpQZ8zDp6Dsh-3WyKqok')
                .end((err, res) => {
                    // console.log(err);
                    // console.log(res);
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    res.body.should.all.have.property('petid');
                    res.body.should.all.have.property('petname');
                    res.body.should.all.have.property('petage');
                    res.body.length.should.be.above(0);
                    done();
                })
        })
    })
})






















// before(function(done) {
//     serverRun = server.listen(5000, done)
// })