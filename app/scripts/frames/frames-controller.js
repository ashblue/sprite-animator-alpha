(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.controller('FramesCtrl', function ($scope, timelineSrv, frameSrv) {
        this.listTimelines = timelineSrv.current;
        var disabled = false;
        var ctrl = this;

        $scope.$on('removeFrame', function (e, frame) {
            ctrl.removeKeyframe(frame);
        });

        this.addKeyframe = function (e, timeline) {
            if (disabled) return;
            var index = $(e.target).index();
            if (index === 0) return; // Never create something at the 0 index
            disabled = true;

            // @TODO Verify a frame at this position does not already exist (just to be safe)

            // Grab the previous frame and make a duplicate copy for insertion into the timeline
            var prevframe = frameSrv.getFrameIndex(timeline._id, index);
            var frame = window.sa.object.merge({}, prevframe);
            frame.index = index;
            frame.lock = false;
            frame.length = 1;
            delete frame.$$hashKey;
            delete frame._id;

            frameSrv.create(frame, function (item) {
                disabled = false;
                timeline.frames.push(item._id);
            });
        };

        this.select = function (frame) {
            // Frame already selected? Show the context menu
            if (frameSrv.current === frame) this.showContext(frame);

            frameSrv.current = frame;
            $scope.$emit('setFrame', frame);

            // Fill dat gui with current details
            // Displays a popup menu with the following
            // Frame selector
            // Delete
        };

        // Shows a context menu for the passed frame
        this.showContext = function (frame) {
            $scope.$emit('showFrameContext', frame);
        };

        // Wipe the current active frame from memory
        this.clear = function () {
            frameSrv.current = null;
            $scope.$emit('clearFrame', frame);
        }

        // Is the current frame active?
        this.isActive = function (frame) {
            return (frameSrv.current ? frameSrv.current._id === frame._id : false);
        };

        // Destory a key frame
        this.removeKeyframe = function (frame) {
            var timeline = timelineSrv.get(frame.timeline);
            timeline.frames.erase(frame._id);
            frameSrv.destroy(frame._id);
            // Delete from current
        };

        // Calculates the correct position for a frame since they're all free floating
        this.getPos = function (frame) {
            var $tick = $('.tick-background .tick:first');
            return {
                left: frame.index * $tick.outerWidth(true),
                width: $tick.outerWidth() * frame.length
            };
        };

        // Runs a populate command to get all the frames
        this.getFrames = function (timeline) {
            var frames = timeline.frames;
            return timeline.frames.map(function (id) {
                return frameSrv.get(id);
            });
        };
    });

    app.directive('frames', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/frames/frames-view.html',
            controller: 'FramesCtrl',
            controllerAs: 'framesCtrl'
        };
    });
})();