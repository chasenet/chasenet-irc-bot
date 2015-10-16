var irc = require('irc'),
    config = require('./config/config.json'),
    modules = require('./config/modules.json');

var ircBot = null;

var globals = {

    config : function(v){
        var c = require('./config/config.json');

        if(c.hasOwnProperty(v)) {
            return c[v];
        } 
        return {};
    },

    setConfig : function(v, val, method) {
        
        if(typeof(val) == 'undefined' || typeof(val) == null) {
        
            return false;
        }

        var c = require('./config/config.json');

        if(c.hasOwnProperty(v)) {
            switch(typeof(c[v])) {
                case 'array':
                case 'object':
                    if(typeof(method) != 'undefined' && method == 'remove') {
                        var index = c[v].indexOf(val);
                        c[v].splice(index, 1);
                        break;
                    }

                    if(c[v].indexOf(val) > -1) {
                        break;
                    }
                    c[v].push(val);
                    break;

                case 'string':
                case 'number':
                    c[v] = val;
                    break;

                default:
                    // Do nothing.
                    break;

            }

            return c[v];
        } 
        return {};
    },

    isAdmin: function(nick) {
        
        if(this.config('botOwners').indexOf(nick) > -1 || this.config('admins').indexOf(nick) > -1) {
            return true;
        }   
        return false;
    },
    isOwner: function(nick) {
        
        if(this.config('botOwners').indexOf(nick) > -1) {
            return true;
        }   
        return false;
    },

    isIgnoredNick: function(nick) {

        var ignoredNicks = this.config('default_ignore_nicks');

        if(ignoredNicks.indexOf(nick.toLowerCase()) == -1) {

            return false;
        }
        return true;
    },

    getCommand: function(text) {
        var command = '';

        if(text.substr(0, 1) == this.config('commandChar')) {

            command = text.split(' ');

            command[0] = command[0].substr(1);
        }

        return command;
    },
};

function initModules() {

    if(modules.length > 0) {

        modules.forEach(function(item) {

            console.log('Loading Module: ' + item.module_name);

            var module = require(item.location + "main.js");

            module.init(ircBot, globals);

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