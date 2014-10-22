module.exports = {
    init: function(ircBot) {

        var config = require('../../config/config.json');
        var feedsub = require('feedsub');

        reader = new feedsub('http://forum.chasenet.org/index.php?app=core&module=global&section=rss&type=forums&id=1', {
            interval: 1,
            autoStart: true
        });

        reader.on('item', function(item) {
            console.log(item);
            ircBot.say('#chasenet', 'RSS Item: ' + item.title + ' - ' + item.link);
        });

        ircBot.addListener('message', function(nick, to, text, message){
                if(text.substr(0, 1) == config.commandChar) {
			if(text.substr(1).indexOf('recache') > -1) {
				console.log('Recaching');
				var rss = function() {
					reader.read(function(err, items) {
						console.log(err, items);
				                ircBot.say(to, 'Currently ' + items.length + ' new items in the RSS Feed');
					});
				}();
			}			
		}
	});
    }
}
