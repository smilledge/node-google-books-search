# node-google-books-search

A lightweight node wrapper for the Google Books API.

## Install

    npm install google-books-search

## Basic Usage

### .search(query, options, callback)

Search for books matching the specified query.

	var books = require('google-books-search');

	books.search("Professional JavaScript for Web Developers", function(error, results) {
		if ( ! error ) {
			console.log(results);
		} else {
			console.log(error);
		}
	});

Returns an array of JSON objects. For example;

	[
		{
			"id":"9KJJYFIss_wC",
			"title":"Professional Javascript For Web Developers 2Nd Ed",
			"authors":[
				"Nicholas C. Zakas"
			],
			"publisher":"John Wiley & Sons",
			"publishedDate":"2009-02-09",
			"pageCount":840,
			"printType":"BOOK",
			"thumbnail":"http://bks5.books.google.com.au/books?id=...",
			"language":"en",
			"link":"http://books.google.com.au/books?id=..."
		},

		...

	]

## Advanced Usage

The search method optionally accepts an options object as the second argument. See below for an overview of the available options.

	var books = require('google-books-search');

	var options = {
		key: "YOUR API KEY",
		field: 'title',
		offset: 0,
		limit: 10,
		type: 'books',
		order: 'relevance',
		lang: 'en'
	};

	books.search("Professional JavaScript for Web Developers", options, function(error, results) {
		if ( ! error ) {
			console.log(results);
		} else {
			console.log(error);
		}
	});

## Options

`key` : Your Google API key (Optional)   
`field` : Search in a specified field (title, author, publisher, subject or isbn) (Optional)   
`offset` : The position in the collection at which to start the list of results (Default: 0)   
`limit` : The maximum number of results to return (Max 40) (Defult: 10)   
`type` : Restrict results to books or magazines (Default: all)   
`order` : Order results by relevance or newest (Default: relevance)   
`lang` : Restrict results to a specified language (two-letter ISO-639-1 code) (Default: en)   

For more info please see the [Google Books API documentation](http://code.google.com/apis/books/docs/v1/using.html)