
var socket = require('../socket.js');

var UrlInput = require("./UrlInput.jsx");
var UrlTable = require("./UrlTable.jsx");

var UrlCheckForm = React.createClass({
    getInitialState: function () {
        return {
            showTable: false,
            urls: []
        }
    },
    componentDidMount: function() {
    var self = this;
        socket.on('urls', function (data) {
            self.setState({urls: data.urls})
        });


        socket.on('updateUrls', function (data) {
            var urls = self.state.urls.slice();

            for (var i = 0; i < urls.length; i++) {
                if (urls[i].id == data.id) {
                    urls[i] = data;
                    break;
                }

            }

            self.setState({urls: urls});
console.log(self.state.urls);
        });
    },
    onURLSubmit: function (e) {
        e.preventDefault();
        console.warn("Update!");
        this.setState({ showTable: true });
        socket.emit('startscraping', {url: 'http://onu.edu.ua/'});
    },

    checkURL: function (ids) {
        socket.emit('checkURL', ids || []);
    },

    render: function () {
        var comp = !this.state.showTable ? <UrlInput onURLSubmit={this.onURLSubmit} /> : <UrlTable urls={this.state.urls} checkURL={this.checkURL} />;
        return (
            <div>
                {comp}
            </div>
        )
    }
});
module.exports = UrlCheckForm;