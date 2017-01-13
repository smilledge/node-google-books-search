var https = require('https');
var _ = require('lodash');
var querystring = require('querystring');


// https://developers.google.com/books/docs/v1/using#st_params
var defaultOptions = {
    // Google API key
    key: null,
    // Search in a specified field
    field: null,
    // The position in the collection at which to start the list of results (startIndex)
    offset: 0,
    // The maximum number of elements to return with this request (Max 40) (maxResults)
    limit: 10,
    // Restrict results to books or magazines (or both) (printType)
    type: 'all',
    // Order results by relevance or newest (orderBy)
    order: 'relevance',
    // Restrict results to a specified language (two-letter ISO-639-1 code) (langRestrict)
    lang: 'en'
};


// Special Keywords
var fields = {
    title: 'intitle:',
    author: 'inauthor:',
    publisher: 'inpublisher:',
    subject: 'subject:',
    isbn: 'isbn:'
};


// Base url for Google Books API
var API_BASE_URL = 'https://www.googleapis.com/books/v1';


/**
 * Search Google Books
 *
 * https://developers.google.com/books/docs/v1/reference/volumes/list
 *
 * @param  {String}   query
 * @param  {object}   options
 * @param  {Function} callback
 */
var search = function(query, options, callback) {

    // Make the options object optional
    if (!_.isFunction(callback)) {
        callback = options;
        options = {};
    }

    var options = _.extend({}, defaultOptions, options);

    // Validate options
    if (!query) {
        return callback(new Error('Query is required'));
    }

    if (options.offset < 0) {
        return callback(new Error('Offset cannot be below 0'));
    }

    if (options.limit < 1 || options.limit > 40) {
        return callback(new Error('Limit must be between 1 and 40'));
    }

    // Set any special keywords
    if (options.field) {
        query = fields[options.field] + query;
    }

    // Create the request uri
    var query = {
        q: query,
        startIndex: options.offset,
        maxResults: options.limit,
        printType: options.type,
        orderBy: options.order,
        langRestrict: options.lang
    };

    if (options.key) {
        query.key = options.key;
    }

    sendRequest('/volumes', query, function(err, response) {
        if (err) {
            return callback(err);
        }

        if (!_.isArray(response.items)) {
            return callback(null, []);
        }

        var results = _.chain(response.items)
            .map(parseBook)
            .compact()
            .value();

        callback(null, results, response);
    });
};


/**
 * Retrieves a Volume resource based on ID.
 *
 * https://developers.google.com/books/docs/v1/reference/volumes/get
 *
 * @param  {String}   volumeId
 * @param  {Function} callback
 */
var lookup = function(volumeId, options, callback) {

    var query = {};

    // Make the options object optional
    if (!_.isFunction(callback)) {
        callback = options;
        options = {};
    }

    if (!volumeId) {
        return callback(new Error('Volume ID is required'));
    }

    if (options.key) {
        query.key = options.key;
    }

    sendRequest('/volumes/' + volumeId, query, function(err, response) {
        if (err) {
            return callback(err);
        }

        if (!response.id || response.id !== volumeId) {
            return callback(null, null);
        }

        callback(null, parseBook(response), response);
    });
};


/**
 * Send a Google Books API request
 *
 * @return {void}
 */
var sendRequest = function(path, params, callback) {
    var url = API_BASE_URL;

    if (path) {
        url += path;
    }

    if (params) {
        url += '?' + querystring.stringify(params);
    }

    https.get(url, function(response) {
        if (response.statusCode !== 200) {
            return callback(new Error('Google Books API error. Status Code: ' + response.statusCode));
        }

        var body = '';

        response.on('data', function(data) {
            body += data;
        });

        response.on('end', function() {
            var err, data;
            try {
                data = JSON.parse(body);
            } catch (e) {
                err = new Error('Invalid response from Google Books API.');
            }
            
            if (data.error) {
                callback(new Error(data.error.message));
            } else {
                callback(err, data);
            }            

        });
    }).on('error', function(error) {
        callback(error);
    });
};


/**
 * Parse a single book result
 *
 * @param  {Object}  data
 * @return {Object}
 */
var parseBook = function(data) {
    var book = _.pick(data.volumeInfo, [
        'title', 'subtitle', 'authors', 'publisher', 'publishedDate', 'description',
        'industryIdentifiers', 'pageCount', 'printType', 'categories', 'averageRating',
        'ratingsCount', 'maturityRating', 'language'
    ]);

    _.extend(book, {
        id: data.id,
        link: data.volumeInfo.canonicalVolumeLink,
        thumbnail: _.get(data, 'volumeInfo.imageLinks.thumbnail'),
        images: _.pick(data.volumeInfo.imageLinks, ['small', 'medium', 'large', 'extraLarge'])
    });

    return book;
};


module.exports.search = search;
module.exports.lookup = lookup;
