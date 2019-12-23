// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest');
const Movie = require('../models/movie');
const Comment = require('../models/comment');

async function createServer() {
    const server = request.agent(require('../index'));

    await cleanup();

    async function createMovie(props) {
        return new Movie(props).save();
    }

    async function createComment(props) {
        return new Comment(props).save();
    }

    async function cleanup() {
        return Promise.all([Movie.deleteMany({}), Comment.deleteMany({})]);
    }

    return {
        cleanup,
        createComment,
        createMovie,
        get: server.get.bind(server),
        put: server.put.bind(server),
        post: server.post.bind(server),
        delete: server.delete.bind(server)
    };
}

module.exports = { createServer };
