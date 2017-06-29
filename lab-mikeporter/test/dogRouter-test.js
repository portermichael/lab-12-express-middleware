'use strict';

require('dotenv').config({path: `${__dirname}/./.test.env`});

const superagent = require('superagent');
const expect = require('expect');
const faker = require('faker');
const server = require('../lib/server.js');

const API_URL = process.env.API_URL;
let tempDog;

describe('testing dogRouter.js', () => {
  before(server.start);
  after(server.stop);
  // afterEach(() => Dog.remove({}));

  describe('testing POST /api/dogs', () => {

    let tempDog = {
      name: faker.name.firstName(),
      age: faker.random.number(),
      breed: faker.name.lastName(),
    };
    it('should return a 200 and body data', () => {
      return superagent.post(`${API_URL}/api/dogs`)
        .send(tempDog)
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual(tempDog.name);
          expect(res.body.age).toEqual(tempDog.age);
          expect(res.body.breed).toEqual(tempDog.breed);
          tempDog = res.body;
        });
    });
    it('should return a 409 with duplicate key error', () => {
      return superagent.post(`${API_URL}/api/dogs`)
        .send(tempDog)
        .catch((err) => {
          expect(err.status).toEqual(409);
        });
    });
    it('should return a 400 with invalid body error', () => {
      return superagent.post(`${API_URL}/api/dogs`)
        .send({
          age: faker.random.number(),
          breed: faker.name.lastName(),
        })
        .catch((err) => {
          expect(err.status).toEqual(400);
        });
    });
    it('should return a 400 with invalid body error', () => {
      return superagent.post(`${API_URL}/api/dogs`)
        .send({
          name: faker.name.firstName(),
          breed: faker.name.lastName(),
        })
        .catch((err) => {
          expect(err.status).toEqual(400);
        });
    });
    it('should return a 400 with invalid body error', () => {
      return superagent.post(`${API_URL}/api/dogs`)
        .send({
          name: faker.name.firstName(),
          age: faker.random.number(),
        })
        .catch((err) => {
          expect(err.status).toEqual(400);
        });
    });
  });

  describe('testing GET requests', () => {
    it('should return 200 and body data', () => {
      return superagent.get(`${API_URL}/api/dogs/${tempDog._id}`)
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual(tempDog.name);
          expect(res.body.age).toEqual(tempDog.age);
          expect(res.body.breed).toEqual(tempDog.breed);
        });
    });
  });

  // describe('testing PUT requests', () => {
  //   it('', () => {
  //
  //   });
  // });
  //
  // describe('testing DELETE requests', () => {
  //   it('', () => {
  //
  //   });
  // });
  //
  // describe('testing Other things requests', () => {
  //   it('', () => {
  //
  //   });
  // });
});
