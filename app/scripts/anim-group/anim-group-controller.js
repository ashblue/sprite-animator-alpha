(function () {
    'use strict';

    // Logic for image manager section
    var app = angular.module('spriteApp');

    app.controller('AnimGroup', function ($scope, animGroupSrv, animSrv) {
        var animGroupCtrl = this;
        this.show = false; // Show the manager
        this.showSettings = false; // Show the settings
        this.list = animGroupSrv.list;

        this.new = function () {
            animGroupSrv.create({
                name: 'Untitled',
                width: CONFIG.animationGroups.defaultWidth,
                height: CONFIG.animationGroups.defaultHeight,
                animations: []
            });
        };

        this.set = function (item) {
            this.current = item;
            animGroupSrv.current = item;
            $scope.$emit('setAnimGroup', item);
        };
        this.set(animGroupSrv.current);

        // @TODO Temporary debug method to autofill on load, could be more re-usable
        if (CONFIG.debug) {
            window.setTimeout(function () {
                $scope.$apply(function () {
                    if (animGroupCtrl.list.length > 0) animGroupCtrl.set(animGroupCtrl.list[0]);
                });
            }, 500);
        }

        this.remove = function (item) {
            if (!window.sa.confirm.remove()) return;

            if (item._id === animGroupSrv.current._id) this.set({});
            animGroupSrv.destroy(item._id);
            $scope.$emit('clearAnimationGroup');

            // @TODO Find all animations, timelines, and frames. Then delete them
            item.animations.forEach(function (id) {
                animSrv.destroy(id);
            });
        };

        this.toggle = function (e) {
            this.show = !this.show;
            this.showSettings = false;
        };

        this.toggleSettings = function () {
            this.showSettings = !this.showSettings;
            this.show = false;
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
            templateUrl: 'scripts/anim-group/header.html'
        };
    });

//    app.directive('animationGroupSprites', function() {
//        return {
//            restrict: 'E',
//            templateUrl: 'scripts/anim-group/anim-sprites.html',
//            controller: 'AnimGroup',
//            controllerAs: 'animGroup'
//        };
//    });
})();