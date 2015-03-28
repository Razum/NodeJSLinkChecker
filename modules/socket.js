/**
 * Created by Roman on 28.02.2015.
 */


module.exports = function (server) {
    var io = require('socket.io').listen(server);
    io.on('connection', function (socket) {
        var scraper = require('./scraper');
        scraper.setSocket(socket);

        socket.on('startscraping', function (data) {
            scraper.setUrl(data.url);
            scraper.scrapForURLs()
        });

        socket.on('checkURLs', function (data) {

            console.log('checkURL server', data)

            scraper.checkURLs(data[0].id)
        });

    });
};
