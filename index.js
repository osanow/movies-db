require('dotenv').config();
const { createServer } = require('./libs/httpServer');
const app = require('./app');

createServer(app);
