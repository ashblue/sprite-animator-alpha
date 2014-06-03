(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.controller('SpriteHeader', ['$location', function ($location) {
        this.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }]);
})();
