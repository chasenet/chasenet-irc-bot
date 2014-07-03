ChaseNet's IRC Bot - Written in NodeJS
================

Node JS IRC Bot written by the ChaseNET team.

Commands so far:
----------------
* !shellcode [keywords to search for]

* !join #channel

* !part #channel

* !help



Module Creation
----------------
1. Create a new folder in the "modules" directory
2. Create an entry in config/modules.json
3. Your main module file that you want to be loaded should be called "main.js"
4. Ensure that the module uses module.exports and has the property of "init" which should be your constructor method which should accept the argument "ircBot" if you want to extend the existing functionality

**Example**

    module.exports = {

        init: function(ircBot) {
            ircBot.addListener('message', function(nick, to, text, message) {
                console.log([nick, to, text, message]);
            });
        }
    }
