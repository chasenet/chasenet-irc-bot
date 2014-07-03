module.exports = {

    init: function(ircBot) {

        ircBot.addListener('message', function(nick, to, text, message) {

            var config = require('../../config/config.json');

            if( config.default_ignore_nicks.indexOf( nick.toLowerCase()) == -1) {

                if(text.substr(0,1) == config.commandChar) {

                    var command = text.split(' ');

                    var http = require('http');

                    switch(command[0].substr(1)) {

                        case 'shellcode': {

                            if(command.length < 2) {

                                ircBot.say(to, 'Usage: ' + config.commandChar + 'shellcode [keyword to search]');

                            } else {

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

                                    ircBot.say(to, nick + ': Results in PM (if found)');

                                    /*
                                        @todo: put everything into a file, then read randomly from said file up to n lines
                                     */
                                    res.on('data', function (chunk) {
                                        i++;

                                        if(i <= 5) {
                                            ircBot.say(nick, chunk);
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
                }
            }
        });
    }
}