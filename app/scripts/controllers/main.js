(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.controller('MainCtrl', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });

    app.directive('mainNav', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/header.html',
            controller: 'SpriteHeader',
            controllerAs: 'header'
        };
    });
})();