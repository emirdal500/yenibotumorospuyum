const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm Selam Kank');
  }
});

////////////////////////

client.on("guildMemberAdd", member => {
	
	var channel = member.guild.channels.find("name", "giriş-çıkış");
	if (!channel) return;
	
	var role = member.guild.roles.find("name", "💦Üyemiz💦");
	if (!role) return;
	
	member.addRole(role); 
	
	channel.send(member + " artık Sunucumuzda! Izmirli Mekanına Hoşgeldin! https://cdn.discordapp.com/attachments/516675904374702091/519687343787999232/hosgeldiniz-resmi.gif");
	
	member.send("Aramıza hoş geldin! Seni Gördüğümüze Çok Sevindik. https://cdn.discordapp.com/attachments/516675904374702091/519687343787999232/hosgeldiniz-resmi.gif")
  
});

////////////////////////

client.on('message', msg => {
  if (msg.content === 'discord.gg') {
   msg.delete(30)
    msg.reply(':warning:Hoopp Niye Reklam Yapıyon Kardeş:warning:');
  }
});

client.on('message', msg => {
  if (msg.content === 'discord') {
   msg.delete(30)
    msg.reply(':warning:Hoopp Niye Reklam Yapıyon Kardeş:warning:');
  }
});

client.on('message', msg => {
  if (msg.content === 'https') {
   msg.delete(30)
    msg.reply(':warning:Hoopp Niye Reklam Yapıyon Kardeş:warning:');
  }
});

client.on('message', msg => {
  if (msg.content === 'http') {
   msg.delete(30)
    msg.reply(':warning:Hoopp Niye Reklam Yapıyon Kardeş:warning:');
  }
});

client.on('message', msg => {
  if (msg.content === 'discordg') {
   msg.delete(30)
    msg.reply(':warning:Hoopp Niye Reklam Yapıyon Kardeş:warning:');
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

if {msg.content === '-espri') {
if (Math.floor((Math.random () * 3) + 1) === 1) {
  msg.channel.send('Yağmur Yağmış, Kar Bal.');
}else if (Math.floor((Math.random () * 3) + 1) === 2) {
  msg.channel.send('Elektriği Edison buldu ama parasını niye biz ödüyoruz.');
}else if (Math.floor((Math.random () * 3) + 1) === 3) {
  msg.channel.send('Yoldan Fıstık Gibi Kız  Geçiyormuş Kıza Araba Çarpmış Nolmuş?\n-Fıstık Ezmesi');
 }
}

});
client.login(process.env.BOT_TOKEN);
