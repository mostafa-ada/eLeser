import chai from 'chai';
import 'mocha';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
const localhost = 'http://localhost:5000'

// test category routes
describe('test category Routes', () => {

    //
    it('should get all categories', (done) => {
        chai.request(localhost)
            .get('/api/category/all')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    });
    //
    it('should get one category by id ', (done) => {
        chai.request(localhost)
            .get('/api/category/one/:_id')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should get category by name', (done) => {
        chai.request(localhost)
            .get('/api/category/one/name/:_name')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should update category update', (done) => {
        chai.request(localhost)
            .get('/api/category/add')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should get one category by id', (done) => {
        chai.request(localhost)
            .get('/api/category/update/:_id')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })
    //
    it('should delete one category by id', (done) => {
        chai.request(localhost)
            .get('/api/category/delete/:_id')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                //
                done();
            })

    })



})