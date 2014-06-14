(function () {
    'use strict';

    var app = angular.module('spriteApp');

    // Check if all data is verified to prevent error references
    var verifyData = false;

    app.controller('MainCtrl', function ($scope, $sce, imageSrv, spriteSrv) {
        var errors = false;

        /**
         * Loop through all images available to sprites and verify they exist, if not
         * delete the sprite and show an alert message (should be one compounded alert listing all
         * removed)
         */
        this.verifySprites = function () {
            var missingImages = [];
            var removedSprites = [];

            spriteSrv.list.forEach(function (sprite) {
                var image = imageSrv.get(sprite.image);
                if (!image) {
                    missingImages.push(sprite.image);
                    removedSprites.push(sprite);
                }
            });

            if (removedSprites.length) {
                removedSprites.forEach(function (sprite) {
                    spriteSrv.destroy(sprite._id);
                });

                console.error('The following images are missing ' + JSON.stringify(missingImages)
                    + ' becuase of this the following sprites have been destroyed ' + JSON.stringify(removedSprites));

                errors = true;
            }
        };

        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        };

        // Only check data on intial load, resource intensive process
        if (!verifyData) {
            this.verifySprites();
            if (errors) window.alert('Data integrity issues have destroyed existing animation data, please see the console and contact a system administrator before proceeding.');
            verifyData = true;
        }
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