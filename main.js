var irc = require('irc'),
    fs = require('fs');

var config = require('./config/config.json');

var commandChar = '!';
var botOwners = [];

function main() {
    var ircBot = null;

    if(config && config.length > 0) {

        for (var i = 0; i < config.length; i++) {

            if(config[i].commandChar && config[i].commandChar.length == 1) {

                commandChar = config[i].commandChar;

            }

            botOwners = config[i].botOwners;

            ircBot = new irc.Client(config[i].server, config[i].botName, config[i]);
        }
    }

    if(ircBot != null) {

        // Set up the event listeners

        // First connection loop to the server
        ircBot.addListener('registered', function(message) {
            console.log(message);
        });

        ircBot.addListener('message', function(nick, to, text, message) {

            if(text.substr(0, 1) == commandChar) {

                var command = text.split(' ');

                // Find command that is needed
                console.log('Looking for command : ' + command[0]);

                if(command.length >= 2){

                    switch(command[0].substr(1)) {

                        case 'join': {

                            ircBot.join(command[1]);

                            break;
                        }

                        case 'part' : {

                            if(botOwners.indexOf(nick) > -1) {

                                ircBot.part(command[1]);

                                break;
                            }
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
            if(nick == config[0].botName) {
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
}

main();