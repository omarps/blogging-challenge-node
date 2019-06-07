const routes = require('express').Router();

// root
routes.get('/', (req, res) => {
  res.json({ 'error' : false, 'message': 'Connected!' });
});

// health check
routes.get('/health', (req, res) => {
  res.sendStatus(200);
});

// required routes
const posts = require('./posts');

// using routes
routes.use('/posts', posts);

module.exports = routes;
