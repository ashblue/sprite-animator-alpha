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

        return frameSrv;
    });
})();