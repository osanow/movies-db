module.exports = {
    movieProperties: [
        'year',
        'rated',
        'released',
        'runtime',
        'genre',
        'director',
        'writer',
        'actors',
        'plot',
        'language',
        'country',
        'awards',
        'metascore',
        'imdbrating',
        'imdbvotes',
        'imdbid',
        'type',
        'dvd',
        'boxoffice',
        'production',
        'website'
    ],
    requiredMovieParams: ['title', 'id'],
    validMovieTypes: ['movie', 'series', 'episode'],
    validPlotTypes: ['short', 'full'],
    notFoundMessage: 'Not found any movie based on given data.'
};
