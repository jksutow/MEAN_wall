var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
  name:{
    type: String
  },
  text: {
    type: String,
    required: true
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'},
  _post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
}, {timestamps: true});

mongoose.model('Comment', commentSchema);
