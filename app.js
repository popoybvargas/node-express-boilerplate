'use strict';

const { randomUUID } = require('crypto');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const router = require('./router');
const { version } = require('./package.json');

const app = express();
const LIMITER = { windowMs: 30 * 1000, max: 20 };	// max of 20 requests within 30 secs from the same IP;
const limiter = rateLimit(LIMITER);
const speedLimiter = slowDown({ windowMs: 30 * 1000, delayAfter: 20, delayMs: () => 500 });	// delay by 500 ms succeeding requests, after the 20th one, from the same IP within 30 secs

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(limiter);
app.use(speedLimiter);

app.use((req, _, next) =>
{
	const reqId = randomUUID();
	req._id = reqId;
	console.log(`------------ START OF (${reqId}) REQUEST (app version: ${version}) ------------`);

	next();
});

app.use('/', router);
app.use('/', (_, res) => res.send('Backend API boilerplate'));

module.exports = app;