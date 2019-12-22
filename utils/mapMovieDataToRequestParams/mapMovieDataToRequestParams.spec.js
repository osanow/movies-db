const movieConfig = require('../../config/movies');
const { BadRequestError } = require('../../tools/errors');
const { mapMovieDataToRequestParams, checkPlot, checkType } = require('./mapMovieDataToRequestParams');

describe('checkPlot', () => {
    const initialValidPlots = movieConfig.validPlotTypes;

    afterEach(() => {
        movieConfig.validPlotTypes = initialValidPlots;
    });

    it('should return undefined if there is no plot given', () => {
        const plot = checkPlot();

        expect(plot).toBe(undefined);
    });

    it('should return undefined if given plot is an empty string', () => {
        const plot = checkPlot('');

        expect(plot).toBe(undefined);
    });

    it('should return undefined if given plot is null', () => {
        const plot = checkPlot(null);

        expect(plot).toBe(undefined);
    });

    it('should throw BadRequestError if given plot is invalid', () => {
        movieConfig.validPlotTypes = ['validPlot', 'otherValidPlot'];

        expect(() => checkPlot('invalidPlot')).toThrow(
            new BadRequestError(
                `Wrong movie plot type given. Valid plot types: ${movieConfig.validPlotTypes.toString()}.`
            )
        );
    });

    it('should return given plot if valid', () => {
        movieConfig.validPlotTypes = ['validPlot', 'otherValidPlot'];

        const plot = checkPlot('validPlot');

        expect(plot).toBe('validPlot');
    });
});

describe('checkType', () => {
    const initialValidTypes = movieConfig.validMovieTypes;

    afterEach(() => {
        movieConfig.validMovieTypes = initialValidTypes;
    });

    it('should return undefined if there is no type given', () => {
        const type = checkType();

        expect(type).toBe(undefined);
    });

    it('should return undefined if given type is an empty string', () => {
        const type = checkType('');

        expect(type).toBe(undefined);
    });

    it('should return undefined if given type is null', () => {
        const type = checkType(null);

        expect(type).toBe(undefined);
    });

    it('should throw BadRequestError if given type is invalid', () => {
        movieConfig.validMovieTypes = ['validType', 'otherValidType'];

        expect(() => checkType('invalidType')).toThrow(
            new BadRequestError(`Wrong movie type given. Valid movie types: ${movieConfig.validMovieTypes.toString()}.`)
        );
    });

    it('should return given type if valid', () => {
        movieConfig.validMovieTypes = ['validType', 'otherValidType'];

        const type = checkType('validType');

        expect(type).toBe('validType');
    });
});

describe('mapMovieDataToRequestParams', () => {
    it('should map movie params name to valid shortcuts', () => {
        const movieData = {
            id: '1234abcd',
            title: 'title',
            year: '2004',
            type: 'movie',
            plot: 'short'
        };

        const searchQuery = mapMovieDataToRequestParams(movieData);

        expect(searchQuery).toBe(expect.stringContaining('i='));
        expect(searchQuery).toBe(expect.stringContaining('t='));
        expect(searchQuery).toBe(expect.stringContaining('y='));
        expect(searchQuery).toBe(expect.stringContaining('type='));
        expect(searchQuery).toBe(expect.stringContaining('plot='));
    });

    it('should not include undefined values', () => {
        const movieData = {
            id: '1234abcd',
            title: undefined,
            year: 2004,
            type: undefined,
            plot: undefined
        };

        const searchQuery = mapMovieDataToRequestParams(movieData);

        expect(searchQuery).toBe('i=1234abcd&y=2004');
    });
});
