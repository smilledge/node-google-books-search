# node-google-books-search

A lightweight node wrapper for the Google Books API.

## Install

    npm install google-books-search

## Basic Usage

	var books = require('google-books-search');

	var query = "Guinness World Records";

	var options = {
		key: "YOUR API KEY",
		field: 'title',
		offset: 0,
		limit: 10,
		type: 'books',
		order: 'relevance',
		lang: 'en'
	};

	books.search(query, options, function(error, results) {
		
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