const { MessageEmbed } = require('discord.js');
const { JsonDatabase, YamlDatabase } = require("wio.db");

const db = new JsonDatabase({
  databasePath: "./database/Botlar.json"
});

const yamldb = new YamlDatabase({
  databasePath: "./database/myYamlDatabase.yml"
});

module.exports = {
  name: 'botlist-kapat',
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
db.delete(`logChannel_${message.guild.id}`);
db.delete('botlist_yetkili_rol');

const yousecs = new MessageEmbed()
.setTitle('Botlist Sistemi Kapatıldı')
.setDescription(`Sistem Kapatıldı. Tekrar açmak için !yardım yazarak komutları uygulayabilirsiniz.`)
.setColor('#00ff00')
.setFooter('Developed By Yousecs');

message.channel.send(yousecs);
},
};
