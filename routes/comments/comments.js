const express = require('express');

const { bodyValidator } = require('../../tools/bodyValidator');
const { wrap } = require('../../middlewares/wrap');
const comments = require('../../modules/comments');
const { commentSchema } = require('./schemas');

const router = express.Router();

router.post(
    '/',
    bodyValidator(commentSchema),
    wrap(async (req, res) => {
        const createdComment = await comments.create(req.body);

        res.status(200).json({ success: true, comment: createdComment });
    })
);

router.get(
    '/',
    wrap(async (req, res) => {
        res.status(200).json({});
    })
);

module.exports = router;
