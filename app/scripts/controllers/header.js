(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.directive('mainNav', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/header.html',
            controller: 'SpriteHeader',
            controllerAs: 'header'
        };
    });

    app.controller('SpriteHeader', ['$location', function ($location) {
        this.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }]);
})();
