'use strict';

require('dotenv').config({path: `${__dirname}/./.test.env`});

const superagent = require('superagent');
const expect = require('expect');
const faker = require('faker');
const server = require('../lib/server.js');
const Dog = require('../model/dog.js');

const API_URL = process.env.API_URL;

describe('testing dogRouter.js', () => {
  before(server.start);
  after(server.stop);

  describe('testing POST /api/dogs', () => {
    after(() => Dog.remove({}));

    let tempDog = {
      name: faker.name.firstName(),
      age: faker.random.number(),
      breed: faker.name.lastName(),
    };
    it('should return a 200 and body data after sending proper request', () => {
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
    it('without a name should return a 400 with invalid body error', () => {
      return superagent.post(`${API_URL}/api/dogs`)
        .send({
          age: faker.random.number(),
          breed: faker.name.lastName(),
        })
        .catch((err) => {
          expect(err.status).toEqual(400);
        });
    });
    it('without an age should return a 400 with invalid body error', () => {
      return superagent.post(`${API_URL}/api/dogs`)
        .send({
          name: faker.name.firstName(),
          breed: faker.name.lastName(),
        })
        .catch((err) => {
          expect(err.status).toEqual(400);
        });
    });
    it('without a breed should return a 400 with invalid body error', () => {
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
    let tempDog;
    afterEach(() => Dog.remove({}));
    beforeEach(() => {
      return new Dog({
        name: faker.name.firstName(),
        age: faker.random.number(),
        breed: faker.name.lastName(),
      })
        .save()
        .then((dog) => {
          tempDog = dog;
        });
    });
    it('proper GET should return 200 and body data', () => {
      return superagent.get(`${API_URL}/api/dogs/${tempDog._id}`)
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual(tempDog.name);
          expect(res.body.age).toEqual(tempDog.age);
          expect(res.body.breed).toEqual(tempDog.breed);
        });
    });
    it('GET with no ID should return 404 not found', () => {
      return superagent.get(`${API_URL}/api/dogs/`)
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
    it('GET with ID that does not match should return 404 not found', () => {
      return superagent.get(`${API_URL}/api/dogs/3`)
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
  });

  describe('testing PUT requests', () => {
    let tempDog;
    afterEach(() => Dog.remove({}));
    beforeEach(() => {
      return new Dog({
        name: faker.name.firstName(),
        age: faker.random.number(),
        breed: faker.name.lastName(),
      })
        .save()
        .then((dog) => {
          tempDog = dog;
        });
    });
    it('proper PUT should return a new dog and 200', () => {
      return superagent.put(`${API_URL}/api/dogs/${tempDog._id}`)
        .send({
          name: faker.name.firstName(),
          age: faker.random.number(),
          breed: faker.name.lastName(),
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempDog._id);
          expect(res.body.name).toExist();
          expect(res.body.age).toExist();
          expect(res.body.breed).toExist();
        });
    });
    it('PUT no age should return a new dog with same age and 200', () => {
      return superagent.put(`${API_URL}/api/dogs/${tempDog._id}`)
        .send({
          name: faker.name.firstName(),
          breed: faker.name.lastName(),
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempDog._id);
          expect(res.body.name).toExist();
          expect(res.body.age).toEqual(tempDog.age);
          expect(res.body.breed).toExist();
        });
    });
    it('PUT no name should return a new dog with same name and 200', () => {
      return superagent.put(`${API_URL}/api/dogs/${tempDog._id}`)
        .send({
          age: faker.random.number(),
          breed: faker.name.lastName(),
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempDog._id);
          expect(res.body.name).toEqual(tempDog.name);
          expect(res.body.age).toExist();
          expect(res.body.breed).toExist();
        });
    });
    it('PUT no breed should return a new dog with same breed and 200', () => {
      return superagent.put(`${API_URL}/api/dogs/${tempDog._id}`)
        .send({
          name: faker.name.firstName(),
          age: faker.random.number(),
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempDog._id);
          expect(res.body.name).toExist();
          expect(res.body.age).toExist();
          expect(res.body.breed).toEqual(tempDog.breed);
        });
    });
    it('PUT with no send/body data should return 400', () => {
      return superagent.put(`${API_URL}/api/dogs/${tempDog._id}`)
        .send({})
        .catch((err) => {
          expect(err.status).toEqual(400);
        });
    });
    it('PUT with no id should return 404', () => {
      return superagent.put(`${API_URL}/api/dogs/`)
        .send({
          name: faker.name.firstName(),
          age: faker.random.number(),
          breed: faker.name.lastName(),
        })
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
    it('PUT with a bad id should return 404', () => {
      return superagent.put(`${API_URL}/api/dogs/3`)
        .send({
          name: faker.name.firstName(),
          age: faker.random.number(),
          breed: faker.name.lastName(),
        })
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
  });

  describe('testing DELETE requests', () => {
    let tempDog;
    afterEach(() => Dog.remove({}));
    beforeEach(() => {
      return new Dog({
        name: faker.name.firstName(),
        age: faker.random.number(),
        breed: faker.name.lastName(),
      })
        .save()
        .then((dog) => {
          tempDog = dog;
        });
    });
    it('should delete dog and respond with 204', () => {
      return superagent.delete(`${API_URL}/api/dogs/${tempDog._id}`)
        .then((res) => {
          expect(res.status).toEqual(204);
        });
    });
    it('improper DELETE no id respond with 404', () => {
      return superagent.delete(`${API_URL}/api/dogs/`)
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
    it('improper DELETE bad id respond with 404', () => {
      return superagent.delete(`${API_URL}/api/dogs/3`)
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
  });

  describe('testing catch all 404', () => {
    it('should respond with a 404 bad url', () => {
      return superagent.get(`${API_URL}/potato/crisps`)
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
  });
});
