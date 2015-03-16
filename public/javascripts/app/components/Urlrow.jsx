
var UrlRow = React.createClass({
    getInitialState: function () {
        return {
            progress: this.props.url.progress,
            status: this.props.url.status
        }
    },

    checkURL: function () {
        console.info('bax');
        this.props.checkURL([{id: this.props.url.id}]);
        this.setState({progress: 1, status: 1});
    },

    render: function () {
        console.log("View with id " + this.props.url.id + " is rendered");
        var self = this;
        var progress = this.props.url.progress == 2 && <img src="/images/check.png" width="24" height="24" /> || this.state.progress == 1 && <img src="/images/129.gif"/> ||
            this.state.progress == 0 && <button onClick={self.checkURL}>Check</button>;
        var status =  this.props.url.status || this.state.status == 1 && <img src="/images/129.gif" /> ||
            this.state.status == 0 && <button onClick={self.checkURL}>Check</button>;
        return (
            <tr>
                <td>{this.props.url.id}</td>
                <td><a href={this.props.url.url} target="_blank">{this.props.url.url}</a></td>
                <td className="text-center">{progress}</td>
                <td className="text-center">{status}</td>
            </tr>
        )
    }
});

module.exports = UrlRow;