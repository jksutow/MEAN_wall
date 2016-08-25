var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'partials/index.html',
      controller: 'usersController'
    })
    .when('/message', {
      templateUrl: 'partials/message.html'
    })
    .otherwise({
      redirectTo: '/'
    });
})
