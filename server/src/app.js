const express = require('express');

const planetsRouter = require('./routes/plants/planets.router');

const app = express();

app.use(planetsRouter);

module.exports = app;