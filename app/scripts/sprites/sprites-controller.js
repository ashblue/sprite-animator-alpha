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
        $scope.$on('createSprite', function (event, sprite) {
            spriteSrv.create({
                name: sprite.name,
                image: sprite.image,
                width: sprite.imageCanvas.canvas.width / zoomSrv.scale / sprite.cols,
                height: sprite.imageCanvas.canvas.height / zoomSrv.scale / sprite.rows
            });
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
            controllerAs: 'spritesCtrl'
        };
    });
})();
