var irc = require('irc');
    // process = require('process');
    // child_process = require('child_process');

// var reload = require('reload');

var config = require('./config/config.json');

var modules = require('./config/modules.json');

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