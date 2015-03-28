var LCConstants = require('../constants/lc-constants.js');
var LCDispatcher = require('../dispatchers/lc-dispatcher.js');


var LCActions = {
    startScrapingURLs: function (site_url) {
        LCDispatcher.handleViewAction({actionType: LCConstants.SCRAP_URLS, site_url: site_url});
    },
    checkURLs: function (ids) {
        LCDispatcher.handleViewAction({actionType: LCConstants.CHECK_URLS, ids: ids});
    }
};

module.exports = LCActions;