module.exports = {
    init: function(ircBot) {

        ircBot.addListener('message', function(nick, to, text, message) {

            var config = require('../../config/config.json');

            if(text.substr(0,1) == config.commandChar) {

                var command = text.split(' ');

                var http = require('http');

                switch(command[0].substr(1)) {

                    case 'shellcode': {

                        var body = '';

                        var fs = require('fs');

                        var filename = '/tmp/shellcode_' + new Date().getTime() + '.txt';

                        var stream = fs.createWriteStream(filename);

                        var options = {
                            hostname: 'www.shell-storm.org',
                            port: 80,
                            path: '/api/?s=' + command.slice(1).join('*'),
                            method: 'GET'
                        };

                        var i = 0;

                        var req = http.request(options, function(res) {

                            res.setEncoding('utf8');

                            res.pipe(stream);

                            /*
                                @todo: put everything into a file, then read randomly from said file up to n lines
                             */
                            res.on('data', function (chunk) {
                                i++;
                                if(i == 1) {
                                    if(chunk.indexOf('http') > -1) {
                                        ircBot.say(to, chunk);
                                    }
                                }
                            });
                        });

                        req.on('error', function(e) {
                            ircBot.say(to, 'Failed to retrieve shellcodes');
                        });

                        req.end();
                    }
                }
            }
        });
    }
}