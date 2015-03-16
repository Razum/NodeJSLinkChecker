var UrlInput = React.createClass({
    render: function () {
        return (
            <div className="input-group">
                <form onSubmit={this.props.onURLSubmit}>
                    <input type="text" className="url-input" placeholder="URL" />
                    <button type="submit" className="url-btn">Submit</button>
                </form>
            </div>
        )
    }
});

module.exports = UrlInput;