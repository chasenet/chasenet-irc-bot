module.exports = {
    init: function(ircBot) {
        ircBot.addListener('message', function(nick, to, text, message){
            console.log(to + ' ' + nick + ': ' + text);
        });
    }
}