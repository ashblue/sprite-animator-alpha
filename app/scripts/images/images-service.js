(function () {
    'use strict';

    // Logic for image manager section
    var app = angular.module('spriteApp');

    app.factory('imageSrv', function ($http) {
        var _id = 0; // Fake id system for offline mode

        // @TODO This is pretty much a perfect reusable model for AngularJS, move it into a lib
        var imageSrv = {
            list: [],
            data: {},

            timeout: {}, // List of active timeouts
            sync: {}, // List of active sync operations

            // Should only be called via a resolve method for pre-loading
            populate: function () {
                $http.get(CONFIG.images.root).success(function (list) {
                    list.forEach(function (image) { imageSrv.data[image._id] = image; });
                    imageSrv.list = list;
                });
            },

            get: function (id) {
                if (typeof id === 'object') id = id._id;
                return this.data[id];
            },

            set: function (id, key, value) {
                var item = this.get(id);
                item[key] = value;

                // Data is corrupt on the server, send a fix after a short delay in-case more changes come in
                if (CONFIG.online) {
                    if (this.timeout[id]) this.timeout[id].clearTimeout();
                    this.timeout[id] = window.setTimeout(function () {
                        $http.put(CONFIG.images.root + '/' + id, item);
                    }, 1000);
                }
            },

            create: function (data) {
                if (!this.online) {
                    data._id = _id += 1;
                    this.list.unshift(data);
                } else {
                    $http.post(CONFIG.images.root).success(function (image) {
                        imageSrv.list.unshift(image);
                    });
                }

                return this;
            },

            destroy: function (id) {
                var image = this.get(id);
                this.list.splice(this.list.indexOf(image), 1);
                this.data[image._id] = null;
                delete this.data[image._id];

                if (this.online) $http.delete(CONFIG.images.root + '/' + image._id);

                return this;
            }
        };

        return imageSrv;
    });
})();