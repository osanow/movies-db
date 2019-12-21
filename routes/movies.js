const express = require('express');
const { wrap } = require('../middlewares/wrap');

const router = express.Router();

router.post(
    '/',
    wrap(async (req, res) => {
        res.json({});
    })
);

router.get(
    '/',
    wrap(async (req, res) => {
        res.json({});
    })
);

module.exports = router;
