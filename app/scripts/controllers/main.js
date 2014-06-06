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

    app.directive('animationManager', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/animation-manager.html'
//            controller: 'SpriteHeader',
//            controllerAs: 'header'
        };
    });

    app.directive('animationTimeline', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/animation-timeline.html'
//            controller: 'SpriteHeader',
//            controllerAs: 'header'
        };
    });

    app.filter('range', function() {
        return function(input, total) {
            total = parseInt(total);
            for (var i=0; i<total; i++)
                input.push(i);
            return input;
        };
    });
})();