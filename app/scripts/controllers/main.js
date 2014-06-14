(function () {
    'use strict';

    var app = angular.module('spriteApp');

    // Check if all data is verified to prevent error references
    var verifyData = false;

    app.controller('MainCtrl', function ($scope, $sce, imageSrv, spriteSrv, animSrv, animGroupSrv, timelineSrv, frameSrv) {
        var errors = false;

        /**
         * Loops through collections to verify data integrity, if the item is not found the refCol is destroyed
         * @param primaryCol {Collection} The data we want to check for blank id references on
         * @param refCol {Collection} The collection used to search for missing id references
         * @param key {string} The param on the refCol used to check for missing data
         * @param options
         * @returns {*}
         */
        this.verifyData = function (primaryCol, refCol, key, options) {
            if (!options) options = {};
            var missingData = [];
            var removedData = [];

            refCol.list.forEach(function (refItem) {
                if (!Array.isArray(refItem[key])) {
                    var primaryItem = primaryCol.get(refItem[key]);
                    if (!primaryItem) {
                        missingData.push(refItem[key]);
                        removedData.push(refItem);
                    }
                } else {
                    var errorFound = false;
                    refItem[key].forEach(function (id) {
                        var primaryItem = primaryCol.get(id);
                        if (!primaryItem) {
                            missingData.push(id);
                            if (!errorFound) removedData.push(refItem);
                            if (!errorFound) errorFound = true;
                        }
                    });
                }

            });

            if (missingData.length) {
                removedData.forEach(function (item) {
                    refCol.destroy(item._id);
                });

                console.error('The following ' + options.primaryName + ' are missing ' + JSON.stringify(missingData)
                    + ' because of this the following ' + options.refName + ' have been destroyed ' + JSON.stringify(removedData));

                errors = true;
            }

            return this;
        };

        /**
         * Only destroys the ID to the non existent item instead of destroying the refCol item all together
         * @param primaryCol
         * @param refCol
         * @param key
         * @param options
         * @returns {*}
         */
        this.verifyDataRef = function (primaryCol, refCol, key, options) {
            var missingData = [];
            var affectedTimelines = [];

            refCol.list.forEach(function (timelineItem) {
                var errorFound = false;
                timelineItem[key].forEach(function (id) {
                    var primaryItem = primaryCol.get(id);
                    if (!primaryItem) {
                        missingData.push(id);
                        affectedTimelines.push(timelineItem);
                        if (!errorFound) errorFound = true;
                    }
                });
            });

            if (missingData.length) {
                affectedTimelines.forEach(function (timelineItem) {
                    missingData.forEach(function (frameId) {
                        timelineItem[key].erase(frameId);
                    });
                    refCol.addDirt(timelineItem._id);
                });


                console.error('The following ' + options.primaryName + ' are missing ' + JSON.stringify(missingData)
                    + ' because of this the following ' + options.refName + ' have been affected ' + JSON.stringify(affectedTimelines));

                errors = true;
            }

            return this;
        };

        /**
         * Loop through all images available to sprites and verify they exist, if not
         * delete the sprite and show an alert message (should be one compounded alert listing all
         * removed)
         */
        this.verifyImages = function () {
            return this.verifyData(imageSrv, spriteSrv, 'image', {
                primaryName: 'images',
                refName: 'sprites'
            });
        };

        /**
         * Missing sprites can destroy pre-existing timeline data
         */
        this.verifySprites = function () {
            return this.verifyData(spriteSrv, timelineSrv, 'sprite', {
                primaryName: 'sprites',
                refName: 'timelines'
            });
        };

        /**
         * Verifiies animation groups talk to animations
         * @returns {*}
         */
        this.verifyAnimations = function () {
            return this.verifyDataRef(animSrv, animGroupSrv, 'animations', {
                primaryName: 'animations',
                refName: 'animation groups'
            });
        };

        /**
         * Makes sure animations have real timelines
         * @returns {*}
         */
        this.verifyTimelines = function () {
            return this.verifyDataRef(timelineSrv, animSrv, 'timelines', {
                primaryName: 'timelines',
                refName: 'animations'
            });
        };

        /**
         * If a keyframe is missing remove references only on timelines
         */
        this.verifyKeyframes = function () {
            return this.verifyDataRef(frameSrv, timelineSrv, 'frames', {
                primaryName: 'frames',
                refName: 'timelines'
            });
        };

        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        };

        // Only check data on intial load, resource intensive process
        if (!verifyData) {
            this.verifyImages()
                .verifySprites()
                .verifyAnimations()
                .verifyTimelines()
                .verifyKeyframes();
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