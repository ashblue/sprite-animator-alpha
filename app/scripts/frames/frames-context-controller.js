(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.controller('FramesContextCtrl', function ($scope, frameSrv) {
        var ctrl = this;
        this.current = null;
        this.currentImage = {};

        $scope.$on('showFrameContext', function (e, frame) {
            ctrl.show(frame);
        });

        $scope.$on('clearFrame', function (e, frame) {
            ctrl.current = null;
        });

        this.show = function (frame) {
            var $container = $('#frame-context-select');
            var image = frameSrv.getImage(frame);
            var sprite = frameSrv.getSprite(frame);
            var frameWidth = image.width / sprite.width;

            this.currentImage = image;
            this.current = frame;

            var pos = this.getFramePos(frame, frame.frame);

            $('.frame-context-current-box').css(pos);
        };

        this.setHighlight = function (e) {
            // Turn event coordinates into a frame position
            var sprite = frameSrv.getSprite(this.current);
            var image = frameSrv.getImage(this.current);
            var parentOffset = $(e.currentTarget).offset();
            var widthAdjust = $(e.currentTarget).width() / image.width; // Percentage change from the real width and height
            var heightAdjust = $(e.currentTarget).height() / image.height;
            var x = (e.pageX - parentOffset.left) / widthAdjust;
            var y = (e.pageY - parentOffset.top) / heightAdjust;

            // We must figure out how large the stretched frame size is
            var frame = Math.max(Math.floor(x / sprite.width), 0) +  // x pos
                (Math.floor(y / sprite.height) * (image.width / sprite.width)); // y pos

            // Get position via getFramePos
            var pos = this.getFramePos(this.current, frame);
            $('.frame-context-select-box').css(pos).show();
        };

        this.highlightClear = function () {
            $('.frame-context-select-box').hide();
        };

        this.setFrame = function (e) {
            var sprite = frameSrv.getSprite(this.current);
            var image = frameSrv.getImage(this.current);
            var parentOffset = $(e.currentTarget).offset();
            var widthAdjust = $(e.currentTarget).width() / image.width; // Percentage change from the real width and height
            var heightAdjust = $(e.currentTarget).height() / image.height;
            var x = (e.pageX - parentOffset.left) / widthAdjust;
            var y = (e.pageY - parentOffset.top) / heightAdjust;
            var frame = Math.max(Math.floor(x / sprite.width), 0) +  // x pos
                (Math.floor(y / sprite.height) * (image.width / sprite.width)); // y pos

            this.current.frame = frame;
            this.show(this.current);
            frameSrv.addDirt(this.current._id);
            $scope.$emit('setFrame', this.current);
        };

        this.getFramePos = function (frame, framePos) {
            var image = frameSrv.getImage(frame);
            var sprite = frameSrv.getSprite(frame);
            var frameWidth = image.width / sprite.width;

            return {
                width: (sprite.width / image.width) * 100 + '%',
                height: (sprite.height / image.height) * 100 + '%',
                left: ((framePos === 0 ? 0 : (framePos % frameWidth) * sprite.width) / image.width) * 100 + '%',
                top: ((Math.floor(framePos / frameWidth) * sprite.height) / image.height) * 100 + '%'
            }
        };

        this.hide = function () {
            this.current = null;
        };

        this.remove = function () {
            var frame = this.current;
            $scope.$emit('clearFrame', frame);
            $scope.$emit('removeFrame', frame);
        };
    });

    app.directive('frameContext', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/frames/frames-context-view.html',
            controller: 'FramesContextCtrl',
            controllerAs: 'framesContextCtrl'
        };
    });
})();