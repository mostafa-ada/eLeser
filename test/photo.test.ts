import chai from 'chai';
import 'mocha';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
const localhost = 'http://localhost:5000'

// test photo routes
describe('test photo Routes', () => {

    //
    it('should post one photo', (done) => {
        chai.request(localhost)
            .get('/api/photo/upload')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    });
    //
    it('should get one photo by id ', (done) => {
        chai.request(localhost)
            .get('/api/photo/:_id')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should get all photos ', (done) => {
        chai.request(localhost)
            .get('/api/photo/get/all')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should update photo by id', (done) => {
        chai.request(localhost)
            .get('/api/photo/update/:_id')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should delete one photo by id', (done) => {
        chai.request(localhost)
            .get('/api/photo/delete/:_id')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })



})