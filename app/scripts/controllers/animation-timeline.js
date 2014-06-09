(function () {
    'use strict';

    // @TODO At some point you should be able to select multiple sprites to compose an animation

    var app = angular.module('spriteApp');

    var _id = 0; // Fake id system

    app.controller('AnimationTimelineCtrl', ['$scope', '$http', function ($scope, $http) {
        // BEGIN Dat gui test
        // @TODO Remember open / close state via local storage
        // @TODO Move into an appropriate method
        // @TODO DOM element must be manually generated at controller init so it doesn't show up on every page
        var gui = new dat.GUI({ autoPlace: false });
        window.gui = gui;
        $('#dat-gui').append(gui.domElement);
        var data = {
            x: 0,
            y: 0,
            flipX: false,
            flipY: false,
            pivotX: 0,
            pivotY: 0,
            angle: 0,
            alpha: 1.00
        };

        var pos = gui.addFolder('Position');
        pos.add(data, 'x', 0);
        pos.add(data, 'y', 0);
//        pos.open();

        var details = gui.addFolder('Details');
        details.add(data, 'alpha', 0, 1).step(0.01);
        details.add(data, 'flipX');
        details.add(data, 'flipY');
        details.add(data, 'pivotX', 0);
        details.add(data, 'pivotY', 0);
        details.add(data, 'angle', 0, 360).onChange(function (e) {
            // Filter to radians
//            console.log(e, 'Change');
        }).onFinishChange(function (e) {
//                console.log(e, 'Change finish');
            });
//        details.open();
        gui.close();
        // END Dat gui test

        $scope.$on('$destroy', function () {
            $('#dat-gui').children().detach();
        });
    }]);
})();
