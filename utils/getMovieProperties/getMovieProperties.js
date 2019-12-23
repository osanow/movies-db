const config = require('../../config/movies');

function getMovieProperties(data) {
    const movieProperties = {};

    Object.keys(data).forEach(prop => {
        const lowerCasedProp = prop.toLowerCase();

        if (config.movieProperties.includes(lowerCasedProp) && data[prop] !== 'N/A') {
            movieProperties[lowerCasedProp] = data[prop];
        }
    });

    return movieProperties;
}

module.exports = getMovieProperties;
