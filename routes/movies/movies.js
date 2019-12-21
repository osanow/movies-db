const express = require('express');

const { bodyValidator } = require('../../tools/bodyValidator');
const { wrap } = require('../../middlewares/wrap');
const { movieSchema } = require('./schemas');

const router = express.Router();

router.post(
    '/',
    bodyValidator(movieSchema),
    wrap(async (req, res) => {
        res.status(200).json({});
    })
);

router.get(
    '/',
    wrap(async (req, res) => {
        res.status(200).json({});
    })
);

module.exports = router;
