// @src http://stackoverflow.com/questions/11581209/angularjs-pagination-on-a-list-using-ng-repeater
(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.controller('SpriteModalCtrl', ['$scope', 'spriteSrv', 'imageSrv', function ($scope, spriteSrv, imageSrv) {
        $scope.list = spriteSrv.list;
        $scope.page = 0;
        $scope.pageSize = 10;

        $scope.pageCount = function () {
            return Math.ceil($scope.list.length / $scope.pageSize);
        };

        $scope.select = function (e, sprite) {
            e.preventDefault();
            $('#sprite-modal').modal('hide');
            $scope.$emit('selectSprite', sprite);
        };

        $scope.getImageSrc = function (id) {
            var image = imageSrv.get(id);
            return image ? image.src : '';
        };
    }]);

    app.filter('startFrom', function() {
        return function(input, start) {
            return input.slice(start);
        }
    });

    app.directive('spriteModal', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/sprites/sprites-view-modal.html',
            controller: 'SpriteModalCtrl',
            controllerAs: 'spriteModalCtrl'
        };
    });
})();
