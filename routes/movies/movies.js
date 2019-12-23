const express = require('express');

const { bodyValidator } = require('../../tools/bodyValidator');
const { requireOneOfBodyParams } = require('../../tools/requireOneOfBodyParams');
const { wrap } = require('../../middlewares/wrap');
const moviesConfig = require('../../config/movies');
const movies = require('../../modules/movies');
const { movieSchema } = require('./schemas');

const router = express.Router();

router.post(
    '/',
    requireOneOfBodyParams(moviesConfig.requiredMovieParams),
    bodyValidator(movieSchema),
    wrap(async (req, res) => {
        const createdMovie = await movies.create(req.body);

        res.status(200).json({ success: true, movie: createdMovie });
    })
);

router.get(
    '/',
    wrap(async (req, res) => {
        const existentMovies = await movies.show();

        res.status(200).json({ success: true, movies: existentMovies });
    })
);

module.exports = router;
