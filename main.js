var irc = require('irc'),
    config = require('./config/config.json'),
    modules = require('./config/modules.json');

var ircBot = null;

function initModules() {
    if(modules.length > 0) {
        modules.forEach(function(item) {

            console.log('Loading Module: ' + item.module_name);

            var module = require(item.location + "main.js");

            module.init(ircBot);
        });
    }
}

function main() {

    // Ensure we can read the config
    ircBot = new irc.Client(config.server, config.botName, config);

    // Make sure we have an ircBot Client
    if(ircBot != null) {
        initModules();
    }

}

main();