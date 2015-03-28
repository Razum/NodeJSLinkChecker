var LCActions = require('../actions/lc-actions');
var ProgressBtn = require('./ProgressBtn');
var StatusBtn = require('./StatusBtn');

var UrlRow = React.createClass({
    getInitialState: function () {
        return {
            inProcess: 0
        }
    },

    checkURLs: function () {
        this.setState({inProcess: 1});
        LCActions.checkURLs([{id: this.props.url.id}]);
    },

    render: function () {
        var self = this;




        return (
            <tr>
                <td>{this.props.url.id}</td>
                <td><a href={this.props.url.url} target="_blank">{this.props.url.url}</a></td>
                <td className="text-center"><ProgressBtn inProcess={this.state.inProcess} progress={this.props.url.progress} checkURLs={this.checkURLs} /></td>
                <td className="text-center"><StatusBtn inProcess={this.state.inProcess} status={this.props.url.status} checkURLs={this.checkURLs} /></td>
            </tr>
        )
    }
});

module.exports = UrlRow;