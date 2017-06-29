'use strict';

require('dotenv').config({path: `${__dirname}/./.test.env`});

const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = process.env.API_URL;
let tempDog;

describe('testing dogRouter.js', () => {
  before(server.start);
  after(server.stop);
  // afterEach(() => Dog.remove({}));

  describe('testing POST /api/dogs', () => {

    let tempDog = {
      name: 'Fido',
      age: 8,
      breed: 'Doberman',
    };
    console.log(tempDog, tempDog.age)
    it('should return a 200 and body data', () => {
      return superagent.post(`${API_URL}/api/dogs`)
        .send(tempDog)
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body_id).toExist();
          expect(res.body.name).toEqual(tempDog.name);
          expect(res.body.age).toEqual(tempDog.age);
          expect(res.body.breed).toEqual(tempDog.breed);
          tempDog = res.body;
        })
        .catch(err => console.error(err))
    });
  });

  // describe('testing GET requests', () => {
  //   it('', () => {
  //
  //   });
  // });
  //
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
