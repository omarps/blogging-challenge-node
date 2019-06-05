const express = require('express');
const posts = express.Router();
const all = require('./all');
const single = require('./single');

posts.use('/', all);
posts.use('/', single);

module.exports = posts;
