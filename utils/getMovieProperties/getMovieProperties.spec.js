const config = require('../../config/movies');
const getMovieProperties = require('./getMovieProperties');

describe('getMovieProperties', () => {
    const initialMovieProperties = config.movieProperties;

    afterEach(() => {
        config.movieProperties = initialMovieProperties;
    });

    it('should not include properties that are not included in config', () => {
        config.movieProperties = ['title', 'year'];

        const movieData = {
            title: 'some title',
            year: 1999,
            rating: '2/10'
        };

        const expectedMovieProperties = getMovieProperties(movieData);

        expect(expectedMovieProperties).toEqual({
            title: 'some title',
            year: 1999
        });
    });

    it('should be case insensitive', () => {
        config.movieProperties = ['title', 'year'];

        const movieData = {
            TiTlE: 'some title',
            Year: 1999
        };

        const expectedMovieProperties = getMovieProperties(movieData);

        expect(expectedMovieProperties).toEqual({
            title: 'some title',
            year: 1999
        });
    });

    it('should filter unknown data', () => {
        config.movieProperties = ['title', 'year', 'metadata'];

        const movieData = {
            title: 'some title',
            year: 1999,
            metadata: 'N/A'
        };

        const expectedMovieProperties = getMovieProperties(movieData);

        expect(expectedMovieProperties).toEqual({
            title: 'some title',
            year: 1999
        });
    });
});
