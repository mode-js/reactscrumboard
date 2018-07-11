/* globals describe it before after */
// const { expect } = require('chai');
const request = require('supertest');
const app = require('../server/server');
console.log(app);

const HOST = 'http://localhost:3000';

describe('Server routes for board', () => {
  describe('GET /allboards', (done) => {
    request(app)
      .get('/allboards')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
