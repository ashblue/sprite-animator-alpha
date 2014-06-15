(function () {
    'use strict';

    var app = angular.module('spriteApp');

    // Check if all data is verified to prevent error references
    var verifyData = false;

    app.controller('MainCtrl', function ($scope, $sce, imageSrv, spriteSrv, animSrv, animGroupSrv, timelineSrv, frameSrv) {
        var errors = false;


//        /**
//         * Verifiies animation groups talk to animations
//         * @returns {*}
//         */
//        this.verifyAnimations = function () {
//            return this.verifyDataRef(animSrv, animGroupSrv, 'animations', {
//                primaryName: 'animations',
//                refName: 'animation groups'
//            });
//        };
//
//        /**
//         * Makes sure animations have real timelines
//         * @returns {*}
//         */
//        this.verifyTimelines = function () {
//            return this.verifyDataRef(timelineSrv, animSrv, 'timelines', {
//                primaryName: 'timelines',
//                refName: 'animations'
//            });
//        };
//
//        /**
//         * If a keyframe is missing remove references only on timelines
//         */
//        this.verifyKeyframes = function () {
//            return this.verifyDataRef(frameSrv, timelineSrv, 'frames', {
//                primaryName: 'frames',
//                refName: 'timelines'
//            });
//        };

        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        };
    });

    app.directive('animationManager', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/animation-manager.html'
        };
    });

    app.directive('animationTimeline', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/animation-timeline.html'
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