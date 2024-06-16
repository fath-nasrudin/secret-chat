const express = require('express');
const path = require('path');
const session = require('express-session');
const config = require('./config');
const authentication = require('./utils/authentication');
const flash = require('connect-flash');

const app = express();

// sets
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(flash());

// use session middleware
app.use(session(config.sessionConfig));

// initialize authentication middleware
authentication.initialize(app);

// routes
app.use('/', require('./routes'));

module.exports = app;