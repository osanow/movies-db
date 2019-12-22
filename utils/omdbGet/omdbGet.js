const axios = require('axios');

const { ExternalServiceUnavailableError } = require('../../tools/errors');

const { OMDB_API_KEY } = process.env;
const BASE_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

const omdbGet = async searchQuery => {
    let response;

    try {
        response = await axios.get(`${BASE_URL}&${searchQuery}`);
    } catch (error) {
        throw new ExternalServiceUnavailableError('', error.message);
    }

    return response;
};

module.exports = omdbGet;
