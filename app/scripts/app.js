(function() {
    'use strict';


    angular
      .module('spriteAnimatorApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
      ])
      .config(function ($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
      });
})();
