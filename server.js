// var mongoose = require( 'mongoose' );
var express  = require( 'express' );
    //extracts body portion of an incoming request and exposes it on req.body
var bp = require('body-parser');
var path = require( 'path' );
var root = __dirname;
var port = process.env.PORT || 8000;
var app = express();

// require('./server/controllers/friends.js')
// require('./server/models/friend');
app.use(bp.urlencoded({extended: true}))
app.use(bp.json())

app.use(express.static(path.join(root, 'client')));
app.use(express.static(path.join(root, 'server')));
app.use(express.static(path.join(root, 'bower_components')));

require('./server/config/mongoose.js')
require("./server/config/routes.js")(app);
app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});
