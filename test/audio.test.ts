import chai from 'chai';
import 'mocha';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
const localhost = 'http://localhost:5000'

// test audio routes
describe('test audio Routes', () => {

    //
    it('should post one audio', (done) => {
        chai.request(localhost)
            .get('/api/audio/upload')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    });
    //
    it('should get one audio by id ', (done) => {
        chai.request(localhost)
            .get('/api/audio/:_id')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should get all audios ', (done) => {
        chai.request(localhost)
            .get('/api/audio/get/all')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should update audio by id', (done) => {
        chai.request(localhost)
            .get('/api/audio/update/:_id')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should delete one audio by id', (done) => {
        chai.request(localhost)
            .get('/api/audio/delete/:_id')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })



})