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
                    templateUrl: 'views/sprite-sheets.html',
                    resolve: {
                        images: function (imageSrv) {
                            imageSrv.populate();
                        },

                        sprites: function (spriteSrv) {
                            spriteSrv.populate();
                        }
                    }
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
})();
