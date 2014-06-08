(function () {
    'use strict';

    // Logic for image manager section
    var app = angular.module('spriteApp');

    app.factory('imageSrv', function ($http) {
        var imageSrc = new window.sa.Collection(CONFIG.images.root, $http);
        return imageSrc;
    });
})();