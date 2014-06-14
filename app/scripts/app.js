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
        });
})();
