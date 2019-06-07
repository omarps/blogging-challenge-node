require('dotenv').config();

const app = require('./app/server');

// start app
const port = process.env.REST_API_PORT || '3000';
app.listen(port);
console.log(`Listening on ${port}`);
