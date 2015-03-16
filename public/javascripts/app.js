(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./public/javascripts/app/app.js":[function(require,module,exports){
//var Child = require("./components/TestView.jsx");
//React.render((<Child name="Alex" />), document.getElementById('content'));


var UrlCheckForm = require("./components/UrlCheckForm.jsx");
React.render((React.createElement(UrlCheckForm, null)), document.getElementById('content'));


},{"./components/UrlCheckForm.jsx":"c:\\Users\\roman\\WebstormProjects\\NodeJSLinkChecker\\public\\javascripts\\app\\components\\UrlCheckForm.jsx"}],"c:\\Users\\roman\\WebstormProjects\\NodeJSLinkChecker\\public\\javascripts\\app\\components\\UrlCheckForm.jsx":[function(require,module,exports){

var socket = require('../socket.js');

var UrlInput = require("./UrlInput.jsx");
var UrlTable = require("./UrlTable.jsx");

var UrlCheckForm = React.createClass({displayName: "UrlCheckForm",
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
        var comp = !this.state.showTable ? React.createElement(UrlInput, {onURLSubmit: this.onURLSubmit}) : React.createElement(UrlTable, {urls: this.state.urls, checkURL: this.checkURL});
        return (
            React.createElement("div", null, 
                comp
            )
        )
    }
});
module.exports = UrlCheckForm;

},{"../socket.js":"c:\\Users\\roman\\WebstormProjects\\NodeJSLinkChecker\\public\\javascripts\\app\\socket.js","./UrlInput.jsx":"c:\\Users\\roman\\WebstormProjects\\NodeJSLinkChecker\\public\\javascripts\\app\\components\\UrlInput.jsx","./UrlTable.jsx":"c:\\Users\\roman\\WebstormProjects\\NodeJSLinkChecker\\public\\javascripts\\app\\components\\UrlTable.jsx"}],"c:\\Users\\roman\\WebstormProjects\\NodeJSLinkChecker\\public\\javascripts\\app\\components\\UrlInput.jsx":[function(require,module,exports){
var UrlInput = React.createClass({displayName: "UrlInput",
    render: function () {
        return (
            React.createElement("div", {className: "input-group"}, 
                React.createElement("form", {onSubmit: this.props.onURLSubmit}, 
                    React.createElement("input", {type: "text", className: "url-input", placeholder: "URL"}), 
                    React.createElement("button", {type: "submit", className: "url-btn"}, "Submit")
                )
            )
        )
    }
});

module.exports = UrlInput;

},{}],"c:\\Users\\roman\\WebstormProjects\\NodeJSLinkChecker\\public\\javascripts\\app\\components\\UrlRow.jsx":[function(require,module,exports){

var UrlRow = React.createClass({displayName: "UrlRow",
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
        var progress = this.props.url.progress == 2 && React.createElement("img", {src: "/images/check.png", width: "24", height: "24"}) || this.state.progress == 1 && React.createElement("img", {src: "/images/129.gif"}) ||
            this.state.progress == 0 && React.createElement("button", {onClick: self.checkURL}, "Check");
        var status =  this.props.url.status || this.state.status == 1 && React.createElement("img", {src: "/images/129.gif"}) ||
            this.state.status == 0 && React.createElement("button", {onClick: self.checkURL}, "Check");
        return (
            React.createElement("tr", null, 
                React.createElement("td", null, this.props.url.id), 
                React.createElement("td", null, React.createElement("a", {href: this.props.url.url, target: "_blank"}, this.props.url.url)), 
                React.createElement("td", {className: "text-center"}, progress), 
                React.createElement("td", {className: "text-center"}, status)
            )
        )
    }
});

module.exports = UrlRow;

},{}],"c:\\Users\\roman\\WebstormProjects\\NodeJSLinkChecker\\public\\javascripts\\app\\components\\UrlTable.jsx":[function(require,module,exports){
var UrlRow = require("./UrlRow.jsx");

var UrlTable = React.createClass({displayName: "UrlTable",
    render: function () {
        var self = this;
        var rows = this.props.urls.map(function (url, i) {
            return React.createElement(UrlRow, {url: url, key: i, checkURL: self.props.checkURL})
        });

        return (
            React.createElement("div", null, 
                React.createElement("table", {className: "url-list-table"}, 
                    React.createElement("thead", {className: "url-list-thead"}, 
                        React.createElement("tr", null, 
                            React.createElement("th", null, "ID"), 
                            React.createElement("th", {className: "url-th"}, "URL"), 
                            React.createElement("th", {className: "text-center"}, "Progress"), 
                            React.createElement("th", {className: "text-center"}, "Status code")
                        )
                    ), 
                    React.createElement("tbody", {className: "url-list-body"}, 
                        rows
                    )
                )
            )
        );
    }
});

module.exports = UrlTable;

},{"./UrlRow.jsx":"c:\\Users\\roman\\WebstormProjects\\NodeJSLinkChecker\\public\\javascripts\\app\\components\\UrlRow.jsx"}],"c:\\Users\\roman\\WebstormProjects\\NodeJSLinkChecker\\public\\javascripts\\app\\socket.js":[function(require,module,exports){
/**
 * Created by roman on 16.03.2015.
 */
var socket = io('http://localhost:3000');
module.exports = socket;

},{}]},{},["./public/javascripts/app/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjOlxcVXNlcnNcXHJvbWFuXFxXZWJzdG9ybVByb2plY3RzXFxOb2RlSlNMaW5rQ2hlY2tlclxccHVibGljXFxqYXZhc2NyaXB0c1xcYXBwXFxhcHAuanMiLCJjOlxcVXNlcnNcXHJvbWFuXFxXZWJzdG9ybVByb2plY3RzXFxOb2RlSlNMaW5rQ2hlY2tlclxccHVibGljXFxqYXZhc2NyaXB0c1xcYXBwXFxjb21wb25lbnRzXFxVcmxDaGVja0Zvcm0uanN4IiwiYzpcXFVzZXJzXFxyb21hblxcV2Vic3Rvcm1Qcm9qZWN0c1xcTm9kZUpTTGlua0NoZWNrZXJcXHB1YmxpY1xcamF2YXNjcmlwdHNcXGFwcFxcY29tcG9uZW50c1xcVXJsSW5wdXQuanN4IiwiYzpcXFVzZXJzXFxyb21hblxcV2Vic3Rvcm1Qcm9qZWN0c1xcTm9kZUpTTGlua0NoZWNrZXJcXHB1YmxpY1xcamF2YXNjcmlwdHNcXGFwcFxcY29tcG9uZW50c1xcVXJsUm93LmpzeCIsImM6XFxVc2Vyc1xccm9tYW5cXFdlYnN0b3JtUHJvamVjdHNcXE5vZGVKU0xpbmtDaGVja2VyXFxwdWJsaWNcXGphdmFzY3JpcHRzXFxhcHBcXGNvbXBvbmVudHNcXFVybFRhYmxlLmpzeCIsImM6XFxVc2Vyc1xccm9tYW5cXFdlYnN0b3JtUHJvamVjdHNcXE5vZGVKU0xpbmtDaGVja2VyXFxwdWJsaWNcXGphdmFzY3JpcHRzXFxhcHBcXHNvY2tldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLG1EQUFtRDtBQUNuRCw0RUFBNEU7QUFDNUU7O0FBRUEsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFDNUQsS0FBSyxDQUFDLE1BQU0sRUFBRSxvQkFBQyxZQUFZLEVBQUEsSUFBQSxDQUFHLENBQUEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMs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QUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxnQkFBaUIsQ0FBQSxFQUFBO29CQUM5QixvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGdCQUFpQixDQUFBLEVBQUE7d0JBQzlCLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUE7NEJBQ0Esb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxJQUFPLENBQUEsRUFBQTs0QkFDWCxvQkFBQSxJQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFFBQVMsQ0FBQSxFQUFBLEtBQVEsQ0FBQSxFQUFBOzRCQUMvQixvQkFBQSxJQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGFBQWMsQ0FBQSxFQUFBLFVBQWEsQ0FBQSxFQUFBOzRCQUN6QyxvQkFBQSxJQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGFBQWMsQ0FBQSxFQUFBLGFBQWdCLENBQUE7d0JBQzNDLENBQUE7b0JBQ0QsQ0FBQSxFQUFBO29CQUNSLG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsZUFBZ0IsQ0FBQSxFQUFBO3dCQUM1QixJQUFLO29CQUNGLENBQUE7Z0JBQ0osQ0FBQTtZQUNOLENBQUE7VUFDUjtLQUNMO0FBQ0wsQ0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFROzs7QUM3QnpCOztHQUVHO0FBQ0gsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDekMsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vdmFyIENoaWxkID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9UZXN0Vmlldy5qc3hcIik7XHJcbi8vUmVhY3QucmVuZGVyKCg8Q2hpbGQgbmFtZT1cIkFsZXhcIiAvPiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50JykpO1xyXG5cclxuXHJcbnZhciBVcmxDaGVja0Zvcm0gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL1VybENoZWNrRm9ybS5qc3hcIik7XHJcblJlYWN0LnJlbmRlcigoPFVybENoZWNrRm9ybSAvPiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50JykpO1xyXG4iLCJcclxudmFyIHNvY2tldCA9IHJlcXVpcmUoJy4uL3NvY2tldC5qcycpO1xyXG5cclxudmFyIFVybElucHV0ID0gcmVxdWlyZShcIi4vVXJsSW5wdXQuanN4XCIpO1xyXG52YXIgVXJsVGFibGUgPSByZXF1aXJlKFwiLi9VcmxUYWJsZS5qc3hcIik7XHJcblxyXG52YXIgVXJsQ2hlY2tGb3JtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2hvd1RhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgdXJsczogW11cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNvY2tldC5vbigndXJscycsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3VybHM6IGRhdGEudXJsc30pXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBzb2NrZXQub24oJ3VwZGF0ZVVybHMnLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgdXJscyA9IHNlbGYuc3RhdGUudXJscy5zbGljZSgpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1cmxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXJsc1tpXS5pZCA9PSBkYXRhLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsc1tpXSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt1cmxzOiB1cmxzfSk7XHJcbmNvbnNvbGUubG9nKHNlbGYuc3RhdGUudXJscyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgb25VUkxTdWJtaXQ6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcIlVwZGF0ZSFcIik7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dUYWJsZTogdHJ1ZSB9KTtcclxuICAgICAgICBzb2NrZXQuZW1pdCgnc3RhcnRzY3JhcGluZycsIHt1cmw6ICdodHRwOi8vb251LmVkdS51YS8nfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrVVJMOiBmdW5jdGlvbiAoaWRzKSB7XHJcbiAgICAgICAgc29ja2V0LmVtaXQoJ2NoZWNrVVJMJywgaWRzIHx8IFtdKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvbXAgPSAhdGhpcy5zdGF0ZS5zaG93VGFibGUgPyA8VXJsSW5wdXQgb25VUkxTdWJtaXQ9e3RoaXMub25VUkxTdWJtaXR9IC8+IDogPFVybFRhYmxlIHVybHM9e3RoaXMuc3RhdGUudXJsc30gY2hlY2tVUkw9e3RoaXMuY2hlY2tVUkx9IC8+O1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICB7Y29tcH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59KTtcclxubW9kdWxlLmV4cG9ydHMgPSBVcmxDaGVja0Zvcm07IiwidmFyIFVybElucHV0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMucHJvcHMub25VUkxTdWJtaXR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cInVybC1pbnB1dFwiIHBsYWNlaG9sZGVyPVwiVVJMXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJ1cmwtYnRuXCI+U3VibWl0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFVybElucHV0OyIsIlxyXG52YXIgVXJsUm93ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcHJvZ3Jlc3M6IHRoaXMucHJvcHMudXJsLnByb2dyZXNzLFxyXG4gICAgICAgICAgICBzdGF0dXM6IHRoaXMucHJvcHMudXJsLnN0YXR1c1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tVUkw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oJ2JheCcpO1xyXG4gICAgICAgIHRoaXMucHJvcHMuY2hlY2tVUkwoW3tpZDogdGhpcy5wcm9wcy51cmwuaWR9XSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cHJvZ3Jlc3M6IDEsIHN0YXR1czogMX0pO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZpZXcgd2l0aCBpZCBcIiArIHRoaXMucHJvcHMudXJsLmlkICsgXCIgaXMgcmVuZGVyZWRcIik7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwcm9ncmVzcyA9IHRoaXMucHJvcHMudXJsLnByb2dyZXNzID09IDIgJiYgPGltZyBzcmM9XCIvaW1hZ2VzL2NoZWNrLnBuZ1wiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIC8+IHx8IHRoaXMuc3RhdGUucHJvZ3Jlc3MgPT0gMSAmJiA8aW1nIHNyYz1cIi9pbWFnZXMvMTI5LmdpZlwiLz4gfHxcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5wcm9ncmVzcyA9PSAwICYmIDxidXR0b24gb25DbGljaz17c2VsZi5jaGVja1VSTH0+Q2hlY2s8L2J1dHRvbj47XHJcbiAgICAgICAgdmFyIHN0YXR1cyA9ICB0aGlzLnByb3BzLnVybC5zdGF0dXMgfHwgdGhpcy5zdGF0ZS5zdGF0dXMgPT0gMSAmJiA8aW1nIHNyYz1cIi9pbWFnZXMvMTI5LmdpZlwiIC8+IHx8XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc3RhdHVzID09IDAgJiYgPGJ1dHRvbiBvbkNsaWNrPXtzZWxmLmNoZWNrVVJMfT5DaGVjazwvYnV0dG9uPjtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICA8dGQ+e3RoaXMucHJvcHMudXJsLmlkfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQ+PGEgaHJlZj17dGhpcy5wcm9wcy51cmwudXJsfSB0YXJnZXQ9XCJfYmxhbmtcIj57dGhpcy5wcm9wcy51cmwudXJsfTwvYT48L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+e3Byb2dyZXNzfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57c3RhdHVzfTwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVXJsUm93OyIsInZhciBVcmxSb3cgPSByZXF1aXJlKFwiLi9VcmxSb3cuanN4XCIpO1xyXG5cclxudmFyIFVybFRhYmxlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciByb3dzID0gdGhpcy5wcm9wcy51cmxzLm1hcChmdW5jdGlvbiAodXJsLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8VXJsUm93IHVybD17dXJsfSBrZXk9e2l9IGNoZWNrVVJMPXtzZWxmLnByb3BzLmNoZWNrVVJMfS8+XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidXJsLWxpc3QtdGFibGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQgY2xhc3NOYW1lPVwidXJsLWxpc3QtdGhlYWRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPklEPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ1cmwtdGhcIj5VUkw8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+UHJvZ3Jlc3M8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+U3RhdHVzIGNvZGU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRib2R5IGNsYXNzTmFtZT1cInVybC1saXN0LWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3Jvd3N9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVcmxUYWJsZTsiLCIvKipcclxuICogQ3JlYXRlZCBieSByb21hbiBvbiAxNi4wMy4yMDE1LlxyXG4gKi9cclxudmFyIHNvY2tldCA9IGlvKCdodHRwOi8vbG9jYWxob3N0OjMwMDAnKTtcclxubW9kdWxlLmV4cG9ydHMgPSBzb2NrZXQ7Il19
