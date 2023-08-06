const { MessageEmbed } = require('discord.js');
const { JsonDatabase, YamlDatabase } = require("wio.db");

const db = new JsonDatabase({
  databasePath: "./database/Botlar.json"
});

const yamldb = new YamlDatabase({
  databasePath: "./database/myYamlDatabase.yml"
});

module.exports = {
  name: 'botlist-log-sıfırla',
  description: 'Botlist log kanalını sıfırlar.',
  async execute(message, args) {
    if (!message.guild) {
      const yousecs = new MessageEmbed()
        .setDescription('Dm\'den Kullnamazsın')
        .setFooter('Developed By Yousecs')
        .setColor('#ff0000');

      return message.channel.send(yousecs);
    }

    if (message.author.id !== message.guild.owner.id) {
      const yousecs = new MessageEmbed()
        .setDescription('Bu komutu sadece sunucu sahibi kullanabilir.')
        .setFooter('Developed By Yousecs')
        .setColor('#ff0000');

      return message.channel.send(yousecs);
    }

    const logChannelId = db.get(`logChannel_${message.guild.id}`);
    
    if (!logChannelId) {
      const yousecs = new MessageEmbed()
        .setDescription(`Log kanalı zaten sıfırlanmış.`)
        .setColor('#00ff00')
        .setFooter('Developed By Yousecs');

      return message.channel.send(yousecs);
    }

    db.delete(`logChannel_${message.guild.id}`);

    const yousecs = new MessageEmbed()
      .setDescription(`Log kanalı başarıyla sıfırlandı.`)
      .setColor('#00ff00')
      .setFooter('Developed By Yousecs');

    message.channel.send(yousecs);
  },
};
