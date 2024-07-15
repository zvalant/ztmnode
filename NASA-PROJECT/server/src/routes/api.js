const express = require('express');

const planetsRouter = require('./planets/planets.router');
const launchesRounter = require('./launches/launches.router');

const api = express.Router();

api.use('/planets', planetsRouter);
api.use('/launches', launchesRounter);

module.exports = api;