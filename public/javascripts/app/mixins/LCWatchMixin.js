var LCStore = require('../stores/lc-store');

var LCWatchMixin = {
    componentWillMount: function() {
        LCStore.addChangeListener(this._onChange)
    },
    componentWillUnmount: function () {
        LCStore.removeChangeListener(this._onChange)
    },
    getInitialState: function () {
        return {
            urls: LCStore.getURLs()
        }
    }
};


module.exports = LCWatchMixin;