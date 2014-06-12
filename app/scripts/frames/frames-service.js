(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.factory('frameSrv', function ($http) {
        var frameSrv = new window.sa.Collection(CONFIG.frames.root, $http);
        frameSrv.current = null;

        return frameSrv;
    });
})();