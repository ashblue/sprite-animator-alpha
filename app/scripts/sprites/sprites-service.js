(function () {
    'use strict';

    // Logic for image manager section
    var app = angular.module('spriteApp');

    app.factory('spriteSrv', function ($http) {
        var spriteSrv = new window.sa.Collection(CONFIG.sprites.root, $http, {
            slug: 'sprite',
            populateCallback: function () {
                var timeline = sa.col.data.timeline;
                sa.verify.data(this, timeline, 'sprite');
            }
        });
        return spriteSrv;
    });
})();