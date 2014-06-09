(function () {
    'use strict';

    // Logic for image manager section
    var app = angular.module('spriteApp');

    app.controller('AnimGroup', function ($scope, animGroupSrv) {
        var animGroupCtrl = this;
        this.current = animGroupSrv.list[0] || {}; // Currently selected animation group
        this.show = false; // Show the manager
        this.list = animGroupSrv.list;

        $scope.$on('animGroupClose', function () {
            animGroupCtrl.show = false;
        });

        this.new = function () {
            animGroupSrv.create({
                name: 'Untitled',
                animations: []
            });
        };

        this.set = function (item) {
            this.current = item;
        };

        this.remove = function (item) {
            animGroupSrv.destroy(item._id);
        };

        this.toggle = function (e) {
            this.show = !this.show;
        };
    });

    app.directive('animationGroupManager', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/anim-group/manager.html',
            controller: 'AnimGroup',
            controllerAs: 'animGroup'
        };
    });

    app.directive('animationGroupHeader', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/anim-group/header.html',
            controller: 'AnimGroup',
            controllerAs: 'animGroup'
        };
    });
})();