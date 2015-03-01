var socket = io('http://localhost:3000');
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});

socket.emit('startscraping', {url: 'http://onu.edu.ua/'})
socket.on('urls', function (data) {
    console.log(data);
})