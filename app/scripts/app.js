(function () {
    'use strict';

    // @TODO In order for this system to work we must load all collections, verify data, then launch the angular app with a callback
    // @TODO The data removal system is a mess, needs to be rewritten with events
    angular
        .module('spriteApp', [
            'ngCookies',
            'ngResource',
            'ngSanitize',
            'ngRoute'
        ]).config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl',
                    resolve: {
                        images: function (imageSrv) {
                            if (window.CONFIG.populate) imageSrv.populate();
                        },

                        sprites: function (spriteSrv) {
                            if (window.CONFIG.populate) spriteSrv.populate();
                        },

                        animationGroups: function (animGroupSrv) {
                            if (window.CONFIG.populate) animGroupSrv.populate();
                        },

                        animations: function (animSrv) {
                            if (window.CONFIG.populate) animSrv.populate();
                        },

                        timelines: function (timelineSrv) {
                            if (window.CONFIG.populate) timelineSrv.populate();
                        },

                        frames: function (frameSrv) {
                            if (window.CONFIG.populate) frameSrv.populate();
                        }
                    }
                })
                .when('/sprites', {
                    templateUrl: 'views/sprite-sheets.html',
                    controller: 'MainCtrl',
                    resolve: {
                        images: function (imageSrv) {
                            if (window.CONFIG.populate) imageSrv.populate();
                        },

                        sprites: function (spriteSrv) {
                            if (window.CONFIG.populate) spriteSrv.populate();
                        },

                        animationGroups: function (animGroupSrv) {
                            if (window.CONFIG.populate) animGroupSrv.populate();
                        },

                        animations: function (animSrv) {
                            if (window.CONFIG.populate) animSrv.populate();
                        },

                        timelines: function (timelineSrv) {
                            if (window.CONFIG.populate) timelineSrv.populate();
                        },

                        frames: function (frameSrv) {
                            if (window.CONFIG.populate) frameSrv.populate();
                        }
                    }
                })
                .otherwise({
                    redirectTo: '/'
                });
        }).run(function ($rootScope, $location) {
            // Enforce a redirect to the bootstrap page only on initial load or if additional resources are still loading
            $location.path('/');
        });
})();
