import chai from 'chai';
import 'mocha';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
const localhost = 'http://localhost:5000'

// test student routes
describe('test student Routes', () => {

    //
    it('should get all students', (done) => {
        chai.request(localhost)
            .get('/api/student/all')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })
   
    });
    //
    it('should get one student by id ', (done) => {
        chai.request(localhost)
            .get('/api/student/:id')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should student add', (done) => {
        chai.request(localhost)
            .get('/api/student/add')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should student update', (done) => {
        chai.request(localhost)
            .get('/api/student/update/:id')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should student login', (done) => {
        chai.request(localhost)
            .get('/api/student/login')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should student logout', (done) => {
        chai.request(localhost)
            .get('/api/student/logout/:_id')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should student change password', (done) => {
        chai.request(localhost)
            .get('/api/student/change/password/:_id')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should delete student', (done) => {
        chai.request(localhost)
            .get('/api/student/delete/:_id')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //



})