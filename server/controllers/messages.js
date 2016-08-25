var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Post = mongoose.model('Post');
var User = mongoose.model('User');

module.exports = (function(){
  return{
    create: function(req, res){
      var newPost = new Post ({message: req.body.message});
      newPost._user = req.body.userId;
      newPost.save(function(err, post){
        console.log("POST", post);
        if(err){
          var errorsArr = [];
          for(var i in err.errors){
            errorsArr.push(err.errors[i].message);
          }
          res.json({status: false, errors: errorsArr});
        }else{
          User.findOneAndUpdate({_id: req.body.userId}, {$push:{"_post": newPost}}, function(err, user){
            if(err){
              var errorsArr=[];
              for (var i in err.errors){
                errorsArr.push(err.errors[i].message);
              }
              res.json({status: false, errors: errorsArr});
            }else{
              Post.find({}).populate('_comment_user').exec(function(err, posts){
                if(err){
                  var errorsArr = [];
                  for (var i in err.errors){
                    errorsArr.push(err.errors[i].message);
                  }
                  res.json({status: false, errors: errorsArr});
                }else{
                  res.json({status: true, posts: posts});
                }
              })
            }
          })
        }
      })
    },

    index: function(req, res){
      Post.find({}).populate('_comment _user').exec(function(err, posts){
        if(err){
          var errorsArr = [];
          for (var i in err.errors){
            errorsArr.push(err.errors[i].message);
          }
          res.json({status: false, errors: errorsArr});
        }else{
          res.json({status: true, posts: posts});
        }
      })
    },

    createComment: function(req, res){
      Post.findOne({_id: req.params.id}, function(err, post){
        if(err){
          var errorsArr = [];
          for (var i in err.errors){
            errorsArr.push(err.errors[i].message);
          }
          res.json({status: false, errors: errorsArr});
        }else{
          var newComment = new Comment({
            text: req.body.newComment,
            name: req.body.user_info.username
          });
          var user = {
            username: req.body.user_info.username,
            _id: req.body.user_info.user_id
          };
          newComment._post = post._id;
          newComment._user = req.body.user_info.user_id;
          Post.update({_id: post._id}, {$push:{"_comment": newComment}}, function(err, post){
            if(err){
              var errorsArr = [];
              for(var i in err.errors){
                errorsArr.push(err.errors[i].message);
              }
              res.json({status: false, errors: errorsArr});
            }else{
              Post.update({_id: post._id}, {$set: {"_user": user}}, function(err){
                if(err){
                  var errorsArr = [];
                  for(var i in err.errors){
                    errorsArr.push(err.errors[i].message);
                  }
                  res.json({status: false, errors: errorsArr});
                }else{
                  User.update({_id: req.body.user_info.user_id}, {$push:{"_comment": newComment._id}}, function(err){
                    if(err){
                      var errorsArr = [];
                      for(var i in err.errors){
                        errorsArr.push(err.errors[i].message);
                      }
                      res.json({status: false, errors: errorsArr});
                    }else{
                      newComment.save(function(err){
                        if(err){
                          var errorsArr = [];
                          for(var i in err.errors){
                            errorsArr.push(err.errors[i].message);
                          }
                          res.json({status: false, errors: errorsArr});
                        }else{
                          Post.find({}).populate('_comment _user').exec(function(err, posts){
                            if(err){
                              var errorsArr=[];
                              for(var i in err.errors){
                                errorsArr.push(err.errors[i].message);
                              }
                              res.json({status: false, errors: errorsArr});
                            }else{
                              res.json({status: true, posts: posts});
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  }
})()
