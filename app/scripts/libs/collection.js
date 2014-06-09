(function () {
    'use strict';

    // @TODO Instead of passing in http can we just use jQuery?
    window.sa = window.sa || {};
    var Collection = function (rootUrl, $http) {
        this.online = window.CONFIG.online;
        this.url = rootUrl;
        this.$http = $http;
        this.list = [];
        this.data = {};
        this.timeout = {};
        this.sync = {};
        this._id = 0; // ID stubs for offline mode
        this.ready = false; // Gurantees that population will only run 1x
    };

    // Should only be called via a resolve method for pre-loading
    Collection.prototype.populate = function () {
        if (this.ready) return;
        var collection = this;
        this.ready = true;

        this.$http.get(this.url).success(function (list) {
            list.forEach(function (item) { collection.data[item._id] = item; });
            collection.list = list;
        });
    };

    Collection.prototype.get = function (id) {
        if (typeof id === 'object') id = id._id;
        return this.data[id];
    };

    Collection.prototype.set = function (id, key, value) {
        var collection = this;
        var item = this.get(id);
        item[key] = value;

        // Data is corrupt on the server, send a fix after a short delay in-case more changes come in
        if (this.online) {
            if (this.timeout[id]) this.timeout[id].clearTimeout();
            this.timeout[id] = window.setTimeout(function () {
                collection.$http.put(collection.url + '/' + id, item);
            }, 1000);
        }
    };

    Collection.prototype.create = function (data, callback) {
        var collection = this;

        if (!this.online) {
            data._id = this._id += 1;
            this.data[data._id] = data;
            this.list.unshift(data);
            if (callback) callback(data);
        } else {
            $http.post(this.url).success(function (item) {
                this.data[item._id] = item;
                collection.list.unshift(item);
                if (callback) callback(item);
            });
        }

        return this;
    };

    Collection.prototype.destroy = function (id) {
        var item = this.get(id);
        this.list.splice(this.list.indexOf(item), 1);
        this.data[item._id] = null;
        delete this.data[item._id];

        if (this.online) $http.delete(this.url.root + '/' + item._id);

        return this;
    };

    window.sa.Collection = Collection;
})();