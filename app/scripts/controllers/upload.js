(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.controller('UploadController', ['$scope', function ($scope) {
        var controller = this;
        this.imageReady = false;
        var DEFAULT_IMAGE = '//placehold.it/300';

        // Setup canvas for slicing
        var canvas = document.getElementById('canvas-slice');
        var ctx = canvas.getContext('2d');

        this.upload = {
            image: DEFAULT_IMAGE,
            rows: 3,
            cols: 3
        };

        this.addUpload = function (sprite) {
            console.log('submitted');
        };

        this.setImage = function (image, ready) {
            // @TODO In addition to inputs also support pre-existing images with ID (use hidden input)
            // @TODO Also support data-uris

            $scope.uploadCtrl.upload.image = image;
            $scope.uploadCtrl.imageReady = ready === false ? false : true;
            this.setSlice();
        };

        this.imageUpload = function (input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                var self = this;

                // @TODO Verify image is jpg, png, or gif

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
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

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
        }
    }]);
})();
