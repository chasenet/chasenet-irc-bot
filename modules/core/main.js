module.exports = {

    init: function(ircBot) {

        // Let's extend the functionality of our message event listener
        ircBot.addListener('message', function(nick, to, text, message){

            console.log(to + ' ' + nick + ': ' + text);
        });

    }
};