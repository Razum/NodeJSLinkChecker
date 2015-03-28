var LCConstants = require('../constants/lc-constants');
var LCDispatcher = require('../dispatchers/lc-dispatcher');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var socket = require('../socket');

var CHANGE_EVENT = "change";

var _urls = [];
function _getUrls () {
    return _urls;
}

function _setURLs(urls_arr) {
    _urls = urls_arr.slice();
}

function _startScraping (site_url) {
    socket.emit('startscraping', {url: site_url});
}

function _checkURLs (ids) {
    socket.emit('checkURLs', ids);
}



var LCStrore = objectAssign(EventEmitter.prototype, {
    init: function () {
        socket.on('urls', function (data) {
            _setURLs(data.urls);
            this.emitChange();
        }.bind(this));

        socket.on('updateUrls', function (data) {
            for (var i = 0; i < _urls.length; i++) {
                if (_urls[i].id == data.id) {
                    _urls[i] = data;
                    break;
                }

            }
            this.emitChange();
        }
        .bind(this));

    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback)
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },

    getURLs: function () {
        return _urls;
    },

    dispatcherCallback: LCDispatcher.register(function (payload) {
        var action = payload.action,
            needEmitChange = true;


        switch(action.actionType) {
            case LCConstants.SCRAP_URLS:
                _startScraping(payload.action.site_url);
                needEmitChange = false;
                break;
            case LCConstants.CHECK_URLS:
                _checkURLs(payload.action.ids);
                needEmitChange = false;
                break;
        }

        needEmitChange && LCStrore.emitChange();
        return true;
    })
});

LCStrore.init();

module.exports = LCStrore;