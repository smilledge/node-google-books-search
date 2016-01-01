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
		    "title": "Professional JavaScript for Web Developers",
		    "authors": [
		      "Nicholas C. Zakas"
		    ],
		    "publisher": "John Wiley & Sons",
		    "publishedDate": "2011-12-20",
		    "description": "This book provides a developer-level introduction along with more advanced and useful features of JavaScript. Coverage includes: JavaScript use with HTML to create dynamic webpages, language concepts including syntax and flow control statements variable handling given their loosely typed nature built-in reference types such as object and array object-oriented programing powerful aspects of function expressions Browser Object Model allowing interaction with the browser itself detecting the client and its capabilities Document Object Model (DOM) objects available in DOM Level 1 how DOM Levels 2 and 3 augmented the DOM events, legacy support, and how the DOM redefined how events should work enhancing form interactions and working around browser limitations using the tag to create on-the-fly graphics JavaScript API changes in HTML5 how browsers handle JavaScript errors and error handling features of JavaScript used to read and manipulate XML data the JSON data format as an alternative to XML Ajax techniques including the use of XMLHttpRequest object and CORS complex patterns including function currying, partial function application, and dynamic functions offline detection and storing data on the client machine techniques for JavaScript in an enterprise environment for better maintainability This book is aimed at three groups of readers: Experienced object-oriented programming developers looking to learn JavaScript as it relates to traditional OO languages such as Java and C++; Web application developers attempting to enhance site usability; novice JavaScript developers. Nicholas C. Zakas worked with the Web for over a decade. He has worked on corporate intranet applications used by some of the largest companies in the world and large-scale consumer websites such as MyYahoo! and the Yahoo! homepage. He regularly gives talks at companies and conferences regarding front-end best practices and new technology.",
		    "industryIdentifiers": [
		      {
		        "type": "ISBN_13",
		        "identifier": "9781118233092"
		      },
		      {
		        "type": "ISBN_10",
		        "identifier": "1118233093"
		      }
		    ],
		    "readingModes": {
		      "text": true,
		      "image": true
		    },
		    "pageCount": 960,
		    "printType": "BOOK",
		    "categories": [
		      "Computers"
		    ],
		    "averageRating": 4.5,
		    "ratingsCount": 18,
		    "maturityRating": "NOT_MATURE",
		    "allowAnonLogging": false,
		    "contentVersion": "0.7.6.0.preview.3",
		    "imageLinks": {
		      "smallThumbnail": "http://books.google.com.br/books/content?id=C3kabcBG0ZsC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		      "thumbnail": "http://books.google.com.br/books/content?id=C3kabcBG0ZsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
		    },
		    "language": "en",
		    "previewLink": "http://books.google.com.br/books?id=C3kabcBG0ZsC&printsec=frontcover&dq=Professional+JavaScript+for+Web+Developers&as_pt=ALLTYPES&hl=&cd=1&source=gbs_api",
		    "infoLink": "http://books.google.com.br/books?id=C3kabcBG0ZsC&dq=Professional+JavaScript+for+Web+Developers&as_pt=ALLTYPES&hl=&source=gbs_api",
		    "canonicalVolumeLink": "http://books.google.com.br/books/about/Professional_JavaScript_for_Web_Develope.html?hl=&id=C3kabcBG0ZsC"
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