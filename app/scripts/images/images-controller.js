(function () {
    'use strict';

    // Logic for image manager section
    var app = angular.module('spriteApp');

    app.controller('ImageCtrl', function ($scope, imageSrv) {
        var imageCtrl = this;
        this.list = imageSrv.list;

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

            imageSrv.destroy(image._id);

            // @TODO Force remove any sprite sheets referencing this image
//            for (var i = 0, l = this.sprites.length; i < l; i++) {
//                if (this.sprites[i].image === removedImage._id) {
//                    this.removeSprite(null, this.sprites[i]);
//                }
//            }
        };
    });

    app.directive('imageList', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/images/images-view-list.html',
            controller: 'ImageCtrl',
            controllerAs: 'images'
        };
    });
})();