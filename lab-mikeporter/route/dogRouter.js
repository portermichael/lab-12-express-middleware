'use script';

const {Router} = require('express');
const jsonParser = require('body-parser').json();

const Dog = require('../model/dog.js');

const dogRouter = module.exports = new Router();

dogRouter.post('/api/dogs', jsonParser, (req, res, next) => {
  new Dog(req.body)
    .save()
    .then((dog) => res.json(dog))
    .catch(next);
});

dogRouter.get('/api/dogs/:id', (req, res, next) => {
  Dog.findById(req.params.id)
    .then((dog) => res.json(dog))
    .catch(next);
});

dogRouter.put('/api/dogs/:id', jsonParser, (req, res, next) => {
  let options = {
    new: true,
    runValidators: true,
  };
  Dog.findByIdAndUpdate(req.params.id, req.body, options)
    .then((dog) => res.json(dog))
    .catch(next);
});

dogRouter.delete('/api/dogs/:id', (req, res, next) => {
  Dog.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
