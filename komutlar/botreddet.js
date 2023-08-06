const { MessageEmbed } = require('discord.js');
const {
  JsonDatabase,
  YamlDatabase
} = require("wio.db");

const db = new JsonDatabase({
  databasePath: "./database/Botlar.json"
});

const yamldb = new YamlDatabase({
  databasePath: "./database/myYamlDatabase.yml"
});

module.exports = {
  name: 'botreddet',
  description: 'Bot reddetme komutu',
  async execute(message, args) {
const botlistYetkiliRolId = db.get('botlist_yetkili_rol');
if (!botlistYetkiliRolId) {
const yousecs = new MessageEmbed()
.setDescription('Botlist yetkili rolü henüz ayarlanmamış.')
.setFooter('Developed By Yousecs')
.setColor('#ff0000');
    
return message.channel.send(yousecs);
}

const botlistYetkiliRol = message.guild.roles.cache.get(botlistYetkiliRolId);

if (!botlistYetkiliRol || !message.member.roles.cache.has(botlistYetkiliRol.id)) {
const yousecs = new MessageEmbed()
.setDescription('Yetkili Rolünüz Yok')
.setFooter('Developed By Yousecs')
.setColor('#ff0000');
    
return message.channel.send(yousecs);
}

if (args.length < 2) {
const yousecs = new MessageEmbed()
.setDescription('Komutu Yanlış Kullandın | !botreddet <BotID> <Sebep>')
.setColor('#ff0000')
.setFooter('Developed By Yousecs');
    
return message.channel.send(yousecs);
}

const botId = args[0];
const reason = args.slice(1).join(' ');

const botInfo = db.get(`bot_${botId}`);
if (!botInfo) {
const yousecs = new MessageEmbed()
.setDescription('Belirtilen Bot ID\'si Geçerli Değil')
.setColor('#ff0000')
.setFooter('Developed By Yousecs');
    
return message.channel.send(yousecs);
}

const ownerId = botInfo.ownerId;


const sahip = await message.client.users.fetch(ownerId);
const bot = await message.client.users.fetch(botId);
const yousecs = new MessageEmbed()
.setTitle('Bot Reddedildi')
.setDescription(`**Bot Bilgileri;**
Bot ID: ${bot.id}
Sahip: ${sahip} (${sahip.id})
Reddeden Yetkili: ${message.author} (${message.author.id})
Sebep: **${reason}**`)
.setColor('#ff0000')
.setFooter('Developed By Yousecs')

const logChannelId = db.get(`logChannel_${message.guild.id}`);
message.delete()
if (!logChannelId) {
const erroryousecs = new MessageEmbed()
.setDescription('Log kanalı ayarlanmamış.')
.setFooter('Developed By Yousecs')
.setColor('#ff0000');
        
console.error('Log kanalı ayarlanmamış.');
return message.channel.send(erroryousecs);
}

const logChannel = message.guild.channels.cache.get(logChannelId);
    
if (logChannel) {
logChannel.send(yousecs);
} 

db.delete(`bot_${botId}`);
},
};
