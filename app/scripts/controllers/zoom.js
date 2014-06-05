(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.controller('SpriteZoom', [function () {
//        var scaler = document.getElementById('scale-range');
        this.scale = 1;

        this.setScale = function () {
            console.log('hit');
        };
    }]);
})();
