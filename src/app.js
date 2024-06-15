const express = require('express');
const path = require('path');

const app = express();

// sets
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', require('./routes'));

module.exports = app;