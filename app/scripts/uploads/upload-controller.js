(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.controller('UploadCtrl', ['$scope', 'zoomSrv', function ($scope, zoomSrv) {
        var controller = this;
        this.imageReady = false;
        var DEFAULT_IMAGE = '//placehold.it/300';

        // Setup canvas for slicing
        var canvas = document.getElementById('canvas-slice');
        var ctx = canvas.getContext('2d');

        $scope.$on('changeZoom', function (e, scale) {
            if (controller.upload.imageCanvas) {
                controller.upload.imageCanvas.draw(scale);
                controller.setSlice();
            }
        });

        $scope.$on('setUploadSprite', function (e, sprite) {
            controller.upload.sprite_id = sprite._id;
            controller.upload.name = sprite.name;
        });

        this.upload = {
            image: DEFAULT_IMAGE,
            imageCanvas: null,
            rows: 3,
            cols: 3,
            image_id: null,
            sprite_id: null,
            name: null
        };

        this.removeSprite = function () {
            this.upload.name = null;
            this.upload.sprite_id = null;
        };

        this.addUpload = function (sprite) {
            $scope.$emit('parseUpload', sprite);
            this.clearImage();
            this.removeSprite();
            this.upload.name = null;
            this.upload.rows = 3;
            this.upload.cols = 3;
        };

        this.setImage = function (image, ready, id) {
            this.upload.image_id = id;

            var $scaledContainer = $('#canvas-upload-preview');
            this.upload.imageCanvas = null;
            this.upload.imageCanvas = new window.SimpleSpriteSheet(image, {
                scale: zoomSrv.scale,
                callback: function ( ){
                    controller.setSlice();
                }
            });
            $scaledContainer.children().detach();
            $scaledContainer.append(this.upload.imageCanvas.canvas);

            $scope.uploadCtrl.upload.image = image;
            $scope.uploadCtrl.imageReady = ready === false ? false : true;
//            this.setSlice();
        };

        this.imageUpload = function (input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                var self = this;

                reader.onload = function (e) {
                    $scope.$apply(function () {
                        controller.setImage(e.target.result);
                    });
                    self.setSlice();
                };


                reader.readAsDataURL(input.files[0]);
            }
        };

        this.setSlice = function () {
            if (!this.imageReady) return;

            var img = document.getElementById('upload-preview');
            canvas.width = img.naturalWidth * zoomSrv.scale;
            canvas.height = img.naturalHeight * zoomSrv.scale;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#0ff';
            ctx.strokeWeight = 3;
            ctx.beginPath();

            for (var i = 0; i < this.upload.cols; i++) {
                var x = (canvas.width / this.upload.cols) * (i + 1);
                ctx.moveTo(x - 1, 0);
                ctx.lineTo(x - 1, canvas.height);
                ctx.stroke();
            }

            for (var j = 0; j < this.upload.rows; j++) {
                var y = (canvas.height / this.upload.rows) * (j + 1);
                ctx.moveTo(0, y - 1);
                ctx.lineTo(canvas.width, y - 1);
                ctx.stroke();
            }

            ctx.closePath();
        };

        this.clearImage = function () {
            document.getElementById('sprite-file').value = '';
            this.setImage(DEFAULT_IMAGE, false);
            this.upload.image_id = null;
        }
    }]);

    app.directive('uploadForm', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/uploads/upload-view-form.html',
            controller: 'UploadCtrl',
            controllerAs: 'uploadCtrl'
        };
    });
})();
