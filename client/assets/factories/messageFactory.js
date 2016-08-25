app.factory('messageFactory', function($http){
  var factory = {}

  factory.index = function(callback){
    $http.get('/posts').success(function(res){
      if(res.status){
        callback(res);
      }
    })
  }
  factory.newPost = function(messageInfo, posterInfo, callback){
    var info = {
      message: messageInfo.message,
      userId: posterInfo.user_id,
      name: posterInfo.username
    }
    $http.post('/newPost', info).success(function(res){
      if(!res.status){
        callback(res);
      } else{
        callback(res);
      }
    })
  }
  factory.newComment = function(newComment, postId, user_info, callback){
    $http.post('/newComment/'+postId, {newComment: newComment.text, user_info: user_info}).success(function(res){
      if (res.status){
        callback(res);
      } else{
        callback(res);
      }
    })
  }
  return factory;
})
