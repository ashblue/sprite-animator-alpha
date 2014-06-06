(function () {
    'use strict';

    // @TODO At some point you should be able to select multiple sprites to compose an animation

    var app = angular.module('spriteApp');

    var _id = 0; // Fake id system

    app.controller('SpriteCtrl', ['$scope', '$http', function ($scope, $http) {
        var spriteCtrl = this;
        this.images = [];
        this.sprites = [];

        this.getImageSrc = function (id) {
            for (var i = 0, l = spriteCtrl.images.length; i < l; i++) {
                if (id === spriteCtrl.images[i]._id) return spriteCtrl.images[i].src;
            }

            return '';
        };

        // Inject the chosen image into the upload details
        this.showImage = function (e, image) {
            e.preventDefault();
            var uploadCtrl = angular.element(document.getElementById('form-upload')).scope().uploadCtrl;
            uploadCtrl.setImage(image.src, true, image._id);
        };

        $scope.$on('parseUpload', function (event, sprite) {
            if (!sprite.image_id) {
                var image = spriteCtrl.addImage(sprite.name + ' image', sprite.image, sprite.imageCanvas.canvas.width, sprite.imageCanvas.canvas.height);
                sprite.image_id = image._id;
            }

            spriteCtrl.addSprite(sprite.name,
                sprite.image_id,
                sprite.imageCanvas.canvas.width / sprite.cols,
                sprite.imageCanvas.canvas.height / sprite.rows);
        });

        this.addImage = function (name, src, width, height) {
            // @TODO Talk to a server first
            var image = {
                name: name,
                _id: _id += 1,
                width: width,
                height: height,
                src: src
            };

            this.images.unshift(image);

            return image;
        };

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

        this.editImage = function (e, image) {
            e.preventDefault();
            e.stopPropagation();

            var name = prompt('Enter Name', image.name);
            if (name && name !== '') image.name = name;
        };

        this.editSprite = function (e, sprite) {
            e.preventDefault();
            e.stopPropagation();

            var name = prompt('Enter Name', sprite.name);
            if (name && name !== '') sprite.name = name;
        };

        this.removeImage = function (e, image) {
            e.preventDefault();
            e.stopPropagation();

            // @TODO Should actually talk to a server first
            for (var i = this.images.length; i--;) {
                if (this.images[i]._id === image._id) {
                    var removedImage = this.images.splice(i, 1)[0];
                    break;
                }
            }

            for (var i = 0, l = this.sprites.length; i < l; i++) {
                if (this.sprites[i].image === removedImage._id) {
                    this.removeSprite(null, this.sprites[i]);
                }
            }
        };

        this.removeSprite = function (e, sprite) {
            if (e) e.preventDefault();
            if (e) e.stopPropagation();

            // @TODO Should actually talk to a server first
            for (var i = this.sprites.length; i--;) {
                if (this.sprites[i]._id === sprite._id) {
                    return this.sprites.splice(i, 1);
                }
            }
        };

        $http.get('/data/images.json').success(function (data) {
            spriteCtrl.images = data;
//
            $http.get('/data/sprites.json').success(function (data) {
                spriteCtrl.sprites = data;
            });
        });
    }]);
})();
