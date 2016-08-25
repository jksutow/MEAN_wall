console.log('mongo connection, mongoose setup');

var mongoose = require('mongoose');
//require file system so that we can load, read, require all of the model files
var fs = require('fs');
var path = require('path');
	//directory where our models are located
var models_path = path.join(__dirname, "../models");
	//regular expression that checks for .js extension
var reg = new RegExp(".js$", "i");
	//database URI
var dbURI = 'mongodb://localhost/the_wall';
	//Connect to database
mongoose.connect(dbURI);

//when successfully connected
mongoose.connection.on('connected', function(){
	console.log('Mongoose default connection open to ${dbURI}');
});

/*
*  If the connection throws an error
*/
mongoose.connection.on( 'error', function ( err ) {
  console.error( `Mongoose default connection error: ${ err }` );
});
/*
*  When the connection is disconnected
*/
mongoose.connection.on( 'disconnected', function () {
  console.log( 'Mongoose default connection disconnected' );
});

//If the node process ends, close the Mongoose connection

process.on('SIGINT', function(){
	mongoose.connection.close(function() {
		console.log('Mongoose default connection disconnected through app termination');
		process.exit(0);
	})
})

/*
*  read all of the files in the models dir and
*  check if it is a javascript file before requiring it
*/
fs.readdirSync( models_path ).forEach( function( file ) {
  if( reg.test( file ) ) {
    require( path.join( models_path, file ) );
  }
});
