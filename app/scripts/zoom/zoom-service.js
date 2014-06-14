(function () {
    'use strict';

    // Logic for image manager section
    var app = angular.module('spriteApp');

    app.factory('zoomSrv', function () {
        return {
            scale: window.CONFIG.scale
        };
    });
})();