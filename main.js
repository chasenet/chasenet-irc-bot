var irc = require('irc'),
    fs = require('fs');

var config = require('./config/config.json');

var modules = require('./config/modules.json');

function main() {

    var ircBot = null;

    // Ensure we can read the config

    ircBot = new irc.Client(config.server, config.botName, config);

    // Make sure we have an ircBot Client
    if(ircBot != null) {

        // First connection loop to the server
        ircBot.addListener('registered', function(message) {

            console.log(message);
        });

        ircBot.addListener('message', function(nick, to, text, message) {

            if(text.substr(0, 1) == config.commandChar) {

                var command = text.split(' ');

                if(command.length >= 2){

                    switch(command[0].substr(1)) {

                        case 'join': {

                            ircBot.join(command[1]);

                            break;
                        }

                        case 'part' : {

                            if(config.botOwners.indexOf( nick ) > -1) {

                                if(config.channels.indexOf(command[1]) > -1){

                                    ircBot.part(command[1]);
                                }

                            } else if(config.channels.indexOf(command[1]) == -1) {

                                ircBot.part(command[1]);
                            }

                            break;
                        }
                    }
                }
            }
        });

        // Log out the motd
        ircBot.addListener('motd', function(message) {
            console.log(message);
        });

        // Catch the errors
        ircBot.addListener('error', function(err) {
            // err is an object?
            console.log(err);
        });

        // Welcome users on join
        ircBot.addListener('join', function(channel, nick) {
            if(nick == config.botName) {
                ircBot.say(channel, 'Hola!');
            } else {
                ircBot.say(channel, 'Welcome ' + nick + '!');
            }
        });

        // Auto-join on invite
        ircBot.addListener('invite', function(channel, from, message) {
            ircBot.join(channel);
        });

        // On connection end
        ircBot.addListener('end', function() {
            console.log(arguments);
        });
    }

    if(modules.length > 0) {
        for(var i = 0; i < modules.length; i++) {

            console.log('Loading Module: ' + modules[i].module_name);

            var module = require(modules[i].location + "main.js");

            module.init(this);
        }
    }
}

main();