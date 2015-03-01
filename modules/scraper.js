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
                    urls = hrefs.filter(function (href) {
                        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        var re_mailto = /mailto/g;
                        if (!href || re_mailto.test(href) || re.test(href) || href.replace(/\s/g, '') == '' || href.replace(/\s/g, '')=='#') {
                            return false;
                        }
                        return href
                    });

                    console.log(urls)
                    active_socket.emit('urls', {urls: urls})

                }
            });
        }
    }

}) ();


