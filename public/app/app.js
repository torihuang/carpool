angular.module('carpoolApp', ['ngResource', 'ngRoute']);
angular.module('carpoolApp').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/', {
    templateUrl: '/partials/main',
    controller: 'mvMainController'
  })
})