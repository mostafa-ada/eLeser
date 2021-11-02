import chai from 'chai';
import 'mocha';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
const localhost = 'http://localhost:5000'

// test student routes
describe('test Story Routes', () => {

    //
    it('should get all stories', (done) => {
        chai.request(localhost)
            .get('/api/story/getall')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    });
    //
    it('should get one story by id ', (done) => {
        chai.request(localhost)
            .get('/api/story/getone/:_id')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should add story', (done) => {
        chai.request(localhost)
            .get('/api/story/add')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should search', (done) => {
        chai.request(localhost)
            .get('/api/story/search')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should update one stody by id', (done) => {
        chai.request(localhost)
            .get('/api/story/update/:_id')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should update story with text', (done) => {
        chai.request(localhost)
            .get('/api/story/update/text/:_id')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should rename Field', (done) => {
        chai.request(localhost)
            .get('/api/story/rename/language')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should addField', (done) => {
        chai.request(localhost)
            .get('/api/story/addField')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })

    //
    it('should delete more', (done) => {
        chai.request(localhost)
            .get('/api/story/delete/more/:_idList')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })

    //
    it('should delete one story by id', (done) => {
        chai.request(localhost)
            .get('/api/story/delete/one/:_id')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })




})