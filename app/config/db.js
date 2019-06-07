const mongoose = require('mongoose');
let mongodb_host, mongodb_port, mongodb_name;
if(process.env.NODE_ENV === 'test') {
  mongodb_host = process.env.TEST_MONGODB_HOST;
  mongodb_port = process.env.TEST_MONGODB_PORT;
  mongodb_name = process.env.TEST_MONGODB_DBNAME;
} else {
  mongodb_host = process.env.MONGODB_HOST;
  mongodb_port = process.env.MONGODB_PORT;
  mongodb_name = process.env.MONGODB_DBNAME;
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
