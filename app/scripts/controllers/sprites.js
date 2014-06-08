(function () {
    'use strict';

    // @TODO At some point you should be able to select multiple sprites to compose an animation

    var app = angular.module('spriteApp');

    var _id = 0; // Fake id system

    app.controller('SpriteCtrl', ['$scope', '$http', 'imageSrv', function ($scope, $http, imageSrv) {
        var spriteCtrl = this;

        this.sprites = [];

        $scope.$on('parseUpload', function (event, sprite) {
            // @TODO Create image via service
            if (!sprite.image_id) {
                var image = spriteCtrl.addImage(sprite.name + ' image', sprite.image, sprite.imageCanvas.canvas.width, sprite.imageCanvas.canvas.height);
                sprite.image_id = image._id;
            }

            // @TODO Append new sprite via service (must be a callback if an image doesn't already exist)
            spriteCtrl.addSprite(sprite.name,
                sprite.image_id,
                sprite.imageCanvas.canvas.width / sprite.cols,
                sprite.imageCanvas.canvas.height / sprite.rows);
        });

        // @TODO Move into a service
        this.addSprite = function (name, image_id, frameWidth, frameHeight) {
            // @TODO Talk to a server first
            this.sprites.unshift({
                name: name,
                _id: _id += 1,
                width: frameWidth,
                height: frameHeight,
                image: image_id
            });
        };

        this.editSprite = function (e, sprite) {
            e.preventDefault();
            e.stopPropagation();

            // @TODO Place inside a proper service
            var name = prompt('Enter Name', sprite.name);
            if (name && name !== '') sprite.name = name;
        };

        this.getImageSrc = function (id) {
            return imageSrv.get(id).src;
        };

        this.removeSprite = function (e, sprite) {
            if (e) e.preventDefault();
            if (e) e.stopPropagation();

            // @TODO Place inside a proper service
            for (var i = this.sprites.length; i--;) {
                if (this.sprites[i]._id === sprite._id) {
                    return this.sprites.splice(i, 1);
                }
            }
        };

        // @TODO Move into a proper service and fire on resolve
        $http.get('/data/sprites.json').success(function (data) {
            spriteCtrl.sprites = data;
        });
    }]);
})();
