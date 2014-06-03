(function () {
    'use strict';

    var app = angular.module('spriteApp');

    app.controller('SpriteCtrl', ['$http', function ($http) {
        var self = this;
        this.images = [];
        this.sprites = [];

        this.getImageSrc = function (id) {
            for (var i = 0, l = self.images.length; i < l; i++) {
                if (id === self.images[i]._id) return self.images[i].src;
            }

            return '';
        };

        $http.get('/data/images.json').success(function (data) {
            self.images = data;
        });

        $http.get('/data/sprites.json').success(function (data) {
            self.sprites = data;
        });
    }]);
})();
