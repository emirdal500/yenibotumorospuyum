const Discord = require("discord.js");
var Jimp = require('jimp');

exports.run = async (client, message, args) => {
    var user = message.mentions.users.first() || message.author;
    if (!message.guild) user = message.author;

var request = require('require');

request('https://api.eggsybot.xyz/ataturk', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var info = JSON.parse(body);
        message.channel.send(info.link);
    }
});
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['atatrk'],
    permLevel: 0
  };

  exports.help = {
    name: 'ataturk',
    description: 'ataturk gif gönderir.',
    usage: 'ataturk'
  };
