var mongoose = require('mongoose');
var users = require('./../controllers/users.js')
var messages = require('./../controllers/messages.js')

module.exports = function(app){
  app.get('/users', users.index);
  app.post('/users', users.create);
  app.post('/logout', users.logout);
  app.post('/newPost', messages.create);
  app.post('/newComment/:id', messages.createComment);
  app.get('/posts', messages.index);
}
