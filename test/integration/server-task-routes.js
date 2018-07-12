/* globals xdescribe describe it before after */
/* eslint global-require: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
/* eslint no-global-assign: 0 */

const { expect } = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');

describe('Server routes for tasks', () => {
  let server;

  before(() => {
    const serverAndDb = require('../../server/server.js');
    server = serverAndDb.server;
  });

  describe('GET /alltasks', () => {
    it('should return an array', (done) => {
      request(server)
        .get('/alltasks')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).to.be.an('Array');
          done();
        })
        .catch(done);
    });

    it('should contain task objects', (done) => {
      request(server)
        .get('/alltasks')
        .then((res) => {
          const [first] = res.body.slice(-1);
          expect(first).to.be.an('Object');
          expect(first).to.have.property('_id');
          expect(first).to.have.property('name');
          expect(first).to.have.property('status');
          done();
        })
        .catch(done);
    });
  });

  describe('GET /tasks?board_id=int', () => {
    let firstBoardId;

    before((done) => {
      request(server)
        .get('/alltasks')
        .then(({ body }) => {
          [firstBoardId] = body.map(el => el.boardId).filter(el => el);
          done();
        })
        .catch(done);
    });

    it('should return an array', (done) => {
      request(server)
        .get(`/tasks?board_id=${firstBoardId}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).to.be.an('Array');
          done();
        })
        .catch(done);
    });

    it('should contain Task objects', (done) => {
      request(server)
        .get(`/tasks?board_id=${firstBoardId}`)
        .then((res) => {
          const [first] = res.body.slice(-1);
          expect(first).to.have.property('_id');
          expect(first).to.have.property('name');
          expect(first).to.have.property('status');
          done();
        })
        .catch(done);
    });

    it('should return only the tasks belonging to that board', (done) => {
      request(server)
        .get(`/tasks/?board_id=${firstBoardId}`)
        .then((res) => {
          const ids = res.body.map(task => task.boardId);
          const uniq = [...new Set(ids)];
          expect(uniq).to.have.length(1);
          expect(uniq[0]).to.eq(firstBoardId);
          done();
        })
        .catch(done);
    });
  });

  describe('POST and DELETE /tasks', () => {
    let createdId;
    it('POST should create a new task with matching values', (done) => {
      request(server)
        .post('/tasks')
        .send({ name: 'test', boardId: '1', status: 'todo' })
        .expect(200)
        .then(({ body }) => {
          expect(body.boardId).to.eq('1');
          expect(body.name).to.eq('test');
          expect(body.status).to.eq('todo');
          expect(body).to.have.property('_id');
          createdId = body._id;
          done();
        })
        .catch(done);
    });

    it('DELETE should delete a task', (done) => {
      request(server)
        .delete(`/tasks?_id=${createdId}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.eq(1);
          done();
        })
        .catch(done);
    });
  });
});

