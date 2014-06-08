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
            templateUrl: 'views/animation-timeline.html',
            controller: 'AnimationTimelineCtrl',
            controllerAs: 'timeline'
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