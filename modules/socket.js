/**
 * Created by Roman on 28.02.2015.
 */


module.exports = function (server) {
    var io = require('socket.io').listen(server);
    io.on('connection', function (socket) {
        var scraper = require('./scraper');
        scraper.setSocket(socket);
        socket.emit('news', { hello: 'world' });


        socket.on('startscraping', function (data) {
            console.log(data);
            scraper.setUrl(data.url);
            scraper.scrapForURLs()
        });
    });
}
