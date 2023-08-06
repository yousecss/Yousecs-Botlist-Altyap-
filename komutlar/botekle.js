const { MessageEmbed } = require('discord.js');
const { JsonDatabase, YamlDatabase } = require("wio.db");

const db = new JsonDatabase({
  databasePath: "./database/Botlar.json"
});

const yamldb = new YamlDatabase({
  databasePath: "./database/myYamlDatabase.yml"
});

module.exports = {
  name: 'botekle',
  description: 'Bot ekleme komutu',
  async execute(message, args) {

if (args.length < 2) {
const yousecs = new MessageEmbed()
.setDescription('Hatalı Kullandın | !botekle <BotID> <Prefix>')
.setColor('#ff0000')
.setFooter('Developed By Yousecs');

return message.channel.send(yousecs);
}

const botId = args[0];
const prefix = args[1];

if (!botId.match(/^\d+$/)) {
const yousecs = new MessageEmbed()
.setTitle('Geçersiz Bot ID')
.setDescription('Bot ID sadece sayılardan oluşmalıdır.')
.setFooter('Developed By Yousecs')
.setColor('#ff0000');

return message.channel.send(yousecs);
}
if (!prefix || prefix.length > 5) {
const yousecs = new MessageEmbed()
.setDescription('Prefix Çok Uzun. Max 5 karakter kullanabilirsin')
.setFooter('Developed By Yousecs')
.setColor('#ff0000');

return message.channel.send(yousecs);
}

const bot = await message.client.users.fetch(botId);
if (!bot) {
const yousecs = new MessageEmbed()
.setDescription('Belirtilen Bot ID\'si Geçerli Değil')
.setFooter('Developed By Yousecs')
.setColor('#ff0000');

return message.channel.send(yousecs);
}

if (db.has(`bot_${bot.id}`)) {
const yousecs = new MessageEmbed()
.setDescription('Botun İçin Zaten Başvuru Yapılmış')
.setFooter('Developed By Yousecs')
.setColor('#ff0000');

return message.channel.send(yousecs);
}

db.set(`bot_${bot.id}`, {
prefix: prefix,
ownerId: message.author.id,
botid: botId
});

message.delete();

const logChannelId = db.get(`logChannel_${message.guild.id}`); 
const logChannel = message.guild.channels.cache.get(logChannelId);

if (logChannel) {
const botAvatar = bot.avatarURL({ format: 'png', size: 512 });

const yousecs = new MessageEmbed()
.setTitle('Bot Eklendi')
.setDescription(`**__Bot Bilgileri;__**
Bot ID: ${bot.id}
Sahip: ${message.author} (${message.author.id})
Prefix: ${prefix}`)
.setColor('#808080')
.setFooter(`Botu onaylamak için !botonayla ${bot.id}/Reddetmek için !reddet ${bot.id} <sebep>`)
.setThumbnail(botAvatar);

logChannel.send(yousecs);
} else {
const erroryousecs = new MessageEmbed()
.setDescription(`Log kanalı bulunamadı: ${logChannelId}`)
.setFooter('Developed By Yousecs')
.setColor('#ff0000');

console.error(`Log kanalı bulunamadı: ${logChannelId}`);
return message.channel.send(erroryousecs);
}
},
};
