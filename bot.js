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

const snekfetch = require('snekfetch');
let points = JSON.parse(fs.readFileSync('./xp.json', 'utf8'));

var f = [];
function factorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
};
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.on("message", async message => {
    if (message.channel.type === "dm") return;

  if (message.author.bot) return;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;

  if (!points[user.id]) points[user.id] = {
    points: 0,
    level: 0,
  };

  let userData = points[user.id];
  userData.points++;

  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    userData.level = curLevel;
        var user = message.mentions.users.first() || message.author;
message.channel.send(`:up: **| ${user.username}   Oo Helal Kanki! Level Atlamışın Bea*`)
    }

fs.writeFile('./xp.json', JSON.stringify(points), (err) => {
    if (err) console.error(err)
  })

  if (message.content.toLowerCase() === prefix + 'profil' || message.content.toLowerCase() === prefix + 'profile') {
const level = new Discord.RichEmbed().setTitle(`${user.username}`).setDescription(`**Seviye:** ${userData.level}\n**EP (Error Puan):** ${userData.points}`).setColor("RANDOM").setFooter(``).setThumbnail(user.avatarURL)
message.channel.send(`:pencil: **| ${user.username} Adlı Kullanıcının Profili Burada!**`)
message.channel.send(level)
  }
});

exports.run = (client, message, args) => {
    message.channel.send("Psst. YakÄ±yorum.").then(async msg => {
                    setTimeout(() => {
            message.react('🚬');
        }, 1000);
          setTimeout(() => {
            message.react('🚬˜');
        }, 1500);
        setTimeout(() => {
            msg.edit('🔥');
        }, 1800);
        setTimeout(() => {
            msg.edit('🚬  🔥');
        }, 2300);
        setTimeout(() => {
            msg.edit('🚬 🔥🔥 ');
        }, 2800);
        setTimeout(() => {
            msg.edit('🚬 🔥🔥🔥 ');
        }, 3300);
        setTimeout(() => {
            msg.edit('🚬 🔥🔥');
        }, 3800);
        setTimeout(() => {
            msg.edit('🚬 🔥');
        }, 4300);
        setTimeout(() => {
            msg.edit('🚬 ');
        }, 4800);
    setTimeout(() => {
            msg.edit('**Sigara bitti** Not: Sigara sağlığa zararlıdır Lütfen sigara içmeyiniz!');
        }, 5300);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sigara',
  description: 'Sigara iÃ§ersiniz.',
  usage: 'sigara'
};

////////////////////////

client.on("guildMemberAdd", member => {
	
	var channel = member.guild.channels.find("name", "giriş-çıkış");
	if (!channel) return;
	
	var role = member.guild.roles.find("name", "💦Üyemiz💦");
	if (!role) return;
	
	member.addRole(role); 
	
	channel.send(member + " https://media.giphy.com/media/1X5ZXNgZSMOvMoqeTm/giphy.gif Hosgeldin Guzel Kardesim.");
	
	member.send("Aramıza hoş geldin! Artik Sende Bizden Biri Oldun!")
	
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

client.login(process.env.BOT_TOKEN);
