const { MessageEmbed } = require('discord.js');
const { JsonDatabase, YamlDatabase } = require("wio.db");

const db = new JsonDatabase({
  databasePath: "./database/Botlar.json"
});

const yamldb = new YamlDatabase({
  databasePath: "./database/myYamlDatabase.yml"
});

module.exports = {
  name: 'botlist-log-ayarla',
  description: 'Botlist log kanalını ayarlar.',
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

    if (args.length < 1) {
      const yousecs = new MessageEmbed()
        .setDescription('Komutu Yanlış Kullandın | !botlist-log-ayarla <#kanal>')
        .setFooter('Developed By Yousecs')
        .setColor('#ff0000');

      return message.channel.send(yousecs);
    }

    const LogkanalId = args[0].replace(/<|#|>/g, '');
    const Logkanal = message.guild.channels.cache.get(LogkanalId);

    if (!Logkanal || Logkanal.type !== 'text') {
      const yousecs = new MessageEmbed()
        .setDescription('Kanal Geçerli Değil/Bulunamadı Lütfen Düzgün Yazdığından Emin Ol')
        .setFooter('Developed By Yousecs')
        .setColor('#ff0000');

      return message.channel.send(yousecs);
    }

    db.set(`logChannel_${message.guild.id}`, LogkanalId);

    const yousecs = new MessageEmbed()
      .setDescription(`Log kanalı ${Logkanal} olarak ayarlandı `)
      .setColor('#00ff00')
      .setFooter('Developed By Yousecs');

    message.channel.send(yousecs);
  },
};
