const mongoose = require('mongoose');
let mongodb_host, mongodb_port, mongodb_name;
if(process.env.NODE_ENV === 'test') {
  mongodb_host = 'localhost';
  mongodb_port = '27017';
  mongodb_name = 'blog-test';
} else {
  mongodb_host = 'localhost';
  mongodb_port = '27017';
  mongodb_name = 'blog';
}

mongoose.Promise = global.Promise;

const mongo_url =
  `mongodb://${mongodb_host}:${mongodb_port}/${mongodb_name}?connectTimeoutMS=600000&socketTimeoutMS=600000`;

  // Connect to db
const db = mongoose.createConnection(mongo_url);
db.on('error', console.error.bind(console, 'connection error:'));

db.on('open', () =>
  console.log('mongodb connection open to:', mongo_url));

module.exports = db;
