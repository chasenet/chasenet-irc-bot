module.exports = {

    init: function(ircBot) {

        ircBot.addListener('message', function(nick, to, text, message){

            var config = require('../../config/config.json');

            if(config.default_ignore_nicks.indexOf(nick.toLowerCase()) == -1) {

                if(text.substr(0, 1) == config.commandChar) {

                    if(config.botOwners.indexOf( nick ) > -1) {

                        var command = text.split(' ');

                        switch(command[0].substr(1)) {

                            case 'spam': {

                                for(var i = 0; i < parseInt(command[2], 10); i++) {

                                    ircBot.say(command[1], command.slice(3).join(' '));
                                }
                            }
                        }
                    }
                }
            }
        });
    }
}