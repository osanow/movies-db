const express = require('express');

const { bodyValidator } = require('../../tools/bodyValidator');
const { wrap } = require('../../middlewares/wrap');
const { commentSchema } = require('./schemas');

const router = express.Router();

router.post(
    '/',
    bodyValidator(commentSchema),
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
