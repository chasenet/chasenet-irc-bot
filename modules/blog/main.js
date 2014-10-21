module.exports = {
    init: function(ircBot) {

        var feedsub = require('feedsub');

        reader = new feedsub('http://forum.chasenet.org/index.php?app=core&module=global&section=rss&type=forums&id=1', {
            interval: 1,
            autoStart: true
        });

        reader.on('item', function(item) {
            console.log(item);
            ircBot.say('#chasenet', 'RSS Item: ' + item.title + ' - ' + item.link);
        });
    }
}