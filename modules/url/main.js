module.exports = {

    init: function(ircBot) {

        ircBot.addListener('message', function(nick, to, text, message){

            var config = require('../../config/config.json');
            var http = require('http');

            var pattern = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/ig;
            var regex = new RegExp(pattern);
            var matches = text.match(regex);

            if(matches && matches.length > 0) {
                var url = matches[0];


                var util = require("util");

                var options = {
                    host: url,
                };

                var content = "";

                var req = http.request(options, function(res) {
                    res.setEncoding("utf8");
                    res.on("data", function (chunk) {
                        content += chunk;
                    });

                    res.on("end", function () {
                        util.log(content);
                    });
                });

                req.end();

                // var results = http.get(url, function(res){
                //     console.log();
                // });
            }
        });
    }
}