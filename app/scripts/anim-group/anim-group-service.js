(function () {
    'use strict';

    // Logic for image manager section
    var app = angular.module('spriteApp');

    app.factory('animGroupSrv', function ($http) {
        var animGroupSrv = new window.sa.Collection(CONFIG.animationGroups.root, $http);
        animGroupSrv.current = {};
        return animGroupSrv;
    });
})();