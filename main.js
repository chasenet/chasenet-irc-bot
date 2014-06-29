var irc = require('irc');

var config = require('./config/config.json');

function getModules() {

}

function main() {
    var ircBot = null;

    if(config && config.length > 0) {

        for (var i = 0; i < config.length; i++) {
            ircBot = new irc.Client(config[i].server, config[i].botName, config[i]);
        }
    }

    if(ircBot != null) {

        // Set up the event listeners

        // First connection loop to the server
        ircBot.addListener("registered", function(message) {
            console.log(message);
        });

        // Log out the motd
        ircBot.addListener("motd", function(message) {
            console.log(message);
        });

        // Catch the errors
        ircBot.addListener("error", function(messages) {
            //messages is an object?
            // for(var i = 0; i < messages.length; i++) {
            //     console.log("ERROR " + messages[i]);
            // }
        });

        // Welcome users on join
        ircBot.addListener("join", function(channel, nick) {
            if(nick == config[0].botName) {
                ircBot.say(channel, "Hola!");
            } else {
                ircBot.say(channel, "Welcome " + nick + "!");
            }
        });

        // Auto-join on invite
        ircBot.addListener("invite", function(channel, from, message) {
            ircBot.join(channel);
        });

        // On connection end
        ircBot.addListener("end", function() {
            console.log(arguments);
        });
    }
}

main();
