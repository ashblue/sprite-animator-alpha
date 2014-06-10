(function () {
    'use strict';

    // Logic for image manager section
    var app = angular.module('spriteApp');

    var _event = {
        disable: function (e) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    app.controller('TimelinesCtrl', function ($scope, animSrv, timelineSrv, spriteSrv) {
        var timelinesCtrl = this;
        this.list = [];
        this.selected = null;

        $scope.$on('setAnim', function (e, anim) {
            timelinesCtrl.list = [];
            if (!anim || !anim._id) return;

            anim.timelines.forEach(function (id) {
                var data = timelineSrv.get(id);
                if (data) timelinesCtrl.list.push(data);
            });
        });

        $scope.$on('setTimelineLayerPos', function (e, id, zIndex) {
            $scope.$apply(function () {
                timelinesCtrl.setPos(id, zIndex);
            });
        });

        $scope.$on('selectSprite', function (e, sprite) {
            timelinesCtrl.add(sprite);
        });

        this.setPos = function (id, zIndex) {
            var timeline = timelineSrv.get(id);

            // For each timeline in the list with this.zIndex >= zIndex
            if (timeline.zIndex > zIndex) {
                timelinesCtrl.list.forEach(function (item) {
                    if (item === timeline) return;
                    if (item.zIndex >= zIndex) item.zIndex = Math.min(item.zIndex + 1, timelinesCtrl.list.length - 1);
                });
            } else if (timeline.zIndex < zIndex) {
                timelinesCtrl.list.forEach(function (item) {
                    if (item === timeline) return;
                    if (item.zIndex <= zIndex) item.zIndex = Math.max(item.zIndex - 1, 0);
                });
            }

            timeline.zIndex = zIndex;
        };

        this.toggleLock = function (e, timeline) {
            e.preventDefault();
            e.stopPropagation();
            timelineSrv.set(timeline._id, 'lock', !timeline.lock);
            console.log(timeline.lock);
        };

        this.toggleShow = function (e, timeline) {
            e.preventDefault();
            e.stopPropagation();
            timelineSrv.set(timeline._id, 'show', !timeline.show);
        };

        // Set the clicked item to active and strip active from all exiting items
        this.setSelected = function (timeline) {
            this.selected = timeline._id;
        };

        this.isSelected = function (timeline) {
            return this.selected === timeline._id;
        };

        // Find the corresponding sprite sheet and dumps the user on it
        this.showImage = function (timeline) {
            var spriteName = spriteSrv.get(timeline.sprite).name;
            window.location = '/#/sprites?spriteSearch=' + spriteName;
        };

        this.setName = function (e, timeline) {
            e.preventDefault();
            e.stopPropagation();

            var name = prompt('Enter Name', timeline.name);
            if (name && name !== '') timelineSrv.set(timeline._id, 'name', name);
        };

        this.removeSelected = function () {
            if (!this.selected) return;
            this.list.erase(timelineSrv.get(this.selected));
            timelineSrv.destroy(this.selected);
            this.selected = null;
        };

        this.showSprite = function () {
            $('#sprite-modal').modal('show');
        };

        this.add = function (sprite) {
            timelineSrv.create({
                name: sprite.name,
                sprite: sprite._id,
                frames: [],
                zIndex: this.list.length,
                lock: false,
                show: true
            }, function (item) {
                timelinesCtrl.list.push(item);
            });
        };
    });

    app.directive('dragAndDropTimelines', function (timelineSrv) {
        return {
            restrict: 'A',
            link: function($scope, el, attr) {
                el[0].ondragstart = function (e) {
                    e.dataTransfer.setData('id', attr.id);
                };

                el[0].ondrop = function (e) {
                    var id = e.dataTransfer.getData('id');
                    var zIndex = $(this).index(0);
                    $scope.$emit('setTimelineLayerPos', id, zIndex);
                };

                el.bind('dragover', _event.disable);
                el.bind('dragenter', _event.disable);
            }
        };
    });

    // @TODO Move controller declaration into the file somewhere
    app.directive('timelineLayers', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/timelines/layers.html',
            controller: 'TimelinesCtrl',
            controllerAs: 'timelinesCtrl'
        };
    });

    app.directive('timelineToolbar', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/timelines/toolbar.html'
        };
    });
})();