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
                    controllerAs: 'spriteSheet',
                    resolve: {
                        images: function (imageSrv) {
                            imageSrv.populate();
                        },

                        sprites: function () {
                            // @TODO Fill with sprite database info
                        }
                    }
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
})();
