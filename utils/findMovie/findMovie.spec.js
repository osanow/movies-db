const Movie = require('../../models/movie');
const config = require('../../config/movies');
const findMovie = require('./findMovie');

jest.mock('../../models/movie');

describe('findMovie', () => {
    afterEach(() => {
        Movie.findOne.mockRestore();
    });

    it('should find movie by title if given', async () => {
        const movieData = {
            title: 'title'
        };

        await findMovie(movieData);

        expect(Movie.findOne).toBeCalledTimes(1);
        expect(Movie.findOne).toBeCalledWith({ title: { $eq: 'title' } });
    });

    it('should find movie by imdbid if given', async () => {
        const movieData = {
            imdbid: 'imdbid'
        };

        await findMovie(movieData);

        expect(Movie.findOne).toBeCalledTimes(1);
        expect(Movie.findOne).toBeCalledWith({ imdbid: { $eq: 'imdbid' } });
    });

    it('should find movie by title if title and id given', async () => {
        const movieData = {
            title: 'title',
            id: 'id'
        };

        await findMovie(movieData);

        expect(Movie.findOne).toBeCalledTimes(1);
        expect(Movie.findOne).toBeCalledWith({ title: { $eq: 'title' } });
    });

    it('should throw if no title and id given', async () => {
        const movieData = {
            year: 2000
        };

        await expect(findMovie(movieData)).rejects.toEqual(new Error(config.invalidMovieDataMessage));
    });
});
