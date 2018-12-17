const Discord = require('discord.js');

 exports.run = (client, message, args) => {
   var cevaplar = ['Oda Beni Seviyor, Ama koridordan emin değilim. :smile:','Hatayı Kendinizde Aramayın, Hatay Akdeniz Bölgesindedir. :smile:','1. Sınav Kolaydı Ama 2. Sınav Meyvesuyu :smile:','Adamın Evi Yanmış Odaları Düz. :smile:','Seni Aramazsam... Funda Arar :smile:','Hakan Peker, Tahin Pekmez :smile:','Adamın Gözü Dalmış Kulakları Yaprak. :smile:','İngilizler, Ben İzlemem Moruk',
   'Seven Gitmez Oğlum, Eight Gider.','Yoldan Fıstık Gibi Kız Geçiyormuş Kıza Araba Çarpmış Nolmuş? Fıstık Ezmesi.','Tuzu Uzatırmısın Kanka, Tuuuuuuuuuuuz','İspanyollar Ben Yollamam Kanka','Uzun Lafın Kısası : U.L','Bu erikson, başka erik yok','Rıdvanın bir büyüğü kimdir? Rıdtwo'];
   var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];
   message.reply(cevap);
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['espri', 'esprri','espiri'],
 permLevel: 0 ,
};

exports.help = {
 name: 'espiri',
 description: 'espri yapar',
 usage: 'espri'
};
