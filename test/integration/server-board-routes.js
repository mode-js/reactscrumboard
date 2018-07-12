/* globals xdescribe describe it before after */
/* eslint global-require: 0 */
/* eslint no-underscore-dangle: 0 */

const { expect } = require('chai');
const request = require('supertest');
const sinon = require('sinon');

describe('Server routes for board', () => {
  let server;
  let createdId;

  before(() => {
    const userController = require('../../server/controllers/userController');
    sinon.stub(userController, 'checkUserAuth')
      .callsFake((req, res, next) => {
        req.user = {
          _id: 1,
          username: 'test',
          password: 'whatever',
        };
        next();
      });
    server = require('../../server/server.js').server;
  });

  describe('GET /allboards', () => {
    it('should return an array', (done) => {
      request(server).get('/allboards')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).to.be.an('Array');
          done();
        })
        .catch(done);
    });

    it('should return an array of Board objects', (done) => {
      request(server).get('/allboards')
        .then((res) => {
          expect(res.body[0]).to.be.an('Object');
          expect(res.body[0]).to.have.property('_id');
          expect(res.body[0]).to.have.property('name');
          done();
        })
        .catch(done);
    });
  });

  describe('POST /boards', () => {
    it('should create a new board with matching values', (done) => {
      request(server)
        .post('/boards')
        .send({ name: 'test' })
        .expect(200)
        .then(({ body }) => {
          // expect(body.owner_id).to.eq(1);
          expect(body.name).to.eq('test');
          expect(body).to.have.property('_id');
          createdId = body._id;
          done();
        })
        .catch(done);
    });
  });

  describe('GET /boards', () => {
    it('should return an array', (done) => {
      request(server)
        .get('/boards')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).to.be.an('Array');
          done();
        })
        .catch(done);
    });

    it('should contain Board objects', (done) => {
      request(server)
        .get('/boards')
        .then((res) => {
          expect(res.body[0]).to.have.property('_id');
          expect(res.body[0]).to.have.property('name');
          done();
        })
        .catch(done);
    });

    it('should return only the boards belonging to that user', (done) => {
      request(server)
        .get('/boards')
        .then((res) => {
          const ids = res.body.map(board => board.userId);
          const uniq = [...new Set(ids)];
          expect(uniq).to.have.length(1);
          expect(uniq[0]).to.eq('1');
          done();
        })
        .catch(done);
    });
  });

  describe('DELETE /boards', () => {
    it('should delete a board', (done) => {
      request(server)
        .delete(`/boards?_id=${createdId}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.eq(1);
          done();
        })
        .catch(done);
    });
  });
});
