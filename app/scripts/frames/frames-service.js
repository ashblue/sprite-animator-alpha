(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.factory('frameSrv', function ($http, spriteSrv, imageSrv, timelineSrv) {
        var frameSrv = new window.sa.Collection(CONFIG.frames.root, $http);
        frameSrv.current = null;

        frameSrv.getSprite = function (frame) {
            return spriteSrv.get(timelineSrv.get(frame.timeline).sprite);
        };

        frameSrv.getImage = function (frame) {
            var sprite = this.getSprite(frame);
            return imageSrv.get(sprite.image);
        };

        /**
         * Finds and returns the nearest frame to the requested index
         * @param timeline {*} Timeline object or ID
         * @param index {number} Requested frame index
         * @returns {object}
         */
        frameSrv.getFrameIndex = function (timeline, index) {
            if (typeof timeline !== 'object') timeline = timelineSrv.get(timeline);
            var result = { index: Number.NEGATIVE_INFINITY };
            var frame;

            timeline.frames.forEach(function (id) {
                frame = frameSrv.get(id);
                if (frame.index <= index && frame.index > result.index) result = frame;
            });

            return result;
        };

        return frameSrv;
    });
})();