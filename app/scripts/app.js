(function () {
    'use strict';

    angular
        .module('spriteApp', [
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
                .when('/sprites', {
                    templateUrl: 'views/sprites.html',
                    controller: 'SpriteCtrl',
                    controllerAs: 'spriteSheet'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
})();
