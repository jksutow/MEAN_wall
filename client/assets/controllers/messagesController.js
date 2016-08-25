app.controller('messagesController', ['$scope', 'messageFactory', '$routeParams', '$location', 'userFactory', function($scope, messageFactory, $routeParams, $location, userFactory){
  $scope.errors = [];

  messageFactory.index(function(res){
    if(!res.status){
      $scope.errors.push(res.errors);
    } else{
      $scope.allPosts = res.posts;
    }
  })

  $scope.newPost = function(){
    var user = userFactory.getUser(function(data){
      $scope.poster = data;
    })
    messageFactory.newPost($scope.newMessage, $scope.poster, function(res){
      if(!res.status){
        $scope.errors.push(res.errors);
      }else{
        $scope.allPosts = res.posts;
        $scope.newMessage = "";
      }
    })
  }
  $scope.comment = function(newComment, postId){
    userFactory.getUser(function(data){
      $scope.user = data;
    })
    messageFactory.newComment(newComment, postId, $scope.user, function(res){
      if(!res.status){
        $scope.errors.push(res.errors);
      }else{
        $scope.allPosts = res.posts;
      }
    })
  }
}])
