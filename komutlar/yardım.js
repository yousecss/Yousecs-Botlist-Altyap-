const {MessageEmbed} = require('discord.js');
const { JsonDatabase, YamlDatabase } = require("wio.db");

const db = new JsonDatabase({
  databasePath: "./database/Botlar.json"
});

const yamldb = new YamlDatabase({
  databasePath: "./database/myYamlDatabase.yml"
});
module.exports = {
    name: 'yardım',
    description: 'Yardım Komutu',
    execute(message, args) {
        const guildId = message.guild.id;

        const Logkanaldb = db.get(`logChannel_${guildId}`);
        const yetkiliRoldb = db.get('botlist_yetkili_rol');

        const açık = '<a:ak:1137656842353389668>';// AÇIK OLAN Bİ TİK KOY
        const kapalı = '<a:deaktif:1137656848279941150>';// KAPALI OLAN TİK KOY

        let Logkanal = '';
        let yetkilirol = '';

        if (Logkanaldb) {
          Logkanal = `${açık}`;
        } else {
          Logkanal = `${kapalı}`;
        }

        if (yetkiliRoldb) {
          yetkilirol = `${açık}`;
        } else {
          yetkilirol = `${kapalı}`;
        }

        const yousecs = new MessageEmbed()
      .setTitle('Yousecs Botlist Komutları')
      .setDescription(`> Sistemin Aktif Veya Kapalı Olduğunu Burdan Öğrenebilirsiniz\n\n> **__Botlist Yetkili Rolü:__**${yetkilirol} \n> **__Botlist Log Kanalı:__** ${Logkanal}`)
      .addField('!botekle','Botunuzu sunucuya alınması İçin onay istersiniz')
      .addField('!botreddet','Botu reddedersiniz')
      .addField('!botonayla','Botu onaylarsınız')
      .addField('!botlist-yetkili-ayarla','Botlist yetkili rolünü ayarlarsınız')
      .addField('!botlist-yetkili-sıfırla','Botlist yetkili rolünü sıfırlarsınız')
      .addField('!botlist-log-ayarla','Botlist kanalı ayarlarsınız')
      .addField('!botlist-log-sıfırla','Botlist log kanalını sıfırlarsınız')
      .addField('!botlist-kapat','Botlist sistemini kapatırsınız')
      .setFooter('Developed By Yousecs')
      .setColor('#00ff00');
      return message.channel.send(yousecs)
}
}