(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.controller('ScrubPlaybackCtrl', function ($scope, scrubSrv) {
        var ctrl = this;
        var interval;
        var currentAnim = {};

        $scope.$on('setAnim', function (e, anim) {
            currentAnim = anim;
        });

        this.play = function () {
            this.clear();
            if (scrubSrv.index >= currentAnim.length - 1) scrubSrv.index = 0;

            interval = setInterval(function () {
                $scope.$apply(function () {
                    if (scrubSrv.index + 1 >= currentAnim.length) clearInterval(interval);
                    else scrubSrv.index += 1;
                });
            }, currentAnim.speed * 1000);
        };

        this.rewind = function () {
            scrubSrv.index = 0;
            this.play();
        };

        this.stop = function () {
            this.clear();
            scrubSrv.index = 0;
        };

        this.clear = function () {
            if (interval) clearInterval(interval);
        };

        $scope.$on('$destroy', function () {
            ctrl.clear();
        });
    });

    app.directive('scrubPlayback', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/scrub/scrub-view-playback.html',
            controller: 'ScrubPlaybackCtrl',
            controllerAs: 'scrubPlaybackCtrl'
        };
    });
})();
