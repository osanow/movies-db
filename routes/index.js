const express = require('express');

const router = express.Router();

router.use('/movies', require('./movies'));
router.use('/comments', require('./comments'));

module.exports = router;
