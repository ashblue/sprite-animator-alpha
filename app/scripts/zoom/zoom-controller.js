(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.controller('SpriteZoom', ['$scope', 'zoomSrv', function ($scope, zoomSrv) {
        this.scale = zoomSrv.scale;

        this.setScale = function () {
            zoomSrv.scale = this.scale;
            $scope.$emit('changeZoom', this.scale);
        };
    }]);
})();
