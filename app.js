var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    sys = require('sys'),
    twitter = require('twitter');

app.listen(1337);

var twit = new twitter({
  consumer_key: 'WEpDg3Mmlk2jjk6jaq3uC1Uxl',
  consumer_secret: 'egNLhrtxzoLmv2fmtRj5IgmfDmtyKzvzZPz6IBHTU5iN39uNdn',
  access_token_key: '130073007-kkregBjbT4E0P0k25Hxu8OtDnXtmvZzJRukGovGH',
  access_token_secret: 'hyPeIgTmOAIoSBibuyqgBWd2KpzI5q1Of9O3b2F89rqQP'
});

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var twee = io.of('tweet');


twit.stream('statuses/filter', { track: 'java' }, function(stream) {
  stream.on('data', function (data) {
    io.sockets.emit('tweet', data.text);
    console.log('.');
  });
});