var UrlRow = require("./UrlRow.jsx");

var UrlTable = React.createClass({
    render: function () {
        var self = this;
        var rows = this.props.urls.map(function (url, i) {
            return <UrlRow url={url} key={i}/>
        });

        return (
            <div>
                <table className="url-list-table">
                    <thead className="url-list-thead">
                        <tr>
                            <th>ID</th>
                            <th className="url-th">URL</th>
                            <th className="text-center">Progress</th>
                            <th className="text-center">Status code</th>
                        </tr>
                    </thead>
                    <tbody className="url-list-body">
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = UrlTable;