var ProgressBtn = React.createClass({
    render: function () {
        var propProgress = this.props.progress,
            inProcess = this.props.inProcess,
            progress =  propProgress == 3 && <img src="/images/error.png" width="24" height="24" /> ||
            propProgress == 2 && <img src="/images/check.png" width="24" height="24" /> ||
            inProcess == 1 && <img src="/images/129.gif"/> ||
            inProcess == 0 && <button onClick={this.props.checkURLs}>Check</button>;

        return progress;
    }
});

module.exports = ProgressBtn;