const Discord = require('discord.js');

 exports.run = (client, message, args) => {
   var cevaplar = ['https://cdn.discordapp.com/attachments/516675904374702091/528238000065216524/pek-cok-sair-ve-yazar-ataturk-icin-UkJD_cover.jpg','https://cdn.discordapp.com/attachments/516675904374702091/528237893064589312/1438475038_atam.gif','https://cdn.discordapp.com/attachments/516675904374702091/528237860277583872/ataturksigara.jpg','https://cdn.discordapp.com/attachments/516675904374702091/528237707890130946/a.jpg'0't0tg7c8Sr1vy1wx4o1_500.gif','https://cdn.discordapp.com/attachments/382580600697126924/382594804711686145/tumblr_ol45svaSEO1w4spvvo1_500.gif','https://cdn.discordapp.com/attachments/382580600697126924/382594804091191306/tumblr_ol0xwczy8i1vy1wx4o1_500.gif'];
   var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];
   message.reply(cevap);
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['ataturk', 'ata','atam'],
 permLevel: 0 ,
};

exports.help = {
 name: 'ataturk',
 description: 'Atam Sen rahat uyu',
 usage: 'atatrk'
};