(function () {
    'use strict';

    // Logic for image manager section
    var app = angular.module('spriteApp');

    app.controller('AnimCtrl', function ($scope, animGroupSrv, animSrv) {
        var animCtrl = this;
        this.current = null; // Current animation
        this.list = null; // Current animation list
        this.show = false;

        $scope.$on('setAnimGroup', function (e, animationGroup) {
            animCtrl.list = null;
            animCtrl.current = null;
            animCtrl.show = true;
            if (!animationGroup.animations) return;

            var list = [];
            animationGroup.animations.forEach(function (id) {
                list.push(animSrv.get(id));
            });

            if (CONFIG.debug) { animCtrl.set(list[0]); }
            animCtrl.list = list;
        });

        this.set = function (anim) {
            this.current = anim;
            $scope.$emit('setAnim', anim);
        };

        this.new = function () {
            animSrv.create({
                "name": "Untitled",
                "speed": 0.3,
                "length": 10,
                "timelines": []
            }, function (anim) {
                animCtrl.list.unshift(anim);
                animGroupSrv.current.animations.push(anim._id);
                animGroupSrv.addDirt(animGroupSrv.current._id);
            });
        };

        this.remove = function (anim) {
            if (!window.sa.confirm.remove()) return;
            if (this.current === anim) this.current = null;
            this.list.erase(anim);
            animSrv.destroy(anim._id);
            animGroupSrv.current.animations.erase(anim._id);
            animGroupSrv.addDirt(animGroupSrv.current._id);
        };

        $scope.$on('clearAnimationGroup', function (e) {
            animCtrl.list = null;
            animCtrl.current = null;
            animCtrl.show = false;
        });

        this.setCurrent = function (current) {
            this.current = current;
        };
    });

    app.directive('animationList', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/anim/list.html',
            controller: 'AnimCtrl',
            controllerAs: 'animCtrl'
        };
    });

    app.directive('animationSettings', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/anim/settings.html'
        };
    });
})();