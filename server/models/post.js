var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new mongoose.Schema({
  message: {
    type: String,
    required:true
  },
  _user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  _comment:[{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {timestamps: true});

mongoose.model('Post', postSchema);
