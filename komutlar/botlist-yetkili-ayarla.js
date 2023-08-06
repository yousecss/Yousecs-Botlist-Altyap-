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
  name: 'botlist-yetkili-ayarla',
  description: 'Botlist yetkili rolünü ayarlar',
  async execute(message, args) {
if (!message.member.permissions.has('ADMINISTRATOR')) {
const yousecs = new MessageEmbed()
.setDescription('Bu komutu kullanma yetkiniz yok.')
.setFooter('Developed By Yousecs')
.setColor('#ff0000');
    
return message.channel.send(yousecs);
}

if (args.length !== 1) {
const yousecs = new MessageEmbed()
.setDescription('Komutu Yanlış Kullandın | !botlist-yetkili-ayarla <@Rol>')
.setFooter('Developed By Yousecs')
.setColor('#ff0000');
    
return message.channel.send(yousecs);
}

const mentionRegex = /^(?:<@&)?(\d+)>?$/;
const input = args[0];
const match = input.match(mentionRegex);
let yetkiliRolId;

if (match) {
yetkiliRolId = match[1];
} else {
yetkiliRolId = input;
}

const yetkiliRol = message.guild.roles.cache.get(yetkiliRolId);

if (!yetkiliRol) {
const yousecs = new MessageEmbed()
.setDescription('Belirtilen rol bulunamadı.')
.setFooter('Developed By Yousecs')
.setColor('#ff0000');
    
return message.channel.send(yousecs);
}

db.set('botlist_yetkili_rol', yetkiliRolId);

const yousecs = new MessageEmbed()
.setDescription(`Botlist yetkili rolü ${yetkiliRol} olarak ayarlkandı`)
.setFooter('Developed By Yousecs')
.setColor('#00ff00');

message.channel.send(yousecs);
},
};
