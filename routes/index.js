const express = require('express');

const router = express.Router();

router.use('/movies', require('./movies'));
router.use('/comments', require('./comments'));

router.use('/healthcheck', (req, res) => res.status(200).json({ success: true }));

module.exports = router;
