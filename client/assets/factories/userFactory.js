app.factory('userFactory', ['$http', function($http){

  var factory = {};
  var userStatus = {loggedIn: false};
  factory.getUser = function(callback){
    callback(userStatus);
  };
  factory.create = function(newUser, callback){
    $http.post('/users/', newUser).success(function(response){
      if(response.status){
        userStatus = response.userStatus;
      }
      callback(response);
    })
  }
  factory.logout = function(callback){
    $http.post('/logout').success(function(response){
      if(response.status){
        userStatus = response.userStatus;
      }
      callback(response);
    })
  }
  return factory;
}])
