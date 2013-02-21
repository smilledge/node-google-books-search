/**
 * google-books-search
 */

var https = require('https');
var extend = require('extend');
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
var baseUrl = "https://www.googleapis.com/books/v1/volumes?";

/**
 * Search Google Books
 * 
 * @param str Query
 * @param obj Options
 * @param func Callback
 */
var search = function(query, options, callback) {

	// Make the options object optional
    if ( ! callback || typeof callback != "function") {
    	// Callback is the second parameter
        callback = options;
        // No options
        options = undefined;
    }

	var options = extend(defaultOptions, options || {});

	// Validate options
	if ( ! query ) {
		callback(new Error("Query is required"));
		return;
	}

	if ( options.offset < 0) {
		callback(new Error("Offset cannot be below 0"));
		return;
	}

	if ( options.limit < 1 || options.limit > 40 ) {
		callback(new Error("Limit must be between 1 and 40"));
		return;
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

	var uri = baseUrl + querystring.stringify(query);

	// Send Request
	https.get(uri, function(response){
		
		if ( response.statusCode && response.statusCode === 200 ) {

			var body = '';
			response.on('data', function(data) {
				body += data;
			});

			response.on('end', function() {

				// Parse response body
				var data = JSON.parse(body);

				// Array of JSON results to return
				var results = [];

				// Extract useful data
				if ( data.items ) {

					for(var i = 0; i < data.items.length; i++) {

						var book = data.items[i].volumeInfo;
						var push = {};

						// ID
						if (data.items[i].id) push.id = data.items[i].id;
						// Title
						if (book.title) push.title = book.title;
						// Authors
						if (book.authors) push.authors = book.authors;
						// Publisher
						if (book.publisher) push.publisher = book.publisher;
						// Date Published
						if (book.publishedDate) push.publishedDate = book.publishedDate;
						// Page Count
						if (book.pageCount) push.pageCount = book.pageCount;
						// Publication Type
						if (book.printType) push.printType = book.printType;
						// Categories
						if (book.categories) push.categories = book.categories;
						// Thumbnail
						if (book.imageLinks && book.imageLinks.thumbnail) push.thumbnail = book.imageLinks.thumbnail;
						// Language
						if (book.language) push.language = book.language;
						// Link
						if (book.infoLink) push.link = book.infoLink;

						results.push(push);

					}

				}

				callback(null, results);

			});

		} else {
			callback(new Error("Status Code: " + response.statusCode));
		}

	}).on('error', function(error) {
		callback(error);
	});

}


module.exports.search = search;