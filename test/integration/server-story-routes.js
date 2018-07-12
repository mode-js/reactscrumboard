/* globals xdescribe describe it before after */
/* eslint global-require: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
/* eslint no-global-assign: 0 */

const { expect } = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');

describe('Server routes for stories', () => {
  let server;

  before(() => {
    server = require('../../server/server.js');
  });

  after((done) => {
    server.close();
    mongoose.connection.close(done);
  });

  describe('GET /allstories', () => {
    it('should return an array', (done) => {
      request(server)
        .get('/allstories')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).to.be.an('Array');
          done();
        })
        .catch(done);
    });

    it('should return an array of story objects', (done) => {
      request(server)
        .get('/allstories')
        .then((res) => {
          console.log(res.body[0]);
          expect(res.body[0]).to.be.an('Object');
          expect(res.body[0]).to.have.property('_id');
          expect(res.body[0]).to.have.property('name');
          expect(res.body[0]).to.have.property('done');
          expect(res.body[0]).to.have.property('boardId');
          done();
        })
        .catch(done);
    });
  });

  describe('GET /boards/', () => {
    let firstBoardId;

    before((done) => {
      request(server)
        .get('/allboards')
        .then(({ body }) => {
          firstBoardId = body.map(el => el.userId).filter(el => el)[0];
          done();
        })
        .catch(done);
    });

    it('should return an array', (done) => {
      request(server)
        .get(`/boards?user_id=${firstBoardId}`)
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
        .get(`/boards/?user_id=${firstBoardId}`)
        .then((res) => {
          expect(res.body[0]).to.have.property('_id');
          expect(res.body[0]).to.have.property('name');
          done();
        })
        .catch(done);
    });

    it('should return only the boards belonging to that user', (done) => {
      request(server)
        .get(`/boards/?user_id=${firstBoardId}`)
        .then((res) => {
          const ids = res.body.map(board => board.userId);
          const uniq = [...new Set(ids)];
          expect(uniq).to.have.length(1);
          expect(uniq[0]).to.eq(firstBoardId);
          done();
        })
        .catch(done);
    });
  });

  xdescribe('POST and DELETE /boards', () => {
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
