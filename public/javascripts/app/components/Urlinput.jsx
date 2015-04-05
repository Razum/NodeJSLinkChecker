var classNames = require("classnames");

var UrlInput = React.createClass({
    validateForm: function (val) {
        return /^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/.test(val);
    },
    onChange: function (e) {
        var val = e.target.value;
        this.setState({isValid: this.validateForm(val)});
    },

    onURLSubmit: function (e) {
        e.preventDefault();
        var isValid = this.validateForm(this.refs.urlInput.getDOMNode().value);
        this.setState({isValid: isValid});
        if (isValid) {
            this.props.onURLSubmit();
        }

    },
    getInitialState: function () {
        return {
            isValid: true
        }
    },
    render: function () {
        var cls = classNames('error-block', {'error': !this.state.isValid});
        return (
            <div className="input-group">
                <form onSubmit={this.onURLSubmit}>
                    <div className={cls}>* Wrong url</div>
                    <input type="text" ref="urlInput" className="url-input" placeholder="URL" onChange={this.onChange} />
                    <button type="submit" className="url-btn">Submit</button>
                </form>
            </div>
        )
    }
});

module.exports = UrlInput;