var irc = require('irc');

var config = require('./config/config.json');

function getModules() {

}

function main() {
    var ircBot = null;

    if(config && config.length > 0) {

        for (var i = 0; i < config.length; i++) {

            console.log(config[i]);

            ircBot = new irc.Client(config[i].server, config[i].botName, config[i]);

            ircBot.connect();

            for(var x = 0; x < config[i].channels.length; x++) {
                console.log(x);
                ircBot.join(config[i].channels[x], function() {
                    console.log("Joined Channel.");
                });
            }
        }
    }

    if(ircBot != null) {

        var connected = ircBot.connect();

        console.log(connected);


        ircBot.addListener("join", function(channel, nick) {
            ircBot.say(channel, "Welcome " + nick + "!");
        });
    }
}

main();
