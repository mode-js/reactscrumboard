/* globals describe it before after */
/* eslint no-unused-expressions: 0 */
const { expect } = require('chai');
const { Client } = require('pg');

const getFields = result => result.fields.map(field => field.name);

describe('RSB Database', () => {
  let client;
  before((done) => {
    client = new Client({
      user: 'rsbtest',
      password: 'ilovetesting',
      host: 'localhost',
      database: 'rsb-test',
    });
    client.connect();
    done();
  });

  after(() => {
    client.end();
  });

  describe('board table', () => {
    it('should exist', (done) => {
      const exists = `
        SELECT COUNT(*)
        FROM information_schema.tables
        WHERE table_name = 'boards'
      `;
      client.query(exists, (err, result) => {
        expect(err).to.be.null;
        expect(result.rows[0].count).to.eq('1');
        done();
      });
    });

    it('should have _id and title fields', (done) => {
      const snapshot = 'select * from boards limit 1;';
      client.query(snapshot, (err, result) => {
        expect(err).to.be.null;
        if (err) {
          done();
          throw new Error(err);
        }
        const fields = getFields(result);
        expect(fields).to.include('_id');
        expect(fields).to.include('title');
        done();
      });
    });
  });

  describe('user table', () => {
    it('should exist', (done) => {
      const exists = `
        SELECT COUNT(*)
        FROM information_schema.tables
        WHERE table_name = 'users'
      `;
      client.query(exists, (err, result) => {
        expect(err).to.be.null;
        expect(result.rows[0].count).to.eq('1');
        done();
      });
    });

    it('should have _id, display_name, email, and password fields', (done) => {
      const snapshot = 'select * from users limit 1;';
      client.query(snapshot, (err, result) => {
        expect(err).to.be.null;
        if (err) {
          done();
          throw new Error(err);
        }
        const fields = getFields(result);
        expect(fields).to.include('_id');
        expect(fields).to.include('display_name');
        expect(fields).to.include('email');
        expect(fields).to.include('password');
        done();
      });
    });
  });

  describe('card table', () => {
    it('should exist', (done) => {
      const exists = `
        SELECT COUNT(*)
        FROM information_schema.tables
        WHERE table_name = 'cards'
      `;
      client.query(exists, (err, result) => {
        expect(err).to.be.null;
        expect(result.rows[0].count).to.eq('1');
        done();
      });
    });

    it('should have _id, content, board_id, status and completed fields', (done) => {
      const snapshot = 'select * from cards limit 1;';
      client.query(snapshot, (err, result) => {
        expect(err).to.be.null;
        if (err) {
          done();
          throw new Error(err);
        }
        const fields = getFields(result);
        expect(fields).to.include('_id');
        expect(fields).to.include('content');
        expect(fields).to.include('board_id');
        expect(fields).to.include('status');
        expect(fields).to.include('completed');
        done();
      });
    });
  });

  describe('board_permissions table', () => {
    it('should exist', (done) => {
      const exists = `
        SELECT COUNT(*)
        FROM information_schema.tables
        WHERE table_name = 'board_permissions'
      `;
      client.query(exists, (err, result) => {
        expect(err).to.be.null;
        expect(result.rows[0].count).to.eq('1');
        done();
      });
    });

    it('should have _id, board_id, and owner_id fields', (done) => {
      const snapshot = 'select * from board_permissions limit 1;';
      client.query(snapshot, (err, result) => {
        expect(err).to.be.null;
        if (err) {
          done();
          throw new Error(err);
        }
        const fields = getFields(result);
        expect(fields).to.include('_id');
        expect(fields).to.include('board_id');
        expect(fields).to.include('user_id');
        done();
      });
    });
  });
});

