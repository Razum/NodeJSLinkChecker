/**
 * Created by Roman on 24.02.2015.
 */

var cheerio = require('cheerio');
var request = require('request');


var url = 'http://onu.edu.ua/';
var urls = [];


module.exports = (function () {
    var site_url = '';
    var urls = [];
    var active_socket;
    return {
        setSocket: function (socket) {
            active_socket = socket;
        },
        setUrl: function (url) {
            site_url = url;
        },
        scrapForURLs: function () {
            request(site_url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(body);
                    var anchors = $('a');
                    var hrefs = [];
                    anchors.each(function(i, elem) {
                        var $this = $(this);
                        var href = $this.attr('href');
                        hrefs[i] = href;

                    });
                    urlsArr = hrefs.filter(function (href) {
                        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        var re_mailto = /mailto/g;
                        if (!href || re_mailto.test(href) || re.test(href) || href.replace(/\s/g, '') == '' || href.replace(/\s/g, '')=='#') {
                            return false;
                        }
                        return href
                    });

                    urls = urlsArr.map(function (url, ind) {
                        return {id: ind, url: url, status: 0, progress: 0}
                    });
                    active_socket.emit('urls', {urls: urls})

                }
            });
        },

        //progress
        // 2 - success
        // 1 - loading
        // 0 - not active
        // 3 - failed

        checkURLs: function (id) {
            console.log(id)
            for (var i = urls.length; i--;) {
                if (urls[i].id == id) {
                    var url = urls[i];
                    request({url: urls[i].url, timeout: 5000}, function (err, response, body) {
                        if (!err) {
                            url.progress = 2;
                            url.status = response.statusCode;
                            active_socket.emit('updateUrls', url);
                            return;
                        }
                        url.progress = 3;
                        url.status = 3;
                        active_socket.emit('updateUrls', url);
                    });
                    break;
                }
            }

        }
    }

}) ();


