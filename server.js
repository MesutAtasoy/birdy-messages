const server = require('./app')();
const db = require('./configs/db');
require('dotenv/config')
server.create(process.env, db);
server.start();