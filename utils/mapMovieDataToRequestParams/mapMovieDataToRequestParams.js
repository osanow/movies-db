const queryString = require('query-string');
const moviesConfig = require('../../config/movies');
const { BadRequestError } = require('../../tools/errors');

function mapMovieDataToRequestParams(movieData) {
    const type = checkType(movieData.type);
    const plot = checkPlot(movieData.plot);

    const paramsObject = {
        t: movieData.title,
        i: movieData.id,
        y: movieData.year,
        type,
        plot
    };

    return `${queryString.stringify(paramsObject)}`;
}

const checkType = type => {
    if (!type) {
        return undefined;
    }

    const movieType = moviesConfig.validMovieTypes.find(validType => validType === type);

    if (!movieType && type) {
        throw new BadRequestError(
            `Wrong movie type given. Valid movie types: ${moviesConfig.validMovieTypes.toString()}.`
        );
    }

    return movieType;
};

const checkPlot = plot => {
    if (!plot) {
        return undefined;
    }

    const moviePlot = moviesConfig.validPlotTypes.find(validPlot => validPlot === plot);

    if (!moviePlot && plot) {
        throw new BadRequestError(
            `Wrong movie plot type given. Valid plot types: ${moviesConfig.validPlotTypes.toString()}.`
        );
    }

    return moviePlot;
};

module.exports = {
    mapMovieDataToRequestParams,
    checkType,
    checkPlot
};
