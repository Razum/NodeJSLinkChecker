var LCStore = require('../stores/lc-store');
var LCActions = require('../actions/lc-actions');
var LCWatchMixin = require('../mixins/LCWatchMixin');

var UrlInput = require("./UrlInput.jsx");
var UrlTable = require("./UrlTable.jsx");

var UrlCheckForm = React.createClass({
    mixins: [LCWatchMixin],
    getInitialState: function () {
        return {
            showTable: false
        }
    },
    _onChange: function () {
        console.log("ON_CHANGE");
        this.setState({urls: LCStore.getURLs()})
    },

    onURLSubmit: function (url) {
        this.setState({showTable: true});
        LCActions.startScrapingURLs("http://onu.edu.ua");
    },

    checkURLs: function (ids) {
        LCActions.checkURLs(ids || []);
    },

    render: function () {
        var comp = !this.state.showTable ? <UrlInput onURLSubmit={this.onURLSubmit} /> : <UrlTable urls={this.state.urls}/>;
        return (
            <div>
                {comp}
            </div>
        )
    }
});
module.exports = UrlCheckForm;