const express = require('express');

const app = express();

// routes
app.use('/', require('./routes'));

module.exports = app;