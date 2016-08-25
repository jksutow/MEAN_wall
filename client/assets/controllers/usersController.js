app.controller('usersController', ['$scope', 'userFactory', '$location', function($scope, userFactory, $location){
  $scope.errors = [];
  $scope.create = function(){
    userFactory.create($scope.newUser, function(response){
      if(!response.status){
        $scope.errors.push(response.errors);
      }else{
        $scope.user = response.userStatus;
        $location.url('/message');
      }
    });
  }
  $scope.logout = function(){
    userFactory.logout(function(response){
      if(response.status){
        $scope.user = response.userStatus;
        $location.url('/');
      }else{
        $scope.errors.push(response.errors);
      }
    })
  }
  userFactory.getUser(function(user_info){
    $scope.user = user_info;
    if(!$scope.user.loggedIn){
      $location.url('/');
    }
  })
}])
