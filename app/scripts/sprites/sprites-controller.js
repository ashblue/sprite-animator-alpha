(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.controller('SpriteCtrl',
    ['$scope', '$http', '$routeParams', 'spriteSrv', 'imageSrv', 'zoomSrv',
    function ($scope, $http, $routeParams, spriteSrv, imageSrv, zoomSrv) {
        var spriteCtrl = this;
        this.list = spriteSrv.list;
        $scope.spriteSearch = $routeParams.spriteSearch; // Force filter if URL param is available


        // Expects sprite sheet data from the upload form
        $scope.$on('createSprite', function (event, upload) {
            if (!upload.sprite_id) {
                spriteSrv.create({
                    name: upload.name,
                    image: upload.image,
                    width: upload.imageCanvas.canvas.width / zoomSrv.scale / upload.cols,
                    height: upload.imageCanvas.canvas.height / zoomSrv.scale / upload.rows
                });
            } else {
                spriteSrv.set(upload.sprite_id, {
                    image: upload.image,
                    width: upload.imageCanvas.canvas.width / zoomSrv.scale / upload.cols,
                    height: upload.imageCanvas.canvas.height / zoomSrv.scale / upload.rows
                });
            }
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

        this.uploadSwap = function (sprite) {
            $scope.$emit('setUploadSprite', sprite);
        };
    }]);

    app.directive('spriteList', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/sprites/sprites-view-list.html',
            controller: 'SpriteCtrl',
            controllerAs: 'spritesCtrl'
        };
    });
})();
