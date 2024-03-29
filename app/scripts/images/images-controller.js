(function () {
    'use strict';

    // Logic for image manager section
    var app = angular.module('spriteApp');

    app.controller('ImageCtrl', function ($scope, imageSrv, spriteSrv, zoomSrv) {
        var imageCtrl = this;
        this.list = imageSrv.list;

        $scope.$on('parseUpload', function (event, sprite) {
            if (!sprite.image_id) {
                imageSrv.create({
                    name: sprite.name + ' image',
                    src: sprite.image,
                    width: sprite.imageCanvas.canvas.width / zoomSrv.scale,
                    height: sprite.imageCanvas.canvas.height / zoomSrv.scale
                }, function (item) {
                    sprite.image = item._id;
                    $scope.$emit('createSprite', sprite);
                });
            } else {
                sprite.image = sprite.image_id;
                $scope.$emit('createSprite', sprite);
            }
        });

        // Inject the chosen image into the upload details
        // @TODO On the fence with this, feels more like it should be converted to an event emitter
        this.showImage = function (e, image) {
            e.preventDefault();

            var uploadCtrl = angular.element(document.getElementById('form-upload')).scope().uploadCtrl;
            uploadCtrl.setImage(image.src, true, image._id);
        };

        this.editImage = function (e, image) {
            e.preventDefault();
            e.stopPropagation();

            var name = prompt('Enter Name', image.name);
            if (name && name !== '') imageSrv.set(image._id, 'name', name);
        };

        this.removeImage = function (e, image) {
            e.preventDefault();
            e.stopPropagation();

            if (!window.sa.confirm.remove()) return;

            imageSrv.destroy(image._id);

            // Force remove any sprite sheets referencing this image
            var sprites = [];
            spriteSrv.list.forEach(function (sprite) {
                if (sprite.image === image._id) {
                    sprites.push(sprite);
                }
            });
            sprites.forEach(function (sprite) { $scope.$emit('removeSprite', sprite); });
        };
    });

    app.directive('imageList', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/images/images-view-list.html',
            controller: 'ImageCtrl',
            controllerAs: 'imagesCtrl'
        };
    });
})();