/* globals xdescribe describe it before after */
/* eslint global-require: 0 */
/* eslint no-underscore-dangle: 0 */

const { expect } = require('chai');
const request = require('supertest');
const sinon = require('sinon');

describe('Server routes for board', () => {
  let server;

  before(() => {
    const userController = require('../../server/controllers/userController');
    sinon.stub(userController, 'checkUserAuth')
      .callsFake((req, res, next) => next());
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

  describe('GET /boards?user_id=string', () => {
    let firstUserId;

    before((done) => {
      request(server)
        .get('/allboards')
        .then(({ body }) => {
          [firstUserId] = body.map(el => el.userId).filter(el => el);
          done();
        })
        .catch(done);
    });

    it('should return an array', (done) => {
      request(server)
        .get(`/boards?user_id=${firstUserId}`)
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
        .get(`/boards/?user_id=${firstUserId}`)
        .then((res) => {
          expect(res.body[0]).to.have.property('_id');
          expect(res.body[0]).to.have.property('name');
          done();
        })
        .catch(done);
    });

    it('should return only the boards belonging to that user', (done) => {
      request(server)
        .get(`/boards/?user_id=${firstUserId}`)
        .then((res) => {
          const ids = res.body.map(board => board.userId);
          const uniq = [...new Set(ids)];
          expect(uniq).to.have.length(1);
          expect(uniq[0]).to.eq(firstUserId);
          done();
        })
        .catch(done);
    });
  });

  describe('POST and DELETE /boards', () => {
    let createdId;
    it('POST should create a new board with matching values', (done) => {
      request(server)
        .post('/boards')
        .send({ name: 'test', userId: '1' })
        .expect(200)
        .then(({ body }) => {
          expect(body.userId).to.eq('1');
          expect(body.name).to.eq('test');
          expect(body).to.have.property('_id');
          createdId = body._id;
          done();
        })
        .catch(done);
    });

    it('DELETE should delete a board', (done) => {
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
