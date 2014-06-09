(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.factory('timelineSrv', function ($http) {
        var timelineSrv = new window.sa.Collection(CONFIG.timelines.root, $http);
        timelineSrv.current = [];
        return timelineSrv;
    });
})();