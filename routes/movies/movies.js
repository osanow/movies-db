const express = require('express');

const { bodyValidator } = require('../../tools/bodyValidator');
const { requireOneOfBodyParams } = require('../../tools/requireOneOfBodyParams');
const { wrap } = require('../../middlewares/wrap');
const moviesConfig = require('../../config/movies');
const { movieSchema } = require('./schemas');

const router = express.Router();

router.post(
    '/',
    requireOneOfBodyParams(moviesConfig.requiredMovieParams),
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
