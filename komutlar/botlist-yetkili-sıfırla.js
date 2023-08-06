const { MessageEmbed } = require('discord.js');
const { JsonDatabase, YamlDatabase } = require("wio.db");

const db = new JsonDatabase({
  databasePath: "./database/Botlar.json"
});

const yamldb = new YamlDatabase({
  databasePath: "./database/myYamlDatabase.yml"
});

module.exports = {
  name: 'botlist-yetkili-sıfırla',
  description: 'Botlist yetkili rolünü sıfırlar',
  async execute(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      const yousecs = new MessageEmbed()
        .setDescription('Bu komutu kullanma yetkiniz yok.')
        .setFooter('Developed By Yousecs')
        .setColor('#ff0000');

      return message.channel.send(yousecs);
    }

    const oldYetkiliRol = db.get('botlist_yetkili_rol');
    if (!oldYetkiliRol) {
      const yousecs = new MessageEmbed()
        .setDescription('Botlist yetkili rolü zaten sıfırlanmış.')
        .setFooter('Developed By Yousecs')
        .setColor('#00ff00');

      return message.channel.send(yousecs);
    }

    db.delete('botlist_yetkili_rol');

    const yousecs = new MessageEmbed()
      .setDescription('Botlist yetkili rolü sıfırlandı.')
      .setFooter('Developed By Yousecs')
      .setColor('#00ff00');

    message.channel.send(yousecs);
  },
};
