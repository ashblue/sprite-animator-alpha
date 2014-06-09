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
                    controller: 'MainCtrl',
                    resolve: {
                        images: function (imageSrv) {
                            imageSrv.populate();
                        },

                        sprites: function (spriteSrv) {
                            spriteSrv.populate();
                        },

                        animationGroups: function (animGroupSrv) {
                            animGroupSrv.populate();
                        },

                        animations: function (animSrv) {
                            animSrv.populate();
                        },

                        timelines: function (timelineSrv) {
                            timelineSrv.populate();
                        }
                    }
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
