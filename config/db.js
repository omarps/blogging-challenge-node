const mongoose = require('mongoose');
// TODO: add variables
const mongodb_host = 'localhost';
const mongodb_port = '27017';
const mongodb_name = 'blog';

mongoose.Promise = global.Promise;

const mongo_url =
  `mongodb://${mongodb_host}:${mongodb_port}/${mongodb_name}?connectTimeoutMS=600000&socketTimeoutMS=600000`

  // Connect to db
const db = mongoose.createConnection(mongo_url);
db.on('error', console.error.bind(console, 'connection error:'));

db.on('open', () =>
  console.log('mongodb connection open to:', mongo_url));

module.exports = db;
