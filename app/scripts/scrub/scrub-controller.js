(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.controller('ScrubCtrl', function ($scope, scrubSrv) {
        this.setIndex = function (e) {
            var pos = $(e.currentTarget).getMousePos(e);
            var frameWidth = $('.tick:first').outerWidth(true);
            var index = Math.floor(pos.x / frameWidth);

            // Turn the clicked position into a real index value
            scrubSrv.index = index;
        };

        this.getPos = function () {
            // Get width of a single frame
            var frameWidth = $('.tick:first').outerWidth(true);

            // Turn the frame width into a CSS left position
            return {
                left: scrubSrv.index * frameWidth + 'px'
            };
        };
    });

    app.directive('scrub', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/scrub/scrub-view.html',
            controller: 'ScrubCtrl',
            controllerAs: 'scrubCtrl'
        };
    });

    app.directive('scrubList', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/scrub/scrub-view-list.html'
        };
    });
})();
