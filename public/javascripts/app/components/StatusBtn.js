var StatusBtn = React.createClass({
    render: function () {


        var propStatus = this.props.status,
            inProcess = this.props.inProcess,
            status = propStatus == 3 && <span>-</span> ||
                propStatus > 3 && <span>{propStatus}</span> ||
                inProcess == 1 && <img src="/images/129.gif" /> ||
                inProcess == 0 && <button onClick={this.props.checkURLs}>Check</button>;

        return status;

    }
});

module.exports = StatusBtn;
