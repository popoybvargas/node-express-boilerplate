'use strict';

const express = require('express');

const router = express.Router();

router.get('/info', (_, res) => res.send('Backend API boilerplate'));

module.exports = router;