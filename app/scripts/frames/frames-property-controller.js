(function () {
    'use strict';

    var app = angular.module('spriteApp');
    var _event = {};

    app.controller('FrameEditorCtrl', ['$scope', 'frameSrv', function ($scope, frameSrv) {
        var self = this;
        var $gui = $('#dat-gui');
        var gui = new dat.GUI({ autoPlace: false });
        var guiPos = gui.addFolder('Position');
        var guiDetails = gui.addFolder('Details');

        // Hack to make property changes save on changed models
        _event.addDirt = function () {
            frameSrv.addDirt(this._id);
        };

        $gui.append(gui.domElement).hide();

        $scope.$on('setFrame', function (e, frame) {
            self.setFrame(frame);
        });

        $scope.$on('clearFrame', function () {
            self.clearFrame();
        });

        this.setFrame = function (frame) {
            this.clearFrame();

            // Looks nasty but we have to monitor all the model properties for changes so they can be saved to the server
            guiPos.add(frame, 'x', frame.x).onChange(_event.addDirt.bind(frame));
            guiPos.add(frame, 'y', frame.y).onChange(_event.addDirt.bind(frame));
            guiPos.open();

            guiDetails.add(frame, 'frame', 0).onChange(_event.addDirt.bind(frame));
            guiDetails.add(frame, 'alpha', 0, 1).step(0.01).onChange(_event.addDirt.bind(frame));
            guiDetails.add(frame, 'flipX').onChange(_event.addDirt.bind(frame));
            guiDetails.add(frame, 'flipY').onChange(_event.addDirt.bind(frame));
            guiDetails.add(frame, 'pivotX', 0).onChange(_event.addDirt.bind(frame));
            guiDetails.add(frame, 'pivotY', 0).onChange(_event.addDirt.bind(frame));
            guiDetails.add(frame, 'angle', 0, 360).onChange(_event.addDirt.bind(frame));
            guiDetails.open();

            $gui.show();
        };

        this.clearFrame = function () {
            $gui.hide();

            guiPos.__controllers.forEach(function (c) {
                guiPos.remove(c);
            });
            guiPos.__controllers = [];

            guiDetails.__controllers.forEach(function (c) {
                guiDetails.remove(c);
            });
            guiDetails.__controllers = [];
        };

        $scope.$on('$destroy', function () {
            $('#dat-gui').children().detach();
        });
    }]);

    app.directive('frameProperties', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/frames/frames-properties-view.html',
            controller: 'FrameEditorCtrl',
            controllerAs: 'framesEditorCtrl'
        };
    });
})();
