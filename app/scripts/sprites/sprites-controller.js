(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.controller('SpriteCtrl', ['$scope', '$http', 'spriteSrv', 'imageSrv', function ($scope, $http, spriteSrv, imageSrv) {
        var spriteCtrl = this;
        this.list = spriteSrv.list;

        // Expects sprite sheet data from the upload form
        $scope.$on('createSprite', function (event, sprite) {
            sprite.width = sprite.imageCanvas.canvas.width / sprite.cols;
            sprite.height = sprite.imageCanvas.canvas.height / sprite.rows;
            spriteCtrl.create(sprite);
        });

        this.editSprite = function (e, sprite) {
            e.preventDefault();
            e.stopPropagation();

            var name = prompt('Enter Name', sprite.name);
            if (name && name !== '') spriteSrv.set(sprite._id, 'name', name);
        };

        this.getImageSrc = function (id) {
            var image = imageSrv.get(id);
            return image ? image.src : '';
        };

        this.removeSprite = function (e, sprite) {
            if (e) e.preventDefault();
            if (e) e.stopPropagation();

            spriteSrv.destroy(sprite._id);
        };
    }]);

    app.directive('spriteList', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/sprites/sprites-view-list.html',
            controller: 'SpriteCtrl',
            controllerAs: 'sprites'
        };
    });
})();
