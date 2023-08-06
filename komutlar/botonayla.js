const { Permissions, MessageEmbed } = require('discord.js');
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
  name: 'botonayla',
  description: 'Bot onaylama komutu',
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


if (args.length < 1) {
const yousecs = new MessageEmbed()
.setDescription('Komutu Yanlış Kullandın | !botonayla <BotID>')
.setFooter('Developed By Yousecs')
.setColor('#ff0000');
      
return message.channel.send(yousecs);
}

const botId = args[0];

const Botbilgi = db.get(`bot_${botId}`);

if (!Botbilgi) {
const yousecs = new MessageEmbed()
.setDescription('Belirtilen Bot ID\'si Geçerli Değil')
.setFooter('Developed By Yousecs')
.setColor('#ff0000');
      
return message.channel.send(yousecs);
        }

    const ownerId = Botbilgi.ownerId;

    try {

      message.delete();

      const logChannelId = db.get(`logChannel_${message.guild.id}`);

if (!logChannelId) {
const yousecs = new MessageEmbed()
.setDescription('Log kanalı ayarlanmamış.')
.setFooter('Developed By Yousecs')
.setColor('#ff0000');

console.error('Log kanalı ayarlanmamış.');
return message.channel.send(yousecs);
      }

      const logChannel = message.guild.channels.cache.get(logChannelId);
      if (!logChannel) {
        const yousecs = new MessageEmbed()
        .setDescription('Log kanalı Bulunamadı.')
        .setFooter('Developed By Yousecs')
        .setColor('#ff0000');
      
      console.error('Log kanalı ayarlanmamış.');
      return message.channel.send(yousecs);
    }

      const sahip = await message.client.users.fetch(ownerId);
      const botid = await message.client.users.fetch(botId);
      const botAvatar = botid.avatarURL({ format: 'png', size: 512 });

      const Bot = message.guild.members.cache.get(botId);
      if (Bot) {
        return message.reply('Bu bot zaten sunucuda bulunuyor, onay işlemine gerek yok.');
      }

      const inviteLink = `https://discord.com/oauth2/authorize?client_id=${botId}&permissions=0&scope=bot`;

      const yousecs = new MessageEmbed()
        .setTitle('Bot Onaylandı')
        .setDescription(`**__Bilgiler;__**
        Bot ID: ${botid} (${botid.id})
        Sahip: ${sahip} (${sahip.id})
        Onaylayan Yetkili: ${message.author} (${message.author.id})
        [**Botu Eklemek İçin Tıkla**](${inviteLink})`)
        .setColor('#00ff00')
        .setThumbnail(botAvatar)
        .setFooter('Developed By Yousecs')

      logChannel.send(yousecs);
    } catch (error) {
      console.error(error);
    }
  },
};
