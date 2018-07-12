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
  let sequelize;

  before(() => {
    const serverAndDb = require('../../server/server.js');
    server = serverAndDb.server;
    sequelize = serverAndDb.sequelize;
  });

  after((done) => {
    server.close();
    mongoose.connection.close(done);
    sequelize.close();
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

    it('should contain story objects', (done) => {
      request(server)
        .get('/allstories')
        .then((res) => {
          const first = res.body[0];
          expect(first).to.be.an('Object');
          expect(first).to.have.property('_id');
          expect(first).to.have.property('name');
          expect(first).to.have.property('done');
          expect(first).to.have.property('boardId');
          done();
        })
        .catch(done);
    });
  });

  describe('GET /stories?board_id=string', () => {
    let firstBoardId;

    before((done) => {
      request(server)
        .get('/allstories')
        .then(({ body }) => {
          [firstBoardId] = body.map(el => el.boardId).filter(el => el);
          done();
        })
        .catch(done);
    });

    it('should return an array', (done) => {
      request(server)
        .get(`/stories?board_id=${firstBoardId}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).to.be.an('Array');
          done();
        })
        .catch(done);
    });

    it('should contain Story objects', (done) => {
      request(server)
        .get(`/stories/?board_id=${firstBoardId}`)
        .then((res) => {
          const [first] = res.body;
          expect(first).to.have.property('_id');
          expect(first).to.have.property('name');
          expect(first).to.have.property('done');
          expect(first).to.have.property('boardId');
          done();
        })
        .catch(done);
    });

    it('should return only the stories belonging to that board', (done) => {
      request(server)
        .get(`/stories/?board_id=${firstBoardId}`)
        .then((res) => {
          const ids = res.body.map(story => story.boardId);
          const uniq = [...new Set(ids)];
          expect(uniq).to.have.length(1);
          expect(uniq[0]).to.eq(firstBoardId);
          done();
        })
        .catch(done);
    });
  });

  describe('POST, UPDATE, and DELETE /stories', () => {
    let createdId;
    it('POST should create a new story with matching values', (done) => {
      request(server)
        .post('/stories')
        .send({ name: 'test', boardId: '1', done: false })
        .expect(200)
        .then(({ body }) => {
          expect(body.boardId).to.eq('1');
          expect(body.name).to.eq('test');
          expect(body.done).to.eq(false);
          expect(body).to.have.property('_id');
          createdId = body._id;
          done();
        })
        .catch(done);
    });

    it('UPDATE should change an existing story', (done) => {
      request(server)
        .post('/updatestories')
        .send({ _id: createdId, done: true })
        .expect(200)
        .then(({ body }) => {
          expect(body.done).to.eq(true);
        })
        .catch(console.error);

      request(server)
        .get(`/stories?board_id=${1}`)
        .then(({ body }) => {
          const [story] = body.filter(record => record._id === createdId);
          expect(story.done).to.eq(true);
          done();
        })
        .catch(done);
    });

    it('DELETE should delete a story', (done) => {
      request(server)
        .delete(`/stories?_id=${createdId}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.eq(1);
          done();
        })
        .catch(done);
    });
  });
});
