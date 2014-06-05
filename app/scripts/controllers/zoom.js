(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.controller('SpriteZoom', [function () {
        this.scale = 1;

        this.setScale = function () {
            var uploadCtrl = angular.element(document.getElementById('form-upload')).scope().uploadCtrl;
            if (uploadCtrl.upload.imageCanvas) {
                uploadCtrl.upload.imageCanvas.draw(this.scale);
                uploadCtrl.setSlice();
            }
        };
    }]);
})();
