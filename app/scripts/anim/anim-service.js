(function () {
    'use strict';

    // Logic for image manager section
    var app = angular.module('spriteApp');

    app.factory('animSrv', function ($http) {
        var animSrv = new window.sa.Collection(CONFIG.animations.root, $http);
        return animSrv;
    });
})();