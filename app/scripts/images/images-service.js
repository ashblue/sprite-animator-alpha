(function () {
    'use strict';

    // Logic for image manager section
    var app = angular.module('spriteApp');

    app.factory('imageSrv', function ($http) {
        var imageSrc = new window.sa.Collection(CONFIG.images.root, $http, {
            slug: 'image',
            populateCallback: function () {
                var sprite = sa.col.data.sprite;
                sa.verify.data(this, sprite, 'image');
            }
        });
        return imageSrc;
    });
})();