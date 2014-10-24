module.exports = {
    init: function(ircBot) {

        var config = require('../../config/config.json');
        var module_config = require('./config/config.json');

        var Bluebox = require('bluebox-ng');

        ircBot.addListener('message', function(nick, to, text, message){

            if(text.substr(0, 1) == config.commandChar) {

                if(text.split(' ').length > 2) {

                    var command = text.split(' ');

                    switch(command[0].substr(1)) {

                        case 'bluebox': {

                            if(command.length >= 3) {

                                var options = {};

                                var bluebox = new Bluebox(options);

                                var moduleOptions = {
                                    target : command[1]
                                };

                                bluebox.runModule(command[2]., moduleOptions, function (err, result) {
                                    if(err) {
                                        console.log('ERROR:');
                                        console.log(err);
                                    } else {
                                        console.log('RESULT:');
                                        console.log(result);
                                    }
                                });
                            }

                            break;
                        }
                    }
                }
            }
        });
    }
}