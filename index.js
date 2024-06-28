'use strict';

require('zv-dotenv')();

const app = require('./app');

const port = process.env.PORT || 8080;

app.listen(port, () => console.info(`Backend API listening on port ${port}`));

module.exports = app;
