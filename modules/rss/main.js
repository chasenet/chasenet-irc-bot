module.exports = {
    init: function(ircBot) {

        var config = require('../../config/config.json');
        var module_config = require('./config/config.json');

        var feedsub = require('feedsub');

        reader = new feedsub(module_config.rss_feed, {
            interval: module_config.interval,
            autoStart: true
        });

        reader.on('item', function(item) {

            console.log(item);

            ircBot.say(module_config.default_channel, 'RSS Item: ' + item.title + ' - ' + item.link);
        });

        ircBot.addListener('message', function(nick, to, text, message){

            if(text.substr(0, 1) == config.commandChar) {

                switch(text.substr(1).toLowerCase()) {

                    case 'recache':{

                        console.log('Recaching');

                        var rss = function() {

                            reader.read(function(err, items) {

                                console.log(err, items);

                                ircBot.say(to, 'Currently ' + items.length + ' new items in the RSS Feed');
                            });
                        }();

                        break;
                    }

                    case 'feed': {

                        // console.log('feeding...');

                        // var tempReader = new feedsub(module_config.rss_feed, {
                        //     interval: module_config.interval,
                        //     autoStart: true
                        // });

                        // tempReader.on('item', function(item) {
                        //     console.log(item);
                        //     ircBot.say(to, 'RSS Item: ' + item.title + ' - ' + item.link);
                        // });

                        // var rss = function() {
                        //     console.log(tempReader);

                        //     tempReader.read(function(err, items) {

                        //         console.log(err);

                        //         if(items.length > 0) {

                        //             for(var i in items) {

                        //                 ircBot.say(to, 'RSS Item: ' + items[i].title + ' - ' + items[i].link);
                        //             }
                        //         }
                        //     });
                        // }();

                        // tempReader.stop();

                        // delete tempReader;
                    }
                }
            }
        });
    }
}