// @src http://stackoverflow.com/questions/11581209/angularjs-pagination-on-a-list-using-ng-repeater
(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.controller('TimelineImagesCtrl', [
        '$scope', 'zoomSrv', 'timelineSrv', 'spriteSrv', 'imageSrv', 'animGroupSrv',
        function ($scope, zoomSrv, timelineSrv, spriteSrv, imageSrv, animGroupSrv) {
        var ctrl = this;
        this.list = timelineSrv.current;

        this.getStage = function () {
            var size = this.getStageSize();

            return {
                width: size.width + 'px',
                height: size.height + 'px',
                marginLeft: (size.width / 2 * -1) + 'px',
                marginTop: (size.height / 2 * -1) + 'px'
            };
        };

        this.getStageSize = function () {
            return {
                width: animGroupSrv.current.width * zoomSrv.scale,
                height: animGroupSrv.current.height * zoomSrv.scale
            };
        };

        this.getImage = function (id) {
            var sprite = spriteSrv.get(id);
            var image = imageSrv.get(sprite.image);
            return image ? image.src : '';
        };

        this.getHitBox = function () {
            var size = this.getStageSize();
            return {
                width: size.width + 'px',
                height: size.height + 'px'
            }
        };

        this.isHitBoxVisible = function () {
            return CONFIG.hitBoxVisible;
        };

        $scope.$on('changeZoom', function (e, scale) {
            // Access all images on zoom change here so the DOM can be responsible for tracking everything
            $('animation-image').each(function () {
                this.sprite.setScale(scale);
            });
        });
    }]);

    app.directive('resizeStage', ['animGroupSrv', 'zoomSrv', function (animGroupSrv, zoomSrv) {
        return {
            restrict: 'A',
            link: function($scope, el, attr) {
                var drag = false;
                var origin = { x: 0, y: 0 };

                el.bind('mousedown', function (e) {
                    drag = true;
                    origin = {
                        x: e.clientX,
                        y: e.clientY
                    };
                });

                $(window).bind('mousemove', function (e) {
                    if (!drag) return;
                    var x = Math.floor((e.clientX - origin.x) / zoomSrv.scale);
                    var y = Math.floor((e.clientY - origin.y) / zoomSrv.scale);

                    $scope.$apply(function () {
                        if (x) {
                            animGroupSrv.current.width += x;
                            if (animGroupSrv.current.width < 0) animGroupSrv.current.width = 0;
                            origin.x = e.clientX;
                        }
                        if (y) {
                            animGroupSrv.current.height += y;
                            if (animGroupSrv.current.height < 0) animGroupSrv.current.height = 0;
                            origin.y = e.clientY;
                        }
                    });
                });

                $(window).bind('mouseup', function () {
                    drag = false;
                });
            }
        };
    }]);

    app.directive('animationImage',
        ['$rootScope', 'imageSrv', 'spriteSrv', 'zoomSrv', function ($rootScope, imageSrv, spriteSrv, zoomSrv) {
            return {
            restrict: 'E',
            transclude: true,
            link: function ($scope, el, attr) {
                var sprite = spriteSrv.get(attr.sprite);
                var anim = new SimpleSprite(attr.src, sprite.width, sprite.height, {
                    scale: zoomSrv.scale,
                    target: el.get(0)
                });

                // Store the canvas in the DOM so it can be accessed at a later date
                // @NOTE Do not bind global $scope events here as they will not be cleaned out of memory
                el.get(0).sprite = anim;
            }
        };
    }]);

    app.directive('animationTimelineImages', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/timelines/images.html',
            controller: 'TimelineImagesCtrl',
            controllerAs: 'timelineImagesCtrl'
        };
    });
})();
