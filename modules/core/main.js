module.exports = {
   
    init: function(ircBot, globals) {

        // First connection loop to the server
        ircBot.addListener('registered', function(message) {

            console.log(message);
        });


        // Slap ME?!
        ircBot.addListener('raw', function(message){

            if(message.args && message.args[1]) {

                if((message.args[1].indexOf('slap') > -1)
                    && (message.args[1].indexOf(globals.config('botName')) > -1)) {

                    ircBot.say(message.args[0], '(╯°□°）╯︵ ┻━┻');
                    ircBot.say(message.args[0], 'YOU FUCKING WHAT ' + message.nick);
                    ircBot.say(message.args[0], 'I WILL END YOU!');
                }
            }

        });


        // Ban user
        ircBot.addListener('message', function(nick, to, text, message) {
            
            var command = globals.getCommand(text);

            if(command[0] == 'banhammer') {

                if(typeof(command[1]) != 'undefined') {

                    ircBot.say(to, 'ᕙ(`▽´)ᕗ');
                    ircBot.say(to, 'I\'m bringing out the banhammer! ▬▬▬▬▬▬▬▋  Ò╭╮Ó');

                    if(globals.isAdmin(nick)) {

                        ircBot.send('MODE', to, '+b', command[1] + '!*@*');

                        ircBot.send('KICK', to, command[1],  'You\'ve been hammered.' );

                    } else {

                        ircBot.say(to, 'Who do you think you are!? Ò╭╮Ó');

                        ircBot.send('mode', to, '+b', nick + '!*@*');

                        ircBot.send('KICK', to, nick,  'You\'ve been hammered.' );
                    }
                }
            }

        });

        // List Help Options
        ircBot.addListener('message', function(nick, to, text, message) {

            var modules = require('../../config/modules.json');

            if(!globals.isIgnoredNick(nick)) {

                if(globals.getCommand(text) == 'help') {

                    modules.forEach(function(item, index) {

                        for (var key in item.commands) {

                            if (item.commands.hasOwnProperty(key)) {

                                ircBot.say(nick, globals.config('commandChar') + key + " " + item.commands[key]);
                            }
                        }
                    });

                }
            }
        });

        // Unban
        ircBot.addListener('message', function(nick, to, text, message) {

            if(globals.isAdmin(nick)) {

                command = globals.getCommand(text);
                
                if(command[0] == 'ub' && command.length > 1){
                    ircBot.say(to, 'Awwh, do we have to? :(');
                    ircBot.send('mode', to, '-b', command[1] + '!*@*');
                }
            }
        });


        // Ignore a user
        ircBot.addListener('message', function(nick, to, text, message){

             if(globals.isAdmin(nick)) {

                var command = globals.getCommand(text);

                if(command[0] == 'ignore' && command.length > 1) {

                    if(globals.config('default_ignore_nicks').indexOf(command[1]) == -1) {

                        globals.setConfig('default_ignore_nicks', command[1]);
                    } 
                }
            }
        });

        ircBot.addListener('message', function(nick, to, text, message) {

            if(!globals.isIgnoredNick(nick)) {

                var command = globals.getCommand(text);

                if(command[0] == 'ccc'){

                    if(globals.isAdmin(nick)) {

                        if(command.length > 1) {

                            globals.setConfig('commandChar', command[1]);

                            ircBot.say(to, 'Updated.');
                        } else {
                            ircBot.say(to, 'Requires 2 arguments.');
                        }
                    } else {

                        ircBot.say(to, 'Denied');
                    }
                }
            }
        });

        // Disconnect
        ircBot.addListener('message', function(nick, to, text, message) {

            if(!globals.isIgnoredNick(nick)) {

                var command = globals.getCommand(text);

                if(globals.isAdmin(nick)) {

                    if(command[0] == 'die') {

                        ircBot.disconnect(nick + ' killed me :<');
                    }
                }
            }
        });     

        // Join 
        ircBot.addListener('message', function(nick, to, text, message) {

            if(!globals.isIgnoredNick(nick)) {

                var command = globals.getCommand(text);

                if(globals.isAdmin(nick)) {

                    if(command[0] == 'join') {

                        ircBot.join(command[1]);
                    }
                }
            }
        });
        

        // Part 
        ircBot.addListener('message', function(nick, to, text, message) {

            if(!globals.isIgnoredNick(nick)) {

                var command = globals.getCommand(text);

                if(globals.isAdmin(nick)) {

                    if(command[0] == 'part') {

                        if(command.length > 1) {

                            ircBot.part(command[1]);
                        } else {
                            
                            ircBot.part(to);
                        }
                    }
                }
            }
        });  

        // Make Admin 
        ircBot.addListener('message', function(nick, to, text, message) {

            if(!globals.isIgnoredNick(nick)) {

                var command = globals.getCommand(text);

                if(globals.isAdmin(nick)) {

                    if(command[0] == 'mkadmin') {
                        
                        if(command.length > 1) {

                            globals.setConfig('admins', command[1]);

                            ircBot.say(to, command[1] + ' you are now an admin');
                        }
                    }
                }
            }
        });       

        // Remove Admin 
        ircBot.addListener('message', function(nick, to, text, message) {

            if(!globals.isIgnoredNick(nick)) {

                var command = globals.getCommand(text);

                if(globals.isAdmin(nick)) {

                    if(command[0] == 'rmadmin') {
                        
                        if(command.length > 1) {

                            globals.setConfig('admins', command[1], 'remove');

                            ircBot.say(to, command[1] + ' you are no longer an admin');
                        }
                    }
                }
            }
        });

        // List Admins 
        ircBot.addListener('message', function(nick, to, text, message) {

            if(!globals.isIgnoredNick(nick)) {

                var command = globals.getCommand(text);

                if(command[0] == 'admins') {
                    var owners = globals.config('botOwners').join(', ');
                    var admins = globals.config('admins').join(', ');
                    ircBot.say(to, 'Owners: ' + owner + '; Current Admins: ' + owners);
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
            // if(nick == globals.config('botName')) {
            //     ircBot.say(channel, 'Hola!');
            // } else {
            //     if( globals.config('default_ignore_nicks').indexOf(nick.toLowerCase()) == -1) {
            //         ircBot.say(channel, 'Welcome ' + nick + '!');
            //     }
            // }
        });

        // Auto-join on invite
        ircBot.addListener('invite', function(channel, from, message) {
            ircBot.join(channel);
        });

        // On connection end
        ircBot.addListener('end', function() {
            console.log(arguments);
        });

    },
    reload: function() {

    },
    destroy: function() {

    }
};